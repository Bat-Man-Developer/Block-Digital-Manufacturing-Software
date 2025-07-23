// Air Intake System
createAirFilter() {
    const airFilterGeometry = this.getOptimizedGeometry(
        'airFilter',
        () => new THREE.CylinderGeometry(1.0, 1.0, 1.2, 16, 1)
    );
    const airFilter = new THREE.Mesh(airFilterGeometry, this.materials.get('airFilter'));
    airFilter.name = 'AirFilter';
    airFilter.position.set(-3.5, 5.0, 2.5);
    this.setupShadows(airFilter);
    
    // Add filter element
    const elementGeom = new THREE.CylinderGeometry(0.8, 0.8, 1.0, 16);
    const element = new THREE.Mesh(elementGeom, this.materials.get('airFilter'));
    element.material = element.material.clone();
    element.material.opacity = 0.8;
    element.material.transparent = true;
    airFilter.add(element);
    
    this.addComponentLabel(airFilter, 'Air Filter', [0, 1.5, 0]);
    
    this.components.set('airFilter', airFilter);
    this.config.three.staticComponents.add(airFilter);
}

createPrecleaner() {
    const precleanerGeometry = this.getOptimizedGeometry(
        'precleaner',
        () => new THREE.CylinderGeometry(1.2, 1.2, 0.8, 16)
    );
    const precleaner = new THREE.Mesh(precleanerGeometry, this.materials.get('pipe'));
    precleaner.name = 'Precleaner';
    precleaner.position.set(-3.5, 6.5, 2.5);
    this.setupShadows(precleaner);
    
    // Add vanes for cyclone effect
    for (let i = 0; i < 8; i++) {
        const vaneGeom = new THREE.BoxGeometry(0.05, 0.6, 0.2);
        const vane = new THREE.Mesh(vaneGeom, this.materials.get('pipe'));
        const angle = (i / 8) * Math.PI * 2;
        vane.position.set(Math.cos(angle) * 0.9, 0, Math.sin(angle) * 0.9);
        vane.rotation.y = angle + Math.PI / 8;
        precleaner.add(vane);
    }
    
    this.addComponentLabel(precleaner, 'Pre-cleaner', [0, 1.2, 0]);
    
    this.components.set('precleaner', precleaner);
    this.config.three.staticComponents.add(precleaner);
}

createAirFilterHousing() {
    const housingGeometry = this.getOptimizedGeometry(
        'airFilterHousing',
        () => new THREE.CylinderGeometry(1.4, 1.4, 1.6, 16)
    );
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('engineBlock'));
    housing.name = 'AirFilterHousing';
    housing.position.set(-3.5, 4.8, 2.5);
    this.setupShadows(housing);
    
    // Add mounting flanges
    const flangeGeom = new THREE.CylinderGeometry(1.6, 1.6, 0.1, 16);
    const topFlange = new THREE.Mesh(flangeGeom, this.materials.get('engineBlock'));
    topFlange.position.y = 0.85;
    housing.add(topFlange);
    
    const bottomFlange = new THREE.Mesh(flangeGeom, this.materials.get('engineBlock'));
    bottomFlange.position.y = -0.85;
    housing.add(bottomFlange);
    
    // Add service indicator port
    const indicatorGeom = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 8);
    const indicator = new THREE.Mesh(indicatorGeom, this.materials.get('pipe'));
    indicator.position.set(1.2, 0, 0);
    indicator.rotation.z = Math.PI / 2;
    housing.add(indicator);
    
    this.addComponentLabel(housing, 'Air Filter Housing', [0, 2.0, 0]);
    
    this.components.set('airFilterHousing', housing);
    this.config.three.staticComponents.add(housing);
}

createAirIntakeTube() {
    const tubeGroup = new THREE.Group();
    tubeGroup.name = 'AirIntakeTube';
    
    // Create curved intake tube
    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-3.5, 3.5, 2.5),
        new THREE.Vector3(-2.0, 3.0, 2.0),
        new THREE.Vector3(-1.0, 2.5, 1.5),
        new THREE.Vector3(0, 2.0, 1.0)
    ]);
    
    const tubeGeometry = this.getOptimizedGeometry(
        'airIntakeTube',
        () => new THREE.TubeGeometry(curve, 20, 0.3, 12, false)
    );
    const tube = new THREE.Mesh(tubeGeometry, this.materials.get('pipe'));
    this.setupShadows(tube);
    tubeGroup.add(tube);
    
    // Add connecting clamps
    const clampPositions = [0.2, 0.5, 0.8];
    clampPositions.forEach(t => {
        const point = curve.getPoint(t);
        const clampGeom = new THREE.TorusGeometry(0.35, 0.05, 8, 16);
        const clamp = new THREE.Mesh(clampGeom, this.materials.get('engineBlock'));
        clamp.position.copy(point);
        this.setupShadows(clamp);
        tubeGroup.add(clamp);
    });
    
    this.addComponentLabel(tubeGroup, 'Air Intake Tube', [0, 1.0, 0]);
    
    this.components.set('airIntakeTube', tubeGroup);
    this.config.three.staticComponents.add(tubeGroup);
}

createAirRestrictionIndicator() {
    const indicatorGeometry = this.getOptimizedGeometry(
        'airRestrictionIndicator',
        () => new THREE.CylinderGeometry(0.15, 0.15, 0.4, 8)
    );
    const indicator = new THREE.Mesh(indicatorGeometry, this.materials.get('engineBlock'));
    indicator.name = 'AirRestrictionIndicator';
    indicator.position.set(-2.3, 4.8, 2.5);
    this.setupShadows(indicator);
    
    // Add viewing window
    const windowGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 8);
    const window = new THREE.Mesh(windowGeom, this.materials.get('air'));
    window.material = window.material.clone();
    window.material.transparent = true;
    window.material.opacity = 0.3;
    window.position.y = 0.1;
    indicator.add(window);
    
    // Add indicator piston
    const pistonGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.15, 6);
    const piston = new THREE.Mesh(pistonGeom, this.materials.get('piston'));
    piston.position.y = -0.05;
    indicator.add(piston);
    
    this.addComponentLabel(indicator, 'Air Restriction Indicator', [0, 0.8, 0]);
    
    this.components.set('airRestrictionIndicator', indicator);
    this.config.three.staticComponents.add(indicator);
}

createMAFSensor() {
    const sensorGeometry = this.getOptimizedGeometry(
        'mafSensor',
        () => new THREE.BoxGeometry(0.6, 0.4, 0.3)
    );
    const sensor = new THREE.Mesh(sensorGeometry, this.materials.get('engineBlock'));
    sensor.name = 'MAFSensor';
    sensor.position.set(-1.5, 2.8, 1.8);
    this.setupShadows(sensor);
    
    // Add sensor element housing
    const elementGeom = new THREE.CylinderGeometry(0.1, 0.1, 0.25, 8);
    const element = new THREE.Mesh(elementGeom, this.materials.get('sparkPlug'));
    element.position.set(0, 0, 0.2);
    element.rotation.x = Math.PI / 2;
    sensor.add(element);
    
    // Add electrical connector
    const connectorGeom = new THREE.BoxGeometry(0.2, 0.15, 0.1);
    const connector = new THREE.Mesh(connectorGeom, this.materials.get('engineBlock'));
    connector.position.set(-0.3, 0.15, 0);
    sensor.add(connector);
    
    // Add wire harness
    const wireGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 6);
    const wire = new THREE.Mesh(wireGeom, this.materials.get('wire'));
    wire.position.set(-0.3, 0.6, 0);
    sensor.add(wire);
    
    this.addComponentLabel(sensor, 'MAF Sensor', [0, 0.8, 0]);
    
    this.components.set('mafSensor', sensor);
    this.config.three.staticComponents.add(sensor);
}

createThrottlePositionSensor() {
    const sensorGeometry = this.getOptimizedGeometry(
        'throttlePositionSensor',
        () => new THREE.CylinderGeometry(0.2, 0.2, 0.3, 8)
    );
    const sensor = new THREE.Mesh(sensorGeometry, this.materials.get('engineBlock'));
    sensor.name = 'ThrottlePositionSensor';
    sensor.position.set(1.2, 2.0, 0.8);
    this.setupShadows(sensor);
    
    // Add potentiometer housing
    const potGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 8);
    const pot = new THREE.Mesh(potGeom, this.materials.get('sparkPlug'));
    pot.position.y = 0.1;
    sensor.add(pot);
    
    // Add connector
    const connectorGeom = new THREE.BoxGeometry(0.15, 0.1, 0.08);
    const connector = new THREE.Mesh(connectorGeom, this.materials.get('engineBlock'));
    connector.position.set(0.25, 0, 0);
    sensor.add(connector);
    
    this.addComponentLabel(sensor, 'TPS', [0, 0.5, 0]);
    
    this.components.set('throttlePositionSensor', sensor);
    this.config.three.staticComponents.add(sensor);
}

createMAPSensor() {
    const sensorGeometry = this.getOptimizedGeometry(
        'mapSensor',
        () => new THREE.BoxGeometry(0.4, 0.3, 0.2)
    );
    const sensor = new THREE.Mesh(sensorGeometry, this.materials.get('engineBlock'));
    sensor.name = 'MAPSensor';
    sensor.position.set(0.5, 3.2, 0.5);
    this.setupShadows(sensor);
    
    // Add pressure port
    const portGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.15, 6);
    const port = new THREE.Mesh(portGeom, this.materials.get('pipe'));
    port.position.set(0, -0.2, 0);
    sensor.add(port);
    
    // Add vacuum hose connection
    const hoseGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 6);
    const hose = new THREE.Mesh(hoseGeom, this.materials.get('vacuumHose'));
    hose.position.set(0, -0.45, 0);
    sensor.add(hose);
    
    // Add electrical connector
    const connectorGeom = new THREE.BoxGeometry(0.15, 0.1, 0.08);
    const connector = new THREE.Mesh(connectorGeom, this.materials.get('engineBlock'));
    connector.position.set(0.25, 0.1, 0);
    sensor.add(connector);
    
    this.addComponentLabel(sensor, 'MAP Sensor', [0, 0.6, 0]);
    
    this.components.set('mapSensor', sensor);
    this.config.three.staticComponents.add(sensor);
}

createAirIntakeSilencer() {
    const silencerGeometry = this.getOptimizedGeometry(
        'airIntakeSilencer',
        () => new THREE.CylinderGeometry(0.8, 0.8, 2.0, 16)
    );
    const silencer = new THREE.Mesh(silencerGeometry, this.materials.get('pipe'));
    silencer.name = 'AirIntakeSilencer';
    silencer.position.set(-5.0, 4.5, 2.5);
    silencer.rotation.z = Math.PI / 2;
    this.setupShadows(silencer);
    
    // Add internal baffles
    for (let i = 0; i < 3; i++) {
        const baffleGeom = new THREE.CylinderGeometry(0.75, 0.75, 0.05, 16);
        const baffle = new THREE.Mesh(baffleGeom, this.materials.get('engineBlock'));
        baffle.position.y = -0.6 + (i * 0.6);
        
        // Add center hole
        const holeGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.1, 12);
        const hole = new THREE.Mesh(holeGeom, this.materials.get('air'));
        hole.material = hole.material.clone();
        hole.material.transparent = true;
        hole.material.opacity = 0.1;
        baffle.add(hole);
        
        silencer.add(baffle);
    }
    
    // Add perforated outer shell
    const shellGeom = new THREE.CylinderGeometry(0.85, 0.85, 1.9, 16);
    const shell = new THREE.Mesh(shellGeom, this.materials.get('pipe'));
    shell.material = shell.material.clone();
    shell.material.transparent = true;
    shell.material.opacity = 0.7;
    silencer.add(shell);
    
    this.addComponentLabel(silencer, 'Air Intake Silencer', [0, 1.2, 0]);
    
    this.components.set('airIntakeSilencer', silencer);
    this.config.three.staticComponents.add(silencer);
}