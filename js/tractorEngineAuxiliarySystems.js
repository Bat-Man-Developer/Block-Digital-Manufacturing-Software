// Auxiliary Systems
createAirCompressor() {
    const group = new THREE.Group();
    group.name = 'AirCompressor';
    
    // Main compressor body
    const bodyGeometry = this.getOptimizedGeometry(
        'airCompressorBody',
        () => new THREE.CylinderGeometry(0.8, 0.8, 1.2, 16)
    );
    const compressorBody = new THREE.Mesh(bodyGeometry, this.materials.get('alternator'));
    compressorBody.name = 'CompressorBody';
    compressorBody.position.set(3.5, 1.5, 1);
    group.add(compressorBody);
    
    // Compressor head
    const headGeometry = this.getOptimizedGeometry(
        'airCompressorHead',
        () => new THREE.CylinderGeometry(0.6, 0.6, 0.4, 12)
    );
    const compressorHead = new THREE.Mesh(headGeometry, this.materials.get('cylinderHead'));
    compressorHead.name = 'CompressorHead';
    compressorHead.position.set(3.5, 2.3, 1);
    group.add(compressorHead);
    
    // Air outlet manifold
    const outletGeometry = this.getOptimizedGeometry(
        'airOutletManifold',
        () => new THREE.BoxGeometry(0.3, 0.2, 0.8)
    );
    const outlet = new THREE.Mesh(outletGeometry, this.materials.get('pipe'));
    outlet.name = 'AirOutlet';
    outlet.position.set(3.5, 2.6, 1);
    group.add(outlet);
    
    // Drive pulley
    const pulleyGeometry = this.getOptimizedGeometry(
        'compressorPulley',
        () => new THREE.CylinderGeometry(0.4, 0.4, 0.15, 16)
    );
    const pulley = new THREE.Mesh(pulleyGeometry, this.materials.get('crankshaft'));
    pulley.name = 'CompressorPulley';
    pulley.position.set(3.5, 0.3, 1);
    pulley.rotation.x = Math.PI / 2;
    group.add(pulley);
    
    this.config.three.staticComponents.add(group);
    this.components.set('airCompressor', group);
}

createHydraulicPump() {
    const group = new THREE.Group();
    group.name = 'HydraulicPump';
    
    // Pump housing
    const housingGeometry = this.getOptimizedGeometry(
        'hydraulicPumpHousing',
        () => new THREE.BoxGeometry(1.2, 0.8, 0.6)
    );
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('engineBlock'));
    housing.name = 'PumpHousing';
    housing.position.set(4, 0.5, -1.5);
    group.add(housing);
    
    // Pump gear case
    const gearCaseGeometry = this.getOptimizedGeometry(
        'hydraulicGearCase',
        () => new THREE.CylinderGeometry(0.5, 0.5, 0.4, 12)
    );
    const gearCase = new THREE.Mesh(gearCaseGeometry, this.materials.get('alternator'));
    gearCase.name = 'GearCase';
    gearCase.position.set(4, 0.9, -1.5);
    group.add(gearCase);
    
    // Hydraulic lines
    const supplyLine = this.createRigidPipe(
        [4, 1.3, -1.5], [4.5, 1.3, -2],
        this.materials.get('pipe'), 0.03
    );
    supplyLine.name = 'HydraulicSupplyLine';
    group.add(supplyLine);
    
    const returnLine = this.createRigidPipe(
        [3.5, 1.3, -1.5], [3, 1.3, -2],
        this.materials.get('pipe'), 0.03
    );
    returnLine.name = 'HydraulicReturnLine';
    group.add(returnLine);
    
    // Drive coupling
    const couplingGeometry = this.getOptimizedGeometry(
        'hydraulicCoupling',
        () => new THREE.CylinderGeometry(0.2, 0.2, 0.3, 8)
    );
    const coupling = new THREE.Mesh(couplingGeometry, this.materials.get('crankshaft'));
    coupling.name = 'PumpCoupling';
    coupling.position.set(4, 0.1, -1.5);
    coupling.rotation.x = Math.PI / 2;
    group.add(coupling);
    
    this.config.three.staticComponents.add(group);
    this.components.set('hydraulicPump', group);
}

createPowerSteeringPump() {
    const group = new THREE.Group();
    group.name = 'PowerSteeringPump';
    
    // Pump body
    const bodyGeometry = this.getOptimizedGeometry(
        'powerSteeringBody',
        () => new THREE.SphereGeometry(0.4, 12, 8)
    );
    const pumpBody = new THREE.Mesh(bodyGeometry, this.materials.get('alternator'));
    pumpBody.name = 'PowerSteeringBody';
    pumpBody.position.set(-3, 1.8, 1.5);
    group.add(pumpBody);
    
    // Reservoir
    const reservoirGeometry = this.getOptimizedGeometry(
        'powerSteeringReservoir',
        () => new THREE.CylinderGeometry(0.25, 0.25, 0.6, 12)
    );
    const reservoir = new THREE.Mesh(reservoirGeometry, this.materials.get('engineBlock'));
    reservoir.name = 'PowerSteeringReservoir';
    reservoir.position.set(-3, 2.5, 1.5);
    group.add(reservoir);
    
    // Pulley
    const pulleyGeometry = this.getOptimizedGeometry(
        'powerSteeringPulley',
        () => new THREE.CylinderGeometry(0.35, 0.35, 0.12, 16)
    );
    const pulley = new THREE.Mesh(pulleyGeometry, this.materials.get('crankshaft'));
    pulley.name = 'PowerSteeringPulley';
    pulley.position.set(-3, 1.8, 2.2);
    pulley.rotation.x = Math.PI / 2;
    group.add(pulley);
    
    // High pressure line
    const highPressureLine = this.createFlexibleHose(
        [-2.6, 1.8, 1.5], [-2, 1.8, 2],
        this.materials.get('pipe'), 0.04
    );
    highPressureLine.name = 'HighPressureLine';
    group.add(highPressureLine);
    
    // Return line
    const returnLine = this.createFlexibleHose(
        [-3.4, 1.8, 1.5], [-4, 1.8, 2],
        this.materials.get('pipe'), 0.03
    );
    returnLine.name = 'ReturnLine';
    group.add(returnLine);
    
    this.config.three.staticComponents.add(group);
    this.components.set('powerSteeringPump', group);
}

createACCompressor() {
    const group = new THREE.Group();
    group.name = 'ACCompressor';
    
    // Compressor housing
    const housingGeometry = this.getOptimizedGeometry(
        'acCompressorHousing',
        () => new THREE.CylinderGeometry(0.6, 0.7, 1.4, 16)
    );
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('alternator'));
    housing.name = 'ACCompressorHousing';
    housing.position.set(-2.5, 1, -1);
    group.add(housing);
    
    // Clutch assembly
    const clutchGeometry = this.getOptimizedGeometry(
        'acClutch',
        () => new THREE.CylinderGeometry(0.5, 0.5, 0.2, 16)
    );
    const clutch = new THREE.Mesh(clutchGeometry, this.materials.get('crankshaft'));
    clutch.name = 'ACClutch';
    clutch.position.set(-2.5, 0.2, -1);
    clutch.rotation.x = Math.PI / 2;
    group.add(clutch);
    
    // Suction line
    const suctionLineGeometry = this.getOptimizedGeometry(
        'acSuctionLine',
        () => new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8)
    );
    const suctionLine = new THREE.Mesh(suctionLineGeometry, this.materials.get('pipe'));
    suctionLine.name = 'SuctionLine';
    suctionLine.position.set(-2.1, 1.5, -1);
    suctionLine.rotation.z = Math.PI / 4;
    group.add(suctionLine);
    
    // Discharge line
    const dischargeLineGeometry = this.getOptimizedGeometry(
        'acDischargeLine',
        () => new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8)
    );
    const dischargeLine = new THREE.Mesh(dischargeLineGeometry, this.materials.get('pipe'));
    dischargeLine.name = 'DischargeLine';
    dischargeLine.position.set(-2.9, 1.5, -1);
    dischargeLine.rotation.z = -Math.PI / 4;
    group.add(dischargeLine);
    
    // Electrical connector
    const connectorGeometry = this.getOptimizedGeometry(
        'acConnector',
        () => new THREE.BoxGeometry(0.15, 0.1, 0.2)
    );
    const connector = new THREE.Mesh(connectorGeometry, this.materials.get('wire'));
    connector.name = 'ACConnector';
    connector.position.set(-2.5, 1.8, -0.6);
    group.add(connector);
    
    this.config.three.staticComponents.add(group);
    this.components.set('acCompressor', group);
}

createVacuumPump() {
    const group = new THREE.Group();
    group.name = 'VacuumPump';
    
    // Pump body
    const bodyGeometry = this.getOptimizedGeometry(
        'vacuumPumpBody',
        () => new THREE.CylinderGeometry(0.3, 0.3, 0.8, 12)
    );
    const pumpBody = new THREE.Mesh(bodyGeometry, this.materials.get('engineBlock'));
    pumpBody.name = 'VacuumPumpBody';
    pumpBody.position.set(2.5, 3, -1);
    group.add(pumpBody);
    
    // Vacuum reservoir
    const reservoirGeometry = this.getOptimizedGeometry(
        'vacuumReservoir',
        () => new THREE.SphereGeometry(0.4, 12, 8)
    );
    const reservoir = new THREE.Mesh(reservoirGeometry, this.materials.get('engineBlock'));
    reservoir.name = 'VacuumReservoir';
    reservoir.position.set(3.2, 3, -1);
    group.add(reservoir);
    
    // Vacuum lines
    const vacuumLine1 = this.createFlexibleHose(
        [2.8, 3, -1], [3.6, 3, -1],
        this.materials.get('vacuumHose'), 0.02
    );
    vacuumLine1.name = 'VacuumLine1';
    group.add(vacuumLine1);
    
    const vacuumLine2 = this.createFlexibleHose(
        [3.2, 2.6, -1], [3.2, 2, -1.5],
        this.materials.get('vacuumHose'), 0.02
    );
    vacuumLine2.name = 'VacuumLine2';
    group.add(vacuumLine2);
    
    // Check valve
    const checkValveGeometry = this.getOptimizedGeometry(
        'vacuumCheckValve',
        () => new THREE.CylinderGeometry(0.03, 0.03, 0.15, 8)
    );
    const checkValve = new THREE.Mesh(checkValveGeometry, this.materials.get('sparkPlug'));
    checkValve.name = 'VacuumCheckValve';
    checkValve.position.set(3.2, 2.3, -1.2);
    group.add(checkValve);
    
    this.config.three.staticComponents.add(group);
    this.components.set('vacuumPump', group);
}