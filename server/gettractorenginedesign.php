<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Enhanced material properties database
    $block_materials = [
        'gray_iron' => [
            'density' => 7200, 'tensile_strength' => 250, 'elastic_modulus' => 110,
            'thermal_conductivity' => 46, 'thermal_expansion' => 11.7, 'cost_factor' => 1.0,
            'name' => 'Gray Cast Iron', 'machinability' => 0.9, 'thermal_fatigue' => 0.7
        ],
        'ductile_iron' => [
            'density' => 7100, 'tensile_strength' => 400, 'elastic_modulus' => 169,
            'thermal_conductivity' => 36, 'thermal_expansion' => 12.0, 'cost_factor' => 1.3,
            'name' => 'Ductile Iron', 'machinability' => 0.8, 'thermal_fatigue' => 0.8
        ],
        'compacted_graphite' => [
            'density' => 7300, 'tensile_strength' => 450, 'elastic_modulus' => 145,
            'thermal_conductivity' => 36, 'thermal_expansion' => 12.5, 'cost_factor' => 1.4,
            'name' => 'Compacted Graphite Iron', 'machinability' => 0.6, 'thermal_fatigue' => 0.9
        ],
        'aluminum_alloy' => [
            'density' => 2700, 'tensile_strength' => 280, 'elastic_modulus' => 71,
            'thermal_conductivity' => 151, 'thermal_expansion' => 23.6, 'cost_factor' => 1.8,
            'name' => 'Aluminum Alloy', 'machinability' => 0.95, 'thermal_fatigue' => 0.6
        ],
        'vermicular_iron' => [
            'density' => 7250, 'tensile_strength' => 500, 'elastic_modulus' => 155,
            'thermal_conductivity' => 40, 'thermal_expansion' => 12.2, 'cost_factor' => 1.6,
            'name' => 'Vermicular Iron', 'machinability' => 0.65, 'thermal_fatigue' => 0.95
        ]
    ];

    $head_materials = [
        'gray_iron' => ['density' => 7200, 'thermal_conductivity' => 46, 'cost_factor' => 1.0],
        'aluminum_alloy' => ['density' => 2700, 'thermal_conductivity' => 151, 'cost_factor' => 1.6],
        'ductile_iron' => ['density' => 7100, 'thermal_conductivity' => 36, 'cost_factor' => 1.2]
    ];

    // Engine configuration database
    $config_factors = [
        'inline_3' => ['cylinders' => 3, 'length_factor' => 0.75, 'balance_factor' => 0.7, 'cost_factor' => 0.8],
        'inline_4' => ['cylinders' => 4, 'length_factor' => 1.0, 'balance_factor' => 0.85, 'cost_factor' => 1.0],
        'inline_6' => ['cylinders' => 6, 'length_factor' => 1.5, 'balance_factor' => 0.95, 'cost_factor' => 1.4],
        'v6' => ['cylinders' => 6, 'length_factor' => 0.8, 'balance_factor' => 0.9, 'cost_factor' => 1.6],
        'v8' => ['cylinders' => 8, 'length_factor' => 0.9, 'balance_factor' => 0.95, 'cost_factor' => 2.0]
    ];

    // Turbocharging systems
    $turbo_systems = [
        'naturally_aspirated' => ['boost_factor' => 1.0, 'efficiency_gain' => 1.0, 'cost' => 0, 'power_factor' => 1.0],
        'turbocharged' => ['boost_factor' => 1.8, 'efficiency_gain' => 1.05, 'cost' => 2500, 'power_factor' => 1.4],
        'turbocharged_intercooled' => ['boost_factor' => 2.0, 'efficiency_gain' => 1.1, 'cost' => 3500, 'power_factor' => 1.6],
        'variable_geometry' => ['boost_factor' => 2.2, 'efficiency_gain' => 1.15, 'cost' => 4500, 'power_factor' => 1.7],
        'two_stage' => ['boost_factor' => 2.5, 'efficiency_gain' => 1.2, 'cost' => 6500, 'power_factor' => 1.9]
    ];

    // Fuel properties database
    $fuel_properties = [
        'diesel' => ['lhv' => 43.0, 'density' => 0.84, 'base_efficiency' => 0.42, 'cost_factor' => 1.0, 'carbon_factor' => 2.68],
        'biodiesel_b20' => ['lhv' => 42.2, 'density' => 0.86, 'base_efficiency' => 0.41, 'cost_factor' => 1.1, 'carbon_factor' => 2.45],
        'biodiesel_b100' => ['lhv' => 38.0, 'density' => 0.88, 'base_efficiency' => 0.40, 'cost_factor' => 1.3, 'carbon_factor' => 0.0],
        'renewable_diesel' => ['lhv' => 43.1, 'density' => 0.78, 'base_efficiency' => 0.42, 'cost_factor' => 1.2, 'carbon_factor' => 0.2],
        'natural_gas' => ['lhv' => 50.0, 'density' => 0.75, 'base_efficiency' => 0.38, 'cost_factor' => 0.7, 'carbon_factor' => 2.25],
        'propane' => ['lhv' => 46.0, 'density' => 0.51, 'base_efficiency' => 0.36, 'cost_factor' => 0.9, 'carbon_factor' => 2.98]
    ];

    // Emission standards and aftertreatment
    $emission_standards = [
        'tier_3' => ['nox_limit' => 6.4, 'pm_limit' => 0.3, 'aftertreatment_cost' => 500],
        'tier_4_interim' => ['nox_limit' => 2.0, 'pm_limit' => 0.02, 'aftertreatment_cost' => 2500],
        'tier_4_final' => ['nox_limit' => 0.4, 'pm_limit' => 0.02, 'aftertreatment_cost' => 5000],
        'stage_v' => ['nox_limit' => 0.4, 'pm_limit' => 0.015, 'aftertreatment_cost' => 6000],
        'china_iv' => ['nox_limit' => 2.0, 'pm_limit' => 0.025, 'aftertreatment_cost' => 3000]
    ];

    $aftertreatment_systems = [
        'none' => ['nox_reduction' => 0, 'pm_reduction' => 0, 'cost' => 0],
        'doc_dpf' => ['nox_reduction' => 0, 'pm_reduction' => 95, 'cost' => 2500],
        'scr_system' => ['nox_reduction' => 90, 'pm_reduction' => 95, 'cost' => 5000],
        'integrated_scr' => ['nox_reduction' => 95, 'pm_reduction' => 98, 'cost' => 6500]
    ];

    // Get all input values
    $engine_type = $_POST['engine_type'];
    $application_type = $_POST['application_type'];
    $duty_cycle = $_POST['duty_cycle'];
    $block_material = $_POST['block_material'];
    $head_material = $_POST['head_material'];
    $liner_type = $_POST['liner_type'];
    $bore_diameter = $_POST['bore_diameter'] / 1000; // Convert to meters
    $stroke_length = $_POST['stroke_length'] / 1000;
    $compression_ratio = $_POST['compression_ratio'];
    $cylinder_wall_thickness = $_POST['cylinder_wall_thickness'] / 1000;
    $target_power = $_POST['target_power'];
    $target_torque = $_POST['target_torque'];
    $rated_rpm = $_POST['rated_rpm'];
    $max_rpm = $_POST['max_rpm'];
    $torque_rise = $_POST['torque_rise'];
    $fuel_type = $_POST['fuel_type'];
    $emission_standard = $_POST['emission_standard'];
    $aftertreatment = $_POST['aftertreatment'];
    $turbocharging = $_POST['turbocharging'];
    $boost_pressure = $_POST['boost_pressure'];
    $egr_rate = $_POST['egr_rate'];
    $operating_temperature = $_POST['operating_temperature'];
    $oil_temperature = $_POST['oil_temperature'];
    $ambient_temperature = $_POST['ambient_temperature'];
    $altitude = $_POST['altitude'];
    $cooling_system = $_POST['cooling_system'];
    $radiator_efficiency = $_POST['radiator_efficiency'];

    // Derived parameters
    $num_cylinders = $config_factors[$engine_type]['cylinders'];
    $block_props = $block_materials[$block_material];
    $head_props = $head_materials[$head_material];
    $turbo_props = $turbo_systems[$turbocharging];
    $fuel_props = $fuel_properties[$fuel_type];
    $emission_props = $emission_standards[$emission_standard];
    $aftertreatment_props = $aftertreatment_systems[$aftertreatment];

    // Basic engine geometry calculations
    $cylinder_volume = (pi() * pow($bore_diameter, 2) * $stroke_length) / 4; // m³
    $displacement = $cylinder_volume * $num_cylinders; // m³
    $displacement_cc = $displacement * 1000000; // cc
    $displacement_liters = $displacement_cc / 1000; // liters
    $swept_volume_per_cylinder = $displacement_liters / $num_cylinders;
    $bore_stroke_ratio = $bore_diameter / $stroke_length;

    // Calculate mean piston speed
    $mean_piston_speed = ($stroke_length * $rated_rpm * 2) / 60; // m/s

    // Power density and specific power calculations
    $actual_power = $target_power * $turbo_props['power_factor'];
    $power_density = $actual_power / $displacement_liters; // HP/L
    
    // Engine weight estimation
    $block_volume = $displacement * 2.5; // Estimated block volume factor
    $head_volume = $displacement * 0.8; // Estimated head volume factor
    $block_weight = $block_volume * $block_props['density'];
    $head_weight = $head_volume * $head_props['density'];
    $auxiliary_weight = 50 + ($num_cylinders * 15); // Estimated auxiliary components
    $total_engine_weight = $block_weight + $head_weight + $auxiliary_weight;
    $specific_power = ($actual_power * 0.746) / $total_engine_weight; // kW/kg

    // Calculate BMEP
    $power_watts = $actual_power * 745.7;
    $bmep = ($power_watts * 60) / ($displacement * $rated_rpm * ($num_cylinders / 2));
    $bmep_bar = $bmep / 100000;

    // Thermal efficiency calculations
    $altitude_derating = 1 - ($altitude / 300) * 0.03; // 3% per 300m
    $ambient_derating = 1 - (max(0, $ambient_temperature - 25) / 10) * 0.04; // 4% per 10°C above 25°C
    $compression_factor = 1 + (($compression_ratio - 16) * 0.015); // Efficiency improvement with CR
    $turbo_efficiency = $turbo_props['efficiency_gain'];
    
    $thermal_efficiency = $fuel_props['base_efficiency'] * $compression_factor * 
                         $turbo_efficiency * $altitude_derating * $ambient_derating;

    // BSFC calculation
    $bsfc = (3600 * $fuel_props['density']) / ($fuel_props['lhv'] * $thermal_efficiency); // g/kWh

    // Pressure calculations
    $atmospheric_pressure = 101325 * pow((1 - 0.0065 * $altitude / 288.15), 5.255); // Altitude correction
    $boost_pressure_abs = $atmospheric_pressure + ($boost_pressure * 100000);
    $peak_cylinder_pressure = $boost_pressure_abs * $compression_ratio * 1.8; // Combustion factor
    $peak_pressure_bar = $peak_cylinder_pressure / 100000;

    // Stress analysis
    $hoop_stress = ($peak_cylinder_pressure * $bore_diameter) / (2 * $cylinder_wall_thickness);
    $hoop_stress_mpa = $hoop_stress / 1000000;
    
    $temp_difference = $operating_temperature - 20;
    $thermal_stress = $block_props['elastic_modulus'] * 1e9 * 
                     $block_props['thermal_expansion'] * 1e-6 * $temp_difference;
    $thermal_stress_mpa = $thermal_stress / 1000000;
    
    $combined_stress = $hoop_stress + $thermal_stress;
    $combined_stress_mpa = $combined_stress / 1000000;
    $safety_factor = ($block_props['tensile_strength'] * 1e6) / $combined_stress;

    // Fatigue life calculation (simplified)
    $stress_amplitude = $combined_stress * 0.4; // Alternating stress component
    $fatigue_strength = $block_props['tensile_strength'] * 1e6 * 0.35;
    $fatigue_life = pow(($fatigue_strength / $stress_amplitude), 4) / 1000000; // Million cycles

    // Heat balance calculations
    $fuel_power = $power_watts / $thermal_efficiency; // Total fuel energy
    $heat_to_coolant = $fuel_power * 0.25; // Typical 25% to coolant
    $heat_to_exhaust = $fuel_power * 0.35; // Typical 35% to exhaust
    $heat_to_oil = $fuel_power * 0.05; // Typical 5% to oil
    $radiation_loss = $fuel_power * 0.05; // Typical 5% radiation

    // Temperature calculations
    $exhaust_temperature = 350 + ($operating_temperature - 90) * 8 + 
                          ($turbocharging == 'naturally_aspirated' ? 0 : 80);
    $egt_at_load = $exhaust_temperature + ($boost_pressure * 50); // Load effect

    // Performance calculations
    $torque_at_rated = ($power_watts * 60) / (2 * pi() * $rated_rpm);
    $peak_torque_rpm = $rated_rpm * 0.75; // Typical peak torque RPM
    $actual_peak_torque = $torque_at_rated * (1 + $torque_rise / 100);

    // Air flow calculations
    $volumetric_efficiency = 0.85 + ($boost_pressure / 10); // Estimate
    $air_density = 1.225 * ($atmospheric_pressure / 101325) * (288.15 / ($ambient_temperature + 273.15));
    $air_flow_rate = ($displacement * $rated_rpm * $volumetric_efficiency * $air_density) / 120; // kg/h

    // Emissions calculations
    $base_nox = 8.0; // g/kWh baseline
    $base_pm = 0.4; // g/kWh baseline
    $base_co = 3.0; // g/kWh baseline
    $base_hc = 1.0; // g/kWh baseline

    $nox_reduction = $aftertreatment_props['nox_reduction'] / 100;
    $pm_reduction = $aftertreatment_props['pm_reduction'] / 100;
    
    $actual_nox = $base_nox * (1 - $nox_reduction) * (1 - $egr_rate / 100 * 0.6);
    $actual_pm = $base_pm * (1 - $pm_reduction);
    $actual_co = $base_co * 0.8; // Typical reduction with modern combustion
    $actual_hc = $base_hc * 0.7;
    $co2_emissions = $fuel_props['carbon_factor'] * $bsfc / 1000; // kg CO2/kWh

    // Cost analysis
    $base_material_cost = $block_weight * $block_props['cost_factor'] * 8; // $/kg
    $head_material_cost = $head_weight * $head_props['cost_factor'] * 12;
    $crankshaft_cost = $num_cylinders * 150 + ($displacement_liters * 50);
    $turbo_cost = $turbo_props['cost'];
    $aftertreatment_cost = $aftertreatment_props['cost'];
    $emission_compliance_cost = $emission_props['aftertreatment_cost'];

    $total_material_cost = $base_material_cost + $head_material_cost + $crankshaft_cost;
    $manufacturing_cost = $total_material_cost * 1.2 + ($num_cylinders * 200);
    $assembly_cost = $total_material_cost * 0.3 + ($num_cylinders * 50);
    $total_base_cost = $total_material_cost + $manufacturing_cost + $assembly_cost;
    $total_engine_cost = $total_base_cost + $turbo_cost + $aftertreatment_cost + $emission_compliance_cost;

    // Component cost breakdown
    $block_total = $base_material_cost * 1.5;
    $head_total = $head_material_cost * 1.8;
    $crank_total = $crankshaft_cost * 1.3;
    $turbo_total = $turbo_cost * 1.1;
    $aftertreatment_total = ($aftertreatment_cost + $emission_compliance_cost) * 1.05;

    // Durability and service life
    $duty_factors = ['light' => 1.5, 'medium' => 1.0, 'heavy' => 0.7, 'continuous' => 0.5];
    $base_life = 15000; // Base design life in hours
    $design_life = $base_life * $duty_factors[$duty_cycle] * $block_props['thermal_fatigue'];

    // Torque specifications
    $main_bearing_torque = ($bore_diameter * 1000) * 0.9; // Nm
    $rod_bolt_torque = ($bore_diameter * 1000) * 0.6;
    $head_bolt_torque = ($bore_diameter * 1000) * 1.1;
    $flywheel_torque = $actual_peak_torque * 0.8;
    $oil_pan_torque = 25; // Standard

    // Generate recommendations
    $recommendations = [];
    
    if ($safety_factor < 2.0) {
        $recommendations[] = "Safety factor is low (" . round($safety_factor, 1) . "). Consider increasing wall thickness or upgrading to stronger material.";
    }
    if ($mean_piston_speed > 13) {
        $recommendations[] = "High mean piston speed (" . round($mean_piston_speed, 1) . " m/s). Consider longer stroke for better durability.";
    }
    if ($thermal_efficiency < 0.38) {
        $recommendations[] = "Thermal efficiency is below optimal (" . round($thermal_efficiency*100, 1) . "%). Consider higher compression ratio or advanced turbocharging.";
    }
    if ($power_density < 35) {
        $recommendations[] = "Power density is low (" . round($power_density, 1) . " HP/L). Consider turbocharging or optimization for higher specific output.";
    }
    if ($actual_nox > $emission_props['nox_limit']) {
        $recommendations[] = "NOx emissions exceed limits. Enhanced aftertreatment or EGR optimization required.";
    }
    if ($heat_to_coolant / 1000 > 100) {
        $recommendations[] = "High cooling load (" . round($heat_to_coolant/1000, 0) . " kW). Ensure adequate radiator capacity.";
    }
    if ($bsfc > 220) {
        $recommendations[] = "Fuel consumption is high (" . round($bsfc, 0) . " g/kWh). Combustion optimization recommended.";
    }
    
    if (empty($recommendations)) {
        $recommendations[] = "Design parameters are well-balanced and within acceptable ranges.";
        $recommendations[] = "Consider validation testing to confirm performance predictions.";
        $recommendations[] = "Review maintenance intervals based on duty cycle requirements.";
    }

    // Validation status
    $stress_status = $safety_factor >= 2.0 ? 'Pass' : ($safety_factor >= 1.5 ? 'Warning' : 'Fail');
    $thermal_status = $thermal_efficiency >= 0.38 ? 'Pass' : ($thermal_efficiency >= 0.35 ? 'Warning' : 'Fail');
    $power_density_status = $power_density >= 35 ? 'Pass' : ($power_density >= 25 ? 'Warning' : 'Fail');
    $emissions_status = ($actual_nox <= $emission_props['nox_limit'] && $actual_pm <= $emission_props['pm_limit']) ? 'Pass' : 'Fail';
    $durability_status = $design_life >= 10000 ? 'Pass' : ($design_life >= 7500 ? 'Warning' : 'Fail');
    $cooling_status = ($heat_to_coolant / 1000) <= 120 ? 'Pass' : 'Warning';

    // Assemble results array
    $calculated_results = [
        'engine_parameters' => [
            'displacement_cc' => round($displacement_cc, 0),
            'displacement_liters' => round($displacement_liters, 2),
            'swept_volume_per_cylinder' => round($swept_volume_per_cylinder, 2),
            'bore_stroke_ratio' => round($bore_stroke_ratio, 3),
            'mean_piston_speed' => round($mean_piston_speed, 2),
            'bmep' => round($bmep_bar, 1),
            'compression_ratio' => $compression_ratio,
            'num_cylinders' => $num_cylinders
        ],
        'material_properties' => [
            'block_material' => $block_props['name'],
            'head_material' => $head_materials[$head_material]['density'] > 3000 ? 'Cast Iron' : 'Aluminum Alloy',
            'block_density' => $block_props['density'],
            'tensile_strength' => $block_props['tensile_strength'],
            'thermal_conductivity' => $block_props['thermal_conductivity'],
            'elastic_modulus' => $block_props['elastic_modulus']
        ],
        'performance_metrics' => [
            'max_power' => round($actual_power, 1),
            'actual_power' => round($actual_power, 1),
            'actual_torque' => round($torque_at_rated, 0),
            'peak_torque' => round($actual_peak_torque, 0),
            'power_density' => round($power_density, 1),
            'specific_power' => round($specific_power, 3),
            'thermal_efficiency' => round($thermal_efficiency * 100, 1),
            'bsfc' => round($bsfc, 0),
            'fuel_flow_rate' => round(($power_watts * $bsfc) / (1000 * 1000), 1),
            'torque_backup' => round($torque_rise, 1),
            'power_rpm' => $rated_rpm,
            'torque_rpm' => round($peak_torque_rpm, 0),
            'indicated_power' => round($actual_power * 1.15, 0),
            'mechanical_efficiency' => round((1 / 1.15) * 100, 1),
            'combustion_efficiency' => round($thermal_efficiency * 100 * 1.1, 1)
        ],
        'air_management' => [
            'turbo_type' => ucwords(str_replace('_', ' ', $turbocharging)),
            'boost_pressure' => $boost_pressure,
            'air_flow_rate' => round($air_flow_rate, 0),
            'volumetric_efficiency' => round($volumetric_efficiency * 100, 0),
            'egr_rate' => $egr_rate
        ],
        'structural_analysis' => [
            'peak_pressure' => round($peak_pressure_bar, 1),
            'hoop_stress' => round($hoop_stress_mpa, 1),
            'thermal_stress' => round($thermal_stress_mpa, 1),
            'combined_stress' => round($combined_stress_mpa, 1),
            'safety_factor' => round($safety_factor, 2),
            'fatigue_life' => round($fatigue_life, 1),
            'block_deflection' => round($combined_stress / ($block_props['elastic_modulus'] * 1000), 3)
        ],
        'thermal_analysis' => [
            'heat_input' => round($fuel_power / 1000, 1),
            'useful_work' => round($power_watts / 1000, 1),
            'heat_coolant' => round($heat_to_coolant / 1000, 1),
            'heat_exhaust' => round($heat_to_exhaust / 1000, 1),
            'heat_oil' => round($heat_to_oil / 1000, 1),
            'radiation_loss' => round($radiation_loss / 1000, 1),
            'exhaust_temperature' => round($exhaust_temperature, 0)
        ],
        'emissions_analysis' => [
            'nox_emissions' => round($actual_nox, 2),
            'pm_emissions' => round($actual_pm, 3),
            'co_emissions' => round($actual_co, 2),
            'hc_emissions' => round($actual_hc, 2),
            'co2_emissions' => round($co2_emissions, 3),
            'aftertreatment_efficiency' => round((($aftertreatment_props['nox_reduction'] + $aftertreatment_props['pm_reduction']) / 2), 0)
        ],
        'cost_analysis' => [
            'block_material_cost' => round($base_material_cost, 0),
            'block_manufacturing_cost' => round($base_material_cost * 0.6, 0),
            'block_assembly_cost' => round($base_material_cost * 0.2, 0),
            'block_total_cost' => round($block_total, 0),
            'head_material_cost' => round($head_material_cost, 0),
            'head_manufacturing_cost' => round($head_material_cost * 0.8, 0),
            'head_assembly_cost' => round($head_material_cost * 0.3, 0),
            'head_total_cost' => round($head_total, 0),
            'crank_material_cost' => round($crankshaft_cost * 0.7, 0),
            'crank_manufacturing_cost' => round($crankshaft_cost * 0.8, 0),
            'crank_assembly_cost' => round($crankshaft_cost * 0.2, 0),
            'crank_total_cost' => round($crank_total, 0),
            'turbo_material_cost' => round($turbo_cost * 0.6, 0),
            'turbo_manufacturing_cost' => round($turbo_cost * 0.3, 0),
            'turbo_assembly_cost' => round($turbo_cost * 0.1, 0),
            'turbo_total_cost' => round($turbo_total, 0),
            'aftertreatment_material_cost' => round(($aftertreatment_cost + $emission_compliance_cost) * 0.5, 0),
            'aftertreatment_manufacturing_cost' => round(($aftertreatment_cost + $emission_compliance_cost) * 0.35, 0),
            'aftertreatment_assembly_cost' => round(($aftertreatment_cost + $emission_compliance_cost) * 0.15, 0),
            'aftertreatment_total_cost' => round($aftertreatment_total, 0),
            'total_material_cost' => round($total_material_cost, 0),
            'total_manufacturing_cost' => round($manufacturing_cost, 0),
            'total_assembly_cost' => round($assembly_cost, 0),
            'total_engine_cost' => round($total_engine_cost, 0)
        ],
        'manufacturing_specs' => [
            'bore_tolerance' => '±0.010',
            'deck_flatness' => '0.025',
            'bore_roundness' => '0.005',
            'bore_surface_finish' => 'Ra 0.4',
            'centerline_tolerance' => '±0.05',
            'pressure_test' => round($peak_pressure_bar * 1.5, 1),
            'leak_rate' => '< 5 cc/min',
            'core_integrity' => 'Pass',
            'material_certification' => 'ISO 9001',
            'dimensional_inspection' => '100% CMM',
            'main_bearing_torque' => round($main_bearing_torque, 0),
            'rod_bolt_torque' => round($rod_bolt_torque, 0),
            'head_bolt_torque' => round($head_bolt_torque, 0),
            'flywheel_torque' => round($flywheel_torque, 0),
            'oil_pan_torque' => $oil_pan_torque
        ],
        'validation_results' => [
            'stress_safety_factor' => round($safety_factor, 2),
            'stress_status' => $stress_status,
            'thermal_efficiency_value' => round($thermal_efficiency * 100, 1),
            'thermal_status' => $thermal_status,
            'power_density_value' => round($power_density, 1),
            'power_density_status' => $power_density_status,
            'emissions_compliance' => $emission_standard,
            'emissions_status' => $emissions_status,
            'durability_hours' => round($design_life, 0),
            'durability_status' => $durability_status,
            'cooling_adequacy' => round($radiator_efficiency, 0),
            'cooling_status' => $cooling_status
        ],
        'operating_specs' => [
            'design_life' => round($design_life, 0),
            'service_interval' => 500,
            'oil_change_interval' => 500,
            'filter_service' => 250,
            'coolant_service' => 2000,
            'valve_service' => 1000,
            'overhaul_interval' => round($design_life * 0.6, 0)
        ],
        'documentation' => [
            'engine_family' => strtoupper($engine_type) . '-' . round($displacement_liters, 1) . 'L',
            'model_designation' => 'ENG-' . $num_cylinders . 'CYL-' . round($actual_power, 0) . 'HP',
            'application_rating' => ucfirst($application_type) . ' Duty',
            'design_life' => round($design_life, 0),
            'service_interval' => 500,
            'max_coolant_temp' => $operating_temperature + 5,
            'max_oil_temp' => $oil_temperature + 10,
            'max_intake_temp' => $ambient_temperature + 40,
            'min_oil_pressure' => round($bmep_bar * 0.1, 1) . ' bar',
            'max_exhaust_temp' => round($exhaust_temperature + 50, 0),
            'oil_change_interval' => 500,
            'filter_service_interval' => 250,
            'coolant_service_interval' => 2000,
            'valve_service_interval' => 1000,
            'overhaul_interval' => round($design_life * 0.6, 0)
        ],
        'recommendations' => $recommendations
    ];

    // Output results as JSON for frontend processing
    echo "<script>const engineCalculationResults = " . json_encode($calculated_results) . ";</script>";
    
} else {
    // Default empty results for initial page load
    $default_results = [
        'engine_parameters' => ['displacement_cc' => 0, 'displacement_liters' => 0, 'swept_volume_per_cylinder' => 0, 'bore_stroke_ratio' => 0, 'mean_piston_speed' => 0, 'bmep' => 0, 'compression_ratio' => 0, 'num_cylinders' => 0],
        'material_properties' => ['block_material' => '-', 'head_material' => '-', 'block_density' => 0, 'tensile_strength' => 0, 'thermal_conductivity' => 0, 'elastic_modulus' => 0],
        'performance_metrics' => ['actual_power' => 0, 'actual_torque' => 0, 'peak_torque' => 0, 'power_density' => 0, 'specific_power' => 0, 'thermal_efficiency' => 0, 'bsfc' => 0, 'fuel_flow_rate' => 0, 'torque_backup' => 0, 'power_rpm' => 0, 'torque_rpm' => 0],
        'air_management' => ['turbo_type' => '-', 'boost_pressure' => 0, 'air_flow_rate' => 0, 'volumetric_efficiency' => 0, 'egr_rate' => 0],
        'structural_analysis' => ['peak_pressure' => 0, 'hoop_stress' => 0, 'thermal_stress' => 0, 'combined_stress' => 0, 'safety_factor' => 0, 'fatigue_life' => 0, 'block_deflection' => 0],
        'thermal_analysis' => ['heat_input' => 0, 'useful_work' => 0, 'heat_coolant' => 0, 'heat_exhaust' => 0, 'heat_oil' => 0, 'radiation_loss' => 0, 'exhaust_temperature' => 0],
        'emissions_analysis' => ['nox_emissions' => 0, 'pm_emissions' => 0, 'co_emissions' => 0, 'hc_emissions' => 0, 'co2_emissions' => 0, 'aftertreatment_efficiency' => 0],
        'cost_analysis' => ['block_material_cost' => 0, 'block_manufacturing_cost' => 0, 'block_assembly_cost' => 0, 'block_total_cost' => 0, 'head_material_cost' => 0, 'head_manufacturing_cost' => 0, 'head_assembly_cost' => 0, 'head_total_cost' => 0, 'crank_material_cost' => 0, 'crank_manufacturing_cost' => 0, 'crank_assembly_cost' => 0, 'crank_total_cost' => 0, 'turbo_material_cost' => 0, 'turbo_manufacturing_cost' => 0, 'turbo_assembly_cost' => 0, 'turbo_total_cost' => 0, 'aftertreatment_material_cost' => 0, 'aftertreatment_manufacturing_cost' => 0, 'aftertreatment_assembly_cost' => 0, 'aftertreatment_total_cost' => 0, 'total_material_cost' => 0, 'total_manufacturing_cost' => 0, 'total_assembly_cost' => 0, 'total_engine_cost' => 0],
        'manufacturing_specs' => ['bore_tolerance' => '±0.010', 'deck_flatness' => '0.025', 'bore_roundness' => '0.005', 'bore_surface_finish' => 'Ra 0.4', 'centerline_tolerance' => '±0.05', 'pressure_test' => 0, 'main_bearing_torque' => 0, 'rod_bolt_torque' => 0, 'head_bolt_torque' => 0, 'flywheel_torque' => 0, 'oil_pan_torque' => 0],
        'validation_results' => ['stress_safety_factor' => 0, 'stress_status' => '-', 'thermal_efficiency_value' => 0, 'thermal_status' => '-', 'power_density_value' => 0, 'power_density_status' => '-', 'emissions_compliance' => '-', 'emissions_status' => '-', 'durability_hours' => 0, 'durability_status' => '-', 'cooling_adequacy' => 0, 'cooling_status' => '-'],
        'operating_specs' => ['design_life' => 0, 'service_interval' => 0, 'oil_change_interval' => 0, 'filter_service' => 0, 'coolant_service' => 0, 'valve_service' => 0, 'overhaul_interval' => 0],
        'recommendations' => ['Submit form to calculate engine parameters and generate recommendations']
    ];

    echo "<script>const engineCalculationResults = " . json_encode($default_results) . ";</script>";
}