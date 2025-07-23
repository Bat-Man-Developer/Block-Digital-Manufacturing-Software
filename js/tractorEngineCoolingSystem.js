// Cooling System Components
createRadiator() {
    const radiatorGroup = new THREE.Group();
    radiatorGroup.name = 'Radiator';
    
    // Main radiator body
    const radiatorGeometry = this.getOptimizedGeometry(
        'radiator_body',
        () => new THREE.BoxGeometry(4, 2.5, 0.6, 2, 2, 1)
    );
    const radiatorBody = new THREE.Mesh(radiatorGeometry, this.materials.get('radiator'));
    radiatorBody.name = 'RadiatorBody';
    radiatorBody.position.set(0, 2.5, 6);
    this.setupShadows(radiatorBody);
    
    radiatorGroup.add(radiatorBody);
    
    this.addComponentLabel(radiatorGroup, 'Radiator', [0, 3.5, 0]);
    this.components.set('radiator', radiatorGroup);
    this.config.three.staticComponents.add(radiatorGroup);
}

createRadiatorCore() {
    const coreGroup = new THREE.Group();
    coreGroup.name = 'RadiatorCore';
    
    // Core assembly with tubes and fins
    const tubeGeometry = this.getOptimizedGeometry(
        'radiator_tube',
        () => new THREE.BoxGeometry(3.8, 0.1, 0.5)
    );
    
    for (let i = 0; i < 15; i++) {
        const tube = new THREE.Mesh(tubeGeometry, this.materials.get('radiator'));
        tube.position.y = (i - 7) * 0.15;
        tube.position.set(0, 2.5 + tube.position.y, 6);
        coreGroup.add(tube);
    }
    
    // Radiator fins
    this.createRadiatorFins(coreGroup);
    
    this.components.set('radiatorCore', coreGroup);
    this.config.three.staticComponents.add(coreGroup);
}

createRadiatorTanks() {
    const tanksGroup = new THREE.Group();
    tanksGroup.name = 'RadiatorTanks';
    
    // Upper tank
    const upperTankGeometry = this.getOptimizedGeometry(
        'radiator_upper_tank',
        () => new THREE.BoxGeometry(4.2, 0.4, 0.8)
    );
    const upperTank = new THREE.Mesh(upperTankGeometry, this.materials.get('radiator'));
    upperTank.name = 'UpperRadiatorTank';
    upperTank.position.set(0, 3.8, 6);
    this.setupShadows(upperTank);
    
    // Lower tank
    const lowerTankGeometry = this.getOptimizedGeometry(
        'radiator_lower_tank',
        () => new THREE.BoxGeometry(4.2, 0.4, 0.8)
    );
    const lowerTank = new THREE.Mesh(lowerTankGeometry, this.materials.get('radiator'));
    lowerTank.name = 'LowerRadiatorTank';
    lowerTank.position.set(0, 1.2, 6);
    this.setupShadows(lowerTank);
    
    tanksGroup.add(upperTank, lowerTank);
    
    this.components.set('radiatorTanks', tanksGroup);
    this.config.three.staticComponents.add(tanksGroup);
}

createWaterPump() {
    const pumpGroup = new THREE.Group();
    pumpGroup.name = 'WaterPump';
    
    // Main pump housing
    const pumpHousingGeometry = this.getOptimizedGeometry(
        'water_pump_housing',
        () => new THREE.CylinderGeometry(0.6, 0.6, 0.8, 12, 1)
    );
    const pumpHousing = new THREE.Mesh(pumpHousingGeometry, this.materials.get('radiator'));
    pumpHousing.name = 'WaterPumpHousing';
    pumpHousing.position.set(2, 1, 1);
    pumpHousing.rotation.z = Math.PI / 2;
    this.setupShadows(pumpHousing);
    
    // Pump inlet
    const inletGeometry = this.getOptimizedGeometry(
        'pump_inlet',
        () => new THREE.CylinderGeometry(0.3, 0.3, 0.5, 8, 1)
    );
    const inlet = new THREE.Mesh(inletGeometry, this.materials.get('radiator'));
    inlet.position.set(2, 1, 0.5);
    this.setupShadows(inlet);
    
    // Pump outlet
    const outlet = new THREE.Mesh(inletGeometry, this.materials.get('radiator'));
    outlet.position.set(2.5, 1, 1);
    outlet.rotation.z = Math.PI / 2;
    this.setupShadows(outlet);
    
    pumpGroup.add(pumpHousing, inlet, outlet);
    
    this.addComponentLabel(pumpGroup, 'Water Pump', [0, 1, 0]);
    this.components.set('waterPump', pumpGroup);
    this.config.three.staticComponents.add(pumpGroup);
}

createWaterPumpImpeller() {
    const impellerGroup = new THREE.Group();
    impellerGroup.name = 'WaterPumpImpeller';
    
    // Impeller hub
    const hubGeometry = this.getOptimizedGeometry(
        'impeller_hub',
        () => new THREE.CylinderGeometry(0.15, 0.15, 0.3, 8, 1)
    );
    const hub = new THREE.Mesh(hubGeometry, this.materials.get('crankshaft'));
    hub.rotation.z = Math.PI / 2;
    
    // Impeller blades
    const bladeGeometry = this.getOptimizedGeometry(
        'impeller_blade',
        () => new THREE.BoxGeometry(0.4, 0.05, 0.15)
    );
    
    for (let i = 0; i < 6; i++) {
        const blade = new THREE.Mesh(bladeGeometry, this.materials.get('crankshaft'));
        blade.position.x = 0.2;
        blade.rotation.z = (i / 6) * Math.PI * 2;
        impellerGroup.add(blade);
    }
    
    impellerGroup.add(hub);
    impellerGroup.position.set(2, 1, 1);
    
    this.components.set('waterPumpImpeller', impellerGroup);
    this.config.three.movingComponents.add(impellerGroup);
}

createThermostat() {
    const thermostatGroup = new THREE.Group();
    thermostatGroup.name = 'Thermostat';
    
    // Thermostat body
    const bodyGeometry = this.getOptimizedGeometry(
        'thermostat_body',
        () => new THREE.CylinderGeometry(0.4, 0.4, 0.2, 8, 1)
    );
    const body = new THREE.Mesh(bodyGeometry, this.materials.get('radiator'));
    body.name = 'ThermostatBody';
    
    // Thermostat valve
    const valveGeometry = this.getOptimizedGeometry(
        'thermostat_valve',
        () => new THREE.CylinderGeometry(0.35, 0.35, 0.05, 8, 1)
    );
    const valve = new THREE.Mesh(valveGeometry, this.materials.get('crankshaft'));
    valve.position.y = 0.1;
    
    thermostatGroup.add(body, valve);
    thermostatGroup.position.set(1.5, 2, 1.5);
    
    this.addComponentLabel(thermostatGroup, 'Thermostat', [0, 0.5, 0]);
    this.components.set('thermostat', thermostatGroup);
    this.config.three.staticComponents.add(thermostatGroup);
}

createThermostatHousing() {
    const housingGroup = new THREE.Group();
    housingGroup.name = 'ThermostatHousing';
    
    // Housing body
    const housingGeometry = this.getOptimizedGeometry(
        'thermostat_housing',
        () => new THREE.BoxGeometry(0.8, 0.6, 0.8)
    );
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('radiator'));
    housing.name = 'ThermostatHousing';
    housing.position.set(1.5, 2, 1.5);
    this.setupShadows(housing);
    
    // Housing cover
    const coverGeometry = this.getOptimizedGeometry(
        'thermostat_cover',
        () => new THREE.CylinderGeometry(0.45, 0.45, 0.1, 8, 1)
    );
    const cover = new THREE.Mesh(coverGeometry, this.materials.get('radiator'));
    cover.position.set(1.5, 2.4, 1.5);
    this.setupShadows(cover);
    
    housingGroup.add(housing, cover);
    
    this.components.set('thermostatHousing', housingGroup);
    this.config.three.staticComponents.add(housingGroup);
}

createCoolingFan() {
    const fanGroup = new THREE.Group();
    fanGroup.name = 'CoolingFan';
    
    // Fan hub
    const hubGeometry = this.getOptimizedGeometry(
        'fan_hub',
        () => new THREE.CylinderGeometry(0.3, 0.3, 0.15, 8, 1)
    );
    const hub = new THREE.Mesh(hubGeometry, this.materials.get('alternator'));
    hub.name = 'FanHub';
    
    // Fan blades
    const bladeGeometry = this.getOptimizedGeometry(
        'fan_blade',
        () => {
            const shape = new THREE.Shape();
            shape.moveTo(0, 0);
            shape.lineTo(1.2, 0.1);
            shape.lineTo(1.4, 0.3);
            shape.lineTo(0.2, 0.2);
            shape.closePath();
            
            const extrudeSettings = {
                steps: 1,
                depth: 0.05,
                bevelEnabled: false
            };
            
            return new THREE.ExtrudeGeometry(shape, extrudeSettings);
        }
    );
    
    for (let i = 0; i < 6; i++) {
        const blade = new THREE.Mesh(bladeGeometry, this.materials.get('alternator'));
        blade.rotation.z = (i / 6) * Math.PI * 2;
        blade.position.z = -0.025;
        fanGroup.add(blade);
    }
    
    fanGroup.add(hub);
    fanGroup.position.set(0, 2.5, 5.2);
    
    this.components.set('coolingFan', fanGroup);
    this.config.three.movingComponents.add(fanGroup);
    
    // Store for animation
    if (!this.config.three.coolingFans) this.config.three.coolingFans = [];
    this.config.three.coolingFans.push(fanGroup);
}

createFanClutch() {
    const clutchGroup = new THREE.Group();
    clutchGroup.name = 'FanClutch';
    
    // Clutch housing
    const housingGeometry = this.getOptimizedGeometry(
        'fan_clutch_housing',
        () => new THREE.CylinderGeometry(0.4, 0.4, 0.3, 12, 1)
    );
    const housing = new THREE.Mesh(housingGeometry, this.materials.get('alternator'));
    housing.name = 'FanClutchHousing';
    housing.position.set(0, 2.5, 4.8);
    this.setupShadows(housing);
    
    // Clutch plates
    const plateGeometry = this.getOptimizedGeometry(
        'clutch_plate',
        () => new THREE.CylinderGeometry(0.35, 0.35, 0.05, 12, 1)
    );
    
    for (let i = 0; i < 3; i++) {
        const plate = new THREE.Mesh(plateGeometry, this.materials.get('crankshaft'));
        plate.position.set(0, 2.5, 4.8 + (i - 1) * 0.08);
        clutchGroup.add(plate);
    }
    
    clutchGroup.add(housing);
    
    this.components.set('fanClutch', clutchGroup);
    this.config.three.staticComponents.add(clutchGroup);
}

createFanHub() {
    const hubGroup = new THREE.Group();
    hubGroup.name = 'FanHub';
    
    // Main hub
    const hubGeometry = this.getOptimizedGeometry(
        'fan_main_hub',
        () => new THREE.CylinderGeometry(0.25, 0.25, 0.2, 8, 1)
    );
    const hub = new THREE.Mesh(hubGeometry, this.materials.get('alternator'));
    hub.position.set(0, 2.5, 5.0);
    this.setupShadows(hub);
    
    // Hub bolts
    const boltGeometry = this.getOptimizedGeometry(
        'hub_bolt',
        () => new THREE.CylinderGeometry(0.03, 0.03, 0.15, 6, 1)
    );
    
    for (let i = 0; i < 4; i++) {
        const bolt = new THREE.Mesh(boltGeometry, this.materials.get('crankshaft'));
        const angle = (i / 4) * Math.PI * 2;
        bolt.position.set(
            Math.cos(angle) * 0.15,
            2.5,
            5.0 + Math.sin(angle) * 0.15
        );
        hubGroup.add(bolt);
    }
    
    hubGroup.add(hub);
    
    this.components.set('fanHub', hubGroup);
    this.config.three.staticComponents.add(hubGroup);
}

createFanShroud() {
    const shroudGroup = new THREE.Group();
    shroudGroup.name = 'FanShroud';
    
    // Main shroud body
    const shroudGeometry = this.getOptimizedGeometry(
        'fan_shroud',
        () => {
            const shape = new THREE.Shape();
            shape.absarc(0, 0, 2.5, 0, Math.PI * 2, false);
            
            const hole = new THREE.Path();
            hole.absarc(0, 0, 1.6, 0, Math.PI * 2, true);
            shape.holes.push(hole);
            
            const extrudeSettings = {
                steps: 1,
                depth: 0.2,
                bevelEnabled: false
            };
            
            return new THREE.ExtrudeGeometry(shape, extrudeSettings);
        }
    );
    
    const shroud = new THREE.Mesh(shroudGeometry, this.materials.get('engineBlock'));
    shroud.position.set(0, 2.5, 4.5);
    shroud.rotation.x = Math.PI / 2;
    this.setupShadows(shroud);
    
    // Mounting brackets
    const bracketGeometry = this.getOptimizedGeometry(
        'shroud_bracket',
        () => new THREE.BoxGeometry(0.3, 0.8, 0.1)
    );
    
    for (let i = 0; i < 4; i++) {
        const bracket = new THREE.Mesh(bracketGeometry, this.materials.get('engineBlock'));
        const angle = (i / 4) * Math.PI * 2;
        bracket.position.set(
            Math.cos(angle) * 2.2,
            2.5,
            4.5
        );
        shroudGroup.add(bracket);
    }
    
    shroudGroup.add(shroud);
    
    this.addComponentLabel(shroudGroup, 'Fan Shroud', [0, 1, 0]);
    this.components.set('fanShroud', shroudGroup);
    this.config.three.staticComponents.add(shroudGroup);
}

createUpperRadiatorHose() {
    const hoseGroup = new THREE.Group();
    hoseGroup.name = 'UpperRadiatorHose';
    
    // Create curved hose path
    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(1.5, 2.2, 1.5), // Thermostat housing
        new THREE.Vector3(0.5, 2.8, 3.0),  // Mid point
        new THREE.Vector3(0, 3.5, 5.8)     // Upper radiator tank
    ]);
    
    const tubeGeometry = this.getOptimizedGeometry(
        'upper_radiator_hose',
        () => new THREE.TubeGeometry(curve, 20, 0.15, 8, false)
    );
    
    const hose = new THREE.Mesh(tubeGeometry, this.materials.get('coolantHose'));
    hose.name = 'UpperRadiatorHose';
    this.setupShadows(hose);
    
    // Hose clamps
    const clampGeometry = this.getOptimizedGeometry(
        'hose_clamp',
        () => new THREE.CylinderGeometry(0.18, 0.18, 0.1, 8, 1)
    );
    
    const clamp1 = new THREE.Mesh(clampGeometry, this.materials.get('crankshaft'));
    clamp1.position.set(1.5, 2.2, 1.5);
    
    const clamp2 = new THREE.Mesh(clampGeometry, this.materials.get('crankshaft'));
    clamp2.position.set(0, 3.5, 5.8);
    
    hoseGroup.add(hose, clamp1, clamp2);
    
    this.addComponentLabel(hoseGroup, 'Upper Radiator Hose', [0, 1, 0]);
    this.components.set('upperRadiatorHose', hoseGroup);
    this.config.three.staticComponents.add(hoseGroup);
}

createLowerRadiatorHose() {
    const hoseGroup = new THREE.Group();
    hoseGroup.name = 'LowerRadiatorHose';
    
    // Create curved hose path
    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(2, 1.2, 1),      // Water pump
        new THREE.Vector3(1, 0.8, 3.5),    // Mid point
        new THREE.Vector3(0, 1.2, 5.8)     // Lower radiator tank
    ]);
    
    const tubeGeometry = this.getOptimizedGeometry(
        'lower_radiator_hose',
        () => new THREE.TubeGeometry(curve, 20, 0.15, 8, false)
    );
    
    const hose = new THREE.Mesh(tubeGeometry, this.materials.get('coolantHose'));
    hose.name = 'LowerRadiatorHose';
    this.setupShadows(hose);
    
    // Hose clamps
    const clampGeometry = this.getOptimizedGeometry(
        'hose_clamp',
        () => new THREE.CylinderGeometry(0.18, 0.18, 0.1, 8, 1)
    );
    
    const clamp1 = new THREE.Mesh(clampGeometry, this.materials.get('crankshaft'));
    clamp1.position.set(2, 1.2, 1);
    
    const clamp2 = new THREE.Mesh(clampGeometry, this.materials.get('crankshaft'));
    clamp2.position.set(0, 1.2, 5.8);
    
    hoseGroup.add(hose, clamp1, clamp2);
    
    this.addComponentLabel(hoseGroup, 'Lower Radiator Hose', [0, 1, 0]);
    this.components.set('lowerRadiatorHose', hoseGroup);
    this.config.three.staticComponents.add(hoseGroup);
}

createHeaterHoses() {
    const hosesGroup = new THREE.Group();
    hosesGroup.name = 'HeaterHoses';
    
    // Heater supply hose
    const supplyCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(1, 1.8, 0.5),
        new THREE.Vector3(-1, 2.2, -1),
        new THREE.Vector3(-2.5, 2.5, -2)
    ]);
    
    const supplyGeometry = this.getOptimizedGeometry(
        'heater_supply_hose',
        () => new THREE.TubeGeometry(supplyCurve, 15, 0.08, 6, false)
    );
    
    const supplyHose = new THREE.Mesh(supplyGeometry, this.materials.get('coolantHose'));
    supplyHose.name = 'HeaterSupplyHose';
    
    // Heater return hose
    const returnCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.5, 2.2, -2),
        new THREE.Vector3(-1.5, 1.8, -1),
        new THREE.Vector3(1.2, 1.5, 0.5)
    ]);
    
    const returnGeometry = this.getOptimizedGeometry(
        'heater_return_hose',
        () => new THREE.TubeGeometry(returnCurve, 15, 0.08, 6, false)
    );
    
    const returnHose = new THREE.Mesh(returnGeometry, this.materials.get('coolantHose'));
    returnHose.name = 'HeaterReturnHose';
    
    hosesGroup.add(supplyHose, returnHose);
    
    this.addComponentLabel(hosesGroup, 'Heater Hoses', [0, 1, 0]);
    this.components.set('heaterHoses', hosesGroup);
    this.config.three.staticComponents.add(hosesGroup);
}

createBypassHose() {
    const hoseGroup = new THREE.Group();
    hoseGroup.name = 'BypassHose';
    
    // Create bypass hose
    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(1.8, 1.8, 1.2),
        new THREE.Vector3(1.6, 2.0, 1.4),
        new THREE.Vector3(1.4, 2.0, 1.6)
    ]);
    
    const tubeGeometry = this.getOptimizedGeometry(
        'bypass_hose',
        () => new THREE.TubeGeometry(curve, 10, 0.06, 6, false)
    );
    
    const hose = new THREE.Mesh(tubeGeometry, this.materials.get('coolantHose'));
    hose.name = 'BypassHose';
    this.setupShadows(hose);
    
    hoseGroup.add(hose);
    
    this.components.set('bypassHose', hoseGroup);
    this.config.three.staticComponents.add(hoseGroup);
}

createHeaterCore() {
    const coreGroup = new THREE.Group();
    coreGroup.name = 'HeaterCore';
    
    // Heater core body
    const coreGeometry = this.getOptimizedGeometry(
        'heater_core',
        () => new THREE.BoxGeometry(1.5, 1, 0.3)
    );
    const core = new THREE.Mesh(coreGeometry, this.materials.get('radiator'));
    core.position.set(-2.5, 2.5, -2);
    this.setupShadows(core);
    
    // Heater core fins
    const finGeometry = this.getOptimizedGeometry(
        'heater_core_fin',
        () => new THREE.PlaneGeometry(1.4, 0.9)
    );
    
    for (let i = 0; i < 6; i++) {
        const fin = new THREE.Mesh(finGeometry, this.materials.get('radiator'));
        fin.position.set(-2.5, 2.5, -2 + (i - 2.5) * 0.05);
        fin.material = fin.material.clone();
        fin.material.opacity = 0.7;
        fin.material.transparent = true;
        coreGroup.add(fin);
    }
    
    coreGroup.add(core);
    
    this.addComponentLabel(coreGroup, 'Heater Core', [0, 1, 0]);
    this.components.set('heaterCore', coreGroup);
    this.config.three.staticComponents.add(coreGroup);
}

createExpansionTank() {
    const tankGroup = new THREE.Group();
    tankGroup.name = 'ExpansionTank';
    
    // Tank body
    const tankGeometry = this.getOptimizedGeometry(
        'expansion_tank',
        () => new THREE.CylinderGeometry(0.3, 0.3, 0.8, 8, 1)
    );
    const tank = new THREE.Mesh(tankGeometry, this.materials.get('engineBlock'));
    tank.position.set(3, 3, 4);
    this.setupShadows(tank);
    
    // Tank cap
    const capGeometry = this.getOptimizedGeometry(
        'expansion_tank_cap',
        () => new THREE.CylinderGeometry(0.15, 0.15, 0.1, 8, 1)
    );
    const cap = new THREE.Mesh(capGeometry, this.materials.get('engineBlock'));
    cap.position.set(3, 3.5, 4);
    this.setupShadows(cap);
    
    // Level indicator
    const indicatorGeometry = this.getOptimizedGeometry(
        'level_indicator',
        () => new THREE.PlaneGeometry(0.5, 0.6)
    );
    const indicator = new THREE.Mesh(indicatorGeometry, this.materials.get('sparkPlug'));
    indicator.position.set(3.31, 3, 4);
    indicator.rotation.y = Math.PI / 2;
    
    tankGroup.add(tank, cap, indicator);
    
    this.addComponentLabel(tankGroup, 'Expansion Tank', [0, 1, 0]);
    this.components.set('expansionTank', tankGroup);
    this.config.three.staticComponents.add(tankGroup);
}

createOverflowTank() {
    const tankGroup = new THREE.Group();
    tankGroup.name = 'OverflowTank';
    
    // Tank body
    const tankGeometry = this.getOptimizedGeometry(
        'overflow_tank',
        () => new THREE.BoxGeometry(0.6, 0.8, 0.3)
    );
    const tank = new THREE.Mesh(tankGeometry, this.materials.get('sparkPlug'));
    tank.material = tank.material.clone();
    tank.material.transparent = true;
    tank.material.opacity = 0.7;
    tank.position.set(3.5, 2.5, 5);
    this.setupShadows(tank);
    
    // Overflow tube
    const tubeGeometry = this.getOptimizedGeometry(
        'overflow_tube',
        () => new THREE.CylinderGeometry(0.02, 0.02, 0.5, 6, 1)
    );
    const tube = new THREE.Mesh(tubeGeometry, this.materials.get('engineBlock'));
    tube.position.set(3.5, 2.1, 5);
    
    tankGroup.add(tank, tube);
    
    this.components.set('overflowTank', tankGroup);
    this.config.three.staticComponents.add(tankGroup);
}

createRadiatorCap() {
    const capGroup = new THREE.Group();
    capGroup.name = 'RadiatorCap';
    
    // Cap body
    const capGeometry = this.getOptimizedGeometry(
        'radiator_cap',
        () => new THREE.CylinderGeometry(0.25, 0.25, 0.15, 8, 1)
    );
    const cap = new THREE.Mesh(capGeometry, this.materials.get('engineBlock'));
    cap.position.set(0, 4.1, 6);
    this.setupShadows(cap);
    
    // Cap handle
    const handleGeometry = this.getOptimizedGeometry(
        'cap_handle',
        () => new THREE.BoxGeometry(0.4, 0.05, 0.1)
    );
    const handle = new THREE.Mesh(handleGeometry, this.materials.get('engineBlock'));
    handle.position.set(0, 4.2, 6);
    
    capGroup.add(cap, handle);
    
    this.components.set('radiatorCap', capGroup);
    this.config.three.staticComponents.add(capGroup);
}

createTemperatureSensor() {
    const sensorGroup = new THREE.Group();
    sensorGroup.name = 'TemperatureSensor';
    
    // Sensor body
    const sensorGeometry = this.getOptimizedGeometry(
        'temperature_sensor',
        () => new THREE.CylinderGeometry(0.08, 0.08, 0.3, 6, 1)
    );
    const sensor = new THREE.Mesh(sensorGeometry, this.materials.get('crankshaft'));
    sensor.position.set(1.8, 2.2, 1.8);
    sensor.rotation.x = Math.PI / 4;
    this.setupShadows(sensor);
    
    // Sensor connector
    const connectorGeometry = this.getOptimizedGeometry(
        'sensor_connector',
        () => new THREE.BoxGeometry(0.12, 0.08, 0.15)
    );
    const connector = new THREE.Mesh(connectorGeometry, this.materials.get('engineBlock'));
    connector.position.set(1.8, 2.4, 1.9);
    
    sensorGroup.add(sensor, connector);
    
    this.components.set('temperatureSensor', sensorGroup);
    this.config.three.staticComponents.add(sensorGroup);
}

createCoolantTemperatureSwitch() {
    const switchGroup = new THREE.Group();
    switchGroup.name = 'CoolantTemperatureSwitch';
    
    // Switch body
    const switchGeometry = this.getOptimizedGeometry(
        'coolant_temp_switch',
        () => new THREE.CylinderGeometry(0.06, 0.06, 0.25, 6, 1)
    );
    const tempSwitch = new THREE.Mesh(switchGeometry, this.materials.get('crankshaft'));
    tempSwitch.position.set(1.6, 2.0, 1.6);
    tempSwitch.rotation.x = Math.PI / 6;
    this.setupShadows(tempSwitch);
    
    switchGroup.add(tempSwitch);
    
    this.components.set('coolantTemperatureSwitch', switchGroup);
    this.config.three.staticComponents.add(switchGroup);
}

createCoolantLevelSensor() {
    const sensorGroup = new THREE.Group();
    sensorGroup.name = 'CoolantLevelSensor';
    
    // Sensor probe
    const probeGeometry = this.getOptimizedGeometry(
        'coolant_level_sensor',
        () => new THREE.CylinderGeometry(0.04, 0.04, 0.4, 6, 1)
    );
    const probe = new THREE.Mesh(probeGeometry, this.materials.get('crankshaft'));
    probe.position.set(3, 3.2, 4);
    this.setupShadows(probe);
    
    sensorGroup.add(probe);
    
    this.components.set('coolantLevelSensor', sensorGroup);
    this.config.three.staticComponents.add(sensorGroup);
}

createBlockHeater() {
    const heaterGroup = new THREE.Group();
    heaterGroup.name = 'BlockHeater';
    
    // Heater element
    const heaterGeometry = this.getOptimizedGeometry(
        'block_heater',
        () => new THREE.CylinderGeometry(0.15, 0.15, 0.4, 8, 1)
    );
    const heater = new THREE.Mesh(heaterGeometry, this.materials.get('engineBlock'));
    heater.position.set(-2, 0.5, 0);
    heater.rotation.z = Math.PI / 2;
    this.setupShadows(heater);
    
    // Power cord
    const cordCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.2, 0.5, 0),
        new THREE.Vector3(-3, 0.8, -0.5),
        new THREE.Vector3(-4, 1.2, -1)
    ]);
    
    const cordGeometry = this.getOptimizedGeometry(
        'heater_cord',
        () => new THREE.TubeGeometry(cordCurve, 10, 0.03, 6, false)
    );
    
    const cord = new THREE.Mesh(cordGeometry, this.materials.get('wire'));
    
    heaterGroup.add(heater, cord);
    
    this.addComponentLabel(heaterGroup, 'Block Heater', [0, 0.5, 0]);
    this.components.set('blockHeater', heaterGroup);
    this.config.three.staticComponents.add(heaterGroup);
}