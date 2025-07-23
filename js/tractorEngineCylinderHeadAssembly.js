// Cylinder Head Assembly
createCylinderHeads() {
    const { cylinders, engineType } = this.config.engineParameters;
    const headGeometry = this.getOptimizedGeometry(
        'cylinderHead',
        () => new THREE.BoxGeometry(1.2, 1.8, 2.2, 1, 1, 1)
    );
    const heads = [];
    
    for (let i = 0; i < cylinders; i++) {
        const head = new THREE.Mesh(headGeometry, this.materials.get('cylinderHead'));
        head.name = `CylinderHead_${i + 1}`;
        this.setupShadows(head);
        
        // Add valve ports
        this.createValvePorts(head);
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        head.position.set(position.x, 3.0 + position.y, position.z);
        
        if (engineType.startsWith('v')) {
            head.rotation.z = this.calculateBankAngle(i);
        }
        
        if (i === 0) {
            this.addComponentLabel(head, 'Cylinder Head', [0, 1.5, 0]);
        }
        
        heads.push(head);
        this.config.three.staticComponents.add(head);
    }
    
    this.components.set('cylinderHeads', heads);
}

createValvePorts(head) {
    const intakePortGeom = this.getOptimizedGeometry(
        'intakePort',
        () => new THREE.CylinderGeometry(0.15, 0.15, 0.5, 8)
    );
    const exhaustPortGeom = this.getOptimizedGeometry(
        'exhaustPort',
        () => new THREE.CylinderGeometry(0.12, 0.12, 0.5, 8)
    );
    
    // Intake ports
    for (let i = 0; i < 2; i++) {
        const port = new THREE.Mesh(intakePortGeom, this.materials.get('engineBlock'));
        port.position.set(-0.3 + i * 0.6, 0.5, 0.8);
        port.rotation.x = Math.PI / 6;
        head.add(port);
    }
    
    // Exhaust ports
    for (let i = 0; i < 2; i++) {
        const port = new THREE.Mesh(exhaustPortGeom, this.materials.get('hotMaterial'));
        port.position.set(-0.3 + i * 0.6, 0.5, -0.8);
        port.rotation.x = -Math.PI / 6;
        head.add(port);
    }
}

createValveAssembly() {
    const { cylinders, engineType } = this.config.engineParameters;
    const valveAssemblies = [];
    
    for (let i = 0; i < cylinders; i++) {
        const assembly = new THREE.Group();
        assembly.name = `ValveAssembly_${i + 1}`;
        
        // Create intake and exhaust valves for this cylinder
        const intakeValves = this.createCylinderIntakeValves(assembly, i);
        const exhaustValves = this.createCylinderExhaustValves(assembly, i);
        
        // Add valve springs and retainers
        this.createCylinderValveSprings(assembly, i);
        this.createCylinderValveRetainers(assembly, i);
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        assembly.position.set(position.x, 3.5 + position.y, position.z);
        
        if (engineType.startsWith('v')) {
            assembly.rotation.z = this.calculateBankAngle(i);
        }
        
        valveAssemblies.push(assembly);
        this.config.three.staticComponents.add(assembly);
    }
    
    this.components.set('valveAssembly', valveAssemblies);
}

createIntakeValves() {
    const { cylinders, engineType } = this.config.engineParameters;
    const valveGeometry = this.getOptimizedGeometry(
        'intakeValve',
        () => {
            const stemGeom = new THREE.CylinderGeometry(0.04, 0.04, 3.5, 8);
            const headGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 16);
            const stem = new THREE.Mesh(stemGeom, this.materials.get('piston'));
            const head = new THREE.Mesh(headGeom, this.materials.get('piston'));
            head.position.y = -1.72;
            
            const valve = new THREE.Group();
            valve.add(stem, head);
            return valve;
        }
    );
    
    const intakeValves = [];
    
    for (let i = 0; i < cylinders; i++) {
        const valvePair = new THREE.Group();
        valvePair.name = `IntakeValves_${i + 1}`;
        
        // Two intake valves per cylinder
        for (let j = 0; j < 2; j++) {
            const valve = valveGeometry.clone();
            valve.name = `IntakeValve_${i + 1}_${j + 1}`;
            valve.position.set(-0.3 + j * 0.6, 0, 0.4);
            valve.userData.isIntake = true;
            valve.userData.cylinderIndex = i;
            valve.userData.valveIndex = j;
            this.setupShadows(valve);
            valvePair.add(valve);
        }
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        valvePair.position.set(position.x, 2.0 + position.y, position.z);
        
        if (engineType.startsWith('v')) {
            valvePair.rotation.z = this.calculateBankAngle(i);
        }
        
        if (i === 0) {
            this.addComponentLabel(valvePair, 'Intake Valves', [0, 2.0, 0]);
        }
        
        intakeValves.push(valvePair);
        this.config.three.movingComponents.add(valvePair);
    }
    
    this.components.set('intakeValves', intakeValves);
}

createExhaustValves() {
    const { cylinders, engineType } = this.config.engineParameters;
    const valveGeometry = this.getOptimizedGeometry(
        'exhaustValve',
        () => {
            const stemGeom = new THREE.CylinderGeometry(0.038, 0.038, 3.5, 8);
            const headGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.06, 16);
            const stem = new THREE.Mesh(stemGeom, this.materials.get('hotMaterial'));
            const head = new THREE.Mesh(headGeom, this.materials.get('hotMaterial'));
            head.position.y = -1.72;
            
            const valve = new THREE.Group();
            valve.add(stem, head);
            return valve;
        }
    );
    
    const exhaustValves = [];
    
    for (let i = 0; i < cylinders; i++) {
        const valvePair = new THREE.Group();
        valvePair.name = `ExhaustValves_${i + 1}`;
        
        // Two exhaust valves per cylinder
        for (let j = 0; j < 2; j++) {
            const valve = valveGeometry.clone();
            valve.name = `ExhaustValve_${i + 1}_${j + 1}`;
            valve.position.set(-0.3 + j * 0.6, 0, -0.4);
            valve.userData.isExhaust = true;
            valve.userData.cylinderIndex = i;
            valve.userData.valveIndex = j;
            this.setupShadows(valve);
            valvePair.add(valve);
        }
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        valvePair.position.set(position.x, 2.0 + position.y, position.z);
        
        if (engineType.startsWith('v')) {
            valvePair.rotation.z = this.calculateBankAngle(i);
        }
        
        if (i === 0) {
            this.addComponentLabel(valvePair, 'Exhaust Valves', [0, 2.0, 0]);
        }
        
        exhaustValves.push(valvePair);
        this.config.three.movingComponents.add(valvePair);
    }
    
    this.components.set('exhaustValves', exhaustValves);
}

createValveGuides() {
    const { cylinders, engineType } = this.config.engineParameters;
    const guideGeometry = this.getOptimizedGeometry(
        'valveGuide',
        () => new THREE.CylinderGeometry(0.06, 0.06, 1.2, 8)
    );
    
    const valveGuides = [];
    
    for (let i = 0; i < cylinders; i++) {
        const guidesGroup = new THREE.Group();
        guidesGroup.name = `ValveGuides_${i + 1}`;
        
        // 4 valve guides per cylinder (2 intake, 2 exhaust)
        const positions = [
            { x: -0.3, z: 0.4, type: 'intake' },
            { x: 0.3, z: 0.4, type: 'intake' },
            { x: -0.3, z: -0.4, type: 'exhaust' },
            { x: 0.3, z: -0.4, type: 'exhaust' }
        ];
        
        positions.forEach((pos, j) => {
            const guide = new THREE.Mesh(guideGeometry, this.materials.get('engineBlock'));
            guide.name = `ValveGuide_${i + 1}_${pos.type}_${j % 2 + 1}`;
            guide.position.set(pos.x, 0, pos.z);
            this.setupShadows(guide);
            guidesGroup.add(guide);
        });
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        guidesGroup.position.set(position.x, 3.0 + position.y, position.z);
        
        if (engineType.startsWith('v')) {
            guidesGroup.rotation.z = this.calculateBankAngle(i);
        }
        
        if (i === 0) {
            this.addComponentLabel(guidesGroup, 'Valve Guides', [0, 0.8, 0]);
        }
        
        valveGuides.push(guidesGroup);
        this.config.three.staticComponents.add(guidesGroup);
    }
    
    this.components.set('valveGuides', valveGuides);
}

createValveSeats() {
    const { cylinders, engineType } = this.config.engineParameters;
    const seatGeometry = this.getOptimizedGeometry(
        'valveSeat',
        () => new THREE.RingGeometry(0.12, 0.20, 16)
    );
    
    const valveSeats = [];
    
    for (let i = 0; i < cylinders; i++) {
        const seatsGroup = new THREE.Group();
        seatsGroup.name = `ValveSeats_${i + 1}`;
        
        // Intake valve seats
        for (let j = 0; j < 2; j++) {
            const seat = new THREE.Mesh(seatGeometry, this.materials.get('engineBlock'));
            seat.name = `IntakeValveSeat_${i + 1}_${j + 1}`;
            seat.position.set(-0.3 + j * 0.6, -0.8, 0.4);
            seat.rotation.x = -Math.PI / 2;
            this.setupShadows(seat);
            seatsGroup.add(seat);
        }
        
        // Exhaust valve seats
        for (let j = 0; j < 2; j++) {
            const seat = new THREE.Mesh(seatGeometry, this.materials.get('hotMaterial'));
            seat.name = `ExhaustValveSeat_${i + 1}_${j + 1}`;
            seat.position.set(-0.3 + j * 0.6, -0.8, -0.4);
            seat.rotation.x = -Math.PI / 2;
            this.setupShadows(seat);
            seatsGroup.add(seat);
        }
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        seatsGroup.position.set(position.x, 3.8 + position.y, position.z);
        
        if (engineType.startsWith('v')) {
            seatsGroup.rotation.z = this.calculateBankAngle(i);
        }
        
        if (i === 0) {
            this.addComponentLabel(seatsGroup, 'Valve Seats', [0, 0.5, 0]);
        }
        
        valveSeats.push(seatsGroup);
        this.config.three.staticComponents.add(seatsGroup);
    }
    
    this.components.set('valveSeats', valveSeats);
}

createValveStemSeals() {
    const { cylinders, engineType } = this.config.engineParameters;
    const sealGeometry = this.getOptimizedGeometry(
        'valveStemSeal',
        () => new THREE.TorusGeometry(0.05, 0.015, 8, 16)
    );
    
    const stemSeals = [];
    
    for (let i = 0; i < cylinders; i++) {
        const sealsGroup = new THREE.Group();
        sealsGroup.name = `ValveStemSeals_${i + 1}`;
        
        // 4 valve stem seals per cylinder
        const positions = [
            { x: -0.3, z: 0.4 },
            { x: 0.3, z: 0.4 },
            { x: -0.3, z: -0.4 },
            { x: 0.3, z: -0.4 }
        ];
        
        positions.forEach((pos, j) => {
            const seal = new THREE.Mesh(sealGeometry, this.materials.get('wire'));
            seal.name = `ValveStemSeal_${i + 1}_${j + 1}`;
            seal.position.set(pos.x, 0.3, pos.z);
            seal.rotation.x = Math.PI / 2;
            this.setupShadows(seal);
            sealsGroup.add(seal);
        });
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        sealsGroup.position.set(position.x, 3.0 + position.y, position.z);
        
        if (engineType.startsWith('v')) {
            sealsGroup.rotation.z = this.calculateBankAngle(i);
        }
        
        if (i === 0) {
            this.addComponentLabel(sealsGroup, 'Valve Stem Seals', [0, 1.0, 0]);
        }
        
        stemSeals.push(sealsGroup);
        this.config.three.staticComponents.add(sealsGroup);
    }
    
    this.components.set('valveStemSeals', stemSeals);
}

createHeadGasket() {
    const { cylinders, engineType } = this.config.engineParameters;
    const gasketGeometry = this.getOptimizedGeometry(
        'headGasket',
        () => new THREE.BoxGeometry(1.3, 0.02, 2.3)
    );
    
    const headGaskets = [];
    
    for (let i = 0; i < cylinders; i++) {
        const gasket = new THREE.Mesh(gasketGeometry, this.materials.get('wire'));
        gasket.name = `HeadGasket_${i + 1}`;
        gasket.material.color.setHex(0x444444);
        this.setupShadows(gasket);
        
        // Add cylinder bore holes
        this.addGasketHoles(gasket);
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        gasket.position.set(position.x, 1.99 + position.y, position.z);
        
        if (engineType.startsWith('v')) {
            gasket.rotation.z = this.calculateBankAngle(i);
        }
        
        if (i === 0) {
            this.addComponentLabel(gasket, 'Head Gasket', [0, 0.3, 0]);
        }
        
        headGaskets.push(gasket);
        this.config.three.staticComponents.add(gasket);
    }
    
    this.components.set('headGasket', headGaskets);
}

createHeadBolts() {
    const { cylinders, engineType } = this.config.engineParameters;
    const boltGeometry = this.getOptimizedGeometry(
        'headBolt',
        () => {
            const shaft = new THREE.CylinderGeometry(0.06, 0.06, 2.5, 8);
            const head = new THREE.CylinderGeometry(0.12, 0.12, 0.15, 6);
            const bolt = new THREE.Group();
            const shaftMesh = new THREE.Mesh(shaft, this.materials.get('engineBlock'));
            const headMesh = new THREE.Mesh(head, this.materials.get('engineBlock'));
            headMesh.position.y = 1.325;
            bolt.add(shaftMesh, headMesh);
            return bolt;
        }
    );
    
    const headBolts = [];
    
    for (let i = 0; i < cylinders; i++) {
        const boltsGroup = new THREE.Group();
        boltsGroup.name = `HeadBolts_${i + 1}`;
        
        // 8 head bolts per cylinder in typical pattern
        const boltPositions = [
            { x: -0.5, z: -1.0 }, { x: 0.5, z: -1.0 },
            { x: -0.5, z: -0.3 }, { x: 0.5, z: -0.3 },
            { x: -0.5, z: 0.3 }, { x: 0.5, z: 0.3 },
            { x: -0.5, z: 1.0 }, { x: 0.5, z: 1.0 }
        ];
        
        boltPositions.forEach((pos, j) => {
            const bolt = boltGeometry.clone();
            bolt.name = `HeadBolt_${i + 1}_${j + 1}`;
            bolt.position.set(pos.x, 0, pos.z);
            this.setupShadows(bolt);
            boltsGroup.add(bolt);
        });
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        boltsGroup.position.set(position.x, 3.25 + position.y, position.z);
        
        if (engineType.startsWith('v')) {
            boltsGroup.rotation.z = this.calculateBankAngle(i);
        }
        
        if (i === 0) {
            this.addComponentLabel(boltsGroup, 'Head Bolts', [0, 1.0, 0]);
        }
        
        headBolts.push(boltsGroup);
        this.config.three.staticComponents.add(boltsGroup);
    }
    
    this.components.set('headBolts', headBolts);
}

createValveCover() {
    const { cylinders, engineType } = this.config.engineParameters;
    const coverGeometry = this.getOptimizedGeometry(
        'valveCover',
        () => new THREE.BoxGeometry(1.4, 0.8, 2.5)
    );
    
    const valveCovers = [];
    
    for (let i = 0; i < cylinders; i++) {
        const cover = new THREE.Mesh(coverGeometry, this.materials.get('engineBlock'));
        cover.name = `ValveCover_${i + 1}`;
        this.setupShadows(cover);
        
        // Add oil filler cap if first cylinder
        if (i === 0) {
            this.addOilFillerToValveCover(cover);
            this.addComponentLabel(cover, 'Valve Cover', [0, 0.8, 0]);
        }
        
        // Add breather system
        this.addBreatherToValveCover(cover);
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        cover.position.set(position.x, 4.4 + position.y, position.z);
        
        if (engineType.startsWith('v')) {
            cover.rotation.z = this.calculateBankAngle(i);
        }
        
        valveCovers.push(cover);
        this.config.three.staticComponents.add(cover);
    }
    
    this.components.set('valveCover', valveCovers);
}

createValveCoverGasket() {
    const { cylinders, engineType } = this.config.engineParameters;
    const gasketGeometry = this.getOptimizedGeometry(
        'valveCoverGasket',
        () => new THREE.BoxGeometry(1.35, 0.01, 2.45)
    );
    
    const coverGaskets = [];
    
    for (let i = 0; i < cylinders; i++) {
        const gasket = new THREE.Mesh(gasketGeometry, this.materials.get('wire'));
        gasket.name = `ValveCoverGasket_${i + 1}`;
        gasket.material.color.setHex(0x222222);
        this.setupShadows(gasket);
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        gasket.position.set(position.x, 4.0 + position.y, position.z);
        
        if (engineType.startsWith('v')) {
            gasket.rotation.z = this.calculateBankAngle(i);
        }
        
        if (i === 0) {
            this.addComponentLabel(gasket, 'Valve Cover Gasket', [0, 0.2, 0]);
        }
        
        coverGaskets.push(gasket);
        this.config.three.staticComponents.add(gasket);
    }
    
    this.components.set('valveCoverGasket', coverGaskets);
}

createCombustionChambers() {
    const { cylinders, engineType } = this.config.engineParameters;
    const chamberGeometry = this.getOptimizedGeometry(
        'combustionChamber',
        () => new THREE.SphereGeometry(0.4, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2)
    );
    
    const combustionChambers = [];
    
    for (let i = 0; i < cylinders; i++) {
        const chamber = new THREE.Mesh(chamberGeometry, this.materials.get('combustion'));
        chamber.name = `CombustionChamber_${i + 1}`;
        chamber.material.transparent = true;
        chamber.material.opacity = 0.3;
        this.setupShadows(chamber);
        
        // Add spark plug hole
        this.addSparkPlugHole(chamber);
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        chamber.position.set(position.x, 2.6 + position.y, position.z);
        chamber.rotation.x = Math.PI;
        
        if (engineType.startsWith('v')) {
            chamber.rotation.z = this.calculateBankAngle(i);
        }
        
        if (i === 0) {
            this.addComponentLabel(chamber, 'Combustion Chamber', [0, 0.8, 0]);
        }
        
        combustionChambers.push(chamber);
        this.config.three.staticComponents.add(chamber);
    }
    
    this.components.set('combustionChambers', combustionChambers);
}

// Helper methods for Cylinder Head Assembly
addGasketHoles(gasket) {
    // Add cylinder bore hole
    const boreHoleGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.03, 16);
    const boreHole = new THREE.Mesh(boreHoleGeom, this.materials.get('air'));
    boreHole.position.y = 0;
    gasket.add(boreHole);
    
    // Add smaller holes for bolts and coolant passages
    const smallHoleGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.03, 8);
    const holePositions = [
        { x: -0.5, z: -0.8 }, { x: 0.5, z: -0.8 },
        { x: -0.5, z: 0.8 }, { x: 0.5, z: 0.8 }
    ];
    
    holePositions.forEach(pos => {
        const hole = new THREE.Mesh(smallHoleGeom, this.materials.get('air'));
        hole.position.set(pos.x, 0, pos.z);
        gasket.add(hole);
    });
}

addOilFillerToValveCover(cover) {
    const fillerCapGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.12, 8);
    const fillerCap = new THREE.Mesh(fillerCapGeom, this.materials.get('engineBlock'));
    fillerCap.position.set(0.3, 0.46, -0.8);
    cover.add(fillerCap);
}

addBreatherToValveCover(cover) {
    const breatherGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.15, 8);
    const breather = new THREE.Mesh(breatherGeom, this.materials.get('pipe'));
    breather.position.set(-0.4, 0.48, 0.6);
    cover.add(breather);
}

addSparkPlugHole(chamber) {
    const holeGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.2, 8);
    const hole = new THREE.Mesh(holeGeom, this.materials.get('air'));
    hole.position.set(0, 0.3, 0);
    chamber.add(hole);
}

createCylinderIntakeValves(assembly, cylinderIndex) {
    // Create intake valves for specific cylinder
    const valveGeom = new THREE.CylinderGeometry(0.04, 0.04, 3.5, 8);
    const headGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 16);
    
    for (let i = 0; i < 2; i++) {
        const stem = new THREE.Mesh(valveGeom, this.materials.get('piston'));
        const head = new THREE.Mesh(headGeom, this.materials.get('piston'));
        head.position.y = -1.72;
        
        const valve = new THREE.Group();
        valve.add(stem, head);
        valve.position.set(-0.3 + i * 0.6, -1.5, 0.4);
        valve.userData.isIntake = true;
        
        assembly.add(valve);
    }
}

createCylinderExhaustValves(assembly, cylinderIndex) {
    // Create exhaust valves for specific cylinder
    const valveGeom = new THREE.CylinderGeometry(0.038, 0.038, 3.5, 8);
    const headGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.06, 16);
    
    for (let i = 0; i < 2; i++) {
        const stem = new THREE.Mesh(valveGeom, this.materials.get('hotMaterial'));
        const head = new THREE.Mesh(headGeom, this.materials.get('hotMaterial'));
        head.position.y = -1.72;
        
        const valve = new THREE.Group();
        valve.add(stem, head);
        valve.position.set(-0.3 + i * 0.6, -1.5, -0.4);
        valve.userData.isExhaust = true;
        
        assembly.add(valve);
    }
}

createCylinderValveSprings(assembly, cylinderIndex) {
    const springGeom = this.getOptimizedGeometry(
        'valveSpring',
        () => {
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0.1, 0.5, 0),
                new THREE.Vector3(-0.1, 1.0, 0),
                new THREE.Vector3(0.1, 1.5, 0),
                new THREE.Vector3(0, 2.0, 0)
            ]);
            return new THREE.TubeGeometry(curve, 20, 0.02, 8, false);
        }
    );
    
    const positions = [
        { x: -0.3, z: 0.4 }, { x: 0.3, z: 0.4 },
        { x: -0.3, z: -0.4 }, { x: 0.3, z: -0.4 }
    ];
    
    positions.forEach(pos => {
        const spring = new THREE.Mesh(springGeom, this.materials.get('engineBlock'));
        spring.position.set(pos.x, -0.5, pos.z);
        assembly.add(spring);
    });
}

createCylinderValveRetainers(assembly, cylinderIndex) {
    const retainerGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 8);
    
    const positions = [
        { x: -0.3, z: 0.4 }, { x: 0.3, z: 0.4 },
        { x: -0.3, z: -0.4 }, { x: 0.3, z: -0.4 }
    ];
    
    positions.forEach(pos => {
        const retainer = new THREE.Mesh(retainerGeom, this.materials.get('engineBlock'));
        retainer.position.set(pos.x, 1.5, pos.z);
        assembly.add(retainer);
    });
}