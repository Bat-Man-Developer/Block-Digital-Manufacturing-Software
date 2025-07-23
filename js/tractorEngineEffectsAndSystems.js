// Effects & Systems
createPipingSystem() {
    const pipingGroup = new THREE.Group();
    pipingGroup.name = 'PipingSystem';
    
    this.createCoolantHoses(pipingGroup);
    this.createFuelLines(pipingGroup);
    this.createVacuumHoses(pipingGroup);
    this.createOilLines(pipingGroup);
    this.createBreatherSystem(pipingGroup);
    
    this.addComponentLabel(pipingGroup, 'Piping System', [0, 7, 0]);
    
    this.components.set('pipingSystem', pipingGroup);
    this.config.three.staticComponents.add(pipingGroup);
}

createCoolantHoses(group) {
    const hoseConnections = [
        { 
            name: 'UpperRadiatorHose',
            from: [0, 3.5, 2.5], 
            to: [0, 2.5, 5.5], 
            radius: 0.18
        },
        { 
            name: 'LowerRadiatorHose',
            from: [0, 1.5, 2.5], 
            to: [0, 1.5, 5.5],
            radius: 0.18
        },
        { 
            name: 'HeaterHoseSupply',
            from: [1.5, 2.8, 1.5], 
            to: [3, 2.8, 4],
            radius: 0.12
        },
        { 
            name: 'HeaterHoseReturn',
            from: [3, 2.2, 4], 
            to: [1.5, 2.2, 1.5],
            radius: 0.12
        }
    ];
    
    hoseConnections.forEach(hose => {
        const hoseMesh = this.createFlexibleHose(
            hose.from, hose.to,
            this.materials.get('coolantHose'), hose.radius
        );
        hoseMesh.name = hose.name;
        group.add(hoseMesh);
    });
}

createEffectsAndSystemsFuelLines(group) {
    const { cylinders, engineType } = this.config.engineParameters;
    
    // Main fuel line from pump to rail
    const mainFuelLine = this.createFlexibleHose(
        [3.5, -0.5, 2.5], [0, 4.5, 1.8],
        this.materials.get('fuelLine'), 0.06
    );
    mainFuelLine.name = 'MainFuelLine';
    group.add(mainFuelLine);
    
    // Enhanced fuel rail
    const railLength = engineType.startsWith('v') ? cylinders / 2 * 1.2 : cylinders * 1.2;
    const railGeometry = this.getOptimizedGeometry(
        `fuelRail_${cylinders}`,
        () => new THREE.CylinderGeometry(0.08, 0.08, railLength, 12, 1)
    );
    const fuelRail = new THREE.Mesh(railGeometry, this.materials.get('fuelLine'));
    fuelRail.name = 'FuelRail';
    fuelRail.position.set(0, 4.0, 1.8);
    fuelRail.rotation.z = Math.PI / 2;
    group.add(fuelRail);
    
    // Fuel injectors and lines
    for (let i = 0; i < cylinders; i++) {
        const position = this.calculateEffectsAndSystemsCylinderPosition(i, cylinders, engineType);
        
        // Fuel injector
        const injectorGeom = this.getOptimizedGeometry(
            'fuelInjector',
            () => new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8, 1)
        );
        const injector = new THREE.Mesh(injectorGeom, this.materials.get('fuelLine'));
        injector.name = `FuelInjector_${i + 1}`;
        injector.position.set(position.x, 3.5, position.z + 0.8);
        group.add(injector);
        
        // Injector feed line
        const injectorLine = new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.03, 0.6, 8, 1),
            this.materials.get('fuelLine')
        );
        injectorLine.name = `InjectorLine_${i + 1}`;
        injectorLine.position.set(position.x, 3.8, position.z + 0.6);
        injectorLine.rotation.x = Math.PI / 6;
        group.add(injectorLine);
    }
    
    // Return line
    const returnLine = this.createFlexibleHose(
        [cylinders * 0.5, 4.0, 1.8], [3.5, 0, 2.5],
        this.materials.get('fuelLine'), 0.04
    );
    returnLine.name = 'FuelReturnLine';
    group.add(returnLine);
}

createVacuumHoses(group) {
    const vacuumConnections = [
        { 
            name: 'BrakeBoosterLine',
            from: [0, 4.5, 1.8], 
            to: [-3, 3.5, 5], 
            radius: 0.04
        },
        { 
            name: 'PurgeValveLine',
            from: [1, 4.2, 1.5], 
            to: [2, 3, 3],
            radius: 0.03
        },
        { 
            name: 'EGRVacuumLine',
            from: [0.5, 3.8, 1.5], 
            to: [-1, 3.2, -1],
            radius: 0.03
        }
    ];
    
    vacuumConnections.forEach(line => {
        const lineMesh = this.createFlexibleHose(
            line.from, line.to,
            this.materials.get('vacuumHose'), line.radius
        );
        lineMesh.name = line.name;
        group.add(lineMesh);
    });
}

createOilLines(group) {
    const oilConnections = [
        { 
            name: 'OilPressureLine',
            from: [0, -2.5, 0], 
            to: [2.5, 1.5, 0], 
            radius: 0.08
        },
        { 
            name: 'OilReturnLine',
            from: [1.5, 2.8, 0], 
            to: [0, -2.5, 0],
            radius: 0.10
        },
        { 
            name: 'TurboOilFeed',
            from: [1, 2, 0], 
            to: [2.5, 1.5, -3.5],
            radius: 0.06
        },
        { 
            name: 'TurboOilReturn',
            from: [2.5, 1, -3.5], 
            to: [0, -2.5, 0],
            radius: 0.08
        }
    ];
    
    oilConnections.forEach(line => {
        const lineMesh = this.createFlexibleHose(
            line.from, line.to,
            this.materials.get('pipe'), line.radius
        );
        lineMesh.name = line.name;
        group.add(lineMesh);
    });
}

createFlexibleHose(startPos, endPos, material, radius) {
    const hoseGroup = new THREE.Group();
    
    const distance = Math.sqrt(
        Math.pow(endPos[0] - startPos[0], 2) +
        Math.pow(endPos[1] - startPos[1], 2) +
        Math.pow(endPos[2] - startPos[2], 2)
    );
    
    const segments = Math.max(3, Math.ceil(distance * 2));
    
    // Create curve points for more realistic hose shape
    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(startPos[0], startPos[1], startPos[2]),
        new THREE.Vector3(
            startPos[0] + (endPos[0] - startPos[0]) * 0.3,
            startPos[1] + (endPos[1] - startPos[1]) * 0.3 + 0.2,
            startPos[2] + (endPos[2] - startPos[2]) * 0.3
        ),
        new THREE.Vector3(
            startPos[0] + (endPos[0] - startPos[0]) * 0.7,
            startPos[1] + (endPos[1] - startPos[1]) * 0.7 + 0.2,
            startPos[2] + (endPos[2] - startPos[2]) * 0.7
        ),
        new THREE.Vector3(endPos[0], endPos[1], endPos[2])
    ]);
    
    // Create tube geometry along curve
    const tubeGeometry = new THREE.TubeGeometry(curve, segments, radius, 8, false);
    const hose = new THREE.Mesh(tubeGeometry, material);
    hoseGroup.add(hose);
    
    return hoseGroup;
}

createFluidFlows() {
    this.config.three.fluidFlows = [];
    
    // Enhanced fluid flow effects
    const flowConfigurations = [
        { 
            type: 'fuel', 
            from: [3.5, -0.5, 2.5], 
            to: [0, 2, 0], 
            material: 'fuel',
            particleCount: 15,
            speed: 1.5
        },
        { 
            type: 'air', 
            from: [-3.5, 5.0, 2.5], 
            to: [0, -1, -1], 
            material: 'air',
            particleCount: 20,
            speed: 2.0
        },
        { 
            type: 'coolant', 
            from: [0, 2.5, 6], 
            to: [0, 0, -3], 
            material: 'water',
            particleCount: 25,
            speed: 1.2
        }
    ];
    
    flowConfigurations.forEach(config => {
        this.createFluidFlow(
            config.type, config.from, config.to, 
            this.materials.get(config.material),
            config.particleCount, config.speed
        );
    });
    
    // Enhanced combustion effects
    this.createCombustionEffects();
}

createFluidFlow(type, startPos, direction, material, particleCount = 20, speed = 1.0) {
    const flowGroup = new THREE.Group();
    flowGroup.name = `FluidFlow_${type}`;
    
    const particleGeometry = this.getOptimizedGeometry(
        `${type}Particle`,
        () => new THREE.SphereGeometry(0.06, 6, 6)
    );
    
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(particleGeometry, material);
        particle.name = `${type}Particle_${i}`;
        
        const variance = 0.3;
        particle.position.set(
            startPos[0] + (Math.random() - 0.5) * variance,
            startPos[1] + i * 0.15,
            startPos[2] + (Math.random() - 0.5) * variance
        );
        
        // Store original position for cycling
        particle.userData.originalPosition = particle.position.clone();
        particle.userData.particleIndex = i;
        
        flowGroup.add(particle);
    }
    
    flowGroup.userData = { 
        type, 
        startPos: new THREE.Vector3(...startPos), 
        direction: new THREE.Vector3(...direction), 
        particleCount,
        speed
    };
    
    this.config.three.fluidFlows.push(flowGroup);
    this.config.three.fluidEffects.add(flowGroup);
}

createHeatDissipation() {
    const heatGroup = new THREE.Group();
    heatGroup.name = 'HeatDissipation';
    
    // Create heat visualization particles
    const particleCount = 50;
    const heatGeometry = this.getOptimizedGeometry(
        'heatParticle',
        () => new THREE.SphereGeometry(0.03, 4, 4)
    );
    
    const heatMaterial = new THREE.MeshBasicMaterial({
        color: 0xff4400,
        transparent: true,
        opacity: 0.3,
        emissive: 0x442200,
        emissiveIntensity: 0.5
    });
    
    // Create heat sources at key locations
    const heatSources = [
        { position: [0, 2.5, 0], intensity: 1.0, name: 'CombustionChamber' },
        { position: [0, -1.5, -3.5], intensity: 0.8, name: 'ExhaustManifold' },
        { position: [2.5, 1.5, -3.5], intensity: 0.7, name: 'Turbocharger' },
        { position: [0, -2.5, 0], intensity: 0.4, name: 'OilPan' }
    ];
    
    heatSources.forEach((source, sourceIndex) => {
        for (let i = 0; i < particleCount / heatSources.length; i++) {
            const particle = new THREE.Mesh(heatGeometry, heatMaterial.clone());
            particle.name = `HeatParticle_${source.name}_${i}`;
            
            particle.position.set(
                source.position[0] + (Math.random() - 0.5) * 2,
                source.position[1] + Math.random() * 0.5,
                source.position[2] + (Math.random() - 0.5) * 2
            );
            
            particle.userData = {
                sourcePosition: new THREE.Vector3(...source.position),
                intensity: source.intensity,
                phase: Math.random() * Math.PI * 2,
                speed: 0.5 + Math.random() * 0.5
            };
            
            heatGroup.add(particle);
        }
    });
    
    this.components.set('heatDissipation', heatGroup);
    this.config.three.fluidEffects.add(heatGroup);
}

createExhaustFlow() {
    const exhaustGroup = new THREE.Group();
    exhaustGroup.name = 'ExhaustFlow';
    
    // Create exhaust particle system
    const exhaustGeometry = this.getOptimizedGeometry(
        'exhaustParticle',
        () => new THREE.SphereGeometry(0.08, 6, 6)
    );
    
    const exhaustMaterial = new THREE.MeshBasicMaterial({
        color: 0x333333,
        transparent: true,
        opacity: 0.6,
        emissive: 0x111111
    });
    
    const particleCount = 30;
    const exhaustStart = [0, -1.5, -6]; // Exhaust pipe exit
    
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(exhaustGeometry, exhaustMaterial.clone());
        particle.name = `ExhaustParticle_${i}`;
        
        particle.position.set(
            exhaustStart[0] + (Math.random() - 0.5) * 0.3,
            exhaustStart[1] + i * 0.2,
            exhaustStart[2] - i * 0.1
        );
        
        particle.userData = {
            startPosition: new THREE.Vector3(...exhaustStart),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.1,
                0.05 + Math.random() * 0.05,
                -0.1 - Math.random() * 0.1
            ),
            life: 1.0,
            maxLife: 3.0 + Math.random() * 2.0
        };
        
        exhaustGroup.add(particle);
    }
    
    this.components.set('exhaustFlow', exhaustGroup);
    this.config.three.fluidEffects.add(exhaustGroup);
}

createCombustionEffects() {
    const { cylinders, engineType } = this.config.engineParameters;
    
    // Initialize combustion timers
    this.animationState.combustionTimers = new Array(cylinders).fill(0);
    
    for (let i = 0; i < cylinders; i++) {
        const combustionGroup = new THREE.Group();
        combustionGroup.name = `CombustionEffect_${i + 1}`;
        
        const position = this.calculateEffectsAndSystemsCylinderPosition(i, cylinders, engineType);
        
        // Enhanced combustion visualization
        const flameGeometry = this.getOptimizedGeometry(
            'combustionFlame',
            () => new THREE.SphereGeometry(0.8, 12, 12)
        );
        
        const flameMaterial = new THREE.MeshBasicMaterial({
            color: 0xff4500,
            transparent: true,
            opacity: 0,
            emissive: 0xff2200,
            emissiveIntensity: 0
        });
        
        const flame = new THREE.Mesh(flameGeometry, flameMaterial);
        flame.name = `CombustionFlame_${i + 1}`;
        
        // Position in cylinder head area
        flame.position.set(position.x, position.y + 3.2, position.z);
        flame.scale.set(0, 0, 0);
        
        // Apply V-engine rotation if needed
        if (engineType.startsWith('v')) {
            const bankAngle = this.calculateEffectsAndSystemsBankAngle(i);
            flame.rotation.z = bankAngle;
        }
        
        combustionGroup.add(flame);
        combustionGroup.userData = { 
            type: 'combustion', 
            cylinderIndex: i,
            basePosition: position,
            flame: flame
        };
        
        this.config.three.fluidFlows.push(combustionGroup);
        this.config.three.fluidEffects.add(combustionGroup);
    }
}

createVibrationEffects() {
    const vibrationGroup = new THREE.Group();
    vibrationGroup.name = 'VibrationEffects';
    
    // Store original positions for vibration calculation
    this.originalEnginePosition = this.config.three.engineGroup.position.clone();
    
    // Vibration parameters based on engine configuration
    const { cylinders, engineType } = this.config.engineParameters;
    
    vibrationGroup.userData = {
        type: 'vibration',
        baseFrequency: this.calculateEngineVibrationFrequency(cylinders, engineType),
        amplitude: this.calculateVibrationAmplitude(cylinders, engineType),
        harmonics: this.calculateVibrationHarmonics(cylinders, engineType)
    };
    
    this.components.set('vibrationEffects', vibrationGroup);
    this.config.three.fluidEffects.add(vibrationGroup);
}

createSoundEffects() {
    const soundGroup = new THREE.Group();
    soundGroup.name = 'SoundEffects';
    
    // Audio context for sound visualization
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        try {
            const AudioContextClass = AudioContext || webkitAudioContext;
            this.audioContext = new AudioContextClass();
            
            // Create sound visualization spheres
            const soundVisualization = this.createSoundVisualization();
            soundGroup.add(soundVisualization);
            
        } catch (error) {
            console.warn('Audio context not available:', error);
        }
    }
    
    soundGroup.userData = {
        type: 'sound',
        frequency: this.calculateEngineFrequency(),
        volume: this.calculateEngineVolume()
    };
    
    this.components.set('soundEffects', soundGroup);
    this.config.three.fluidEffects.add(soundGroup);
}

createSoundVisualization() {
    const soundGroup = new THREE.Group();
    const { cylinders } = this.config.engineParameters;
    
    // Create sound wave visualization
    for (let i = 0; i < cylinders; i++) {
        const position = this.calculateEffectsAndSystemsCylinderPosition(i, cylinders, this.config.engineParameters.engineType);
        
        const waveGeometry = new THREE.RingGeometry(0.5, 1.0, 16);
        const waveMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        
        const soundWave = new THREE.Mesh(waveGeometry, waveMaterial);
        soundWave.name = `SoundWave_${i + 1}`;
        soundWave.position.set(position.x, position.y + 4, position.z);
        soundWave.rotation.x = -Math.PI / 2;
        
        soundWave.userData = {
            cylinderIndex: i,
            baseScale: 1.0,
            phase: (i / cylinders) * Math.PI * 2
        };
        
        soundGroup.add(soundWave);
    }
    
    return soundGroup;
}

// Helper Functions for Effects & Systems Calculations
calculateEffectsAndSystemsCylinderPosition(index, cylinders, engineType) {
    const cylinderSpacing = 1.2;
    
    if (engineType.startsWith('v')) {
        const bank = index < cylinders / 2 ? 0 : 1;
        const bankIndex = index % (cylinders / 2);
        const bankAngle = Math.PI / 6; // 30 degrees
        
        return {
            x: (bankIndex - (cylinders / 4 - 0.5)) * cylinderSpacing,
            y: bank === 0 ? Math.cos(bankAngle) : Math.cos(bankAngle),
            z: bank === 0 ? -Math.sin(bankAngle) : Math.sin(bankAngle)
        };
    } else {
        // Inline engines
        return {
            x: (index - (cylinders - 1) / 2) * cylinderSpacing,
            y: 0,
            z: 0
        };
    }
}

calculateEffectsAndSystemsBankAngle(cylinderIndex) {
    const { cylinders } = this.config.engineParameters;
    return cylinderIndex < cylinders / 2 ? -Math.PI / 6 : Math.PI / 6;
}

calculateEngineVibrationFrequency(cylinders, engineType) {
    // Base frequency calculation based on engine configuration
    const baseFreq = cylinders * 0.5;
    return engineType.startsWith('v') ? baseFreq * 0.8 : baseFreq;
}

calculateVibrationAmplitude(cylinders, engineType) {
    // Amplitude based on engine balance
    const baseAmplitude = 0.02;
    if (cylinders === 4 && engineType === 'inline_4') return baseAmplitude * 1.2;
    if (cylinders === 6) return baseAmplitude * 0.6;
    if (cylinders === 8 && engineType === 'v8') return baseAmplitude * 0.4;
    return baseAmplitude;
}

calculateVibrationHarmonics(cylinders, engineType) {
    // Harmonic content based on engine configuration
    return {
        primary: 1.0,
        secondary: cylinders === 4 ? 0.6 : 0.3,
        tertiary: 0.2
    };
}

calculateEngineFrequency() {
    const { rpm } = this.config.dynamicState;
    return (rpm / 60) * 2; // Basic engine frequency in Hz
}

calculateEngineVolume() {
    const { rpm, throttle } = this.config.dynamicState;
    return Math.min(1.0, (rpm / 6000) * (throttle / 100));
}