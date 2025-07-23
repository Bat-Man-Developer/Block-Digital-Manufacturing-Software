// Governor System
createGovernor() {
    const governorGroup = new THREE.Group();
    governorGroup.name = 'Governor';
    
    // Main housing
    const housingGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.2, 16);
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('engineBlock'));
    
    // Cover plate
    const coverGeometry = new THREE.CylinderGeometry(0.16, 0.16, 0.02, 16);
    const cover = new THREE.Mesh(coverGeometry, this.materials.get('engineBlock'));
    cover.position.y = 0.11;
    
    // Drive gear
    const gearGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 20);
    const gear = new THREE.Mesh(gearGeometry, this.materials.get('crankshaft'));
    gear.position.y = -0.12;
    
    // Gear teeth
    for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const toothGeometry = new THREE.BoxGeometry(0.01, 0.03, 0.015);
        const tooth = new THREE.Mesh(toothGeometry, this.materials.get('crankshaft'));
        tooth.position.set(
            Math.cos(angle) * 0.085,
            -0.12,
            Math.sin(angle) * 0.085
        );
        tooth.rotation.y = angle;
        governorGroup.add(tooth);
    }
    
    // Access port
    const portGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.03, 8);
    const port = new THREE.Mesh(portGeometry, this.materials.get('engineBlock'));
    port.position.set(0.16, 0, 0);
    port.rotation.z = Math.PI / 2;
    
    governorGroup.add(housing, cover, gear, port);
    governorGroup.position.set(2.5, 0, 0);
    governorGroup.userData.component = 'governor';
    
    this.config.three.staticComponents.add(governorGroup);
    this.components.set('governor', governorGroup);
    this.addComponentLabel(governorGroup, 'Governor', [0, 0.3, 0]);
    
    return governorGroup;
}

createGovernorWeights() {
    const weightsGroup = new THREE.Group();
    weightsGroup.name = 'GovernorWeights';
    
    // Weight carrier
    const carrierGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.08, 8);
    const carrier = new THREE.Mesh(carrierGeometry, this.materials.get('crankshaft'));
    
    // Individual weights
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const weightGroup = new THREE.Group();
        
        // Weight body
        const weightGeometry = new THREE.BoxGeometry(0.03, 0.08, 0.02);
        const weight = new THREE.Mesh(weightGeometry, this.materials.get('crankshaft'));
        weight.position.set(0.06, 0, 0);
        
        // Pivot pin
        const pinGeometry = new THREE.CylinderGeometry(0.003, 0.003, 0.04, 8);
        const pin = new THREE.Mesh(pinGeometry, this.materials.get('crankshaft'));
        pin.rotation.z = Math.PI / 2;
        
        // Weight arm
        const armGeometry = new THREE.CylinderGeometry(0.002, 0.002, 0.06, 8);
        const arm = new THREE.Mesh(armGeometry, this.materials.get('crankshaft'));
        arm.position.set(0.03, 0, 0);
        arm.rotation.z = Math.PI / 2;
        
        weightGroup.add(weight, pin, arm);
        weightGroup.position.set(
            Math.cos(angle) * 0.04,
            0,
            Math.sin(angle) * 0.04
        );
        weightGroup.rotation.y = angle;
        weightGroup.userData.rotationAxis = 'y';
        weightGroup.userData.component = 'governor_weight';
        
        weightsGroup.add(weightGroup);
    }
    
    weightsGroup.add(carrier);
    weightsGroup.position.set(2.5, 0, 0);
    weightsGroup.userData.component = 'governor_weights';
    weightsGroup.userData.rotationAxis = 'y';
    weightsGroup.userData.rotationSpeed = 0.5;
    
    this.config.three.movingComponents.add(weightsGroup);
    this.components.set('governorWeights', weightsGroup);
    this.addComponentLabel(weightsGroup, 'Governor Weights', [0, 0.2, 0]);
    
    return weightsGroup;
}

createGovernorSprings() {
    const springsGroup = new THREE.Group();
    springsGroup.name = 'GovernorSprings';
    
    // Main spring
    const mainSpringGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.12, 8);
    const mainSpring = new THREE.Mesh(mainSpringGeometry, this.materials.get('crankshaft'));
    mainSpring.position.set(0, 0.15, 0);
    
    // Create spring coils effect
    for (let i = 0; i < 12; i++) {
        const coilGeometry = new THREE.TorusGeometry(0.02, 0.003, 4, 8);
        const coil = new THREE.Mesh(coilGeometry, this.materials.get('crankshaft'));
        coil.position.set(0, 0.09 + (i * 0.01), 0);
        coil.rotation.x = Math.PI / 2;
        springsGroup.add(coil);
    }
    
    // Speed spring
    const speedSpringGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.08, 8);
    const speedSpring = new THREE.Mesh(speedSpringGeometry, this.materials.get('crankshaft'));
    speedSpring.position.set(0.08, 0.12, 0);
    
    // Spring seats
    const seatGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.01, 8);
    const topSeat = new THREE.Mesh(seatGeometry, this.materials.get('engineBlock'));
    topSeat.position.set(0, 0.21, 0);
    
    const bottomSeat = new THREE.Mesh(seatGeometry, this.materials.get('engineBlock'));
    bottomSeat.position.set(0, 0.09, 0);
    
    // Adjusting screw
    const screwGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.06, 8);
    const screw = new THREE.Mesh(screwGeometry, this.materials.get('crankshaft'));
    screw.position.set(0, 0.27, 0);
    
    springsGroup.add(mainSpring, speedSpring, topSeat, bottomSeat, screw);
    springsGroup.position.set(2.5, 0, 0);
    springsGroup.userData.component = 'governor_springs';
    
    this.config.three.staticComponents.add(springsGroup);
    this.components.set('governorSprings', springsGroup);
    this.addComponentLabel(springsGroup, 'Governor Springs', [0, 0.4, 0]);
    
    return springsGroup;
}

createGovernorLinkage() {
    const linkageGroup = new THREE.Group();
    linkageGroup.name = 'GovernorLinkage';
    
    // Main linkage arm
    const armGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.25, 8);
    const arm = new THREE.Mesh(armGeometry, this.materials.get('crankshaft'));
    arm.rotation.z = Math.PI / 2;
    
    // Pivot points
    const pivotGeometry = new THREE.SphereGeometry(0.015, 8, 8);
    const pivot1 = new THREE.Mesh(pivotGeometry, this.materials.get('crankshaft'));
    pivot1.position.set(-0.12, 0, 0);
    
    const pivot2 = new THREE.Mesh(pivotGeometry, this.materials.get('crankshaft'));
    pivot2.position.set(0.12, 0, 0);
    
    // Control rod
    const rodGeometry = new THREE.CylinderGeometry(0.008, 0.008, 0.4, 8);
    const rod = new THREE.Mesh(rodGeometry, this.materials.get('crankshaft'));
    rod.position.set(0.3, 0, 0);
    rod.rotation.z = Math.PI / 2;
    
    // Bellcrank
    const bellcrankGeometry = new THREE.BoxGeometry(0.08, 0.02, 0.015);
    const bellcrank = new THREE.Mesh(bellcrankGeometry, this.materials.get('crankshaft'));
    bellcrank.position.set(0.5, 0, 0);
    
    // Connecting pin
    const pinGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.03, 8);
    const pin = new THREE.Mesh(pinGeometry, this.materials.get('crankshaft'));
    pin.position.set(0.5, 0, 0);
    pin.rotation.x = Math.PI / 2;
    
    linkageGroup.add(arm, pivot1, pivot2, rod, bellcrank, pin);
    linkageGroup.position.set(2.3, 0.2, 0);
    linkageGroup.userData.component = 'governor_linkage';
    
    this.config.three.staticComponents.add(linkageGroup);
    this.components.set('governorLinkage', linkageGroup);
    this.addComponentLabel(linkageGroup, 'Governor Linkage', [0, 0.3, 0]);
    
    return linkageGroup;
}

createThrottleLinkage() {
    const throttleGroup = new THREE.Group();
    throttleGroup.name = 'ThrottleLinkage';
    
    // Throttle lever
    const leverGeometry = new THREE.CylinderGeometry(0.012, 0.012, 0.15, 8);
    const lever = new THREE.Mesh(leverGeometry, this.materials.get('crankshaft'));
    lever.rotation.z = Math.PI / 4;
    
    // Throttle shaft
    const shaftGeometry = new THREE.CylinderGeometry(0.008, 0.008, 0.2, 8);
    const shaft = new THREE.Mesh(shaftGeometry, this.materials.get('crankshaft'));
    shaft.rotation.z = Math.PI / 2;
    
    // Butterfly valve
    const butterflyGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.002, 16);
    const butterfly = new THREE.Mesh(butterflyGeometry, this.materials.get('crankshaft'));
    butterfly.position.x = 0.1;
    butterfly.rotation.y = Math.PI / 6; // Partially open
    
    // Throttle body
    const bodyGeometry = new THREE.CylinderGeometry(0.065, 0.065, 0.08, 16);
    const body = new THREE.Mesh(bodyGeometry, this.materials.get('engineBlock'));
    body.position.x = 0.1;
    body.rotation.z = Math.PI / 2;
    
    // Return spring
    const springGeometry = new THREE.TorusGeometry(0.03, 0.005, 4, 8);
    const spring = new THREE.Mesh(springGeometry, this.materials.get('crankshaft'));
    spring.position.set(-0.05, -0.05, 0);
    spring.rotation.x = Math.PI / 2;
    
    // Adjustment screw
    const adjustGeometry = new THREE.CylinderGeometry(0.006, 0.006, 0.04, 8);
    const adjust = new THREE.Mesh(adjustGeometry, this.materials.get('crankshaft'));
    adjust.position.set(-0.08, 0.08, 0);
    
    throttleGroup.add(lever, shaft, butterfly, body, spring, adjust);
    throttleGroup.position.set(1.5, 1, 0.5);
    throttleGroup.userData.component = 'throttle_linkage';
    
    this.config.three.staticComponents.add(throttleGroup);
    this.components.set('throttleLinkage', throttleGroup);
    this.addComponentLabel(throttleGroup, 'Throttle Linkage', [0, 0.2, 0]);
    
    return throttleGroup;
}