// Miscellaneous
createOilDrainPlug() {
    const group = new THREE.Group();
    group.name = 'OilDrainPlug';
    
    // Drain plug body
    const plugGeometry = this.getOptimizedGeometry(
        'drainPlug',
        () => new THREE.CylinderGeometry(0.08, 0.06, 0.12, 8)
    );
    const drainPlug = new THREE.Mesh(plugGeometry, this.materials.get('crankshaft'));
    drainPlug.name = 'DrainPlugBody';
    drainPlug.position.set(0, -4.2, -1.2);
    drainPlug.rotation.x = Math.PI / 2;
    group.add(drainPlug);
    
    // Hex head
    const hexGeometry = this.getOptimizedGeometry(
        'drainPlugHex',
        () => new THREE.CylinderGeometry(0.1, 0.1, 0.04, 6)
    );
    const hexHead = new THREE.Mesh(hexGeometry, this.materials.get('crankshaft'));
    hexHead.name = 'DrainPlugHex';
    hexHead.position.set(0, -4.3, -1.2);
    hexHead.rotation.x = Math.PI / 2;
    group.add(hexHead);
    
    // Gasket
    const gasketGeometry = this.getOptimizedGeometry(
        'drainPlugGasket',
        () => new THREE.RingGeometry(0.06, 0.09, 16)
    );
    const gasket = new THREE.Mesh(gasketGeometry, this.materials.get('oilPanGasket'));
    gasket.name = 'DrainPlugGasket';
    gasket.position.set(0, -4.14, -1.2);
    gasket.rotation.x = Math.PI / 2;
    group.add(gasket);
    
    this.config.three.staticComponents.add(group);
    this.components.set('oilDrainPlug', group);
}

createPCVValve() {
    const group = new THREE.Group();
    group.name = 'PCVValve';
    
    // Valve body
    const bodyGeometry = this.getOptimizedGeometry(
        'pcvValveBody',
        () => new THREE.CylinderGeometry(0.06, 0.06, 0.4, 8)
    );
    const valveBody = new THREE.Mesh(bodyGeometry, this.materials.get('alternator'));
    valveBody.name = 'PCVValveBody';
    valveBody.position.set(1.5, 2.5, 1);
    group.add(valveBody);
    
    // Valve stem
    const stemGeometry = this.getOptimizedGeometry(
        'pcvValveStem',
        () => new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8)
    );
    const valveStem = new THREE.Mesh(stemGeometry, this.materials.get('crankshaft'));
    valveStem.name = 'PCVValveStem';
    valveStem.position.set(1.5, 2.5, 1);
    group.add(valveStem);
    
    // Connection fittings
    const fittingGeometry = this.getOptimizedGeometry(
        'pcvFitting',
        () => new THREE.CylinderGeometry(0.04, 0.04, 0.08, 8)
    );
    
    const topFitting = new THREE.Mesh(fittingGeometry, this.materials.get('sparkPlug'));
    topFitting.name = 'PCVTopFitting';
    topFitting.position.set(1.5, 2.7, 1);
    group.add(topFitting);
    
    const bottomFitting = new THREE.Mesh(fittingGeometry, this.materials.get('sparkPlug'));
    bottomFitting.name = 'PCVBottomFitting';
    bottomFitting.position.set(1.5, 2.3, 1);
    group.add(bottomFitting);
    
    this.config.three.staticComponents.add(group);
    this.components.set('pcvValve', group);
}

createCrankcaseVentilation() {
    const group = new THREE.Group();
    group.name = 'CrankcaseVentilation';
    
    // Breather cap
    const capGeometry = this.getOptimizedGeometry(
        'breatherCap',
        () => new THREE.CylinderGeometry(0.08, 0.06, 0.15, 12)
    );
    const breatherCap = new THREE.Mesh(capGeometry, this.materials.get('alternator'));
    breatherCap.name = 'BreatherCap';
    breatherCap.position.set(-1.5, 4.8, 1.5);
    group.add(breatherCap);
    
    // Breather tube
    const tubeGeometry = this.getOptimizedGeometry(
        'breatherTube',
        () => new THREE.CylinderGeometry(0.04, 0.04, 0.3, 8)
    );
    const breatherTube = new THREE.Mesh(tubeGeometry, this.materials.get('pipe'));
    breatherTube.name = 'BreatherTube';
    breatherTube.position.set(-1.5, 4.5, 1.5);
    group.add(breatherTube);
    
    // Ventilation hose
    const ventHose = this.createFlexibleHose(
        [-1.5, 4.3, 1.5], [-0.5, 3.8, 2],
        this.materials.get('vacuumHose'), 0.03
    );
    ventHose.name = 'VentilationHose';
    group.add(ventHose);
    
    // Oil separator
    const separatorGeometry = this.getOptimizedGeometry(
        'oilSeparator',
        () => new THREE.CylinderGeometry(0.1, 0.1, 0.2, 12)
    );
    const separator = new THREE.Mesh(separatorGeometry, this.materials.get('alternator'));
    separator.name = 'OilSeparator';
    separator.position.set(-0.5, 3.6, 2);
    group.add(separator);
    
    this.config.three.staticComponents.add(group);
    this.components.set('crankcaseVentilation', group);
}

createEngineTags() {
    const group = new THREE.Group();
    group.name = 'EngineTags';
    
    // Create nameplate
    const nameplateGeometry = this.getOptimizedGeometry(
        'engineNameplate',
        () => new THREE.BoxGeometry(0.8, 0.3, 0.02)
    );
    const nameplate = new THREE.Mesh(nameplateGeometry, this.materials.get('alternator'));
    nameplate.name = 'EngineNameplate';
    nameplate.position.set(0, 1, -2.02);
    group.add(nameplate);
    
    // Add text to nameplate (simplified representation)
    const textGeometry = this.getOptimizedGeometry(
        'nameplateText',
        () => new THREE.BoxGeometry(0.7, 0.2, 0.005)
    );
    const text = new THREE.Mesh(textGeometry, this.materials.get('sparkPlug'));
    text.name = 'NameplateText';
    text.position.set(0, 1, -2.01);
    group.add(text);
    
    this.config.three.staticComponents.add(group);
    this.components.set('engineTags', group);
}

createEngineSerialPlate() {
    const group = new THREE.Group();
    group.name = 'EngineSerialPlate';
    
    // Serial plate
    const plateGeometry = this.getOptimizedGeometry(
        'serialPlate',
        () => new THREE.BoxGeometry(0.6, 0.4, 0.02)
    );
    const serialPlate = new THREE.Mesh(plateGeometry, this.materials.get('alternator'));
    serialPlate.name = 'SerialPlate';
    serialPlate.position.set(-1.5, 0.5, -2.02);
    group.add(serialPlate);
    
    // Mounting rivets
    const rivetGeometry = this.getOptimizedGeometry(
        'plateRivet',
        () => new THREE.CylinderGeometry(0.015, 0.015, 0.03, 8)
    );
    
    const rivetPositions = [
        [-1.75, 0.65, -2.015], [-1.25, 0.65, -2.015],
        [-1.75, 0.35, -2.015], [-1.25, 0.35, -2.015]
    ];
    
    rivetPositions.forEach((pos, index) => {
        const rivet = new THREE.Mesh(rivetGeometry, this.materials.get('crankshaft'));
        rivet.name = `SerialPlateRivet_${index}`;
        rivet.position.set(pos[0], pos[1], pos[2]);
        rivet.rotation.z = Math.PI / 2;
        group.add(rivet);
    });
    
    this.config.three.staticComponents.add(group);
    this.components.set('engineSerialPlate', group);
}

createLiftingEyes() {
    const group = new THREE.Group();
    group.name = 'LiftingEyes';
    
    const eyeGeometry = this.getOptimizedGeometry(
        'liftingEye',
        () => {
            const shape = new THREE.Shape();
            shape.moveTo(0, 0);
            shape.lineTo(0.3, 0);
            shape.lineTo(0.3, 0.15);
            shape.arc(-0.075, 0, 0.075, 0, Math.PI, false);
            shape.lineTo(0, 0.15);
            shape.lineTo(0, 0);
            
            return new THREE.ExtrudeGeometry(shape, {
                depth: 0.1,
                bevelEnabled: false
            });
        }
    );
    
    // Front lifting eyes
    const frontLeftEye = new THREE.Mesh(eyeGeometry, this.materials.get('crankshaft'));
    frontLeftEye.name = 'FrontLeftLiftingEye';
    frontLeftEye.position.set(-1.8, 4.5, 2.1);
    frontLeftEye.rotation.y = Math.PI;
    group.add(frontLeftEye);
    
    const frontRightEye = new THREE.Mesh(eyeGeometry, this.materials.get('crankshaft'));
    frontRightEye.name = 'FrontRightLiftingEye';
    frontRightEye.position.set(1.8, 4.5, 2.1);
    group.add(frontRightEye);
    
    // Rear lifting eyes
    const rearLeftEye = new THREE.Mesh(eyeGeometry, this.materials.get('crankshaft'));
    rearLeftEye.name = 'RearLeftLiftingEye';
    rearLeftEye.position.set(-1.8, 4.5, -2.1);
    rearLeftEye.rotation.y = Math.PI;
    group.add(rearLeftEye);
    
    const rearRightEye = new THREE.Mesh(eyeGeometry, this.materials.get('crankshaft'));
    rearRightEye.name = 'RearRightLiftingEye';
    rearRightEye.position.set(1.8, 4.5, -2.1);
    group.add(rearRightEye);
    
    this.config.three.staticComponents.add(group);
    this.components.set('liftingEyes', group);
}

createHourMeter() {
    const group = new THREE.Group();
    group.name = 'HourMeter';
    
    // Meter housing
    const housingGeometry = this.getOptimizedGeometry(
        'hourMeterHousing',
        () => new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16)
    );
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('engineBlock'));
    housing.name = 'HourMeterHousing';
    housing.position.set(1.8, 3.5, 2.1);
    housing.rotation.z = Math.PI / 2;
    group.add(housing);
    
    // Meter face
    const faceGeometry = this.getOptimizedGeometry(
        'hourMeterFace',
        () => new THREE.CylinderGeometry(0.1, 0.1, 0.01, 16)
    );
    const face = new THREE.Mesh(faceGeometry, this.materials.get('sparkPlug'));
    face.name = 'HourMeterFace';
    face.position.set(1.85, 3.5, 2.1);
    face.rotation.z = Math.PI / 2;
    group.add(face);
    
    // Meter digits (simplified representation)
    const digitGeometry = this.getOptimizedGeometry(
        'hourMeterDigits',
        () => new THREE.BoxGeometry(0.08, 0.02, 0.005)
    );
    const digits = new THREE.Mesh(digitGeometry, this.materials.get('engineBlock'));
    digits.name = 'HourMeterDigits';
    digits.position.set(1.86, 3.5, 2.1);
    digits.rotation.z = Math.PI / 2;
    group.add(digits);
    
    this.config.three.staticComponents.add(group);
    this.components.set('hourMeter', group);
}

createEngineStopSolenoid() {
    const group = new THREE.Group();
    group.name = 'EngineStopSolenoid';
    
    // Solenoid body
    const bodyGeometry = this.getOptimizedGeometry(
        'stopSolenoidBody',
        () => new THREE.CylinderGeometry(0.08, 0.08, 0.3, 12)
    );
    const solenoidBody = new THREE.Mesh(bodyGeometry, this.materials.get('alternator'));
    solenoidBody.name = 'StopSolenoidBody';
    solenoidBody.position.set(3, 2.8, -1.5);
    group.add(solenoidBody);
    
    // Solenoid plunger
    const plungerGeometry = this.getOptimizedGeometry(
        'stopSolenoidPlunger',
        () => new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8)
    );
    const plunger = new THREE.Mesh(plungerGeometry, this.materials.get('crankshaft'));
    plunger.name = 'StopSolenoidPlunger';
    plunger.position.set(3, 2.8, -1.5);
    group.add(plunger);
    
    // Electrical connector
    const connectorGeometry = this.getOptimizedGeometry(
        'stopSolenoidConnector',
        () => new THREE.BoxGeometry(0.1, 0.08, 0.15)
    );
    const connector = new THREE.Mesh(connectorGeometry, this.materials.get('wire'));
    connector.name = 'StopSolenoidConnector';
    connector.position.set(3.12, 2.8, -1.5);
    group.add(connector);
    
    // Mounting bracket
    const bracketGeometry = this.getOptimizedGeometry(
        'stopSolenoidBracket',
        () => new THREE.BoxGeometry(0.2, 0.05, 0.4)
    );
    const bracket = new THREE.Mesh(bracketGeometry, this.materials.get('crankshaft'));
    bracket.name = 'StopSolenoidBracket';
    bracket.position.set(3, 2.6, -1.5);
    group.add(bracket);
    
    this.config.three.staticComponents.add(group);
    this.components.set('engineStopSolenoid', group);
}

createFuelShutoffValve() {
    const group = new THREE.Group();
    group.name = 'FuelShutoffValve';
    
    // Valve body
    const bodyGeometry = this.getOptimizedGeometry(
        'shutoffValveBody',
        () => new THREE.SphereGeometry(0.08, 12, 8)
    );
    const valveBody = new THREE.Mesh(bodyGeometry, this.materials.get('alternator'));
    valveBody.name = 'ShutoffValveBody';
    valveBody.position.set(-3.5, 1.5, 0);
    group.add(valveBody);
    
    // Valve handle
    const handleGeometry = this.getOptimizedGeometry(
        'shutoffValveHandle',
        () => new THREE.BoxGeometry(0.3, 0.02, 0.02)
    );
    const handle = new THREE.Mesh(handleGeometry, this.materials.get('crankshaft'));
    handle.name = 'ShutoffValveHandle';
    handle.position.set(-3.5, 1.58, 0);
    group.add(handle);
    
    // Input pipe connection
    const inputPipe = this.createRigidPipe(
        [-3.58, 1.5, 0], [-4, 1.5, 0],
        this.materials.get('pipe'), 0.03
    );
    inputPipe.name = 'ShutoffValveInput';
    group.add(inputPipe);
    
    // Output pipe connection
    const outputPipe = this.createRigidPipe(
        [-3.42, 1.5, 0], [-3, 1.5, 0],
        this.materials.get('pipe'), 0.03
    );
    outputPipe.name = 'ShutoffValveOutput';
    group.add(outputPipe);
    
    this.config.three.staticComponents.add(group);
    this.components.set('fuelShutoffValve', group);
}

createInspectionPlates() {
    const group = new THREE.Group();
    group.name = 'InspectionPlates';
    
    const plateGeometry = this.getOptimizedGeometry(
        'inspectionPlate',
        () => new THREE.BoxGeometry(0.4, 0.4, 0.03)
    );
    
    // Side inspection plates
    const leftPlate = new THREE.Mesh(plateGeometry, this.materials.get('engineBlock'));
    leftPlate.name = 'LeftInspectionPlate';
    leftPlate.position.set(-2.015, 0, 0);
    leftPlate.rotation.y = Math.PI / 2;
    group.add(leftPlate);
    
    const rightPlate = new THREE.Mesh(plateGeometry, this.materials.get('engineBlock'));
    rightPlate.name = 'RightInspectionPlate';
    rightPlate.position.set(2.015, 0, 0);
    rightPlate.rotation.y = -Math.PI / 2;
    group.add(rightPlate);
    
    // Add plate bolts
    const boltGeometry = this.getOptimizedGeometry(
        'inspectionPlateBolt',
        () => new THREE.CylinderGeometry(0.015, 0.015, 0.04, 8)
    );
    
    [-0.15, 0.15].forEach(offsetY => {
        [-0.15, 0.15].forEach(offsetZ => {
            // Left plate bolts
            const leftBolt = new THREE.Mesh(boltGeometry, this.materials.get('crankshaft'));
            leftBolt.position.set(-2.035, offsetY, offsetZ);
            leftBolt.rotation.z = Math.PI / 2;
            group.add(leftBolt);
            
            // Right plate bolts
            const rightBolt = new THREE.Mesh(boltGeometry, this.materials.get('crankshaft'));
            rightBolt.position.set(2.035, offsetY, offsetZ);
            rightBolt.rotation.z = Math.PI / 2;
            group.add(rightBolt);
        });
    });
    
    this.config.three.staticComponents.add(group);
    this.components.set('inspectionPlates', group);
}

createSafetyDecals() {
    const group = new THREE.Group();
    group.name = 'SafetyDecals';
    
    // Warning decal
    const decalGeometry = this.getOptimizedGeometry(
        'safetyDecal',
        () => new THREE.BoxGeometry(0.3, 0.2, 0.001)
    );
    
    const warningDecal = new THREE.Mesh(decalGeometry, this.materials.get('fuel'));
    warningDecal.name = 'WarningDecal';
    warningDecal.position.set(0.5, 2, 2.001);
    group.add(warningDecal);
    
    // Hot surface warning
    const hotSurfaceDecal = new THREE.Mesh(decalGeometry, this.materials.get('hotMaterial'));
    hotSurfaceDecal.name = 'HotSurfaceDecal';
    hotSurfaceDecal.position.set(0, 3, -2.001);
    group.add(hotSurfaceDecal);
    
    // Maintenance decal
    const maintenanceDecal = new THREE.Mesh(decalGeometry, this.materials.get('air'));
    maintenanceDecal.name = 'MaintenanceDecal';
    maintenanceDecal.position.set(-0.5, 1.5, 2.001);
    group.add(maintenanceDecal);
    
    this.config.three.staticComponents.add(group);
    this.components.set('safetyDecals', group);
}