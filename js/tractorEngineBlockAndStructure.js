// Engine Block & Structure
createEngineBlock() {
    try {
        const { cylinders, engineType, bore } = this.config.engineParameters;
        
        // Ensure bore is defined with a default value
        const engineBore = bore || 100; // Default 100mm bore
        
        // Add more robust dimension calculation with validation
        let dimensions;
        try {
            dimensions = this.calculateEngineDimensions(cylinders, engineType);
            
            // Validate dimensions more thoroughly
            if (!dimensions || 
                typeof dimensions.width !== 'number' || 
                typeof dimensions.height !== 'number' || 
                typeof dimensions.length !== 'number' ||
                isNaN(dimensions.width) || isNaN(dimensions.height) || isNaN(dimensions.length) ||
                dimensions.width <= 0 || dimensions.height <= 0 || dimensions.length <= 0) {
                throw new Error('Invalid dimensions calculated');
            }
        } catch (dimError) {
            console.warn('Dimension calculation failed, using fallback:', dimError.message);
            dimensions = {
                width: 4,
                height: 4.5,
                length: 4
            };
        }
        
        const blockGeometry = this.getOptimizedGeometry(
            `engineBlock_${cylinders}_${engineType}`,
            () => new THREE.BoxGeometry(dimensions.width, dimensions.height, dimensions.length, 2, 2, 2)
        );
        
        const block = new THREE.Mesh(blockGeometry, this.materials.get('engineBlock'));
        block.name = 'EngineBlock';
        block.position.set(0, 0, 0);
        
        block.castShadow = true;
        block.receiveShadow = true;
        
        // Create sub-components with error handling and dimension validation
        try {
            this.createEngineMounts(block, dimensions);
        } catch (e) {
            console.warn('Failed to create engine mounts:', e.message);
        }
        
        try {
            this.createMainBearingCaps(block, cylinders, engineType);
        } catch (e) {
            console.warn('Failed to create main bearing caps:', e.message);
        }
        
        try {
            this.createCoolingPassages(block, dimensions);
        } catch (e) {
            console.warn('Failed to create cooling passages:', e.message);
        }

        try {
            this.createCylinderBores(block, cylinders, engineType, engineBore, dimensions.height);
        } catch (e) {
            console.warn('Failed to create cylinder bores:', e.message);
        }
        
        this.addComponentLabel(block, 'Engine Block', [0, dimensions.height/2 + 1, 0]);
        
        this.components.set('engineBlock', block);
        this.config.three.staticComponents.add(block);
        
    } catch (error) {
        console.error('Failed to create Engine Block:', error.message);
        this.createFallbackEngineBlock();
    }
}

// Fallback method for when engine block creation fails
createFallbackEngineBlock() {
    const fallbackGeometry = new THREE.BoxGeometry(4, 4, 3);
    const fallbackMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const block = new THREE.Mesh(fallbackGeometry, fallbackMaterial);
    block.name = 'EngineBlock_Fallback';
    
    this.components.set('engineBlock', block);
    this.config.three.staticComponents.add(block);
}

createEngineMounts(block, dimensions) {
    try {
        // Enhanced validation
        if (!dimensions || 
            typeof dimensions.width !== 'number' || isNaN(dimensions.width) ||
            typeof dimensions.height !== 'number' || isNaN(dimensions.height) ||
            typeof dimensions.length !== 'number' || isNaN(dimensions.length) ||
            dimensions.width <= 0 || dimensions.height <= 0 || dimensions.length <= 0) {
            throw new Error(`Invalid dimensions provided: ${JSON.stringify(dimensions)}`);
        }
        
        const mountGeometry = this.getOptimizedGeometry(
            'engineMount',
            () => new THREE.BoxGeometry(0.6, 0.4, 0.3)
        );
        
        const mountMaterial = this.materials.get('crankshaft');
        const mountPositions = [
            [-dimensions.width * 0.4, -dimensions.height * 0.4, dimensions.length * 0.3],
            [dimensions.width * 0.4, -dimensions.height * 0.4, dimensions.length * 0.3],
            [0, -dimensions.height * 0.4, -dimensions.length * 0.4]
        ];
        
        mountPositions.forEach((pos, index) => {
            const mount = new THREE.Mesh(mountGeometry, mountMaterial);
            mount.name = `EngineMount_${index + 1}`;
            mount.position.set(...pos);
            
            mount.castShadow = true;
            mount.receiveShadow = false;
            
            const boltGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8);
            for (let i = 0; i < 4; i++) {
                const bolt = new THREE.Mesh(boltGeom, mountMaterial);
                bolt.position.set(
                    (i % 2 - 0.5) * 0.4,
                    -0.25,
                    (Math.floor(i / 2) - 0.5) * 0.2
                );
                bolt.castShadow = false;
                bolt.receiveShadow = false;
                mount.add(bolt);
            }
            
            block.add(mount);
        });
        
    } catch (error) {
        console.error('Error creating engine mounts:', error.message);
    }
}

createMainBearingCaps(block, cylinders, engineType) {
    const bearingCount = Math.ceil(cylinders / 2) + 1;
    const capGeometry = this.getOptimizedGeometry(
        'mainBearingCap',
        () => new THREE.BoxGeometry(0.8, 0.3, 0.6)
    );
    
    for (let i = 0; i < bearingCount; i++) {
        const cap = new THREE.Mesh(capGeometry, this.materials.get('crankshaft'));
        cap.name = `MainBearingCap_${i + 1}`;
        
        const spacing = engineType.startsWith('v') ? 1.5 : 1.2;
        cap.position.set(
            (i - (bearingCount - 1) / 2) * spacing,
            -1.8,
            0
        );
        
        // Add bearing cap bolts
        const boltGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8);
        for (let j = 0; j < 2; j++) {
            const bolt = new THREE.Mesh(boltGeom, this.materials.get('crankshaft'));
            bolt.position.set((j - 0.5) * 0.5, 0.3, 0);
            cap.add(bolt);
        }
        
        this.setupShadows(cap);
        block.add(cap);
    }
}

createCoolingPassages(block, dimensions) {
    try {
        // Enhanced validation
        if (!dimensions || 
            typeof dimensions.height !== 'number' || isNaN(dimensions.height) ||
            typeof dimensions.width !== 'number' || isNaN(dimensions.width) ||
            dimensions.height <= 0 || dimensions.width <= 0) {
            throw new Error(`Invalid dimensions provided: ${JSON.stringify(dimensions)}`);
        }
        
        const passageGeometry = this.getOptimizedGeometry(
            'coolingPassage',
            () => new THREE.CylinderGeometry(0.1, 0.1, dimensions.height * 0.8, 8)
        );
        
        const passageCount = 6;
        for (let i = 0; i < passageCount; i++) {
            const passage = new THREE.Mesh(passageGeometry, this.materials.get('water'));
            const angle = (i / passageCount) * Math.PI * 2;
            const radius = dimensions.width * 0.3;
            
            passage.position.set(
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius
            );
            
            const connectionGeom = new THREE.TorusGeometry(0.08, 0.02, 4, 8);
            const connection = new THREE.Mesh(connectionGeom, this.materials.get('water'));
            connection.position.y = dimensions.height * 0.3;
            connection.rotation.x = Math.PI / 2;
            passage.add(connection);
            
            block.add(passage);
        }
        
        // Add water pump mounting boss
        const pumpBossGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 12);
        const pumpBoss = new THREE.Mesh(pumpBossGeom, this.materials.get('engineBlock'));
        pumpBoss.position.set(dimensions.width * 0.4, 0, dimensions.length * 0.3);
        pumpBoss.rotation.z = Math.PI / 2;
        block.add(pumpBoss);
        
    } catch (error) {
        console.error('Error creating cooling passages:', error.message);
    }
}

createCylinderSleeves() {
    const { cylinders, engineType, linerType } = this.config.engineParameters;
    
    const sleeveGeometry = this.getOptimizedGeometry(
        `cylinderSleeve_${linerType}`,
        () => {
            const outerRadius = 0.45;
            const innerRadius = linerType === 'wet_sleeve' ? 0.38 : 0.4;
            const height = 2.8;
            return new THREE.CylinderGeometry(outerRadius, outerRadius, height, 16);
        }
    );
    
    const sleeveMaterial = linerType === 'wet_sleeve' 
        ? this.materials.get('crankshaft') 
        : this.materials.get('engineBlock');
    
    for (let i = 0; i < cylinders; i++) {
        const sleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
        sleeve.name = `CylinderSleeve_${i + 1}`;
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        sleeve.position.set(position.x, position.y + 0.5, position.z);
        
        if (engineType.startsWith('v')) {
            const bankAngle = this.calculateBankAngle(i);
            sleeve.rotation.z = bankAngle + Math.PI / 2;
        } else {
            sleeve.rotation.z = Math.PI / 2;
        }
        
        // Add sleeve flange for wet sleeves
        if (linerType === 'wet_sleeve') {
            const flangeGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.1, 16);
            const flange = new THREE.Mesh(flangeGeom, sleeveMaterial);
            flange.position.y = 1.45;
            sleeve.add(flange);
            
            // Add O-ring seals
            const oRingGeom = new THREE.TorusGeometry(0.42, 0.02, 8, 16);
            for (let j = 0; j < 2; j++) {
                const oRing = new THREE.Mesh(oRingGeom, this.materials.get('engineBlock'));
                oRing.material = oRing.material.clone();
                oRing.material.color.setHex(0x000000);
                oRing.position.y = j * 0.8 - 0.4;
                sleeve.add(oRing);
            }
        }
        
        this.setupShadows(sleeve);
        this.config.three.staticComponents.add(sleeve);
    }
}

createEngineCover() {
    const dimensions = this.calculateEngineDimensions(
        this.config.engineParameters.cylinders,
        this.config.engineParameters.engineType
    );
    
    const coverGeometry = this.getOptimizedGeometry(
        'engineCover',
        () => new THREE.BoxGeometry(dimensions.width + 0.4, 0.3, dimensions.length + 0.4)
    );
    
    const cover = new THREE.Mesh(coverGeometry, this.materials.get('engineBlock'));
    cover.name = 'EngineCover';
    cover.position.set(0, dimensions.height/2 + 0.2, 0);
    
    // Add cover bolts
    const boltGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 8);
    const boltPositions = [
        [-dimensions.width/2, 0, -dimensions.length/2],
        [dimensions.width/2, 0, -dimensions.length/2],
        [-dimensions.width/2, 0, dimensions.length/2],
        [dimensions.width/2, 0, dimensions.length/2]
    ];
    
    boltPositions.forEach((pos, index) => {
        const bolt = new THREE.Mesh(boltGeom, this.materials.get('crankshaft'));
        bolt.position.set(pos[0], 0.2, pos[2]);
        cover.add(bolt);
    });
    
    // Add inspection hatches
    const hatchGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.32, 8);
    const hatch = new THREE.Mesh(hatchGeom, this.materials.get('engineBlock'));
    hatch.position.set(0, 0.16, 0);
    cover.add(hatch);
    
    this.setupShadows(cover);
    this.addComponentLabel(cover, 'Engine Cover', [0, 0.5, 0]);
    this.components.set('engineCover', cover);
    this.config.three.staticComponents.add(cover);
}

createBellHousing() {
    const { engineType } = this.config.engineParameters;
    const dimensions = this.calculateEngineDimensions(
        this.config.engineParameters.cylinders,
        engineType
    );
    
    const housingGeometry = this.getOptimizedGeometry(
        'bellHousing',
        () => {
            const shape = new THREE.Shape();
            const radius = 1.8;
            
            // Create bell-shaped profile
            shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
            const innerRadius = 1.5;
            const hole = new THREE.Path();
            hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
            shape.holes.push(hole);
            
            const extrudeSettings = {
                depth: 0.8,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.05,
                bevelSegments: 4
            };
            
            return new THREE.ExtrudeGeometry(shape, extrudeSettings);
        }
    );
    
    const bellHousing = new THREE.Mesh(housingGeometry, this.materials.get('engineBlock'));
    bellHousing.name = 'BellHousing';
    bellHousing.position.set(0, -1, -dimensions.length/2 - 0.4);
    bellHousing.rotation.x = Math.PI / 2;
    
    // Add starter mounting boss
    const starterBossGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 12);
    const starterBoss = new THREE.Mesh(starterBossGeom, this.materials.get('engineBlock'));
    starterBoss.position.set(1.2, 0, 0.2);
    starterBoss.rotation.z = Math.PI / 4;
    bellHousing.add(starterBoss);
    
    // Add transmission mounting points
    const mountGeom = new THREE.BoxGeometry(0.2, 0.2, 0.3);
    for (let i = 0; i < 4; i++) {
        const mount = new THREE.Mesh(mountGeom, this.materials.get('crankshaft'));
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        mount.position.set(
            Math.cos(angle) * 1.6,
            Math.sin(angle) * 1.6,
            0.5
        );
        bellHousing.add(mount);
    }
    
    this.setupShadows(bellHousing);
    this.addComponentLabel(bellHousing, 'Bell Housing', [0, 0, 1]);
    this.components.set('bellHousing', bellHousing);
    this.config.three.staticComponents.add(bellHousing);
}

createEngineDeckPlate() {
    const { cylinders, engineType } = this.config.engineParameters;
    const dimensions = this.calculateEngineDimensions(cylinders, engineType);
    
    const deckGeometry = this.getOptimizedGeometry(
        'engineDeck',
        () => new THREE.BoxGeometry(dimensions.width + 0.2, 0.15, dimensions.length + 0.2)
    );
    
    const deckPlate = new THREE.Mesh(deckGeometry, this.materials.get('engineBlock'));
    deckPlate.name = 'EngineDeckPlate';
    deckPlate.position.set(0, dimensions.height/2, 0);
    
    // Add cylinder bore openings
    for (let i = 0; i < cylinders; i++) {
        const boreHoleGeom = new THREE.CylinderGeometry(0.42, 0.42, 0.2, 16);
        const boreHole = new THREE.Mesh(boreHoleGeom, this.materials.get('engineBlock'));
        boreHole.material = boreHole.material.clone();
        boreHole.material.transparent = true;
        boreHole.material.opacity = 0;
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        boreHole.position.set(position.x, 0, position.z);
        deckPlate.add(boreHole);
    }
    
    // Add head bolt holes
    const boltHoleGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.2, 8);
    const boltPattern = this.generateHeadBoltPattern(cylinders, engineType);
    
    boltPattern.forEach(pos => {
        const boltHole = new THREE.Mesh(boltHoleGeom, this.materials.get('engineBlock'));
        boltHole.material = boltHole.material.clone();
        boltHole.material.transparent = true;
        boltHole.material.opacity = 0;
        boltHole.position.set(pos.x, 0, pos.z);
        deckPlate.add(boltHole);
    });
    
    this.setupShadows(deckPlate);
    this.addComponentLabel(deckPlate, 'Engine Deck Plate', [0, 0.3, 0]);
    this.components.set('engineDeckPlate', deckPlate);
    this.config.three.staticComponents.add(deckPlate);
}

createCylinderBore() {
    const { cylinders, engineType, bore: boreSize } = this.config.engineParameters;
    const boreRadius = (boreSize / 1000) * 2.5;
    
    const boreGroup = new THREE.Group();
    boreGroup.name = 'CylinderBores';
    
    for (let i = 0; i < cylinders; i++) {
        // Create bore geometry with surface finish details
        const boreGeometry = this.getOptimizedGeometry(
            `bore_${boreSize}_${i}`,
            () => new THREE.CylinderGeometry(boreRadius, boreRadius, 3.2, 32, 1, true)
        );
        
        const boreMesh = new THREE.Mesh(boreGeometry, this.materials.get('engineBlock'));
        boreMesh.name = `CylinderBore_${i + 1}`;
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        boreMesh.position.set(position.x, 0, position.z);
        
        if (engineType.startsWith('v')) {
            const bankAngle = this.calculateBankAngle(i);
            boreMesh.rotation.z = bankAngle + Math.PI / 2;
        } else {
            boreMesh.rotation.z = Math.PI / 2;
        }
        
        // Add crosshatch pattern for visualization
        const crosshatchGeom = new THREE.TorusGeometry(boreRadius * 0.98, 0.002, 4, 32);
        for (let j = 0; j < 8; j++) {
            const ring = new THREE.Mesh(crosshatchGeom, this.materials.get('crankshaft'));
            ring.material = ring.material.clone();
            ring.material.color.setHex(0x555555);
            ring.position.y = (j - 3.5) * 0.4;
            boreMesh.add(ring);
        }
        
        this.setupShadows(boreMesh);
        boreGroup.add(boreMesh);
    }
    
    this.components.set('cylinderBores', boreGroup);
    this.config.three.staticComponents.add(boreGroup);
}

createCylinderBores(block, cylinders, engineType, boreSize, blockHeight) {
    try {
        const boreRadius = Math.max(0.4, (boreSize / 1000) * 2.5);
        const boreGeometry = this.getOptimizedGeometry(
            `cylinderBore_${boreSize}`,
            () => new THREE.CylinderGeometry(boreRadius, boreRadius, blockHeight + 0.5, 16, 1, true)
        );
        
        for (let i = 0; i < cylinders; i++) {
            const boreMesh = new THREE.Mesh(boreGeometry, this.materials.get('engineBlock'));
            boreMesh.name = `CylinderBore_${i + 1}`;
            
            const position = this.calculateCylinderPosition(i, cylinders, engineType);
            boreMesh.position.set(position.x, position.y, position.z);
            
            if (engineType.startsWith('v')) {
                const bankAngle = this.calculateBankAngle(i);
                boreMesh.rotation.z = bankAngle + Math.PI / 2;
            } else {
                boreMesh.rotation.z = Math.PI / 2;
            }
            
            // Add cylinder liner
            const linerGeom = new THREE.CylinderGeometry(boreRadius * 1.05, boreRadius * 1.05, blockHeight * 0.9, 16);
            const liner = new THREE.Mesh(linerGeom, this.materials.get('crankshaft'));
            liner.material = liner.material.clone();
            liner.material.opacity = 0.3;
            liner.material.transparent = true;
            liner.position.copy(boreMesh.position);
            liner.rotation.copy(boreMesh.rotation);
            block.add(liner);
            
            block.add(boreMesh);
        }
    } catch (error) {
        console.error('Error creating cylinder bores:', error.message);
    }
}

createWaterJackets() {
    const { cylinders, engineType } = this.config.engineParameters;
    const dimensions = this.calculateEngineDimensions(cylinders, engineType);
    
    const jacketGroup = new THREE.Group();
    jacketGroup.name = 'WaterJackets';
    
    // Create main water jacket around cylinder bores
    for (let i = 0; i < cylinders; i++) {
        const jacketGeometry = this.getOptimizedGeometry(
            `waterJacket_${i}`,
            () => new THREE.CylinderGeometry(0.55, 0.55, 2.8, 16, 1, true)
        );
        
        const jacket = new THREE.Mesh(jacketGeometry, this.materials.get('water'));
        jacket.name = `WaterJacket_${i + 1}`;
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        jacket.position.set(position.x, 0, position.z);
        
        if (engineType.startsWith('v')) {
            const bankAngle = this.calculateBankAngle(i);
            jacket.rotation.z = bankAngle + Math.PI / 2;
        } else {
            jacket.rotation.z = Math.PI / 2;
        }
        
        jacketGroup.add(jacket);
    }
    
    // Create connecting water passages
    const passageGeometry = this.getOptimizedGeometry(
        'waterPassage',
        () => new THREE.CylinderGeometry(0.08, 0.08, dimensions.width, 8)
    );
    
    for (let i = 0; i < 3; i++) {
        const passage = new THREE.Mesh(passageGeometry, this.materials.get('water'));
        passage.position.set(0, (i - 1) * 0.8, 0);
        passage.rotation.z = Math.PI / 2;
        jacketGroup.add(passage);
    }
    
    // Add thermostat housing water jacket
    const thermostatJacketGeom = new THREE.SphereGeometry(0.3, 12, 8);
    const thermostatJacket = new THREE.Mesh(thermostatJacketGeom, this.materials.get('water'));
    thermostatJacket.position.set(dimensions.width * 0.4, 1.5, dimensions.length * 0.3);
    jacketGroup.add(thermostatJacket);
    
    this.addComponentLabel(jacketGroup, 'Water Jackets', [0, 2, 0]);
    this.components.set('waterJackets', jacketGroup);
    this.config.three.staticComponents.add(jacketGroup);
}

createCorePlugs() {
    const { cylinders, engineType } = this.config.engineParameters;
    const dimensions = this.calculateEngineDimensions(cylinders, engineType);
    
    const plugGroup = new THREE.Group();
    plugGroup.name = 'CorePlugs';
    
    const plugGeometry = this.getOptimizedGeometry(
        'corePlug',
        () => new THREE.CylinderGeometry(0.15, 0.15, 0.05, 12)
    );
    
    // Side core plugs
    const sidePlugPositions = [
        [-dimensions.width/2 - 0.1, 0, dimensions.length * 0.3],
        [dimensions.width/2 + 0.1, 0, dimensions.length * 0.3],
        [-dimensions.width/2 - 0.1, 0, -dimensions.length * 0.3],
        [dimensions.width/2 + 0.1, 0, -dimensions.length * 0.3]
    ];
    
    sidePlugPositions.forEach((pos, index) => {
        const plug = new THREE.Mesh(plugGeometry, this.materials.get('crankshaft'));
        plug.name = `CorePlug_Side_${index + 1}`;
        plug.position.set(pos[0], pos[1], pos[2]);
        plug.rotation.z = Math.PI / 2;
        
        // Add sealing ring
        const sealGeom = new THREE.TorusGeometry(0.16, 0.01, 6, 12);
        const seal = new THREE.Mesh(sealGeom, this.materials.get('engineBlock'));
        seal.material = seal.material.clone();
        seal.material.color.setHex(0x000000);
        plug.add(seal);
        
        this.setupShadows(plug);
        plugGroup.add(plug);
    });
    
    // Rear core plugs
    for (let i = 0; i < cylinders; i++) {
        const plug = new THREE.Mesh(plugGeometry, this.materials.get('crankshaft'));
        plug.name = `CorePlug_Rear_${i + 1}`;
        
        const position = this.calculateCylinderPosition(i, cylinders, engineType);
        plug.position.set(position.x, position.y - 0.5, -dimensions.length/2 - 0.05);
        
        // Add sealing ring
        const sealGeom = new THREE.TorusGeometry(0.16, 0.01, 6, 12);
        const seal = new THREE.Mesh(sealGeom, this.materials.get('engineBlock'));
        seal.material = seal.material.clone();
        seal.material.color.setHex(0x000000);
        plug.add(seal);
        
        this.setupShadows(plug);
        plugGroup.add(plug);
    }
    
    this.components.set('corePlugs', plugGroup);
    this.config.three.staticComponents.add(plugGroup);
}

// Calculations
calculateEngineDimensions(cylinders, engineType) {
    // Enhanced validation with type checking
    if (!cylinders || typeof cylinders !== 'number' || cylinders < 1 || cylinders > 16) {
        console.warn('Invalid cylinder count, using default:', cylinders);
        cylinders = 4;
    }
    
    if (!engineType || typeof engineType !== 'string') {
        console.warn('Invalid engine type, using default:', engineType);
        engineType = 'inline';
    }
    
    const baseScale = 1.2;
    let dimensions;
    
    try {
        if (engineType.startsWith('v')) {
            const vAngle = this.config.engineParameters?.vAngle || 60;
            dimensions = {
                width: Math.max(4, (cylinders / 2) * baseScale),
                length: 5.5 + cylinders * 0.1,
                height: 4.5 + Math.sin((vAngle) * Math.PI / 180) * 1.5
            };
        } else {
            dimensions = {
                width: Math.max(4, cylinders * baseScale),
                length: 3.5 + cylinders * 0.08,
                height: 4.5
            };
        }
        
        // Final validation of calculated dimensions
        Object.keys(dimensions).forEach(key => {
            if (typeof dimensions[key] !== 'number' || isNaN(dimensions[key]) || dimensions[key] <= 0) {
                throw new Error(`Invalid ${key} dimension: ${dimensions[key]}`);
            }
        });
        
        return dimensions;
        
    } catch (calcError) {
        console.error('Dimension calculation error:', calcError.message);
        // Return guaranteed safe fallback dimensions
        return {
            width: 4,
            height: 4.5,
            length: 4
        };
    }
}

calculateCylinderPosition(cylinderIndex, totalCylinders, engineType) {
    if (engineType.startsWith('v')) {
        const bank = cylinderIndex % 2;
        const index = Math.floor(cylinderIndex / 2);
        const bankAngle = this.calculateBankAngle(cylinderIndex);
        
        return {
            x: (index - (totalCylinders / 4 - 0.5)) * 1.2,
            y: Math.cos(bankAngle) * 0.5,
            z: Math.sin(bankAngle) * 1.8
        };
    }
    
    return {
        x: (cylinderIndex - (totalCylinders - 1) / 2) * 1.2,
        y: 0,
        z: 0
    };
}

calculateBankAngle(cylinderIndex) {
    const bank = cylinderIndex % 2;
    const vAngle = this.config.engineParameters.vAngle || 60;
    const halfAngle = (vAngle * Math.PI / 180) / 2;
    return bank === 0 ? -halfAngle : halfAngle;
}

// Helper function for generating head bolt patterns
generateHeadBoltPattern(cylinders, engineType) {
    const pattern = [];
    
    for (let i = 0; i < cylinders; i++) {
        const cylinderPos = this.calculateCylinderPosition(i, cylinders, engineType);
        
        // Add bolts around each cylinder (typical 4-bolt pattern per cylinder)
        const boltOffsets = [
            { x: -0.3, z: -0.3 },
            { x: 0.3, z: -0.3 },
            { x: -0.3, z: 0.3 },
            { x: 0.3, z: 0.3 }
        ];
        
        boltOffsets.forEach(offset => {
            pattern.push({
                x: cylinderPos.x + offset.x,
                z: cylinderPos.z + offset.z
            });
        });
    }
    
    return pattern;
}