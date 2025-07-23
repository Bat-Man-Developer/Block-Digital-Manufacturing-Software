// Gaskets & Seals
createOilPanGasket() {
    const gasketGroup = new THREE.Group();
    gasketGroup.name = "OilPanGasket";
    
    // Create a flat rectangular gasket with bolt holes
    const gasketShape = new THREE.Shape();
    const width = 4.5;
    const length = 3.0;
    
    // Outer perimeter
    gasketShape.moveTo(-width/2, -length/2);
    gasketShape.lineTo(width/2, -length/2);
    gasketShape.lineTo(width/2, length/2);
    gasketShape.lineTo(-width/2, length/2);
    gasketShape.lineTo(-width/2, -length/2);
    
    // Create bolt holes
    const holePositions = [
        [-width/2 + 0.3, -length/2 + 0.3],
        [width/2 - 0.3, -length/2 + 0.3],
        [-width/2 + 0.3, length/2 - 0.3],
        [width/2 - 0.3, length/2 - 0.3],
        [0, -length/2 + 0.3],
        [0, length/2 - 0.3]
    ];
    
    holePositions.forEach(pos => {
        const hole = new THREE.Path();
        hole.absarc(pos[0], pos[1], 0.08, 0, Math.PI * 2, false);
        gasketShape.holes.push(hole);
    });
    
    const gasketGeometry = new THREE.ExtrudeGeometry(gasketShape, {
        depth: 0.03,
        bevelEnabled: false
    });
    
    // Create rubber/composite gasket material
    const gasketMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x2a2a2a,
        roughness: 0.9,
        metalness: 0.1,
        transparent: true,
        opacity: 0.8
    });
    
    const gasket = new THREE.Mesh(gasketGeometry, gasketMaterial);
    gasket.position.set(0, -3.2, 0);
    gasket.rotation.x = -Math.PI / 2;
    
    gasketGroup.add(gasket);
    this.components.set('oilPanGasket', gasketGroup);
    this.config.three.staticComponents.add(gasketGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(gasketGroup, "Oil Pan Gasket", [0, 0.5, 0]);
    }
}

createIntakeManifoldGasket() {
    const gasketGroup = new THREE.Group();
    gasketGroup.name = "IntakeManifoldGasket";
    
    const cylinders = this.config.engineParameters.cylinders;
    
    for (let i = 0; i < cylinders; i++) {
        // Create individual port gaskets
        const portGasketGeometry = new THREE.RingGeometry(0.3, 0.5, 16);
        const portGasket = new THREE.Mesh(portGasketGeometry, this.createGasketMaterial());
        
        const spacing = 1.5;
        const startX = -(cylinders - 1) * spacing / 2;
        portGasket.position.set(startX + i * spacing, 2.5, 0.8);
        portGasket.rotation.x = -Math.PI / 2;
        
        gasketGroup.add(portGasket);
        
        // Add water jacket sealing areas
        const waterSealGeometry = new THREE.RingGeometry(0.15, 0.25, 12);
        const waterSeal = new THREE.Mesh(waterSealGeometry, this.createGasketMaterial());
        waterSeal.position.set(startX + i * spacing + 0.4, 2.5, 0.6);
        waterSeal.rotation.x = -Math.PI / 2;
        
        gasketGroup.add(waterSeal);
    }
    
    this.components.set('intakeManifoldGasket', gasketGroup);
    this.config.three.staticComponents.add(gasketGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(gasketGroup, "Intake Gasket", [0, 0, -1]);
    }
}

createExhaustManifoldGasket() {
    const gasketGroup = new THREE.Group();
    gasketGroup.name = "ExhaustManifoldGasket";
    
    const cylinders = this.config.engineParameters.cylinders;
    
    for (let i = 0; i < cylinders; i++) {
        // Create individual exhaust port gaskets
        const portGasketGeometry = new THREE.RingGeometry(0.25, 0.45, 16);
        const portGasket = new THREE.Mesh(portGasketGeometry, this.createHeatResistantGasket());
        
        const spacing = 1.5;
        const startX = -(cylinders - 1) * spacing / 2;
        portGasket.position.set(startX + i * spacing, 2.5, -0.8);
        portGasket.rotation.x = -Math.PI / 2;
        
        gasketGroup.add(portGasket);
        
        // Add reinforcement rings for high-temp applications
        const reinforcementGeometry = new THREE.RingGeometry(0.4, 0.48, 16);
        const reinforcement = new THREE.Mesh(reinforcementGeometry, this.materials.get('crankshaft'));
        reinforcement.position.set(startX + i * spacing, 2.48, -0.8);
        reinforcement.rotation.x = -Math.PI / 2;
        
        gasketGroup.add(reinforcement);
    }
    
    this.components.set('exhaustManifoldGasket', gasketGroup);
    this.config.three.staticComponents.add(gasketGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(gasketGroup, "Exhaust Gasket", [0, 0, 1]);
    }
}

createTimingCoverGasket() {
    const gasketGroup = new THREE.Group();
    gasketGroup.name = "TimingCoverGasket";
    
    // Create timing cover perimeter gasket
    const gasketShape = new THREE.Shape();
    
    // Outer perimeter (rounded rectangle)
    const width = 3.5;
    const height = 4.0;
    const radius = 0.2;
    
    gasketShape.moveTo(-width/2 + radius, -height/2);
    gasketShape.lineTo(width/2 - radius, -height/2);
    gasketShape.quadraticCurveTo(width/2, -height/2, width/2, -height/2 + radius);
    gasketShape.lineTo(width/2, height/2 - radius);
    gasketShape.quadraticCurveTo(width/2, height/2, width/2 - radius, height/2);
    gasketShape.lineTo(-width/2 + radius, height/2);
    gasketShape.quadraticCurveTo(-width/2, height/2, -width/2, height/2 - radius);
    gasketShape.lineTo(-width/2, -height/2 + radius);
    gasketShape.quadraticCurveTo(-width/2, -height/2, -width/2 + radius, -height/2);
    
    // Crankshaft opening
    const crankHole = new THREE.Path();
    crankHole.absarc(0, -1.5, 0.6, 0, Math.PI * 2, false);
    gasketShape.holes.push(crankHole);
    
    // Bolt holes
    const boltHoles = [
        [-1.5, -1.5], [1.5, -1.5], [-1.5, 1.5], [1.5, 1.5],
        [0, 1.8], [-1.8, 0], [1.8, 0]
    ];
    
    boltHoles.forEach(pos => {
        const hole = new THREE.Path();
        hole.absarc(pos[0], pos[1], 0.06, 0, Math.PI * 2, false);
        gasketShape.holes.push(hole);
    });
    
    const gasketGeometry = new THREE.ExtrudeGeometry(gasketShape, {
        depth: 0.04,
        bevelEnabled: false
    });
    
    const gasket = new THREE.Mesh(gasketGeometry, this.createGasketMaterial());
    gasket.position.set(2.5, 0, 0);
    gasket.rotation.y = Math.PI / 2;
    
    gasketGroup.add(gasket);
    this.components.set('timingCoverGasket', gasketGroup);
    this.config.three.staticComponents.add(gasketGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(gasketGroup, "Timing Cover Gasket", [0, 2.5, 0]);
    }
}

createWaterPumpGasket() {
    const gasketGroup = new THREE.Group();
    gasketGroup.name = "WaterPumpGasket";
    
    // Main pump housing gasket
    const pumpGasketGeometry = new THREE.RingGeometry(1.0, 1.4, 24);
    const pumpGasket = new THREE.Mesh(pumpGasketGeometry, this.createGasketMaterial());
    pumpGasket.position.set(2.8, 1.2, 0);
    pumpGasket.rotation.y = Math.PI / 2;
    
    // Inlet/outlet gaskets
    const inletGasketGeometry = new THREE.RingGeometry(0.4, 0.6, 16);
    const inletGasket = new THREE.Mesh(inletGasketGeometry, this.createGasketMaterial());
    inletGasket.position.set(2.8, 1.8, 0);
    inletGasket.rotation.y = Math.PI / 2;
    
    const outletGasket = new THREE.Mesh(inletGasketGeometry, this.createGasketMaterial());
    outletGasket.position.set(2.8, 0.6, 0);
    outletGasket.rotation.y = Math.PI / 2;
    
    gasketGroup.add(pumpGasket, inletGasket, outletGasket);
    this.components.set('waterPumpGasket', gasketGroup);
    this.config.three.staticComponents.add(gasketGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(gasketGroup, "Water Pump Gasket", [0, -1, 0]);
    }
}

createThermostatGasket() {
    const gasketGroup = new THREE.Group();
    gasketGroup.name = "ThermostatGasket";
    
    // Thermostat housing gasket
    const gasketGeometry = new THREE.RingGeometry(0.6, 0.9, 20);
    const gasket = new THREE.Mesh(gasketGeometry, this.createGasketMaterial());
    gasket.position.set(1.8, 2.2, 1.2);
    gasket.rotation.x = -Math.PI / 4;
    
    gasketGroup.add(gasket);
    this.components.set('thermostatGasket', gasketGroup);
    this.config.three.staticComponents.add(gasketGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(gasketGroup, "Thermostat Gasket", [0, -0.5, 0]);
    }
}

createFrontCrankshaftSeal() {
    const sealGroup = new THREE.Group();
    sealGroup.name = "FrontCrankshaftSeal";
    
    // Main seal body
    const sealGeometry = new THREE.RingGeometry(0.5, 0.8, 24);
    const seal = new THREE.Mesh(sealGeometry, this.createSealMaterial());
    seal.position.set(3.2, 0, 0);
    seal.rotation.y = Math.PI / 2;
    
    // Spring-loaded lip
    const lipGeometry = new THREE.TorusGeometry(0.55, 0.03, 8, 16);
    const sealLip = new THREE.Mesh(lipGeometry, this.createSealMaterial());
    sealLip.position.set(3.18, 0, 0);
    sealLip.rotation.y = Math.PI / 2;
    
    sealGroup.add(seal, sealLip);
    this.components.set('frontCrankshaftSeal', sealGroup);
    this.config.three.staticComponents.add(sealGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(sealGroup, "Front Crank Seal", [0, 1, 0]);
    }
}

createRearCrankshaftSeal() {
    const sealGroup = new THREE.Group();
    sealGroup.name = "RearCrankshaftSeal";
    
    // Main seal body
    const sealGeometry = new THREE.RingGeometry(0.5, 0.8, 24);
    const seal = new THREE.Mesh(sealGeometry, this.createSealMaterial());
    seal.position.set(-3.2, 0, 0);
    seal.rotation.y = Math.PI / 2;
    
    // Spring-loaded lip
    const lipGeometry = new THREE.TorusGeometry(0.55, 0.03, 8, 16);
    const sealLip = new THREE.Mesh(lipGeometry, this.createSealMaterial());
    sealLip.position.set(-3.18, 0, 0);
    sealLip.rotation.y = Math.PI / 2;
    
    sealGroup.add(seal, sealLip);
    this.components.set('rearCrankshaftSeal', sealGroup);
    this.config.three.staticComponents.add(sealGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(sealGroup, "Rear Crank Seal", [0, 1, 0]);
    }
}

createCamshaftSeal() {
    const sealGroup = new THREE.Group();
    sealGroup.name = "CamshaftSeal";
    
    // Main seal body
    const sealGeometry = new THREE.RingGeometry(0.3, 0.5, 20);
    const seal = new THREE.Mesh(sealGeometry, this.createSealMaterial());
    seal.position.set(2.8, 2.5, 0);
    seal.rotation.y = Math.PI / 2;
    
    // Spring-loaded lip
    const lipGeometry = new THREE.TorusGeometry(0.35, 0.02, 8, 16);
    const sealLip = new THREE.Mesh(lipGeometry, this.createSealMaterial());
    sealLip.position.set(2.78, 2.5, 0);
    sealLip.rotation.y = Math.PI / 2;
    
    sealGroup.add(seal, sealLip);
    this.components.set('camshaftSeal', sealGroup);
    this.config.three.staticComponents.add(sealGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(sealGroup, "Cam Seal", [0, -0.8, 0]);
    }
}

createORings() {
    const oRingGroup = new THREE.Group();
    oRingGroup.name = "ORings";
    
    // Various O-ring locations
    const oRingLocations = [
        { pos: [1.5, 1.0, 1.5], size: [0.15, 0.02], name: "Oil Filter" },
        { pos: [-1.2, 0.8, 1.2], size: [0.12, 0.015], name: "Sensor" },
        { pos: [0.5, -2.5, 0.8], size: [0.1, 0.01], name: "Oil Drain" },
        { pos: [2.2, 1.8, 0.5], size: [0.18, 0.025], name: "Thermostat" },
        { pos: [-2.0, 0.5, -1.5], size: [0.08, 0.008], name: "Injector" }
    ];
    
    oRingLocations.forEach((location, index) => {
        const oRingGeometry = new THREE.TorusGeometry(location.size[0], location.size[1], 8, 16);
        const oRing = new THREE.Mesh(oRingGeometry, this.createSealMaterial());
        oRing.position.set(...location.pos);
        
        // Random orientation based on installation
        if (index % 2 === 0) oRing.rotation.x = Math.PI / 2;
        if (index % 3 === 0) oRing.rotation.z = Math.PI / 4;
        
        oRingGroup.add(oRing);
    });
    
    this.components.set('oRings', oRingGroup);
    this.config.three.staticComponents.add(oRingGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(oRingGroup, "O-Rings", [0, 1.5, 0]);
    }
}

createGasketMaterial() {
    return new THREE.MeshPhysicalMaterial({
        color: 0x444444,
        roughness: 0.95,
        metalness: 0.05,
        transparent: true,
        opacity: 0.9
    });
}

createHeatResistantGasket() {
    return new THREE.MeshPhysicalMaterial({
        color: 0x2a1a1a,
        roughness: 0.9,
        metalness: 0.1,
        emissive: 0x110000,
        emissiveIntensity: 0.1
    });
}

createSealMaterial() {
    return new THREE.MeshPhysicalMaterial({
        color: 0x1a1a1a,
        roughness: 0.8,
        metalness: 0.0,
        transparent: true,
        opacity: 0.95
    });
}