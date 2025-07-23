// Engine Mounting & Vibration
createEngineBrackets() {
    const bracketsGroup = new THREE.Group();
    bracketsGroup.name = 'EngineBrackets';
    
    // Front bracket
    const frontBracketGeometry = new THREE.BoxGeometry(0.8, 0.4, 0.3);
    const frontBracket = new THREE.Mesh(frontBracketGeometry, this.materials.get('engineBlock'));
    frontBracket.position.set(0, -3, 1.5);
    
    // Rear bracket
    const rearBracket = new THREE.Mesh(frontBracketGeometry, this.materials.get('engineBlock'));
    rearBracket.position.set(0, -3, -1.5);
    
    // Side brackets
    for (let side of [-1, 1]) {
        const sideBracketGeometry = new THREE.BoxGeometry(0.3, 0.6, 0.2);
        const sideBracket = new THREE.Mesh(sideBracketGeometry, this.materials.get('engineBlock'));
        sideBracket.position.set(side * 2, -2.5, 0);
        bracketsGroup.add(sideBracket);
        
        // Mounting holes
        for (let i = 0; i < 4; i++) {
            const holeGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8);
            const hole = new THREE.Mesh(holeGeometry, this.materials.get('air'));
            hole.position.set(
                side * 2,
                -2.5 + (i - 1.5) * 0.1,
                0.11
            );
            hole.rotation.x = Math.PI / 2;
            bracketsGroup.add(hole);
        }
    }
    
    bracketsGroup.add(frontBracket, rearBracket);
    bracketsGroup.userData.component = 'engine_brackets';
    
    this.config.three.staticComponents.add(bracketsGroup);
    this.components.set('engineBrackets', bracketsGroup);
    this.addComponentLabel(bracketsGroup, 'Engine Brackets', [0, -2.5, 0]);
    
    return bracketsGroup;
}

createVibrationDampers() {
    const dampersGroup = new THREE.Group();
    dampersGroup.name = 'VibrationDampers';
    
    // Mount positions
    const mountPositions = [
        [2, -2.8, 1.2],
        [-2, -2.8, 1.2],
        [2, -2.8, -1.2],
        [-2, -2.8, -1.2]
    ];
    
    mountPositions.forEach((pos, index) => {
        const damperGroup = new THREE.Group();
        
        // Rubber element
        const rubberGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.12, 12);
        const rubber = new THREE.Mesh(rubberGeometry, this.materials.get('engineBlock'));
        rubber.material.color.setHex(0x333333);
        
        // Metal plates
        const plateGeometry = new THREE.CylinderGeometry(0.09, 0.09, 0.02, 12);
        const topPlate = new THREE.Mesh(plateGeometry, this.materials.get('crankshaft'));
        topPlate.position.y = 0.07;
        
        const bottomPlate = new THREE.Mesh(plateGeometry, this.materials.get('crankshaft'));
        bottomPlate.position.y = -0.07;
        
        // Mounting stud
        const studGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.08, 8);
        const stud = new THREE.Mesh(studGeometry, this.materials.get('crankshaft'));
        stud.position.y = 0.1;
        
        damperGroup.add(rubber, topPlate, bottomPlate, stud);
        damperGroup.position.set(...pos);
        damperGroup.name = `VibrationDamper_${index}`;
        damperGroup.userData.component = 'vibration_damper';
        
        dampersGroup.add(damperGroup);
    });
    
    this.config.three.staticComponents.add(dampersGroup);
    this.components.set('vibrationDampers', dampersGroup);
    this.addComponentLabel(dampersGroup, 'Vibration Dampers', [0, -2.5, 0]);
    
    return dampersGroup;
}

createHarmonicBalancer() {
    const balancerGroup = new THREE.Group();
    balancerGroup.name = 'HarmonicBalancer';
    
    // Main hub
    const hubGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.08, 16);
    const hub = new THREE.Mesh(hubGeometry, this.materials.get('crankshaft'));
    
    // Inertia ring
    const ringGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.06, 24);
    const ring = new THREE.Mesh(ringGeometry, this.materials.get('engineBlock'));
    ring.position.y = 0.01;
    
    // Rubber damper
    const rubberGeometry = new THREE.TorusGeometry(0.2, 0.03, 8, 16);
    const rubber = new THREE.Mesh(rubberGeometry, this.materials.get('engineBlock'));
    rubber.material.color.setHex(0x222222);
    rubber.rotation.x = Math.PI / 2;
    
    // Timing marks
    for (let i = 0; i < 36; i++) {
        const angle = (i / 36) * Math.PI * 2;
        const markGeometry = new THREE.BoxGeometry(0.02, 0.001, 0.01);
        const mark = new THREE.Mesh(markGeometry, this.materials.get('sparkPlug'));
        mark.position.set(
            Math.cos(angle) * 0.25,
            0.04,
            Math.sin(angle) * 0.25
        );
        mark.rotation.y = angle;
        balancerGroup.add(mark);
    }
    
    balancerGroup.add(hub, ring, rubber);
    balancerGroup.position.set(0, -2.5, 2.2);
    balancerGroup.rotation.z = Math.PI / 2;
    balancerGroup.userData.component = 'harmonic_balancer';
    balancerGroup.userData.rotationAxis = 'z';
    balancerGroup.userData.rotationSpeed = 1.0;
    
    this.config.three.movingComponents.add(balancerGroup);
    this.components.set('harmonicBalancer', balancerGroup);
    this.addComponentLabel(balancerGroup, 'Harmonic Balancer', [0, 0.4, 0]);
    
    return balancerGroup;
}

createEngineIsolators() {
    const isolatorsGroup = new THREE.Group();
    isolatorsGroup.name = 'EngineIsolators';
    
    // Create isolators at strategic points
    const isolatorPositions = [
        [1.8, -3.2, 0.8],
        [-1.8, -3.2, 0.8],
        [0, -3.2, -1.5]
    ];
    
    isolatorPositions.forEach((pos, index) => {
        const isolatorGroup = new THREE.Group();
        
        // Base plate
        const baseGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.3);
        const base = new THREE.Mesh(baseGeometry, this.materials.get('crankshaft'));
        
        // Rubber stack
        for (let i = 0; i < 3; i++) {
            const rubberGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.03, 12);
            const rubber = new THREE.Mesh(rubberGeometry, this.materials.get('engineBlock'));
            rubber.material.color.setHex(0x111111);
            rubber.position.y = 0.03 + (i * 0.04);
            isolatorGroup.add(rubber);
            
            // Metal separator
            if (i < 2) {
                const separatorGeometry = new THREE.CylinderGeometry(0.13, 0.13, 0.01, 12);
                const separator = new THREE.Mesh(separatorGeometry, this.materials.get('crankshaft'));
                separator.position.y = 0.045 + (i * 0.04);
                isolatorGroup.add(separator);
            }
        }
        
        // Top plate
        const topGeometry = new THREE.BoxGeometry(0.25, 0.04, 0.25);
        const top = new THREE.Mesh(topGeometry, this.materials.get('crankshaft'));
        top.position.y = 0.15;
        
        isolatorGroup.add(base, top);
        isolatorGroup.position.set(...pos);
        isolatorGroup.name = `EngineIsolator_${index}`;
        isolatorGroup.userData.component = 'engine_isolator';
        
        isolatorsGroup.add(isolatorGroup);
    });
    
    this.config.three.staticComponents.add(isolatorsGroup);
    this.components.set('engineIsolators', isolatorsGroup);
    this.addComponentLabel(isolatorsGroup, 'Engine Isolators', [0, -3, 0]);
    
    return isolatorsGroup;
}

createFlexPlate() {
    const plateGroup = new THREE.Group();
    plateGroup.name = 'FlexPlate';
    
    // Main plate
    const plateGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.01, 32);
    const plate = new THREE.Mesh(plateGeometry, this.materials.get('crankshaft'));
    
    // Center hub
    const hubGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 16);
    const hub = new THREE.Mesh(hubGeometry, this.materials.get('crankshaft'));
    hub.position.y = 0.01;
    
    // Bolt holes around center
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const holeGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.04, 8);
        const hole = new THREE.Mesh(holeGeometry, this.materials.get('air'));
        hole.position.set(
            Math.cos(angle) * 0.06,
            0,
            Math.sin(angle) * 0.06
        );
        plateGroup.add(hole);
    }
    
    // Outer bolt pattern
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const holeGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.04, 8);
        const hole = new THREE.Mesh(holeGeometry, this.materials.get('air'));
        hole.position.set(
            Math.cos(angle) * 0.28,
            0,
            Math.sin(angle) * 0.28
        );
        plateGroup.add(hole);
    }
    
    // Ring gear teeth
    for (let i = 0; i < 120; i++) {
        const angle = (i / 120) * Math.PI * 2;
        const toothGeometry = new THREE.BoxGeometry(0.008, 0.02, 0.015);
        const tooth = new THREE.Mesh(toothGeometry, this.materials.get('crankshaft'));
        tooth.position.set(
            Math.cos(angle) * 0.355,
            0.01,
            Math.sin(angle) * 0.355
        );
        tooth.rotation.y = angle;
        plateGroup.add(tooth);
    }
    
    plateGroup.add(plate, hub);
    plateGroup.position.set(0, -2.5, -2.3);
    plateGroup.rotation.z = Math.PI / 2;
    plateGroup.userData.component = 'flex_plate';
    plateGroup.userData.rotationAxis = 'z';
    plateGroup.userData.rotationSpeed = 1.0;
    
    this.config.three.movingComponents.add(plateGroup);
    this.components.set('flexPlate', plateGroup);
    this.addComponentLabel(plateGroup, 'Flex Plate', [0, 0.4, 0]);
    
    return plateGroup;
}