// Crankshaft Assembly
createCrankshaft() {
    const crankGroup = new THREE.Group();
    crankGroup.name = 'Crankshaft';
    const { cylinders, stroke, engineType, firingOrder } = this.config.engineParameters;
    
    crankGroup.position.set(0, -2.5, 0);
    
    const journalLength = this.calculateJournalLength(cylinders, engineType);
    const mainJournalGeometry = this.getOptimizedGeometry(
        `crankJournal_${journalLength}`,
        () => new THREE.CylinderGeometry(0.35, 0.35, journalLength, 16, 1)
    );
    
    const mainJournal = new THREE.Mesh(mainJournalGeometry, this.materials.get('crankshaft'));
    mainJournal.name = 'MainJournal';
    mainJournal.rotation.z = Math.PI / 2;
    
    // Apply shadows only to main journal
    mainJournal.castShadow = true;
    mainJournal.receiveShadow = false;
    
    crankGroup.add(mainJournal);
    
    // Sub-methods that add to crankGroup
    this.createCrankpins(crankGroup, cylinders, stroke, engineType, firingOrder);
    this.createCounterweights(crankGroup, cylinders, engineType);
    this.createCrankshaftPulley(crankGroup);
    this.createFlywheelConnection(crankGroup);
    
    this.addComponentLabel(crankGroup, 'Crankshaft', [0, -1, 0]);
    
    this.components.set('crankshaft', crankGroup);
    this.config.three.crankshaft = crankGroup;
    this.config.three.movingComponents.add(crankGroup);
}

createCrankshaftPulley(crankGroup) {
    const pulleyGeometry = this.getOptimizedGeometry(
        'crankshaftPulley',
        () => new THREE.CylinderGeometry(0.8, 0.8, 0.3, 16, 1)
    );
    
    const pulley = new THREE.Mesh(pulleyGeometry, this.materials.get('crankshaft'));
    pulley.name = 'CrankshaftPulley';
    pulley.position.x = -2.5;
    pulley.rotation.z = Math.PI / 2;
    
    // Add pulley grooves
    for (let i = 0; i < 4; i++) {
        const groove = new THREE.Mesh(
            new THREE.TorusGeometry(0.75 - i * 0.08, 0.03, 4, 16),
            this.materials.get('crankshaft')
        );
        groove.rotation.x = Math.PI / 2;
        groove.position.z = (i - 1.5) * 0.06;
        pulley.add(groove);
    }
    
    // Add harmonic balancer
    const balancerGeom = new THREE.CylinderGeometry(0.9, 0.9, 0.15, 16);
    const balancer = new THREE.Mesh(balancerGeom, this.materials.get('alternator'));
    balancer.position.z = -0.2;
    pulley.add(balancer);
    
    this.setupShadows(pulley);
    crankGroup.add(pulley);
}

createFlywheel() {
    const flywheelGroup = new THREE.Group();
    flywheelGroup.name = 'Flywheel';
    
    // Main flywheel disc
    const flywheelGeometry = this.getOptimizedGeometry(
        'flywheel_main',
        () => new THREE.CylinderGeometry(1.4, 1.4, 0.25, 32, 1)
    );
    
    const flywheel = new THREE.Mesh(flywheelGeometry, this.materials.get('crankshaft'));
    flywheel.name = 'FlywheelDisc';
    flywheel.rotation.z = Math.PI / 2;
    
    // Add mounting bolt holes
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const boltHoleGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 8);
        const boltHole = new THREE.Mesh(boltHoleGeom, this.materials.get('engineBlock'));
        
        boltHole.position.set(
            Math.cos(angle) * 1.0,
            0,
            Math.sin(angle) * 1.0
        );
        boltHole.rotation.y = Math.PI / 2;
        
        flywheel.add(boltHole);
    }
    
    // Add balance weights
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const weightGeom = new THREE.BoxGeometry(0.3, 0.15, 0.6);
        const weight = new THREE.Mesh(weightGeom, this.materials.get('crankshaft'));
        
        weight.position.set(
            Math.cos(angle) * 0.8,
            0,
            Math.sin(angle) * 0.8
        );
        weight.rotation.y = angle;
        
        flywheel.add(weight);
    }
    
    flywheelGroup.add(flywheel);
    flywheelGroup.position.set(2.8, -2.5, 0);
    
    this.addComponentLabel(flywheelGroup, 'Flywheel', [0, -0.8, 0]);
    this.setupShadows(flywheelGroup);
    
    this.components.set('flywheel', flywheelGroup);
    this.config.three.staticComponents.add(flywheelGroup);
}

createFlywheelRingGear() {
    const ringGearGroup = new THREE.Group();
    ringGearGroup.name = 'FlywheelRingGear';
    
    // Main ring gear
    const ringGearGeometry = this.getOptimizedGeometry(
        'flywheel_ring_gear',
        () => new THREE.TorusGeometry(1.35, 0.12, 8, 48)
    );
    
    const ringGear = new THREE.Mesh(ringGearGeometry, this.materials.get('alternator'));
    ringGear.name = 'RingGearMain';
    ringGear.rotation.x = Math.PI / 2;
    
    // Add gear teeth detail
    for (let i = 0; i < 96; i++) {
        const angle = (i / 96) * Math.PI * 2;
        const toothGeom = new THREE.BoxGeometry(0.05, 0.15, 0.08);
        const tooth = new THREE.Mesh(toothGeom, this.materials.get('alternator'));
        
        tooth.position.set(
            Math.cos(angle) * 1.47,
            0,
            Math.sin(angle) * 1.47
        );
        tooth.rotation.y = angle;
        
        ringGear.add(tooth);
    }
    
    ringGearGroup.add(ringGear);
    ringGearGroup.position.set(2.8, -2.5, 0);
    
    this.addComponentLabel(ringGearGroup, 'Ring Gear', [0, -0.5, 0]);
    this.setupShadows(ringGearGroup);
    
    this.components.set('flywheelRingGear', ringGearGroup);
    this.config.three.staticComponents.add(ringGearGroup);
}

createFlywheelConnection(crankGroup) {
    const flywheelGeometry = this.getOptimizedGeometry(
        'flywheel',
        () => new THREE.CylinderGeometry(1.2, 1.2, 0.2, 24, 1)
    );
    
    const flywheel = new THREE.Mesh(flywheelGeometry, this.materials.get('crankshaft'));
    flywheel.name = 'Flywheel';
    flywheel.position.x = 2.5;
    flywheel.rotation.z = Math.PI / 2;
    
    // Add flywheel ring gear
    const ringGearGeom = new THREE.TorusGeometry(1.15, 0.08, 8, 32);
    const ringGear = new THREE.Mesh(ringGearGeom, this.materials.get('alternator'));
    ringGear.rotation.x = Math.PI / 2;
    flywheel.add(ringGear);
    
    // Add clutch mounting surface
    const clutchSurfaceGeom = new THREE.CylinderGeometry(0.9, 0.9, 0.05, 16);
    const clutchSurface = new THREE.Mesh(clutchSurfaceGeom, this.materials.get('engineBlock'));
    clutchSurface.position.z = 0.12;
    flywheel.add(clutchSurface);
    
    this.setupShadows(flywheel);
    crankGroup.add(flywheel);
}

createCounterweights() {
    const counterweightGroup = new THREE.Group();
    counterweightGroup.name = 'Counterweights';
    
    const { cylinders, engineType } = this.config.engineParameters;
    const weightCount = engineType.startsWith('v') ? cylinders : Math.ceil(cylinders / 2);
    
    for (let i = 0; i < weightCount; i++) {
        const weightGeometry = this.getOptimizedGeometry(
            `counterweight_${i}`,
            () => {
                const shape = new THREE.Shape();
                shape.moveTo(-0.6, -0.3);
                shape.lineTo(0.6, -0.3);
                shape.lineTo(0.8, -0.1);
                shape.lineTo(0.8, 0.3);
                shape.lineTo(-0.8, 0.3);
                shape.lineTo(-0.8, -0.1);
                shape.closePath();
                
                return new THREE.ExtrudeGeometry(shape, {
                    depth: 0.25,
                    bevelEnabled: true,
                    bevelThickness: 0.02,
                    bevelSize: 0.02
                });
            }
        );
        
        const weight = new THREE.Mesh(weightGeometry, this.materials.get('crankshaft'));
        weight.name = `Counterweight_${i + 1}`;
        
        const angle = (i / weightCount) * Math.PI * 2;
        const xPosition = (i - (weightCount - 1) / 2) * 1.5;
        
        weight.position.set(xPosition, 0, 0);
        weight.rotation.z = angle + Math.PI;
        
        // Add weight reduction pockets
        const pocketGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.2, 8);
        const pocket1 = new THREE.Mesh(pocketGeom, this.materials.get('engineBlock'));
        pocket1.position.set(0.3, -0.1, 0);
        weight.add(pocket1);
        
        const pocket2 = new THREE.Mesh(pocketGeom, this.materials.get('engineBlock'));
        pocket2.position.set(-0.3, -0.1, 0);
        weight.add(pocket2);
        
        counterweightGroup.add(weight);
    }
    
    counterweightGroup.position.set(0, -2.5, 0);
    
    this.addComponentLabel(counterweightGroup, 'Counterweights', [0, -1.2, 0]);
    this.setupShadows(counterweightGroup);
    
    this.components.set('counterweights', counterweightGroup);
    this.config.three.staticComponents.add(counterweightGroup);
}

createCrankpins() {
    const crankpinGroup = new THREE.Group();
    crankpinGroup.name = 'Crankpins';
    
    const { cylinders, stroke, firingOrder } = this.config.engineParameters;
    const strokeRadius = (stroke / 1000) * 2.5;
    
    for (let i = 0; i < cylinders; i++) {
        const pinGeometry = this.getOptimizedGeometry(
            'crankpin',
            () => new THREE.CylinderGeometry(0.28, 0.28, 0.45, 16, 1)
        );
        
        const pin = new THREE.Mesh(pinGeometry, this.materials.get('crankshaft'));
        pin.name = `Crankpin_${i + 1}`;
        
        // Calculate throw angle based on firing order
        const firingIndex = firingOrder.indexOf(i + 1);
        const throwAngle = (firingIndex * 2 * Math.PI) / cylinders;
        
        const xPosition = (i - (cylinders - 1) / 2) * 1.5;
        
        pin.position.set(
            xPosition,
            Math.cos(throwAngle) * strokeRadius,
            Math.sin(throwAngle) * strokeRadius
        );
        pin.rotation.z = Math.PI / 2;
        
        // Add oil hole
        const oilHoleGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 6);
        const oilHole = new THREE.Mesh(oilHoleGeom, this.materials.get('engineBlock'));
        oilHole.material = oilHole.material.clone();
        oilHole.material.color.setHex(0x000000);
        pin.add(oilHole);
        
        // Add connecting rod journal surface
        const journalGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.35, 16);
        const journal = new THREE.Mesh(journalGeom, this.materials.get('alternator'));
        journal.material = journal.material.clone();
        journal.material.opacity = 0.8;
        journal.material.transparent = true;
        pin.add(journal);
        
        crankpinGroup.add(pin);
    }
    
    crankpinGroup.position.set(0, -2.5, 0);
    
    this.addComponentLabel(crankpinGroup, 'Crankpins', [0, -1.5, 0]);
    this.setupShadows(crankpinGroup);
    
    this.components.set('crankpins', crankpinGroup);
    this.config.three.staticComponents.add(crankpinGroup);
}

createMainBearings() {
    const bearingGroup = new THREE.Group();
    bearingGroup.name = 'MainBearings';
    
    const { cylinders } = this.config.engineParameters;
    const bearingCount = cylinders + 1; // One more bearing than cylinders
    
    for (let i = 0; i < bearingCount; i++) {
        // Upper bearing half
        const upperBearingGeom = this.getOptimizedGeometry(
            'main_bearing_upper',
            () => new THREE.CylinderGeometry(0.36, 0.36, 0.6, 16, 1, false, 0, Math.PI)
        );
        
        const upperBearing = new THREE.Mesh(upperBearingGeom, this.materials.get('alternator'));
        upperBearing.name = `MainBearing_Upper_${i + 1}`;
        upperBearing.rotation.z = Math.PI / 2;
        
        // Lower bearing half
        const lowerBearingGeom = this.getOptimizedGeometry(
            'main_bearing_lower',
            () => new THREE.CylinderGeometry(0.36, 0.36, 0.6, 16, 1, false, Math.PI, Math.PI)
        );
        
        const lowerBearing = new THREE.Mesh(lowerBearingGeom, this.materials.get('alternator'));
        lowerBearing.name = `MainBearing_Lower_${i + 1}`;
        lowerBearing.rotation.z = Math.PI / 2;
        
        const xPosition = (i - (bearingCount - 1) / 2) * 1.5;
        
        upperBearing.position.set(xPosition, 0, 0);
        lowerBearing.position.set(xPosition, 0, 0);
        
        // Add oil grooves
        const grooveGeom = new THREE.TorusGeometry(0.37, 0.02, 4, 16);
        const groove1 = new THREE.Mesh(grooveGeom, this.materials.get('engineBlock'));
        groove1.rotation.x = Math.PI / 2;
        groove1.position.z = -0.2;
        upperBearing.add(groove1);
        
        const groove2 = new THREE.Mesh(grooveGeom, this.materials.get('engineBlock'));
        groove2.rotation.x = Math.PI / 2;
        groove2.position.z = 0.2;
        upperBearing.add(groove2);
        
        bearingGroup.add(upperBearing);
        bearingGroup.add(lowerBearing);
    }
    
    bearingGroup.position.set(0, -2.5, 0);
    
    this.addComponentLabel(bearingGroup, 'Main Bearings', [0, -1, 0]);
    this.setupShadows(bearingGroup);
    
    this.components.set('mainBearings', bearingGroup);
    this.config.three.staticComponents.add(bearingGroup);
}

createThrustWashers() {
    const thrustGroup = new THREE.Group();
    thrustGroup.name = 'ThrustWashers';
    
    // Front thrust washer
    const frontWasherGeom = this.getOptimizedGeometry(
        'thrust_washer',
        () => new THREE.RingGeometry(0.4, 0.7, 16, 1)
    );
    
    const frontWasher = new THREE.Mesh(frontWasherGeom, this.materials.get('alternator'));
    frontWasher.name = 'FrontThrustWasher';
    frontWasher.position.x = -1.2;
    frontWasher.rotation.y = Math.PI / 2;
    
    // Rear thrust washer
    const rearWasher = new THREE.Mesh(frontWasherGeom, this.materials.get('alternator'));
    rearWasher.name = 'RearThrustWasher';
    rearWasher.position.x = 1.2;
    rearWasher.rotation.y = Math.PI / 2;
    
    // Add thrust surface detail
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const detailGeom = new THREE.BoxGeometry(0.05, 0.02, 0.1);
        
        const detail1 = new THREE.Mesh(detailGeom, this.materials.get('crankshaft'));
        detail1.position.set(
            0,
            Math.cos(angle) * 0.55,
            Math.sin(angle) * 0.55
        );
        frontWasher.add(detail1);
        
        const detail2 = new THREE.Mesh(detailGeom, this.materials.get('crankshaft'));
        detail2.position.set(
            0,
            Math.cos(angle) * 0.55,
            Math.sin(angle) * 0.55
        );
        rearWasher.add(detail2);
    }
    
    thrustGroup.add(frontWasher);
    thrustGroup.add(rearWasher);
    thrustGroup.position.set(0, -2.5, 0);
    
    this.addComponentLabel(thrustGroup, 'Thrust Washers', [0, -0.8, 0]);
    this.setupShadows(thrustGroup);
    
    this.components.set('thrustWashers', thrustGroup);
    this.config.three.staticComponents.add(thrustGroup);
}

createCrankshaftSeal() {
    const sealGroup = new THREE.Group();
    sealGroup.name = 'CrankshaftSeals';
    
    // Front crankshaft seal
    const frontSealGeom = this.getOptimizedGeometry(
        'crankshaft_seal',
        () => new THREE.CylinderGeometry(0.5, 0.5, 0.15, 16, 1)
    );
    
    const frontSeal = new THREE.Mesh(frontSealGeom, this.materials.get('engineBlock'));
    frontSeal.name = 'FrontCrankshaftSeal';
    frontSeal.position.x = -2.8;
    frontSeal.rotation.z = Math.PI / 2;
    
    // Add rubber seal lip
    const sealLipGeom = new THREE.TorusGeometry(0.38, 0.03, 4, 16);
    const frontSealLip = new THREE.Mesh(sealLipGeom, this.materials.get('engineBlock'));
    frontSealLip.material = frontSealLip.material.clone();
    frontSealLip.material.color.setHex(0x2a2a2a);
    frontSealLip.rotation.x = Math.PI / 2;
    frontSeal.add(frontSealLip);
    
    // Rear crankshaft seal
    const rearSeal = new THREE.Mesh(frontSealGeom, this.materials.get('engineBlock'));
    rearSeal.name = 'RearCrankshaftSeal';
    rearSeal.position.x = 2.8;
    rearSeal.rotation.z = Math.PI / 2;
    
    const rearSealLip = new THREE.Mesh(sealLipGeom, this.materials.get('engineBlock'));
    rearSealLip.material = rearSealLip.material.clone();
    rearSealLip.material.color.setHex(0x2a2a2a);
    rearSealLip.rotation.x = Math.PI / 2;
    rearSeal.add(rearSealLip);
    
    sealGroup.add(frontSeal);
    sealGroup.add(rearSeal);
    sealGroup.position.set(0, -2.5, 0);
    
    this.addComponentLabel(sealGroup, 'Crankshaft Seals', [0, -0.6, 0]);
    this.setupShadows(sealGroup);
    
    this.components.set('crankshaftSeal', sealGroup);
    this.config.three.staticComponents.add(sealGroup);
}

createMainBearingJournals() {
    const journalGroup = new THREE.Group();
    journalGroup.name = 'MainBearingJournals';
    
    const { cylinders } = this.config.engineParameters;
    const journalCount = cylinders + 1;
    
    for (let i = 0; i < journalCount; i++) {
        const journalGeometry = this.getOptimizedGeometry(
            'main_bearing_journal',
            () => new THREE.CylinderGeometry(0.35, 0.35, 0.8, 20, 1)
        );
        
        const journal = new THREE.Mesh(journalGeometry, this.materials.get('crankshaft'));
        journal.name = `MainJournal_${i + 1}`;
        journal.rotation.z = Math.PI / 2;
        
        const xPosition = (i - (journalCount - 1) / 2) * 1.5;
        journal.position.x = xPosition;
        
        // Add oil holes
        for (let j = 0; j < 2; j++) {
            const angle = j * Math.PI;
            const oilHoleGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 6);
            const oilHole = new THREE.Mesh(oilHoleGeom, this.materials.get('engineBlock'));
            
            oilHole.position.set(
                0,
                Math.cos(angle) * 0.2,
                Math.sin(angle) * 0.2
            );
            oilHole.rotation.x = angle;
            
            journal.add(oilHole);
        }
        
        // Add journal fillet
        const filletGeom = new THREE.TorusGeometry(0.37, 0.03, 4, 16);
        const fillet1 = new THREE.Mesh(filletGeom, this.materials.get('crankshaft'));
        fillet1.rotation.x = Math.PI / 2;
        fillet1.position.z = 0.35;
        journal.add(fillet1);
        
        const fillet2 = new THREE.Mesh(filletGeom, this.materials.get('crankshaft'));
        fillet2.rotation.x = Math.PI / 2;
        fillet2.position.z = -0.35;
        journal.add(fillet2);
        
        journalGroup.add(journal);
    }
    
    journalGroup.position.set(0, -2.5, 0);
    
    this.addComponentLabel(journalGroup, 'Main Journals', [0, -1.3, 0]);
    this.setupShadows(journalGroup);
    
    this.components.set('mainBearingJournals', journalGroup);
    this.config.three.staticComponents.add(journalGroup);
}

createRodJournals() {
    const rodJournalGroup = new THREE.Group();
    rodJournalGroup.name = 'RodJournals';
    
    const { cylinders, stroke, firingOrder } = this.config.engineParameters;
    const strokeRadius = (stroke / 1000) * 2.5;
    
    for (let i = 0; i < cylinders; i++) {
        const journalGeometry = this.getOptimizedGeometry(
            'rod_journal',
            () => new THREE.CylinderGeometry(0.25, 0.25, 0.6, 16, 1)
        );
        
        const journal = new THREE.Mesh(journalGeometry, this.materials.get('crankshaft'));
        journal.name = `RodJournal_${i + 1}`;
        journal.rotation.z = Math.PI / 2;
        
        // Calculate position based on firing order
        const firingIndex = firingOrder.indexOf(i + 1);
        const throwAngle = (firingIndex * 2 * Math.PI) / cylinders;
        const xPosition = (i - (cylinders - 1) / 2) * 1.5;
        
        journal.position.set(
            xPosition,
            Math.cos(throwAngle) * strokeRadius,
            Math.sin(throwAngle) * strokeRadius
        );
        
        // Add oil supply hole
        const oilSupplyGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 6);
        const oilSupply = new THREE.Mesh(oilSupplyGeom, this.materials.get('engineBlock'));
        oilSupply.rotation.y = Math.PI / 2;
        journal.add(oilSupply);
        
        // Add connecting passage to main journal
        const passageGeom = new THREE.CylinderGeometry(0.025, 0.025, strokeRadius, 6);
        const passage = new THREE.Mesh(passageGeom, this.materials.get('engineBlock'));
        passage.position.set(0, -strokeRadius / 2, 0);
        passage.rotation.z = -throwAngle + Math.PI / 2;
        journal.add(passage);
        
        rodJournalGroup.add(journal);
    }
    
    rodJournalGroup.position.set(0, -2.5, 0);
    
    this.addComponentLabel(rodJournalGroup, 'Rod Journals', [0, -1.8, 0]);
    this.setupShadows(rodJournalGroup);
    
    this.components.set('rodJournals', rodJournalGroup);
    this.config.three.staticComponents.add(rodJournalGroup);
}

// Calculations
calculateJournalLength(cylinders, engineType) {
    // Calculate main journal length based on engine configuration
    let baseLength = 2.0; // Base length in units
    
    if (engineType.startsWith('v')) {
        // V engines need longer journals to support the wider bearing span
        baseLength += cylinders * 0.3;
    } else {
        // Inline engines
        baseLength += cylinders * 0.2;
    }
    
    return Math.min(baseLength, 6.0); // Cap at reasonable maximum
}