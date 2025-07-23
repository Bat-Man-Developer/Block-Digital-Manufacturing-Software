// Sensors & Electronic Components
createCrankshaftPositionSensor() {
    const sensorGroup = new THREE.Group();
    sensorGroup.name = "CrankshaftPositionSensor";
    
    // Main sensor body
    const sensorBodyGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 8);
    const sensorBody = new THREE.Mesh(sensorBodyGeometry, this.materials.get('alternator'));
    sensorBody.rotation.z = Math.PI / 2;
    sensorBody.position.set(3.5, -1.5, 0);
    
    // Sensor tip (magnetic pickup)
    const tipGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 8);
    const tip = new THREE.Mesh(tipGeometry, this.materials.get('piston'));
    tip.rotation.z = Math.PI / 2;
    tip.position.set(3.9, -1.5, 0);
    
    // Electrical connector
    const connectorGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.2);
    const connector = new THREE.Mesh(connectorGeometry, this.materials.get('wire'));
    connector.position.set(3.2, -1.5, 0);
    
    // Wiring
    this.createSensorWiring(sensorGroup, [3.2, -1.5, 0], [2.5, -0.5, 0]);
    
    sensorGroup.add(sensorBody, tip, connector);
    this.components.set('crankshaftPositionSensor', sensorGroup);
    this.config.three.staticComponents.add(sensorGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(sensorGroup, "Crank Sensor", [0, 1, 0]);
    }
}

createCamshaftPositionSensor() {
    const sensorGroup = new THREE.Group();
    sensorGroup.name = "CamshaftPositionSensor";
    
    // Main sensor body
    const sensorBodyGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.6, 8);
    const sensorBody = new THREE.Mesh(sensorBodyGeometry, this.materials.get('alternator'));
    sensorBody.rotation.x = Math.PI / 2;
    sensorBody.position.set(1.5, 2.8, 0.8);
    
    // Sensor tip
    const tipGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.2, 8);
    const tip = new THREE.Mesh(tipGeometry, this.materials.get('piston'));
    tip.rotation.x = Math.PI / 2;
    tip.position.set(1.5, 2.8, 1.1);
    
    // Electrical connector
    const connectorGeometry = new THREE.BoxGeometry(0.25, 0.15, 0.15);
    const connector = new THREE.Mesh(connectorGeometry, this.materials.get('wire'));
    connector.position.set(1.5, 2.8, 0.5);
    
    // Wiring
    this.createSensorWiring(sensorGroup, [1.5, 2.8, 0.5], [2.0, 2.0, 0]);
    
    sensorGroup.add(sensorBody, tip, connector);
    this.components.set('camshaftPositionSensor', sensorGroup);
    this.config.three.staticComponents.add(sensorGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(sensorGroup, "Cam Sensor", [0, 0, -0.8]);
    }
}

createKnockSensor() {
    const sensorGroup = new THREE.Group();
    sensorGroup.name = "KnockSensor";
    
    // Main sensor body (threaded)
    const sensorBodyGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.4, 8);
    const sensorBody = new THREE.Mesh(sensorBodyGeometry, this.materials.get('alternator'));
    sensorBody.position.set(-1.5, 0.5, 1.2);
    
    // Hex head for mounting
    const hexGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.15, 6);
    const hexHead = new THREE.Mesh(hexGeometry, this.materials.get('crankshaft'));
    hexHead.position.set(-1.5, 0.7, 1.2);
    
    // Electrical connector
    const connectorGeometry = new THREE.BoxGeometry(0.2, 0.3, 0.15);
    const connector = new THREE.Mesh(connectorGeometry, this.materials.get('wire'));
    connector.position.set(-1.5, 0.3, 1.2);
    
    // Wiring
    this.createSensorWiring(sensorGroup, [-1.5, 0.3, 1.2], [-1.0, 1.5, 0.5]);
    
    sensorGroup.add(sensorBody, hexHead, connector);
    this.components.set('knockSensor', sensorGroup);
    this.config.three.staticComponents.add(sensorGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(sensorGroup, "Knock Sensor", [0, -0.5, 0]);
    }
}

createOxygenSensor() {
    const sensorGroup = new THREE.Group();
    sensorGroup.name = "OxygenSensor";
    
    // Main sensor body
    const sensorBodyGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.2, 8);
    const sensorBody = new THREE.Mesh(sensorBodyGeometry, this.materials.get('alternator'));
    sensorBody.rotation.z = -Math.PI / 6;
    sensorBody.position.set(-2.5, -0.5, -1.8);
    
    // Threaded portion
    const threadGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.4, 8);
    const threadPortion = new THREE.Mesh(threadGeometry, this.materials.get('crankshaft'));
    threadPortion.rotation.z = -Math.PI / 6;
    threadPortion.position.set(-2.7, -0.7, -1.8);
    
    // Heat shield
    const shieldGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.6, 8);
    const heatShield = new THREE.Mesh(shieldGeometry, this.materials.get('hotMaterial'));
    heatShield.rotation.z = -Math.PI / 6;
    heatShield.position.set(-2.6, -0.6, -1.8);
    
    // Electrical connector
    const connectorGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.2);
    const connector = new THREE.Mesh(connectorGeometry, this.materials.get('wire'));
    connector.position.set(-2.2, -0.2, -1.8);
    
    // Wiring with heat protection
    this.createSensorWiring(sensorGroup, [-2.2, -0.2, -1.8], [-1.5, 0.5, -1.0]);
    
    sensorGroup.add(sensorBody, threadPortion, heatShield, connector);
    this.components.set('oxygenSensor', sensorGroup);
    this.config.three.staticComponents.add(sensorGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(sensorGroup, "O2 Sensor", [0.5, 0.5, 0]);
    }
}

createEngineSpeedSensor() {
    const sensorGroup = new THREE.Group();
    sensorGroup.name = "EngineSpeedSensor";
    
    // Main sensor body
    const sensorBodyGeometry = new THREE.CylinderGeometry(0.14, 0.14, 0.7, 8);
    const sensorBody = new THREE.Mesh(sensorBodyGeometry, this.materials.get('alternator'));
    sensorBody.rotation.z = Math.PI / 2;
    sensorBody.position.set(3.2, -0.8, 1.5);
    
    // Mounting bracket
    const bracketGeometry = new THREE.BoxGeometry(0.4, 0.2, 0.3);
    const bracket = new THREE.Mesh(bracketGeometry, this.materials.get('engineBlock'));
    bracket.position.set(2.8, -0.8, 1.5);
    
    // Electrical connector
    const connectorGeometry = new THREE.BoxGeometry(0.25, 0.15, 0.15);
    const connector = new THREE.Mesh(connectorGeometry, this.materials.get('wire'));
    connector.position.set(2.6, -0.8, 1.5);
    
    // Wiring
    this.createSensorWiring(sensorGroup, [2.6, -0.8, 1.5], [2.0, 0, 1.0]);
    
    sensorGroup.add(sensorBody, bracket, connector);
    this.components.set('engineSpeedSensor', sensorGroup);
    this.config.three.staticComponents.add(sensorGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(sensorGroup, "Speed Sensor", [0, 0.8, 0]);
    }
}

createBoostPressureSensor() {
    const sensorGroup = new THREE.Group();
    sensorGroup.name = "BoostPressureSensor";
    
    // Main sensor body
    const sensorBodyGeometry = new THREE.BoxGeometry(0.8, 0.4, 0.3);
    const sensorBody = new THREE.Mesh(sensorBodyGeometry, this.materials.get('alternator'));
    sensorBody.position.set(1.0, 1.8, 1.8);
    
    // Pressure port
    const portGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 8);
    const pressurePort = new THREE.Mesh(portGeometry, this.materials.get('pipe'));
    pressurePort.rotation.x = Math.PI / 2;
    pressurePort.position.set(1.0, 1.8, 2.0);
    
    // Electrical connector
    const connectorGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.15);
    const connector = new THREE.Mesh(connectorGeometry, this.materials.get('wire'));
    connector.position.set(0.6, 1.8, 1.8);
    
    // Vacuum line connection
    this.createVacuumLine(sensorGroup, [1.0, 1.8, 2.1], [0.5, 2.2, 2.5]);
    
    // Wiring
    this.createSensorWiring(sensorGroup, [0.6, 1.8, 1.8], [0, 2.0, 1.0]);
    
    sensorGroup.add(sensorBody, pressurePort, connector);
    this.components.set('boostPressureSensor', sensorGroup);
    this.config.three.staticComponents.add(sensorGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(sensorGroup, "Boost Sensor", [0, -0.5, 0]);
    }
}

createExhaustTemperatureSensor() {
    const sensorGroup = new THREE.Group();
    sensorGroup.name = "ExhaustTemperatureSensor";
    
    // Thermocouple probe
    const probeGeometry = new THREE.CylinderGeometry(0.06, 0.06, 1.5, 8);
    const probe = new THREE.Mesh(probeGeometry, this.materials.get('hotMaterial'));
    probe.rotation.z = Math.PI / 4;
    probe.position.set(-2.0, -0.5, -2.2);
    
    // Protective sheath
    const sheathGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.0, 8);
    const sheath = new THREE.Mesh(sheathGeometry, this.materials.get('pipe'));
    sheath.rotation.z = Math.PI / 4;
    sheath.position.set(-1.8, -0.3, -2.2);
    
    // Junction box
    const junctionGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.2);
    const junctionBox = new THREE.Mesh(junctionGeometry, this.materials.get('alternator'));
    junctionBox.position.set(-1.2, 0.2, -2.2);
    
    // Thermocouple wire
    this.createThermocouple(sensorGroup, [-1.2, 0.2, -2.2], [-0.5, 1.0, -1.5]);
    
    sensorGroup.add(probe, sheath, junctionBox);
    this.components.set('exhaustTemperatureSensor', sensorGroup);
    this.config.three.staticComponents.add(sensorGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(sensorGroup, "EGT Sensor", [0.5, 0.5, 0]);
    }
}

createIntakeAirTemperatureSensor() {
    const sensorGroup = new THREE.Group();
    sensorGroup.name = "IntakeAirTemperatureSensor";
    
    // Main sensor body
    const sensorBodyGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 8);
    const sensorBody = new THREE.Mesh(sensorBodyGeometry, this.materials.get('alternator'));
    sensorBody.rotation.y = Math.PI / 4;
    sensorBody.position.set(0.8, 1.5, 1.2);
    
    // Threaded portion
    const threadGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 8);
    const threadPortion = new THREE.Mesh(threadGeometry, this.materials.get('crankshaft'));
    threadPortion.rotation.y = Math.PI / 4;
    threadPortion.position.set(0.9, 1.5, 1.3);
    
    // Electrical connector
    const connectorGeometry = new THREE.BoxGeometry(0.2, 0.15, 0.15);
    const connector = new THREE.Mesh(connectorGeometry, this.materials.get('wire'));
    connector.position.set(0.6, 1.5, 1.0);
    
    // Wiring
    this.createSensorWiring(sensorGroup, [0.6, 1.5, 1.0], [0, 2.0, 0.5]);
    
    sensorGroup.add(sensorBody, threadPortion, connector);
    this.components.set('intakeAirTemperatureSensor', sensorGroup);
    this.config.three.staticComponents.add(sensorGroup);
    
    if (this.config.appearance?.showLabels) {
        this.addComponentLabel(sensorGroup, "IAT Sensor", [0, -0.5, 0]);
    }
}

createSensorWiring(parent, startPos, endPos) {
    const wireGeometry = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
            new THREE.Vector3(...startPos),
            new THREE.Vector3((startPos[0] + endPos[0]) / 2, startPos[1] + 0.3, (startPos[2] + endPos[2]) / 2),
            new THREE.Vector3(...endPos)
        ]),
        20, 0.02, 8, false
    );
    const wire = new THREE.Mesh(wireGeometry, this.materials.get('wire'));
    wire.name = 'SensorWiring';
    parent.add(wire);
}

createVacuumLine(parent, startPos, endPos) {
    const lineGeometry = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
            new THREE.Vector3(...startPos),
            new THREE.Vector3((startPos[0] + endPos[0]) / 2, startPos[1] + 0.2, (startPos[2] + endPos[2]) / 2),
            new THREE.Vector3(...endPos)
        ]),
        16, 0.04, 6, false
    );
    const vacuumLine = new THREE.Mesh(lineGeometry, this.materials.get('vacuumHose'));
    vacuumLine.name = 'VacuumLine';
    parent.add(vacuumLine);
}

createThermocouple(parent, startPos, endPos) {
    const wireGeometry = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
            new THREE.Vector3(...startPos),
            new THREE.Vector3((startPos[0] + endPos[0]) / 2, startPos[1] + 0.2, (startPos[2] + endPos[2]) / 2),
            new THREE.Vector3(...endPos)
        ]),
        20, 0.015, 6, false
    );
    const thermocouple = new THREE.Mesh(wireGeometry, this.materials.get('hotMaterial'));
    thermocouple.name = 'ThermocoupleWire';
    parent.add(thermocouple);
}