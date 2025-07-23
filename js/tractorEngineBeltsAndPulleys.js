// Belts & Pulleys
createDriveBelt() {
    const beltGroup = new THREE.Group();
    beltGroup.name = "DriveBelt";
    
    // Create belt path between pulleys
    const beltPath = this.createBeltPath([
        [3.5, 0, 0],      // Crankshaft pulley
        [3.0, 1.2, 0],    // Water pump pulley
        [2.5, 2.0, 1.2],  // Alternator pulley
        [3.2, 0.8, -0.8]  // AC compressor pulley
    ]);
    
    const beltGeometry = new THREE.TubeGeometry(beltPath, 100, 0.08, 8, true);
    const belt = new THREE.Mesh(beltGeometry, this.createBeltMaterial());
    
    beltGroup.add(belt);
    this.components.set('driveBelt', beltGroup);
    this.config.three.staticComponents.add(beltGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(beltGroup, "Drive Belt", [0, 1.5, 0]);
    }
}

createSerpentineBelt() {
    const beltGroup = new THREE.Group();
    beltGroup.name = "SerpentineBelt";
    
    // More complex serpentine belt path
    const beltPath = this.createBeltPath([
        [3.5, 0, 0],        // Crankshaft pulley
        [3.8, 0.5, 0.8],    // Idler pulley 1
        [3.0, 1.2, 0],      // Water pump pulley
        [2.8, 1.8, 0.6],    // Idler pulley 2
        [2.5, 2.0, 1.2],    // Alternator pulley
        [3.2, 1.5, 1.5],    // Tensioner pulley
        [3.2, 0.8, -0.8],   // AC compressor pulley
        [3.6, 0.2, -0.4],   // Power steering pulley
        [3.8, -0.3, 0.2]    // Return to start
    ]);
    
    const beltGeometry = new THREE.TubeGeometry(beltPath, 150, 0.12, 8, true);
    const belt = new THREE.Mesh(beltGeometry, this.createSerpentineBeltMaterial());
    
    beltGroup.add(belt);
    this.components.set('serpentineBelt', beltGroup);
    this.config.three.staticComponents.add(beltGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(beltGroup, "Serpentine Belt", [0, 2, 0]);
    }
}

createFanBelt() {
    const beltGroup = new THREE.Group();
    beltGroup.name = "FanBelt";
    
    // Simple V-belt for cooling fan
    const beltPath = this.createBeltPath([
        [3.5, 0, 0],      // Crankshaft pulley
        [3.0, 1.2, 0],    // Water pump/fan pulley
    ]);
    
    const beltGeometry = new THREE.TubeGeometry(beltPath, 50, 0.06, 6, true);
    const belt = new THREE.Mesh(beltGeometry, this.createVBeltMaterial());
    
    beltGroup.add(belt);
    this.components.set('fanBelt', beltGroup);
    this.config.three.staticComponents.add(beltGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(beltGroup, "Fan Belt", [0, 0.8, 0]);
    }
}

createAlternatorPulley() {
    const pulleyGroup = new THREE.Group();
    pulleyGroup.name = "AlternatorPulley";
    
    // Main pulley body
    const pulleyGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.4, 24);
    const pulley = new THREE.Mesh(pulleyGeometry, this.materials.get('alternator'));
    pulley.position.set(2.5, 2.0, 1.2);
    pulley.rotation.z = Math.PI / 2;
    
    // Belt grooves
    for (let i = 0; i < 3; i++) {
        const grooveGeometry = new THREE.CylinderGeometry(0.58, 0.58, 0.08, 24);
        const groove = new THREE.Mesh(grooveGeometry, this.materials.get('crankshaft'));
        groove.position.set(2.5, 2.0, 1.2 + (i - 1) * 0.12);
        groove.rotation.z = Math.PI / 2;
        pulleyGroup.add(groove);
    }
    
    // Hub
    const hubGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.6, 16);
    const hub = new THREE.Mesh(hubGeometry, this.materials.get('crankshaft'));
    hub.position.set(2.5, 2.0, 1.2);
    hub.rotation.z = Math.PI / 2;
    
    pulleyGroup.add(pulley, hub);
    this.components.set('alternatorPulley', pulleyGroup);
    this.config.three.staticComponents.add(pulleyGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(pulleyGroup, "Alt Pulley", [0, -0.8, 0]);
    }
}

createWaterPumpPulley() {
    const pulleyGroup = new THREE.Group();
    pulleyGroup.name = "WaterPumpPulley";
    
    // Main pulley body
    const pulleyGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.3, 24);
    const pulley = new THREE.Mesh(pulleyGeometry, this.materials.get('radiator'));
    pulley.position.set(3.0, 1.2, 0);
    pulley.rotation.z = Math.PI / 2;
    
    // Single V-groove
    const grooveGeometry = new THREE.CylinderGeometry(0.75, 0.75, 0.1, 24);
    const groove = new THREE.Mesh(grooveGeometry, this.materials.get('crankshaft'));
    groove.position.set(3.0, 1.2, 0);
    groove.rotation.z = Math.PI / 2;
    
    // Hub connection
    const hubGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.5, 16);
    const hub = new THREE.Mesh(hubGeometry, this.materials.get('crankshaft'));
    hub.position.set(3.0, 1.2, 0);
    hub.rotation.z = Math.PI / 2;
    
    pulleyGroup.add(pulley, groove, hub);
    this.components.set('waterPumpPulley', pulleyGroup);
    this.config.three.staticComponents.add(pulleyGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(pulleyGroup, "Water Pump Pulley", [0, -1, 0]);
    }
}

createPowerSteeringPulley() {
    const pulleyGroup = new THREE.Group();
    pulleyGroup.name = "PowerSteeringPulley";
    
    // Main pulley body
    const pulleyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.35, 20);
    const pulley = new THREE.Mesh(pulleyGeometry, this.materials.get('alternator'));
    pulley.position.set(3.6, 0.2, -0.4);
    pulley.rotation.z = Math.PI / 2;
    
    // Belt groove
    const grooveGeometry = new THREE.CylinderGeometry(0.48, 0.48, 0.1, 20);
    const groove = new THREE.Mesh(grooveGeometry, this.materials.get('crankshaft'));
    groove.position.set(3.6, 0.2, -0.4);
    groove.rotation.z = Math.PI / 2;
    
    // Hub
    const hubGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.5, 12);
    const hub = new THREE.Mesh(hubGeometry, this.materials.get('crankshaft'));
    hub.position.set(3.6, 0.2, -0.4);
    hub.rotation.z = Math.PI / 2;
    
    pulleyGroup.add(pulley, groove, hub);
    this.components.set('powerSteeringPulley', pulleyGroup);
    this.config.three.staticComponents.add(pulleyGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(pulleyGroup, "PS Pulley", [0, -0.8, 0]);
    }
}

createACCompressorPulley() {
    const pulleyGroup = new THREE.Group();
    pulleyGroup.name = "ACCompressorPulley";
    
    // Main pulley body with electromagnetic clutch
    const pulleyGeometry = new THREE.CylinderGeometry(0.7, 0.7, 0.6, 24);
    const pulley = new THREE.Mesh(pulleyGeometry, this.materials.get('alternator'));
    pulley.position.set(3.2, 0.8, -0.8);
    pulley.rotation.z = Math.PI / 2;
    
    // Electromagnetic clutch coil
    const coilGeometry = new THREE.TorusGeometry(0.6, 0.1, 8, 16);
    const coil = new THREE.Mesh(coilGeometry, this.materials.get('wire'));
    coil.position.set(3.2, 0.8, -0.8);
    coil.rotation.z = Math.PI / 2;
    
    // Belt groove
    const grooveGeometry = new THREE.CylinderGeometry(0.68, 0.68, 0.12, 24);
    const groove = new THREE.Mesh(grooveGeometry, this.materials.get('crankshaft'));
    groove.position.set(3.2, 0.8, -0.8);
    groove.rotation.z = Math.PI / 2;
    
    // Hub
    const hubGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.8, 16);
    const hub = new THREE.Mesh(hubGeometry, this.materials.get('crankshaft'));
    hub.position.set(3.2, 0.8, -0.8);
    hub.rotation.z = Math.PI / 2;
    
    pulleyGroup.add(pulley, coil, groove, hub);
    this.components.set('acCompressorPulley', pulleyGroup);
    this.config.three.staticComponents.add(pulleyGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(pulleyGroup, "AC Pulley", [0, -1, 0]);
    }
}

createIdlerPulleys() {
    const pulleyGroup = new THREE.Group();
    pulleyGroup.name = "IdlerPulleys";
    
    const idlerPositions = [
        [3.8, 0.5, 0.8],
        [2.8, 1.8, 0.6]
    ];
    
    idlerPositions.forEach((pos, index) => {
        // Main pulley body
        const pulleyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.25, 20);
        const pulley = new THREE.Mesh(pulleyGeometry, this.materials.get('radiator'));
        pulley.position.set(...pos);
        pulley.rotation.z = Math.PI / 2;
        
        // Bearing housing
        const housingGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.35, 16);
        const housing = new THREE.Mesh(housingGeometry, this.materials.get('crankshaft'));
        housing.position.set(...pos);
        housing.rotation.z = Math.PI / 2;
        
        // Mounting bracket
        const bracketGeometry = new THREE.BoxGeometry(0.6, 0.2, 0.4);
        const bracket = new THREE.Mesh(bracketGeometry, this.materials.get('engineBlock'));
        bracket.position.set(pos[0] - 0.3, pos[1], pos[2]);
        
        pulleyGroup.add(pulley, housing, bracket);
    });
    
    this.components.set('idlerPulleys', pulleyGroup);
    this.config.three.staticComponents.add(pulleyGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(pulleyGroup, "Idler Pulleys", [0, 1.2, 0]);
    }
}

createBeltTensioner() {
    const tensionerGroup = new THREE.Group();
    tensionerGroup.name = "BeltTensioner";
    
    // Main tensioner body
    const tensionerBodyGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.4, 16);
    const tensionerBody = new THREE.Mesh(tensionerBodyGeometry, this.materials.get('alternator'));
    tensionerBody.position.set(3.2, 1.5, 1.5);
    tensionerBody.rotation.z = Math.PI / 2;
    
    // Spring housing
    const springHousingGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.6, 12);
    const springHousing = new THREE.Mesh(springHousingGeometry, this.materials.get('crankshaft'));
    springHousing.position.set(3.2, 1.5, 1.5);
    springHousing.rotation.z = Math.PI / 2;
    
    // Tensioner arm
    const armGeometry = new THREE.BoxGeometry(1.2, 0.15, 0.3);
    const arm = new THREE.Mesh(armGeometry, this.materials.get('engineBlock'));
    arm.position.set(3.2, 2.1, 1.5);
    arm.rotation.z = Math.PI / 6;
    
    // Mounting bracket
    const bracketGeometry = new THREE.BoxGeometry(0.8, 0.3, 0.6);
    const bracket = new THREE.Mesh(bracketGeometry, this.materials.get('engineBlock'));
    bracket.position.set(2.7, 1.5, 1.5);
    
    tensionerGroup.add(tensionerBody, springHousing, arm, bracket);
    this.components.set('beltTensioner', tensionerGroup);
    this.config.three.staticComponents.add(tensionerGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(tensionerGroup, "Belt Tensioner", [0, -1, 0]);
    }
}

createBeltTensionerPulley() {
    const pulleyGroup = new THREE.Group();
    pulleyGroup.name = "BeltTensionerPulley";
    
    // Main pulley body
    const pulleyGeometry = new THREE.CylinderGeometry(0.45, 0.45, 0.3, 20);
    const pulley = new THREE.Mesh(pulleyGeometry, this.materials.get('radiator'));
    pulley.position.set(3.8, 2.2, 1.5);
    pulley.rotation.z = Math.PI / 2;
    
    // Bearing assembly
    const bearingGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.4, 16);
    const bearing = new THREE.Mesh(bearingGeometry, this.materials.get('crankshaft'));
    bearing.position.set(3.8, 2.2, 1.5);
    bearing.rotation.z = Math.PI / 2;
    
    pulleyGroup.add(pulley, bearing);
    this.components.set('beltTensionerPulley', pulleyGroup);
    this.config.three.staticComponents.add(pulleyGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(pulleyGroup, "Tensioner Pulley", [0, -0.8, 0]);
    }
}

createBeltPath(points) {
    const vectors = points.map(point => new THREE.Vector3(...point));
    return new THREE.CatmullRomCurve3(vectors, true);
}

createBeltMaterial() {
    return new THREE.MeshPhysicalMaterial({
        color: 0x1a1a1a,
        roughness: 0.95,
        metalness: 0.0,
        transparent: false
    });
}

createSerpentineBeltMaterial() {
    return new THREE.MeshPhysicalMaterial({
        color: 0x2a2a2a,
        roughness: 0.9,
        metalness: 0.0,
        normalScale: new THREE.Vector2(0.5, 0.5)
    });
}

createVBeltMaterial() {
    return new THREE.MeshPhysicalMaterial({
        color: 0x0a0a0a,
        roughness: 0.98,
        metalness: 0.0
    });
}