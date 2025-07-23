// Camshaft & Valve Train
createCamshaft() {
    const camshaftGroup = new THREE.Group();
    camshaftGroup.name = 'Camshaft';
    const { cylinders, engineType } = this.config.engineParameters;
    
    const camshaftLength = this.calculateJournalLength(cylinders, engineType);
    const shaftGeometry = this.getOptimizedGeometry(
        `camshaft_${cylinders}`,
        () => new THREE.CylinderGeometry(0.2, 0.2, camshaftLength, 12, 1)
    );
    
    const shaft = new THREE.Mesh(shaftGeometry, this.materials.get('crankshaft'));
    shaft.name = 'CamshaftShaft';
    shaft.rotation.z = Math.PI / 2;
    camshaftGroup.add(shaft);
    
    this.createCamLobes(camshaftGroup, cylinders, engineType);
    this.createCamshaftGear(camshaftGroup);
    
    camshaftGroup.position.set(0, 5.5, 0);
    
    this.addComponentLabel(camshaftGroup, 'Camshaft', [0, 1, 0]);
    
    this.components.set('camshaft', camshaftGroup);
    this.config.three.movingComponents.add(camshaftGroup);
}

createCamLobes() {
    const camLobesGroup = new THREE.Group();
    camLobesGroup.name = 'CamLobes';
    const { cylinders, engineType } = this.config.engineParameters;
    
    // Enhanced cam lobe geometry with profile variation
    const lobeGeometry = this.getOptimizedGeometry(
        'camLobe_detailed',
        () => {
            const points = [];
            const segments = 16;
            
            // Create cam lobe profile with realistic lift curve
            for (let i = 0; i <= segments; i++) {
                const angle = (i / segments) * Math.PI * 2;
                const baseRadius = 0.25;
                const maxLift = 0.12;
                
                // Cam lobe profile with opening/closing ramps
                let radius = baseRadius;
                if (angle > Math.PI / 4 && angle < 3 * Math.PI / 4) {
                    const liftPhase = (angle - Math.PI / 4) / (Math.PI / 2);
                    radius = baseRadius + maxLift * Math.sin(liftPhase * Math.PI);
                }
                
                points.push(new THREE.Vector2(radius, 0));
            }
            
            return new THREE.LatheGeometry(points, segments);
        }
    );
    
    for (let i = 0; i < cylinders; i++) {
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        
        // Intake cam lobe
        const intakeLobe = new THREE.Mesh(lobeGeometry, this.materials.get('crankshaft'));
        intakeLobe.name = `IntakeCamLobe_${i + 1}`;
        intakeLobe.position.set(position.x - 0.25, 0, 0);
        intakeLobe.rotation.z = Math.PI / 2;
        this.setupShadows(intakeLobe);
        camLobesGroup.add(intakeLobe);
        
        // Exhaust cam lobe
        const exhaustLobe = new THREE.Mesh(lobeGeometry, this.materials.get('crankshaft'));
        exhaustLobe.name = `ExhaustCamLobe_${i + 1}`;
        exhaustLobe.position.set(position.x + 0.25, 0, 0);
        exhaustLobe.rotation.z = Math.PI / 2;
        this.setupShadows(exhaustLobe);
        camLobesGroup.add(exhaustLobe);
    }
    
    this.addComponentLabel(camLobesGroup, 'Cam Lobes', [0, 0.5, 0]);
    this.components.set('camLobes', camLobesGroup);
    this.config.three.staticComponents.add(camLobesGroup);
}

createCamshaftGear() {
    const gearGroup = new THREE.Group();
    gearGroup.name = 'CamshaftGear';
    
    // Main gear body
    const gearGeometry = this.getOptimizedGeometry(
        'camshaftGear',
        () => new THREE.CylinderGeometry(0.7, 0.7, 0.25, 32, 1)
    );
    
    const gear = new THREE.Mesh(gearGeometry, this.materials.get('alternator'));
    gear.name = 'CamshaftGearBody';
    gear.rotation.z = Math.PI / 2;
    
    // Create gear teeth with proper involute profile
    const teethCount = 40;
    for (let i = 0; i < teethCount; i++) {
        const toothGeom = this.getOptimizedGeometry(
            'gearTooth',
            () => new THREE.BoxGeometry(0.04, 0.08, 0.2)
        );
        
        const tooth = new THREE.Mesh(toothGeom, this.materials.get('alternator'));
        const angle = (i / teethCount) * Math.PI * 2;
        tooth.position.set(
            Math.cos(angle) * 0.72,
            Math.sin(angle) * 0.72,
            0
        );
        tooth.rotation.z = angle;
        gear.add(tooth);
    }
    
    // Central hub
    const hubGeometry = this.getOptimizedGeometry(
        'gearHub',
        () => new THREE.CylinderGeometry(0.15, 0.15, 0.3, 12, 1)
    );
    
    const hub = new THREE.Mesh(hubGeometry, this.materials.get('crankshaft'));
    hub.rotation.z = Math.PI / 2;
    gear.add(hub);
    
    this.setupShadows(gear);
    gearGroup.add(gear);
    
    gearGroup.position.set(-2.5, 5.5, 0);
    this.addComponentLabel(gearGroup, 'Camshaft Gear', [0, 1, 0]);
    
    this.components.set('camshaftGear', gearGroup);
    this.config.three.staticComponents.add(gearGroup);
}

createTimingChain() {
    const chainGroup = new THREE.Group();
    chainGroup.name = 'TimingChain';
    
    // Chain links
    const linkGeometry = this.getOptimizedGeometry(
        'chainLink',
        () => new THREE.TorusGeometry(0.08, 0.02, 8, 16)
    );
    
    const chainPath = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.5, 3, 0),
        new THREE.Vector3(-2.5, 5.5, 0),
        new THREE.Vector3(0, 5.5, 0),
        new THREE.Vector3(2.5, 3, 0),
        new THREE.Vector3(2.5, 1, 0),
        new THREE.Vector3(0, -2.5, 0),
        new THREE.Vector3(-2.5, 1, 0)
    ], true);
    
    const linkCount = 120;
    for (let i = 0; i < linkCount; i++) {
        const t = i / linkCount;
        const position = chainPath.getPointAt(t);
        const tangent = chainPath.getTangentAt(t);
        
        const link = new THREE.Mesh(linkGeometry, this.materials.get('alternator'));
        link.position.copy(position);
        link.lookAt(position.clone().add(tangent));
        
        if (i % 2 === 0) {
            link.rotation.z += Math.PI / 2;
        }
        
        this.setupShadows(link);
        chainGroup.add(link);
    }
    
    this.addComponentLabel(chainGroup, 'Timing Chain', [0, 0, 1]);
    this.components.set('timingChain', chainGroup);
    this.config.three.staticComponents.add(chainGroup);
}

createTimingBelt() {
    const beltGroup = new THREE.Group();
    beltGroup.name = 'TimingBelt';
    
    // Belt geometry with teeth
    const beltGeometry = this.getOptimizedGeometry(
        'timingBelt',
        () => {
            const shape = new THREE.Shape();
            shape.moveTo(-3, 0);
            shape.lineTo(3, 0);
            shape.lineTo(3, 0.3);
            shape.lineTo(-3, 0.3);
            shape.lineTo(-3, 0);
            
            const extrudeSettings = {
                depth: 0.08,
                bevelEnabled: false
            };
            
            return new THREE.ExtrudeGeometry(shape, extrudeSettings);
        }
    );
    
    const belt = new THREE.Mesh(beltGeometry, this.materials.get('wire'));
    belt.position.set(0, 4, 0);
    
    // Add timing marks
    for (let i = 0; i < 30; i++) {
        const markGeom = new THREE.BoxGeometry(0.05, 0.02, 0.1);
        const mark = new THREE.Mesh(markGeom, this.materials.get('alternator'));
        mark.position.set(-2.8 + (i * 0.2), 0.31, 0);
        belt.add(mark);
    }
    
    this.setupShadows(belt);
    beltGroup.add(belt);
    
    this.addComponentLabel(beltGroup, 'Timing Belt', [0, 0.5, 0]);
    this.components.set('timingBelt', beltGroup);
    this.config.three.staticComponents.add(beltGroup);
}

createTimingGears() {
    const gearsGroup = new THREE.Group();
    gearsGroup.name = 'TimingGears';
    
    // Crankshaft timing gear
    const crankGearGeometry = this.getOptimizedGeometry(
        'crankTimingGear',
        () => new THREE.CylinderGeometry(0.8, 0.8, 0.2, 24, 1)
    );
    
    const crankGear = new THREE.Mesh(crankGearGeometry, this.materials.get('alternator'));
    crankGear.name = 'CrankshaftTimingGear';
    crankGear.position.set(0, -2.5, 0);
    crankGear.rotation.z = Math.PI / 2;
    
    // Add timing marks
    const markGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.05);
    const timingMark = new THREE.Mesh(markGeometry, this.materials.get('hotMaterial'));
    timingMark.position.set(0.85, 0, 0);
    crankGear.add(timingMark);
    
    this.setupShadows(crankGear);
    gearsGroup.add(crankGear);
    
    // Camshaft timing gear (already created in createCamshaftGear)
    this.addComponentLabel(gearsGroup, 'Timing Gears', [0, 0, 1]);
    
    this.components.set('timingGears', gearsGroup);
    this.config.three.staticComponents.add(gearsGroup);
}

createTimingCover() {
    const coverGroup = new THREE.Group();
    coverGroup.name = 'TimingCover';
    
    // Main cover
    const coverGeometry = this.getOptimizedGeometry(
        'timingCover',
        () => {
            const shape = new THREE.Shape();
            shape.moveTo(-3, 1);
            shape.lineTo(3, 1);
            shape.lineTo(3, 6);
            shape.lineTo(-3, 6);
            shape.lineTo(-3, 1);
            
            const extrudeSettings = {
                depth: 0.5,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.05,
                bevelSegments: 3
            };
            
            return new THREE.ExtrudeGeometry(shape, extrudeSettings);
        }
    );
    
    const cover = new THREE.Mesh(coverGeometry, this.materials.get('engineBlock'));
    cover.position.set(0, 0, 2.8);
    
    // Inspection window
    const windowGeometry = new THREE.RingGeometry(0.3, 0.5, 16, 1);
    const window = new THREE.Mesh(windowGeometry, this.materials.get('air'));
    window.position.set(0, 3.5, 0.05);
    cover.add(window);
    
    // Mounting bosses
    for (let i = 0; i < 4; i++) {
        const bossGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 8, 1);
        const boss = new THREE.Mesh(bossGeometry, this.materials.get('engineBlock'));
        const angle = (i / 4) * Math.PI * 2;
        boss.position.set(
            Math.cos(angle) * 2.2,
            3.5 + Math.sin(angle) * 2.2,
            0.05
        );
        cover.add(boss);
    }
    
    this.setupShadows(cover);
    coverGroup.add(cover);
    
    this.addComponentLabel(coverGroup, 'Timing Cover', [0, 0, 0.8]);
    this.components.set('timingCover', coverGroup);
    this.config.three.staticComponents.add(coverGroup);
}

createChainTensioner() {
    const tensionerGroup = new THREE.Group();
    tensionerGroup.name = 'ChainTensioner';
    
    // Tensioner body
    const bodyGeometry = this.getOptimizedGeometry(
        'tensionerBody',
        () => new THREE.CylinderGeometry(0.2, 0.2, 0.6, 12, 1)
    );
    
    const body = new THREE.Mesh(bodyGeometry, this.materials.get('alternator'));
    body.rotation.z = Math.PI / 2;
    body.rotation.x = Math.PI / 6;
    
    // Spring mechanism
    const springGeometry = this.getOptimizedGeometry(
        'tensionerSpring',
        () => new THREE.CylinderGeometry(0.15, 0.15, 0.4, 8, 1)
    );
    
    const spring = new THREE.Mesh(springGeometry, this.materials.get('piston'));
    spring.position.x = -0.2;
    body.add(spring);
    
    // Tensioner arm
    const armGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.1);
    const arm = new THREE.Mesh(armGeometry, this.materials.get('crankshaft'));
    arm.position.x = 0.3;
    body.add(arm);
    
    this.setupShadows(body);
    tensionerGroup.add(body);
    
    tensionerGroup.position.set(1.5, 4, 0);
    this.addComponentLabel(tensionerGroup, 'Chain Tensioner', [0, 0.5, 0]);
    
    this.components.set('chainTensioner', tensionerGroup);
    this.config.three.staticComponents.add(tensionerGroup);
}

createChainGuides() {
    const guidesGroup = new THREE.Group();
    guidesGroup.name = 'ChainGuides';
    
    // Upper chain guide
    const upperGuideGeometry = this.getOptimizedGeometry(
        'chainGuide',
        () => new THREE.BoxGeometry(0.15, 3, 0.3)
    );
    
    const upperGuide = new THREE.Mesh(upperGuideGeometry, this.materials.get('alternator'));
    upperGuide.position.set(-1.2, 4.5, 0);
    
    // Lower chain guide
    const lowerGuide = new THREE.Mesh(upperGuideGeometry, this.materials.get('alternator'));
    lowerGuide.position.set(1.2, 1.5, 0);
    
    // Guide rails
    for (let guide of [upperGuide, lowerGuide]) {
        const railGeometry = new THREE.BoxGeometry(0.05, 3, 0.1);
        const rail = new THREE.Mesh(railGeometry, this.materials.get('piston'));
        rail.position.x = 0.08;
        guide.add(rail);
        
        this.setupShadows(guide);
        guidesGroup.add(guide);
    }
    
    this.addComponentLabel(guidesGroup, 'Chain Guides', [0, 1, 0]);
    this.components.set('chainGuides', guidesGroup);
    this.config.three.staticComponents.add(guidesGroup);
}

createCamFollowers() {
    const followersGroup = new THREE.Group();
    followersGroup.name = 'CamFollowers';
    const { cylinders, engineType } = this.config.engineParameters;
    
    const followerGeometry = this.getOptimizedGeometry(
        'camFollower',
        () => new THREE.CylinderGeometry(0.15, 0.15, 0.3, 12, 1)
    );
    
    for (let i = 0; i < cylinders; i++) {
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        
        // Intake follower
        const intakeFollower = new THREE.Mesh(followerGeometry, this.materials.get('piston'));
        intakeFollower.name = `IntakeCamFollower_${i + 1}`;
        intakeFollower.position.set(position.x - 0.25, 4.8, 0);
        this.setupShadows(intakeFollower);
        followersGroup.add(intakeFollower);
        
        // Exhaust follower
        const exhaustFollower = new THREE.Mesh(followerGeometry, this.materials.get('piston'));
        exhaustFollower.name = `ExhaustCamFollower_${i + 1}`;
        exhaustFollower.position.set(position.x + 0.25, 4.8, 0);
        this.setupShadows(exhaustFollower);
        followersGroup.add(exhaustFollower);
    }
    
    this.addComponentLabel(followersGroup, 'Cam Followers', [0, 0.5, 0]);
    this.components.set('camFollowers', followersGroup);
    this.config.three.movingComponents.add(followersGroup);
}

createLifters() {
    const liftersGroup = new THREE.Group();
    liftersGroup.name = 'Lifters';
    const { cylinders, engineType } = this.config.engineParameters;
    
    const lifterGeometry = this.getOptimizedGeometry(
        'lifter',
        () => new THREE.CylinderGeometry(0.12, 0.12, 0.4, 12, 1)
    );
    
    for (let i = 0; i < cylinders; i++) {
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        
        // Hydraulic lifters for intake
        const intakeLifter = new THREE.Mesh(lifterGeometry, this.materials.get('crankshaft'));
        intakeLifter.name = `IntakeLifter_${i + 1}`;
        intakeLifter.position.set(position.x - 0.25, 4.2, 0);
        
        // Add hydraulic mechanism
        const hydraulicGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 8, 1);
        const hydraulic = new THREE.Mesh(hydraulicGeometry, this.materials.get('fuel'));
        hydraulic.position.y = 0.1;
        intakeLifter.add(hydraulic);
        
        this.setupShadows(intakeLifter);
        liftersGroup.add(intakeLifter);
        
        // Exhaust lifter
        const exhaustLifter = new THREE.Mesh(lifterGeometry, this.materials.get('crankshaft'));
        exhaustLifter.name = `ExhaustLifter_${i + 1}`;
        exhaustLifter.position.set(position.x + 0.25, 4.2, 0);
        
        const exhaustHydraulic = new THREE.Mesh(hydraulicGeometry, this.materials.get('fuel'));
        exhaustHydraulic.position.y = 0.1;
        exhaustLifter.add(exhaustHydraulic);
        
        this.setupShadows(exhaustLifter);
        liftersGroup.add(exhaustLifter);
    }
    
    this.addComponentLabel(liftersGroup, 'Hydraulic Lifters', [0, 0.5, 0]);
    this.components.set('lifters', liftersGroup);
    this.config.three.movingComponents.add(liftersGroup);
}

createPushRods() {
    const pushRodsGroup = new THREE.Group();
    pushRodsGroup.name = 'PushRods';
    const { cylinders, engineType } = this.config.engineParameters;
    
    const rodGeometry = this.getOptimizedGeometry(
        'pushRod',
        () => new THREE.CylinderGeometry(0.04, 0.04, 2, 8, 1)
    );
    
    for (let i = 0; i < cylinders; i++) {
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        
        // Intake push rod
        const intakeRod = new THREE.Mesh(rodGeometry, this.materials.get('crankshaft'));
        intakeRod.name = `IntakePushRod_${i + 1}`;
        intakeRod.position.set(position.x - 0.25, 5.8, 0);
        
        // Ball ends
        const ballGeometry = new THREE.SphereGeometry(0.06, 8, 8);
        const topBall = new THREE.Mesh(ballGeometry, this.materials.get('piston'));
        topBall.position.y = 1;
        intakeRod.add(topBall);
        
        const bottomBall = new THREE.Mesh(ballGeometry, this.materials.get('piston'));
        bottomBall.position.y = -1;
        intakeRod.add(bottomBall);
        
        this.setupShadows(intakeRod);
        pushRodsGroup.add(intakeRod);
        
        // Exhaust push rod
        const exhaustRod = new THREE.Mesh(rodGeometry, this.materials.get('crankshaft'));
        exhaustRod.name = `ExhaustPushRod_${i + 1}`;
        exhaustRod.position.set(position.x + 0.25, 5.8, 0);
        
        const exhaustTopBall = new THREE.Mesh(ballGeometry, this.materials.get('piston'));
        exhaustTopBall.position.y = 1;
        exhaustRod.add(exhaustTopBall);
        
        const exhaustBottomBall = new THREE.Mesh(ballGeometry, this.materials.get('piston'));
        exhaustBottomBall.position.y = -1;
        exhaustRod.add(exhaustBottomBall);
        
        this.setupShadows(exhaustRod);
        pushRodsGroup.add(exhaustRod);
    }
    
    this.addComponentLabel(pushRodsGroup, 'Push Rods', [0, 1.2, 0]);
    this.components.set('pushRods', pushRodsGroup);
    this.config.three.movingComponents.add(pushRodsGroup);
}

createRockerArms() {
    const rockerArmsGroup = new THREE.Group();
    rockerArmsGroup.name = 'RockerArms';
    const { cylinders, engineType } = this.config.engineParameters;
    
    const rockerGeometry = this.getOptimizedGeometry(
        'rockerArm',
        () => new THREE.BoxGeometry(0.8, 0.15, 0.1)
    );
    
    for (let i = 0; i < cylinders; i++) {
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        
        // Intake rocker arm
        const intakeRocker = new THREE.Mesh(rockerGeometry, this.materials.get('crankshaft'));
        intakeRocker.name = `IntakeRockerArm_${i + 1}`;
        intakeRocker.position.set(position.x - 0.25, 7.2, 0);
        
        // Pivot point
        const pivotGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.12, 12, 1);
        const pivot = new THREE.Mesh(pivotGeometry, this.materials.get('piston'));
        pivot.rotation.z = Math.PI / 2;
        intakeRocker.add(pivot);
        
        // Adjustment screw
        const screwGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.2, 8, 1);
        const screw = new THREE.Mesh(screwGeometry, this.materials.get('alternator'));
        screw.position.set(0.3, 0, 0);
        intakeRocker.add(screw);
        
        this.setupShadows(intakeRocker);
        rockerArmsGroup.add(intakeRocker);
        
        // Exhaust rocker arm
        const exhaustRocker = new THREE.Mesh(rockerGeometry, this.materials.get('crankshaft'));
        exhaustRocker.name = `ExhaustRockerArm_${i + 1}`;
        exhaustRocker.position.set(position.x + 0.25, 7.2, 0);
        
        const exhaustPivot = new THREE.Mesh(pivotGeometry, this.materials.get('piston'));
        exhaustPivot.rotation.z = Math.PI / 2;
        exhaustRocker.add(exhaustPivot);
        
        const exhaustScrew = new THREE.Mesh(screwGeometry, this.materials.get('alternator'));
        exhaustScrew.position.set(0.3, 0, 0);
        exhaustRocker.add(exhaustScrew);
        
        this.setupShadows(exhaustRocker);
        rockerArmsGroup.add(exhaustRocker);
    }
    
    this.addComponentLabel(rockerArmsGroup, 'Rocker Arms', [0, 0.3, 0]);
    this.components.set('rockerArms', rockerArmsGroup);
    this.config.three.movingComponents.add(rockerArmsGroup);
}

createRockerShaft() {
    const shaftGroup = new THREE.Group();
    shaftGroup.name = 'RockerShaft';
    const { cylinders, engineType } = this.config.engineParameters;
    
    const shaftLength = this.calculateJournalLength(cylinders, engineType);
    const shaftGeometry = this.getOptimizedGeometry(
        `rockerShaft_${cylinders}`,
        () => new THREE.CylinderGeometry(0.06, 0.06, shaftLength, 12, 1)
    );
    
    const shaft = new THREE.Mesh(shaftGeometry, this.materials.get('crankshaft'));
    shaft.name = 'RockerShaftBody';
    shaft.rotation.z = Math.PI / 2;
    shaft.position.y = 7.2;
    
    // Oil passages
    for (let i = 0; i < cylinders; i++) {
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        
        const oilHoleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.08, 6, 1);
        const oilHole = new THREE.Mesh(oilHoleGeometry, this.materials.get('fuel'));
        oilHole.position.set(position.x, 0, 0);
        shaft.add(oilHole);
    }
    
    // Support pedestals
    for (let i = 0; i <= cylinders; i++) {
        const pedestalGeometry = new THREE.BoxGeometry(0.3, 0.4, 0.2);
        const pedestal = new THREE.Mesh(pedestalGeometry, this.materials.get('engineBlock'));
        pedestal.position.set(-shaftLength/2 + (i * shaftLength/cylinders), -0.3, 0);
        shaft.add(pedestal);
    }
    
    this.setupShadows(shaft);
    shaftGroup.add(shaft);
    
    this.addComponentLabel(shaftGroup, 'Rocker Shaft', [0, 0.5, 0]);
    this.components.set('rockerShaft', shaftGroup);
    this.config.three.staticComponents.add(shaftGroup);
}

createRockerArmPivots() {
    const pivotsGroup = new THREE.Group();
    pivotsGroup.name = 'RockerArmPivots';
    const { cylinders, engineType } = this.config.engineParameters;
    
    const pivotGeometry = this.getOptimizedGeometry(
        'rockerPivot',
        () => new THREE.CylinderGeometry(0.08, 0.08, 0.15, 12, 1)
    );
    
    for (let i = 0; i < cylinders * 2; i++) {
        const cylinderIndex = Math.floor(i / 2);
        const isIntake = i % 2 === 0;
        const position = this.calculateCylinderPosition(cylinderIndex, cylinders, engineType);
        
        const pivot = new THREE.Mesh(pivotGeometry, this.materials.get('piston'));
        pivot.name = `RockerPivot_${cylinderIndex + 1}_${isIntake ? 'Intake' : 'Exhaust'}`;
        pivot.position.set(
            position.x + (isIntake ? -0.25 : 0.25),
            7.2,
            0
        );
        pivot.rotation.z = Math.PI / 2;
        
        // Lubrication groove
        const grooveGeometry = new THREE.TorusGeometry(0.09, 0.01, 8, 16);
        const groove = new THREE.Mesh(grooveGeometry, this.materials.get('fuel'));
        groove.rotation.x = Math.PI / 2;
        pivot.add(groove);
        
        this.setupShadows(pivot);
        pivotsGroup.add(pivot);
    }
    
    this.addComponentLabel(pivotsGroup, 'Rocker Pivots', [0, 0.3, 0]);
    this.components.set('rockerArmPivots', pivotsGroup);
    this.config.three.staticComponents.add(pivotsGroup);
}

createCamshaftBearings() {
    const bearingsGroup = new THREE.Group();
    bearingsGroup.name = 'CamshaftBearings';
    const { cylinders, engineType } = this.config.engineParameters;
    
    const bearingGeometry = this.getOptimizedGeometry(
        'camshaftBearing',
        () => new THREE.CylinderGeometry(0.25, 0.25, 0.3, 16, 1)
    );
    
    // Calculate bearing positions
    const bearingCount = cylinders + 1;
    const shaftLength = this.calculateJournalLength(cylinders, engineType);
    
    for (let i = 0; i < bearingCount; i++) {
        const bearing = new THREE.Mesh(bearingGeometry, this.materials.get('piston'));
        bearing.name = `CamshaftBearing_${i + 1}`;
        bearing.position.set(
            -shaftLength/2 + (i * shaftLength/(bearingCount - 1)),
            5.5,
            0
        );
        bearing.rotation.z = Math.PI / 2;
        
        // Bearing shell halves
        const shellGeometry = new THREE.CylinderGeometry(0.22, 0.22, 0.28, 16, 1, false, 0, Math.PI);
        const upperShell = new THREE.Mesh(shellGeometry, this.materials.get('alternator'));
        const lowerShell = new THREE.Mesh(shellGeometry, this.materials.get('alternator'));
        lowerShell.rotation.z = Math.PI;
        
        bearing.add(upperShell, lowerShell);
        
        // Oil groove
        const grooveGeometry = new THREE.TorusGeometry(0.23, 0.02, 8, 16);
        const groove = new THREE.Mesh(grooveGeometry, this.materials.get('fuel'));
        groove.rotation.x = Math.PI / 2;
        bearing.add(groove);
        
        this.setupShadows(bearing);
        bearingsGroup.add(bearing);
    }
    
    this.addComponentLabel(bearingsGroup, 'Camshaft Bearings', [0, 0.5, 0]);
    this.components.set('camshaftBearings', bearingsGroup);
    this.config.three.staticComponents.add(bearingsGroup);
}