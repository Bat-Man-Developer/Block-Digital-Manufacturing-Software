// Fasteners & Hardware
createHeadStuds() {
    const group = new THREE.Group();
    group.name = 'HeadStuds';
    
    const studGeometry = this.getOptimizedGeometry(
        'headStud',
        () => new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8)
    );
    
    // Create studs in typical head bolt pattern
    const studPositions = [
        [-1.5, -0.5, -1], [-0.5, -0.5, -1], [0.5, -0.5, -1], [1.5, -0.5, -1],
        [-1.5, -0.5, 0], [-0.5, -0.5, 0], [0.5, -0.5, 0], [1.5, -0.5, 0],
        [-1.5, -0.5, 1], [-0.5, -0.5, 1], [0.5, -0.5, 1], [1.5, -0.5, 1],
        [-1.8, -0.5, -0.5], [-1.8, -0.5, 0.5], [1.8, -0.5, -0.5], [1.8, -0.5, 0.5]
    ];
    
    studPositions.forEach((pos, index) => {
        const stud = new THREE.Mesh(studGeometry, this.materials.get('crankshaft'));
        stud.name = `HeadStud_${index}`;
        stud.position.set(pos[0], pos[1], pos[2]);
        
        // Add nut
        const nutGeometry = this.getOptimizedGeometry(
            'headNut',
            () => new THREE.CylinderGeometry(0.08, 0.08, 0.06, 6)
        );
        const nut = new THREE.Mesh(nutGeometry, this.materials.get('crankshaft'));
        nut.name = `HeadNut_${index}`;
        nut.position.set(pos[0], pos[1] + 0.45, pos[2]);
        
        group.add(stud);
        group.add(nut);
    });
    
    this.config.three.staticComponents.add(group);
    this.components.set('headStuds', group);
}

createMainCapBolts() {
    const group = new THREE.Group();
    group.name = 'MainCapBolts';
    
    const boltGeometry = this.getOptimizedGeometry(
        'mainCapBolt',
        () => new THREE.CylinderGeometry(0.035, 0.035, 0.6, 8)
    );
    
    // Main bearing cap bolt positions
    const boltPositions = [
        [-1.2, -3.2, -0.15], [-1.2, -3.2, 0.15],
        [-0.4, -3.2, -0.15], [-0.4, -3.2, 0.15],
        [0.4, -3.2, -0.15], [0.4, -3.2, 0.15],
        [1.2, -3.2, -0.15], [1.2, -3.2, 0.15],
        [2, -3.2, -0.15], [2, -3.2, 0.15]
    ];
    
    boltPositions.forEach((pos, index) => {
        const bolt = new THREE.Mesh(boltGeometry, this.materials.get('crankshaft'));
        bolt.name = `MainCapBolt_${index}`;
        bolt.position.set(pos[0], pos[1], pos[2]);
        
        // Add bolt head
        const headGeometry = this.getOptimizedGeometry(
            'boltHead',
            () => new THREE.CylinderGeometry(0.06, 0.06, 0.04, 6)
        );
        const boltHead = new THREE.Mesh(headGeometry, this.materials.get('crankshaft'));
        boltHead.name = `MainCapBoltHead_${index}`;
        boltHead.position.set(pos[0], pos[1] - 0.32, pos[2]);
        
        group.add(bolt);
        group.add(boltHead);
    });
    
    this.config.three.staticComponents.add(group);
    this.components.set('mainCapBolts', group);
}

createFlywheelBolts() {
    const group = new THREE.Group();
    group.name = 'FlywheelBolts';
    
    const boltGeometry = this.getOptimizedGeometry(
        'flywheelBolt',
        () => new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8)
    );
    
    // Create bolts in circular pattern
    const boltCount = 8;
    const radius = 0.8;
    
    for (let i = 0; i < boltCount; i++) {
        const angle = (i / boltCount) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        const bolt = new THREE.Mesh(boltGeometry, this.materials.get('crankshaft'));
        bolt.name = `FlywheelBolt_${i}`;
        bolt.position.set(x, -2.3, z);
        bolt.rotation.y = Math.PI / 2;
        
        // Add bolt head
        const headGeometry = this.getOptimizedGeometry(
            'flywheelBoltHead',
            () => new THREE.CylinderGeometry(0.05, 0.05, 0.03, 6)
        );
        const boltHead = new THREE.Mesh(headGeometry, this.materials.get('crankshaft'));
        boltHead.name = `FlywheelBoltHead_${i}`;
        boltHead.position.set(x - 0.22, -2.3, z);
        boltHead.rotation.y = Math.PI / 2;
        
        group.add(bolt);
        group.add(boltHead);
    }
    
    this.config.three.staticComponents.add(group);
    this.components.set('flywheelBolts', group);
}

createTimingCoverBolts() {
    const group = new THREE.Group();
    group.name = 'TimingCoverBolts';
    
    const boltGeometry = this.getOptimizedGeometry(
        'timingCoverBolt',
        () => new THREE.CylinderGeometry(0.025, 0.025, 0.3, 8)
    );
    
    // Timing cover bolt positions
    const boltPositions = [
        [2.2, 0.5, -1.8], [2.2, 1.5, -1.8], [2.2, 2.5, -1.8],
        [2.2, 3.5, -1.8], [2.2, 4, -1.8], [2.2, -0.5, -1.8],
        [2.2, -1.5, -1.8], [2.2, -2, -1.8]
    ];
    
    boltPositions.forEach((pos, index) => {
        const bolt = new THREE.Mesh(boltGeometry, this.materials.get('crankshaft'));
        bolt.name = `TimingCoverBolt_${index}`;
        bolt.position.set(pos[0], pos[1], pos[2]);
        bolt.rotation.z = Math.PI / 2;
        
        // Add bolt head
        const headGeometry = this.getOptimizedGeometry(
            'timingBoltHead',
            () => new THREE.CylinderGeometry(0.04, 0.04, 0.025, 6)
        );
        const boltHead = new THREE.Mesh(headGeometry, this.materials.get('crankshaft'));
        boltHead.name = `TimingCoverBoltHead_${index}`;
        boltHead.position.set(pos[0] + 0.16, pos[1], pos[2]);
        boltHead.rotation.z = Math.PI / 2;
        
        group.add(bolt);
        group.add(boltHead);
    });
    
    this.config.three.staticComponents.add(group);
    this.components.set('timingCoverBolts', group);
}

createOilPanBolts() {
    const group = new THREE.Group();
    group.name = 'OilPanBolts';
    
    const boltGeometry = this.getOptimizedGeometry(
        'oilPanBolt',
        () => new THREE.CylinderGeometry(0.02, 0.02, 0.25, 8)
    );
    
    // Oil pan perimeter bolts
    const boltPositions = [];
    
    // Front and rear bolts
    for (let x = -1.8; x <= 1.8; x += 0.4) {
        boltPositions.push([x, -3.8, -1.4]);
        boltPositions.push([x, -3.8, 1.4]);
    }
    
    // Side bolts
    for (let z = -1; z <= 1; z += 0.4) {
        boltPositions.push([-1.8, -3.8, z]);
        boltPositions.push([1.8, -3.8, z]);
    }
    
    boltPositions.forEach((pos, index) => {
        const bolt = new THREE.Mesh(boltGeometry, this.materials.get('crankshaft'));
        bolt.name = `OilPanBolt_${index}`;
        bolt.position.set(pos[0], pos[1], pos[2]);
        
        // Add bolt head
        const headGeometry = this.getOptimizedGeometry(
            'oilPanBoltHead',
            () => new THREE.CylinderGeometry(0.035, 0.035, 0.02, 6)
        );
        const boltHead = new THREE.Mesh(headGeometry, this.materials.get('crankshaft'));
        boltHead.name = `OilPanBoltHead_${index}`;
        boltHead.position.set(pos[0], pos[1] + 0.14, pos[2]);
        
        group.add(bolt);
        group.add(boltHead);
    });
    
    this.config.three.staticComponents.add(group);
    this.components.set('oilPanBolts', group);
}

createManifoldBolts() {
    const group = new THREE.Group();
    group.name = 'ManifoldBolts';
    
    const boltGeometry = this.getOptimizedGeometry(
        'manifoldBolt',
        () => new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8)
    );
    
    // Intake manifold bolts
    const intakeBoltPositions = [
        [-1.5, 3.2, 1.8], [-0.5, 3.2, 1.8], [0.5, 3.2, 1.8], [1.5, 3.2, 1.8],
        [-1.5, 3.2, 2.2], [-0.5, 3.2, 2.2], [0.5, 3.2, 2.2], [1.5, 3.2, 2.2]
    ];
    
    // Exhaust manifold bolts
    const exhaustBoltPositions = [
        [-1.5, 3.2, -1.8], [-0.5, 3.2, -1.8], [0.5, 3.2, -1.8], [1.5, 3.2, -1.8],
        [-1.5, 3.2, -2.2], [-0.5, 3.2, -2.2], [0.5, 3.2, -2.2], [1.5, 3.2, -2.2]
    ];
    
    [...intakeBoltPositions, ...exhaustBoltPositions].forEach((pos, index) => {
        const bolt = new THREE.Mesh(boltGeometry, this.materials.get('crankshaft'));
        bolt.name = `ManifoldBolt_${index}`;
        bolt.position.set(pos[0], pos[1], pos[2]);
        bolt.rotation.z = Math.PI / 2;
        
        // Add bolt head
        const headGeometry = this.getOptimizedGeometry(
            'manifoldBoltHead',
            () => new THREE.CylinderGeometry(0.045, 0.045, 0.03, 6)
        );
        const boltHead = new THREE.Mesh(headGeometry, this.materials.get('crankshaft'));
        boltHead.name = `ManifoldBoltHead_${index}`;
        boltHead.position.set(pos[0], pos[1], pos[2] + (pos[2] > 0 ? 0.19 : -0.19));
        boltHead.rotation.z = Math.PI / 2;
        
        group.add(bolt);
        group.add(boltHead);
    });
    
    this.config.three.staticComponents.add(group);
    this.components.set('manifoldBolts', group);
}