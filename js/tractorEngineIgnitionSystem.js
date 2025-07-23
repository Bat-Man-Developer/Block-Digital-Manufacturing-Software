// Ignition System (Gasoline)
createSparkPlugs() {
    const { cylinders, engineType } = this.config.engineParameters;
    const plugGeometry = this.getOptimizedGeometry(
        'sparkPlug',
        () => new THREE.CylinderGeometry(0.12, 0.12, 1.0, 12, 1)
    );
    const electrodeGeometry = this.getOptimizedGeometry(
        'electrode',
        () => new THREE.SphereGeometry(0.06, 8, 8)
    );
    const sparkPlugs = [];
    
    for (let i = 0; i < cylinders; i++) {
        const plugGroup = new THREE.Group();
        plugGroup.name = `SparkPlug_${i + 1}`;
        
        const plug = new THREE.Mesh(plugGeometry, this.materials.get('sparkPlug'));
        const electrode = new THREE.Mesh(electrodeGeometry, this.materials.get('sparkPlug'));
        electrode.position.y = -0.5;
        
        // Add insulator
        const insulatorGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8);
        const insulator = new THREE.Mesh(insulatorGeom, this.materials.get('airFilter'));
        insulator.position.y = 0.2;
        
        plugGroup.add(plug, electrode, insulator);
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        plugGroup.position.set(position.x, 4.0 + position.y, position.z);
        
        if (engineType.startsWith('v')) {
            plugGroup.rotation.z = this.calculateBankAngle(i);
        }
        
        if (i === 0) {
            this.addComponentLabel(plugGroup, 'Spark Plugs', [0, 1.0, 0]);
        }
        
        sparkPlugs.push(plugGroup);
        this.config.three.staticComponents.add(plugGroup);
    }
    
    this.components.set('sparkPlugs', sparkPlugs);
}

createIgnitionCoils() {
    const { cylinders, engineType } = this.config.engineParameters;
    const coilGeometry = this.getOptimizedGeometry(
        'ignitionCoil',
        () => new THREE.CylinderGeometry(0.25, 0.25, 1.5, 8, 1)
    );
    const coils = [];
    
    for (let i = 0; i < cylinders; i++) {
        const coilGroup = new THREE.Group();
        coilGroup.name = `IgnitionCoil_${i + 1}`;
        
        // Main coil body
        const coil = new THREE.Mesh(coilGeometry, this.materials.get('engineBlock'));
        
        // Primary and secondary windings (visual representation)
        const primaryWinding = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.2, 1.2, 8),
            this.materials.get('wire')
        );
        
        const secondaryWinding = new THREE.Mesh(
            new THREE.CylinderGeometry(0.15, 0.15, 1.0, 8),
            this.materials.get('wire')
        );
        secondaryWinding.material = secondaryWinding.material.clone();
        secondaryWinding.material.color.setHex(0x006600);
        
        // High voltage terminal
        const terminal = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 0.3, 6),
            this.materials.get('sparkPlug')
        );
        terminal.position.y = 0.9;
        
        coilGroup.add(coil, primaryWinding, secondaryWinding, terminal);
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        coilGroup.position.set(position.x + 0.8, 3.5 + position.y, position.z);
        
        if (i === 0) {
            this.addComponentLabel(coilGroup, 'Ignition Coils', [0, 1.2, 0]);
        }
        
        coils.push(coilGroup);
        this.config.three.staticComponents.add(coilGroup);
    }
    
    this.components.set('ignitionCoils', coils);
}

createDistributor() {
    const distributorGroup = new THREE.Group();
    distributorGroup.name = 'Distributor';
    
    // Main distributor housing
    const housingGeom = new THREE.CylinderGeometry(0.6, 0.6, 1.8, 8);
    const housing = new THREE.Mesh(housingGeom, this.materials.get('engineBlock'));
    
    // Distributor shaft
    const shaftGeom = new THREE.CylinderGeometry(0.08, 0.08, 2.0, 8);
    const shaft = new THREE.Mesh(shaftGeom, this.materials.get('crankshaft'));
    shaft.position.y = 0.1;
    
    // Advance mechanism
    const advanceGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 8);
    const advance = new THREE.Mesh(advanceGeom, this.materials.get('piston'));
    advance.position.y = -0.5;
    
    distributorGroup.add(housing, shaft, advance);
    distributorGroup.position.set(2.0, 2.0, -1.5);
    
    this.addComponentLabel(distributorGroup, 'Distributor', [0, 1.5, 0]);
    this.config.three.staticComponents.add(distributorGroup);
    this.components.set('distributor', distributorGroup);
}

createDistributorCap() {
    const capGroup = new THREE.Group();
    capGroup.name = 'DistributorCap';
    
    // Cap body
    const capGeom = new THREE.CylinderGeometry(0.7, 0.7, 0.5, 8);
    const cap = new THREE.Mesh(capGeom, this.materials.get('airFilter'));
    cap.material = cap.material.clone();
    cap.material.color.setHex(0x222222);
    
    // Terminals
    const terminalGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.2, 6);
    const { cylinders } = this.config.engineParameters;
    
    for (let i = 0; i < cylinders + 1; i++) { // +1 for center terminal
        const terminal = new THREE.Mesh(terminalGeom, this.materials.get('sparkPlug'));
        
        if (i === cylinders) {
            // Center terminal
            terminal.position.set(0, 0.35, 0);
        } else {
            // Peripheral terminals
            const angle = (i / cylinders) * Math.PI * 2;
            terminal.position.set(
                Math.cos(angle) * 0.4,
                0.35,
                Math.sin(angle) * 0.4
            );
        }
        
        capGroup.add(terminal);
    }
    
    capGroup.add(cap);
    capGroup.position.set(2.0, 3.2, -1.5);
    
    this.addComponentLabel(capGroup, 'Distributor Cap', [0, 0.8, 0]);
    this.config.three.staticComponents.add(capGroup);
    this.components.set('distributorCap', capGroup);
}

createRotor() {
    const rotorGroup = new THREE.Group();
    rotorGroup.name = 'Rotor';
    
    // Rotor arm
    const armGeom = new THREE.BoxGeometry(0.8, 0.05, 0.1);
    const arm = new THREE.Mesh(armGeom, this.materials.get('sparkPlug'));
    
    // Center hub
    const hubGeom = new THREE.CylinderGeometry(0.1, 0.1, 0.08, 8);
    const hub = new THREE.Mesh(hubGeom, this.materials.get('engineBlock'));
    
    // Contact point
    const contactGeom = new THREE.SphereGeometry(0.03, 6, 6);
    const contact = new THREE.Mesh(contactGeom, this.materials.get('sparkPlug'));
    contact.position.set(0.35, 0, 0);
    
    rotorGroup.add(arm, hub, contact);
    rotorGroup.position.set(2.0, 2.8, -1.5);
    
    this.config.three.staticComponents.add(rotorGroup);
    this.components.set('rotor', rotorGroup);
}

createSparkPlugWires() {
    const { cylinders } = this.config.engineParameters;
    const wiresGroup = new THREE.Group();
    wiresGroup.name = 'SparkPlugWires';
    
    for (let i = 0; i < cylinders; i++) {
        const wireGroup = new THREE.Group();
        wireGroup.name = `SparkPlugWire_${i + 1}`;
        
        // Create curved wire path
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(2.0, 3.0, -1.5), // From distributor
            new THREE.Vector3(1.0, 3.5, -0.5),
            new THREE.Vector3(0, 4.0, i * 0.8 - 1.2) // To spark plug
        ]);
        
        const wireGeom = new THREE.TubeGeometry(curve, 20, 0.02, 8, false);
        const wire = new THREE.Mesh(wireGeom, this.materials.get('wire'));
        
        // Wire boots
        const bootGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.15, 8);
        const boot1 = new THREE.Mesh(bootGeom, this.materials.get('engineBlock'));
        const boot2 = new THREE.Mesh(bootGeom, this.materials.get('engineBlock'));
        
        boot1.position.copy(curve.getPoint(0));
        boot2.position.copy(curve.getPoint(1));
        
        wireGroup.add(wire, boot1, boot2);
        wiresGroup.add(wireGroup);
    }
    
    this.addComponentLabel(wiresGroup, 'Spark Plug Wires', [0, 1.0, 2.0]);
    this.config.three.staticComponents.add(wiresGroup);
    this.components.set('sparkPlugWires', wiresGroup);
}

createIgnitionModule() {
    const moduleGroup = new THREE.Group();
    moduleGroup.name = 'IgnitionModule';
    
    // Module housing
    const housingGeom = new THREE.BoxGeometry(1.0, 0.4, 0.8);
    const housing = new THREE.Mesh(housingGeom, this.materials.get('engineBlock'));
    
    // Heat sink fins
    for (let i = 0; i < 8; i++) {
        const finGeom = new THREE.BoxGeometry(0.8, 0.05, 0.02);
        const fin = new THREE.Mesh(finGeom, this.materials.get('piston'));
        fin.position.set(0, 0.15 + i * 0.03, 0.35);
        moduleGroup.add(fin);
    }
    
    // Electrical connections
    const connectorGeom = new THREE.BoxGeometry(0.3, 0.2, 0.15);
    const connector = new THREE.Mesh(connectorGeom, this.materials.get('airFilter'));
    connector.material = connector.material.clone();
    connector.material.color.setHex(0x333333);
    connector.position.set(0.35, 0, 0);
    
    moduleGroup.add(housing, connector);
    moduleGroup.position.set(3.0, 1.5, 0);
    
    this.addComponentLabel(moduleGroup, 'Ignition Module', [0, 0.8, 0]);
    this.config.three.staticComponents.add(moduleGroup);
    this.components.set('ignitionModule', moduleGroup);
}