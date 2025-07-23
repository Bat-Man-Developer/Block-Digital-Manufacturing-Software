// PTO & Power Take-Off
createPTOShaft() {
    const geometry = this.getOptimizedGeometry('pto_shaft', () => {
        const shaftGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 16);
        const splineGeometry = new THREE.CylinderGeometry(0.09, 0.09, 0.15, 24);
        
        // Create splined end
        for (let i = 0; i < 24; i++) {
            const angle = (i / 24) * Math.PI * 2;
            const x = Math.cos(angle) * 0.01;
            const z = Math.sin(angle) * 0.01;
            
            const splineSection = new THREE.BoxGeometry(0.02, 0.15, 0.02);
            splineSection.translate(x, 0, z);
            
            splineGeometry.merge && splineGeometry.merge(splineSection);
        }
        
        shaftGeometry.merge && shaftGeometry.merge(splineGeometry, new THREE.Matrix4().makeTranslation(0, 0.6, 0));
        return shaftGeometry;
    });
    
    const shaft = new THREE.Mesh(geometry, this.materials.get('crankshaft'));
    shaft.position.set(-3, -1, 0);
    shaft.rotation.z = Math.PI / 2;
    shaft.name = 'PTOShaft';
    shaft.userData.component = 'pto_shaft';
    shaft.userData.rotationAxis = 'z';
    shaft.userData.rotationSpeed = 0.8; // Relative to engine speed
    
    this.config.three.movingComponents.add(shaft);
    this.components.set('ptoShaft', shaft);
    this.addComponentLabel(shaft, 'PTO Shaft', [0, 0.8, 0]);
    
    return shaft;
}

createPTOClutch() {
    const clutchGroup = new THREE.Group();
    clutchGroup.name = 'PTOClutch';
    
    // Clutch housing
    const housingGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.4, 16);
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('engineBlock'));
    housing.position.set(0, 0, 0);
    
    // Clutch plates
    for (let i = 0; i < 3; i++) {
        const plateGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.02, 16);
        const plate = new THREE.Mesh(plateGeometry, this.materials.get('crankshaft'));
        plate.position.y = -0.15 + (i * 0.06);
        clutchGroup.add(plate);
    }
    
    // Pressure plate
    const pressurePlateGeometry = new THREE.CylinderGeometry(0.22, 0.22, 0.04, 16);
    const pressurePlate = new THREE.Mesh(pressurePlateGeometry, this.materials.get('engineBlock'));
    pressurePlate.position.y = 0.15;
    
    // Springs
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const springGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.08, 8);
        const spring = new THREE.Mesh(springGeometry, this.materials.get('crankshaft'));
        spring.position.set(
            Math.cos(angle) * 0.15,
            0.1,
            Math.sin(angle) * 0.15
        );
        clutchGroup.add(spring);
    }
    
    clutchGroup.add(housing, pressurePlate);
    clutchGroup.position.set(-2.5, -1, 0);
    clutchGroup.userData.component = 'pto_clutch';
    
    this.config.three.staticComponents.add(clutchGroup);
    this.components.set('ptoClutch', clutchGroup);
    this.addComponentLabel(clutchGroup, 'PTO Clutch', [0, 0.5, 0]);
    
    return clutchGroup;
}

createPTOGearbox() {
    const gearboxGroup = new THREE.Group();
    gearboxGroup.name = 'PTOGearbox';
    
    // Main housing
    const housingGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.5);
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('engineBlock'));
    
    // Mounting flanges
    const flangeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 8);
    const inputFlange = new THREE.Mesh(flangeGeometry, this.materials.get('engineBlock'));
    inputFlange.position.set(-0.4, 0, 0);
    inputFlange.rotation.z = Math.PI / 2;
    
    const outputFlange = new THREE.Mesh(flangeGeometry, this.materials.get('engineBlock'));
    outputFlange.position.set(0.4, 0, 0);
    outputFlange.rotation.z = Math.PI / 2;
    
    // Oil drain plug
    const drainPlugGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.03, 6);
    const drainPlug = new THREE.Mesh(drainPlugGeometry, this.materials.get('crankshaft'));
    drainPlug.position.set(0, -0.3, 0);
    
    // Fill plug
    const fillPlugGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.02, 6);
    const fillPlug = new THREE.Mesh(fillPlugGeometry, this.materials.get('crankshaft'));
    fillPlug.position.set(0, 0.2, 0.25);
    
    gearboxGroup.add(housing, inputFlange, outputFlange, drainPlug, fillPlug);
    gearboxGroup.position.set(-2, -1, 0);
    gearboxGroup.userData.component = 'pto_gearbox';
    
    this.config.three.staticComponents.add(gearboxGroup);
    this.components.set('ptoGearbox', gearboxGroup);
    this.addComponentLabel(gearboxGroup, 'PTO Gearbox', [0, 0.6, 0]);
    
    return gearboxGroup;
}

createPTOCover() {
    const geometry = new THREE.BoxGeometry(0.9, 0.7, 0.6);
    const cover = new THREE.Mesh(geometry, this.materials.get('engineBlock'));
    cover.position.set(-2, -1, 0);
    cover.name = 'PTOCover';
    cover.userData.component = 'pto_cover';
    
    // Add ventilation holes
    for (let i = 0; i < 4; i++) {
        const holeGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 8);
        const hole = new THREE.Mesh(holeGeometry, this.materials.get('air'));
        hole.position.set(0, 0.2 - (i * 0.1), 0.31);
        cover.add(hole);
    }
    
    this.config.three.staticComponents.add(cover);
    this.components.set('ptoCover', cover);
    this.addComponentLabel(cover, 'PTO Cover', [0, 0.7, 0]);
    
    return cover;
}

createPTOShield() {
    const shieldGroup = new THREE.Group();
    shieldGroup.name = 'PTOShield';
    
    // Main shield
    const shieldGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1.5, 16, 1, true);
    const shield = new THREE.Mesh(shieldGeometry, this.materials.get('engineBlock'));
    shield.rotation.z = Math.PI / 2;
    
    // End caps
    const capGeometry = new THREE.RingGeometry(0.1, 0.4, 16);
    const frontCap = new THREE.Mesh(capGeometry, this.materials.get('engineBlock'));
    frontCap.position.x = 0.75;
    frontCap.rotation.y = Math.PI / 2;
    
    const backCap = new THREE.Mesh(capGeometry, this.materials.get('engineBlock'));
    backCap.position.x = -0.75;
    backCap.rotation.y = -Math.PI / 2;
    
    // Warning labels
    const warningGeometry = new THREE.PlaneGeometry(0.3, 0.1);
    const warning = new THREE.Mesh(warningGeometry, this.materials.get('hotMaterial'));
    warning.position.set(0, 0.41, 0);
    
    shieldGroup.add(shield, frontCap, backCap, warning);
    shieldGroup.position.set(-3, -1, 0);
    shieldGroup.userData.component = 'pto_shield';
    
    this.config.three.staticComponents.add(shieldGroup);
    this.components.set('ptoShield', shieldGroup);
    this.addComponentLabel(shieldGroup, 'PTO Shield', [0, 0.6, 0]);
    
    return shieldGroup;
}

createPTOEngagementLever() {
    const leverGroup = new THREE.Group();
    leverGroup.name = 'PTOEngagementLever';
    
    // Lever arm
    const armGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.6, 8);
    const arm = new THREE.Mesh(armGeometry, this.materials.get('crankshaft'));
    arm.rotation.z = Math.PI / 3;
    
    // Handle
    const handleGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const handle = new THREE.Mesh(handleGeometry, this.materials.get('engineBlock'));
    handle.position.set(0.3, 0.5, 0);
    
    // Pivot point
    const pivotGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const pivot = new THREE.Mesh(pivotGeometry, this.materials.get('crankshaft'));
    
    // Linkage
    const linkageGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 8);
    const linkage = new THREE.Mesh(linkageGeometry, this.materials.get('crankshaft'));
    linkage.position.set(-0.15, -0.25, 0);
    linkage.rotation.z = -Math.PI / 6;
    
    leverGroup.add(arm, handle, pivot, linkage);
    leverGroup.position.set(-1.5, 0, 0);
    leverGroup.userData.component = 'pto_engagement_lever';
    
    this.config.three.staticComponents.add(leverGroup);
    this.components.set('ptoEngagementLever', leverGroup);
    this.addComponentLabel(leverGroup, 'PTO Lever', [0, 0.8, 0]);
    
    return leverGroup;
}