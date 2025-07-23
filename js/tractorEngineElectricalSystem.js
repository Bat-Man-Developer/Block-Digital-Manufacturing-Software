// Electrical System
createAlternator() {
    const alternatorGroup = new THREE.Group();
    alternatorGroup.name = 'Alternator';
    
    // Main alternator housing
    const housingGeometry = this.getOptimizedGeometry(
        'alternatorHousing',
        () => new THREE.CylinderGeometry(0.8, 0.75, 1.6, 16, 1)
    );
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('alternator'));
    housing.position.set(3.5, 1.5, 0);
    housing.rotation.z = Math.PI / 2;
    this.setupShadows(housing);
    
    // Alternator stator with windings detail
    const statorGeometry = this.getOptimizedGeometry(
        'stator',
        () => new THREE.CylinderGeometry(0.6, 0.6, 1.4, 24, 1)
    );
    const stator = new THREE.Mesh(statorGeometry, this.materials.get('wire'));
    stator.position.set(0, 0, 0);
    housing.add(stator);
    
    // Rotor assembly
    const rotorGeometry = this.getOptimizedGeometry(
        'rotor',
        () => new THREE.CylinderGeometry(0.45, 0.45, 1.2, 12, 1)
    );
    const rotor = new THREE.Mesh(rotorGeometry, this.materials.get('crankshaft'));
    rotor.position.set(0, 0, 0);
    housing.add(rotor);
    
    // Alternator pulley with V-belt grooves
    const pulleyGeometry = this.getOptimizedGeometry(
        'alternatorPulley',
        () => new THREE.CylinderGeometry(0.5, 0.5, 0.2, 20, 1)
    );
    const pulley = new THREE.Mesh(pulleyGeometry, this.materials.get('crankshaft'));
    pulley.name = 'AlternatorPulley';
    pulley.position.set(0.9, 0, 0);
    pulley.rotation.z = Math.PI / 2;
    
    // Add V-belt grooves
    for (let i = 0; i < 4; i++) {
        const groove = new THREE.Mesh(
            new THREE.TorusGeometry(0.42 - i * 0.04, 0.015, 4, 16),
            this.materials.get('crankshaft')
        );
        groove.rotation.x = Math.PI / 2;
        groove.position.z = (i - 1.5) * 0.03;
        pulley.add(groove);
    }
    
    housing.add(pulley);
    alternatorGroup.add(housing);
    
    this.addComponentLabel(alternatorGroup, 'Alternator', [0, 1.8, 0]);
    this.components.set('alternator', alternatorGroup);
    this.config.three.staticComponents.add(alternatorGroup);
}

createAlternatorBrushes() {
    const brushGroup = new THREE.Group();
    brushGroup.name = 'AlternatorBrushes';
    
    // Brush assembly housing
    const brushHousingGeom = this.getOptimizedGeometry(
        'brushHousing',
        () => new THREE.BoxGeometry(0.3, 0.2, 0.4)
    );
    const brushHousing = new THREE.Mesh(brushHousingGeom, this.materials.get('alternator'));
    brushHousing.position.set(3.5, 1.5, 0.9);
    this.setupShadows(brushHousing);
    
    // Individual brushes
    const brushGeometry = this.getOptimizedGeometry(
        'brush',
        () => new THREE.BoxGeometry(0.04, 0.04, 0.15)
    );
    
    for (let i = 0; i < 2; i++) {
        const brush = new THREE.Mesh(brushGeometry, this.materials.get('wire'));
        brush.position.set((i - 0.5) * 0.1, 0, -0.1);
        brushHousing.add(brush);
        
        // Brush springs
        const springGeom = new THREE.CylinderGeometry(0.01, 0.01, 0.08, 6);
        const spring = new THREE.Mesh(springGeom, this.materials.get('crankshaft'));
        spring.position.set((i - 0.5) * 0.1, 0.06, -0.05);
        brushHousing.add(spring);
    }
    
    brushGroup.add(brushHousing);
    this.components.set('alternatorBrushes', brushGroup);
    this.config.three.staticComponents.add(brushGroup);
}

createAlternatorSlipRings() {
    const slipRingGroup = new THREE.Group();
    slipRingGroup.name = 'AlternatorSlipRings';
    
    // Slip ring assembly
    for (let i = 0; i < 2; i++) {
        const ringGeometry = this.getOptimizedGeometry(
            `slipRing${i}`,
            () => new THREE.TorusGeometry(0.35, 0.02, 8, 16)
        );
        const ring = new THREE.Mesh(ringGeometry, this.materials.get('alternator'));
        ring.position.set(3.5, 1.5, 0.3 + i * 0.1);
        ring.rotation.x = Math.PI / 2;
        this.setupShadows(ring);
        slipRingGroup.add(ring);
    }
    
    this.components.set('alternatorSlipRings', slipRingGroup);
    this.config.three.staticComponents.add(slipRingGroup);
}

createStarterMotor() {
    const starterGroup = new THREE.Group();
    starterGroup.name = 'StarterMotor';
    
    // Main starter housing
    const housingGeometry = this.getOptimizedGeometry(
        'starterHousing',
        () => new THREE.CylinderGeometry(0.6, 0.6, 2.2, 12, 1)
    );
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('alternator'));
    housing.position.set(-2.5, -1, 1.5);
    housing.rotation.z = Math.PI / 6;
    this.setupShadows(housing);
    
    // Starter armature
    const armatureGeometry = this.getOptimizedGeometry(
        'armature',
        () => new THREE.CylinderGeometry(0.4, 0.4, 1.8, 16, 1)
    );
    const armature = new THREE.Mesh(armatureGeometry, this.materials.get('wire'));
    armature.position.set(0, 0, 0);
    housing.add(armature);
    
    // Commutator
    const commutatorGeom = this.getOptimizedGeometry(
        'commutator',
        () => new THREE.CylinderGeometry(0.3, 0.3, 0.3, 16, 1)
    );
    const commutator = new THREE.Mesh(commutatorGeom, this.materials.get('alternator'));
    commutator.position.set(0, 0, -0.8);
    housing.add(commutator);
    
    starterGroup.add(housing);
    
    this.addComponentLabel(starterGroup, 'Starter Motor', [0, 1.2, 0]);
    this.components.set('starterMotor', starterGroup);
    this.config.three.staticComponents.add(starterGroup);
}

createStarterSolenoid() {
    const solenoidGroup = new THREE.Group();
    solenoidGroup.name = 'StarterSolenoid';
    
    // Solenoid housing
    const solenoidGeometry = this.getOptimizedGeometry(
        'solenoidHousing',
        () => new THREE.CylinderGeometry(0.25, 0.25, 0.8, 12, 1)
    );
    const solenoid = new THREE.Mesh(solenoidGeometry, this.materials.get('alternator'));
    solenoid.position.set(-2.5, -0.2, 2.5);
    this.setupShadows(solenoid);
    
    // Solenoid terminals
    const terminalGeom = this.getOptimizedGeometry(
        'solenoidTerminal',
        () => new THREE.CylinderGeometry(0.05, 0.05, 0.1, 8, 1)
    );
    
    for (let i = 0; i < 2; i++) {
        const terminal = new THREE.Mesh(terminalGeom, this.materials.get('alternator'));
        terminal.position.set((i - 0.5) * 0.2, 0.5, 0);
        solenoid.add(terminal);
    }
    
    solenoidGroup.add(solenoid);
    this.components.set('starterSolenoid', solenoidGroup);
    this.config.three.staticComponents.add(solenoidGroup);
}

createBendixDrive() {
    const bendixGroup = new THREE.Group();
    bendixGroup.name = 'BendixDrive';
    
    // Drive gear
    const gearGeometry = this.getOptimizedGeometry(
        'bendixGear',
        () => new THREE.CylinderGeometry(0.2, 0.2, 0.3, 16, 1)
    );
    const gear = new THREE.Mesh(gearGeometry, this.materials.get('crankshaft'));
    gear.position.set(-2.5, -1, 0.5);
    this.setupShadows(gear);
    
    // Add gear teeth
    for (let i = 0; i < 12; i++) {
        const toothGeom = new THREE.BoxGeometry(0.02, 0.02, 0.3);
        const tooth = new THREE.Mesh(toothGeom, this.materials.get('crankshaft'));
        const angle = (i / 12) * Math.PI * 2;
        tooth.position.set(Math.cos(angle) * 0.21, Math.sin(angle) * 0.21, 0);
        gear.add(tooth);
    }
    
    // Drive shaft
    const shaftGeometry = this.getOptimizedGeometry(
        'bendixShaft',
        () => new THREE.CylinderGeometry(0.08, 0.08, 1.0, 8, 1)
    );
    const shaft = new THREE.Mesh(shaftGeometry, this.materials.get('crankshaft'));
    shaft.position.set(0, 0, -0.7);
    gear.add(shaft);
    
    bendixGroup.add(gear);
    this.components.set('bendixDrive', bendixGroup);
    this.config.three.staticComponents.add(bendixGroup);
}

createBattery() {
    const batteryGroup = new THREE.Group();
    batteryGroup.name = 'Battery';
    
    // Main battery case
    const caseGeometry = this.getOptimizedGeometry(
        'batteryCase',
        () => new THREE.BoxGeometry(1.5, 0.8, 2.2)
    );
    const batteryCase = new THREE.Mesh(caseGeometry, this.materials.get('alternator'));
    batteryCase.position.set(5, 0.5, 2);
    this.setupShadows(batteryCase);
    
    // Battery terminals
    const terminalGeometry = this.getOptimizedGeometry(
        'batteryTerminal',
        () => new THREE.CylinderGeometry(0.08, 0.08, 0.15, 8, 1)
    );
    
    // Positive terminal
    const posTerminal = new THREE.Mesh(terminalGeometry, this.materials.get('alternator'));
    posTerminal.position.set(-0.5, 0.55, 0.8);
    batteryCase.add(posTerminal);
    
    // Negative terminal
    const negTerminal = new THREE.Mesh(terminalGeometry, this.materials.get('alternator'));
    negTerminal.position.set(0.5, 0.55, 0.8);
    batteryCase.add(negTerminal);
    
    // Battery cells (visual indication)
    for (let i = 0; i < 6; i++) {
        const cellGeom = new THREE.BoxGeometry(0.2, 0.15, 0.3);
        const cell = new THREE.Mesh(cellGeom, this.materials.get('wire'));
        cell.position.set((i - 2.5) * 0.25, 0.3, 0);
        batteryCase.add(cell);
    }
    
    batteryGroup.add(batteryCase);
    
    this.addComponentLabel(batteryGroup, 'Battery', [0, 1.2, 0]);
    this.components.set('battery', batteryGroup);
    this.config.three.staticComponents.add(batteryGroup);
}

createBatteryCables() {
    const cableGroup = new THREE.Group();
    cableGroup.name = 'BatteryCables';
    
    // Main positive cable route: Battery -> Starter -> Alternator
    const positiveCablePoints = [
        [5, 1.05, 2.8],    // Battery positive terminal
        [4.5, 0.8, 2.5],   // Cable bend 1
        [3, 0.2, 2],       // Cable bend 2
        [-2.5, -0.2, 2.5], // Starter solenoid
        [-1, 0.5, 1.5],    // Cable bend 3
        [3.5, 1.5, 0.9]    // Alternator connection
    ];
    
    this.createCableRoute(cableGroup, positiveCablePoints, 'PositiveCable', 0.08, this.materials.get('wire'));
    
    // Negative cable route: Battery -> Engine ground
    const negativeCablePoints = [
        [5, 1.05, 1.2],    // Battery negative terminal
        [4, 0.5, 0.5],     // Cable bend
        [2, -1, 0],        // Engine block ground
        [0, -2, 0]         // Main ground point
    ];
    
    this.createCableRoute(cableGroup, negativeCablePoints, 'NegativeCable', 0.08, this.materials.get('wire'));
    
    this.components.set('batteryCables', cableGroup);
    this.config.three.staticComponents.add(cableGroup);
}

createCableRoute(group, points, name, radius, material) {
    for (let i = 0; i < points.length - 1; i++) {
        const start = points[i];
        const end = points[i + 1];
        const length = Math.sqrt(
            Math.pow(end[0] - start[0], 2) +
            Math.pow(end[1] - start[1], 2) +
            Math.pow(end[2] - start[2], 2)
        );
        
        const cableGeom = new THREE.CylinderGeometry(radius, radius, length, 8);
        const cable = new THREE.Mesh(cableGeom, material);
        cable.name = `${name}_Segment_${i + 1}`;
        
        // Position cable segment
        cable.position.set(
            (start[0] + end[0]) / 2,
            (start[1] + end[1]) / 2,
            (start[2] + end[2]) / 2
        );
        
        // Orient cable segment
        const direction = new THREE.Vector3(
            end[0] - start[0],
            end[1] - start[1],
            end[2] - start[2]
        ).normalize();
        
        cable.lookAt(
            cable.position.x + direction.x,
            cable.position.y + direction.y,
            cable.position.z + direction.z
        );
        
        this.setupShadows(cable);
        group.add(cable);
    }
}

createVoltageRegulator() {
    const regulatorGroup = new THREE.Group();
    regulatorGroup.name = 'VoltageRegulator';
    
    // Regulator housing
    const housingGeometry = this.getOptimizedGeometry(
        'regulatorHousing',
        () => new THREE.BoxGeometry(0.8, 0.3, 1.2)
    );
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('alternator'));
    housing.position.set(4.5, 2.5, 1);
    this.setupShadows(housing);
    
    // Heat sink fins
    for (let i = 0; i < 5; i++) {
        const finGeom = new THREE.BoxGeometry(0.7, 0.02, 0.1);
        const fin = new THREE.Mesh(finGeom, this.materials.get('alternator'));
        fin.position.set(0, 0.2, (i - 2) * 0.15);
        housing.add(fin);
    }
    
    // Connection terminals
    const terminalGeom = this.getOptimizedGeometry(
        'regulatorTerminal',
        () => new THREE.BoxGeometry(0.1, 0.05, 0.1)
    );
    
    for (let i = 0; i < 4; i++) {
        const terminal = new THREE.Mesh(terminalGeom, this.materials.get('wire'));
        terminal.position.set((i - 1.5) * 0.15, -0.2, 0.5);
        housing.add(terminal);
    }
    
    regulatorGroup.add(housing);
    
    this.addComponentLabel(regulatorGroup, 'Voltage Regulator', [0, 0.8, 0]);
    this.components.set('voltageRegulator', regulatorGroup);
    this.config.three.staticComponents.add(regulatorGroup);
}

createECU() {
    const ecuGroup = new THREE.Group();
    ecuGroup.name = 'ECU';
    
    // Main ECU housing
    const housingGeometry = this.getOptimizedGeometry(
        'ecuHousing',
        () => new THREE.BoxGeometry(2.0, 0.4, 2.5)
    );
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('alternator'));
    housing.position.set(4.5, 3.5, 1);
    this.setupShadows(housing);
    
    // ECU cover with cooling ribs
    const coverGeometry = this.getOptimizedGeometry(
        'ecuCover',
        () => new THREE.BoxGeometry(2.0, 0.05, 2.5)
    );
    const cover = new THREE.Mesh(coverGeometry, this.materials.get('crankshaft'));
    cover.position.set(0, 0.25, 0);
    housing.add(cover);
    
    // Cooling ribs
    for (let i = 0; i < 8; i++) {
        const ribGeom = new THREE.BoxGeometry(1.8, 0.03, 0.05);
        const rib = new THREE.Mesh(ribGeom, this.materials.get('crankshaft'));
        rib.position.set(0, 0.3, (i - 3.5) * 0.3);
        housing.add(rib);
    }
    
    // Main connector
    const connectorGeometry = this.getOptimizedGeometry(
        'ecuConnector',
        () => new THREE.BoxGeometry(0.6, 0.2, 1.8)
    );
    const connector = new THREE.Mesh(connectorGeometry, this.materials.get('wire'));
    connector.position.set(-1.3, 0, 0);
    housing.add(connector);
    
    // Individual pins in connector
    for (let i = 0; i < 24; i++) {
        const pinGeom = new THREE.CylinderGeometry(0.01, 0.01, 0.15, 6);
        const pin = new THREE.Mesh(pinGeom, this.materials.get('alternator'));
        pin.position.set(
            -0.1,
            0,
            ((i % 8) - 3.5) * 0.04
        );
        pin.position.y = Math.floor(i / 8) * 0.05 - 0.05;
        connector.add(pin);
    }
    
    ecuGroup.add(housing);
    
    this.addComponentLabel(ecuGroup, 'Engine Control Unit', [0, 1.0, 0]);
    this.components.set('ecu', ecuGroup);
    this.config.three.staticComponents.add(ecuGroup);
}

createWiringHarness() {
    const harnessGroup = new THREE.Group();
    harnessGroup.name = 'WiringHarness';
    
    const { cylinders, engineType } = this.config.engineParameters;
    
    // Main harness backbone
    const backboneGeometry = this.getOptimizedGeometry(
        'harnessBackbone',
        () => new THREE.CylinderGeometry(0.12, 0.12, 6, 12, 1)
    );
    const backbone = new THREE.Mesh(backboneGeometry, this.materials.get('wire'));
    backbone.position.set(0, 4, 0);
    backbone.rotation.z = Math.PI / 2;
    this.setupShadows(backbone);
    
    // Protective conduit
    const conduitGeometry = this.getOptimizedGeometry(
        'wireConduit',
        () => new THREE.CylinderGeometry(0.15, 0.15, 6, 16, 1)
    );
    const conduit = new THREE.Mesh(conduitGeometry, this.materials.get('alternator'));
    conduit.material.transparent = true;
    conduit.material.opacity = 0.7;
    conduit.position.set(0, 0, 0);
    backbone.add(conduit);
    
    harnessGroup.add(backbone);
    
    // Individual wire branches
    this.createWireBranches(harnessGroup, cylinders, engineType);
    
    this.addComponentLabel(harnessGroup, 'Main Wiring Harness', [0, 1.5, 0]);
    this.components.set('wiringHarness', harnessGroup);
    this.config.three.staticComponents.add(harnessGroup);
}

createWireBranches(group, cylinders, engineType) {
    // Spark plug wire branches
    for (let i = 0; i < cylinders; i++) {
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        
        // Wire from harness to ignition coil
        const wirePoints = [
            [0, 4, 0],                    // Harness connection
            [position.x * 0.5, 4.5, position.z * 0.5], // Intermediate point
            [position.x, 5.2, position.z] // Coil position
        ];
        
        this.createCableRoute(group, wirePoints, `IgnitionWire_${i + 1}`, 0.025, this.materials.get('wire'));
        
        // Wire from coil to spark plug
        const plugWirePoints = [
            [position.x, 5.2, position.z], // Coil position
            [position.x, 4.8, position.z], // Intermediate point
            [position.x, 4.5, position.z]  // Spark plug position
        ];
        
        this.createCableRoute(group, plugWirePoints, `SparkPlugWire_${i + 1}`, 0.03, this.materials.get('wire'));
    }
    
    // Sensor wires
    this.createSensorWiring(group);
}

createSensorWiring(group) {
    const sensorWires = [
        { name: 'CrankPositionSensor', from: [0, 4, 0], to: [2, -1.5, 0] },
        { name: 'CamPositionSensor', from: [0, 4, 0], to: [0, 3.5, -2] },
        { name: 'TemperatureSensor', from: [0, 4, 0], to: [1.5, 2.5, 1] },
        { name: 'OilPressureSensor', from: [0, 4, 0], to: [-1, 1, 0] },
        { name: 'BoostPressureSensor', from: [0, 4, 0], to: [2.5, 3, -1] }
    ];
    
    sensorWires.forEach(wire => {
        this.createCableRoute(group, [wire.from, wire.to], wire.name, 0.02, this.materials.get('wire'));
    });
}

createGroundStraps() {
    const groundGroup = new THREE.Group();
    groundGroup.name = 'GroundStraps';
    
    // Engine to chassis ground straps
    const groundPoints = [
        { from: [1, -2, 0], to: [3, -2.5, 2], name: 'EngineToChassisGround1' },
        { from: [-1, -2, 0], to: [-3, -2.5, 2], name: 'EngineToChassisGround2' },
        { from: [0, -2, -2], to: [0, -3, -4], name: 'EngineToFrameGround' }
    ];
    
    groundPoints.forEach(ground => {
        // Create flat braided ground strap
        const length = Math.sqrt(
            Math.pow(ground.to[0] - ground.from[0], 2) +
            Math.pow(ground.to[1] - ground.from[1], 2) +
            Math.pow(ground.to[2] - ground.from[2], 2)
        );
        
        const strapGeometry = new THREE.BoxGeometry(0.15, 0.02, length);
        const strap = new THREE.Mesh(strapGeometry, this.materials.get('alternator'));
        strap.name = ground.name;
        
        strap.position.set(
            (ground.from[0] + ground.to[0]) / 2,
            (ground.from[1] + ground.to[1]) / 2,
            (ground.from[2] + ground.to[2]) / 2
        );
        
        strap.lookAt(ground.to[0], ground.to[1], ground.to[2]);
        this.setupShadows(strap);
        groundGroup.add(strap);
    });
    
    this.components.set('groundStraps', groundGroup);
    this.config.three.staticComponents.add(groundGroup);
}

createFuses() {
    const fuseGroup = new THREE.Group();
    fuseGroup.name = 'FuseBox';
    
    // Fuse box housing
    const boxGeometry = this.getOptimizedGeometry(
        'fuseBox',
        () => new THREE.BoxGeometry(1.0, 0.3, 1.5)
    );
    const fuseBox = new THREE.Mesh(boxGeometry, this.materials.get('alternator'));
    fuseBox.position.set(3.5, 3, 2.5);
    this.setupShadows(fuseBox);
    
    // Individual fuses
    const fuseGeometry = this.getOptimizedGeometry(
        'fuse',
        () => new THREE.BoxGeometry(0.08, 0.15, 0.2)
    );
    
    for (let i = 0; i < 12; i++) {
        const fuse = new THREE.Mesh(fuseGeometry, this.materials.get('wire'));
        fuse.position.set(
            (i % 4 - 1.5) * 0.2,
            0.2,
            (Math.floor(i / 4) - 1) * 0.4
        );
        fuseBox.add(fuse);
    }
    
    fuseGroup.add(fuseBox);
    
    this.addComponentLabel(fuseGroup, 'Fuse Box', [0, 0.8, 0]);
    this.components.set('fuses', fuseGroup);
    this.config.three.staticComponents.add(fuseGroup);
}

createRelays() {
    const relayGroup = new THREE.Group();
    relayGroup.name = 'RelayBox';
    
    // Relay box housing
    const boxGeometry = this.getOptimizedGeometry(
        'relayBox',
        () => new THREE.BoxGeometry(0.8, 0.25, 1.2)
    );
    const relayBox = new THREE.Mesh(boxGeometry, this.materials.get('alternator'));
    relayBox.position.set(2.5, 3.2, 2.5);
    this.setupShadows(relayBox);
    
    // Individual relays
    const relayGeometry = this.getOptimizedGeometry(
        'relay',
        () => new THREE.BoxGeometry(0.15, 0.2, 0.2)
    );
    
    const relayTypes = ['Starter', 'Fuel Pump', 'Cooling Fan', 'AC Clutch', 'Horn', 'Lights'];
    
    for (let i = 0; i < 6; i++) {
        const relay = new THREE.Mesh(relayGeometry, this.materials.get('alternator'));
        relay.name = `${relayTypes[i]}Relay`;
        relay.position.set(
            (i % 3 - 1) * 0.25,
            0.15,
            (Math.floor(i / 3) - 0.5) * 0.35
        );
        relayBox.add(relay);
        
        // Relay pins
        for (let j = 0; j < 4; j++) {
            const pinGeom = new THREE.CylinderGeometry(0.01, 0.01, 0.08, 6);
            const pin = new THREE.Mesh(pinGeom, this.materials.get('wire'));
            pin.position.set(
                (j % 2 - 0.5) * 0.06,
                -0.15,
                (Math.floor(j / 2) - 0.5) * 0.06
            );
            relay.add(pin);
        }
    }
    
    relayGroup.add(relayBox);
    
    this.addComponentLabel(relayGroup, 'Relay Box', [0, 0.8, 0]);
    this.components.set('relays', relayGroup);
    this.config.three.staticComponents.add(relayGroup);
}