// Feul System
createFuelTank() {
    const fuelTankGroup = new THREE.Group();
    fuelTankGroup.name = 'FuelTank';
    
    // Main tank body
    const tankGeometry = this.getOptimizedGeometry(
        'fuelTank_main',
        () => new THREE.CylinderGeometry(2.0, 2.0, 3.0, 24, 1)
    );
    const tankBody = new THREE.Mesh(tankGeometry, this.materials.get('fuelPump'));
    tankBody.name = 'FuelTankBody';
    tankBody.rotation.z = Math.PI / 2;
    this.setupShadows(tankBody);
    
    // Tank ends (caps)
    const endGeometry = this.getOptimizedGeometry(
        'fuelTank_end',
        () => new THREE.SphereGeometry(2.0, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2)
    );
    
    const leftEnd = new THREE.Mesh(endGeometry, this.materials.get('fuelPump'));
    leftEnd.position.set(-1.5, 0, 0);
    leftEnd.rotation.z = Math.PI / 2;
    this.setupShadows(leftEnd);
    
    const rightEnd = new THREE.Mesh(endGeometry, this.materials.get('fuelPump'));
    rightEnd.position.set(1.5, 0, 0);
    rightEnd.rotation.z = -Math.PI / 2;
    this.setupShadows(rightEnd);
    
    // Tank mounting straps
    const strapGeometry = this.getOptimizedGeometry(
        'fuelTank_strap',
        () => new THREE.BoxGeometry(0.1, 0.3, 4.2)
    );
    
    const topStrap = new THREE.Mesh(strapGeometry, this.materials.get('engineBlock'));
    topStrap.position.set(0, 2.2, 0);
    this.setupShadows(topStrap);
    
    const bottomStrap = new THREE.Mesh(strapGeometry, this.materials.get('engineBlock'));
    bottomStrap.position.set(0, -2.2, 0);
    this.setupShadows(bottomStrap);
    
    fuelTankGroup.add(tankBody, leftEnd, rightEnd, topStrap, bottomStrap);
    fuelTankGroup.position.set(8, -2, 0);
    
    this.addComponentLabel(fuelTankGroup, 'Fuel Tank', [0, 3, 0]);
    this.components.set('fuelTank', fuelTankGroup);
    this.config.three.staticComponents.add(fuelTankGroup);
}

createFuelPump() {
    const fuelPumpGroup = new THREE.Group();
    fuelPumpGroup.name = 'FuelPump';
    
    // Main pump housing
    const pumpHousingGeometry = this.getOptimizedGeometry(
        'fuelPump_housing',
        () => new THREE.CylinderGeometry(0.4, 0.4, 1.2, 12, 1)
    );
    const pumpHousing = new THREE.Mesh(pumpHousingGeometry, this.materials.get('fuelPump'));
    pumpHousing.name = 'FuelPumpHousing';
    this.setupShadows(pumpHousing);
    
    // Pump motor
    const motorGeometry = this.getOptimizedGeometry(
        'fuelPump_motor',
        () => new THREE.BoxGeometry(0.6, 0.8, 0.6)
    );
    const pumpMotor = new THREE.Mesh(motorGeometry, this.materials.get('alternator'));
    pumpMotor.position.set(0, 0.8, 0);
    this.setupShadows(pumpMotor);
    
    // Inlet fitting
    const inletGeometry = this.getOptimizedGeometry(
        'fuelPump_inlet',
        () => new THREE.CylinderGeometry(0.15, 0.15, 0.4, 8, 1)
    );
    const inlet = new THREE.Mesh(inletGeometry, this.materials.get('pipe'));
    inlet.position.set(0, -0.8, 0);
    this.setupShadows(inlet);
    
    // Outlet fitting
    const outlet = new THREE.Mesh(inletGeometry, this.materials.get('pipe'));
    outlet.position.set(0.5, 0, 0);
    outlet.rotation.z = -Math.PI / 2;
    this.setupShadows(outlet);
    
    // Electrical connections
    const connectorGeometry = this.getOptimizedGeometry(
        'fuelPump_connector',
        () => new THREE.BoxGeometry(0.2, 0.15, 0.1)
    );
    const connector = new THREE.Mesh(connectorGeometry, this.materials.get('wire'));
    connector.position.set(0.3, 1.0, 0);
    this.setupShadows(connector);
    
    fuelPumpGroup.add(pumpHousing, pumpMotor, inlet, outlet, connector);
    fuelPumpGroup.position.set(6, -1, 2);
    
    this.addComponentLabel(fuelPumpGroup, 'Fuel Pump', [0, 1.5, 0]);
    this.components.set('fuelPump', fuelPumpGroup);
    this.config.three.staticComponents.add(fuelPumpGroup);
}

createLiftPump() {
    const liftPumpGroup = new THREE.Group();
    liftPumpGroup.name = 'LiftPump';
    
    // Lift pump body (mechanical)
    const pumpBodyGeometry = this.getOptimizedGeometry(
        'liftPump_body',
        () => new THREE.BoxGeometry(0.8, 0.6, 0.4)
    );
    const pumpBody = new THREE.Mesh(pumpBodyGeometry, this.materials.get('fuelPump'));
    pumpBody.name = 'LiftPumpBody';
    this.setupShadows(pumpBody);
    
    // Diaphragm chamber
    const diaphragmGeometry = this.getOptimizedGeometry(
        'liftPump_diaphragm',
        () => new THREE.CylinderGeometry(0.3, 0.3, 0.2, 12, 1)
    );
    const diaphragm = new THREE.Mesh(diaphragmGeometry, this.materials.get('engineBlock'));
    diaphragm.position.set(0, 0.4, 0);
    this.setupShadows(diaphragm);
    
    // Actuating lever
    const leverGeometry = this.getOptimizedGeometry(
        'liftPump_lever',
        () => new THREE.BoxGeometry(0.05, 0.8, 0.1)
    );
    const lever = new THREE.Mesh(leverGeometry, this.materials.get('engineBlock'));
    lever.position.set(-0.5, 0, 0);
    lever.rotation.z = Math.PI / 6;
    this.setupShadows(lever);
    
    // Inlet and outlet ports
    const portGeometry = this.getOptimizedGeometry(
        'liftPump_port',
        () => new THREE.CylinderGeometry(0.1, 0.1, 0.3, 8, 1)
    );
    
    const inletPort = new THREE.Mesh(portGeometry, this.materials.get('pipe'));
    inletPort.position.set(-0.3, 0, -0.35);
    inletPort.rotation.x = Math.PI / 2;
    this.setupShadows(inletPort);
    
    const outletPort = new THREE.Mesh(portGeometry, this.materials.get('pipe'));
    outletPort.position.set(0.3, 0, -0.35);
    outletPort.rotation.x = Math.PI / 2;
    this.setupShadows(outletPort);
    
    liftPumpGroup.add(pumpBody, diaphragm, lever, inletPort, outletPort);
    liftPumpGroup.position.set(1.5, 1, 2.5);
    
    this.addComponentLabel(liftPumpGroup, 'Lift Pump', [0, 0.8, 0]);
    this.components.set('liftPump', liftPumpGroup);
    this.config.three.staticComponents.add(liftPumpGroup);
}

createPrimaryFuelFilter() {
    const primaryFilterGroup = new THREE.Group();
    primaryFilterGroup.name = 'PrimaryFuelFilter';
    
    // Filter housing
    const housingGeometry = this.getOptimizedGeometry(
        'primaryFilter_housing',
        () => new THREE.CylinderGeometry(0.6, 0.6, 1.0, 16, 1)
    );
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('fuelPump'));
    housing.name = 'PrimaryFilterHousing';
    this.setupShadows(housing);
    
    // Filter element
    const elementGeometry = this.getOptimizedGeometry(
        'primaryFilter_element',
        () => new THREE.CylinderGeometry(0.5, 0.5, 0.8, 16, 1)
    );
    const element = new THREE.Mesh(elementGeometry, this.materials.get('airFilter'));
    element.position.set(0, 0, 0);
    this.setupShadows(element);
    
    // Top cap
    const capGeometry = this.getOptimizedGeometry(
        'primaryFilter_cap',
        () => new THREE.CylinderGeometry(0.65, 0.65, 0.1, 16, 1)
    );
    const topCap = new THREE.Mesh(capGeometry, this.materials.get('engineBlock'));
    topCap.position.set(0, 0.55, 0);
    this.setupShadows(topCap);
    
    // Bottom cap with drain
    const bottomCap = new THREE.Mesh(capGeometry, this.materials.get('engineBlock'));
    bottomCap.position.set(0, -0.55, 0);
    this.setupShadows(bottomCap);
    
    // Drain valve
    const drainGeometry = this.getOptimizedGeometry(
        'primaryFilter_drain',
        () => new THREE.CylinderGeometry(0.05, 0.05, 0.2, 8, 1)
    );
    const drain = new THREE.Mesh(drainGeometry, this.materials.get('pipe'));
    drain.position.set(0, -0.75, 0);
    this.setupShadows(drain);
    
    // Inlet/outlet fittings
    const fittingGeometry = this.getOptimizedGeometry(
        'primaryFilter_fitting',
        () => new THREE.CylinderGeometry(0.12, 0.12, 0.3, 8, 1)
    );
    
    const inlet = new THREE.Mesh(fittingGeometry, this.materials.get('pipe'));
    inlet.position.set(0.7, 0.2, 0);
    inlet.rotation.z = Math.PI / 2;
    this.setupShadows(inlet);
    
    const outlet = new THREE.Mesh(fittingGeometry, this.materials.get('pipe'));
    outlet.position.set(0.7, -0.2, 0);
    outlet.rotation.z = Math.PI / 2;
    this.setupShadows(outlet);
    
    primaryFilterGroup.add(housing, element, topCap, bottomCap, drain, inlet, outlet);
    primaryFilterGroup.position.set(4, 0, 3);
    
    this.addComponentLabel(primaryFilterGroup, 'Primary Filter', [0, 1.2, 0]);
    this.components.set('primaryFuelFilter', primaryFilterGroup);
    this.config.three.staticComponents.add(primaryFilterGroup);
}

createSecondaryFuelFilter() {
    const secondaryFilterGroup = new THREE.Group();
    secondaryFilterGroup.name = 'SecondaryFuelFilter';
    
    // Filter housing (smaller than primary)
    const housingGeometry = this.getOptimizedGeometry(
        'secondaryFilter_housing',
        () => new THREE.CylinderGeometry(0.4, 0.4, 0.8, 16, 1)
    );
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('fuelPump'));
    housing.name = 'SecondaryFilterHousing';
    this.setupShadows(housing);
    
    // Filter element (finer filtration)
    const elementGeometry = this.getOptimizedGeometry(
        'secondaryFilter_element',
        () => new THREE.CylinderGeometry(0.3, 0.3, 0.6, 16, 1)
    );
    const element = new THREE.Mesh(elementGeometry, this.materials.get('sparkPlug'));
    element.position.set(0, 0, 0);
    this.setupShadows(element);
    
    // Mounting bracket
    const bracketGeometry = this.getOptimizedGeometry(
        'secondaryFilter_bracket',
        () => new THREE.BoxGeometry(0.8, 0.1, 0.1)
    );
    const bracket = new THREE.Mesh(bracketGeometry, this.materials.get('engineBlock'));
    bracket.position.set(0, 0.5, 0);
    this.setupShadows(bracket);
    
    // Inlet/outlet fittings
    const fittingGeometry = this.getOptimizedGeometry(
        'secondaryFilter_fitting',
        () => new THREE.CylinderGeometry(0.08, 0.08, 0.2, 8, 1)
    );
    
    const inlet = new THREE.Mesh(fittingGeometry, this.materials.get('pipe'));
    inlet.position.set(0.5, 0.1, 0);
    inlet.rotation.z = Math.PI / 2;
    this.setupShadows(inlet);
    
    const outlet = new THREE.Mesh(fittingGeometry, this.materials.get('pipe'));
    outlet.position.set(0.5, -0.1, 0);
    outlet.rotation.z = Math.PI / 2;
    this.setupShadows(outlet);
    
    secondaryFilterGroup.add(housing, element, bracket, inlet, outlet);
    secondaryFilterGroup.position.set(2.5, 1.5, 3);
    
    this.addComponentLabel(secondaryFilterGroup, 'Secondary Filter', [0, 1.0, 0]);
    this.components.set('secondaryFuelFilter', secondaryFilterGroup);
    this.config.three.staticComponents.add(secondaryFilterGroup);
}

createWaterSeparator() {
    const waterSeparatorGroup = new THREE.Group();
    waterSeparatorGroup.name = 'WaterSeparator';
    
    // Main separator body
    const separatorGeometry = this.getOptimizedGeometry(
        'waterSeparator_body',
        () => new THREE.CylinderGeometry(0.5, 0.5, 1.2, 16, 1)
    );
    const separatorBody = new THREE.Mesh(separatorGeometry, this.materials.get('fuelPump'));
    separatorBody.name = 'WaterSeparatorBody';
    this.setupShadows(separatorBody);
    
    // Water collection bowl (transparent)
    const bowlGeometry = this.getOptimizedGeometry(
        'waterSeparator_bowl',
        () => new THREE.CylinderGeometry(0.45, 0.45, 0.4, 16, 1)
    );
    const bowl = new THREE.Mesh(bowlGeometry, this.materials.get('water'));
    bowl.position.set(0, -0.8, 0);
    this.setupShadows(bowl);
    
    // Separator element
    const elementGeometry = this.getOptimizedGeometry(
        'waterSeparator_element',
        () => new THREE.CylinderGeometry(0.4, 0.4, 0.6, 16, 1)
    );
    const element = new THREE.Mesh(elementGeometry, this.materials.get('airFilter'));
    element.position.set(0, 0.1, 0);
    this.setupShadows(element);
    
    // Water level sensor
    const sensorGeometry = this.getOptimizedGeometry(
        'waterSeparator_sensor',
        () => new THREE.BoxGeometry(0.15, 0.1, 0.05)
    );
    const sensor = new THREE.Mesh(sensorGeometry, this.materials.get('wire'));
    sensor.position.set(0.45, -0.8, 0);
    this.setupShadows(sensor);
    
    // Drain valve
    const drainGeometry = this.getOptimizedGeometry(
        'waterSeparator_drain',
        () => new THREE.CylinderGeometry(0.06, 0.06, 0.25, 8, 1)
    );
    const drain = new THREE.Mesh(drainGeometry, this.materials.get('pipe'));
    drain.position.set(0, -1.1, 0);
    this.setupShadows(drain);
    
    // Inlet/outlet ports
    const portGeometry = this.getOptimizedGeometry(
        'waterSeparator_port',
        () => new THREE.CylinderGeometry(0.1, 0.1, 0.3, 8, 1)
    );
    
    const inlet = new THREE.Mesh(portGeometry, this.materials.get('pipe'));
    inlet.position.set(0.6, 0.2, 0);
    inlet.rotation.z = Math.PI / 2;
    this.setupShadows(inlet);
    
    const outlet = new THREE.Mesh(portGeometry, this.materials.get('pipe'));
    outlet.position.set(0.6, -0.2, 0);
    outlet.rotation.z = Math.PI / 2;
    this.setupShadows(outlet);
    
    waterSeparatorGroup.add(separatorBody, bowl, element, sensor, drain, inlet, outlet);
    waterSeparatorGroup.position.set(3.5, 0.5, 3.5);
    
    this.addComponentLabel(waterSeparatorGroup, 'Water Separator', [0, 1.4, 0]);
    this.components.set('waterSeparator', waterSeparatorGroup);
    this.config.three.staticComponents.add(waterSeparatorGroup);
}

createFuelLines() {
    const fuelLinesGroup = new THREE.Group();
    fuelLinesGroup.name = 'FuelLines';
    
    // Create curved fuel lines using curves
    const curve1 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(7, -2, 0), // From tank
        new THREE.Vector3(6.5, -1.5, 1),
        new THREE.Vector3(6, -1, 2), // To pump
    ]);
    
    const curve2 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(6, -1, 2), // From pump
        new THREE.Vector3(5, 0, 2.5),
        new THREE.Vector3(4, 0, 3), // To primary filter
    ]);
    
    const curve3 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(4, 0, 3), // From primary filter
        new THREE.Vector3(3.5, 0.5, 3.2),
        new THREE.Vector3(3.5, 0.5, 3.5), // To water separator
    ]);
    
    const curve4 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(3.5, 0.5, 3.5), // From water separator
        new THREE.Vector3(3, 1, 3.2),
        new THREE.Vector3(2.5, 1.5, 3), // To secondary filter
    ]);
    
    const curve5 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(2.5, 1.5, 3), // From secondary filter
        new THREE.Vector3(1.5, 2, 2.5),
        new THREE.Vector3(0.5, 2.5, 2), // To fuel rail/injectors
    ]);
    
    const curves = [curve1, curve2, curve3, curve4, curve5];
    const lineNames = ['TankToPump', 'PumpToFilter', 'FilterToSeparator', 'SeparatorToSecondary', 'SecondaryToRail'];
    
    curves.forEach((curve, index) => {
        const tubeGeometry = this.getOptimizedGeometry(
            `fuelLine_${index}`,
            () => new THREE.TubeGeometry(curve, 20, 0.05, 8, false)
        );
        const fuelLine = new THREE.Mesh(tubeGeometry, this.materials.get('fuelLine'));
        fuelLine.name = lineNames[index];
        this.setupShadows(fuelLine);
        fuelLinesGroup.add(fuelLine);
    });
    
    // Add fuel line clamps
    for (let i = 0; i < 15; i++) {
        const clampGeometry = this.getOptimizedGeometry(
            'fuelLine_clamp',
            () => new THREE.TorusGeometry(0.08, 0.02, 4, 8)
        );
        const clamp = new THREE.Mesh(clampGeometry, this.materials.get('engineBlock'));
        clamp.position.set(
            6 - i * 0.4,
            -2 + i * 0.3,
            0.5 + i * 0.2
        );
        clamp.rotation.x = Math.PI / 2;
        this.setupShadows(clamp);
        fuelLinesGroup.add(clamp);
    }
    
    this.addComponentLabel(fuelLinesGroup, 'Fuel Lines', [4, 1, 2.5]);
    this.components.set('fuelLines', fuelLinesGroup);
    this.config.three.staticComponents.add(fuelLinesGroup);
}

createFuelReturnLine() {
    const returnLineGroup = new THREE.Group();
    returnLineGroup.name = 'FuelReturnLine';
    
    // Return line from fuel rail back to tank
    const returnCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.5, 3, 2), // From fuel rail
        new THREE.Vector3(1.5, 2.5, 1.5),
        new THREE.Vector3(3, 1.5, 1),
        new THREE.Vector3(5, 0, 0.5),
        new THREE.Vector3(7.5, -2, 0), // Back to tank
    ]);
    
    const returnTubeGeometry = this.getOptimizedGeometry(
        'fuelReturnLine_tube',
        () => new THREE.TubeGeometry(returnCurve, 25, 0.04, 8, false)
    );
    const returnLine = new THREE.Mesh(returnTubeGeometry, this.materials.get('fuelLine'));
    returnLine.name = 'FuelReturnLine';
    this.setupShadows(returnLine);
    
    // Return line pressure regulator
    const regulatorGeometry = this.getOptimizedGeometry(
        'fuelReturn_regulator',
        () => new THREE.BoxGeometry(0.3, 0.2, 0.15)
    );
    const regulator = new THREE.Mesh(regulatorGeometry, this.materials.get('fuelPump'));
    regulator.position.set(0.5, 3.2, 2);
    this.setupShadows(regulator);
    
    returnLineGroup.add(returnLine, regulator);
    
    this.addComponentLabel(returnLineGroup, 'Return Line', [3, 2, 1]);
    this.components.set('fuelReturnLine', returnLineGroup);
    this.config.three.staticComponents.add(returnLineGroup);
}

createCarburetor() {
    if (this.config.engineParameters.fuelType === 'diesel') return;
    
    const carburetorGroup = new THREE.Group();
    carburetorGroup.name = 'Carburetor';
    
    // Main carburetor body
    const bodyGeometry = this.getOptimizedGeometry(
        'carburetor_body',
        () => new THREE.BoxGeometry(1.2, 1.5, 0.8)
    );
    const carburetorBody = new THREE.Mesh(bodyGeometry, this.materials.get('fuelPump'));
    carburetorBody.name = 'CarburetorBody';
    this.setupShadows(carburetorBody);
    
    // Float bowl
    const floatBowlGeometry = this.getOptimizedGeometry(
        'carburetor_floatBowl',
        () => new THREE.CylinderGeometry(0.4, 0.4, 0.6, 16, 1)
    );
    const floatBowl = new THREE.Mesh(floatBowlGeometry, this.materials.get('fuelPump'));
    floatBowl.position.set(0, -1.0, 0);
    this.setupShadows(floatBowl);
    
    // Throttle plate
    const throttlePlateGeometry = this.getOptimizedGeometry(
        'carburetor_throttlePlate',
        () => new THREE.CylinderGeometry(0.3, 0.3, 0.02, 16, 1)
    );
    const throttlePlate = new THREE.Mesh(throttlePlateGeometry, this.materials.get('engineBlock'));
    throttlePlate.position.set(0, 0, 0);
    throttlePlate.rotation.x = Math.PI / 2;
    this.setupShadows(throttlePlate);
    
    // Venturi
    const venturiGeometry = this.getOptimizedGeometry(
        'carburetor_venturi',
        () => new THREE.CylinderGeometry(0.25, 0.35, 0.6, 16, 1)
    );
    const venturi = new THREE.Mesh(venturiGeometry, this.materials.get('engineBlock'));
    venturi.position.set(0, 0.3, 0);
    venturi.rotation.x = Math.PI / 2;
    this.setupShadows(venturi);
    
    // Fuel inlet
    const inletGeometry = this.getOptimizedGeometry(
        'carburetor_inlet',
        () => new THREE.CylinderGeometry(0.08, 0.08, 0.3, 8, 1)
    );
    const fuelInlet = new THREE.Mesh(inletGeometry, this.materials.get('pipe'));
    fuelInlet.position.set(-0.7, -1.0, 0);
    fuelInlet.rotation.z = Math.PI / 2;
    this.setupShadows(fuelInlet);
    
    // Choke plate
    const chokePlate = new THREE.Mesh(throttlePlateGeometry, this.materials.get('engineBlock'));
    chokePlate.position.set(0, 0.6, 0);
    chokePlate.rotation.x = Math.PI / 2;
    chokePlate.rotation.z = Math.PI / 6; // Partially open
    this.setupShadows(chokePlate);
    
    carburetorGroup.add(carburetorBody, floatBowl, throttlePlate, venturi, fuelInlet, chokePlate);
    carburetorGroup.position.set(0, 3, 1.5);
    
    this.addComponentLabel(carburetorGroup, 'Carburetor', [0, 1.8, 0]);
    this.components.set('carburetor', carburetorGroup);
    this.config.three.staticComponents.add(carburetorGroup);
}

createThrottleBody() {
    const throttleBodyGroup = new THREE.Group();
    throttleBodyGroup.name = 'ThrottleBody';
    
    // Main throttle body
    const bodyGeometry = this.getOptimizedGeometry(
        'throttleBody_main',
        () => new THREE.CylinderGeometry(0.4, 0.4, 0.8, 16, 1)
    );
    const throttleBody = new THREE.Mesh(bodyGeometry, this.materials.get('fuelPump'));
    throttleBody.name = 'ThrottleBodyMain';
    throttleBody.rotation.x = Math.PI / 2;
    this.setupShadows(throttleBody);
    
    // Throttle plate
    const plateGeometry = this.getOptimizedGeometry(
        'throttleBody_plate',
        () => new THREE.CylinderGeometry(0.35, 0.35, 0.02, 16, 1)
    );
    const throttlePlate = new THREE.Mesh(plateGeometry, this.materials.get('engineBlock'));
    throttlePlate.rotation.x = Math.PI / 2;
    throttlePlate.rotation.z = Math.PI / 8; // Partially open
    this.setupShadows(throttlePlate);
    
    // Throttle shaft
    const shaftGeometry = this.getOptimizedGeometry(
        'throttleBody_shaft',
        () => new THREE.CylinderGeometry(0.05, 0.05, 0.6, 8, 1)
    );
    const throttleShaft = new THREE.Mesh(shaftGeometry, this.materials.get('engineBlock'));
    throttleShaft.rotation.x = Math.PI / 2;
    this.setupShadows(throttleShaft);
    
    // TPS (Throttle Position Sensor)
    const tpsGeometry = this.getOptimizedGeometry(
        'throttleBody_tps',
        () => new THREE.BoxGeometry(0.3, 0.2, 0.15)
    );
    const tps = new THREE.Mesh(tpsGeometry, this.materials.get('wire'));
    tps.position.set(0.5, 0, 0);
    this.setupShadows(tps);
    
    // IAC (Idle Air Control) valve
    const iacGeometry = this.getOptimizedGeometry(
        'throttleBody_iac',
        () => new THREE.CylinderGeometry(0.1, 0.1, 0.25, 8, 1)
    );
    const iac = new THREE.Mesh(iacGeometry, this.materials.get('fuelPump'));
    iac.position.set(0, 0.5, 0);
    this.setupShadows(iac);
    
    throttleBodyGroup.add(throttleBody, throttlePlate, throttleShaft, tps, iac);
    throttleBodyGroup.position.set(0, 3.5, 1);
    
    this.addComponentLabel(throttleBodyGroup, 'Throttle Body', [0, 1.0, 0]);
    this.components.set('throttleBody', throttleBodyGroup);
    this.config.three.staticComponents.add(throttleBodyGroup);
}

createFuelCap() {
    const fuelCapGroup = new THREE.Group();
    fuelCapGroup.name = 'FuelCap';
    
    // Cap body
    const capGeometry = this.getOptimizedGeometry(
        'fuelCap_body',
        () => new THREE.CylinderGeometry(0.25, 0.3, 0.15, 16, 1)
    );
    const capBody = new THREE.Mesh(capGeometry, this.materials.get('fuelPump'));
    capBody.name = 'FuelCapBody';
    this.setupShadows(capBody);
    
    // Cap handle
    const handleGeometry = this.getOptimizedGeometry(
        'fuelCap_handle',
        () => new THREE.TorusGeometry(0.15, 0.03, 4, 12)
    );
    const handle = new THREE.Mesh(handleGeometry, this.materials.get('engineBlock'));
    handle.position.set(0, 0.1, 0);
    handle.rotation.x = Math.PI / 2;
    this.setupShadows(handle);
    
    // Gasket
    const gasketGeometry = this.getOptimizedGeometry(
        'fuelCap_gasket',
        () => new THREE.TorusGeometry(0.2, 0.02, 4, 12)
    );
    const gasket = new THREE.Mesh(gasketGeometry, this.materials.get('oilPan'));
    gasket.position.set(0, -0.08, 0);
    gasket.rotation.x = Math.PI / 2;
    this.setupShadows(gasket);
    
    // Venting holes
    for (let i = 0; i < 4; i++) {
        const holeGeometry = this.getOptimizedGeometry(
            'fuelCap_hole',
            () => new THREE.CylinderGeometry(0.02, 0.02, 0.1, 6, 1)
        );
        const hole = new THREE.Mesh(holeGeometry, this.materials.get('oilPan'));
        const angle = (i / 4) * Math.PI * 2;
        hole.position.set(Math.cos(angle) * 0.2, 0, Math.sin(angle) * 0.2);
        this.setupShadows(hole);
        fuelCapGroup.add(hole);
    }
    
    fuelCapGroup.add(capBody, handle, gasket);
    fuelCapGroup.position.set(8, 1, 0);
    
    this.addComponentLabel(fuelCapGroup, 'Fuel Cap', [0, 0.5, 0]);
    this.components.set('fuelCap', fuelCapGroup);
    this.config.three.staticComponents.add(fuelCapGroup);
}

createFuelGaugeSender() {
    const senderGroup = new THREE.Group();
    senderGroup.name = 'FuelGaugeSender';
    
    // Sender unit body
    const senderGeometry = this.getOptimizedGeometry(
        'fuelSender_body',
        () => new THREE.BoxGeometry(0.3, 0.2, 0.15)
    );
    const senderBody = new THREE.Mesh(senderGeometry, this.materials.get('alternator'));
    senderBody.name = 'FuelSenderBody';
    this.setupShadows(senderBody);
    
    // Float arm
    const armGeometry = this.getOptimizedGeometry(
        'fuelSender_arm',
        () => new THREE.BoxGeometry(1.5, 0.05, 0.05)
    );
    const floatArm = new THREE.Mesh(armGeometry, this.materials.get('engineBlock'));
    floatArm.position.set(0.75, -0.15, 0);
    floatArm.rotation.z = -Math.PI / 6;
    this.setupShadows(floatArm);
    
    // Float
    const floatGeometry = this.getOptimizedGeometry(
        'fuelSender_float',
        () => new THREE.SphereGeometry(0.15, 12, 8)
    );
    const fuelFloat = new THREE.Mesh(floatGeometry, this.materials.get('air'));
    fuelFloat.position.set(1.2, -0.5, 0);
    this.setupShadows(fuelFloat);
    
    // Electrical connector
    const connectorGeometry = this.getOptimizedGeometry(
        'fuelSender_connector',
        () => new THREE.BoxGeometry(0.15, 0.1, 0.08)
    );
    const connector = new THREE.Mesh(connectorGeometry, this.materials.get('wire'));
    connector.position.set(-0.2, 0.15, 0);
    this.setupShadows(connector);
    
    senderGroup.add(senderBody, floatArm, fuelFloat, connector);
    senderGroup.position.set(7.5, -1.5, 0);
    
    this.addComponentLabel(senderGroup, 'Fuel Gauge Sender', [0, 0.8, 0]);
    this.components.set('fuelGaugeSender', senderGroup);
    this.config.three.staticComponents.add(senderGroup);
}

createFuelSolenoid() {
    const solenoidGroup = new THREE.Group();
    solenoidGroup.name = 'FuelSolenoid';
    
    // Solenoid body
    const solenoidGeometry = this.getOptimizedGeometry(
        'fuelSolenoid_body',
        () => new THREE.CylinderGeometry(0.2, 0.2, 0.6, 12, 1)
    );
    const solenoidBody = new THREE.Mesh(solenoidGeometry, this.materials.get('alternator'));
    solenoidBody.name = 'FuelSolenoidBody';
    this.setupShadows(solenoidBody);
    
    // Solenoid coil
    const coilGeometry = this.getOptimizedGeometry(
        'fuelSolenoid_coil',
        () => new THREE.CylinderGeometry(0.15, 0.15, 0.4, 12, 1)
    );
    const coil = new THREE.Mesh(coilGeometry, this.materials.get('wire'));
    coil.position.set(0, 0.1, 0);
    this.setupShadows(coil);
    
    // Plunger
    const plungerGeometry = this.getOptimizedGeometry(
        'fuelSolenoid_plunger',
        () => new THREE.CylinderGeometry(0.08, 0.08, 0.3, 8, 1)
    );
    const plunger = new THREE.Mesh(plungerGeometry, this.materials.get('engineBlock'));
    plunger.position.set(0, -0.15, 0);
    this.setupShadows(plunger);
    
    // Electrical terminals
    const terminalGeometry = this.getOptimizedGeometry(
        'fuelSolenoid_terminal',
        () => new THREE.BoxGeometry(0.05, 0.05, 0.1)
    );
    
    const terminal1 = new THREE.Mesh(terminalGeometry, this.materials.get('wire'));
    terminal1.position.set(0.1, 0.35, 0);
    this.setupShadows(terminal1);
    
    const terminal2 = new THREE.Mesh(terminalGeometry, this.materials.get('wire'));
    terminal2.position.set(-0.1, 0.35, 0);
    this.setupShadows(terminal2);
    
    // Mounting bracket
    const bracketGeometry = this.getOptimizedGeometry(
        'fuelSolenoid_bracket',
        () => new THREE.BoxGeometry(0.4, 0.05, 0.3)
    );
    const bracket = new THREE.Mesh(bracketGeometry, this.materials.get('engineBlock'));
    bracket.position.set(0, -0.35, 0);
    this.setupShadows(bracket);
    
    solenoidGroup.add(solenoidBody, coil, plunger, terminal1, terminal2, bracket);
    solenoidGroup.position.set(1.5, 2, 3.5);
    
    this.addComponentLabel(solenoidGroup, 'Fuel Solenoid', [0, 0.8, 0]);
    this.components.set('fuelSolenoid', solenoidGroup);
    this.config.three.staticComponents.add(solenoidGroup);
}

createPrimingPump() {
    const primingPumpGroup = new THREE.Group();
    primingPumpGroup.name = 'PrimingPump';
    
    // Priming pump body
    const pumpGeometry = this.getOptimizedGeometry(
        'primingPump_body',
        () => new THREE.CylinderGeometry(0.15, 0.15, 0.3, 12, 1)
    );
    const pumpBody = new THREE.Mesh(pumpGeometry, this.materials.get('fuelPump'));
    pumpBody.name = 'PrimingPumpBody';
    this.setupShadows(pumpBody);
    
    // Pump handle
    const handleGeometry = this.getOptimizedGeometry(
        'primingPump_handle',
        () => new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8, 1)
    );
    const handle = new THREE.Mesh(handleGeometry, this.materials.get('engineBlock'));
    handle.position.set(0, 0.35, 0);
    this.setupShadows(handle);
    
    // Handle knob
    const knobGeometry = this.getOptimizedGeometry(
        'primingPump_knob',
        () => new THREE.SphereGeometry(0.08, 8, 6)
    );
    const knob = new THREE.Mesh(knobGeometry, this.materials.get('oilPan'));
    knob.position.set(0, 0.55, 0);
    this.setupShadows(knob);
    
    // Base mounting
    const baseGeometry = this.getOptimizedGeometry(
        'primingPump_base',
        () => new THREE.CylinderGeometry(0.2, 0.2, 0.05, 12, 1)
    );
    const base = new THREE.Mesh(baseGeometry, this.materials.get('engineBlock'));
    base.position.set(0, -0.175, 0);
    this.setupShadows(base);
    
    primingPumpGroup.add(pumpBody, handle, knob, base);
    primingPumpGroup.position.set(3.5, 0.5, 4);
    
    this.addComponentLabel(primingPumpGroup, 'Priming Pump', [0, 0.8, 0]);
    this.components.set('primingPump', primingPumpGroup);
    this.config.three.staticComponents.add(primingPumpGroup);
}