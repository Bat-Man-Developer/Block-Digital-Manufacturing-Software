// Emissions Control
createCatalyticConverter() {
    const converterGroup = new THREE.Group();
    converterGroup.name = 'CatalyticConverter';
    
    // Main housing
    const housingGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 16);
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('pipe'));
    housing.rotation.z = Math.PI / 2;
    
    // Catalyst substrate (honeycomb structure)
    const substrateGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.6, 16);
    const substrate = new THREE.Mesh(substrateGeometry, this.materials.get('engineBlock'));
    substrate.material.color.setHex(0x888888);
    substrate.rotation.z = Math.PI / 2;
    
    // Heat shield
    const shieldGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.9, 16, 1, true);
    const shield = new THREE.Mesh(shieldGeometry, this.materials.get('pipe'));
    shield.rotation.z = Math.PI / 2;
    
    // Inlet and outlet pipes
    const pipeGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 12);
    const inletPipe = new THREE.Mesh(pipeGeometry, this.materials.get('pipe'));
    inletPipe.position.set(-0.55, 0, 0);
    inletPipe.rotation.z = Math.PI / 2;
    
    const outletPipe = new THREE.Mesh(pipeGeometry, this.materials.get('pipe'));
    outletPipe.position.set(0.55, 0, 0);
    outletPipe.rotation.z = Math.PI / 2;
    
    // Temperature sensors
    const sensorGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.08, 8);
    const inletSensor = new THREE.Mesh(sensorGeometry, this.materials.get('crankshaft'));
    inletSensor.position.set(-0.3, 0.21, 0);
    
    const outletSensor = new THREE.Mesh(sensorGeometry, this.materials.get('crankshaft'));
    outletSensor.position.set(0.3, 0.21, 0);
    
    converterGroup.add(housing, substrate, shield, inletPipe, outletPipe, inletSensor, outletSensor);
    converterGroup.position.set(0, -1, -3.5);
    converterGroup.userData.component = 'catalytic_converter';
    
    this.config.three.staticComponents.add(converterGroup);
    this.components.set('catalyticConverter', converterGroup);
    this.addComponentLabel(converterGroup, 'Catalytic Converter', [0, 0.5, 0]);
    
    return converterGroup;
}

createDPFFilter() {
    const dpfGroup = new THREE.Group();
    dpfGroup.name = 'DPFFilter';
    
    // Main canister
    const canisterGeometry = new THREE.CylinderGeometry(0.25, 0.25, 1.2, 16);
    const canister = new THREE.Mesh(canisterGeometry, this.materials.get('pipe'));
    canister.rotation.z = Math.PI / 2;
    
    // Filter element
    const filterGeometry = new THREE.CylinderGeometry(0.22, 0.22, 1.0, 32);
    const filter = new THREE.Mesh(filterGeometry, this.materials.get('engineBlock'));
    filter.material.color.setHex(0xaaaaaa);
    filter.rotation.z = Math.PI / 2;
    
    // Create honeycomb pattern texture
    for (let i = 0; i < 200; i++) {
        const holeGeometry = new THREE.CylinderGeometry(0.003, 0.003, 1.1, 6);
        const hole = new THREE.Mesh(holeGeometry, this.materials.get('air'));
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 0.2;
        hole.position.set(
            Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius
        );
        hole.rotation.z = Math.PI / 2;
        dpfGroup.add(hole);
    }
    
    // Differential pressure sensors
    const dpSensorGeometry = new THREE.BoxGeometry(0.06, 0.04, 0.03);
    const inletDPSensor = new THREE.Mesh(dpSensorGeometry, this.materials.get('crankshaft'));
    inletDPSensor.position.set(-0.5, 0.3, 0);
    
    const outletDPSensor = new THREE.Mesh(dpSensorGeometry, this.materials.get('crankshaft'));
    outletDPSensor.position.set(0.5, 0.3, 0);
    
    // Pressure lines
    const lineGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.2, 8);
    const pressureLine1 = new THREE.Mesh(lineGeometry, this.materials.get('wire'));
    pressureLine1.position.set(-0.5, 0.4, 0);
    
    const pressureLine2 = new THREE.Mesh(lineGeometry, this.materials.get('wire'));
    pressureLine2.position.set(0.5, 0.4, 0);
    
    // Regeneration heater
    const heaterGeometry = new THREE.BoxGeometry(0.15, 0.08, 0.05);
    const heater = new THREE.Mesh(heaterGeometry, this.materials.get('hotMaterial'));
    heater.position.set(-0.3, -0.3, 0);
    
    dpfGroup.add(canister, filter, inletDPSensor, outletDPSensor, pressureLine1, pressureLine2, heater);
    dpfGroup.position.set(0, -1, -5);
    dpfGroup.userData.component = 'dpf_filter';
    
    this.config.three.staticComponents.add(dpfGroup);
    this.components.set('dpfFilter', dpfGroup);
    this.addComponentLabel(dpfGroup, 'DPF Filter', [0, 0.5, 0]);
    
    return dpfGroup;
}

createDPFRegenerationSystem() {
    const regenGroup = new THREE.Group();
    regenGroup.name = 'DPFRegenerationSystem';
    
    // Dosing injector
    const injectorGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.12, 8);
    const injector = new THREE.Mesh(injectorGeometry, this.materials.get('crankshaft'));
    injector.position.set(0, 0.3, 0);
    
    // Fuel dosing valve
    const valveGeometry = new THREE.BoxGeometry(0.08, 0.06, 0.04);
    const valve = new THREE.Mesh(valveGeometry, this.materials.get('engineBlock'));
    valve.position.set(0, 0.4, 0);
    
    // Mixing chamber
    const mixerGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 12);
    const mixer = new THREE.Mesh(mixerGeometry, this.materials.get('pipe'));
    mixer.rotation.z = Math.PI / 2;
    
    // Temperature probe
    const probeGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.15, 8);
    const probe = new THREE.Mesh(probeGeometry, this.materials.get('crankshaft'));
    probe.position.set(0.1, 0.13, 0);
    probe.rotation.z = -Math.PI / 4;
    
    // Control module
    const moduleGeometry = new THREE.BoxGeometry(0.15, 0.1, 0.08);
    const module = new THREE.Mesh(moduleGeometry, this.materials.get('engineBlock'));
    module.position.set(0.3, 0.2, 0);
    
    regenGroup.add(injector, valve, mixer, probe, module);
    regenGroup.position.set(0, -1, -4.5);
    regenGroup.userData.component = 'dpf_regeneration_system';
    
    this.config.three.staticComponents.add(regenGroup);
    this.components.set('dpfRegenerationSystem', regenGroup);
    this.addComponentLabel(regenGroup, 'DPF Regen System', [0, 0.6, 0]);
    
    return regenGroup;
}

createSCRSystem() {
    const scrGroup = new THREE.Group();
    scrGroup.name = 'SCRSystem';
    
    // SCR catalyst housing
    const housingGeometry = new THREE.CylinderGeometry(0.22, 0.22, 0.8, 16);
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('pipe'));
    housing.rotation.z = Math.PI / 2;
    
    // Catalyst substrate
    const catalystGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.7, 24);
    const catalyst = new THREE.Mesh(catalystGeometry, this.materials.get('engineBlock'));
    catalyst.material.color.setHex(0x666699);
    catalyst.rotation.z = Math.PI / 2;
    
    // DEF injection nozzle
    const nozzleGeometry = new THREE.ConeGeometry(0.02, 0.08, 8);
    const nozzle = new THREE.Mesh(nozzleGeometry, this.materials.get('crankshaft'));
    nozzle.position.set(-0.3, 0.23, 0);
    nozzle.rotation.z = Math.PI;
    
    // Mixing element
    const mixingGeometry = new THREE.SphereGeometry(0.15, 12, 8);
    const mixing = new THREE.Mesh(mixingGeometry, this.materials.get('pipe'));
    mixing.position.set(-0.2, 0, 0);
    
    // NOx sensors
    const sensorGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.1, 8);
    const inletNOxSensor = new THREE.Mesh(sensorGeometry, this.materials.get('crankshaft'));
    inletNOxSensor.position.set(-0.5, 0.23, 0);
    
    const outletNOxSensor = new THREE.Mesh(sensorGeometry, this.materials.get('crankshaft'));
    outletNOxSensor.position.set(0.5, 0.23, 0);
    
    scrGroup.add(housing, catalyst, nozzle, mixing, inletNOxSensor, outletNOxSensor);
    scrGroup.position.set(0, -1, -6);
    scrGroup.userData.component = 'scr_system';
    
    this.config.three.staticComponents.add(scrGroup);
    this.components.set('scrSystem', scrGroup);
    this.addComponentLabel(scrGroup, 'SCR System', [0, 0.5, 0]);
    
    return scrGroup;
}

createDEFTank() {
    const tankGroup = new THREE.Group();
    tankGroup.name = 'DEFTank';
    
    // Main tank
    const tankGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 16);
    const tank = new THREE.Mesh(tankGeometry, this.materials.get('engineBlock'));
    tank.material.color.setHex(0x4488ff);
    
    // Tank cap
    const capGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 12);
    const cap = new THREE.Mesh(capGeometry, this.materials.get('crankshaft'));
    cap.position.y = 0.425;
    
    // Level sensor
    const levelSensorGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.6, 8);
    const levelSensor = new THREE.Mesh(levelSensorGeometry, this.materials.get('crankshaft'));
    levelSensor.position.set(0.31, 0, 0);
    levelSensor.rotation.z = Math.PI / 2;
    
    // Pump module
    const pumpGeometry = new THREE.BoxGeometry(0.12, 0.08, 0.06);
    const pump = new THREE.Mesh(pumpGeometry, this.materials.get('engineBlock'));
    pump.position.y = -0.45;
    
    // Supply line
    const lineGeometry = new THREE.CylinderGeometry(0.01, 0.01, 1.5, 8);
    const supplyLine = new THREE.Mesh(lineGeometry, this.materials.get('coolantHose'));
    supplyLine.material.color.setHex(0x4488ff);
    supplyLine.position.set(0.5, -0.2, 0);
    supplyLine.rotation.z = Math.PI / 2;
    
    // Heater element
    const heaterGeometry = new THREE.TorusGeometry(0.25, 0.02, 8, 16);
    const heater = new THREE.Mesh(heaterGeometry, this.materials.get('hotMaterial'));
    heater.position.y = -0.2;
    heater.rotation.x = Math.PI / 2;
    
    tankGroup.add(tank, cap, levelSensor, pump, supplyLine, heater);
    tankGroup.position.set(3, 0, -2);
    tankGroup.userData.component = 'def_tank';
    
    this.config.three.staticComponents.add(tankGroup);
    this.components.set('defTank', tankGroup);
    this.addComponentLabel(tankGroup, 'DEF Tank', [0, 0.6, 0]);
    
    return tankGroup;
}

createDEFInjector() {
    const injectorGroup = new THREE.Group();
    injectorGroup.name = 'DEFInjector';
    
    // Injector body
    const bodyGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.15, 8);
    const body = new THREE.Mesh(bodyGeometry, this.materials.get('crankshaft'));
    
    // Nozzle
    const nozzleGeometry = new THREE.ConeGeometry(0.015, 0.05, 8);
    const nozzle = new THREE.Mesh(nozzleGeometry, this.materials.get('crankshaft'));
    nozzle.position.y = -0.1;
    
    // Mounting flange
    const flangeGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.02, 8);
    const flange = new THREE.Mesh(flangeGeometry, this.materials.get('engineBlock'));
    flange.position.y = 0.08;
    
    // Electrical connector
    const connectorGeometry = new THREE.BoxGeometry(0.03, 0.02, 0.04);
    const connector = new THREE.Mesh(connectorGeometry, this.materials.get('engineBlock'));
    connector.position.set(0.03, 0.05, 0);
    
    injectorGroup.add(body, nozzle, flange, connector);
    injectorGroup.position.set(0, 0.2, -5.5);
    injectorGroup.rotation.z = Math.PI;
    injectorGroup.userData.component = 'def_injector';
    
    this.config.three.staticComponents.add(injectorGroup);
    this.components.set('defInjector', injectorGroup);
    this.addComponentLabel(injectorGroup, 'DEF Injector', [0, 0.3, 0]);
    
    return injectorGroup;
}

createNOxSensor() {
    const sensorGroup = new THREE.Group();
    sensorGroup.name = 'NOxSensor';
    
    // Sensor body
    const bodyGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.12, 8);
    const body = new THREE.Mesh(bodyGeometry, this.materials.get('crankshaft'));
    
    // Sensing element
    const elementGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.04, 8);
    const element = new THREE.Mesh(elementGeometry, this.materials.get('sparkPlug'));
    element.position.y = -0.08;
    
    // Protective tube
    const tubeGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.06, 8, 1, true);
    const tube = new THREE.Mesh(tubeGeometry, this.materials.get('crankshaft'));
    tube.position.y = -0.08;
    
    // Electrical connection
    const wireGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.3, 8);
    const wire = new THREE.Mesh(wireGeometry, this.materials.get('wire'));
    wire.position.set(0, 0.15, 0);
    
    sensorGroup.add(body, element, tube, wire);
    sensorGroup.position.set(0.3, 0.2, -5.8);
    sensorGroup.rotation.z = -Math.PI / 2;
    sensorGroup.userData.component = 'nox_sensor';
    
    this.config.three.staticComponents.add(sensorGroup);
    this.components.set('noxSensor', sensorGroup);
    this.addComponentLabel(sensorGroup, 'NOx Sensor', [0, 0.4, 0]);
    
    return sensorGroup;
}