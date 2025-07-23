// Piston Assembly
// Initialize Piston Animation States
initializePistonAnimationStates() {
    const { cylinders } = this.config.engineParameters;
    this.animationState.pistonPhases = new Array(cylinders).fill(0);
    this.animationState.pistonPositions = new Array(cylinders).fill(0);
    this.animationState.connectingRodAngles = new Array(cylinders).fill(0);
    
    // Calculate firing order for proper animation phasing
    this.animationState.firingOrder = this.calculateFiringOrder(cylinders);
}

// Calculate firing order based on cylinder count
calculateFiringOrder(cylinders) {
    const firingOrders = {
        1: [0],
        2: [0, 1],
        3: [0, 2, 1],
        4: [0, 3, 1, 2],
        5: [0, 2, 4, 1, 3],
        6: [0, 5, 3, 1, 4, 2],
        8: [0, 5, 4, 2, 6, 3, 7, 1],
        10: [0, 5, 4, 2, 6, 3, 7, 1, 8, 9],
        12: [0, 7, 5, 10, 3, 8, 6, 11, 1, 4, 9, 2]
    };
    
    return firingOrders[cylinders] || Array.from({length: cylinders}, (_, i) => i);
}

createPistons() {
    this.config.three.pistons = [];
    const { cylinders, bore, stroke, engineType, compressionRatio } = this.config.engineParameters;
    
    const pistonRadius = Math.max(0.6, (bore / 1000) * 3.0);
    const pistonHeight = Math.max(1.4, 2.0 + (compressionRatio - 10) * 0.1);
    
    const pistonGeometry = this.getOptimizedGeometry(
        `piston_${bore}_${compressionRatio}`,
        () => {
            // Create detailed piston with crown, ring lands, and skirt
            const crownRadius = pistonRadius * 0.98;
            const skirtRadius = pistonRadius * 0.95;
            
            // Main piston body - use this as the primary geometry
            return new THREE.CylinderGeometry(crownRadius, skirtRadius, pistonHeight, 32, 4);
            
            // Piston crown (top)
            const crown = new THREE.CylinderGeometry(crownRadius * 0.9, crownRadius, pistonHeight * 0.2, 32, 1);
            crown.translate(0, pistonHeight * 0.4, 0);
            
            // Ring lands
            const ringLand1 = new THREE.CylinderGeometry(pistonRadius * 1.01, pistonRadius * 1.01, pistonHeight * 0.05, 32, 1);
            ringLand1.translate(0, pistonHeight * 0.25, 0);
            
            const ringLand2 = new THREE.CylinderGeometry(pistonRadius * 1.01, pistonRadius * 1.01, pistonHeight * 0.05, 32, 1);
            ringLand2.translate(0, pistonHeight * 0.15, 0);
            
            const ringLand3 = new THREE.CylinderGeometry(pistonRadius * 1.01, pistonRadius * 1.01, pistonHeight * 0.08, 32, 1);
            ringLand3.translate(0, pistonHeight * 0.0, 0);
            
            return THREE.BufferGeometryUtils.mergeGeometries([mainBody, crown, ringLand1, ringLand2, ringLand3]);
        }
    );
    
    const pistonMaterial = this.materials.get('piston') || new THREE.MeshPhysicalMaterial({
        color: 0xf0f0f0,
        metalness: 0.95,
        roughness: 0.03,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        envMapIntensity: 2.0
    });
    
    for (let i = 0; i < cylinders; i++) {
        const pistonAssembly = new THREE.Group();
        pistonAssembly.name = `PistonAssembly_${i + 1}`;
        
        // Create piston body
        const piston = new THREE.Mesh(pistonGeometry, pistonMaterial);
        piston.name = `Piston_${i + 1}`;
        
        this.setupShadows(piston);
        
        // Add piston components
        this.createPistonRings(piston, pistonRadius, pistonHeight, i + 1);
        this.createPistonPin(piston, pistonRadius, i + 1);
        this.createPistonCrown(piston, pistonRadius, pistonHeight);
        this.createPistonSkirt(piston, pistonRadius, pistonHeight);
        
        pistonAssembly.add(piston);
        
        // Position piston in cylinder
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        pistonAssembly.position.copy(position);
        pistonAssembly.position.y += 0.2; // Adjust for proper clearance
        
        // Handle V-engine bank angles
        if (engineType.startsWith('v')) {
            const bankAngle = this.calculateBankAngle(i);
            pistonAssembly.rotation.z = bankAngle;
        }
        
        // Store original position and cylinder data
        pistonAssembly.userData.originalPosition = pistonAssembly.position.clone();
        pistonAssembly.userData.cylinderIndex = i;
        pistonAssembly.userData.strokeLength = stroke / 1000 * 2; // Convert to meters and scale
        
        // Add label for first piston
        if (i === 0) {
            this.addComponentLabel(pistonAssembly, 'Pistons', [0, pistonHeight + 2, 0]);
        }
        
        this.config.three.pistons.push(pistonAssembly);
        this.config.three.movingComponents.add(pistonAssembly);
    }
    
    this.components.set('pistons', this.config.three.pistons);
}

createConnectingRods() {
    const { cylinders, stroke } = this.config.engineParameters;
    const rodLength = Math.max(3.0, (stroke / 1000) * 4.0);
    
    for (let i = 0; i < cylinders; i++) {
        const pistonAssembly = this.config.three.pistons[i];
        if (!pistonAssembly) continue;
        
        const rodGeometry = this.getOptimizedGeometry(
            `connectingRod_${stroke}`,
            () => {
                // Create simplified I-beam shaped connecting rod
                return new THREE.BoxGeometry(0.15, rodLength, 0.4);
            }
        );
        
        // Create separate components as individual meshes
        const rodMaterial = this.materials.get('crankshaft') || new THREE.MeshPhysicalMaterial({
            color: 0x505050,
            metalness: 0.9,
            roughness: 0.15,
            clearcoat: 0.8,
            clearcoatRoughness: 0.1,
            envMapIntensity: 1.5
        });
        
        const rodGroup = new THREE.Group();
        rodGroup.name = `ConnectingRod_${i + 1}`;
        
        // Main beam
        const mainBeam = new THREE.Mesh(rodGeometry, rodMaterial);
        mainBeam.name = 'MainBeam';
        this.setupShadows(mainBeam);
        rodGroup.add(mainBeam);
        
        // Small end (piston end)
        const smallEndGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.2, 16);
        const smallEnd = new THREE.Mesh(smallEndGeometry, rodMaterial);
        smallEnd.name = 'SmallEnd';
        smallEnd.position.y = rodLength / 2;
        this.setupShadows(smallEnd);
        rodGroup.add(smallEnd);
        
        // Big end (crankshaft end)
        const bigEndGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 16);
        const bigEnd = new THREE.Mesh(bigEndGeometry, rodMaterial);
        bigEnd.name = 'BigEnd';
        bigEnd.position.y = -rodLength / 2;
        this.setupShadows(bigEnd);
        rodGroup.add(bigEnd);
        
        rodGroup.position.y = -rodLength / 2 - 0.5;
        
        // Store rod data
        rodGroup.userData.rodLength = rodLength;
        rodGroup.userData.cylinderIndex = i;
        
        pistonAssembly.add(rodGroup);
    }
}

createPistonRingsStandalone() {
    // This method ensures rings are created if not already part of piston assembly
    if (!this.config.three.pistons) return;
    
    this.config.three.pistons.forEach((pistonAssembly, index) => {
        const piston = pistonAssembly.getObjectByName(`Piston_${index + 1}`);
        if (piston && !piston.getObjectByName(`TopCompressionRing_${index + 1}`)) {
            const pistonRadius = 0.6; // Default if geometry parameters not available
            const pistonHeight = 1.4;
            this.createPistonRings(piston, pistonRadius, pistonHeight, index + 1);
        }
    });
}

createPistonPinsStandalone() {
    // This method ensures pins are created if not already part of piston assembly
    if (!this.config.three.pistons) return;
    
    this.config.three.pistons.forEach((pistonAssembly, index) => {
        const piston = pistonAssembly.getObjectByName(`Piston_${index + 1}`);
        if (piston && !piston.getObjectByName(`PistonPin_${index + 1}`)) {
            const pistonRadius = 0.6; // Default if geometry parameters not available
            this.createPistonPin(piston, pistonRadius, index + 1);
        }
    });
}

createPistonRings(piston, radius, height, pistonNumber) {
    // Create compression rings
    this.createCompressionRings(piston, radius, height, pistonNumber);
    
    // Create oil control rings
    this.createOilControlRings(piston, radius, height, pistonNumber);
}

createCompressionRings(piston, radius, height, pistonNumber) {
    const ringGeometry = this.getOptimizedGeometry(
        'compressionRing',
        () => {
            // Create ring with realistic gap
            const ring = new THREE.TorusGeometry(radius * 1.02, 0.02, 6, 32, Math.PI * 1.9);
            return ring;
        }
    );
    
    const compressionRingMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x404040,
        metalness: 0.9,
        roughness: 0.2,
        clearcoat: 0.5,
        envMapIntensity: 1.2
    });
    
    // Top compression ring
    const topRing = new THREE.Mesh(ringGeometry, compressionRingMaterial);
    topRing.name = `TopCompressionRing_${pistonNumber}`;
    topRing.position.y = height * 0.35;
    topRing.rotation.x = Math.PI / 2;
    this.setupShadows(topRing);
    piston.add(topRing);
    
    // Second compression ring
    const secondRing = new THREE.Mesh(ringGeometry, compressionRingMaterial);
    secondRing.name = `SecondCompressionRing_${pistonNumber}`;
    secondRing.position.y = height * 0.25;
    secondRing.rotation.x = Math.PI / 2;
    this.setupShadows(secondRing);
    piston.add(secondRing);
}

createOilControlRings(piston, radius, height, pistonNumber) {
    const oilRingGeometry = this.getOptimizedGeometry(
        'oilControlRing',
        () => {
            // Thicker oil control ring
            const ring = new THREE.TorusGeometry(radius * 1.02, 0.035, 6, 32, Math.PI * 1.9);
            return ring;
        }
    );
    
    const oilRingMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x606060,
        metalness: 0.85,
        roughness: 0.3,
        clearcoat: 0.3,
        envMapIntensity: 1.0
    });
    
    const oilRing = new THREE.Mesh(oilRingGeometry, oilRingMaterial);
    oilRing.name = `OilControlRing_${pistonNumber}`;
    oilRing.position.y = height * 0.1;
    oilRing.rotation.x = Math.PI / 2;
    this.setupShadows(oilRing);
    
    // Add oil drain holes
    this.createOilDrainHoles(oilRing, radius);
    
    piston.add(oilRing);
}

createOilDrainHoles(oilRing, radius) {
    const holeGeometry = this.getOptimizedGeometry(
        'oilDrainHole',
        () => new THREE.CylinderGeometry(0.01, 0.01, 0.08, 6)
    );
    
    const holeMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.8
    });
    
    for (let i = 0; i < 8; i++) {
        const hole = new THREE.Mesh(holeGeometry, holeMaterial);
        const angle = (i / 8) * Math.PI * 2;
        hole.position.x = Math.cos(angle) * radius * 1.02;
        hole.position.z = Math.sin(angle) * radius * 1.02;
        hole.rotation.z = Math.PI / 2;
        oilRing.add(hole);
    }
}

createPistonPin(piston, radius, pistonNumber) {
    const pinGeometry = this.getOptimizedGeometry(
        'pistonPin',
        () => {
            // Hollow piston pin for weight reduction
            const outerPin = new THREE.CylinderGeometry(0.08, 0.08, radius * 1.6, 16, 2);
            const innerHole = new THREE.CylinderGeometry(0.05, 0.05, radius * 1.7, 12, 1);
            
            // Create hollow pin effect (simplified)
            return outerPin; // In a real implementation, you'd subtract the inner geometry
        }
    );
    
    const pinMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xe0e0e0,
        metalness: 0.95,
        roughness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        envMapIntensity: 2.0
    });
    
    const pin = new THREE.Mesh(pinGeometry, pinMaterial);
    pin.name = `PistonPin_${pistonNumber}`;
    pin.rotation.z = Math.PI / 2;
    pin.position.y = -0.15;
    
    this.setupShadows(pin);
    
    // Add pin bushings
    this.createPistonPinBushings(pin, radius);
    
    piston.add(pin);
}

createPistonPinBushings(pin, radius) {
    const bushingGeometry = this.getOptimizedGeometry(
        'pistonPinBushing',
        () => new THREE.CylinderGeometry(0.09, 0.09, 0.15, 12, 1)
    );
    
    const bushingMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x8B4513, // Bronze color
        metalness: 0.3,
        roughness: 0.4,
        clearcoat: 0.2,
        envMapIntensity: 0.8
    });
    
    // Left bushing
    const leftBushing = new THREE.Mesh(bushingGeometry, bushingMaterial);
    leftBushing.name = 'LeftPinBushing';
    leftBushing.position.x = -radius * 0.7;
    leftBushing.rotation.z = Math.PI / 2;
    this.setupShadows(leftBushing);
    pin.add(leftBushing);
    
    // Right bushing
    const rightBushing = new THREE.Mesh(bushingGeometry, bushingMaterial);
    rightBushing.name = 'RightPinBushing';
    rightBushing.position.x = radius * 0.7;
    rightBushing.rotation.z = Math.PI / 2;
    this.setupShadows(rightBushing);
    pin.add(rightBushing);
}

createRodBearing(rod, rodLength, rodNumber) {
    const bearingGeometry = this.getOptimizedGeometry(
        'rodBearing',
        () => new THREE.TorusGeometry(0.32, 0.06, 8, 16)
    );
    
    const bearingMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffd700, // Gold/brass color
        metalness: 0.8,
        roughness: 0.1,
        clearcoat: 0.9,
        clearcoatRoughness: 0.05,
        envMapIntensity: 1.8
    });
    
    const bearing = new THREE.Mesh(bearingGeometry, bearingMaterial);
    bearing.name = `RodBearing_${rodNumber}`;
    bearing.position.y = -rodLength / 2;
    bearing.rotation.x = Math.PI / 2;
    
    this.setupShadows(bearing);
    rod.add(bearing);
}

createRodCap(rod, rodNumber) {
    const capGeometry = this.getOptimizedGeometry(
        'rodCap',
        () => new THREE.CylinderGeometry(0.38, 0.38, 0.15, 16, 1, false, 0, Math.PI)
    );
    
    const capMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x404040,
        metalness: 0.9,
        roughness: 0.2,
        clearcoat: 0.7,
        envMapIntensity: 1.3
    });
    
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.name = `RodCap_${rodNumber}`;
    cap.position.y = -rod.geometry.boundingBox?.max.y || -1.5;
    cap.rotation.x = Math.PI / 2;
    
    this.setupShadows(cap);
    rod.add(cap);
}

createRodBolts(rod, rodNumber) {
    const boltGeometry = this.getOptimizedGeometry(
        'rodBolt',
        () => new THREE.CylinderGeometry(0.02, 0.02, 0.2, 8)
    );
    
    const headGeometry = this.getOptimizedGeometry(
        'boltHead', 
        () => new THREE.CylinderGeometry(0.035, 0.035, 0.03, 6)
    );
    
    const boltMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x303030,
        metalness: 0.95,
        roughness: 0.1,
        clearcoat: 0.8,
        envMapIntensity: 1.4
    });
    
    // Create two bolts per rod cap
    for (let i = 0; i < 2; i++) {
        const boltGroup = new THREE.Group();
        boltGroup.name = `RodBolt_${rodNumber}_${i + 1}`;
        
        // Bolt shaft
        const shaft = new THREE.Mesh(boltGeometry, boltMaterial);
        shaft.name = 'BoltShaft';
        this.setupShadows(shaft);
        boltGroup.add(shaft);
        
        // Bolt head
        const head = new THREE.Mesh(headGeometry, boltMaterial);
        head.name = 'BoltHead';
        head.position.y = 0.12;
        this.setupShadows(head);
        boltGroup.add(head);
        
        boltGroup.position.y = -1.5; // Adjust based on rod geometry
        boltGroup.position.x = (i === 0) ? -0.15 : 0.15;
        boltGroup.position.z = 0.25;
        
        rod.add(boltGroup);
    }
}

createPistonCrown(piston, radius, height) {
    const crownGeometry = this.getOptimizedGeometry(
        'pistonCrown',
        () => {
            // Create dome-shaped crown
            const crownRadius = radius * 0.95;
            return new THREE.SphereGeometry(crownRadius, 16, 8, 0, Math.PI * 2, 0, Math.PI / 3);
        }
    );
    
    const crownMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xf5f5f5,
        metalness: 0.95,
        roughness: 0.02,
        clearcoat: 1.0,
        clearcoatRoughness: 0.01,
        envMapIntensity: 2.5
    });
    
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.name = 'PistonCrown';
    crown.position.y = height / 2;
    
    this.setupShadows(crown);
    
    // Add valve reliefs
    this.createValveReliefs(crown, radius);
    
    piston.add(crown);
}

createValveReliefs(crown, radius) {
    const reliefGeometry = this.getOptimizedGeometry(
        'valveRelief',
        () => new THREE.SphereGeometry(0.12, 8, 6)
    );
    
    const reliefMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.3
    });
    
    // Intake valve reliefs
    for (let i = 0; i < 2; i++) {
        const relief = new THREE.Mesh(reliefGeometry, reliefMaterial);
        relief.position.x = (i === 0) ? -radius * 0.3 : radius * 0.3;
        relief.position.y = 0.05;
        relief.position.z = radius * 0.2;
        crown.add(relief);
    }
    
    // Exhaust valve reliefs
    for (let i = 0; i < 2; i++) {
        const relief = new THREE.Mesh(reliefGeometry, reliefMaterial);
        relief.position.x = (i === 0) ? -radius * 0.3 : radius * 0.3;
        relief.position.y = 0.05;
        relief.position.z = -radius * 0.2;
        crown.add(relief);
    }
}

createPistonSkirt(piston, radius, height) {
    const skirtGeometry = this.getOptimizedGeometry(
        'pistonSkirt',
        () => {
            // Tapered skirt
            return new THREE.CylinderGeometry(radius * 0.98, radius * 0.95, height * 0.6, 24, 3);
        }
    );
    
    const skirtMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xeeeeee,
        metalness: 0.9,
        roughness: 0.08,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1.8
    });
    
    const skirt = new THREE.Mesh(skirtGeometry, skirtMaterial);
    skirt.name = 'PistonSkirt';
    skirt.position.y = -height * 0.2;
    
    this.setupShadows(skirt);
    
    // Add anti-scuff coating
    this.createAntiScuffCoating(skirt, radius);
    
    piston.add(skirt);
}

createAntiScuffCoating(skirt, radius) {
    const coatingGeometry = this.getOptimizedGeometry(
        'antiScuffCoating',
        () => new THREE.CylinderGeometry(radius * 0.985, radius * 0.955, skirt.geometry.parameters.height, 24, 1)
    );
    
    const coatingMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x4a4a4a,
        metalness: 0.7,
        roughness: 0.3,
        transparent: true,
        opacity: 0.6,
        envMapIntensity: 1.2
    });
    
    const coating = new THREE.Mesh(coatingGeometry, coatingMaterial);
    coating.name = 'AntiScuffCoating';
    
    skirt.add(coating);
}