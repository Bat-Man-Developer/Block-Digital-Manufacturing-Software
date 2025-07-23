// Intake & Exhaust
createExhaustManifold() {
    const manifoldGroup = new THREE.Group();
    manifoldGroup.name = 'ExhaustManifold';
    const { cylinders, engineType } = this.config.engineParameters;
    
    // Create exhaust ports for each cylinder
    const portGeometry = this.getOptimizedGeometry(
        'exhaustPort',
        () => new THREE.CylinderGeometry(0.28, 0.32, 1.8, 12, 1)
    );
    
    for (let i = 0; i < cylinders; i++) {
        const port = new THREE.Mesh(portGeometry, this.materials.get('hotMaterial'));
        port.name = `ExhaustPort_${i + 1}`;
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        
        if (engineType.startsWith('v')) {
            const bankAngle = this.calculateBankAngle(i);
            port.position.set(position.x, 3.2 + position.y, -1.6 + position.z);
            port.rotation.x = Math.PI / 4 + bankAngle;
        } else {
            port.position.set(position.x, 3.2, -1.6);
            port.rotation.x = Math.PI / 4;
        }
        
        manifoldGroup.add(port);
    }
    
    // Main exhaust header
    const headerLength = cylinders > 4 ? cylinders * 1.1 : 4.5;
    const headerGeometry = this.getOptimizedGeometry(
        `exhaustHeader_${cylinders}`,
        () => new THREE.BoxGeometry(headerLength, 0.8, 1.2, 1, 1, 1)
    );
    const header = new THREE.Mesh(headerGeometry, this.materials.get('hotMaterial'));
    header.name = 'ExhaustHeader';
    header.position.set(0, 2.8, -2.8);
    manifoldGroup.add(header);
    
    // Exhaust collector
    const collectorGeometry = this.getOptimizedGeometry(
        'exhaustCollector',
        () => new THREE.ConeGeometry(0.5, 2.5, 12, 1)
    );
    const collector = new THREE.Mesh(collectorGeometry, this.materials.get('hotMaterial'));
    collector.name = 'ExhaustCollector';
    collector.position.set(headerLength/2 + 1, 2.8, -3.5);
    collector.rotation.z = Math.PI / 2;
    manifoldGroup.add(collector);
    
    // Heat shield
    const shieldGeometry = this.getOptimizedGeometry(
        'exhaustHeatShield',
        () => new THREE.BoxGeometry(headerLength + 0.5, 1.2, 1.6, 1, 1, 1)
    );
    const heatShield = new THREE.Mesh(shieldGeometry, this.materials.get('alternator'));
    heatShield.name = 'ExhaustHeatShield';
    heatShield.position.set(0, 3.2, -2.8);
    heatShield.material = heatShield.material.clone();
    heatShield.material.transparent = true;
    heatShield.material.opacity = 0.7;
    manifoldGroup.add(heatShield);
    
    // Exhaust flanges
    for (let i = 0; i < cylinders; i++) {
        const flangeGeometry = this.getOptimizedGeometry(
            'exhaustFlange',
            () => new THREE.CylinderGeometry(0.35, 0.35, 0.15, 12, 1)
        );
        const flange = new THREE.Mesh(flangeGeometry, this.materials.get('engineBlock'));
        flange.name = `ExhaustFlange_${i + 1}`;
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        flange.position.set(position.x, 3.8, -1.2);
        manifoldGroup.add(flange);
    }
    
    this.addComponentLabel(manifoldGroup, 'Exhaust Manifold', [0, 1, -4.5]);
    this.components.set('exhaustManifold', manifoldGroup);
    this.config.three.staticComponents.add(manifoldGroup);
}

createIntakeManifold() {
    const manifoldGroup = new THREE.Group();
    manifoldGroup.name = 'IntakeManifold';
    const { cylinders, engineType, turbocharging } = this.config.engineParameters;
    
    // Main plenum chamber
    const plenumWidth = cylinders > 4 ? cylinders * 1.1 : 4.5;
    const plenumGeometry = this.getOptimizedGeometry(
        `intakePlenum_${cylinders}`,
        () => new THREE.BoxGeometry(plenumWidth, 1.2, 2.2, 1, 1, 1)
    );
    const plenum = new THREE.Mesh(plenumGeometry, this.materials.get('engineBlock'));
    plenum.name = 'IntakePlenum';
    plenum.position.set(0, 4.8, 2.0);
    manifoldGroup.add(plenum);
    
    // Individual intake runners
    const runnerGeometry = this.getOptimizedGeometry(
        'intakeRunner',
        () => new THREE.CylinderGeometry(0.25, 0.28, 2.2, 12, 1)
    );
    
    for (let i = 0; i < cylinders; i++) {
        const runner = new THREE.Mesh(runnerGeometry, this.materials.get('engineBlock'));
        runner.name = `IntakeRunner_${i + 1}`;
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        
        if (engineType.startsWith('v')) {
            const bankAngle = this.calculateBankAngle(i);
            runner.position.set(position.x, 3.8 + position.y, 1.4 + position.z);
            runner.rotation.x = -Math.PI / 5 + bankAngle;
        } else {
            runner.position.set(position.x, 3.8, 1.4);
            runner.rotation.x = -Math.PI / 5;
        }
        
        manifoldGroup.add(runner);
    }
    
    // Throttle body
    const throttleBodyGeom = this.getOptimizedGeometry(
        'throttleBody',
        () => new THREE.CylinderGeometry(0.32, 0.28, 1.0, 16, 1)
    );
    const throttleBody = new THREE.Mesh(throttleBodyGeom, this.materials.get('engineBlock'));
    throttleBody.name = 'ThrottleBody';
    throttleBody.position.set(0, 4.8, 3.2);
    throttleBody.rotation.x = Math.PI / 2;
    manifoldGroup.add(throttleBody);
    
    // Throttle plate
    const throttlePlateGeom = this.getOptimizedGeometry(
        'throttlePlate',
        () => new THREE.CylinderGeometry(0.25, 0.25, 0.03, 16, 1)
    );
    const throttlePlate = new THREE.Mesh(throttlePlateGeom, this.materials.get('alternator'));
    throttlePlate.name = 'ThrottlePlate';
    throttlePlate.position.set(0, 4.8, 3.2);
    throttlePlate.rotation.x = Math.PI / 2;
    throttlePlate.rotation.z = Math.PI / 6; // Partially open
    manifoldGroup.add(throttlePlate);
    
    // Air inlet (different for turbo vs naturally aspirated)
    const inletGeometry = this.getOptimizedGeometry(
        'airInlet',
        () => new THREE.CylinderGeometry(0.35, 0.35, 1.5, 12, 1)
    );
    const airInlet = new THREE.Mesh(inletGeometry, this.materials.get('pipe'));
    airInlet.name = 'AirInlet';
    
    if (turbocharging !== 'naturally_aspirated') {
        airInlet.position.set(-1.5, 4.8, 3.8);
        airInlet.rotation.y = Math.PI / 4;
    } else {
        airInlet.position.set(0, 4.8, 4.2);
    }
    
    manifoldGroup.add(airInlet);
    
    // Intake manifold bolts
    for (let i = 0; i < cylinders + 2; i++) {
        const boltGeometry = this.getOptimizedGeometry(
            'intakeBolt',
            () => new THREE.CylinderGeometry(0.05, 0.05, 0.3, 8, 1)
        );
        const bolt = new THREE.Mesh(boltGeometry, this.materials.get('alternator'));
        bolt.name = `IntakeManifoldBolt_${i + 1}`;
        
        const x = (i - cylinders/2) * (plenumWidth / (cylinders + 1));
        bolt.position.set(x, 4.2, 0.8);
        manifoldGroup.add(bolt);
    }
    
    this.addComponentLabel(manifoldGroup, 'Intake Manifold', [0, 2, 4.5]);
    this.components.set('intakeManifold', manifoldGroup);
    this.config.three.staticComponents.add(manifoldGroup);
}

createTurbocharger() {
    if (this.config.engineParameters.turbocharging === 'naturally_aspirated') return;
    
    const turboGroup = new THREE.Group();
    turboGroup.name = 'Turbocharger';
    
    // Main turbo housing (snail shell design)
    const housingGeometry = this.getOptimizedGeometry(
        'turboHousing',
        () => {
            const shape = new THREE.Shape();
            shape.absarc(0, 0, 1.2, 0, Math.PI * 2, false);
            const extrudeSettings = { depth: 1.5, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.05 };
            return new THREE.ExtrudeGeometry(shape, extrudeSettings);
        }
    );
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('turbocharger'));
    housing.name = 'TurboHousing';
    housing.rotation.y = Math.PI / 2;
    turboGroup.add(housing);
    
    // Center bearing housing
    const bearingHousingGeom = this.getOptimizedGeometry(
        'turboBearingHousing',
        () => new THREE.CylinderGeometry(0.4, 0.4, 1.8, 16, 1)
    );
    const bearingHousing = new THREE.Mesh(bearingHousingGeom, this.materials.get('turbocharger'));
    bearingHousing.name = 'TurboBearingHousing';
    bearingHousing.rotation.z = Math.PI / 2;
    turboGroup.add(bearingHousing);
    
    // Turbine wheel (hot side)
    const turbineWheelGeom = this.getOptimizedGeometry(
        'turbineWheel',
        () => {
            const geometry = new THREE.CylinderGeometry(0.45, 0.35, 0.2, 12, 1);
            // Add turbine blades
            for (let i = 0; i < 12; i++) {
                const bladeGeom = new THREE.BoxGeometry(0.1, 0.3, 0.05);
                const bladeMesh = new THREE.Mesh(bladeGeom);
                const angle = (i / 12) * Math.PI * 2;
                bladeMesh.position.set(Math.cos(angle) * 0.35, 0, Math.sin(angle) * 0.35);
                bladeMesh.rotation.y = angle + Math.PI / 2;
                bladeMesh.updateMatrix();
                geometry.merge(bladeMesh.geometry, bladeMesh.matrix);
            }
            return geometry;
        }
    );
    const turbineWheel = new THREE.Mesh(turbineWheelGeom, this.materials.get('hotMaterial'));
    turbineWheel.name = 'TurbineWheel';
    turbineWheel.position.x = 0.8;
    turbineWheel.rotation.z = Math.PI / 2;
    turboGroup.add(turbineWheel);
    
    // Compressor wheel (cold side)
    const compressorWheelGeom = this.getOptimizedGeometry(
        'compressorWheel',
        () => {
            const geometry = new THREE.CylinderGeometry(0.5, 0.3, 0.25, 16, 1);
            // Add compressor blades
            for (let i = 0; i < 16; i++) {
                const bladeGeom = new THREE.BoxGeometry(0.08, 0.25, 0.03);
                const bladeMesh = new THREE.Mesh(bladeGeom);
                const angle = (i / 16) * Math.PI * 2;
                bladeMesh.position.set(Math.cos(angle) * 0.35, 0, Math.sin(angle) * 0.35);
                bladeMesh.rotation.y = angle + Math.PI / 3;
                bladeMesh.updateMatrix();
                geometry.merge(bladeMesh.geometry, bladeMesh.matrix);
            }
            return geometry;
        }
    );
    const compressorWheel = new THREE.Mesh(compressorWheelGeom, this.materials.get('crankshaft'));
    compressorWheel.name = 'CompressorWheel';
    compressorWheel.position.x = -0.8;
    compressorWheel.rotation.z = Math.PI / 2;
    turboGroup.add(compressorWheel);
    
    // Turbo shaft
    const shaftGeometry = this.getOptimizedGeometry(
        'turboShaft',
        () => new THREE.CylinderGeometry(0.08, 0.08, 2.2, 12, 1)
    );
    const shaft = new THREE.Mesh(shaftGeometry, this.materials.get('crankshaft'));
    shaft.name = 'TurboShaft';
    shaft.rotation.z = Math.PI / 2;
    turboGroup.add(shaft);
    
    // Wastegate
    const wastegateGeom = this.getOptimizedGeometry(
        'wastegate',
        () => new THREE.BoxGeometry(0.4, 0.3, 0.25, 1, 1, 1)
    );
    const wastegate = new THREE.Mesh(wastegateGeom, this.materials.get('turbocharger'));
    wastegate.name = 'Wastegate';
    wastegate.position.set(0.6, 1.0, 0.4);
    turboGroup.add(wastegate);
    
    // Wastegate actuator
    const actuatorGeom = this.getOptimizedGeometry(
        'wastegateActuator',
        () => new THREE.CylinderGeometry(0.15, 0.15, 0.8, 12, 1)
    );
    const actuator = new THREE.Mesh(actuatorGeom, this.materials.get('alternator'));
    actuator.name = 'WastegateActuator';
    actuator.position.set(0.6, 1.5, 0.4);
    turboGroup.add(actuator);
    
    // Oil feed line
    const oilFeedGeom = this.getOptimizedGeometry(
        'turboOilFeed',
        () => new THREE.CylinderGeometry(0.05, 0.05, 1.2, 8, 1)
    );
    const oilFeed = new THREE.Mesh(oilFeedGeom, this.materials.get('pipe'));
    oilFeed.name = 'TurboOilFeed';
    oilFeed.position.set(0, 0.8, -0.6);
    oilFeed.rotation.x = Math.PI / 4;
    turboGroup.add(oilFeed);
    
    // Oil drain line
    const oilDrain = oilFeed.clone();
    oilDrain.name = 'TurboOilDrain';
    oilDrain.position.set(0, -0.8, -0.6);
    oilDrain.rotation.x = -Math.PI / 4;
    turboGroup.add(oilDrain);
    
    // Position turbocharger relative to exhaust manifold
    turboGroup.position.set(3.5, 1.8, -3.2);
    turboGroup.rotation.y = Math.PI / 6;
    
    this.addComponentLabel(turboGroup, 'Turbocharger', [0, 2.2, 0]);
    this.components.set('turbocharger', turboGroup);
    this.config.three.staticComponents.add(turboGroup);
}

createIntercooler() {
    if (this.config.engineParameters.turbocharging === 'naturally_aspirated') return;
    
    const intercoolerGroup = new THREE.Group();
    intercoolerGroup.name = 'Intercooler';
    
    // Main intercooler core
    const coreGeometry = this.getOptimizedGeometry(
        'intercoolerCore',
        () => new THREE.BoxGeometry(4.0, 1.8, 0.8, 1, 1, 1)
    );
    const core = new THREE.Mesh(coreGeometry, this.materials.get('radiator'));
    core.name = 'IntercoolerCore';
    intercoolerGroup.add(core);
    
    // End tanks
    const tankGeometry = this.getOptimizedGeometry(
        'intercoolerTank',
        () => new THREE.BoxGeometry(0.3, 1.8, 0.8, 1, 1, 1)
    );
    
    const leftTank = new THREE.Mesh(tankGeometry, this.materials.get('engineBlock'));
    leftTank.name = 'IntercoolerLeftTank';
    leftTank.position.x = -2.15;
    intercoolerGroup.add(leftTank);
    
    const rightTank = new THREE.Mesh(tankGeometry, this.materials.get('engineBlock'));
    rightTank.name = 'IntercoolerRightTank';
    rightTank.position.x = 2.15;
    intercoolerGroup.add(rightTank);
    
    // Inlet and outlet pipes
    const pipeGeometry = this.getOptimizedGeometry(
        'intercoolerPipe',
        () => new THREE.CylinderGeometry(0.2, 0.2, 1.5, 12, 1)
    );
    
    const inletPipe = new THREE.Mesh(pipeGeometry, this.materials.get('pipe'));
    inletPipe.name = 'IntercoolerInlet';
    inletPipe.position.set(-2.15, 0, 1.2);
    inletPipe.rotation.x = Math.PI / 2;
    intercoolerGroup.add(inletPipe);
    
    const outletPipe = new THREE.Mesh(pipeGeometry, this.materials.get('pipe'));
    outletPipe.name = 'IntercoolerOutlet';
    outletPipe.position.set(2.15, 0, 1.2);
    outletPipe.rotation.x = Math.PI / 2;
    intercoolerGroup.add(outletPipe);
    
    // Mounting brackets
    for (let i = 0; i < 4; i++) {
        const bracketGeom = this.getOptimizedGeometry(
            'intercoolerBracket',
            () => new THREE.BoxGeometry(0.15, 0.3, 0.15, 1, 1, 1)
        );
        const bracket = new THREE.Mesh(bracketGeom, this.materials.get('alternator'));
        bracket.name = `IntercoolerBracket_${i + 1}`;
        
        const x = i < 2 ? -1.8 : 1.8;
        const z = i % 2 === 0 ? -0.5 : 0.5;
        bracket.position.set(x, -1.2, z);
        intercoolerGroup.add(bracket);
    }
    
    // Position in front of radiator
    intercoolerGroup.position.set(0, 1.5, 6.5);
    
    this.addComponentLabel(intercoolerGroup, 'Intercooler', [0, 2.5, 0]);
    this.components.set('intercooler', intercoolerGroup);
    this.config.three.staticComponents.add(intercoolerGroup);
}

createAirFilter() {
    const airFilterGroup = new THREE.Group();
    airFilterGroup.name = 'AirFilter';
    
    // Air filter housing
    const housingGeometry = this.getOptimizedGeometry(
        'airFilterHousing',
        () => new THREE.BoxGeometry(2.5, 1.5, 2.0, 1, 1, 1)
    );
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('engineBlock'));
    housing.name = 'AirFilterHousing';
    airFilterGroup.add(housing);
    
    // Filter element
    const filterGeometry = this.getOptimizedGeometry(
        'airFilterElement',
        () => new THREE.BoxGeometry(2.2, 1.2, 1.7, 1, 1, 1)
    );
    const filter = new THREE.Mesh(filterGeometry, this.materials.get('airFilter'));
    filter.name = 'AirFilterElement';
    airFilterGroup.add(filter);
    
    // Housing cover
    const coverGeometry = this.getOptimizedGeometry(
        'airFilterCover',
        () => new THREE.BoxGeometry(2.6, 0.2, 2.1, 1, 1, 1)
    );
    const cover = new THREE.Mesh(coverGeometry, this.materials.get('engineBlock'));
    cover.name = 'AirFilterCover';
    cover.position.y = 0.85;
    airFilterGroup.add(cover);
    
    // Air intake tube
    const tubeGeometry = this.getOptimizedGeometry(
        'airIntakeTube',
        () => new THREE.CylinderGeometry(0.25, 0.25, 3.0, 12, 1)
    );
    const tube = new THREE.Mesh(tubeGeometry, this.materials.get('pipe'));
    tube.name = 'AirIntakeTube';
    tube.position.set(1.8, 0, 0);
    tube.rotation.z = Math.PI / 2;
    airFilterGroup.add(tube);
    
    // Pre-cleaner (for dusty environments)
    const precleanerGeometry = this.getOptimizedGeometry(
        'precleaner',
        () => new THREE.CylinderGeometry(0.35, 0.35, 0.8, 12, 1)
    );
    const precleaner = new THREE.Mesh(precleanerGeometry, this.materials.get('alternator'));
    precleaner.name = 'Precleaner';
    precleaner.position.set(-1.5, 0, 0);
    precleaner.rotation.z = Math.PI / 2;
    airFilterGroup.add(precleaner);
    
    // Air restriction indicator
    const indicatorGeometry = this.getOptimizedGeometry(
        'airRestrictionIndicator',
        () => new THREE.CylinderGeometry(0.08, 0.08, 0.3, 8, 1)
    );
    const indicator = new THREE.Mesh(indicatorGeometry, this.materials.get('sparkPlug'));
    indicator.name = 'AirRestrictionIndicator';
    indicator.position.set(0, 0.9, 1.2);
    airFilterGroup.add(indicator);
    
    // Clamps
    for (let i = 0; i < 6; i++) {
        const clampGeometry = this.getOptimizedGeometry(
            'airFilterClamp',
            () => new THREE.BoxGeometry(0.1, 0.1, 0.3, 1, 1, 1)
        );
        const clamp = new THREE.Mesh(clampGeometry, this.materials.get('alternator'));
        clamp.name = `AirFilterClamp_${i + 1}`;
        
        const angle = (i / 6) * Math.PI * 2;
        clamp.position.set(
            Math.cos(angle) * 1.3,
            0,
            Math.sin(angle) * 1.05
        );
        airFilterGroup.add(clamp);
    }
    
    // Position relative to intake system
    airFilterGroup.position.set(-4.5, 5.5, 2.0);
    
    this.addComponentLabel(airFilterGroup, 'Air Filter', [0, 2, 0]);
    this.components.set('airFilter', airFilterGroup);
    this.config.three.staticComponents.add(airFilterGroup);
}

createExhaustPipe() {
    const exhaustPipeGroup = new THREE.Group();
    exhaustPipeGroup.name = 'ExhaustPipe';
    
    // Main exhaust pipe sections
    const pipeGeometry = this.getOptimizedGeometry(
        'exhaustPipeSection',
        () => new THREE.CylinderGeometry(0.3, 0.3, 3.0, 12, 1)
    );
    
    // First section from manifold
    const pipe1 = new THREE.Mesh(pipeGeometry, this.materials.get('hotMaterial'));
    pipe1.name = 'ExhaustPipe_1';
    pipe1.position.set(5.5, 2.8, -3.5);
    pipe1.rotation.z = Math.PI / 2;
    exhaustPipeGroup.add(pipe1);
    
    // Second section (vertical drop)
    const pipe2 = new THREE.Mesh(pipeGeometry, this.materials.get('pipe'));
    pipe2.name = 'ExhaustPipe_2';
    pipe2.position.set(7, 1.0, -3.5);
    exhaustPipeGroup.add(pipe2);
    
    // Third section (horizontal run)
    const pipe3 = new THREE.Mesh(pipeGeometry, this.materials.get('pipe'));
    pipe3.name = 'ExhaustPipe_3';
    pipe3.position.set(8.5, -0.5, -3.5);
    pipe3.rotation.z = Math.PI / 2;
    exhaustPipeGroup.add(pipe3);
    
    // Exhaust stack (vertical)
    const stackGeometry = this.getOptimizedGeometry(
        'exhaustStack',
        () => new THREE.CylinderGeometry(0.25, 0.25, 6.0, 12, 1)
    );
    const stack = new THREE.Mesh(stackGeometry, this.materials.get('pipe'));
    stack.name = 'ExhaustStack';
    stack.position.set(10, 2.5, -3.5);
    exhaustPipeGroup.add(stack);
    
    // Rain cap
    const rainCapGeometry = this.getOptimizedGeometry(
        'exhaustRainCap',
        () => new THREE.ConeGeometry(0.4, 0.3, 12, 1)
    );
    const rainCap = new THREE.Mesh(rainCapGeometry, this.materials.get('pipe'));
    rainCap.name = 'ExhaustRainCap';
    rainCap.position.set(10, 5.8, -3.5);
    exhaustPipeGroup.add(rainCap);
    
    // Exhaust clamps/flanges
    for (let i = 0; i < 3; i++) {
        const clampGeometry = this.getOptimizedGeometry(
            'exhaustClamp',
            () => new THREE.TorusGeometry(0.35, 0.05, 8, 16)
        );
        const clamp = new THREE.Mesh(clampGeometry, this.materials.get('alternator'));
        clamp.name = `ExhaustClamp_${i + 1}`;
        
        switch(i) {
            case 0:
                clamp.position.set(7, 2.8, -3.5);
                clamp.rotation.x = Math.PI / 2;
                break;
            case 1:
                clamp.position.set(7, 0, -3.5);
                break;
            case 2:
                clamp.position.set(10, 0, -3.5);
                break;
        }
        exhaustPipeGroup.add(clamp);
    }
    
    // Heat shields
    const shieldGeometry = this.getOptimizedGeometry(
        'exhaustHeatShield',
        () => new THREE.CylinderGeometry(0.4, 0.4, 2.8, 12, 1, true)
    );
    const heatShield = new THREE.Mesh(shieldGeometry, this.materials.get('alternator'));
    heatShield.name = 'ExhaustHeatShield';
    heatShield.position.set(7, 1.0, -3.5);
    heatShield.material = heatShield.material.clone();
    heatShield.material.transparent = true;
    heatShield.material.opacity = 0.6;
    exhaustPipeGroup.add(heatShield);
    
    this.addComponentLabel(exhaustPipeGroup, 'Exhaust System', [8, 6.5, -3.5]);
    this.components.set('exhaustPipe', exhaustPipeGroup);
    this.config.three.staticComponents.add(exhaustPipeGroup);
}

createMuffler() {
    const mufflerGroup = new THREE.Group();
    mufflerGroup.name = 'Muffler';
    
    // Main muffler body
    const bodyGeometry = this.getOptimizedGeometry(
        'mufflerBody',
        () => new THREE.CylinderGeometry(0.8, 0.8, 2.5, 16, 1)
    );
    const body = new THREE.Mesh(bodyGeometry, this.materials.get('pipe'));
    body.name = 'MufflerBody';
    body.rotation.z = Math.PI / 2;
    mufflerGroup.add(body);
    
    // Internal baffles (visible through cutaway)
    for (let i = 0; i < 3; i++) {
        const baffleGeometry = this.getOptimizedGeometry(
            'mufflerBaffle',
            () => new THREE.CylinderGeometry(0.7, 0.7, 0.05, 16, 1)
        );
        const baffle = new THREE.Mesh(baffleGeometry, this.materials.get('alternator'));
        baffle.name = `MufflerBaffle_${i + 1}`;
        baffle.position.x = (i - 1) * 0.6;
        baffle.rotation.z = Math.PI / 2;
        mufflerGroup.add(baffle);
    }
    
    // Inlet pipe
    const inletGeometry = this.getOptimizedGeometry(
        'mufflerInlet',
        () => new THREE.CylinderGeometry(0.25, 0.25, 0.8, 12, 1)
    );
    const inlet = new THREE.Mesh(inletGeometry, this.materials.get('pipe'));
    inlet.name = 'MufflerInlet';
    inlet.position.set(-1.5, 0, 0);
    inlet.rotation.z = Math.PI / 2;
    mufflerGroup.add(inlet);
    
    // Outlet pipe
    const outlet = inlet.clone();
    outlet.name = 'MufflerOutlet';
    outlet.position.set(1.5, 0, 0);
    mufflerGroup.add(outlet);
    
    // Mounting brackets
    for (let i = 0; i < 2; i++) {
        const bracketGeometry = this.getOptimizedGeometry(
            'mufflerBracket',
            () => new THREE.BoxGeometry(0.2, 0.4, 0.2, 1, 1, 1)
        );
        const bracket = new THREE.Mesh(bracketGeometry, this.materials.get('alternator'));
        bracket.name = `MufflerBracket_${i + 1}`;
        bracket.position.set((i - 0.5) * 2, -1.0, 0);
        mufflerGroup.add(bracket);
    }
    
    // Position in exhaust system
    mufflerGroup.position.set(8.5, -0.5, -3.5);
    
    this.addComponentLabel(mufflerGroup, 'Muffler', [0, 1.5, 0]);
    this.components.set('muffler', mufflerGroup);
    this.config.three.staticComponents.add(mufflerGroup);
}