// Lubrication System
createOilPump() {
    const pumpGeometry = this.getOptimizedGeometry(
        'oilPump',
        () => new THREE.BoxGeometry(1.2, 0.9, 0.7)
    );
    
    const pump = new THREE.Mesh(pumpGeometry, this.materials.get('engineBlock'));
    pump.name = 'OilPump';
    pump.position.set(0, -3.5, -2);
    
    // Add pump housing details
    const housingGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.8, 16);
    const housing = new THREE.Mesh(housingGeom, this.materials.get('crankshaft'));
    housing.position.set(0, 0, 0.35);
    housing.rotation.x = Math.PI / 2;
    pump.add(housing);
    
    // Add pump drive gear
    const gearGeometry = this.getOptimizedGeometry(
        'oilPumpGear',
        () => new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16, 1)
    );
    
    const gear = new THREE.Mesh(gearGeometry, this.materials.get('crankshaft'));
    gear.position.set(0, 0.5, 0.35);
    
    // Add gear teeth
    for (let i = 0; i < 16; i++) {
        const toothGeom = new THREE.BoxGeometry(0.02, 0.05, 0.08);
        const tooth = new THREE.Mesh(toothGeom, this.materials.get('crankshaft'));
        const angle = (i / 16) * Math.PI * 2;
        tooth.position.set(
            Math.cos(angle) * 0.32,
            Math.sin(angle) * 0.32,
            0
        );
        tooth.rotation.z = angle;
        gear.add(tooth);
    }
    
    pump.add(gear);
    this.setupShadows(pump);
    this.addComponentLabel(pump, 'Oil Pump', [0, 1.0, 0]);
    
    this.components.set('oilPump', pump);
    this.config.three.staticComponents.add(pump);
}

createOilPumpDrive() {
    const driveGeometry = this.getOptimizedGeometry(
        'oilPumpDrive',
        () => new THREE.CylinderGeometry(0.15, 0.15, 2.0, 8)
    );
    
    const drive = new THREE.Mesh(driveGeometry, this.materials.get('crankshaft'));
    drive.name = 'OilPumpDrive';
    drive.position.set(0, -2.5, -2);
    
    // Add drive coupling
    const couplingGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.3, 6);
    const coupling = new THREE.Mesh(couplingGeom, this.materials.get('crankshaft'));
    coupling.position.set(0, 1.0, 0);
    drive.add(coupling);
    
    this.setupShadows(drive);
    this.addComponentLabel(drive, 'Oil Pump Drive', [0.5, 0, 0]);
    
    this.components.set('oilPumpDrive', drive);
    this.config.three.staticComponents.add(drive);
}

createOilFilter() {
    const filterGeometry = this.getOptimizedGeometry(
        'oilFilter',
        () => new THREE.CylinderGeometry(0.4, 0.4, 1.0, 16, 1)
    );
    
    const filter = new THREE.Mesh(filterGeometry, this.materials.get('oilPan'));
    filter.name = 'OilFilter';
    filter.position.set(2, -1.5, 1);
    
    // Add filter threads
    for (let i = 0; i < 8; i++) {
        const threadGeom = new THREE.TorusGeometry(0.42, 0.02, 4, 16);
        const thread = new THREE.Mesh(threadGeom, this.materials.get('oilPan'));
        thread.position.y = -0.4 + i * 0.1;
        thread.rotation.x = Math.PI / 2;
        filter.add(thread);
    }
    
    // Add filter element
    const elementGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.8, 16);
    const element = new THREE.Mesh(elementGeom, this.materials.get('airFilter'));
    element.position.y = 0;
    filter.add(element);
    
    this.setupShadows(filter);
    this.addComponentLabel(filter, 'Oil Filter', [0, 1.2, 0]);
    
    this.components.set('oilFilter', filter);
    this.config.three.staticComponents.add(filter);
}

createOilFilterAdapter() {
    const adapterGeometry = this.getOptimizedGeometry(
        'oilFilterAdapter',
        () => new THREE.CylinderGeometry(0.5, 0.5, 0.3, 16)
    );
    
    const adapter = new THREE.Mesh(adapterGeometry, this.materials.get('engineBlock'));
    adapter.name = 'OilFilterAdapter';
    adapter.position.set(2, -2.1, 1);
    
    // Add mounting bolts
    for (let i = 0; i < 4; i++) {
        const boltGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8);
        const bolt = new THREE.Mesh(boltGeom, this.materials.get('crankshaft'));
        const angle = (i / 4) * Math.PI * 2;
        bolt.position.set(
            Math.cos(angle) * 0.4,
            0,
            Math.sin(angle) * 0.4
        );
        adapter.add(bolt);
    }
    
    this.setupShadows(adapter);
    this.addComponentLabel(adapter, 'Filter Adapter', [0, 0.5, 0]);
    
    this.components.set('oilFilterAdapter', adapter);
    this.config.three.staticComponents.add(adapter);
}

createOilCooler() {
    const coolerGeometry = this.getOptimizedGeometry(
        'oilCooler',
        () => new THREE.BoxGeometry(1.5, 0.8, 0.3)
    );
    
    const cooler = new THREE.Mesh(coolerGeometry, this.materials.get('radiator'));
    cooler.name = 'OilCooler';
    cooler.position.set(-2, 1, 3);
    
    // Add cooling fins
    for (let i = 0; i < 10; i++) {
        const finGeom = new THREE.PlaneGeometry(1.4, 0.7);
        const fin = new THREE.Mesh(finGeom, this.materials.get('radiator'));
        fin.position.z = (i - 4.5) * 0.04;
        fin.material = fin.material.clone();
        fin.material.opacity = 0.6;
        fin.material.transparent = true;
        cooler.add(fin);
    }
    
    // Add inlet and outlet ports
    const portGeom = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 8);
    const inletPort = new THREE.Mesh(portGeom, this.materials.get('pipe'));
    inletPort.position.set(-0.6, 0.5, 0);
    inletPort.rotation.z = Math.PI / 2;
    cooler.add(inletPort);
    
    const outletPort = new THREE.Mesh(portGeom, this.materials.get('pipe'));
    outletPort.position.set(0.6, 0.5, 0);
    outletPort.rotation.z = Math.PI / 2;
    cooler.add(outletPort);
    
    this.setupShadows(cooler);
    this.addComponentLabel(cooler, 'Oil Cooler', [0, 1.0, 0]);
    
    this.components.set('oilCooler', cooler);
    this.config.three.staticComponents.add(cooler);
}

createOilPressureReliefValve() {
    const valveGeometry = this.getOptimizedGeometry(
        'oilPressureReliefValve',
        () => new THREE.CylinderGeometry(0.15, 0.15, 0.5, 8)
    );
    
    const valve = new THREE.Mesh(valveGeometry, this.materials.get('crankshaft'));
    valve.name = 'OilPressureReliefValve';
    valve.position.set(1.5, -2.5, -1);
    
    // Add valve cap
    const capGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.1, 8);
    const cap = new THREE.Mesh(capGeom, this.materials.get('crankshaft'));
    cap.position.y = 0.3;
    valve.add(cap);
    
    // Add adjustment screw
    const screwGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 8);
    const screw = new THREE.Mesh(screwGeom, this.materials.get('crankshaft'));
    screw.position.y = 0.4;
    valve.add(screw);
    
    this.setupShadows(valve);
    this.addComponentLabel(valve, 'Relief Valve', [0.3, 0, 0]);
    
    this.components.set('oilPressureReliefValve', valve);
    this.config.three.staticComponents.add(valve);
}

createOilDipstick() {
    const dipstickGeometry = this.getOptimizedGeometry(
        'oilDipstick',
        () => new THREE.CylinderGeometry(0.02, 0.02, 2.5, 8)
    );
    
    const dipstick = new THREE.Mesh(dipstickGeometry, this.materials.get('crankshaft'));
    dipstick.name = 'OilDipstick';
    dipstick.position.set(1, -1.5, 2);
    
    // Add dipstick handle
    const handleGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 8);
    const handle = new THREE.Mesh(handleGeom, this.materials.get('crankshaft'));
    handle.position.y = 1.4;
    dipstick.add(handle);
    
    // Add measurement markings
    for (let i = 0; i < 5; i++) {
        const markGeom = new THREE.BoxGeometry(0.08, 0.01, 0.04);
        const mark = new THREE.Mesh(markGeom, this.materials.get('crankshaft'));
        mark.position.y = -0.8 + i * 0.3;
        dipstick.add(mark);
    }
    
    this.setupShadows(dipstick);
    this.addComponentLabel(dipstick, 'Oil Dipstick', [0.3, 0, 0]);
    
    this.components.set('oilDipstick', dipstick);
    this.config.three.staticComponents.add(dipstick);
}

createOilFillerCap() {
    const capGeometry = this.getOptimizedGeometry(
        'oilFillerCap',
        () => new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16)
    );
    
    const cap = new THREE.Mesh(capGeometry, this.materials.get('engineBlock'));
    cap.name = 'OilFillerCap';
    cap.position.set(-1, 3.5, 1);
    
    // Add grip pattern
    for (let i = 0; i < 8; i++) {
        const gripGeom = new THREE.BoxGeometry(0.35, 0.02, 0.05);
        const grip = new THREE.Mesh(gripGeom, this.materials.get('engineBlock'));
        const angle = (i / 8) * Math.PI * 2;
        grip.position.set(
            Math.cos(angle) * 0.32,
            0.12,
            Math.sin(angle) * 0.32
        );
        grip.rotation.y = angle;
        cap.add(grip);
    }
    
    this.setupShadows(cap);
    this.addComponentLabel(cap, 'Oil Filler Cap', [0, 0.3, 0]);
    
    this.components.set('oilFillerCap', cap);
    this.config.three.staticComponents.add(cap);
}

createOilGalleries() {
    const { cylinders, engineType } = this.config.engineParameters;
    const galleryGroup = new THREE.Group();
    galleryGroup.name = 'OilGalleries';
    
    // Main oil gallery
    const galleryLength = this.calculateJournalLength(cylinders, engineType);
    const mainGalleryGeom = new THREE.CylinderGeometry(0.06, 0.06, galleryLength, 8, 1);
    const mainGallery = new THREE.Mesh(mainGalleryGeom, this.materials.get('pipe'));
    mainGallery.name = 'MainOilGallery';
    mainGallery.position.set(0, 1, 0);
    mainGallery.rotation.z = Math.PI / 2;
    galleryGroup.add(mainGallery);
    
    // Oil feed passages to cylinders
    for (let i = 0; i < cylinders; i++) {
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        
        const feedGeom = new THREE.CylinderGeometry(0.03, 0.03, 2, 8, 1);
        const feed = new THREE.Mesh(feedGeom, this.materials.get('pipe'));
        feed.name = `OilFeed_${i + 1}`;
        feed.position.set(position.x, 2, position.z);
        feed.rotation.x = Math.PI / 2;
        galleryGroup.add(feed);
    }
    
    // Cross drilling to main bearings
    for (let i = 0; i < cylinders + 1; i++) {
        const position = this.calculateMainBearingPosition(i, cylinders, engineType);
        
        const drillingGeom = new THREE.CylinderGeometry(0.02, 0.02, 1.5, 8);
        const drilling = new THREE.Mesh(drillingGeom, this.materials.get('pipe'));
        drilling.position.set(position.x, 0.5, position.z);
        drilling.rotation.x = Math.PI / 2;
        galleryGroup.add(drilling);
    }
    
    this.addComponentLabel(galleryGroup, 'Oil Galleries', [0, -2, 0]);
    
    this.components.set('oilGalleries', galleryGroup);
    this.config.three.staticComponents.add(galleryGroup);
}

createOilSprayJets() {
    const { cylinders, engineType } = this.config.engineParameters;
    const jetsGroup = new THREE.Group();
    jetsGroup.name = 'OilSprayJets';
    
    for (let i = 0; i < cylinders; i++) {
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        
        const jetGeometry = this.getOptimizedGeometry(
            'oilSprayJet',
            () => new THREE.CylinderGeometry(0.02, 0.01, 0.3, 8)
        );
        
        const jet = new THREE.Mesh(jetGeometry, this.materials.get('crankshaft'));
        jet.name = `OilSprayJet_${i + 1}`;
        jet.position.set(position.x, -1, position.z);
        jet.rotation.x = Math.PI / 4; // Angled towards piston
        
        // Add mounting boss
        const bossGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.1, 8);
        const boss = new THREE.Mesh(bossGeom, this.materials.get('engineBlock'));
        boss.position.y = -0.2;
        jet.add(boss);
        
        jetsGroup.add(jet);
    }
    
    this.addComponentLabel(jetsGroup, 'Oil Spray Jets', [0, -1.5, 0]);
    
    this.components.set('oilSprayJets', jetsGroup);
    this.config.three.staticComponents.add(jetsGroup);
}

createOilStrainer() {
    const strainerGeometry = this.getOptimizedGeometry(
        'oilStrainer',
        () => new THREE.CylinderGeometry(0.3, 0.3, 0.8, 16)
    );
    
    const strainer = new THREE.Mesh(strainerGeometry, this.materials.get('crankshaft'));
    strainer.name = 'OilStrainer';
    strainer.position.set(0, -3.8, 0);
    
    // Add mesh screen
    const screenGeom = new THREE.CylinderGeometry(0.28, 0.28, 0.76, 16);
    const screen = new THREE.Mesh(screenGeom, this.materials.get('wire'));
    screen.material = screen.material.clone();
    screen.material.opacity = 0.3;
    screen.material.transparent = true;
    strainer.add(screen);
    
    // Add pickup tube
    const tubeGeom = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8);
    const tube = new THREE.Mesh(tubeGeom, this.materials.get('pipe'));
    tube.position.y = 1.1;
    tube.rotation.x = Math.PI / 6;
    strainer.add(tube);
    
    this.setupShadows(strainer);
    this.addComponentLabel(strainer, 'Oil Strainer', [0, 1.0, 0]);
    
    this.components.set('oilStrainer', strainer);
    this.config.three.staticComponents.add(strainer);
}

createOilLevelSensor() {
    const sensorGeometry = this.getOptimizedGeometry(
        'oilLevelSensor',
        () => new THREE.CylinderGeometry(0.03, 0.03, 1.5, 8)
    );
    
    const sensor = new THREE.Mesh(sensorGeometry, this.materials.get('crankshaft'));
    sensor.name = 'OilLevelSensor';
    sensor.position.set(0.8, -2.5, 1.5);
    
    // Add sensor head
    const headGeom = new THREE.BoxGeometry(0.1, 0.08, 0.06);
    const head = new THREE.Mesh(headGeom, this.materials.get('wire'));
    head.position.y = 0.8;
    sensor.add(head);
    
    // Add electrical connector
    const connectorGeom = new THREE.BoxGeometry(0.06, 0.04, 0.08);
    const connector = new THREE.Mesh(connectorGeom, this.materials.get('wire'));
    connector.position.y = 0.9;
    sensor.add(connector);
    
    this.setupShadows(sensor);
    this.addComponentLabel(sensor, 'Oil Level Sensor', [0.2, 0, 0]);
    
    this.components.set('oilLevelSensor', sensor);
    this.config.three.staticComponents.add(sensor);
}

createOilPressureSensor() {
    const sensorGeometry = this.getOptimizedGeometry(
        'oilPressureSensor',
        () => new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8)
    );
    
    const sensor = new THREE.Mesh(sensorGeometry, this.materials.get('crankshaft'));
    sensor.name = 'OilPressureSensor';
    sensor.position.set(1.5, 0.5, -1);
    
    // Add threaded connection
    for (let i = 0; i < 6; i++) {
        const threadGeom = new THREE.TorusGeometry(0.06, 0.01, 4, 12);
        const thread = new THREE.Mesh(threadGeom, this.materials.get('crankshaft'));
        thread.position.y = -0.15 + i * 0.04;
        thread.rotation.x = Math.PI / 2;
        sensor.add(thread);
    }
    
    // Add electrical connector
    const connectorGeom = new THREE.BoxGeometry(0.08, 0.06, 0.1);
    const connector = new THREE.Mesh(connectorGeom, this.materials.get('wire'));
    connector.position.y = 0.25;
    sensor.add(connector);
    
    this.setupShadows(sensor);
    this.addComponentLabel(sensor, 'Oil Pressure Sensor', [0.3, 0, 0]);
    
    this.components.set('oilPressureSensor', sensor);
    this.config.three.staticComponents.add(sensor);
}

createOilPan() {
    const { cylinders, engineType } = this.config.engineParameters;
    const dimensions = this.calculateEngineDimensions(cylinders, engineType);
    
    const oilPanGeometry = this.getOptimizedGeometry(
        `oilPan_${cylinders}_${engineType}`,
        () => new THREE.BoxGeometry(dimensions.width + 0.8, 1.2, dimensions.length + 0.8, 1, 1, 1)
    );
    
    const oilPan = new THREE.Mesh(oilPanGeometry, this.materials.get('oilPan'));
    oilPan.name = 'OilPan';
    oilPan.position.set(0, -3.0, 0);
    
    // Add mounting flanges
    const flangeGeometry = new THREE.BoxGeometry(dimensions.width + 1.0, 0.1, dimensions.length + 1.0);
    const flange = new THREE.Mesh(flangeGeometry, this.materials.get('oilPan'));
    flange.position.y = 0.65;
    oilPan.add(flange);
    
    // Add drain plug
    const drainPlugGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 8);
    const drainPlug = new THREE.Mesh(drainPlugGeom, this.materials.get('crankshaft'));
    drainPlug.position.set(0, -0.6, dimensions.length * 0.3);
    oilPan.add(drainPlug);
    
    // Add baffle plates
    const baffleGeom = new THREE.PlaneGeometry(dimensions.width * 0.6, 0.8);
    const baffle1 = new THREE.Mesh(baffleGeom, this.materials.get('oilPan'));
    baffle1.position.set(0, 0, -dimensions.length * 0.2);
    baffle1.rotation.x = Math.PI / 2;
    oilPan.add(baffle1);
    
    const baffle2 = new THREE.Mesh(baffleGeom, this.materials.get('oilPan'));
    baffle2.position.set(0, 0, dimensions.length * 0.2);
    baffle2.rotation.x = Math.PI / 2;
    oilPan.add(baffle2);
    
    this.setupShadows(oilPan);
    this.addComponentLabel(oilPan, 'Oil Pan', [0, 1.2, 0]);
    
    this.components.set('oilPan', oilPan);
    this.config.three.staticComponents.add(oilPan);
}