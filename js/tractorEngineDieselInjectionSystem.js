// Diesel Injection System
createFuelInjectors() {
    const { cylinders, engineType } = this.config.engineParameters;
    const injectorGeometry = this.getOptimizedGeometry(
        'fuelInjector',
        () => new THREE.CylinderGeometry(0.08, 0.08, 1.2, 8, 1)
    );
    const injectors = [];
    
    for (let i = 0; i < cylinders; i++) {
        const injectorGroup = new THREE.Group();
        injectorGroup.name = `FuelInjector_${i + 1}`;
        
        // Main injector body
        const injector = new THREE.Mesh(injectorGeometry, this.materials.get('fuelPump'));
        
        // Injector nozzle
        const nozzleGeom = new THREE.ConeGeometry(0.04, 0.3, 8);
        const nozzle = new THREE.Mesh(nozzleGeom, this.materials.get('sparkPlug'));
        nozzle.position.y = -0.75;
        
        // High pressure connector
        const connectorGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.2, 8);
        const connector = new THREE.Mesh(connectorGeom, this.materials.get('pipe'));
        connector.position.y = 0.7;
        
        // Electrical connection
        const electricalGeom = new THREE.BoxGeometry(0.12, 0.12, 0.08);
        const electrical = new THREE.Mesh(electricalGeom, this.materials.get('engineBlock'));
        electrical.position.set(0.1, 0.3, 0);
        
        // Fuel return line
        const returnLineGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 6);
        const returnLine = new THREE.Mesh(returnLineGeom, this.materials.get('fuelLine'));
        returnLine.position.set(-0.08, 0.4, 0);
        returnLine.rotation.z = Math.PI / 6;
        
        injectorGroup.add(injector, nozzle, connector, electrical, returnLine);
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        injectorGroup.position.set(position.x, 4.0 + position.y, position.z);
        
        if (engineType.startsWith('v')) {
            injectorGroup.rotation.z = this.calculateBankAngle(i);
        }
        
        if (i === 0) {
            this.addComponentLabel(injectorGroup, 'Fuel Injectors', [0, 1.2, 0]);
        }
        
        injectors.push(injectorGroup);
        this.config.three.staticComponents.add(injectorGroup);
    }
    
    this.components.set('fuelInjectors', injectors);
}

createInjectionPump() {
    const pumpGroup = new THREE.Group();
    pumpGroup.name = 'InjectionPump';
    
    // Main pump housing
    const housingGeom = new THREE.BoxGeometry(1.5, 2.0, 1.0);
    const housing = new THREE.Mesh(housingGeom, this.materials.get('fuelPump'));
    
    // Plunger assemblies
    const { cylinders } = this.config.engineParameters;
    for (let i = 0; i < cylinders; i++) {
        const plungerGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8);
        const plunger = new THREE.Mesh(plungerGeom, this.materials.get('piston'));
        plunger.position.set(
            -0.5 + (i / (cylinders - 1)) * 1.0,
            0.6,
            0
        );
        pumpGroup.add(plunger);
        
        // Delivery valve
        const valveGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.2, 6);
        const valve = new THREE.Mesh(valveGeom, this.materials.get('sparkPlug'));
        valve.position.set(
            plunger.position.x,
            1.2,
            0
        );
        pumpGroup.add(valve);
    }
    
    // Camshaft drive
    const camGeom = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 8);
    const cam = new THREE.Mesh(camGeom, this.materials.get('crankshaft'));
    cam.position.set(0, -0.5, 0);
    cam.rotation.z = Math.PI / 2;
    
    // Governor mechanism
    const governorGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 8);
    const governor = new THREE.Mesh(governorGeom, this.materials.get('alternator'));
    governor.position.set(0.8, 0, 0);
    
    // Fuel metering unit
    const meteringGeom = new THREE.BoxGeometry(0.4, 0.6, 0.3);
    const metering = new THREE.Mesh(meteringGeom, this.materials.get('engineBlock'));
    metering.position.set(-0.8, 0.5, 0);
    
    pumpGroup.add(housing, cam, governor, metering);
    pumpGroup.position.set(-3.0, 1.0, -2.0);
    
    this.addComponentLabel(pumpGroup, 'Injection Pump', [0, 2.0, 0]);
    this.config.three.staticComponents.add(pumpGroup);
    this.components.set('injectionPump', pumpGroup);
}

createHighPressureFuelPump() {
    const pumpGroup = new THREE.Group();
    pumpGroup.name = 'HighPressureFuelPump';
    
    // Pump housing
    const housingGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.8, 8);
    const housing = new THREE.Mesh(housingGeom, this.materials.get('fuelPump'));
    
    // Drive mechanism
    const driveGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.3, 8);
    const drive = new THREE.Mesh(driveGeom, this.materials.get('crankshaft'));
    drive.position.y = -0.55;
    
    // Pressure regulator
    const regulatorGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.4, 8);
    const regulator = new THREE.Mesh(regulatorGeom, this.materials.get('sparkPlug'));
    regulator.position.set(0.3, 0, 0);
    regulator.rotation.z = Math.PI / 2;
    
    // High pressure outlet
    const outletGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 8);
    const outlet = new THREE.Mesh(outletGeom, this.materials.get('pipe'));
    outlet.position.set(0, 0.4, 0.3);
    outlet.rotation.x = Math.PI / 2;
    
    // Low pressure inlet
    const inletGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.2, 8);
    const inlet = new THREE.Mesh(inletGeom, this.materials.get('fuelLine'));
    inlet.position.set(0, -0.4, -0.3);
    inlet.rotation.x = -Math.PI / 2;
    
    pumpGroup.add(housing, drive, regulator, outlet, inlet);
    pumpGroup.position.set(2.5, 1.5, -1.0);
    
    this.addComponentLabel(pumpGroup, 'HP Fuel Pump', [0, 1.0, 0]);
    this.config.three.staticComponents.add(pumpGroup);
    this.components.set('highPressureFuelPump', pumpGroup);
}

createCommonRail() {
    const railGroup = new THREE.Group();
    railGroup.name = 'CommonRail';
    
    // Main rail tube
    const { cylinders } = this.config.engineParameters;
    const railLength = cylinders * 0.8;
    const railGeom = new THREE.CylinderGeometry(0.12, 0.12, railLength, 8);
    const rail = new THREE.Mesh(railGeom, this.materials.get('pipe'));
    rail.rotation.z = Math.PI / 2;
    
    // Pressure sensor
    const sensorGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.2, 8);
    const sensor = new THREE.Mesh(sensorGeom, this.materials.get('engineBlock'));
    sensor.position.set(railLength / 2 - 0.2, 0, 0.15);
    
    // Pressure relief valve
    const reliefGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.15, 8);
    const relief = new THREE.Mesh(reliefGeom, this.materials.get('sparkPlug'));
    relief.position.set(-railLength / 2 + 0.2, 0, 0.15);
    
    // Fuel connections to injectors
    for (let i = 0; i < cylinders; i++) {
        const connectionGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 6);
        const connection = new THREE.Mesh(connectionGeom, this.materials.get('fuelLine'));
        
        const x = -railLength / 2 + (i / (cylinders - 1)) * railLength;
        connection.position.set(x, 0, -0.15);
        connection.rotation.x = Math.PI / 2;
        
        railGroup.add(connection);
    }
    
    // High pressure inlet
    const inletGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 8);
    const inlet = new THREE.Mesh(inletGeom, this.materials.get('pipe'));
    inlet.position.set(0, 0, 0.2);
    inlet.rotation.x = Math.PI / 2;
    
    railGroup.add(rail, sensor, relief, inlet);
    railGroup.position.set(0, 4.5, 0.5);
    
    this.addComponentLabel(railGroup, 'Common Rail', [0, 0.5, 0]);
    this.config.three.staticComponents.add(railGroup);
    this.components.set('commonRail', railGroup);
}

createGlowPlugs() {
    const { cylinders, engineType } = this.config.engineParameters;
    const plugGeometry = this.getOptimizedGeometry(
        'glowPlug',
        () => new THREE.CylinderGeometry(0.1, 0.1, 0.8, 8, 1)
    );
    const glowPlugs = [];
    
    for (let i = 0; i < cylinders; i++) {
        const plugGroup = new THREE.Group();
        plugGroup.name = `GlowPlug_${i + 1}`;
        
        // Main plug body
        const plug = new THREE.Mesh(plugGeometry, this.materials.get('sparkPlug'));
        
        // Heating element
        const elementGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 8);
        const element = new THREE.Mesh(elementGeom, this.materials.get('hotMaterial'));
        element.position.y = -0.55;
        
        // Electrical terminal
        const terminalGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.2, 6);
        const terminal = new THREE.Mesh(terminalGeom, this.materials.get('wire'));
        terminal.position.y = 0.5;
        
        // Wire connection
        const wireGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.5, 6);
        const wire = new THREE.Mesh(wireGeom, this.materials.get('wire'));
        wire.position.set(0.1, 0.7, 0);
        wire.rotation.z = Math.PI / 4;
        
        plugGroup.add(plug, element, terminal, wire);
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        plugGroup.position.set(position.x + 0.3, 4.0 + position.y, position.z);
        
        if (engineType.startsWith('v')) {
            plugGroup.rotation.z = this.calculateBankAngle(i);
        }
        
        if (i === 0) {
            this.addComponentLabel(plugGroup, 'Glow Plugs', [0, 1.0, 0]);
        }
        
        glowPlugs.push(plugGroup);
        this.config.three.staticComponents.add(plugGroup);
    }
    
    this.components.set('glowPlugs', glowPlugs);
}

createFuelRail() {
    const railGroup = new THREE.Group();
    railGroup.name = 'FuelRail';
    
    const { cylinders } = this.config.engineParameters;
    const railLength = cylinders * 0.6;
    
    // Main fuel rail
    const railGeom = new THREE.CylinderGeometry(0.08, 0.08, railLength, 8);
    const rail = new THREE.Mesh(railGeom, this.materials.get('pipe'));
    rail.rotation.z = Math.PI / 2;
    
    // Fuel distribution manifold
    const manifoldGeom = new THREE.BoxGeometry(railLength + 0.4, 0.2, 0.3);
    const manifold = new THREE.Mesh(manifoldGeom, this.materials.get('fuelPump'));
    manifold.position.y = -0.15;
    
    // Fuel inlet
    const inletGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8);
    const inlet = new THREE.Mesh(inletGeom, this.materials.get('fuelLine'));
    inlet.position.set(-railLength / 2, 0, 0.2);
    inlet.rotation.x = Math.PI / 2;
    
    // Pressure test port
    const testPortGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 6);
    const testPort = new THREE.Mesh(testPortGeom, this.materials.get('sparkPlug'));
    testPort.position.set(railLength / 2, 0, 0.12);
    
    railGroup.add(rail, manifold, inlet, testPort);
    railGroup.position.set(0, 3.8, 0.8);
    
    this.addComponentLabel(railGroup, 'Fuel Rail', [0, 0.4, 0]);
    this.config.three.staticComponents.add(railGroup);
    this.components.set('fuelRail', railGroup);
}

createInjectorNozzles() {
    const { cylinders } = this.config.engineParameters;
    const nozzles = [];
    
    for (let i = 0; i < cylinders; i++) {
        const nozzleGroup = new THREE.Group();
        nozzleGroup.name = `InjectorNozzle_${i + 1}`;
        
        // Nozzle body
        const bodyGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.4, 8);
        const body = new THREE.Mesh(bodyGeom, this.materials.get('sparkPlug'));
        
        // Spray tip
        const tipGeom = new THREE.ConeGeometry(0.03, 0.15, 8);
        const tip = new THREE.Mesh(tipGeom, this.materials.get('sparkPlug'));
        tip.position.y = -0.275;
        
        // Needle valve
        const needleGeom = new THREE.CylinderGeometry(0.01, 0.01, 0.3, 6);
        const needle = new THREE.Mesh(needleGeom, this.materials.get('piston'));
        needle.position.y = -0.05;
        
        // Spring housing
        const springGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.2, 8);
        const spring = new THREE.Mesh(springGeom, this.materials.get('wire'));
        spring.position.y = 0.3;
        
        nozzleGroup.add(body, tip, needle, spring);
        
        const position = this.calculateCylinderPosition(i, cylinders, this.config.engineParameters.engineType);
        nozzleGroup.position.set(position.x, 3.5 + position.y, position.z);
        
        if (i === 0) {
            this.addComponentLabel(nozzleGroup, 'Injector Nozzles', [0, 0.8, 0]);
        }
        
        nozzles.push(nozzleGroup);
        this.config.three.staticComponents.add(nozzleGroup);
    }
    
    this.components.set('injectorNozzles', nozzles);
}

createFuelPressureRegulator() {
    const regulatorGroup = new THREE.Group();
    regulatorGroup.name = 'FuelPressureRegulator';
    
    // Main regulator body
    const bodyGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 8);
    const body = new THREE.Mesh(bodyGeom, this.materials.get('fuelPump'));
    
    // Diaphragm chamber
    const diaphragmGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.1, 8);
    const diaphragm = new THREE.Mesh(diaphragmGeom, this.materials.get('engineBlock'));
    diaphragm.position.y = 0.35;
    
    // Vacuum connection
    const vacuumGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.2, 6);
    const vacuum = new THREE.Mesh(vacuumGeom, this.materials.get('vacuumHose'));
    vacuum.position.set(0, 0.4, 0.15);
    vacuum.rotation.x = Math.PI / 3;
    
    // Fuel inlet
    const inletGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.15, 8);
    const inlet = new THREE.Mesh(inletGeom, this.materials.get('fuelLine'));
    inlet.position.set(-0.15, 0, 0);
    inlet.rotation.z = Math.PI / 2;
    
    // Fuel outlet
    const outletGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.15, 8);
    const outlet = new THREE.Mesh(outletGeom, this.materials.get('fuelLine'));
    outlet.position.set(0.15, 0, 0);
    outlet.rotation.z = Math.PI / 2;
    
    // Return line
    const returnGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.2, 6);
    const returnLine = new THREE.Mesh(returnGeom, this.materials.get('fuelLine'));
    returnLine.position.set(0, -0.35, 0);
    
    regulatorGroup.add(body, diaphragm, vacuum, inlet, outlet, returnLine);
    regulatorGroup.position.set(1.5, 3.5, 1.2);
    
    this.addComponentLabel(regulatorGroup, 'Fuel Pressure Regulator', [0, 0.8, 0]);
    this.config.three.staticComponents.add(regulatorGroup);
    this.components.set('fuelPressureRegulator', regulatorGroup);
}