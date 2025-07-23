<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BLOCK DIGITAL MANUFACTURING</title>
    <link rel="stylesheet" href="assets/styles/tractorenginedesignstyle.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/controls/OrbitControls.js"></script>
    <script src="https://threejs.org/examples/js/utils/BufferGeometryUtils.js"></script>
    <script src="https://unpkg.com/three@0.160.0/examples/js/utils/BufferGeometryUtils.js"></script>
    <script src="https://threejs.org/examples/js/utils/BufferGeometryUtils.js"></script>
</head>
<body>
    <div class="container">
        <h1>Block Digital Manufacturing Engine Design</h1>
        
        <?php
            include("server/gettractorenginedesign.php");
        ?>

        <div class="form-container">
            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST" id="engineForm">
                <div class="grid-container">
                    <!-- Primary Engine Configuration -->
                    <div class="form-section">
                        <h4>Engine Configuration</h4>
                        
                        <div class="form-group">
                            <label for="engine_type">Engine Configuration:
                                <span class="info-tooltip" data-tooltip="Engine cylinder arrangement affects packaging, balance, and manufacturing cost"></span>
                            </label>
                            <select name="engine_type" id="engine_type" required>
                                <option value="inline_3">Inline 3-Cylinder (Compact)</option>
                                <option value="inline_4" selected>Inline 4-Cylinder (Standard)</option>
                                <option value="inline_6">Inline 6-Cylinder (Heavy Duty)</option>
                                <option value="v6">V6 Engine (High Power)</option>
                                <option value="v8">V8 Engine (Premium)</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="application_type">Tractor Application:
                                <span class="info-tooltip" data-tooltip="Application determines power requirements and duty cycle"></span>
                            </label>
                            <select name="application_type" id="application_type" required onchange="updateApplicationDefaults()">
                                <option value="compact">Compact Tractor (20-40 HP)</option>
                                <option value="utility" selected>Utility Tractor (40-100 HP)</option>
                                <option value="row_crop">Row Crop Tractor (100-300 HP)</option>
                                <option value="high_horsepower">High HP Tractor (300-600 HP)</option>
                                <option value="specialty">Specialty/Vineyard (25-75 HP)</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="duty_cycle">Duty Cycle:
                                <span class="info-tooltip" data-tooltip="Expected operating hours per year affects durability requirements"></span>
                            </label>
                            <select name="duty_cycle" id="duty_cycle" required>
                                <option value="light">Light Duty (< 500 hrs/year)</option>
                                <option value="medium" selected>Medium Duty (500-1500 hrs/year)</option>
                                <option value="heavy">Heavy Duty (1500-3000 hrs/year)</option>
                                <option value="continuous">Continuous (> 3000 hrs/year)</option>
                            </select>
                        </div>
                    </div>

                    <!-- Engine Geometry -->
                    <div class="form-section">
                        <h4>Engine Geometry</h4>
                        
                        <div class="form-group">
                            <label for="bore_diameter">Bore Diameter (mm):
                                <span class="info-tooltip" data-tooltip="Cylinder bore affects displacement and stress levels"></span>
                            </label>
                            <input type="number" name="bore_diameter" id="bore_diameter" step="1" min="75" max="140" value="105" required>
                            <small class="form-helper">Typical range: 75-140mm</small>
                        </div>

                        <div class="form-group">
                            <label for="stroke_length">Stroke Length (mm):
                                <span class="info-tooltip" data-tooltip="Longer stroke increases torque but reduces max RPM"></span>
                            </label>
                            <input type="number" name="stroke_length" id="stroke_length" step="1" min="80" max="170" value="125" required>
                            <small class="form-helper">Typical range: 80-170mm</small>
                        </div>

                        <div class="form-group">
                            <label for="compression_ratio">Compression Ratio:
                                <span class="info-tooltip" data-tooltip="Higher compression improves efficiency but increases stress"></span>
                            </label>
                            <input type="number" name="compression_ratio" id="compression_ratio" step="0.1" min="14" max="23" value="17.5" required>
                            <small class="form-helper">Diesel: 14-23:1</small>
                        </div>

                        <div class="form-group">
                            <label for="cylinder_wall_thickness">Cylinder Wall Thickness (mm):
                                <span class="info-tooltip" data-tooltip="Wall thickness affects strength and heat transfer"></span>
                            </label>
                            <input type="number" name="cylinder_wall_thickness" id="cylinder_wall_thickness" step="0.5" min="4" max="12" value="8" required>
                            <small class="form-helper">Typical: 4-12mm</small>
                        </div>
                    </div>

                    <!-- Materials and Construction -->
                    <div class="form-section">
                        <h4>Materials & Construction</h4>
                        
                        <div class="form-group">
                            <label for="block_material">Cylinder Block Material:
                                <span class="info-tooltip" data-tooltip="Material affects weight, durability, and cost"></span>
                            </label>
                            <select name="block_material" id="block_material" required>
                                <option value="gray_iron" selected>Gray Cast Iron (Cost Effective)</option>
                                <option value="ductile_iron">Ductile Iron (High Strength)</option>
                                <option value="compacted_graphite">CGI (Premium Performance)</option>
                                <option value="aluminum_alloy">Aluminum Alloy (Lightweight)</option>
                                <option value="vermicular_iron">Vermicular Iron (Advanced)</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="head_material">Cylinder Head Material:
                                <span class="info-tooltip" data-tooltip="Head material affects thermal management"></span>
                            </label>
                            <select name="head_material" id="head_material" required>
                                <option value="gray_iron">Gray Cast Iron</option>
                                <option value="aluminum_alloy" selected>Aluminum Alloy</option>
                                <option value="ductile_iron">Ductile Iron</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="liner_type">Cylinder Liner Type:
                                <span class="info-tooltip" data-tooltip="Liner type affects durability and serviceability"></span>
                            </label>
                            <select name="liner_type" id="liner_type" required>
                                <option value="wet_liner" selected>Wet Liner (Serviceable)</option>
                                <option value="dry_liner">Dry Liner (Integrated)</option>
                                <option value="parent_bore">Parent Bore (No Liner)</option>
                                <option value="plasma_spray">Plasma Spray Coating</option>
                            </select>
                        </div>
                    </div>

                    <!-- Performance Targets -->
                    <div class="form-section">
                        <h4>Performance Targets</h4>
                        
                        <div class="form-group">
                            <label for="target_power">Target Power (HP):
                                <span class="info-tooltip" data-tooltip="Maximum power at rated RPM"></span>
                            </label>
                            <input type="number" name="target_power" id="target_power" step="5" min="20" max="600" value="120" required>
                        </div>

                        <div class="form-group">
                            <label for="target_torque">Target Torque (Nm):
                                <span class="info-tooltip" data-tooltip="Peak torque for heavy-duty applications"></span>
                            </label>
                            <input type="number" name="target_torque" id="target_torque" step="10" min="150" max="3000" value="580" required>
                        </div>

                        <div class="form-group">
                            <label for="rated_rpm">Rated RPM:
                                <span class="info-tooltip" data-tooltip="Engine speed at maximum power"></span>
                            </label>
                            <input type="number" name="rated_rpm" id="rated_rpm" step="50" min="1500" max="3000" value="2200" required>
                        </div>

                        <div class="form-group">
                            <label for="max_rpm">Maximum RPM:
                                <span class="info-tooltip" data-tooltip="Engine redline speed"></span>
                            </label>
                            <input type="number" name="max_rpm" id="max_rpm" step="50" min="1800" max="3500" value="2600" required>
                        </div>

                        <div class="form-group">
                            <label for="torque_rise">Target Torque Rise (%):
                                <span class="info-tooltip" data-tooltip="Torque increase from rated to peak torque RPM"></span>
                            </label>
                            <input type="number" name="torque_rise" id="torque_rise" step="1" min="15" max="50" value="25" required>
                        </div>
                    </div>

                    <!-- Fuel and Emissions -->
                    <div class="form-section">
                        <h4>Fuel & Emissions</h4>
                        
                        <div class="form-group">
                            <label for="fuel_type">Primary Fuel Type:
                                <span class="info-tooltip" data-tooltip="Fuel type determines injection system and efficiency"></span>
                            </label>
                            <select name="fuel_type" id="fuel_type" required>
                                <option value="diesel" selected>Ultra Low Sulfur Diesel</option>
                                <option value="biodiesel_b20">Biodiesel B20</option>
                                <option value="biodiesel_b100">Biodiesel B100</option>
                                <option value="renewable_diesel">Renewable Diesel</option>
                                <option value="natural_gas">Compressed Natural Gas</option>
                                <option value="propane">Propane/LPG</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="emission_standard">Emission Standard:
                                <span class="info-tooltip" data-tooltip="Regulatory compliance requirement"></span>
                            </label>
                            <select name="emission_standard" id="emission_standard" required>
                                <option value="tier_3">Tier 3 (Legacy)</option>
                                <option value="tier_4_interim">Tier 4 Interim</option>
                                <option value="tier_4_final" selected>Tier 4 Final</option>
                                <option value="stage_v">Stage V (EU)</option>
                                <option value="china_iv">China IV</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="aftertreatment">Aftertreatment System:
                                <span class="info-tooltip" data-tooltip="Emission control technology"></span>
                            </label>
                            <select name="aftertreatment" id="aftertreatment" required>
                                <option value="none">None (Tier 3)</option>
                                <option value="doc_dpf">DOC + DPF</option>
                                <option value="scr_system" selected>DOC + DPF + SCR</option>
                                <option value="integrated_scr">Integrated SCR/DPF</option>
                            </select>
                        </div>
                    </div>

                    <!-- Air Management -->
                    <div class="form-section">
                        <h4>Air Management</h4>
                        
                        <div class="form-group">
                            <label for="turbocharging">Forced Induction:
                                <span class="info-tooltip" data-tooltip="Boost system increases power density"></span>
                            </label>
                            <select name="turbocharging" id="turbocharging" required>
                                <option value="naturally_aspirated">Naturally Aspirated</option>
                                <option value="turbocharged" selected>Single Turbocharger</option>
                                <option value="turbocharged_intercooled">Turbo + Intercooler</option>
                                <option value="variable_geometry">Variable Geometry Turbo</option>
                                <option value="two_stage">Two-Stage Turbocharging</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="boost_pressure">Target Boost Pressure (bar):
                                <span class="info-tooltip" data-tooltip="Intake manifold pressure above atmospheric"></span>
                            </label>
                            <input type="number" name="boost_pressure" id="boost_pressure" step="0.1" min="0" max="3.5" value="1.8" required>
                        </div>

                        <div class="form-group">
                            <label for="egr_rate">EGR Rate (%):
                                <span class="info-tooltip" data-tooltip="Exhaust gas recirculation for NOx control"></span>
                            </label>
                            <input type="number" name="egr_rate" id="egr_rate" step="1" min="0" max="40" value="15" required>
                        </div>
                    </div>

                    <!-- Operating Conditions -->
                    <div class="form-section">
                        <h4>Operating Conditions</h4>
                        
                        <div class="form-group">
                            <label for="operating_temperature">Coolant Temperature (°C):
                                <span class="info-tooltip" data-tooltip="Normal engine operating temperature"></span>
                            </label>
                            <input type="number" name="operating_temperature" id="operating_temperature" step="1" min="80" max="110" value="95" required>
                        </div>

                        <div class="form-group">
                            <label for="oil_temperature">Oil Temperature (°C):
                                <span class="info-tooltip" data-tooltip="Engine oil operating temperature"></span>
                            </label>
                            <input type="number" name="oil_temperature" id="oil_temperature" step="1" min="90" max="130" value="110" required>
                        </div>

                        <div class="form-group">
                            <label for="ambient_temperature">Design Ambient (°C):
                                <span class="info-tooltip" data-tooltip="Maximum ambient operating temperature"></span>
                            </label>
                            <input type="number" name="ambient_temperature" id="ambient_temperature" step="1" min="25" max="50" value="40" required>
                        </div>

                        <div class="form-group">
                            <label for="altitude">Operating Altitude (m):
                                <span class="info-tooltip" data-tooltip="Maximum operating elevation affects power"></span>
                            </label>
                            <input type="number" name="altitude" id="altitude" step="100" min="0" max="4000" value="1000" required>
                        </div>
                    </div>

                    <!-- Cooling System -->
                    <div class="form-section">
                        <h4>Cooling System</h4>
                        
                        <div class="form-group">
                            <label for="cooling_system">Cooling Type:
                                <span class="info-tooltip" data-tooltip="Heat rejection system design"></span>
                            </label>
                            <select name="cooling_system" id="cooling_system" required>
                                <option value="air_cooled">Air Cooled</option>
                                <option value="liquid_cooled" selected>Liquid Cooled</option>
                                <option value="combo_cooled">Combination Cooled</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="radiator_efficiency">Radiator Efficiency (%):
                                <span class="info-tooltip" data-tooltip="Heat exchanger effectiveness"></span>
                            </label>
                            <input type="number" name="radiator_efficiency" id="radiator_efficiency" step="1" min="70" max="95" value="85" required>
                        </div>
                    </div>
                </div>

                <button type="submit" class="submit-btn">Calculate Engine Parameters</button>
            </form>
        </div>

        <div id="results-section" style="display: none;">
            <div class="dashboard no-print">
                <div class="dashboard-card">
                    <h3>Performance Overview</h3>
                    <canvas id="performanceChart"></canvas>
                </div>
                <div class="dashboard-card">
                    <h3>Stress Analysis</h3>
                    <canvas id="stressChart"></canvas>
                </div>
                <div class="dashboard-card">
                    <h3>Thermal Profile</h3>
                    <canvas id="thermalChart"></canvas>
                </div>
                <div class="dashboard-card">
                    <h3>Efficiency Map</h3>
                    <canvas id="efficiencyChart"></canvas>
                </div>
            </div>

            <div class="tabs no-print">
                <button class="tab active" data-tab="design">Design Parameters</button>
                <button class="tab" data-tab="analysis">Engineering Analysis</button>
                <button class="tab" data-tab="optimization">Optimization</button>
                <button class="tab" data-tab="manufacturing">Manufacturing</button>
                <button class="tab" data-tab="validation">Validation</button>
                <button class="tab" data-tab="documentation">Documentation</button>
            </div>

            <div class="tab-content">
                <div id="design" class="tab-pane active">
                    <h3>Design Parameters & Specifications</h3>
                    <div class="design-grid">
                        <div class="design-section">
                            <h4>Engine Geometry</h4>
                            <ul>
                                <li>Total Displacement: <span id="displacement-display">0 L</span></li>
                                <li>Bore × Stroke: <span id="bore-stroke-display">0 × 0 mm</span></li>
                                <li>Bore/Stroke Ratio: <span id="bore-stroke-ratio-display">0</span></li>
                                <li>Compression Ratio: <span id="compression-display">0:1</span></li>
                                <li>Swept Volume/Cyl: <span id="swept-volume-display">0 L</span></li>
                                <li>Mean Piston Speed: <span id="piston-speed-display">0 m/s</span></li>
                            </ul>
                        </div>
                        
                        <div class="design-section">
                            <h4>Material Properties</h4>
                            <ul>
                                <li>Block Material: <span id="block-material-display">-</span></li>
                                <li>Head Material: <span id="head-material-display">-</span></li>
                                <li>Block Density: <span id="block-density-display">0 kg/m³</span></li>
                                <li>Tensile Strength: <span id="tensile-display">0 MPa</span></li>
                                <li>Thermal Conductivity: <span id="thermal-conductivity-display">0 W/m·K</span></li>
                                <li>Elastic Modulus: <span id="elastic-modulus-display">0 GPa</span></li>
                            </ul>
                        </div>

                        <div class="design-section">
                            <h4>Performance Metrics</h4>
                            <ul>
                                <li>Max Power: <span id="power-display">0 HP</span> @ <span id="power-rpm-display">0</span> RPM</li>
                                <li>Peak Torque: <span id="torque-display">0 Nm</span> @ <span id="torque-rpm-display">0</span> RPM</li>
                                <li>BMEP: <span id="bmep-display">0 bar</span></li>
                                <li>Power Density: <span id="power-density-display">0 HP/L</span></li>
                                <li>Specific Power: <span id="specific-power-display">0 kW/kg</span></li>
                                <li>Thermal Efficiency: <span id="efficiency-display">0%</span></li>
                                <li>BSFC: <span id="bsfc-display">0 g/kWh</span></li>
                            </ul>
                        </div>

                        <div class="design-section">
                            <h4>Air Management</h4>
                            <ul>
                                <li>Turbocharging: <span id="turbo-type-display">-</span></li>
                                <li>Boost Pressure: <span id="boost-display">0 bar</span></li>
                                <li>Air Flow Rate: <span id="air-flow-display">0 kg/h</span></li>
                                <li>Volumetric Efficiency: <span id="vol-eff-display">0%</span></li>
                                <li>EGR Rate: <span id="egr-display">0%</span></li>
                            </ul>
                        </div>
                    </div>

                    <div class="design-validation">
                        <h4>Design Validation Matrix</h4>
                        <div class="validation-grid">
                            <div class="validation-item">
                                <span class="check-label">Structural Safety Factor</span>
                                <span class="check-value" id="stress-safety-value">0</span>
                                <span class="check-status" id="stress-safety-status">-</span>
                            </div>
                            <div class="validation-item">
                                <span class="check-label">Thermal Efficiency</span>
                                <span class="check-value" id="thermal-eff-value">0%</span>
                                <span class="check-status" id="thermal-eff-status">-</span>
                            </div>
                            <div class="validation-item">
                                <span class="check-label">Power Density</span>
                                <span class="check-value" id="power-density-value">0 HP/L</span>
                                <span class="check-status" id="power-density-status">-</span>
                            </div>
                            <div class="validation-item">
                                <span class="check-label">Emission Compliance</span>
                                <span class="check-value" id="emissions-compliance-value">-</span>
                                <span class="check-status" id="emissions-compliance-status">-</span>
                            </div>
                            <div class="validation-item">
                                <span class="check-label">Durability Rating</span>
                                <span class="check-value" id="durability-value">0 hrs</span>
                                <span class="check-status" id="durability-status">-</span>
                            </div>
                            <div class="validation-item">
                                <span class="check-label">Cooling Adequacy</span>
                                <span class="check-value" id="cooling-adequacy-value">0%</span>
                                <span class="check-status" id="cooling-adequacy-status">-</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="analysis" class="tab-pane">
                    <h3>Engineering Analysis</h3>
                    <div class="analysis-grid">
                        <div class="analysis-section">
                            <h4>Structural Analysis</h4>
                            <ul>
                                <li>Peak Cylinder Pressure: <span id="peak-pressure">0 bar</span></li>
                                <li>Hoop Stress: <span id="hoop-stress">0 MPa</span></li>
                                <li>Thermal Stress: <span id="thermal-stress">0 MPa</span></li>
                                <li>Combined Stress: <span id="combined-stress">0 MPa</span></li>
                                <li>Safety Factor: <span id="safety-factor">0</span></li>
                                <li>Fatigue Life: <span id="fatigue-life">0 million cycles</span></li>
                                <li>Block Deflection: <span id="block-deflection">0 mm</span></li>
                            </ul>
                        </div>

                        <div class="analysis-section">
                            <h4>Thermal Analysis</h4>
                            <ul>
                                <li>Heat Input: <span id="heat-input">0 kW</span></li>
                                <li>Useful Work: <span id="useful-work">0 kW</span></li>
                                <li>Heat to Coolant: <span id="heat-coolant">0 kW</span></li>
                                <li>Heat to Exhaust: <span id="heat-exhaust">0 kW</span></li>
                                <li>Heat to Oil: <span id="heat-oil">0 kW</span></li>
                                <li>Radiation Loss: <span id="radiation-loss">0 kW</span></li>
                                <li>Exhaust Temperature: <span id="exhaust-temp">0°C</span></li>
                            </ul>
                        </div>

                        <div class="analysis-section">
                            <h4>Performance Analysis</h4>
                            <ul>
                                <li>Indicated Power: <span id="indicated-power">0 HP</span></li>
                                <li>Mechanical Efficiency: <span id="mech-efficiency">0%</span></li>
                                <li>Combustion Efficiency: <span id="combustion-eff">0%</span></li>
                                <li>Specific Fuel Consumption: <span id="sfc">0 g/kWh</span></li>
                                <li>Air-Fuel Ratio: <span id="afr">0:1</span></li>
                                <li>Fuel Flow Rate: <span id="fuel-flow">0 L/h</span></li>
                                <li>Torque Backup: <span id="torque-backup">0%</span></li>
                            </ul>
                        </div>

                        <div class="analysis-section">
                            <h4>Emissions Analysis</h4>
                            <ul>
                                <li>NOx Emissions: <span id="nox-emissions">0 g/kWh</span></li>
                                <li>PM Emissions: <span id="pm-emissions">0 g/kWh</span></li>
                                <li>CO Emissions: <span id="co-emissions">0 g/kWh</span></li>
                                <li>HC Emissions: <span id="hc-emissions">0 g/kWh</span></li>
                                <li>CO2 Emissions: <span id="co2-emissions">0 g/kWh</span></li>
                                <li>Aftertreatment Efficiency: <span id="aftertreatment-eff">0%</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="optimization" class="tab-pane">
                    <h3>Design Optimization</h3>
                    <div class="optimization-grid">
                        <div class="optimization-section">
                            <h4>Cost Analysis (ZAR)</h4>
                            <table class="optimization-table">
                                <thead>
                                    <tr>
                                        <th>Component</th>
                                        <th>Material Cost</th>
                                        <th>Manufacturing</th>
                                        <th>Assembly</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Engine Block</td>
                                        <td id="block-material-cost">R0</td>
                                        <td id="block-manufacturing-cost">R0</td>
                                        <td id="block-assembly-cost">R0</td>
                                        <td id="block-total-cost">R0</td>
                                    </tr>
                                    <tr>
                                        <td>Cylinder Head</td>
                                        <td id="head-material-cost">R0</td>
                                        <td id="head-manufacturing-cost">R0</td>
                                        <td id="head-assembly-cost">R0</td>
                                        <td id="head-total-cost">R0</td>
                                    </tr>
                                    <tr>
                                        <td>Crankshaft</td>
                                        <td id="crank-material-cost">R0</td>
                                        <td id="crank-manufacturing-cost">R0</td>
                                        <td id="crank-assembly-cost">R0</td>
                                        <td id="crank-total-cost">R0</td>
                                    </tr>
                                    <tr>
                                        <td>Turbocharger</td>
                                        <td id="turbo-material-cost">R0</td>
                                        <td id="turbo-manufacturing-cost">R0</td>
                                        <td id="turbo-assembly-cost">R0</td>
                                        <td id="turbo-total-cost">R0</td>
                                    </tr>
                                    <tr>
                                        <td>Aftertreatment</td>
                                        <td id="aftertreatment-material-cost">R0</td>
                                        <td id="aftertreatment-manufacturing-cost">R0</td>
                                        <td id="aftertreatment-assembly-cost">R0</td>
                                        <td id="aftertreatment-total-cost">R0</td>
                                    </tr>
                                    <tr class="total-row">
                                        <td><strong>Total Engine Cost</strong></td>
                                        <td id="total-material-cost">R0</td>
                                        <td id="total-manufacturing-cost">R0</td>
                                        <td id="total-assembly-cost">R0</td>
                                        <td id="total-engine-cost">R0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="optimization-section">
                            <h4>Optimization Recommendations</h4>
                            <ul id="optimization-recommendations">
                                <li>Submit form to generate recommendations...</li>
                            </ul>
                        </div>

                        <div class="optimization-section">
                            <h4>Trade-off Analysis</h4>
                            <ul>
                                <li>Power vs. Fuel Economy: <span id="power-economy-tradeoff">Balanced</span></li>
                                <li>Cost vs. Durability: <span id="cost-durability-tradeoff">Optimized</span></li>
                                <li>Weight vs. Strength: <span id="weight-strength-tradeoff">Efficient</span></li>
                                <li>Emissions vs. Performance: <span id="emissions-performance-tradeoff">Compliant</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="manufacturing" class="tab-pane">
                    <h3>Manufacturing Specifications</h3>
                    <div class="manufacturing-grid">
                        <div class="manufacturing-section">
                            <h4>Machining Requirements</h4>
                            <ul>
                                <li>Bore Tolerance: <span id="bore-tolerance">±0.010 mm</span></li>
                                <li>Deck Surface Flatness: <span id="deck-flatness">0.025 mm</span></li>
                                <li>Bore Roundness: <span id="bore-roundness">0.005 mm</span></li>
                                <li>Surface Finish (Bore): <span id="bore-surface">Ra 0.4 μm</span></li>
                                <li>Cylinder Centerline: <span id="centerline-tolerance">±0.05 mm</span></li>
                            </ul>
                        </div>

                        <div class="manufacturing-section">
                            <h4>Quality Control</h4>
                            <ul>
                                <li>Pressure Test: <span id="pressure-test-spec">0 bar</span></li>
                                <li>Leak Rate: <span id="leak-rate">< 5 cc/min</span></li>
                                <li>Core Integrity: <span id="core-integrity">100% ultrasonic</span></li>
                                <li>Material Cert: <span id="material-cert">Required</span></li>
                                <li>Dimensional Check: <span id="dimensional-check">CMM inspection</span></li>
                            </ul>
                        </div>

                        <div class="manufacturing-section">
                            <h4>Assembly Torque Specifications</h4>
                            <ul>
                                <li>Main Bearing Caps: <span id="main-bearing-torque-spec">0 Nm</span></li>
                                <li>Connecting Rod Bolts: <span id="rod-bolt-torque">0 Nm</span></li>
                                <li>Cylinder Head Bolts: <span id="head-bolt-torque">0 Nm</span></li>
                                <li>Flywheel Bolts: <span id="flywheel-torque">0 Nm</span></li>
                                <li>Oil Pan Bolts: <span id="oil-pan-torque">0 Nm</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="validation" class="tab-pane">
                    <h3>Design Validation</h3>
                    <div class="validation-test-grid">
                        <div class="validation-section">
                            <h4>Structural Tests</h4>
                            <ul>
                                <li>Burst Pressure Test: <span id="burst-test">0 bar (Required)</span></li>
                                <li>Fatigue Test: <span id="fatigue-test">2M cycles minimum</span></li>
                                <li>Thermal Cycling: <span id="thermal-cycling">1000 cycles</span></li>
                                <li>Vibration Test: <span id="vibration-test">Per ISO 8528</span></li>
                            </ul>
                        </div>

                        <div class="validation-section">
                            <h4>Performance Tests</h4>
                            <ul>
                                <li>Power Curve: <span id="power-curve-test">Full load sweep</span></li>
                                <li>Torque Backup: <span id="torque-backup-test">0% minimum</span></li>
                                <li>Fuel Consumption: <span id="fuel-test">ISO 3046 standard</span></li>
                                <li>Emissions: <span id="emissions-test">Per regulation</span></li>
                            </ul>
                        </div>

                        <div class="validation-section">
                            <h4>Durability Tests</h4>
                            <ul>
                                <li>Endurance Test: <span id="endurance-test">1000 hours</span></li>
                                <li>Overload Test: <span id="overload-test">110% load, 1 hour</span></li>
                                <li>Cold Start: <span id="cold-start-test">-20°C capability</span></li>
                                <li>Hot Shutdown: <span id="hot-shutdown-test">Thermal shock</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="documentation" class="tab-pane">
                    <h3>Technical Documentation</h3>
                    <div class="documentation-grid">
                        <div class="documentation-section">
                            <h4>Design Specifications</h4>
                            <ul>
                                <li>Engine Family: <span id="engine-family">TDI-Series</span></li>
                                <li>Model Designation: <span id="model-designation">Auto-generated</span></li>
                                <li>Application Rating: <span id="application-rating">Continuous/Standby</span></li>
                                <li>Design Life: <span id="design-life">20,000 hours</span></li>
                                <li>Service Interval: <span id="service-interval">500 hours</span></li>
                            </ul>
                        </div>

                        <div class="documentation-section">
                            <h4>Operating Limits</h4>
                            <ul>
                                <li>Max Coolant Temp: <span id="max-coolant-temp">110°C</span></li>
                                <li>Max Oil Temp: <span id="max-oil-temp">130°C</span></li>
                                <li>Max Intake Temp: <span id="max-intake-temp">55°C</span></li>
                                <li>Min Oil Pressure: <span id="min-oil-pressure">2.5 bar @ idle</span></li>
                                <li>Max Exhaust Temp: <span id="max-exhaust-temp">750°C</span></li>
                            </ul>
                        </div>

                        <div class="documentation-section">
                            <h4>Maintenance Schedule</h4>
                            <ul>
                                <li>Oil Change: <span id="oil-change-interval">500 hours</span></li>
                                <li>Filter Service: <span id="filter-service">250 hours</span></li>
                                <li>Coolant Service: <span id="coolant-service">2000 hours</span></li>
                                <li>Valve Adjustment: <span id="valve-service">1000 hours</span></li>
                                <li>Major Overhaul: <span id="overhaul-interval">10,000 hours</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="visualization-container no-print">
                <div class="canvas-container">
                    <button class="fullscreen-button" onclick="toggleFullscreen()">
                        <span id="fullscreen-icon">⤢</span>
                    </button>
                    
                    <div class="info-panel">
                        <div><strong>Engine Monitor:</strong></div>
                        <div>RPM: <span id="rpm-display">0</span></div>
                        <div>Power: <span id="power-current">0 HP</span></div>
                        <div>Torque: <span id="torque-current">0 Nm</span></div>
                        <div>Load: <span id="load-current">0%</span></div>
                        <div>Coolant: <span id="coolant-temp">0°C</span></div>
                        <div>Oil Temp: <span id="oil-temp-current">0°C</span></div>
                        <div>Oil Press: <span id="oil-pressure-current">0.0 bar</span></div>
                        <div>Boost: <span id="boost-current">0.0 bar</span></div>
                        <div>EGT: <span id="egt-current">0°C</span></div>
                        <div>Fuel Rate: <span id="fuel-rate-current">0.0 L/h</span></div>
                    </div>
                    
                    <div class="controls">
                        <div class="control-group">
                            <label><input type="checkbox" id="animation-toggle" checked> Engine Running</label>
                        </div>
                        <div class="control-group">
                            <label><input type="checkbox" id="wireframe-toggle"> Wireframe Mode</label>
                        </div>
                        <div class="control-group">
                            <label><input type="checkbox" id="cutaway-toggle"> Cutaway View</label>
                        </div>
                        <div class="control-group">
                            <label><input type="checkbox" id="thermal-view"> Thermal Overlay</label>
                        </div>
                        <div class="control-group">
                            <label><input type="checkbox" id="stress-view"> Stress Analysis</label>
                        </div>
                        <div class="control-group">
                            <label for="rpm-slider">RPM: <span id="rpm-value">1500</span></label>
                            <input type="range" id="rpm-slider" class="slider" min="800" max="2600" value="1500" step="50">
                        </div>
                        <div class="control-group">
                            <label for="load-slider">Load: <span id="load-value">75%</span></label>
                            <input type="range" id="load-slider" class="slider" min="0" max="100" value="75" step="5">
                        </div>
                    </div>
                </div>
            </div>

            <div class="export-options no-print">
                <button class="export-button" onclick="exportToPDF()">📄 Technical Report</button>
                <button class="export-button" onclick="exportToCAD()">📐 CAD Files</button>
                <button class="export-button" onclick="exportToExcel()">📊 Performance Data</button>
                <button class="export-button" onclick="exportSpecSheet()">📋 Specification Sheet</button>
                <button class="export-button" onclick="exportManufacturing()">🏭 Manufacturing Pack</button>
            </div>
        </div>

        <script>
            // Auto-update defaults based on application type
            function updateApplicationDefaults() {
                const applicationType = document.getElementById('application_type').value;
                const powerInput = document.getElementById('target_power');
                const torqueInput = document.getElementById('target_torque');
                const rpmInput = document.getElementById('rated_rpm');
                
                const defaults = {
                    'compact': { power: 35, torque: 150, rpm: 2800 },
                    'utility': { power: 75, torque: 350, rpm: 2400 },
                    'row_crop': { power: 180, torque: 850, rpm: 2200 },
                    'high_horsepower': { power: 450, torque: 2200, rpm: 2000 },
                    'specialty': { power: 50, torque: 200, rpm: 2600 }
                };
                
                if (defaults[applicationType]) {
                    powerInput.value = defaults[applicationType].power;
                    torqueInput.value = defaults[applicationType].torque;
                    rpmInput.value = defaults[applicationType].rpm;
                }
            }
        </script>
    </div>

    <div class="loading-overlay" id="loadingOverlay">
        <div class="loading-spinner"></div>
    </div>

    <div class="error-message" id="errorMessage"></div>
    <div class="success-message" id="successMessage"></div>

    <script>
        // Material properties for frontend use - aligned with PHP
        const materialProperties = {
            'gray_iron': { name: 'Gray Cast Iron', density: '7.2 g/cm³', tensile: '250 MPa', thermal: '46 W/m·K' },
            'ductile_iron': { name: 'Ductile Iron', density: '7.1 g/cm³', tensile: '400 MPa', thermal: '36 W/m·K' },
            'compacted_graphite': { name: 'Compacted Graphite Iron', density: '7.3 g/cm³', tensile: '450 MPa', thermal: '36 W/m·K' },
            'aluminum_alloy': { name: 'Aluminum Alloy', density: '2.7 g/cm³', tensile: '280 MPa', thermal: '151 W/m·K' },
            'vermicular_iron': { name: 'Vermicular Iron', density: '7.25 g/cm³', tensile: '500 MPa', thermal: '40 W/m·K' }
        };

        // Enhanced Engine Configuration with PHP integration
        class EngineConfig {
            constructor() {
                this.engineParameters = {
                    bore: 86, // mm
                    stroke: 86, // mm
                    cylinders: 4,
                    displacement: 2.0, // L
                    compressionRatio: 10.5,
                    firingOrder: [1, 3, 4, 2],
                    engineType: 'inline_4',
                    blockMaterial: 'gray_iron',
                    headMaterial: 'gray_iron',
                    linerType: 'wet_sleeve',
                    turbocharging: 'naturally_aspirated'
                };

                this.dynamicState = {
                    rpm: 2000,
                    throttle: 25,
                    temperature: 90,
                    oilPressure: 4.5,
                    power: 180,
                    torque: 220,
                    fuelFlow: 8.5,
                    boostPressure: 0
                };

                this.animationState = {
                    engineRunning: true,
                    wireframe: false,
                    cutaway: false,
                    thermalView: false,
                    crankAngle: 0,
                    pistonPositions: [0, 0, 0, 0],
                    time: 0
                };

                this.three = {
                    scene: null,
                    camera: null,
                    renderer: null,
                    engineGroup: null,
                    pistons: [],
                    crankshaft: null,
                    sparkEffects: []
                };

                this.calculationResults = null;
            }

            updateFromFormData() {
                // Update configuration from form inputs AND PHP results
                this.engineParameters.bore = parseFloat(document.getElementById('bore_diameter')?.value) || 86;
                this.engineParameters.stroke = parseFloat(document.getElementById('stroke_length')?.value) || 86;
                this.engineParameters.compressionRatio = parseFloat(document.getElementById('compression_ratio')?.value) || 10.5;
                this.engineParameters.blockMaterial = document.getElementById('block_material')?.value || 'gray_iron';
                this.engineParameters.headMaterial = document.getElementById('head_material')?.value || 'gray_iron';
                this.engineParameters.linerType = document.getElementById('liner_type')?.value || 'wet_sleeve';
                this.engineParameters.turbocharging = document.getElementById('turbocharging')?.value || 'naturally_aspirated';
                
                // Get engine type and calculate cylinders
                this.engineParameters.engineType = document.getElementById('engine_type')?.value || 'inline_4';
                const cylinderMap = {
                    'inline_3': 3,
                    'inline_4': 4,
                    'inline_6': 6,
                    'v6': 6,
                    'v8': 8
                };
                this.engineParameters.cylinders = cylinderMap[this.engineParameters.engineType] || 4;
                
                this.dynamicState.power = parseInt(document.getElementById('target_power')?.value) || 180;
                this.dynamicState.torque = parseInt(document.getElementById('target_torque')?.value) || 220;
                this.dynamicState.temperature = parseInt(document.getElementById('operating_temperature')?.value) || 90;
                this.dynamicState.rpm = parseInt(document.getElementById('rated_rpm')?.value) || 2000;
                this.dynamicState.boostPressure = parseFloat(document.getElementById('boost_pressure')?.value) || 0;
                
                // Calculate displacement from bore, stroke, and cylinders
                const boreInM = this.engineParameters.bore / 1000;
                const strokeInM = this.engineParameters.stroke / 1000;
                this.engineParameters.displacement = (Math.PI * Math.pow(boreInM / 2, 2) * strokeInM * this.engineParameters.cylinders * 1000);

                // Update firing order based on engine type
                this.updateFiringOrder();
            }

            updateFiringOrder() {
                const firingOrders = {
                    'inline_3': [1, 3, 2],
                    'inline_4': [1, 3, 4, 2],
                    'inline_6': [1, 5, 3, 6, 2, 4],
                    'v6': [1, 4, 2, 5, 3, 6],
                    'v8': [1, 8, 4, 3, 6, 5, 7, 2]
                };
                this.engineParameters.firingOrder = firingOrders[this.engineParameters.engineType] || [1, 3, 4, 2];
            }

            updateFromCalculationResults(results) {
                if (!results) return;
                
                this.calculationResults = results;
                
                // Update parameters from calculation results
                if (results.engine_parameters) {
                    this.engineParameters.displacement = results.engine_parameters.displacement_liters;
                    this.engineParameters.cylinders = results.engine_parameters.num_cylinders;
                    this.engineParameters.compressionRatio = results.engine_parameters.compression_ratio;
                }
                
                if (results.performance_metrics) {
                    this.dynamicState.power = results.performance_metrics.actual_power;
                    this.dynamicState.torque = results.performance_metrics.actual_torque;
                    this.dynamicState.rpm = results.performance_metrics.power_rpm;
                }
                
                if (results.air_management) {
                    this.dynamicState.boostPressure = results.air_management.boost_pressure;
                    this.engineParameters.turbocharging = results.air_management.turbo_type.toLowerCase().replace(/\s+/g, '_');
                }
            }
        }

        // Realistic 3D Engine Visualizer
        class RealisticEngine3D {
            constructor(config) {
                this.config = config;
                this.materials = new Map();
                this.components = new Map();
                this.animationId = null;
                this.isInitialized = false;
                
                // Bind methods once
                this.boundAnimate = this.animate.bind(this);
                this.boundHandleResize = this.handleResize.bind(this);
                
                // Performance monitoring with enhanced metrics
                this.performanceMonitor = {
                    frameCount: 0,
                    lastTime: performance.now(),
                    fps: 60,
                    averageFps: 60,
                    frameHistory: [],
                    targetFps: 60
                };

                // Enhanced animation state
                this.animationState = {
                    ...this.config.animationState,
                    lastUpdateTime: 0,
                    deltaTime: 0,
                    pistonPhases: [],
                    combustionTimers: []
                };

                // Geometry cache for better performance
                this.geometryCache = new Map();
                
                // LOD (Level of Detail) management
                this.lodLevels = {
                    high: { distance: 15, detail: 1.0 },
                    medium: { distance: 30, detail: 0.7 },
                    low: { distance: 50, detail: 0.4 }
                };
            }

            async init() {
                try {
                    this.initScene();
                    this.createMaterialLibrary();
                    await this.createRealisticEngine();
                    this.setupAdvancedLighting();
                    this.setupInteractiveControls();
                    this.setupEventListeners();
                    this.initializeAnimationState();
                    this.startAnimation();
                    this.isInitialized = true;
                } catch (error) {
                    console.error('Failed to initialize 3D engine:', error);
                    throw error;
                }
            }

            dispose() {
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                    this.animationId = null;
                }
                
                // Enhanced cleanup
                this.geometryCache.forEach(geometry => geometry.dispose());
                this.geometryCache.clear();
                
                this.materials.forEach(material => {
                    if (material.map) material.map.dispose();
                    if (material.normalMap) material.normalMap.dispose();
                    if (material.roughnessMap) material.roughnessMap.dispose();
                    if (material.metalnessMap) material.metalnessMap.dispose();
                    material.dispose();
                });
                
                this.components.forEach(component => {
                    if (component.geometry) component.geometry.dispose();
                    if (component.children) {
                        component.traverse(child => {
                            if (child.geometry) child.geometry.dispose();
                            if (child.material) {
                                if (Array.isArray(child.material)) {
                                    child.material.forEach(mat => mat.dispose());
                                } else {
                                    child.material.dispose();
                                }
                            }
                        });
                    }
                });
                
                if (this.config.three.renderer) {
                    this.config.three.renderer.dispose();
                }
                
                window.removeEventListener('resize', this.boundHandleResize);
                this.isInitialized = false;
            }

            initScene() {
                const container = document.querySelector('.canvas-container');
                if (!container) {
                    throw new Error('Canvas container not found');
                }
                
                const { three } = this.config;

                // Enhanced scene setup
                three.scene = new THREE.Scene();
                three.scene.fog = new THREE.Fog(0x1a1a1a, 15, 100);
                
                // Dynamic background based on configuration
                const bgColor = this.config.appearance?.backgroundColor || 0x202020;
                three.scene.background = new THREE.Color(bgColor);

                // Improved camera setup
                const aspect = container.clientWidth / container.clientHeight;
                three.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
                three.camera.position.set(12, 8, 12);

                // Enhanced renderer with adaptive quality
                const pixelRatio = Math.min(window.devicePixelRatio, 2);
                three.renderer = new THREE.WebGLRenderer({
                    antialias: pixelRatio < 2,
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true,
                    logarithmicDepthBuffer: true
                });

                three.renderer.setSize(container.clientWidth, container.clientHeight);
                three.renderer.setPixelRatio(pixelRatio);
                
                // Advanced rendering settings
                three.renderer.shadowMap.enabled = true;
                three.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                three.renderer.shadowMap.autoUpdate = false; // Manual updates for performance
                three.renderer.toneMapping = THREE.ACESFilmicToneMapping;
                three.renderer.toneMappingExposure = 1.0;
                three.renderer.outputColorSpace = THREE.SRGBColorSpace;
                
                // Enable frustum culling and occlusion culling
                three.renderer.sortObjects = true;
                three.renderer.info.autoReset = false;
                
                container.appendChild(three.renderer.domElement);

                // Create main engine group with enhanced structure
                three.engineGroup = new THREE.Group();
                three.engineGroup.name = "EngineAssembly";
                three.scene.add(three.engineGroup);

                // Create sub-groups for better organization
                three.staticComponents = new THREE.Group();
                three.staticComponents.name = "StaticComponents";
                three.movingComponents = new THREE.Group();
                three.movingComponents.name = "MovingComponents";
                three.fluidEffects = new THREE.Group();
                three.fluidEffects.name = "FluidEffects";
                
                three.engineGroup.add(three.staticComponents, three.movingComponents, three.fluidEffects);
            }

            addComponentLabel(component, text, offset = [0, 0, 0]) {
                // Label creation with better readability
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = 512;
                canvas.height = 128;
                
                // Clear canvas
                context.fillStyle = 'rgba(255, 255, 255, 0.9)';
                context.fillRect(0, 0, canvas.width, canvas.height);
                
                // Add border
                context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
                context.lineWidth = 2;
                context.strokeRect(0, 0, canvas.width, canvas.height);
                
                // Text styling
                context.fillStyle = '#333333';
                context.font = 'bold 32px Arial, sans-serif';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                
                // Add text shadow
                context.shadowColor = 'rgba(0, 0, 0, 0.3)';
                context.shadowBlur = 4;
                context.shadowOffsetX = 2;
                context.shadowOffsetY = 2;
                
                context.fillText(text, canvas.width / 2, canvas.height / 2);
                
                const texture = new THREE.CanvasTexture(canvas);
                texture.needsUpdate = true;
                
                const labelMaterial = new THREE.MeshBasicMaterial({ 
                    map: texture, 
                    transparent: true, 
                    alphaTest: 0.1,
                    side: THREE.DoubleSide
                });
                
                const labelGeometry = new THREE.PlaneGeometry(3, 0.75);
                const label = new THREE.Mesh(labelGeometry, labelMaterial);
                label.name = `${text}_Label`;
                
                // Get component bounding box to position label at the top
                const box = new THREE.Box3().setFromObject(component);
                const componentHeight = box.max.y - box.min.y;
                const componentTop = box.max.y;
                
                // Position label above the component
                const labelHeight = 18; // Distance above component
                label.position.set(
                    offset[0], 
                    componentTop + labelHeight + offset[1], 
                    offset[2]
                );
                
                // Create connecting line from component top to label
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(0, componentTop, 0), // Start at component top
                    new THREE.Vector3(offset[0], componentTop + labelHeight * 0.96 + offset[1], offset[2]) // End near label
                ]);
                
                const lineMaterial = new THREE.LineBasicMaterial({ 
                    color: 0x666666, 
                    transparent: true, 
                    opacity: 0.7,
                    linewidth: 5
                });
                
                const line = new THREE.Line(lineGeometry, lineMaterial);
                line.name = `${text}_ConnectingLine`;
                
                // Make label always face camera
                if (this.config.three.camera) {
                    label.lookAt(this.config.three.camera.position);
                }
                
                component.add(label);
                component.add(line);
                
                // Store label and line for dynamic updates
                if (!component.userData.labels) component.userData.labels = [];
                if (!component.userData.lines) component.userData.lines = [];
                component.userData.labels.push(label);
                component.userData.lines.push(line);
            }

            async createRealisticEngine() {
                this.clearEngineComponents();

                // Component creation with progress tracking
                const componentCreators = [
                    // Engine Block & Structure
                    { name: 'Engine Block', fn: () => this.createEngineBlock(), group: 'static' },
                    { name: 'Engine Mounts', fn: () => {
                        const block = this.components.get('engineBlock');
                        if (block && this.currentBlockDimensions) {
                            this.createEngineMounts(block, this.currentBlockDimensions);
                        }
                    }, group: 'static' },
                    { name: 'Main Bearing Caps', fn: () => this.createMainBearingCaps(), group: 'static' },
                    { name: 'Cooling Passages', fn: () => {
                        const block = this.components.get('engineBlock');
                        if (block && this.currentBlockDimensions) {
                            this.createCoolingPassages(block, this.currentBlockDimensions);
                        }
                    }, group: 'static' },
                    { name: 'Cylinder Sleeves', fn: () => this.createCylinderSleeves(), group: 'static' },
                    { name: 'Engine Cover', fn: () => this.createEngineCover(), group: 'static' },
                    { name: 'Bell Housing', fn: () => this.createBellHousing(), group: 'static' },
                    { name: 'Engine Deck Plate', fn: () => this.createEngineDeckPlate(), group: 'static' },
                    { name: 'Cylinder Bore', fn: () => this.createCylinderBore(), group: 'static' },
                    { name: 'Water Jackets', fn: () => this.createWaterJackets(), group: 'static' },
                    { name: 'Core Plugs', fn: () => this.createCorePlugs(), group: 'static' },

                    // Crankshaft Assembly
                    { name: 'Crankshaft', fn: () => this.createCrankshaft(), group: 'moving' },
                    { name: 'Flywheel', fn: () => this.createFlywheel(), group: 'static' },
                    { name: 'Flywheel Ring Gear', fn: () => this.createFlywheelRingGear(), group: 'static' },
                    { name: 'Main Bearings', fn: () => this.createMainBearings(), group: 'static' },
                    { name: 'Thrust Washers', fn: () => this.createThrustWashers(), group: 'static' },
                    { name: 'Crankshaft Seal', fn: () => this.createCrankshaftSeal(), group: 'static' },
                    { name: 'Main Bearing Journals', fn: () => this.createMainBearingJournals(), group: 'static' },
                    { name: 'Rod Journals', fn: () => this.createRodJournals(), group: 'static' },

                    // Piston Assembly
                    { name: 'Pistons', fn: () => this.createPistons(), group: 'moving' },
                    { name: 'Connecting Rods', fn: () => this.createConnectingRods(), group: 'moving' },
                    { name: 'Piston Rings', fn: () => this.createPistonRingsStandalone(), group: 'static' },
                    { name: 'Piston Pins', fn: () => this.createPistonPinsStandalone(), group: 'static' },

                    // Camshaft & Valve Train
                    /*
                    { name: 'Camshaft', fn: () => this.createCamshaft(), group: 'moving' },
                    { name: 'Camlobes', fn: () => this.createCamLobes(), group: 'static' },
                    { name: 'Camshaft Gear', fn: () => this.createCamshaftGear(), group: 'static' },
                    { name: 'Timing Chain', fn: () => this.createTimingChain(), group: 'static' },
                    { name: 'Timing Belt', fn: () => this.createTimingBelt(), group: 'static' },
                    { name: 'Timing Gears', fn: () => this.createTimingGears(), group: 'static' },
                    { name: 'Timing Cover', fn: () => this.createTimingCover(), group: 'static' },
                    { name: 'Chain Tensioner', fn: () => this.createChainTensioner(), group: 'static' },
                    { name: 'Chain Guides', fn: () => this.createChainGuides(), group: 'static' },
                    { name: 'Cam Followers', fn: () => this.createCamFollowers(), group: 'moving' },
                    { name: 'Lifters', fn: () => this.createLifters(), group: 'moving' },
                    { name: 'Push Rods', fn: () => this.createPushRods(), group: 'moving' },
                    { name: 'Rocker Arms', fn: () => this.createRockerArms(), group: 'moving' },
                    { name: 'Rocker Shaft', fn: () => this.createRockerShaft(), group: 'static' },
                    { name: 'Rocker Arm Pivots', fn: () => this.createRockerArmPivots(), group: 'static' },
                    { name: 'Valve Springs', fn: () => this.createValveSprings(), group: 'static' },
                    { name: 'Valve Spring Retainers', fn: () => this.createValveSpringRetainers(), group: 'static' },
                    { name: 'Valve Keepers', fn: () => this.createValveKeepers(), group: 'static' },
                    { name: 'Valve Adjusters', fn: () => this.createValveAdjusters(), group: 'static' },
                    { name: 'Camshaft Bearings', fn: () => this.createCamshaftBearings(), group: 'static' },

                    // Cylinder Head Assembly
                    { name: 'Cylinder Heads', fn: () => this.createCylinderHeads(), group: 'static' },
                    { name: 'Valve Ports', fn: () => this.createValvePorts(), group: 'static' },
                    { name: 'Valve Assembly', fn: () => this.createValveAssembly(), group: 'static' },
                    { name: 'Intake Valves', fn: () => this.createIntakeValves(), group: 'moving' },
                    { name: 'Exhaust Valves', fn: () => this.createExhaustValves(), group: 'moving' },
                    { name: 'Valve Guides', fn: () => this.createValveGuides(), group: 'static' },
                    { name: 'Valve Seats', fn: () => this.createValveSeats(), group: 'static' },
                    { name: 'Valve Stem Seals', fn: () => this.createValveStemSeals(), group: 'static' },
                    { name: 'Head Gasket', fn: () => this.createHeadGasket(), group: 'static' },
                    { name: 'Head Bolts', fn: () => this.createHeadBolts(), group: 'static' },
                    { name: 'Valve Cover', fn: () => this.createValveCover(), group: 'static' },
                    { name: 'Valve Cover Gasket', fn: () => this.createValveCoverGasket(), group: 'static' },
                    { name: 'Combustion Chambers', fn: () => this.createCombustionChambers(), group: 'static' },

                    // Ignition System (Gasoline)
                    { name: 'Spark Plugs', fn: () => this.createSparkPlugs(), group: 'static' },
                    { name: 'Ignition Coils', fn: () => this.createIgnitionCoils(), group: 'static' },
                    { name: 'Distributor', fn: () => this.createDistributor(), group: 'static' },
                    { name: 'Distributor Cap', fn: () => this.createDistributorCap(), group: 'static' },
                    { name: 'Rotor', fn: () => this.createRotor(), group: 'static' },
                    { name: 'Spark Plug Wires', fn: () => this.createSparkPlugWires(), group: 'static' },
                    { name: 'Ignition Module', fn: () => this.createIgnitionModule(), group: 'static' },

                    // Diesel Injection System
                    { name: 'Fuel Injectors', fn: () => this.createFuelInjectors(), group: 'static' },
                    { name: 'Injection Pump', fn: () => this.createInjectionPump(), group: 'static' },
                    { name: 'High Pressure Fuel Pump', fn: () => this.createHighPressureFuelPump(), group: 'static' },
                    { name: 'Common Rail', fn: () => this.createCommonRail(), group: 'static' },
                    { name: 'Glow Plugs', fn: () => this.createGlowPlugs(), group: 'static' },
                    { name: 'Fuel Rail', fn: () => this.createFuelRail(), group: 'static' },
                    { name: 'Injector Nozzles', fn: () => this.createInjectorNozzles(), group: 'static' },
                    { name: 'Fuel Pressure Regulator', fn: () => this.createFuelPressureRegulator(), group: 'static' },

                    // Intake & Exhaust
                    { name: 'Exhaust Manifold', fn: () => this.createExhaustManifold(), group: 'static' },
                    { name: 'Intake Manifold', fn: () => this.createIntakeManifold(), group: 'static' },
                    { name: 'Turbocharger', fn: () => this.createTurbocharger(), group: 'static' },
                    { name: 'Turbo Compressor', fn: () => this.createTurboCompressor(), group: 'moving' },
                    { name: 'Turbo Turbine', fn: () => this.createTurboTurbine(), group: 'moving' },
                    { name: 'Wastegate', fn: () => this.createWastegate(), group: 'static' },
                    { name: 'Intercooler', fn: () => this.createIntercooler(), group: 'static' },
                    { name: 'Aftercooler', fn: () => this.createAftercooler(), group: 'static' },
                    { name: 'Exhaust Gas Recirculation', fn: () => this.createEGR(), group: 'static' },
                    { name: 'EGR Valve', fn: () => this.createEGRValve(), group: 'static' },
                    { name: 'Exhaust Pipe', fn: () => this.createExhaustPipe(), group: 'static' },
                    { name: 'Muffler', fn: () => this.createMuffler(), group: 'static' },
                    { name: 'Exhaust Stack', fn: () => this.createExhaustStack(), group: 'static' },
                    { name: 'Rain Cap', fn: () => this.createRainCap(), group: 'static' },

                    // Lubrication System
                    { name: 'Oil Pan', fn: () => this.createOilPan(), group: 'static' },
                    { name: 'Oil Pump', fn: () => this.createOilPump(), group: 'static' },
                    { name: 'Oil Pump Drive', fn: () => this.createOilPumpDrive(), group: 'static' },
                    { name: 'Oil Filter', fn: () => this.createOilFilter(), group: 'static' },
                    { name: 'Oil Filter Adapter', fn: () => this.createOilFilterAdapter(), group: 'static' },
                    { name: 'Oil Cooler', fn: () => this.createOilCooler(), group: 'static' },
                    { name: 'Oil Pressure Relief Valve', fn: () => this.createOilPressureReliefValve(), group: 'static' },
                    { name: 'Oil Dipstick', fn: () => this.createOilDipstick(), group: 'static' },
                    { name: 'Oil Filler Cap', fn: () => this.createOilFillerCap(), group: 'static' },
                    { name: 'Oil Galleries', fn: () => this.createOilGalleries(), group: 'static' },
                    { name: 'Oil Spray Jets', fn: () => this.createOilSprayJets(), group: 'static' },
                    { name: 'Oil Strainer', fn: () => this.createOilStrainer(), group: 'static' },
                    { name: 'Oil Level Sensor', fn: () => this.createOilLevelSensor(), group: 'static' },
                    { name: 'Oil Pressure Sensor', fn: () => this.createOilPressureSensor(), group: 'static' },

                    // Fuel System
                    { name: 'Fuel Tank', fn: () => this.createFuelTank(), group: 'static' },
                    { name: 'Fuel Pump', fn: () => this.createFuelPump(), group: 'static' },
                    { name: 'Lift Pump', fn: () => this.createLiftPump(), group: 'static' },
                    { name: 'Primary Fuel Filter', fn: () => this.createPrimaryFuelFilter(), group: 'static' },
                    { name: 'Secondary Fuel Filter', fn: () => this.createSecondaryFuelFilter(), group: 'static' },
                    { name: 'Water Separator', fn: () => this.createWaterSeparator(), group: 'static' },
                    { name: 'Fuel Lines', fn: () => this.createFuelLines(), group: 'static' },
                    { name: 'Fuel Return Line', fn: () => this.createFuelReturnLine(), group: 'static' },
                    { name: 'Carburetor', fn: () => this.createCarburetor(), group: 'static' },
                    { name: 'Throttle Body', fn: () => this.createThrottleBody(), group: 'static' },
                    { name: 'Fuel Cap', fn: () => this.createFuelCap(), group: 'static' },
                    { name: 'Fuel Gauge Sender', fn: () => this.createFuelGaugeSender(), group: 'static' },
                    { name: 'Fuel Solenoid', fn: () => this.createFuelSolenoid(), group: 'static' },
                    { name: 'Priming Pump', fn: () => this.createPrimingPump(), group: 'static' },

                    // Air Intake System
                    { name: 'Air Filter', fn: () => this.createAirFilter(), group: 'static' },
                    { name: 'Pre-cleaner', fn: () => this.createPrecleaner(), group: 'static' },
                    { name: 'Air Filter Housing', fn: () => this.createAirFilterHousing(), group: 'static' },
                    { name: 'Air Intake Tube', fn: () => this.createAirIntakeTube(), group: 'static' },
                    { name: 'Air Restriction Indicator', fn: () => this.createAirRestrictionIndicator(), group: 'static' },
                    { name: 'Mass Air Flow Sensor', fn: () => this.createMAFSensor(), group: 'static' },
                    { name: 'Throttle Position Sensor', fn: () => this.createThrottlePositionSensor(), group: 'static' },
                    { name: 'Manifold Absolute Pressure Sensor', fn: () => this.createMAPSensor(), group: 'static' },
                    { name: 'Air Intake Silencer', fn: () => this.createAirIntakeSilencer(), group: 'static' },

                    // Cooling System
                    { name: 'Radiator', fn: () => this.createRadiator(), group: 'static' },
                    { name: 'Radiator Core', fn: () => this.createRadiatorCore(), group: 'static' },
                    { name: 'Radiator Tanks', fn: () => this.createRadiatorTanks(), group: 'static' },
                    { name: 'Water Pump', fn: () => this.createWaterPump(), group: 'static' },
                    { name: 'Water Pump Impeller', fn: () => this.createWaterPumpImpeller(), group: 'moving' },
                    { name: 'Thermostat', fn: () => this.createThermostat(), group: 'static' },
                    { name: 'Thermostat Housing', fn: () => this.createThermostatHousing(), group: 'static' },
                    { name: 'Cooling Fan', fn: () => this.createCoolingFan(), group: 'moving' },
                    { name: 'Fan Clutch', fn: () => this.createFanClutch(), group: 'static' },
                    { name: 'Fan Hub', fn: () => this.createFanHub(), group: 'static' },
                    { name: 'Fan Shroud', fn: () => this.createFanShroud(), group: 'static' },
                    { name: 'Upper Radiator Hose', fn: () => this.createUpperRadiatorHose(), group: 'static' },
                    { name: 'Lower Radiator Hose', fn: () => this.createLowerRadiatorHose(), group: 'static' },
                    { name: 'Heater Hoses', fn: () => this.createHeaterHoses(), group: 'static' },
                    { name: 'Bypass Hose', fn: () => this.createBypassHose(), group: 'static' },
                    { name: 'Heater Core', fn: () => this.createHeaterCore(), group: 'static' },
                    { name: 'Expansion Tank', fn: () => this.createExpansionTank(), group: 'static' },
                    { name: 'Overflow Tank', fn: () => this.createOverflowTank(), group: 'static' },
                    { name: 'Radiator Cap', fn: () => this.createRadiatorCap(), group: 'static' },
                    { name: 'Temperature Sensor', fn: () => this.createTemperatureSensor(), group: 'static' },
                    { name: 'Coolant Temperature Switch', fn: () => this.createCoolantTemperatureSwitch(), group: 'static' },
                    { name: 'Coolant Level Sensor', fn: () => this.createCoolantLevelSensor(), group: 'static' },
                    { name: 'Block Heater', fn: () => this.createBlockHeater(), group: 'static' },

                    // Electrical System
                    { name: 'Alternator', fn: () => this.createAlternator(), group: 'static' },
                    { name: 'Alternator Brushes', fn: () => this.createAlternatorBrushes(), group: 'static' },
                    { name: 'Alternator Slip Rings', fn: () => this.createAlternatorSlipRings(), group: 'static' },
                    { name: 'Starter Motor', fn: () => this.createStarterMotor(), group: 'static' },
                    { name: 'Starter Solenoid', fn: () => this.createStarterSolenoid(), group: 'static' },
                    { name: 'Bendix Drive', fn: () => this.createBendixDrive(), group: 'static' },
                    { name: 'Battery', fn: () => this.createBattery(), group: 'static' },
                    { name: 'Battery Cables', fn: () => this.createBatteryCables(), group: 'static' },
                    { name: 'Voltage Regulator', fn: () => this.createVoltageRegulator(), group: 'static' },
                    { name: 'Engine Control Unit', fn: () => this.createECU(), group: 'static' },
                    { name: 'Wiring Harness', fn: () => this.createWiringHarness(), group: 'static' },
                    { name: 'Ground Straps', fn: () => this.createGroundStraps(), group: 'static' },
                    { name: 'Fuses', fn: () => this.createFuses(), group: 'static' },
                    { name: 'Relays', fn: () => this.createRelays(), group: 'static' },

                    // Sensors & Electronic Components
                    { name: 'Crankshaft Position Sensor', fn: () => this.createCrankshaftPositionSensor(), group: 'static' },
                    { name: 'Camshaft Position Sensor', fn: () => this.createCamshaftPositionSensor(), group: 'static' },
                    { name: 'Knock Sensor', fn: () => this.createKnockSensor(), group: 'static' },
                    { name: 'Oxygen Sensor', fn: () => this.createOxygenSensor(), group: 'static' },
                    { name: 'Engine Speed Sensor', fn: () => this.createEngineSpeedSensor(), group: 'static' },
                    { name: 'Boost Pressure Sensor', fn: () => this.createBoostPressureSensor(), group: 'static' },
                    { name: 'Exhaust Temperature Sensor', fn: () => this.createExhaustTemperatureSensor(), group: 'static' },
                    { name: 'Intake Air Temperature Sensor', fn: () => this.createIntakeAirTemperatureSensor(), group: 'static' },

                    // Gaskets & Seals
                    { name: 'Oil Pan Gasket', fn: () => this.createOilPanGasket(), group: 'static' },
                    { name: 'Intake Manifold Gasket', fn: () => this.createIntakeManifoldGasket(), group: 'static' },
                    { name: 'Exhaust Manifold Gasket', fn: () => this.createExhaustManifoldGasket(), group: 'static' },
                    { name: 'Timing Cover Gasket', fn: () => this.createTimingCoverGasket(), group: 'static' },
                    { name: 'Water Pump Gasket', fn: () => this.createWaterPumpGasket(), group: 'static' },
                    { name: 'Thermostat Gasket', fn: () => this.createThermostatGasket(), group: 'static' },
                    { name: 'Front Crankshaft Seal', fn: () => this.createFrontCrankshaftSeal(), group: 'static' },
                    { name: 'Rear Crankshaft Seal', fn: () => this.createRearCrankshaftSeal(), group: 'static' },
                    { name: 'Camshaft Seal', fn: () => this.createCamshaftSeal(), group: 'static' },
                    { name: 'O-Rings', fn: () => this.createORings(), group: 'static' },

                    // Belts & Pulleys
                    { name: 'Drive Belt', fn: () => this.createDriveBelt(), group: 'static' },
                    { name: 'Serpentine Belt', fn: () => this.createSerpentineBelt(), group: 'static' },
                    { name: 'Fan Belt', fn: () => this.createFanBelt(), group: 'static' },
                    { name: 'Alternator Pulley', fn: () => this.createAlternatorPulley(), group: 'static' },
                    { name: 'Water Pump Pulley', fn: () => this.createWaterPumpPulley(), group: 'static' },
                    { name: 'Power Steering Pump Pulley', fn: () => this.createPowerSteeringPulley(), group: 'static' },
                    { name: 'Air Conditioning Compressor Pulley', fn: () => this.createACCompressorPulley(), group: 'static' },
                    { name: 'Idler Pulleys', fn: () => this.createIdlerPulleys(), group: 'static' },
                    { name: 'Belt Tensioner', fn: () => this.createBeltTensioner(), group: 'static' },
                    { name: 'Belt Tensioner Pulley', fn: () => this.createBeltTensionerPulley(), group: 'static' },

                    // PTO & Power Take-Off
                    { name: 'PTO Shaft', fn: () => this.createPTOShaft(), group: 'moving' },
                    { name: 'PTO Clutch', fn: () => this.createPTOClutch(), group: 'static' },
                    { name: 'PTO Gearbox', fn: () => this.createPTOGearbox(), group: 'static' },
                    { name: 'PTO Cover', fn: () => this.createPTOCover(), group: 'static' },
                    { name: 'PTO Shield', fn: () => this.createPTOShield(), group: 'static' },
                    { name: 'PTO Engagement Lever', fn: () => this.createPTOEngagementLever(), group: 'static' },

                    // Engine Mounting & Vibration
                    { name: 'Engine Brackets', fn: () => this.createEngineBrackets(), group: 'static' },
                    { name: 'Vibration Dampers', fn: () => this.createVibrationDampers(), group: 'static' },
                    { name: 'Harmonic Balancer', fn: () => this.createHarmonicBalancer(), group: 'static' },
                    { name: 'Engine Isolators', fn: () => this.createEngineIsolators(), group: 'static' },
                    { name: 'Flex Plate', fn: () => this.createFlexPlate(), group: 'static' },

                    // Emissions Control
                    { name: 'Catalytic Converter', fn: () => this.createCatalyticConverter(), group: 'static' },
                    { name: 'DPF Filter', fn: () => this.createDPFFilter(), group: 'static' },
                    { name: 'DPF Regeneration System', fn: () => this.createDPFRegenerationSystem(), group: 'static' },
                    { name: 'SCR System', fn: () => this.createSCRSystem(), group: 'static' },
                    { name: 'DEF Tank', fn: () => this.createDEFTank(), group: 'static' },
                    { name: 'DEF Injector', fn: () => this.createDEFInjector(), group: 'static' },
                    { name: 'NOx Sensor', fn: () => this.createNOxSensor(), group: 'static' },
                    { name: 'Soot Sensor', fn: () => this.createSootSensor(), group: 'static' },
                    { name: 'Particulate Matter Sensor', fn: () => this.createParticulateMatterSensor(), group: 'static' },

                    // Governor System
                    { name: 'Governor', fn: () => this.createGovernor(), group: 'static' },
                    { name: 'Governor Weights', fn: () => this.createGovernorWeights(), group: 'moving' },
                    { name: 'Governor Springs', fn: () => this.createGovernorSprings(), group: 'static' },
                    { name: 'Governor Linkage', fn: () => this.createGovernorLinkage(), group: 'static' },
                    { name: 'Throttle Linkage', fn: () => this.createThrottleLinkage(), group: 'static' },

                    // Auxiliary Systems
                    { name: 'Air Compressor', fn: () => this.createAirCompressor(), group: 'static' },
                    { name: 'Hydraulic Pump', fn: () => this.createHydraulicPump(), group: 'static' },
                    { name: 'Power Steering Pump', fn: () => this.createPowerSteeringPump(), group: 'static' },
                    { name: 'AC Compressor', fn: () => this.createACCompressor(), group: 'static' },
                    { name: 'Vacuum Pump', fn: () => this.createVacuumPump(), group: 'static' },

                    // Fasteners & Hardware
                    { name: 'Head Studs', fn: () => this.createHeadStuds(), group: 'static' },
                    { name: 'Main Cap Bolts', fn: () => this.createMainCapBolts(), group: 'static' },
                    { name: 'Flywheel Bolts', fn: () => this.createFlywheelBolts(), group: 'static' },
                    { name: 'Timing Cover Bolts', fn: () => this.createTimingCoverBolts(), group: 'static' },
                    { name: 'Oil Pan Bolts', fn: () => this.createOilPanBolts(), group: 'static' },
                    { name: 'Manifold Bolts', fn: () => this.createManifoldBolts(), group: 'static' },

                    // Miscellaneous
                    { name: 'Engine Oil Drain Plug', fn: () => this.createOilDrainPlug(), group: 'static' },
                    { name: 'Breather System', fn: () => this.createBreatherSystem(), group: 'static' },
                    { name: 'Crankcase Ventilation', fn: () => this.createCrankcaseVentilation(), group: 'static' },
                    { name: 'PCV Valve', fn: () => this.createPCVValve(), group: 'static' },
                    { name: 'Engine Tags', fn: () => this.createEngineTags(), group: 'static' },
                    { name: 'Inspection Plates', fn: () => this.createInspectionPlates(), group: 'static' },
                    { name: 'Lifting Eyes', fn: () => this.createLiftingEyes(), group: 'static' },
                    { name: 'Engine Serial Plate', fn: () => this.createEngineSerialPlate(), group: 'static' },
                    { name: 'Safety Decals', fn: () => this.createSafetyDecals(), group: 'static' },
                    { name: 'Hour Meter', fn: () => this.createHourMeter(), group: 'static' },
                    { name: 'Engine Stop Solenoid', fn: () => this.createEngineStopSolenoid(), group: 'static' },
                    { name: 'Fuel Shut-off Valve', fn: () => this.createFuelShutoffValve(), group: 'static' },

                    // Effects & Systems
                    { name: 'Piping System', fn: () => this.createPipingSystem(), group: 'static' },
                    { name: 'Fluid Flows', fn: () => this.createFluidFlows(), group: 'effects' },
                    { name: 'Heat Dissipation', fn: () => this.createHeatDissipation(), group: 'effects' },
                    { name: 'Exhaust Flow', fn: () => this.createExhaustFlow(), group: 'effects' },
                    { name: 'Combustion Effects', fn: () => this.createCombustionEffects(), group: 'effects' },
                    { name: 'Vibration Effects', fn: () => this.createVibrationEffects(), group: 'effects' },
                    { name: 'Sound Effects', fn: () => this.createSoundEffects(), group: 'effects' } 
                    */
                ];

                // Create components with better async handling
                let completed = 0;
                for (const creator of componentCreators) {
                await new Promise(resolve => {
                try {
                creator.fn();
                completed++;

                // Dispatch progress event
                if (this.config.onProgress) {
                this.config.onProgress({
                phase: 'creating_components',
                progress: completed / componentCreators.length,
                currentComponent: creator.name
                });
                }
                } catch (error) {
                console.warn(`Failed to create ${creator.name}:`, error);
                }

                // Yield control for smoother experience
                setTimeout(resolve, 1);
                });
                }

                // Initialize Animation States
                this.initializePistonAnimationStates();

                // Initialize combustion effect materials
                this.initializeCombustionEffects();

                // Optimize scene after creation
                this.optimizeScene();
                this.config.three.camera.lookAt(0, 0, 0);
            }

            shouldUpdateFrame() {
                // More sophisticated frame skipping
                const targetFps = this.performanceMonitor.targetFps;
                const currentFps = this.performanceMonitor.fps;
                
                if (currentFps < targetFps * 0.5) {
                    return this.performanceMonitor.frameCount % 3 === 0;
                } else if (currentFps < targetFps * 0.75) {
                    return this.performanceMonitor.frameCount % 2 === 0;
                }
                
                return true;
            }

            createMaterialLibrary() {
                const materialConfigs = this.getMaterialConfigurations();
                
                // Enhanced material creation with PBR textures simulation
                Object.entries(materialConfigs).forEach(([name, config]) => {
                    this.materials.set(name, this.createAdvancedMaterial(config));
                });
            }

            getMaterialConfigurations() {
                const { blockMaterial, headMaterial } = this.config.engineParameters;
                
                const materialProperties = {
                    'gray_iron': { 
                        color: 0x2a2a2a, 
                        metalness: 0.9, 
                        roughness: 0.4,
                        normalScale: 0.3,
                        envMapIntensity: 1.0
                    },
                    'ductile_iron': { 
                        color: 0x353535, 
                        metalness: 0.85, 
                        roughness: 0.35,
                        normalScale: 0.25,
                        envMapIntensity: 0.9
                    },
                    'compacted_graphite': { 
                        color: 0x404040, 
                        metalness: 0.8, 
                        roughness: 0.3,
                        normalScale: 0.2,
                        envMapIntensity: 0.8
                    },
                    'aluminum_alloy': { 
                        color: 0xc0c0c0, 
                        metalness: 0.7, 
                        roughness: 0.15,
                        normalScale: 0.1,
                        envMapIntensity: 1.2
                    },
                    'vermicular_iron': { 
                        color: 0x2f2f2f, 
                        metalness: 0.9, 
                        roughness: 0.35,
                        normalScale: 0.3,
                        envMapIntensity: 0.95
                    }
                };

                const blockProps = materialProperties[blockMaterial] || materialProperties['gray_iron'];
                const headProps = materialProperties[headMaterial] || materialProperties['gray_iron'];

                return {
                    engineBlock: { 
                        ...blockProps, 
                        clearcoat: 0.8, 
                        clearcoatRoughness: 0.2,
                        transmission: 0.0
                    },
                    cylinderHead: { 
                        ...headProps, 
                        clearcoat: 0.8, 
                        clearcoatRoughness: 0.2,
                        transmission: 0.0
                    },
                    piston: { 
                        color: 0xe0e0e0, 
                        metalness: 0.95, 
                        roughness: 0.05, 
                        clearcoat: 1.0,
                        clearcoatRoughness: 0.05,
                        normalScale: 0.1,
                        envMapIntensity: 1.5
                    },
                    crankshaft: { 
                        color: 0x404040, 
                        metalness: 1.0, 
                        roughness: 0.15,
                        normalScale: 0.2,
                        envMapIntensity: 1.1
                    },
                    turbocharger: { 
                        color: 0x606060, 
                        metalness: 0.8, 
                        roughness: 0.25,
                        normalScale: 0.15,
                        envMapIntensity: 0.9
                    },
                    hotMaterial: { 
                        color: 0xff4444, 
                        emissive: 0x441111, 
                        emissiveIntensity: 0.4, 
                        metalness: 0.8, 
                        roughness: 0.3,
                        transmission: 0.1
                    },
                    sparkPlug: { 
                        color: 0xffffff, 
                        metalness: 0.1, 
                        roughness: 0.6,
                        normalScale: 0.05,
                        clearcoat: 0.9
                    },
                    fuel: { 
                        color: 0x00dd00, 
                        transparent: true, 
                        opacity: 0.85, 
                        emissive: 0x004400,
                        emissiveIntensity: 0.3,
                        transmission: 0.9
                    },
                    air: { 
                        color: 0x4488ff, 
                        transparent: true, 
                        opacity: 0.6, 
                        emissive: 0x002244,
                        emissiveIntensity: 0.2,
                        transmission: 0.8
                    },
                    water: { 
                        color: 0x0066ff, 
                        transparent: true, 
                        opacity: 0.8, 
                        emissive: 0x001144,
                        emissiveIntensity: 0.1,
                        transmission: 0.95
                    },
                    combustion: { 
                        color: 0xff6600, 
                        transparent: true, 
                        opacity: 0.9, 
                        emissive: 0x442200, 
                        emissiveIntensity: 0.8,
                        transmission: 0.3
                    },
                    // Enhanced combustion materials
                    combustionFlame: {
                        color: 0xff3300,
                        transparent: true,
                        opacity: 0.7,
                        emissive: 0xff4400,
                        emissiveIntensity: 1.2,
                        transmission: 0.2
                    },
                    combustionCore: {
                        color: 0xffffff,
                        transparent: true,
                        opacity: 0.8,
                        emissive: 0xffaa00,
                        emissiveIntensity: 2.0,
                        transmission: 0.1
                    },
                    combustionExpansion: {
                        color: 0xff8800,
                        transparent: true,
                        opacity: 0.5,
                        emissive: 0xff6600,
                        emissiveIntensity: 0.9,
                        transmission: 0.4
                    },
                    exhaustGas: {
                        color: 0x444444,
                        transparent: true,
                        opacity: 0.3,
                        emissive: 0x221100,
                        emissiveIntensity: 0.1,
                        transmission: 0.8
                    },
                    sparkIgnition: {
                        color: 0x00ffff,
                        transparent: true,
                        opacity: 0.9,
                        emissive: 0x00aaff,
                        emissiveIntensity: 3.0,
                        transmission: 0.1
                    },
                    oilPan: { 
                        color: 0x333333, 
                        metalness: 0.8, 
                        roughness: 0.25,
                        normalScale: 0.2,
                        envMapIntensity: 0.8
                    },
                    airFilter: { 
                        color: 0xfffaaa, 
                        metalness: 0.1, 
                        roughness: 0.9,
                        normalScale: 0.5,
                        transmission: 0.2
                    },
                    fuelPump: { 
                        color: 0x666666, 
                        metalness: 0.7, 
                        roughness: 0.3,
                        normalScale: 0.15,
                        envMapIntensity: 0.9
                    },
                    radiator: { 
                        color: 0x888888, 
                        metalness: 0.9, 
                        roughness: 0.15,
                        normalScale: 0.1,
                        envMapIntensity: 1.1
                    },
                    alternator: { 
                        color: 0x444444, 
                        metalness: 0.8, 
                        roughness: 0.25,
                        normalScale: 0.2,
                        envMapIntensity: 0.9
                    },
                    pipe: { 
                        color: 0x505050, 
                        metalness: 0.9, 
                        roughness: 0.2,
                        normalScale: 0.1,
                        envMapIntensity: 1.0
                    },
                    wire: { 
                        color: 0x800000, 
                        metalness: 0.1, 
                        roughness: 0.7,
                        normalScale: 0.3,
                        transmission: 0.1
                    },
                    coolantHose: { 
                        color: 0x000080, 
                        metalness: 0.1, 
                        roughness: 0.6,
                        normalScale: 0.4,
                        transmission: 0.2
                    },
                    fuelLine: { 
                        color: 0x404040, 
                        metalness: 0.3, 
                        roughness: 0.6,
                        normalScale: 0.3,
                        transmission: 0.1
                    },
                    vacuumHose: { 
                        color: 0x202020, 
                        metalness: 0.1, 
                        roughness: 0.8,
                        normalScale: 0.4,
                        transmission: 0.1
                    }
                };
            }

            createAdvancedMaterial(config) {
                // Ensure required properties have defaults
                const materialConfig = {
                    color: config.color || 0x808080,
                    metalness: config.metalness !== undefined ? config.metalness : 0.0,
                    roughness: config.roughness !== undefined ? config.roughness : 0.5,
                    clearcoat: config.clearcoat || 0,
                    clearcoatRoughness: config.clearcoatRoughness || 0,
                    emissive: config.emissive || 0x000000,
                    emissiveIntensity: config.emissiveIntensity || 0,
                    transparent: config.transparent || false,
                    opacity: config.opacity !== undefined ? config.opacity : 1.0,
                    transmission: config.transmission || 0,
                    envMapIntensity: config.envMapIntensity || 1.0,
                    side: THREE.FrontSide
                };

                const material = new THREE.MeshPhysicalMaterial(materialConfig);

                // Add procedural normal mapping for enhanced detail
                if (config.normalScale) {
                    material.normalScale = new THREE.Vector2(config.normalScale, config.normalScale);
                }

                return material;
            }

            
            // Update the renderer for better performance
            optimizeScene() {
                // Apply LOD optimizations
                this.config.three.engineGroup.traverse((child) => {
                    if (child.isMesh && child.geometry) {
                        // Enable frustum culling
                        child.frustumCulled = true;
                        
                        // Basic geometry optimization
                        if (child.geometry.attributes.position) {
                            child.geometry.computeBoundingSphere();
                            child.geometry.computeBoundingBox();
                        }

                        // Optimize materials
                        if (child.material) {
                            child.material.needsUpdate = false;
                        }
                    }
                });

                // Optimize shadow map settings
                if (this.config.three.renderer.shadowMap) {
                    this.config.three.renderer.shadowMap.autoUpdate = false;
                    this.config.three.renderer.shadowMap.needsUpdate = true;
                }

                // Force a single render to update shadow maps
                this.config.three.renderer.render(this.config.three.scene, this.config.three.camera);
            }

            getOptimizedGeometry(key, createFn) {
                if (!this.geometryCache.has(key)) {
                    this.geometryCache.set(key, createFn());
                }
                return this.geometryCache.get(key);
            }

            // Shadow setup
            setupShadows(mesh) {
                if (mesh.isMesh) {
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                }
                
                mesh.traverse((child) => {
                    if (child.isMesh && child !== mesh) {
                        const shouldCastShadow = this.shouldComponentCastShadow(child.name);
                        const shouldReceiveShadow = this.shouldComponentReceiveShadow(child.name);
                        
                        child.castShadow = shouldCastShadow;
                        child.receiveShadow = shouldReceiveShadow;
                    }
                });
            }

            shouldComponentCastShadow(componentName) {
                const shadowCasters = [
                    'EngineBlock', 'CylinderHead', 'Crankshaft', 'Piston', 
                    'ConnectingRod', 'Flywheel', 'CrankshaftPulley',
                    'EngineMount', 'MainBearingCap', 'EngineCover'
                ];
                
                return shadowCasters.some(name => 
                    componentName && componentName.includes(name)
                );
            }

            shouldComponentReceiveShadow(componentName) {
                const shadowReceivers = [
                    'EngineBlock', 'CylinderHead', 'OilPan', 'EngineCover',
                    'BellHousing', 'EngineDeckPlate'
                ];
                
                return shadowReceivers.some(name => 
                    componentName && componentName.includes(name)
                );
            }

            simulateEngineMotion() {
                if (!this.config.animationState.engineRunning) return;
                
                // Use consistent time and angle calculations
                const deltaTime = this.config.animationState.deltaTime || 0.016; // 60 FPS fallback
                this.config.animationState.time += deltaTime;
                
                const rpm = this.config.dynamicState.rpm;
                const angularVelocity = (rpm / 60) * 2 * Math.PI; // rad/s
                
                // Update global crank angle
                this.config.animationState.crankAngle = (this.config.animationState.time * angularVelocity) % (2 * Math.PI);
                
                // Crankshaft animation - Use X-axis for proper rotation
                if (this.config.three.crankshaft) {
                    this.config.three.crankshaft.rotation.x = this.config.animationState.crankAngle; // Use X-axis instead of Z
                    
                    // Add realistic engine vibration
                    const vibration = Math.sin(this.config.animationState.crankAngle * 4) * 0.001;
                    this.config.three.crankshaft.position.y = -2.2 + vibration; // Use base position -2.2 instead of -2.5
                }
                
                // Update Engine Components
                this.updateEngineComponents();
                
                // Update piston and connecting rod positions
                this.updatePistonPositions();
                
                // Update combustion effects
                this.updateCombustionEffects();
            }

            // Engine Block & Structure
            createEngineBlock() {
                try {
                    const { cylinders, engineType, bore } = this.config.engineParameters;
                    const engineBore = bore || 100;
                    
                    let dimensions;
                    try {
                        dimensions = this.calculateEngineDimensions(cylinders, engineType);
                        
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
                        dimensions = { width: 8.0, height: 8.5, length: 8.0 }; // Further increased fallback dimensions
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
                    
                    // Create sub-components with proper error handling
                    try {
                        this.createEngineMounts(block, dimensions);
                        this.createMainBearingCaps(block, cylinders, engineType);
                        this.createCoolingPassages(block, dimensions);
                        this.createCylinderBores(block, cylinders, engineType, engineBore, dimensions.height);
                    } catch (e) {
                        console.warn('Failed to create block sub-components:', e.message);
                    }
                    
                    this.addComponentLabel(block, 'Engine Block', [0, dimensions.height/2 + 1.2, 0]);
                    
                    this.components.set('engineBlock', block);
                    this.config.three.staticComponents.add(block);
                    
                } catch (error) {
                    console.error('Failed to create Engine Block:', error.message);
                }
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
                        () => new THREE.BoxGeometry(1.3, 0.8, 0.7) // Even larger mounts
                    );
                    
                    const mountMaterial = this.materials.get('crankshaft');
                    const mountPositions = [
                        [-dimensions.width * 0.42, -dimensions.height * 0.45, dimensions.length * 0.32],
                        [dimensions.width * 0.42, -dimensions.height * 0.45, dimensions.length * 0.32],
                        [0, -dimensions.height * 0.45, -dimensions.length * 0.42]
                    ];
                    
                    mountPositions.forEach((pos, index) => {
                        const mount = new THREE.Mesh(mountGeometry, mountMaterial);
                        mount.name = `EngineMount_${index + 1}`;
                        mount.position.set(...pos);
                        
                        mount.castShadow = true;
                        mount.receiveShadow = false;
                        
                        const boltGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 8); // Even larger bolts
                        for (let i = 0; i < 4; i++) {
                            const bolt = new THREE.Mesh(boltGeom, mountMaterial);
                            bolt.position.set(
                                (i % 2 - 0.5) * 0.6,
                                -0.4,
                                (Math.floor(i / 2) - 0.5) * 0.3
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
                    () => new THREE.BoxGeometry(1.5, 0.6, 1.3) // Much larger caps
                );
                
                for (let i = 0; i < bearingCount; i++) {
                    const cap = new THREE.Mesh(capGeometry, this.materials.get('crankshaft'));
                    cap.name = `MainBearingCap_${i + 1}`;
                    
                    const spacing = engineType.startsWith('v') ? 2.4 : 2.0; // Further increased spacing
                    cap.position.set(
                        (i - (bearingCount - 1) / 2) * spacing,
                        -3.6, // Lowered even more to accommodate larger block
                        0
                    );
                    
                    // Add bearing cap bolts
                    const boltGeom = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 8); // Longer, thicker bolts
                    for (let j = 0; j < 2; j++) {
                        const bolt = new THREE.Mesh(boltGeom, this.materials.get('crankshaft'));
                        bolt.position.set((j - 0.5) * 0.8, 0.6, 0); // Even wider spacing
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
                        () => new THREE.CylinderGeometry(0.15, 0.15, dimensions.height * 0.85, 8) // Even larger passages
                    );
                    
                    const passageCount = 10; // More passages for better cooling
                    for (let i = 0; i < passageCount; i++) {
                        const passage = new THREE.Mesh(passageGeometry, this.materials.get('water'));
                        const angle = (i / passageCount) * Math.PI * 2;
                        const radius = dimensions.width * 0.35;
                        
                        passage.position.set(
                            Math.cos(angle) * radius,
                            0,
                            Math.sin(angle) * radius
                        );
                        
                        const connectionGeom = new THREE.TorusGeometry(0.12, 0.03, 4, 8);
                        const connection = new THREE.Mesh(connectionGeom, this.materials.get('water'));
                        connection.position.y = dimensions.height * 0.32;
                        connection.rotation.x = Math.PI / 2;
                        passage.add(connection);
                        
                        block.add(passage);
                    }
                    
                    // Add water pump mounting boss
                    const pumpBossGeom = new THREE.CylinderGeometry(0.6, 0.6, 0.5, 12); // Much larger boss
                    const pumpBoss = new THREE.Mesh(pumpBossGeom, this.materials.get('engineBlock'));
                    pumpBoss.position.set(dimensions.width * 0.42, 0, dimensions.length * 0.32);
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
                        const outerRadius = 0.7; // Significantly increased from 0.55
                        const innerRadius = linerType === 'wet_sleeve' ? 0.6 : 0.63; // Increased
                        const height = 4.0; // Increased height
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
                    sleeve.position.set(position.x, position.y + 0.8, position.z); // Adjusted for much larger block
                    
                    if (engineType.startsWith('v')) {
                        const bankAngle = this.calculateBankAngle(i);
                        sleeve.rotation.z = bankAngle + Math.PI / 2;
                    } else {
                        sleeve.rotation.z = Math.PI / 2;
                    }
                    
                    // Add sleeve flange for wet sleeves
                    if (linerType === 'wet_sleeve') {
                        const flangeGeom = new THREE.CylinderGeometry(0.8, 0.8, 0.15, 16);
                        const flange = new THREE.Mesh(flangeGeom, sleeveMaterial);
                        flange.position.y = 2.0;
                        sleeve.add(flange);
                        
                        // Add O-ring seals
                        const oRingGeom = new THREE.TorusGeometry(0.65, 0.03, 8, 16);
                        for (let j = 0; j < 2; j++) {
                            const oRing = new THREE.Mesh(oRingGeom, this.materials.get('engineBlock'));
                            oRing.material = oRing.material.clone();
                            oRing.material.color.setHex(0x000000);
                            oRing.position.y = j * 1.2 - 0.6;
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
                    () => new THREE.BoxGeometry(dimensions.width + 0.7, 0.5, dimensions.length + 0.7) // Much larger cover
                );
                
                const cover = new THREE.Mesh(coverGeometry, this.materials.get('engineBlock'));
                cover.name = 'EngineCover';
                cover.position.set(0, dimensions.height/2 + 0.3, 0);
                
                // Add cover bolts
                const boltGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.6, 8);
                const boltPositions = [
                    [-dimensions.width/2, 0, -dimensions.length/2],
                    [dimensions.width/2, 0, -dimensions.length/2],
                    [-dimensions.width/2, 0, dimensions.length/2],
                    [dimensions.width/2, 0, dimensions.length/2]
                ];
                
                boltPositions.forEach((pos, index) => {
                    const bolt = new THREE.Mesh(boltGeom, this.materials.get('crankshaft'));
                    bolt.position.set(pos[0], 0.3, pos[2]);
                    cover.add(bolt);
                });
                
                // Add inspection hatches
                const hatchGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.52, 8);
                const hatch = new THREE.Mesh(hatchGeom, this.materials.get('engineBlock'));
                hatch.position.set(0, 0.25, 0);
                cover.add(hatch);
                
                this.setupShadows(cover);
                this.addComponentLabel(cover, 'Engine Cover', [0, 0.8, 0]);
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
                        const radius = 2.6; // Much larger radius
                        
                        // Create bell-shaped profile
                        shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
                        const innerRadius = 2.2; // Much larger inner radius
                        const hole = new THREE.Path();
                        hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
                        shape.holes.push(hole);
                        
                        const extrudeSettings = {
                            depth: 1.2, // Increased depth
                            bevelEnabled: true,
                            bevelThickness: 0.08,
                            bevelSize: 0.08,
                            bevelSegments: 4
                        };
                        
                        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
                    }
                );
                
                const bellHousing = new THREE.Mesh(housingGeometry, this.materials.get('engineBlock'));
                bellHousing.name = 'BellHousing';
                bellHousing.position.set(0, -0.8, -dimensions.length/2 - 0.6);
                bellHousing.rotation.x = Math.PI / 2;
                
                // Add starter mounting boss
                const starterBossGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 12);
                const starterBoss = new THREE.Mesh(starterBossGeom, this.materials.get('engineBlock'));
                starterBoss.position.set(1.6, 0, 0.3);
                starterBoss.rotation.z = Math.PI / 4;
                bellHousing.add(starterBoss);
                
                this.setupShadows(bellHousing);
                this.addComponentLabel(bellHousing, 'Bell Housing', [0, 0, 1.5]);
                this.components.set('bellHousing', bellHousing);
                this.config.three.staticComponents.add(bellHousing);
            }

            createEngineDeckPlate() {
                const { cylinders, engineType } = this.config.engineParameters;
                const dimensions = this.calculateEngineDimensions(cylinders, engineType);
                
                const deckGeometry = this.getOptimizedGeometry(
                    'engineDeck',
                    () => new THREE.BoxGeometry(dimensions.width + 0.4, 0.25, dimensions.length + 0.4) // Much larger deck
                );
                
                const deckPlate = new THREE.Mesh(deckGeometry, this.materials.get('engineBlock'));
                deckPlate.name = 'EngineDeckPlate';
                deckPlate.position.set(0, dimensions.height/2, 0);
                
                // Add cylinder bore openings
                for (let i = 0; i < cylinders; i++) {
                    const boreHoleGeom = new THREE.CylinderGeometry(0.65, 0.65, 0.3, 16); // Much larger bores
                    const boreHole = new THREE.Mesh(boreHoleGeom, this.materials.get('engineBlock'));
                    boreHole.material = boreHole.material.clone();
                    boreHole.material.transparent = true;
                    boreHole.material.opacity = 0;
                    
                    const position = this.calculateCylinderPosition(i, cylinders, engineType);
                    boreHole.position.set(position.x, 0, position.z);
                    deckPlate.add(boreHole);
                }
                
                // Add head bolt holes
                const boltHoleGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 8); // Much larger bolt holes
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
                this.addComponentLabel(deckPlate, 'Engine Deck Plate', [0, 0.5, 0]);
                this.components.set('engineDeckPlate', deckPlate);
                this.config.three.staticComponents.add(deckPlate);
            }

            createCylinderBore() {
                const { cylinders, engineType, bore: boreSize } = this.config.engineParameters;
                const boreRadius = (boreSize / 1000) * 3.5; // Further increased multiplier
                
                const boreGroup = new THREE.Group();
                boreGroup.name = 'CylinderBores';
                
                for (let i = 0; i < cylinders; i++) {
                    // Create bore geometry with surface finish details
                    const boreGeometry = this.getOptimizedGeometry(
                        `bore_${boreSize}_${i}`,
                        () => new THREE.CylinderGeometry(boreRadius, boreRadius, 4.2, 32, 1, true) // Further increased height
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
                    const crosshatchGeom = new THREE.TorusGeometry(boreRadius * 0.98, 0.004, 4, 32);
                    for (let j = 0; j < 12; j++) {
                        const ring = new THREE.Mesh(crosshatchGeom, this.materials.get('crankshaft'));
                        ring.material = ring.material.clone();
                        ring.material.color.setHex(0x555555);
                        ring.position.y = (j - 5.5) * 0.35;
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
                    const boreRadius = Math.max(0.7, (boreSize / 1000) * 3.8); // Much larger bore radius
                    const boreGeometry = this.getOptimizedGeometry(
                        `cylinderBore_${boreSize}`,
                        () => new THREE.CylinderGeometry(boreRadius, boreRadius, blockHeight * 0.98, 16, 1, true) // Nearly full height
                    );
                    
                    for (let i = 0; i < cylinders; i++) {
                        const boreMesh = new THREE.Mesh(boreGeometry, this.materials.get('engineBlock'));
                        boreMesh.name = `CylinderBore_${i + 1}`;
                        
                        const position = this.calculateCylinderPosition(i, cylinders, engineType);
                        
                        // Position bores properly within the much larger block
                        if (engineType.startsWith('v')) {
                            const bankAngle = this.calculateBankAngle(i);
                            boreMesh.position.set(position.x, position.y, position.z);
                            boreMesh.rotation.z = bankAngle;
                        } else {
                            boreMesh.position.set(position.x, position.y, position.z);
                            boreMesh.rotation.x = Math.PI / 2;
                        }
                        
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
                        () => new THREE.CylinderGeometry(0.8, 0.8, 4.0, 16, 1, true) // Much larger jacket
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
                    () => new THREE.CylinderGeometry(0.12, 0.12, dimensions.width, 8) // Larger passages
                );
                
                for (let i = 0; i < 4; i++) {
                    const passage = new THREE.Mesh(passageGeometry, this.materials.get('water'));
                    passage.position.set(0, (i - 1.5) * 1.2, 0);
                    passage.rotation.z = Math.PI / 2;
                    jacketGroup.add(passage);
                }
                
                // Add thermostat housing water jacket
                const thermostatJacketGeom = new THREE.SphereGeometry(0.4, 12, 8);
                const thermostatJacket = new THREE.Mesh(thermostatJacketGeom, this.materials.get('water'));
                thermostatJacket.position.set(dimensions.width * 0.42, 2.2, dimensions.length * 0.32);
                jacketGroup.add(thermostatJacket);
                
                this.addComponentLabel(jacketGroup, 'Water Jackets', [0, 3.0, 0]);
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
                    () => new THREE.CylinderGeometry(0.22, 0.22, 0.08, 12) // Much larger plugs
                );
                
                // Side core plugs
                const sidePlugPositions = [
                    [-dimensions.width/2 - 0.15, 0, dimensions.length * 0.32],
                    [dimensions.width/2 + 0.15, 0, dimensions.length * 0.32],
                    [-dimensions.width/2 - 0.15, 0, -dimensions.length * 0.32],
                    [dimensions.width/2 + 0.15, 0, -dimensions.length * 0.32]
                ];
                
                sidePlugPositions.forEach((pos, index) => {
                    const plug = new THREE.Mesh(plugGeometry, this.materials.get('crankshaft'));
                    plug.name = `CorePlug_Side_${index + 1}`;
                    plug.position.set(pos[0], pos[1], pos[2]);
                    plug.rotation.z = Math.PI / 2;
                    
                    // Add sealing ring
                    const sealGeom = new THREE.TorusGeometry(0.23, 0.015, 6, 12);
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
                    plug.position.set(position.x, position.y - 0.8, -dimensions.length/2 - 0.08);
                    
                    // Add sealing ring
                    const sealGeom = new THREE.TorusGeometry(0.23, 0.015, 6, 12);
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
                if (!cylinders || typeof cylinders !== 'number' || cylinders < 1 || cylinders > 16) {
                    console.warn('Invalid cylinder count, using default:', cylinders);
                    cylinders = 4;
                }
                
                if (!engineType || typeof engineType !== 'string') {
                    console.warn('Invalid engine type, using default:', engineType);
                    engineType = 'inline';
                }
                
                const baseScale = 2.2; // Further increased from 1.8
                let dimensions;
                
                try {
                    if (engineType.startsWith('v')) {
                        const vAngle = this.config.engineParameters?.vAngle || 60;
                        const cylindersPerBank = Math.ceil(cylinders / 2);
                        dimensions = {
                            width: Math.max(7.0, cylindersPerBank * baseScale + 2.0), // Much larger base and buffer
                            length: 8.5 + cylindersPerBank * 0.4, // Increased base and scaling
                            height: 9.0 + Math.sin((vAngle) * Math.PI / 180) * 3.0 // Much larger height and angle factor
                        };
                    } else if (engineType === 'boxer' || engineType === 'flat') {
                        const cylindersPerBank = Math.ceil(cylinders / 2);
                        dimensions = {
                            width: Math.max(7.0, cylindersPerBank * baseScale + 2.0), // Much larger
                            length: 8.0, // Increased from 6.5
                            height: 7.5 // Increased from 6.0
                        };
                    } else {
                        // Inline engine
                        dimensions = {
                            width: 7.5, // Increased from 6.0
                            length: Math.max(7.5, cylinders * baseScale + 2.0), // Much larger base and buffer
                            height: 9.0 // Increased from 7.5
                        };
                    }
                    
                    // Validate dimensions
                    Object.keys(dimensions).forEach(key => {
                        if (typeof dimensions[key] !== 'number' || isNaN(dimensions[key]) || dimensions[key] <= 0) {
                            throw new Error(`Invalid ${key} dimension: ${dimensions[key]}`);
                        }
                    });
                    
                    return dimensions;
                    
                } catch (calcError) {
                    console.error('Dimension calculation error:', calcError.message);
                    return { width: 8.0, height: 8.5, length: 8.0 }; // Much larger fallback dimensions
                }
            }

            calculateCylinderPosition(cylinderIndex, totalCylinders, engineType) {
                const spacing = 2.0; // Further increased spacing from 1.6
                
                if (engineType.startsWith('v')) {
                    const bank = cylinderIndex % 2;
                    const cylinderInBank = Math.floor(cylinderIndex / 2);
                    const cylindersPerBank = Math.ceil(totalCylinders / 2);
                    const bankAngle = this.calculateBankAngle(cylinderIndex);
                    const bankOffset = 2.2; // Further increased offset from 1.8
                    
                    return {
                        x: (cylinderInBank - (cylindersPerBank - 1) / 2) * spacing,
                        y: Math.cos(bankAngle) * bankOffset,
                        z: Math.sin(bankAngle) * bankOffset
                    };
                } else if (engineType === 'boxer' || engineType === 'flat') {
                    const bank = cylinderIndex % 2;
                    const cylinderInBank = Math.floor(cylinderIndex / 2);
                    const cylindersPerBank = Math.ceil(totalCylinders / 2);
                    
                    return {
                        x: (cylinderInBank - (cylindersPerBank - 1) / 2) * spacing,
                        y: bank === 0 ? -2.2 : 2.2, // Further increased separation from 1.8
                        z: 0
                    };
                } else {
                    // Inline engine - arranged along X-axis
                    return {
                        x: (cylinderIndex - (totalCylinders - 1) / 2) * spacing,
                        y: 0,
                        z: 0
                    };
                }
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
                        { x: -0.45, z: -0.45 }, // Much larger offset for bigger cylinders
                        { x: 0.45, z: -0.45 },
                        { x: -0.45, z: 0.45 },
                        { x: 0.45, z: 0.45 }
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

            // Crankshaft Assembly
            createCrankshaft() {
                const crankGroup = new THREE.Group();
                crankGroup.name = 'Crankshaft';
                const { cylinders, stroke, engineType, firingOrder } = this.config.engineParameters;
                
                // Position crankshaft at proper height relative to engine block
                crankGroup.position.set(0, -2.2, 0);
                
                const journalLength = this.calculateJournalLength(cylinders, engineType);
                const mainJournalGeometry = this.getOptimizedGeometry(
                    `crankJournal_${journalLength}`,
                    () => new THREE.CylinderGeometry(0.35, 0.35, journalLength, 16, 1)
                );
                
                const mainJournal = new THREE.Mesh(mainJournalGeometry, this.materials.get('crankshaft'));
                mainJournal.name = 'MainJournal';
                mainJournal.rotation.z = Math.PI / 2; // Orient along X-axis
                
                mainJournal.castShadow = true;
                mainJournal.receiveShadow = false;
                
                crankGroup.add(mainJournal);
                
                // Sub-methods that add to crankGroup
                this.createCrankpins(crankGroup, cylinders, stroke, engineType, firingOrder);
                this.createCounterweights(crankGroup, cylinders, engineType);
                this.createCrankshaftPulley(crankGroup, cylinders);
                this.createFlywheelConnection(crankGroup, cylinders);
                
                this.addComponentLabel(crankGroup, 'Crankshaft', [0, -1, 0]);
                
                this.components.set('crankshaft', crankGroup);
                this.config.three.crankshaft = crankGroup;
                this.config.three.movingComponents.add(crankGroup);
            }

            createCrankshaftPulley(crankGroup, cylinders) {
                const pulleyGeometry = this.getOptimizedGeometry(
                    'crankshaftPulley',
                    () => new THREE.CylinderGeometry(0.8, 0.8, 0.3, 16, 1)
                );
                
                const pulley = new THREE.Mesh(pulleyGeometry, this.materials.get('crankshaft'));
                pulley.name = 'CrankshaftPulley';
                
                // Position at front of crankshaft with proper clearance
                const frontPosition = -((cylinders - 1) * 1.95) / 2 - 2.5; // Increased clearance
                pulley.position.x = frontPosition;
                pulley.rotation.z = Math.PI / 2; // Align with crankshaft
                
                // Add pulley grooves
                for (let i = 0; i < 4; i++) {
                    const groove = new THREE.Mesh(
                        new THREE.TorusGeometry(0.75 - i * 0.08, 0.03, 4, 16),
                        this.materials.get('crankshaft')
                    );
                    groove.rotation.x = Math.PI / 2;
                    groove.position.z = (i - 1.5) * 0.06;
                    pulley.add(groove);
                }
                
                // Add harmonic balancer
                const balancerGeom = new THREE.CylinderGeometry(0.9, 0.9, 0.15, 16);
                const balancer = new THREE.Mesh(balancerGeom, this.materials.get('alternator'));
                balancer.position.z = -0.2;
                pulley.add(balancer);
                
                this.setupShadows(pulley);
                crankGroup.add(pulley);
            }

            createFlywheel() {
                const flywheelGroup = new THREE.Group();
                flywheelGroup.name = 'Flywheel';
                
                const { cylinders } = this.config.engineParameters;
                
                // Position at proper distance from engine block - match the crankshaft flywheel connection
                const flywheelPosition = ((cylinders - 1) * 1.95) / 2 + 3.5; // Increased clearance
                flywheelGroup.position.set(flywheelPosition, -2.2, 0); // Match crankshaft Y position
                
                // Main flywheel disc
                const flywheelGeometry = this.getOptimizedGeometry(
                    'flywheel_main',
                    () => new THREE.CylinderGeometry(1.4, 1.4, 0.25, 32, 1)
                );
                
                const flywheel = new THREE.Mesh(flywheelGeometry, this.materials.get('crankshaft'));
                flywheel.name = 'FlywheelDisc';
                flywheel.rotation.z = Math.PI / 2; // Correct orientation for X-axis rotation
                
                // Add mounting bolt holes with correct orientation
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    const boltHoleGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 8);
                    const boltHole = new THREE.Mesh(boltHoleGeom, this.materials.get('engineBlock'));
                    
                    boltHole.position.set(
                        0, // No X offset since flywheel rotates around X
                        Math.cos(angle) * 1.0,
                        Math.sin(angle) * 1.0
                    );
                    boltHole.rotation.x = Math.PI / 2; // Orient holes correctly
                    
                    flywheel.add(boltHole);
                }
                
                // Add balance weights
                for (let i = 0; i < 4; i++) {
                    const angle = (i / 4) * Math.PI * 2;
                    const weightGeom = new THREE.BoxGeometry(0.3, 0.15, 0.6);
                    const weight = new THREE.Mesh(weightGeom, this.materials.get('crankshaft'));
                    
                    weight.position.set(
                        0, // No X offset
                        Math.cos(angle) * 0.8,
                        Math.sin(angle) * 0.8
                    );
                    weight.rotation.x = angle; // Rotate around X-axis
                    
                    flywheel.add(weight);
                }
                
                flywheelGroup.add(flywheel);
                
                this.addComponentLabel(flywheelGroup, 'Flywheel', [0, -0.8, 0]);
                this.setupShadows(flywheelGroup);
                
                this.components.set('flywheel', flywheelGroup);
                this.config.three.staticComponents.add(flywheelGroup);
            }

            createFlywheelRingGear() {
                const ringGearGroup = new THREE.Group();
                ringGearGroup.name = 'FlywheelRingGear';
                
                const { cylinders } = this.config.engineParameters;
                
                // Position to match flywheel with proper spacing
                const ringGearPosition = ((cylinders - 1) * 1.95) / 2 + 3.5; // Increased clearance
                ringGearGroup.position.set(ringGearPosition, -2.2, 0);
                
                // Main ring gear
                const ringGearGeometry = this.getOptimizedGeometry(
                    'flywheel_ring_gear',
                    () => new THREE.TorusGeometry(1.35, 0.12, 8, 48)
                );
                
                const ringGear = new THREE.Mesh(ringGearGeometry, this.materials.get('alternator'));
                ringGear.name = 'RingGearMain';
                ringGear.rotation.x = Math.PI / 2; // Orient correctly for X-axis rotation
                
                // Add gear teeth detail
                for (let i = 0; i < 96; i++) {
                    const angle = (i / 96) * Math.PI * 2;
                    const toothGeom = new THREE.BoxGeometry(0.05, 0.15, 0.08);
                    const tooth = new THREE.Mesh(toothGeom, this.materials.get('alternator'));
                    
                    tooth.position.set(
                        0, // No X offset
                        Math.cos(angle) * 1.47,
                        Math.sin(angle) * 1.47
                    );
                    tooth.rotation.x = angle; // Rotate around X-axis
                    
                    ringGear.add(tooth);
                }
                
                ringGearGroup.add(ringGear);
                
                this.addComponentLabel(ringGearGroup, 'Ring Gear', [0, -0.5, 0]);
                this.setupShadows(ringGearGroup);
                
                this.components.set('flywheelRingGear', ringGearGroup);
                this.config.three.staticComponents.add(ringGearGroup);
            }

            createFlywheelConnection(crankGroup, cylinders) {
                const flywheelGeometry = this.getOptimizedGeometry(
                    'flywheel',
                    () => new THREE.CylinderGeometry(1.2, 1.2, 0.2, 24, 1)
                );
                
                const flywheel = new THREE.Mesh(flywheelGeometry, this.materials.get('crankshaft'));
                flywheel.name = 'Flywheel';
                
                // Position at rear of crankshaft with proper clearance from last cylinder
                // Use same calculation as other crankshaft components for consistency
                const rearPosition = ((cylinders - 1) * 1.95) / 2 + 3.5; // Increased clearance from 2.5 to 3.5
                flywheel.position.x = rearPosition;
                flywheel.rotation.z = Math.PI / 2; // Align with crankshaft
                
                // Add flywheel ring gear
                const ringGearGeom = new THREE.TorusGeometry(1.15, 0.08, 8, 32);
                const ringGear = new THREE.Mesh(ringGearGeom, this.materials.get('alternator'));
                ringGear.rotation.x = Math.PI / 2; // Correct orientation
                flywheel.add(ringGear);
                
                // Add clutch mounting surface
                const clutchSurfaceGeom = new THREE.CylinderGeometry(0.9, 0.9, 0.05, 16);
                const clutchSurface = new THREE.Mesh(clutchSurfaceGeom, this.materials.get('engineBlock'));
                clutchSurface.position.z = 0.12;
                flywheel.add(clutchSurface);
                
                this.setupShadows(flywheel);
                crankGroup.add(flywheel);
            }

            createCounterweights(crankGroup, cylinders, engineType) {
                const weightCount = engineType.startsWith('v') ? cylinders : Math.ceil(cylinders / 2);
                
                for (let i = 0; i < weightCount; i++) {
                    const weightGeometry = this.getOptimizedGeometry(
                        `counterweight_${i}`,
                        () => {
                            const shape = new THREE.Shape();
                            shape.moveTo(-0.6, -0.3);
                            shape.lineTo(0.6, -0.3);
                            shape.lineTo(0.8, -0.1);
                            shape.lineTo(0.8, 0.3);
                            shape.lineTo(-0.8, 0.3);
                            shape.lineTo(-0.8, -0.1);
                            shape.closePath();
                            
                            return new THREE.ExtrudeGeometry(shape, {
                                depth: 0.25,
                                bevelEnabled: true,
                                bevelThickness: 0.02,
                                bevelSize: 0.02
                            });
                        }
                    );
                    
                    const weight = new THREE.Mesh(weightGeometry, this.materials.get('crankshaft'));
                    weight.name = `Counterweight_${i + 1}`;
                    
                    // Position along crankshaft between cylinders, not at cylinder positions
                    const xPosition = (i - (weightCount - 1) / 2) * 1.95 + 0.975; // Offset by half spacing
                    weight.position.set(xPosition, 0, 0);
                    
                    // Calculate proper counterweight angle
                    const throwAngle = (i * 2 * Math.PI) / weightCount;
                    weight.rotation.x = throwAngle + Math.PI; // Opposite to crankpin
                    
                    crankGroup.add(weight);
                }
            }

            createCrankpins(crankGroup, cylinders, stroke, engineType, firingOrder) {
                const strokeRadius = (stroke / 1000) * 2.5;
                
                for (let i = 0; i < cylinders; i++) {
                    const pinGeometry = this.getOptimizedGeometry(
                        'crankpin',
                        () => new THREE.CylinderGeometry(0.28, 0.28, 0.45, 16, 1)
                    );
                    
                    const pin = new THREE.Mesh(pinGeometry, this.materials.get('crankshaft'));
                    pin.name = `Crankpin_${i + 1}`;
                    
                    // Calculate throw angle based on firing order
                    const firingIndex = firingOrder.indexOf(i + 1);
                    const throwAngle = (firingIndex * 2 * Math.PI) / cylinders;
                    
                    // Use 30% increased spacing for proper alignment
                    const xPosition = (i - (cylinders - 1) / 2) * 1.95; // 1.5 * 1.3 = 1.95
                    
                    pin.position.set(
                        xPosition,
                        Math.cos(throwAngle) * strokeRadius,
                        Math.sin(throwAngle) * strokeRadius
                    );
                    pin.rotation.z = Math.PI / 2; // Orient along X-axis
                    
                    // Add oil hole
                    const oilHoleGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 6);
                    const oilHole = new THREE.Mesh(oilHoleGeom, this.materials.get('engineBlock'));
                    oilHole.material = oilHole.material.clone();
                    oilHole.material.color.setHex(0x000000);
                    pin.add(oilHole);
                    
                    crankGroup.add(pin);
                }
            }

            createMainBearings() {
                const bearingGroup = new THREE.Group();
                bearingGroup.name = 'MainBearings';
                
                // Match the crankshaft Y position for proper alignment
                bearingGroup.position.set(0, -2.2, 0);
                
                const { cylinders } = this.config.engineParameters;
                const bearingCount = cylinders + 1; // One more bearing than cylinders
                
                for (let i = 0; i < bearingCount; i++) {
                    // Upper bearing half
                    const upperBearingGeom = this.getOptimizedGeometry(
                        'main_bearing_upper',
                        () => new THREE.CylinderGeometry(0.36, 0.36, 0.6, 16, 1, false, 0, Math.PI)
                    );
                    
                    const upperBearing = new THREE.Mesh(upperBearingGeom, this.materials.get('alternator'));
                    upperBearing.name = `MainBearing_Upper_${i + 1}`;
                    upperBearing.rotation.z = Math.PI / 2;
                    
                    // Lower bearing half
                    const lowerBearingGeom = this.getOptimizedGeometry(
                        'main_bearing_lower',
                        () => new THREE.CylinderGeometry(0.36, 0.36, 0.6, 16, 1, false, Math.PI, Math.PI)
                    );
                    
                    const lowerBearing = new THREE.Mesh(lowerBearingGeom, this.materials.get('alternator'));
                    lowerBearing.name = `MainBearing_Lower_${i + 1}`;
                    lowerBearing.rotation.z = Math.PI / 2;
                    
                    // Position bearings at main journal locations (between cylinders)
                    let xPosition;
                    if (i === 0) {
                        // First bearing - before first cylinder
                        xPosition = -((cylinders - 1) * 1.95) / 2 - 0.975;
                    } else if (i === bearingCount - 1) {
                        // Last bearing - after last cylinder
                        xPosition = ((cylinders - 1) * 1.95) / 2 + 0.975;
                    } else {
                        // Intermediate bearings - between cylinders
                        xPosition = (i - 1 - (cylinders - 2) / 2) * 1.95;
                    }
                    
                    upperBearing.position.set(xPosition, 0, 0);
                    lowerBearing.position.set(xPosition, 0, 0);
                    
                    // Add oil grooves
                    const grooveGeom = new THREE.TorusGeometry(0.37, 0.02, 4, 16);
                    const groove1 = new THREE.Mesh(grooveGeom, this.materials.get('engineBlock'));
                    groove1.rotation.x = Math.PI / 2;
                    groove1.position.z = -0.2;
                    upperBearing.add(groove1);
                    
                    const groove2 = new THREE.Mesh(grooveGeom, this.materials.get('engineBlock'));
                    groove2.rotation.x = Math.PI / 2;
                    groove2.position.z = 0.2;
                    upperBearing.add(groove2);
                    
                    bearingGroup.add(upperBearing);
                    bearingGroup.add(lowerBearing);
                }
                
                this.addComponentLabel(bearingGroup, 'Main Bearings', [0, -1, 0]);
                this.setupShadows(bearingGroup);
                
                this.components.set('mainBearings', bearingGroup);
                this.config.three.staticComponents.add(bearingGroup);
            }

            createThrustWashers() {
                const thrustGroup = new THREE.Group();
                thrustGroup.name = 'ThrustWashers';
                
                // Position to match crankshaft
                thrustGroup.position.set(0, -2.2, 0);
                
                // Front thrust washer with 30% increased positioning
                const frontWasherGeom = this.getOptimizedGeometry(
                    'thrust_washer',
                    () => new THREE.RingGeometry(0.4, 0.7, 16, 1)
                );
                
                const frontWasher = new THREE.Mesh(frontWasherGeom, this.materials.get('alternator'));
                frontWasher.name = 'FrontThrustWasher';
                frontWasher.position.x = -1.56; // -1.2 * 1.3 = -1.56
                frontWasher.rotation.y = Math.PI / 2;
                
                // Rear thrust washer
                const rearWasher = new THREE.Mesh(frontWasherGeom, this.materials.get('alternator'));
                rearWasher.name = 'RearThrustWasher';
                rearWasher.position.x = 1.56; // 1.2 * 1.3 = 1.56
                rearWasher.rotation.y = Math.PI / 2;
                
                // Add thrust surface detail
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    const detailGeom = new THREE.BoxGeometry(0.05, 0.02, 0.1);
                    
                    const detail1 = new THREE.Mesh(detailGeom, this.materials.get('crankshaft'));
                    detail1.position.set(
                        0,
                        Math.cos(angle) * 0.55,
                        Math.sin(angle) * 0.55
                    );
                    frontWasher.add(detail1);
                    
                    const detail2 = new THREE.Mesh(detailGeom, this.materials.get('crankshaft'));
                    detail2.position.set(
                        0,
                        Math.cos(angle) * 0.55,
                        Math.sin(angle) * 0.55
                    );
                    rearWasher.add(detail2);
                }
                
                thrustGroup.add(frontWasher);
                thrustGroup.add(rearWasher);
                
                this.addComponentLabel(thrustGroup, 'Thrust Washers', [0, -0.8, 0]);
                this.setupShadows(thrustGroup);
                
                this.components.set('thrustWashers', thrustGroup);
                this.config.three.staticComponents.add(thrustGroup);
            }

            createCrankshaftSeal() {
                const sealGroup = new THREE.Group();
                sealGroup.name = 'CrankshaftSeals';
                
                // Position to match crankshaft
                sealGroup.position.set(0, -2.2, 0);
                
                // Front crankshaft seal with 30% increased positioning
                const frontSealGeom = this.getOptimizedGeometry(
                    'crankshaft_seal',
                    () => new THREE.CylinderGeometry(0.5, 0.5, 0.15, 16, 1)
                );
                
                const frontSeal = new THREE.Mesh(frontSealGeom, this.materials.get('engineBlock'));
                frontSeal.name = 'FrontCrankshaftSeal';
                frontSeal.position.x = -3.64; // -2.8 * 1.3 = -3.64
                frontSeal.rotation.z = Math.PI / 2;
                
                // Add rubber seal lip
                const sealLipGeom = new THREE.TorusGeometry(0.38, 0.03, 4, 16);
                const frontSealLip = new THREE.Mesh(sealLipGeom, this.materials.get('engineBlock'));
                frontSealLip.material = frontSealLip.material.clone();
                frontSealLip.material.color.setHex(0x2a2a2a);
                frontSealLip.rotation.x = Math.PI / 2;
                frontSeal.add(frontSealLip);
                
                // Rear crankshaft seal
                const rearSeal = new THREE.Mesh(frontSealGeom, this.materials.get('engineBlock'));
                rearSeal.name = 'RearCrankshaftSeal';
                rearSeal.position.x = 3.64; // 2.8 * 1.3 = 3.64
                rearSeal.rotation.z = Math.PI / 2;
                
                const rearSealLip = new THREE.Mesh(sealLipGeom, this.materials.get('engineBlock'));
                rearSealLip.material = rearSealLip.material.clone();
                rearSealLip.material.color.setHex(0x2a2a2a);
                rearSealLip.rotation.x = Math.PI / 2;
                rearSeal.add(rearSealLip);
                
                sealGroup.add(frontSeal);
                sealGroup.add(rearSeal);
                
                this.addComponentLabel(sealGroup, 'Crankshaft Seals', [0, -0.6, 0]);
                this.setupShadows(sealGroup);
                
                this.components.set('crankshaftSeal', sealGroup);
                this.config.three.staticComponents.add(sealGroup);
            }

            createMainBearingJournals() {
                const journalGroup = new THREE.Group();
                journalGroup.name = 'MainBearingJournals';
                
                // Position to match crankshaft
                journalGroup.position.set(0, -2.2, 0);
                
                const { cylinders } = this.config.engineParameters;
                const journalCount = cylinders + 1;
                
                for (let i = 0; i < journalCount; i++) {
                    const journalGeometry = this.getOptimizedGeometry(
                        'main_bearing_journal',
                        () => new THREE.CylinderGeometry(0.35, 0.35, 0.8, 20, 1)
                    );
                    
                    const journal = new THREE.Mesh(journalGeometry, this.materials.get('crankshaft'));
                    journal.name = `MainJournal_${i + 1}`;
                    journal.rotation.z = Math.PI / 2;
                    
                    // Use 30% increased spacing
                    const xPosition = (i - (journalCount - 1) / 2) * 1.95; // 1.5 * 1.3 = 1.95
                    journal.position.x = xPosition;
                    
                    // Add oil holes
                    for (let j = 0; j < 2; j++) {
                        const angle = j * Math.PI;
                        const oilHoleGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 6);
                        const oilHole = new THREE.Mesh(oilHoleGeom, this.materials.get('engineBlock'));
                        
                        oilHole.position.set(
                            0,
                            Math.cos(angle) * 0.2,
                            Math.sin(angle) * 0.2
                        );
                        oilHole.rotation.x = angle;
                        
                        journal.add(oilHole);
                    }
                    
                    // Add journal fillet
                    const filletGeom = new THREE.TorusGeometry(0.37, 0.03, 4, 16);
                    const fillet1 = new THREE.Mesh(filletGeom, this.materials.get('crankshaft'));
                    fillet1.rotation.x = Math.PI / 2;
                    fillet1.position.z = 0.35;
                    journal.add(fillet1);
                    
                    const fillet2 = new THREE.Mesh(filletGeom, this.materials.get('crankshaft'));
                    fillet2.rotation.x = Math.PI / 2;
                    fillet2.position.z = -0.35;
                    journal.add(fillet2);
                    
                    journalGroup.add(journal);
                }
                
                this.addComponentLabel(journalGroup, 'Main Journals', [0, -1.3, 0]);
                this.setupShadows(journalGroup);
                
                this.components.set('mainBearingJournals', journalGroup);
                this.config.three.staticComponents.add(journalGroup);
            }

            createRodJournals() {
                const rodJournalGroup = new THREE.Group();
                rodJournalGroup.name = 'RodJournals';
                
                // Position to match crankshaft
                rodJournalGroup.position.set(0, -2.2, 0);
                
                const { cylinders, stroke, firingOrder } = this.config.engineParameters;
                const strokeRadius = (stroke / 1000) * 2.5;
                
                for (let i = 0; i < cylinders; i++) {
                    const journalGeometry = this.getOptimizedGeometry(
                        'rod_journal',
                        () => new THREE.CylinderGeometry(0.25, 0.25, 0.6, 16, 1)
                    );
                    
                    const journal = new THREE.Mesh(journalGeometry, this.materials.get('crankshaft'));
                    journal.name = `RodJournal_${i + 1}`;
                    journal.rotation.z = Math.PI / 2;
                    
                    // Calculate position based on firing order with 30% increased spacing
                    const firingIndex = firingOrder.indexOf(i + 1);
                    const throwAngle = (firingIndex * 2 * Math.PI) / cylinders;
                    const xPosition = (i - (cylinders - 1) / 2) * 1.95; // 1.5 * 1.3 = 1.95
                    
                    journal.position.set(
                        xPosition,
                        Math.cos(throwAngle) * strokeRadius,
                        Math.sin(throwAngle) * strokeRadius
                    );
                    
                    // Add oil supply hole
                    const oilSupplyGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 6);
                    const oilSupply = new THREE.Mesh(oilSupplyGeom, this.materials.get('engineBlock'));
                    oilSupply.rotation.y = Math.PI / 2;
                    journal.add(oilSupply);
                    
                    // Add connecting passage to main journal
                    const passageGeom = new THREE.CylinderGeometry(0.025, 0.025, strokeRadius, 6);
                    const passage = new THREE.Mesh(passageGeom, this.materials.get('engineBlock'));
                    passage.position.set(0, -strokeRadius / 2, 0);
                    passage.rotation.z = -throwAngle + Math.PI / 2;
                    journal.add(passage);
                    
                    rodJournalGroup.add(journal);
                }
                
                this.addComponentLabel(rodJournalGroup, 'Rod Journals', [0, -1.8, 0]);
                this.setupShadows(rodJournalGroup);
                
                this.components.set('rodJournals', rodJournalGroup);
                this.config.three.staticComponents.add(rodJournalGroup);
            }

            // Calculations
            calculateJournalLength(cylinders, engineType) {
                // Calculate main journal length based on engine configuration and cylinder spacing
                // Base length to span all cylinders with 1.95 unit spacing plus proper end clearances
                let baseLength = cylinders * 1.95 + 5.0; // Increased end clearances
                
                if (engineType.startsWith('v')) {
                    // V engines need additional length for structural integrity
                    baseLength += cylinders * 0.26;
                } else {
                    // Inline engines
                    baseLength += cylinders * 0.13;
                }
                
                return Math.max(baseLength, 6.0); // Increased minimum practical length
            }

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

            createPistons() {
                this.config.three.pistons = [];
                const { cylinders, bore, stroke, engineType, compressionRatio } = this.config.engineParameters;
                
                const pistonRadius = Math.max(0.6, (bore / 1000) * 3.0);
                const pistonHeight = Math.max(1.4, 2.0 + (compressionRatio - 10) * 0.1);
                
                const pistonGeometry = this.getOptimizedGeometry(
                    `piston_${bore}_${compressionRatio}`,
                    () => {
                        const crownRadius = pistonRadius * 0.98;
                        const skirtRadius = pistonRadius * 0.95;
                        return new THREE.CylinderGeometry(crownRadius, skirtRadius, pistonHeight, 32, 4);
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
                    
                    // Position piston in cylinder with proper clearance
                    const cylinderPosition = this.calculateCylinderPosition(i, cylinders, engineType);
                    pistonAssembly.position.copy(cylinderPosition);
                    
                    // Adjust for proper TDC position
                    if (engineType.startsWith('v')) {
                        const bankAngle = this.calculateBankAngle(i);
                        pistonAssembly.rotation.z = bankAngle;
                        // Position at TDC for V-engines
                        pistonAssembly.position.add(new THREE.Vector3(
                            Math.sin(bankAngle) * 1.5,
                            Math.cos(bankAngle) * 1.5,
                            0
                        ));
                    } else {
                        // Position at TDC for inline engines
                        pistonAssembly.position.y = cylinderPosition.y + 1.5;
                    }
                    
                    // Store essential data for animation
                    pistonAssembly.userData.originalPosition = pistonAssembly.position.clone();
                    pistonAssembly.userData.cylinderIndex = i;
                    pistonAssembly.userData.strokeLength = (stroke / 1000) * 2.5;
                    pistonAssembly.userData.rodLength = 3.0;
                    
                    if (i === 0) {
                        this.addComponentLabel(pistonAssembly, 'Pistons', [0, pistonHeight + 2, 0]);
                    }
                    
                    this.config.three.pistons.push(pistonAssembly);
                    this.config.three.movingComponents.add(pistonAssembly);
                }
                
                // Create connecting rods after pistons are positioned
                this.createConnectingRods();
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
                        () => new THREE.BoxGeometry(0.15, rodLength, 0.4)
                    );
                    
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
                    smallEnd.rotation.z = Math.PI / 2;
                    this.setupShadows(smallEnd);
                    rodGroup.add(smallEnd);
                    
                    // Big end (crankshaft end)
                    const bigEndGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 16);
                    const bigEnd = new THREE.Mesh(bigEndGeometry, rodMaterial);
                    bigEnd.name = 'BigEnd';
                    bigEnd.position.y = -rodLength / 2;
                    bigEnd.rotation.z = Math.PI / 2;
                    this.setupShadows(bigEnd);
                    rodGroup.add(bigEnd);
                    
                    // Position rod properly
                    rodGroup.position.y = -rodLength / 2 - 0.5;
                    
                    // Store rod data for animation
                    rodGroup.userData.rodLength = rodLength;
                    rodGroup.userData.cylinderIndex = i;
                    pistonAssembly.userData.rodLength = rodLength; // Store on piston assembly too
                    
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
                        const crownRadius = radius * 0.95;
                        const geometry = new THREE.SphereGeometry(crownRadius, 16, 8, 0, Math.PI * 2, 0, Math.PI / 3);
                        geometry.computeBoundingBox();
                        return geometry;
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

            // Calculations
            updatePistonPositions() {
                if (!this.config.three.pistons) return;
                
                const { stroke } = this.config.engineParameters;
                const strokeLength = (stroke / 1000) * 2.5; // Convert mm to scaled units
                const crankRadius = strokeLength / 2;
                
                this.config.three.pistons.forEach((pistonAssembly, index) => {
                    if (!pistonAssembly.userData.originalPosition) return;
                    
                    // Calculate cylinder-specific crank angle
                    const cylinderPhase = this.calculateCylinderPhase(index);
                    const crankAngle = this.config.animationState.crankAngle + cylinderPhase;
                    
                    // Calculate piston position using proper kinematic equations
                    const rodLength = pistonAssembly.userData.rodLength || 3.0;
                    const pistonPosition = this.calculatePistonPosition(crankAngle, crankRadius, rodLength);
                    const rodAngle = this.calculateRodAngle(crankAngle, crankRadius, rodLength);
                    
                    // Apply position relative to original position
                    const originalPos = pistonAssembly.userData.originalPosition;
                    const engineType = this.config.engineParameters.engineType;
                    
                    if (engineType.startsWith('v')) {
                        // V-engine: motion along the cylinder axis
                        const bankAngle = this.calculateBankAngle(index);
                        const motionVector = new THREE.Vector3(
                            Math.sin(bankAngle) * pistonPosition,
                            Math.cos(bankAngle) * pistonPosition,
                            0
                        );
                        pistonAssembly.position.copy(originalPos).add(motionVector);
                    } else {
                        // Inline engine: vertical motion
                        pistonAssembly.position.copy(originalPos);
                        pistonAssembly.position.y = originalPos.y + pistonPosition;
                    }
                    
                    // Update connecting rod angle
                    const connectingRod = pistonAssembly.getObjectByName(`ConnectingRod_${index + 1}`);
                    if (connectingRod) {
                        connectingRod.rotation.z = rodAngle;
                        
                        // Position rod to connect piston and crankshaft
                        const rodOffset = (rodLength / 2) + (crankRadius * Math.cos(crankAngle));
                        connectingRod.position.y = -rodOffset;
                    }
                });
            }

            // Proper kinematic calculations
            calculatePistonPosition(crankAngle, crankRadius, rodLength) {
                // Standard piston motion equation
                const primaryMotion = crankRadius * Math.cos(crankAngle);
                const secondaryMotion = (crankRadius * crankRadius / (4 * rodLength)) * Math.cos(2 * crankAngle);
                return primaryMotion + secondaryMotion;
            }

            calculateRodAngle(crankAngle, crankRadius, rodLength) {
                // Connecting rod angle calculation
                return Math.asin((crankRadius / rodLength) * Math.sin(crankAngle));
            }

            calculateCrankAngle(cylinderIndex) {
                const { cylinders } = this.config.engineParameters;
                const firingOrder = this.animationState.firingOrder || Array.from({length: cylinders}, (_, i) => i);
                
                // Calculate the crank angle based on firing order and cylinder position
                const orderIndex = firingOrder.indexOf(cylinderIndex);
                const angleIncrement = (2 * Math.PI) / cylinders;
                
                return orderIndex * angleIncrement;
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

            // Calculate proper cylinder phase offset
            calculateCylinderPhase(cylinderIndex) {
                const { cylinders } = this.config.engineParameters;
                
                // Proper firing order phases for different cylinder counts
                const firingOrderPhases = {
                    1: [0],
                    2: [0, Math.PI],
                    3: [0, 2 * Math.PI / 3, 4 * Math.PI / 3],
                    4: [0, Math.PI, 3 * Math.PI / 2, Math.PI / 2], // 1-3-4-2 firing order
                    5: [0, 4 * Math.PI / 5, 3 * Math.PI / 5, 2 * Math.PI / 5, Math.PI / 5],
                    6: [0, 2 * Math.PI / 3, 4 * Math.PI / 3, Math.PI, 5 * Math.PI / 3, Math.PI / 3],
                    8: [0, Math.PI / 2, 3 * Math.PI / 2, Math.PI, Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4, 3 * Math.PI / 4],
                    10: [0, 4 * Math.PI / 5, 3 * Math.PI / 5, Math.PI, 2 * Math.PI / 5, Math.PI / 5, 7 * Math.PI / 5, 6 * Math.PI / 5, 8 * Math.PI / 5, 9 * Math.PI / 5],
                    12: [0, 5 * Math.PI / 6, 2 * Math.PI / 3, 11 * Math.PI / 6, Math.PI / 2, 4 * Math.PI / 3, Math.PI, 7 * Math.PI / 6, Math.PI / 6, Math.PI / 3, 3 * Math.PI / 2, 5 * Math.PI / 3]
                };
                
                const phases = firingOrderPhases[cylinders] || [];
                return phases[cylinderIndex] || (cylinderIndex * 2 * Math.PI / cylinders);
            }

            // Clear All Engine Components
            clearEngineComponents() {
                // Enhanced cleanup with proper disposal
                ['staticComponents', 'movingComponents', 'fluidEffects'].forEach(groupName => {
                    const group = this.config.three[groupName];
                    if (group) {
                        while (group.children.length > 0) {
                            const child = group.children[0];
                            group.remove(child);
                            
                            if (child.geometry) child.geometry.dispose();
                            if (child.material) {
                                if (Array.isArray(child.material)) {
                                    child.material.forEach(mat => mat.dispose());
                                } else {
                                    child.material.dispose();
                                }
                            }
                        }
                    }
                });
                
                this.components.clear();
                this.geometryCache.clear();
                
                // Clear combustion effects
                if (this.combustionEffects) {
                    this.combustionEffects.cylinders.clear();
                    this.combustionEffects.sparkTimings.clear();
                    this.combustionEffects.combustionStates.clear();
                    this.combustionEffects.flameParticles.clear();
                    this.combustionEffects.exhaustParticles.clear();
                }
            }

            // Master Update Function
            updateEngineComponents() {
                if (!this.config.animationState.engineRunning) return;
                
                const deltaTime = this.animationState.deltaTime;
                this.config.animationState.time += deltaTime;
                
                // Update core engine components in order
                this.updateEngineBlockEffects();
                this.updateCrankshaftAssembly();
                this.updatePistonAssembly();
            }

            // Update Engine Block & Structure
            updateEngineMountSystem(time, rpm) {
                const engineBlock = this.components.get('engineBlock');
                
                if (engineBlock) {
                    // Calculate engine vibration
                    const vibrationAmplitude = Math.min(rpm / 6000, 1) * 0.03;
                    const vibrationFrequency = rpm / 60 * 2;
                    
                    // Apply vibration to entire engine block
                    const vibration = {
                        x: Math.sin(time * vibrationFrequency) * vibrationAmplitude,
                        y: Math.cos(time * vibrationFrequency * 1.5) * vibrationAmplitude * 0.7,
                        z: Math.sin(time * vibrationFrequency * 0.8) * vibrationAmplitude * 0.5
                    };
                    
                    // Apply vibration dampening based on mount effectiveness
                    const dampening = 0.3; // 30% vibration reduction
                    engineBlock.position.set(
                        vibration.x * (1 - dampening),
                        vibration.y * (1 - dampening),
                        vibration.z * (1 - dampening)
                    );
                    
                    // Update individual engine mounts
                    engineBlock.traverse(child => {
                        if (child.name && child.name.includes('EngineMount')) {
                            // Mount deformation under load
                            const mountLoad = vibrationAmplitude * 10;
                            child.scale.y = 1 - mountLoad * 0.1;
                            
                            // Mount temperature from friction
                            const mountTemp = 20 + mountLoad * 30;
                            if (child.material.color) {
                                const hue = Math.max(0.6 - mountTemp / 100, 0.1);
                                child.material.color.setHSL(hue, 0.7, 0.5);
                            }
                        }
                    });
                }
            }

            // Update Engine Block & Structure Effects
            updateEngineBlockEffects() {
                if (!this.config.animationState.engineRunning) return;
                
                const time = this.config.animationState.time;
                const rpm = this.config.dynamicState.rpm;
                
                // Update cooling system effects
                this.updateCoolingSystemEffects(time, rpm);
                
                // Update thermal expansion effects
                this.updateThermalExpansionEffects(time, rpm);
                
                // Update vibration dampening effects
                this.updateVibrationEffects(time, rpm);
            }

            updateCoolingSystemEffects(time, rpm) {
                const engineBlock = this.components.get('engineBlock');
                const waterJackets = this.components.get('waterJackets');
                
                if (engineBlock && waterJackets) {
                    // Simulate coolant flow with animated opacity and color changes
                    waterJackets.children.forEach((jacket, index) => {
                        if (jacket.material === this.materials.get('water')) {
                            const flowRate = rpm / 1000; // Flow rate based on RPM
                            const flowPhase = time * flowRate + index * 0.5;
                            
                            // Animate coolant flow visibility
                            jacket.material.opacity = 0.3 + Math.sin(flowPhase) * 0.1;
                            
                            // Temperature-based color variation
                            const temperature = this.config.dynamicState.temperature || 80;
                            const hue = Math.max(0.6 - (temperature - 80) / 200, 0.15); // Blue to red gradient
                            jacket.material.color.setHSL(hue, 0.8, 0.6);
                        }
                    });
                    
                    // Update cooling passages animation
                    engineBlock.traverse(child => {
                        if (child.name && child.name.includes('CoolingPassage')) {
                            const pulsePhase = time * rpm / 60 * 2; // Pulse with engine speed
                            const scale = 1 + Math.sin(pulsePhase) * 0.1;
                            child.scale.setScalar(scale);
                        }
                    });
                }
            }

            updateThermalExpansionEffects(time, rpm) {
                const engineBlock = this.components.get('engineBlock');
                const temperature = this.config.dynamicState.temperature || 20;
                
                if (engineBlock) {
                    // Simulate thermal expansion (very subtle)
                    const expansionFactor = 1 + (temperature - 20) * 0.0001; // Realistic thermal expansion
                    engineBlock.scale.setScalar(expansionFactor);
                    
                    // Update cylinder bore dimensions
                    engineBlock.traverse(child => {
                        if (child.name && child.name.includes('CylinderBore')) {
                            const thermalStress = Math.sin(time * 0.5) * 0.001;
                            child.scale.y = expansionFactor + thermalStress;
                        }
                    });
                }
            }

            updateVibrationEffects(time, rpm) {
                const engineBlock = this.components.get('engineBlock');
                const engineMounts = engineBlock?.children.filter(child => 
                    child.name && child.name.includes('EngineMount')
                );
                
                if (engineMounts && engineMounts.length > 0) {
                    const vibrationFrequency = rpm / 60 * 2; // Base vibration frequency
                    const vibrationAmplitude = Math.min(rpm / 6000, 1) * 0.02; // Amplitude based on RPM
                    
                    engineMounts.forEach((mount, index) => {
                        const phaseOffset = index * Math.PI / 2;
                        const vibration = {
                            x: Math.sin(time * vibrationFrequency + phaseOffset) * vibrationAmplitude,
                            y: Math.cos(time * vibrationFrequency * 1.5 + phaseOffset) * vibrationAmplitude * 0.5,
                            z: Math.sin(time * vibrationFrequency * 0.8 + phaseOffset) * vibrationAmplitude * 0.3
                        };
                        
                        mount.position.add(new THREE.Vector3(vibration.x, vibration.y, vibration.z));
                    });
                }
            }

            // Update Crankshaft Assembly
            updateCrankshaftAssembly() {
                if (!this.config.three.crankshaft) return;
                
                const time = this.config.animationState.time;
                const rpm = this.config.dynamicState.rpm;
                const deltaTime = this.config.animationState.deltaTime || 1/60;
                const angularVelocity = (rpm / 60) * 2 * Math.PI * deltaTime;
                
                // Update crankshaft rotation
                this.updateCrankshaftRotation(angularVelocity);
                
                // Update bearing effects
                this.updateBearingEffects(time, rpm);
                
                // Update oil circulation
                this.updateOilCirculation(time, rpm);
                
                // Update flywheel dynamics
                this.updateFlywheelEffects(time, rpm);
                
                // Update counterweight motion
                this.updateCounterweightEffects(time, rpm);
                
                // Update Main Bearings Caps
                this.updateMainBearingCaps(time, rpm);

                // Update Crankshaft Seals
                this.updateCrankshaftSeals(time, rpm);
            }

            updateCrankshaftRotation(angularVelocity) {
                // Main crankshaft rotation around X-axis
                if (this.config.three.crankshaft) {
                    this.config.animationState.crankAngle = this.config.three.crankshaft.rotation.x;
                    
                    // Update crankshaft pulley rotation
                    this.config.three.crankshaft.traverse(child => {
                        if (child.name === 'CrankshaftPulley') {
                            // Pulley rotates with crankshaft around X-axis, not on its own rotation
                            // The pulley is already oriented correctly, just needs to inherit rotation
                            // No additional rotation needed since it's part of the crankGroup
                        }
                        if (child.name === 'Flywheel') {
                            // Flywheel rotates with crankshaft around X-axis
                            // No additional rotation needed since it's part of the crankGroup
                        }
                    });
                    
                    // Update standalone flywheel to match crankshaft rotation
                    const standaloneFlywheelGroup = this.components.get('flywheel');
                    if (standaloneFlywheelGroup) {
                        standaloneFlywheelGroup.rotation.x = this.config.three.crankshaft.rotation.x;
                    }
                    
                    // Update flywheel ring gear
                    const ringGearGroup = this.components.get('flywheelRingGear');
                    if (ringGearGroup) {
                        ringGearGroup.rotation.x = this.config.three.crankshaft.rotation.x;
                    }
                }
            }

            updateMainBearingCaps(time, rpm) {
                const engineBlock = this.components.get('engineBlock');
                
                if (engineBlock) {
                    const bearingLoad = rpm / 6000; // Normalized bearing load
                    
                    engineBlock.traverse(child => {
                        if (child.name && child.name.includes('MainBearingCap')) {
                            // Bearing cap stress effects
                            const stress = bearingLoad * 0.005;
                            child.scale.y = 1 - stress;
                            
                            // Update cap bolts
                            child.traverse(bolt => {
                                if (bolt.name && bolt.name.includes('bolt')) {
                                    // Bolt tension visualization
                                    const tension = bearingLoad * 0.01;
                                    bolt.scale.y = 1 + tension;
                                    
                                    // Color change under stress
                                    if (bolt.material.color) {
                                        const stressLevel = tension * 10;
                                        bolt.material.color.setHSL(0.6 - stressLevel, 0.8, 0.5);
                                    }
                                }
                            });
                        }
                    });
                }
            }

            updateCrankshaftSeals(time, rpm) {
                const crankshaftSeal = this.components.get('crankshaftSeal');
                
                if (crankshaftSeal) {
                    const sealPressure = rpm / 1000; // Pressure on seals
                    
                    crankshaftSeal.children.forEach(seal => {
                        // Seal lip deformation under pressure
                        seal.traverse(child => {
                            if (child.name && child.name.includes('SealLip')) {
                                const deformation = sealPressure * 0.02;
                                child.scale.x = 1 + deformation;
                                
                                // Seal temperature effects
                                const temperature = 40 + sealPressure * 20;
                                const flexibility = Math.max(1 - temperature / 200, 0.7);
                                child.material.opacity = flexibility;
                            }
                        });
                        
                        // Slight seal movement due to crankshaft rotation
                        const sealMovement = Math.sin(time * rpm / 60 * 2) * 0.001;
                        seal.position.y = sealMovement;
                    });
                }
            }

            updateFlywheelEffects(time, rpm) {
                const flywheel = this.components.get('flywheel');
                
                if (flywheel) {
                    // Flywheel rotates with crankshaft around X-axis
                    if (this.config.three.crankshaft) {
                        flywheel.rotation.x = this.config.three.crankshaft.rotation.x;
                    }
                    
                    // Add minimal vibration effects - Don't override the base position
                    const inertialLoad = rpm / 6000;
                    const vibrationAmplitude = 0.001 * inertialLoad;
                    
                    // Keep base position and add vibration
                    const baseY = -2.2; // Match crankshaft Y position
                    flywheel.position.y = baseY + Math.sin(time * rpm / 60 * 4) * vibrationAmplitude;
                    
                    flywheel.traverse(child => {
                        if (child.name && child.name.includes('weight')) {
                            const centrifugalForce = inertialLoad * inertialLoad;
                            child.scale.setScalar(1 + centrifugalForce * 0.01);
                        }
                    });
                }
            }

            updateCounterweightEffects(time, rpm) {
                if (!this.config.three.crankshaft) return;
                
                const crankAngle = this.config.three.crankshaft.rotation.x; // Use X rotation
                const centrifugalEffect = Math.min(rpm / 6000, 1) * 0.02;
                
                this.config.three.crankshaft.traverse(child => {
                    if (child.name && child.name.includes('Counterweight')) {
                        // Get the counterweight index
                        const weightIndex = parseInt(child.name.split('_')[1]) - 1;
                        
                        // Calculate the weight's current angular position around X-axis
                        const weightAngle = crankAngle + (weightIndex * Math.PI);
                        
                        // Apply centrifugal effects in Y-Z plane (perpendicular to X-axis rotation)
                        const radialForceY = centrifugalEffect * Math.cos(weightAngle);
                        const radialForceZ = centrifugalEffect * Math.sin(weightAngle);
                        
                        // Reset to original position first, then apply forces
                        if (!child.userData.originalPosition) {
                            child.userData.originalPosition = {
                                x: child.position.x,
                                y: child.position.y,
                                z: child.position.z
                            };
                        }
                        
                        const orig = child.userData.originalPosition;
                        child.position.set(
                            orig.x,
                            orig.y + radialForceY * 0.05,
                            orig.z + radialForceZ * 0.05
                        );
                        
                        // Slight deformation under centrifugal force
                        const deformation = 1 + (rpm / 8000) * 0.01;
                        child.scale.set(1, deformation, deformation); // Deform in Y-Z plane
                    }
                });
            }

            updateBearingEffects(time, rpm) {
                const mainBearings = this.components.get('mainBearings');
                const thrustWashers = this.components.get('thrustWashers');
                
                if (mainBearings) {
                    const loadFactor = Math.min(rpm / 6000, 1);
                    
                    mainBearings.children.forEach((bearing, index) => {
                        if (bearing.material && bearing.material.isMateria) {
                            // Oil film visualization
                            const oilFilmThickness = Math.max(0.9 - loadFactor * 0.2, 0.6);
                            if (bearing.material.transparent !== undefined) {
                                bearing.material.opacity = oilFilmThickness;
                            }
                            
                            // Temperature color shift
                            const temperature = 80 + loadFactor * 40;
                            const hue = Math.max(0.15 - temperature / 1000, 0.05);
                            bearing.material.color.setHSL(hue, 0.6, 0.5);
                        }
                    });
                }
                
                if (thrustWashers) {
                    const thrustLoad = Math.abs(Math.sin(time * rpm / 60)) * 0.05;
                    thrustWashers.children.forEach(washer => {
                        washer.scale.setScalar(1 - thrustLoad * 0.005);
                    });
                }
            }

            updateOilCirculation(time, rpm) {
                const oilPressure = Math.min(rpm / 1000 * 50, 100);
                const flowRate = oilPressure / 100;
                
                // Update oil passages in crankshaft
                if (this.config.three.crankshaft) {
                    this.config.three.crankshaft.traverse(child => {
                        if (child.name && child.name.includes('oilHole')) {
                            const pulse = Math.sin(time * flowRate * 8) * 0.3 + 0.7;
                            child.scale.setScalar(0.8 + pulse * 0.4);
                            
                            if (child.material && child.material.color) {
                                child.material.color.setHSL(0.1, 0.8, 0.2 + pulse * 0.3);
                            }
                        }
                    });
                }
                
                // Update main bearings oil flow
                const mainBearings = this.components.get('mainBearings');
                if (mainBearings) {
                    mainBearings.traverse(child => {
                        if (child.name && child.name.includes('groove')) {
                            const flowPulse = Math.sin(time * rpm / 60 * 2) * 0.2 + 0.8;
                            child.scale.setScalar(flowPulse);
                        }
                    });
                }
            }

            // Additional helper methods for standalone components
            createFlywheel() {
                const flywheelGroup = new THREE.Group();
                flywheelGroup.name = 'Flywheel';
                flywheelGroup.position.set(2.8, -2.2, 0);
                
                const flywheelGeometry = this.getOptimizedGeometry(
                    'flywheel_main',
                    () => new THREE.CylinderGeometry(1.4, 1.4, 0.25, 32, 1)
                );
                
                const flywheel = new THREE.Mesh(flywheelGeometry, this.materials.get('crankshaft'));
                flywheel.name = 'FlywheelDisc';
                flywheel.rotation.z = Math.PI / 2; // Correct orientation
                
                // Add mounting bolt holes
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    const boltHoleGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 8);
                    const boltHole = new THREE.Mesh(boltHoleGeom, this.materials.get('engineBlock'));
                    
                    boltHole.position.set(
                        0,
                        Math.cos(angle) * 1.0,
                        Math.sin(angle) * 1.0
                    );
                    boltHole.rotation.x = Math.PI / 2;
                    
                    flywheel.add(boltHole);
                }
                
                flywheelGroup.add(flywheel);
                this.addComponentLabel(flywheelGroup, 'Flywheel', [0, -0.8, 0]);
                this.setupShadows(flywheelGroup);
                
                this.components.set('flywheel', flywheelGroup);
                this.config.three.staticComponents.add(flywheelGroup);
            }

            // Update Piston Assembly
            updatePistonAssembly() {
                if (!this.config.three.pistons || !this.config.animationState.engineRunning) return;
                
                const time = this.config.animationState.time;
                const rpm = this.config.dynamicState.rpm;
                const crankAngle = this.config.animationState.crankAngle;
                
                this.config.three.pistons.forEach((pistonAssembly, index) => {
                    this.updateIndividualPiston(pistonAssembly, index, time, rpm, crankAngle);
                });
                
                // Update piston ring dynamics
                this.updatePistonRingDynamics(time, rpm);
                
                // Update connecting rod motion
                this.updateConnectingRodMotion(time, rpm, crankAngle);
                
                // Update piston thermal effects
                this.updatePistonThermalEffects(time, rpm);
            }

            updateIndividualPiston(pistonAssembly, cylinderIndex, time, rpm, crankAngle) {
                const { stroke } = this.config.engineParameters;
                const userData = pistonAssembly.userData;
                
                if (!userData.originalPosition) return;
                
                // Calculate piston position based on crankshaft angle
                const firingOrder = this.animationState.firingOrder;
                const cylinderPhase = (firingOrder.indexOf(cylinderIndex) / firingOrder.length) * 2 * Math.PI;
                const adjustedCrankAngle = crankAngle + cylinderPhase;
                
                // Kinematic calculation for piston position
                const strokeLength = userData.strokeLength || (stroke / 1000 * 2);
                const rodLength = strokeLength * 2; // Connecting rod length
                
                // Calculate piston position using kinematic equations
                const pistonPosition = this.calculatePistonPosition(adjustedCrankAngle, strokeLength, rodLength);
                
                // Update piston assembly position
                pistonAssembly.position.copy(userData.originalPosition);
                pistonAssembly.position.y += pistonPosition;
                
                // Store animation state
                this.animationState.pistonPositions[cylinderIndex] = pistonPosition;
                this.animationState.pistonPhases[cylinderIndex] = adjustedCrankAngle;
                
                // Update connecting rod angle
                const rodAngle = this.calculateConnectingRodAngle(adjustedCrankAngle, strokeLength, rodLength);
                this.animationState.connectingRodAngles[cylinderIndex] = rodAngle;
                
                // Apply connecting rod rotation
                const connectingRod = pistonAssembly.getObjectByName(`ConnectingRod_${cylinderIndex + 1}`);
                if (connectingRod) {
                    connectingRod.rotation.z = rodAngle;
                }
            }

            calculatePistonPosition(crankAngle, strokeLength, rodLength) {
                // Classic kinematic formula for piston position
                const crankRadius = strokeLength / 2;
                const rodRatio = crankRadius / rodLength;
                
                const primaryMotion = crankRadius * Math.cos(crankAngle);
                const secondaryMotion = crankRadius * rodRatio * Math.cos(2 * crankAngle) / 4;
                
                return primaryMotion + secondaryMotion;
            }

            calculateConnectingRodAngle(crankAngle, strokeLength, rodLength) {
                const crankRadius = strokeLength / 2;
                const sinAngle = (crankRadius / rodLength) * Math.sin(crankAngle);
                return Math.asin(sinAngle);
            }

            updatePistonRingDynamics(time, rpm) {
                if (!this.config.three.pistons) return;
                
                const ringFlutterFrequency = rpm / 60 * 4; // Ring flutter based on engine speed
                const flutterAmplitude = Math.min(rpm / 8000, 1) * 0.001;
                
                this.config.three.pistons.forEach((pistonAssembly, index) => {
                    const piston = pistonAssembly.getObjectByName(`Piston_${index + 1}`);
                    if (!piston) return;
                    
                    // Update compression rings
                    ['TopCompressionRing', 'SecondCompressionRing'].forEach((ringName, ringIndex) => {
                        const ring = piston.getObjectByName(`${ringName}_${index + 1}`);
                        if (ring) {
                            const phaseOffset = ringIndex * Math.PI / 4;
                            const flutter = Math.sin(time * ringFlutterFrequency + phaseOffset) * flutterAmplitude;
                            ring.position.y = ring.userData.originalY || ring.position.y;
                            ring.position.y += flutter;
                            
                            // Store original position if not already stored
                            if (!ring.userData.originalY) {
                                ring.userData.originalY = ring.position.y;
                            }
                        }
                    });
                    
                    // Update oil control ring
                    const oilRing = piston.getObjectByName(`OilControlRing_${index + 1}`);
                    if (oilRing) {
                        // Oil ring motion is more damped
                        const dampedFlutter = Math.sin(time * ringFlutterFrequency * 0.5) * flutterAmplitude * 0.3;
                        oilRing.position.y = oilRing.userData.originalY || oilRing.position.y;
                        oilRing.position.y += dampedFlutter;
                        
                        if (!oilRing.userData.originalY) {
                            oilRing.userData.originalY = oilRing.position.y;
                        }
                    }
                });
            }

            updateConnectingRodMotion(time, rpm, crankAngle) {
                if (!this.config.three.pistons) return;
                
                this.config.three.pistons.forEach((pistonAssembly, index) => {
                    const connectingRod = pistonAssembly.getObjectByName(`ConnectingRod_${index + 1}`);
                    if (!connectingRod) return;
                    
                    const rodAngle = this.animationState.connectingRodAngles[index] || 0;
                    
                    // Apply rod rotation with some inertial effects
                    connectingRod.rotation.z = rodAngle;
                    
                    // Add slight rod bending under load (visual effect)
                    const loadFactor = Math.abs(Math.cos(this.animationState.pistonPhases[index]));
                    const bendingDeformation = loadFactor * 0.002;
                    connectingRod.scale.y = 1 - bendingDeformation;
                    
                    // Update rod bearings
                    const rodBearing = connectingRod.getObjectByName(`RodBearing_${index + 1}`);
                    if (rodBearing && rodBearing.material) {
                        // Simulate bearing temperature and oil film thickness
                        const bearingLoad = loadFactor;
                        const oilFilmThickness = Math.max(0.8 - bearingLoad * 0.2, 0.4);
                        
                        if (rodBearing.material.opacity !== undefined) {
                            rodBearing.material.opacity = oilFilmThickness;
                        }
                    }
                });
            }

            // Update Piston Assembly Effects
            updatePistonThermalEffects(time, rpm) {
                if (!this.config.three.pistons) return;
                
                const engineTemp = this.config.dynamicState.temperature || 80;
                const loadFactor = rpm / 6000;
                
                this.config.three.pistons.forEach((pistonAssembly, index) => {
                    const piston = pistonAssembly.getObjectByName(`Piston_${index + 1}`);
                    if (!piston) return;
                    
                    // Update piston crown temperature effects
                    const pistonCrown = piston.getObjectByName('PistonCrown');
                    if (pistonCrown && pistonCrown.material) {
                        // Calculate crown temperature
                        const crownTemp = engineTemp + loadFactor * 100;
                        const thermalExpansion = 1 + (crownTemp - 20) * 0.00001;
                        
                        pistonCrown.scale.setScalar(thermalExpansion);
                        
                        // Update material properties based on temperature
                        if (crownTemp > 150) {
                            pistonCrown.material.emissive.setRGB(
                                Math.min((crownTemp - 150) / 200, 0.2),
                                0,
                                0
                            );
                            pistonCrown.material.emissiveIntensity = Math.min((crownTemp - 150) / 300, 0.3);
                        }
                    }
                    
                    // Update piston skirt thermal effects
                    const pistonSkirt = piston.getObjectByName('PistonSkirt');
                    if (pistonSkirt) {
                        const skirtTemp = engineTemp + loadFactor * 50;
                        const skirtExpansion = 1 + (skirtTemp - 20) * 0.000008;
                        pistonSkirt.scale.setScalar(skirtExpansion);
                    }
                });
            }

            // Initialize combustion effects system
            initializeCombustionEffects() {
                this.combustionEffects = {
                    cylinders: new Map(),
                    sparkTimings: new Map(),
                    combustionStates: new Map(),
                    flameParticles: new Map(),
                    exhaustParticles: new Map()
                };
                
                // Initialize combustion for each cylinder
                const { cylinders } = this.config.engineParameters;
                for (let i = 0; i < cylinders; i++) {
                    this.initializeCylinderCombustion(i);
                }
            }

            // Initialize combustion for individual cylinder
            initializeCylinderCombustion(cylinderIndex) {
                const combustionGroup = new THREE.Group();
                combustionGroup.name = `CombustionChamber_${cylinderIndex + 1}`;
                
                // Create combustion flame core
                const flameCore = this.createCombustionFlameCore(cylinderIndex);
                combustionGroup.add(flameCore);
                
                // Create flame front expansion
                const flameExpansion = this.createCombustionExpansion(cylinderIndex);
                combustionGroup.add(flameExpansion);
                
                // Create spark ignition point
                const sparkIgnition = this.createSparkIgnition(cylinderIndex);
                combustionGroup.add(sparkIgnition);
                
                // Create exhaust gas simulation
                const exhaustGas = this.createExhaustGas(cylinderIndex);
                combustionGroup.add(exhaustGas);
                
                // Position in cylinder bore - KEY FIX
                const cylinderPosition = this.calculateCylinderPosition(cylinderIndex, this.config.engineParameters.cylinders, this.config.engineParameters.engineType);
                combustionGroup.position.copy(cylinderPosition);
                
                // Position in combustion chamber higher relative to cylinder head
                const { bore } = this.config.engineParameters;
                const pistonRadius = Math.max(0.6, (bore / 1000) * 3.0);
                combustionGroup.position.y = cylinderPosition.y + pistonRadius + 0.8; // Moved higher from 0.3 to 0.8
                
                // Store combustion state
                this.combustionEffects.cylinders.set(cylinderIndex, combustionGroup);
                this.combustionEffects.combustionStates.set(cylinderIndex, {
                    phase: 'intake',
                    intensity: 0,
                    sparkTiming: 0,
                    burnDuration: 0,
                    maxPressure: 0
                });
                
                // Add to moving components so it follows piston motion
                if (this.config.three.movingComponents) {
                    this.config.three.movingComponents.add(combustionGroup);
                }
            }

            // Create combustion flame core - SIZED CORRECTLY
            createCombustionFlameCore(cylinderIndex) {
                const { bore } = this.config.engineParameters;
                const pistonRadius = Math.max(0.6, (bore / 1000) * 3.0);
                const coreRadius = pistonRadius * 0.2; // Much smaller - 20% of piston radius
                
                const coreGeometry = this.getOptimizedGeometry(
                    `combustionCore_${bore}`,
                    () => new THREE.SphereGeometry(coreRadius, 12, 8) // Fewer segments for performance
                );
                
                const coreMaterial = this.materials.get('combustionCore');
                const flameCore = new THREE.Mesh(coreGeometry, coreMaterial);
                flameCore.name = `FlameCore_${cylinderIndex + 1}`;
                flameCore.visible = false;
                
                return flameCore;
            }

            // Create combustion expansion effect - SIZED CORRECTLY
            createCombustionExpansion(cylinderIndex) {
                const { bore } = this.config.engineParameters;
                const pistonRadius = Math.max(0.6, (bore / 1000) * 3.0);
                const expansionRadius = pistonRadius * 0.4; // 40% of piston radius
                
                const expansionGeometry = this.getOptimizedGeometry(
                    `combustionExpansion_${bore}`,
                    () => new THREE.SphereGeometry(expansionRadius, 16, 12)
                );
                
                const expansionMaterial = this.materials.get('combustionExpansion');
                const flameExpansion = new THREE.Mesh(expansionGeometry, expansionMaterial);
                flameExpansion.name = `FlameExpansion_${cylinderIndex + 1}`;
                flameExpansion.visible = false;
                
                return flameExpansion;
            }

            // Create spark ignition effect - MUCH SMALLER
            createSparkIgnition(cylinderIndex) {
                const sparkGeometry = this.getOptimizedGeometry(
                    'sparkIgnition',
                    () => new THREE.SphereGeometry(0.02, 6, 4) // Much smaller spark
                );
                
                const sparkMaterial = this.materials.get('sparkIgnition');
                const spark = new THREE.Mesh(sparkGeometry, sparkMaterial);
                spark.name = `SparkIgnition_${cylinderIndex + 1}`;
                spark.visible = false;
                
                // Position at spark plug location - center top of combustion chamber
                spark.position.set(0, 0.15, 0); // Slightly above center
                
                return spark;
            }

            // Create exhaust gas effect - SIZED TO CYLINDER
            createExhaustGas(cylinderIndex) {
                const { bore } = this.config.engineParameters;
                const pistonRadius = Math.max(0.6, (bore / 1000) * 3.0);
                const exhaustSize = pistonRadius * 0.8; // 80% of piston radius
                
                const exhaustGeometry = this.getOptimizedGeometry(
                    `exhaustGas_${bore}`,
                    () => new THREE.CylinderGeometry(exhaustSize, exhaustSize * 1.2, 0.3, 12) // Expanding upward
                );
                
                const exhaustMaterial = this.materials.get('exhaustGas');
                const exhaustGas = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
                exhaustGas.name = `ExhaustGas_${cylinderIndex + 1}`;
                exhaustGas.visible = false;
                
                return exhaustGas;
            }

            // Update combustion position to follow piston motion
            updateCombustionEffects() {
                if (!this.combustionEffects || !this.config.animationState.engineRunning) return;
                
                const time = this.config.animationState.time;
                const rpm = this.config.dynamicState.rpm;
                const crankAngle = this.config.animationState.crankAngle;
                
                // Update each cylinder's combustion
                this.combustionEffects.cylinders.forEach((combustionGroup, cylinderIndex) => {
                    // Update combustion chamber position to follow piston
                    if (this.config.three.pistons && this.config.three.pistons[cylinderIndex]) {
                        const pistonAssembly = this.config.three.pistons[cylinderIndex];
                        const pistonPosition = pistonAssembly.position.y;
                        
                        // Position combustion chamber just above piston
                        const cylinderPosition = this.calculateCylinderPosition(cylinderIndex, this.config.engineParameters.cylinders, this.config.engineParameters.engineType);
                        combustionGroup.position.x = cylinderPosition.x;
                        combustionGroup.position.z = cylinderPosition.z;
                        
                        // Follow piston with higher offset for combustion chamber
                        const { bore } = this.config.engineParameters;
                        const pistonRadius = Math.max(0.6, (bore / 1000) * 3.0);
                        combustionGroup.position.y = pistonPosition + pistonRadius * 1.2;
                    }
                    
                    // Apply combustion effects to ALL cylinders based on their firing sequence
                    const cylinderPhase = this.calculateCylinderPhase(cylinderIndex);
                    const adjustedAngle = (crankAngle + cylinderPhase) % (4 * Math.PI);
                    const cyclePhase = adjustedAngle / (4 * Math.PI);
                    const strokePhase = cyclePhase * 4;
                    
                    // Determine if this cylinder should be firing
                    const shouldFire = strokePhase >= 2 && strokePhase < 3; // Power stroke
                    
                    if (shouldFire) {
                        const flameCore = combustionGroup.getObjectByName(`FlameCore_${cylinderIndex + 1}`);
                        const flameExpansion = combustionGroup.getObjectByName(`FlameExpansion_${cylinderIndex + 1}`);
                        
                        const powerPhase = strokePhase - 2; // 0-1 range within power stroke
                        
                        if (flameCore) {
                            flameCore.visible = true;
                            flameCore.material.emissiveIntensity = Math.max(2 - powerPhase * 2, 0.2);
                            const coreScale = 1 + powerPhase * 0.5;
                            flameCore.scale.setScalar(coreScale);
                        }
                        
                        if (flameExpansion) {
                            flameExpansion.visible = true;
                            flameExpansion.material.emissiveIntensity = Math.max(1.5 - powerPhase * 1.2, 0.3);
                            flameExpansion.material.opacity = Math.max(0.7 - powerPhase * 0.5, 0.2);
                            const expansionScale = 1 + powerPhase * 1.5;
                            flameExpansion.scale.setScalar(expansionScale);
                            
                            // Color transition during combustion
                            const color = new THREE.Color();
                            if (powerPhase < 0.5) {
                                color.lerpColors(new THREE.Color(0xffffff), new THREE.Color(0xff6600), powerPhase * 2);
                            } else {
                                color.lerpColors(new THREE.Color(0xff6600), new THREE.Color(0x442200), (powerPhase - 0.5) * 2);
                            }
                            flameExpansion.material.emissive.copy(color);
                        }
                    } else {
                        // Hide flames when not in power stroke
                        const flameCore = combustionGroup.getObjectByName(`FlameCore_${cylinderIndex + 1}`);
                        const flameExpansion = combustionGroup.getObjectByName(`FlameExpansion_${cylinderIndex + 1}`);
                        
                        if (flameCore) flameCore.visible = false;
                        if (flameExpansion) flameExpansion.visible = false;
                    }
                    
                    this.updateCylinderCombustion(combustionGroup, cylinderIndex, time, rpm, crankAngle);
                });
            }

            // Update individual cylinder combustion - FIXED CYLINDER PHASE CALCULATION
            updateCylinderCombustion(combustionGroup, cylinderIndex, time, rpm, crankAngle) {
                // Get proper cylinder phase
                const cylinderPhase = this.calculateCylinderPhase(cylinderIndex);
                const adjustedAngle = (crankAngle + cylinderPhase) % (4 * Math.PI); // 4-stroke cycle (720°)
                const cyclePhase = adjustedAngle / (3 * Math.PI);
                
                const combustionState = this.combustionEffects.combustionStates.get(cylinderIndex);
                
                // Determine current stroke with better precision
                let currentStroke;
                const strokePhase = cyclePhase * 4; // 0-4 range for 4 strokes
                
                if (strokePhase < 1) currentStroke = 'intake';
                else if (strokePhase < 2) currentStroke = 'compression';
                else if (strokePhase < 3) currentStroke = 'power';
                else currentStroke = 'exhaust';
                
                combustionState.phase = currentStroke;
                
                // Update combustion effects based on stroke
                this.updateStrokeEffects(combustionGroup, cylinderIndex, currentStroke, cyclePhase, rpm);
            }

            // Update effects for each stroke
            updateStrokeEffects(combustionGroup, cylinderIndex, stroke, cyclePhase, rpm) {
                const flameCore = combustionGroup.getObjectByName(`FlameCore_${cylinderIndex + 1}`);
                const flameExpansion = combustionGroup.getObjectByName(`FlameExpansion_${cylinderIndex + 1}`);
                const sparkIgnition = combustionGroup.getObjectByName(`SparkIgnition_${cylinderIndex + 1}`);
                const exhaustGas = combustionGroup.getObjectByName(`ExhaustGas_${cylinderIndex + 1}`);
                
                // Reset visibility
                [flameCore, flameExpansion, sparkIgnition, exhaustGas].forEach(effect => {
                    if (effect) effect.visible = false;
                });
                
                switch (stroke) {
                    case 'intake':
                        this.updateIntakeEffects(combustionGroup, cylinderIndex, cyclePhase);
                        break;
                        
                    case 'compression':
                        this.updateCompressionEffects(combustionGroup, cylinderIndex, cyclePhase);
                        break;
                        
                    case 'power':
                        this.updatePowerStrokeEffects(combustionGroup, cylinderIndex, cyclePhase, rpm);
                        break;
                        
                    case 'exhaust':
                        this.updateExhaustEffects(combustionGroup, cylinderIndex, cyclePhase);
                        break;
                }
            }

            // Update intake stroke effects
            updateIntakeEffects(combustionGroup, cylinderIndex, cyclePhase) {
                // Subtle fuel-air mixture visualization
                const fuelAirMixture = combustionGroup.children.find(child => child.name.includes('FuelAir'));
                if (fuelAirMixture) {
                    fuelAirMixture.visible = true;
                    fuelAirMixture.material.opacity = cyclePhase * 0.3;
                }
            }

            // Update compression stroke effects
            updateCompressionEffects(combustionGroup, cylinderIndex, cyclePhase) {
                const compressionFactor = cyclePhase * 0.8 + 0.2;
                
                // Show compressed mixture getting denser
                combustionGroup.scale.setScalar(1 - cyclePhase * 0.2);
                
                // Prepare for ignition at end of compression
                if (cyclePhase > 0.9) {
                    const sparkIgnition = combustionGroup.getObjectByName(`SparkIgnition_${cylinderIndex + 1}`);
                    if (sparkIgnition) {
                        sparkIgnition.visible = true;
                        sparkIgnition.material.emissiveIntensity = (cyclePhase - 0.9) * 30;
                    }
                }
            }

            // Update power stroke effects (combustion) - FIXED SCALING
            updatePowerStrokeEffects(combustionGroup, cylinderIndex, cyclePhase, rpm) {
                const flameCore = combustionGroup.getObjectByName(`FlameCore_${cylinderIndex + 1}`);
                const flameExpansion = combustionGroup.getObjectByName(`FlameExpansion_${cylinderIndex + 1}`);
                const sparkIgnition = combustionGroup.getObjectByName(`SparkIgnition_${cylinderIndex + 1}`);
                
                const { bore } = this.config.engineParameters;
                const pistonRadius = Math.max(0.6, (bore / 1000) * 3.0);
                
                // Early power stroke - ignition and flame front expansion
                if (cyclePhase < 0.3) {
                    // Spark ignition
                    if (sparkIgnition) {
                        sparkIgnition.visible = true;
                        sparkIgnition.material.emissiveIntensity = Math.max(3 - cyclePhase * 10, 0);
                    }
                    
                    // Flame core expansion - CONSTRAINED TO CYLINDER
                    if (flameCore) {
                        flameCore.visible = true;
                        const maxCoreScale = pistonRadius * 0.3 / (pistonRadius * 0.2); // Max 30% of piston radius
                        const coreScale = Math.min(cyclePhase * 5, maxCoreScale);
                        flameCore.scale.setScalar(coreScale);
                        flameCore.material.emissiveIntensity = 2 - cyclePhase * 2;
                    }
                    
                    // Flame front expansion - CONSTRAINED TO CYLINDER
                    if (flameExpansion) {
                        flameExpansion.visible = true;
                        const maxExpansionScale = pistonRadius * 0.8 / (pistonRadius * 0.4); // Max 80% of piston radius
                        const expansionScale = Math.min(cyclePhase * 3, maxExpansionScale);
                        flameExpansion.scale.setScalar(expansionScale);
                        flameExpansion.material.opacity = Math.max(0.7 - cyclePhase * 2, 0.1);
                        flameExpansion.material.emissiveIntensity = 1 - cyclePhase;
                    }
                }
                
                // Mid to late power stroke - expansion and cooling
                else {
                    const coolingFactor = (cyclePhase - 0.3) / 0.7;
                    
                    if (flameExpansion) {
                        flameExpansion.visible = true;
                        // Keep expansion within cylinder bounds
                        const maxScale = pistonRadius * 0.9 / (pistonRadius * 0.4);
                        const expansionScale = Math.min(1 + coolingFactor * 0.5, maxScale);
                        flameExpansion.scale.setScalar(expansionScale);
                        flameExpansion.material.opacity = Math.max(0.5 - coolingFactor * 0.4, 0.1);
                        flameExpansion.material.emissiveIntensity = Math.max(0.5 - coolingFactor * 0.4, 0.1);
                        
                        // Color shift from white-hot to red-hot to dark
                        const color = new THREE.Color();
                        if (coolingFactor < 0.5) {
                            color.lerpColors(new THREE.Color(0xffffff), new THREE.Color(0xff6600), coolingFactor * 2);
                        } else {
                            color.lerpColors(new THREE.Color(0xff6600), new THREE.Color(0x442200), (coolingFactor - 0.5) * 2);
                        }
                        flameExpansion.material.emissive.copy(color);
                    }
                }
            }

            // Update exhaust stroke effects
            updateExhaustEffects(combustionGroup, cylinderIndex, cyclePhase) {
                const exhaustGas = combustionGroup.getObjectByName(`ExhaustGas_${cylinderIndex + 1}`);
                
                if (exhaustGas) {
                    exhaustGas.visible = true;
                    exhaustGas.scale.setScalar(1 + cyclePhase * 2);
                    exhaustGas.material.opacity = Math.max(0.4 - cyclePhase * 0.3, 0.1);
                    exhaustGas.position.y = cyclePhase * 2; // Rising exhaust gas
                }
                
                // Reset combustion chamber scale
                combustionGroup.scale.setScalar(1);
            }

            // Update All Engine Components
            updateThermalManagement() {
                const temperature = this.config.dynamicState.temperature || 80;
                const rpm = this.config.dynamicState.rpm || 0;
                const load = this.config.dynamicState.load || 0;
                const ambientTemp = this.config.dynamicState.ambientTemperature || 20;
                
                // Calculate dynamic thermal states
                const thermalLoad = (rpm / 6000) * (load / 100);
                const coolingEfficiency = this.calculateCoolingEfficiency(temperature, rpm);
                const thermalStress = Math.max(0, (temperature - 90) / 50); // Critical above 90°C
                
                // Update engine block thermal effects
                this.updateEngineBlockThermal(temperature, thermalStress);
                
                // Update crankshaft thermal expansion
                this.updateCrankshaftThermal(temperature, thermalLoad);
                
                // Update cooling system visualization
                this.updateCoolingSystemEffects(temperature, coolingEfficiency);
                
                // Update piston thermal effects
                this.updatePistonThermal(temperature, thermalLoad);
                
                // Thermal damage simulation
                if (temperature > 120) {
                    this.simulateThermalDamage(temperature);
                }
                
                // Store thermal history for trend analysis
                this.recordThermalHistory(temperature, thermalLoad);
            }

            updateEngineBlockThermal(temperature, thermalStress) {
                const engineBlock = this.components.get('engineBlock');
                if (!engineBlock) return;
                
                engineBlock.traverse(child => {
                    if (child.material && child.material.emissive) {
                        // Progressive thermal glow based on temperature
                        const normalizedTemp = Math.max(0, (temperature - 60) / 100);
                        const glowIntensity = normalizedTemp * 0.15;
                        
                        // Color shifts from blue (cold) to red (hot)
                        if (temperature < 60) {
                            child.material.emissive.setHex(0x001122); // Cool blue
                            child.material.emissiveIntensity = 0.02;
                        } else if (temperature < 90) {
                            child.material.emissive.setHex(0x220022); // Warm purple
                            child.material.emissiveIntensity = glowIntensity;
                        } else if (temperature < 110) {
                            child.material.emissive.setHex(0x442200); // Orange
                            child.material.emissiveIntensity = glowIntensity;
                        } else {
                            child.material.emissive.setHex(0x660000); // Hot red
                            child.material.emissiveIntensity = Math.min(glowIntensity, 0.3);
                        }
                        
                        // Thermal expansion simulation
                        const expansionFactor = 1 + (thermalStress * 0.002);
                        child.scale.set(expansionFactor, expansionFactor, expansionFactor);
                    }
                });
            }

            updateCrankshaftThermal(temperature, thermalLoad) {
                const crankshaft = this.components.get('crankshaft');
                if (!crankshaft) return;
                
                // Thermal expansion affects clearances
                const thermalExpansion = (temperature - 20) * 0.00001; // Linear expansion coefficient
                
                crankshaft.traverse(child => {
                    if (child.name && child.name.includes('Journal')) {
                        // Journal thermal expansion
                        const scaleFactor = 1 + thermalExpansion;
                        child.scale.setScalar(scaleFactor);
                        
                        // Heat discoloration on journals
                        if (child.material && temperature > 100) {
                            const heatLevel = (temperature - 100) / 50;
                            child.material.color.lerp(new THREE.Color(0x444444), heatLevel * 0.3);
                        }
                    }
                    
                    // Thermal stress visualization on counterweights
                    if (child.name && child.name.includes('Counterweight')) {
                        if (child.material && thermalLoad > 0.7) {
                            child.material.roughness = Math.min(0.3 + thermalLoad * 0.2, 0.8);
                        }
                    }
                });
            }

            updateCoolingSystemEffects(temperature, coolingEfficiency) {
                const waterJackets = this.components.get('waterJackets');
                const coolingPassages = this.components.get('coolingPassages');
                
                // Water jacket flow visualization
                if (waterJackets) {
                    waterJackets.children.forEach(jacket => {
                        if (jacket.material) {
                            // Flow rate affects opacity and color
                            const flowRate = coolingEfficiency;
                            jacket.material.opacity = 0.3 + flowRate * 0.4;
                            
                            // Temperature-based coolant color
                            if (temperature < 80) {
                                jacket.material.color.setHex(0x0066cc); // Cool blue
                            } else if (temperature < 100) {
                                jacket.material.color.setHex(0x00aacc); // Warm cyan
                            } else {
                                jacket.material.color.setHex(0x00ccaa); // Hot green
                            }
                        }
                    });
                }
                
                // Cooling passage efficiency
                if (coolingPassages) {
                    coolingPassages.children.forEach(passage => {
                        if (passage.material) {
                            // Animate coolant flow
                            const time = this.config.animationState.time || 0;
                            const flowSpeed = coolingEfficiency * 2;
                            passage.rotation.y = time * flowSpeed;
                            
                            // Cavitation effects at high temperatures
                            if (temperature > 110) {
                                passage.material.transparent = true;
                                passage.material.opacity = 0.5 + Math.sin(time * 10) * 0.2;
                            }
                        }
                    });
                }
            }

            updatePistonThermal(temperature, thermalLoad) {
                if (!this.config.three.pistons) return;
                
                this.config.three.pistons.forEach((pistonAssembly, index) => {
                    const piston = pistonAssembly.getObjectByName(`Piston_${index + 1}`);
                    if (!piston) return;
                    
                    // Piston crown thermal effects
                    const crown = piston.getObjectByName('PistonCrown');
                    if (crown && crown.material) {
                        // Crown gets hottest - thermal barrier coating simulation
                        const crownTemp = temperature + thermalLoad * 20;
                        if (crownTemp > 200) {
                            crown.material.emissive.setHex(0x330000);
                            crown.material.emissiveIntensity = Math.min((crownTemp - 200) / 100, 0.4);
                        }
                    }
                    
                    // Piston ring thermal expansion
                    ['TopCompressionRing', 'SecondCompressionRing', 'OilControlRing'].forEach(ringName => {
                        const ring = piston.getObjectByName(`${ringName}_${index + 1}`);
                        if (ring) {
                            // Ring gap changes with temperature
                            const gapIncrease = (temperature - 20) * 0.0001;
                            ring.scale.x = 1 + gapIncrease;
                            ring.scale.z = 1 + gapIncrease;
                        }
                    });
                });
            }

            calculateCoolingEfficiency(temperature, rpm) {
                // Cooling efficiency based on multiple factors
                const tempFactor = Math.max(0, 1 - (temperature - 80) / 50);
                const rpmFactor = Math.min(rpm / 3000, 1); // Water pump efficiency
                const systemHealth = 1 - (this.config.dynamicState.coolingSystemWear || 0);
                
                return tempFactor * rpmFactor * systemHealth;
            }

            simulateThermalDamage(temperature) {
                const damageRate = (temperature - 120) / 100;
                
                // Head gasket failure simulation
                if (temperature > 130) {
                    const headGasket = this.components.get('headGasket');
                    if (headGasket && headGasket.material) {
                        headGasket.material.opacity = Math.max(0.3, 1 - damageRate);
                    }
                }
                
                // Bearing damage
                if (temperature > 140) {
                    const mainBearings = this.components.get('mainBearings');
                    if (mainBearings) {
                        mainBearings.children.forEach(bearing => {
                            if (bearing.material) {
                                bearing.material.color.lerp(new THREE.Color(0x442200), damageRate * 0.5);
                            }
                        });
                    }
                }
            }

            recordThermalHistory(temperature, thermalLoad) {
                if (!this.thermalHistory) {
                    this.thermalHistory = [];
                }
                
                this.thermalHistory.push({
                    timestamp: Date.now(),
                    temperature,
                    thermalLoad,
                    position: this.thermalHistory.length
                });
                
                // Keep only last 1000 readings
                if (this.thermalHistory.length > 1000) {
                    this.thermalHistory.shift();
                }
            }

            // Enhanced Wear Indicators System
            updateWearIndicators() {
                const operatingHours = this.config.dynamicState.operatingHours || 0;
                const rpm = this.config.dynamicState.rpm || 0;
                const load = this.config.dynamicState.load || 0;
                const temperature = this.config.dynamicState.temperature || 80;
                
                // Calculate comprehensive wear factors
                const wearFactors = this.calculateWearFactors(operatingHours, rpm, load, temperature);
                
                // Update bearing wear
                this.updateBearingWear(wearFactors);
                
                // Update crankshaft wear
                this.updateCrankshaftWear(wearFactors);
                
                // Update piston and ring wear
                this.updatePistonWear(wearFactors);
                
                // Update valve train wear
                this.updateValveTrainWear(wearFactors);
                
                // Predictive maintenance indicators
                this.updateMaintenanceIndicators(wearFactors);
                
                // Wear pattern analysis
                this.analyzeWearPatterns(wearFactors);
            }

            calculateWearFactors(operatingHours, rpm, load, temperature) {
                // Multi-factor wear calculation
                const baseWear = Math.min(operatingHours / 10000, 1);
                const rpmFactor = Math.pow(rpm / 3000, 1.5); // Higher RPM causes exponential wear
                const loadFactor = Math.pow(load / 100, 1.2);
                const tempFactor = temperature > 100 ? Math.pow((temperature - 80) / 50, 1.3) : 1;
                
                // Oil quality factor (simulated)
                const oilQuality = Math.max(0.3, 1 - (operatingHours % 5000) / 5000);
                
                return {
                    overall: baseWear * rpmFactor * loadFactor * tempFactor / oilQuality,
                    mechanical: baseWear * rpmFactor * loadFactor,
                    thermal: baseWear * tempFactor,
                    lubrication: baseWear / oilQuality,
                    hours: operatingHours
                };
            }

            updateBearingWear(wearFactors) {
                const mainBearings = this.components.get('mainBearings');
                if (!mainBearings) return;
                
                mainBearings.children.forEach((bearing, index) => {
                    if (!bearing.material) return;
                    
                    // Different bearings wear differently based on load distribution
                    const loadMultiplier = this.getBearingLoadMultiplier(index);
                    const localWear = wearFactors.overall * loadMultiplier;
                    
                    // Visual wear indicators
                    if (localWear > 0.3) {
                        // Surface roughening
                        bearing.material.roughness = Math.min(0.1 + localWear * 0.4, 0.8);
                        
                        // Color changes due to wear
                        const wearColor = new THREE.Color().lerpColors(
                            new THREE.Color(0xffd700), // New bearing color
                            new THREE.Color(0x8B4513), // Worn bearing color
                            localWear
                        );
                        bearing.material.color.copy(wearColor);
                    }
                    
                    // Critical wear warnings
                    if (localWear > 0.7) {
                        bearing.material.emissive.setHex(0x440000);
                        bearing.material.emissiveIntensity = 0.1 + Math.sin(Date.now() * 0.01) * 0.05;
                    }
                    
                    // Clearance increase simulation
                    if (localWear > 0.5) {
                        const clearanceIncrease = localWear * 0.02;
                        bearing.scale.setScalar(1 - clearanceIncrease);
                    }
                });
            }

            updateCrankshaftWear(wearFactors) {
                const crankshaft = this.components.get('crankshaft');
                if (!crankshaft) return;
                
                crankshaft.traverse(child => {
                    if (child.name && child.name.includes('Journal')) {
                        const journalWear = wearFactors.mechanical;
                        
                        // Surface wear visualization
                        if (child.material && journalWear > 0.2) {
                            // Scoring and surface irregularities
                            child.material.roughness = Math.min(0.05 + journalWear * 0.3, 0.6);
                            child.material.metalness = Math.max(0.5, 0.95 - journalWear * 0.2);
                            
                            // Wear patterns - simulate journal scoring
                            if (journalWear > 0.5) {
                                child.material.normalScale.set(1 + journalWear, 1 + journalWear);
                            }
                        }
                        
                        // Dimensional changes
                        if (journalWear > 0.4) {
                            const wearReduction = journalWear * 0.015;
                            child.scale.setScalar(1 - wearReduction);
                        }
                    }
                    
                    // Crankpin wear
                    if (child.name && child.name.includes('Crankpin')) {
                        const pinWear = wearFactors.overall * 1.2; // Crankpins wear faster
                        
                        if (child.material && pinWear > 0.3) {
                            child.material.roughness = Math.min(0.1 + pinWear * 0.4, 0.7);
                            
                            // Hot spots from uneven wear
                            if (pinWear > 0.6) {
                                child.material.emissive.setHex(0x220011);
                                child.material.emissiveIntensity = pinWear * 0.1;
                            }
                        }
                    }
                });
            }

            updatePistonWear(wearFactors) {
                if (!this.config.three.pistons) return;
                
                this.config.three.pistons.forEach((pistonAssembly, index) => {
                    const piston = pistonAssembly.getObjectByName(`Piston_${index + 1}`);
                    if (!piston) return;
                    
                    const pistonWear = wearFactors.thermal * 0.8; // Pistons wear from thermal cycling
                    
                    // Piston ring wear
                    ['TopCompressionRing', 'SecondCompressionRing', 'OilControlRing'].forEach((ringName, ringIndex) => {
                        const ring = piston.getObjectByName(`${ringName}_${index + 1}`);
                        if (ring && ring.material) {
                            const ringWear = pistonWear * (ringIndex + 1) * 0.3; // Top ring wears most
                            
                            if (ringWear > 0.3) {
                                ring.material.roughness = Math.min(0.2 + ringWear * 0.5, 0.9);
                                
                                // Ring thickness reduction
                                const thicknessReduction = ringWear * 0.1;
                                ring.scale.y = 1 - thicknessReduction;
                            }
                            
                            // Blow-by indication for worn rings
                            if (ringWear > 0.6) {
                                ring.material.transparent = true;
                                ring.material.opacity = Math.max(0.4, 1 - ringWear * 0.3);
                            }
                        }
                    });
                    
                    // Piston skirt wear
                    const skirt = piston.getObjectByName('PistonSkirt');
                    if (skirt && skirt.material && pistonWear > 0.4) {
                        skirt.material.roughness = Math.min(0.1 + pistonWear * 0.4, 0.8);
                        
                        // Scuffing marks
                        if (pistonWear > 0.7) {
                            skirt.material.color.lerp(new THREE.Color(0x333333), pistonWear * 0.3);
                        }
                    }
                });
            }

            updateValveTrainWear(wearFactors) {
                // This would be expanded if valve components are added
                const valveTrainWear = wearFactors.mechanical * 0.6;
                
                // Placeholder for future valve train components
                if (valveTrainWear > 0.5) {
                    console.log(`Valve train wear detected: ${(valveTrainWear * 100).toFixed(1)}%`);
                }
            }

            updateMaintenanceIndicators(wearFactors) {
                // Create visual maintenance alerts
                if (!this.maintenanceIndicators) {
                    this.maintenanceIndicators = new Map();
                }
                
                // Check critical wear thresholds
                const criticalComponents = [
                    { name: 'mainBearings', threshold: 0.8, wear: wearFactors.overall },
                    { name: 'pistonRings', threshold: 0.7, wear: wearFactors.thermal },
                    { name: 'crankshaft', threshold: 0.6, wear: wearFactors.mechanical }
                ];
                
                criticalComponents.forEach(component => {
                    if (component.wear > component.threshold) {
                        this.createMaintenanceAlert(component.name, component.wear);
                    }
                });
            }

            createMaintenanceAlert(componentName, wearLevel) {
                // Visual alert system
                const alertSeverity = wearLevel > 0.9 ? 'critical' : wearLevel > 0.7 ? 'warning' : 'caution';
                
                // Store alert for UI display
                this.maintenanceIndicators.set(componentName, {
                    severity: alertSeverity,
                    wear: wearLevel,
                    timestamp: Date.now(),
                    message: `${componentName} wear: ${(wearLevel * 100).toFixed(1)}%`
                });
            }

            getBearingLoadMultiplier(bearingIndex) {
                // Different bearings experience different loads
                // Center bearings typically carry more load
                const totalBearings = 5; // Typical for 4-cylinder
                const centerIndex = Math.floor(totalBearings / 2);
                const distanceFromCenter = Math.abs(bearingIndex - centerIndex);
                
                return 1 + (1 - distanceFromCenter / centerIndex) * 0.5;
            }

            analyzeWearPatterns(wearFactors) {
                if (!this.wearHistory) {
                    this.wearHistory = [];
                }
                
                // Record wear progression
                this.wearHistory.push({
                    timestamp: Date.now(),
                    overall: wearFactors.overall,
                    mechanical: wearFactors.mechanical,
                    thermal: wearFactors.thermal,
                    lubrication: wearFactors.lubrication
                });
                
                // Keep last 100 readings for trend analysis
                if (this.wearHistory.length > 100) {
                    this.wearHistory.shift();
                }
                
                // Detect accelerated wear patterns
                if (this.wearHistory.length > 10) {
                    const recentWear = this.wearHistory.slice(-10);
                    const wearRate = this.calculateWearRate(recentWear);
                    
                    if (wearRate > 0.001) { // Threshold for accelerated wear
                        console.warn(`Accelerated wear detected: ${(wearRate * 100).toFixed(3)}% per hour`);
                    }
                }
            }

            calculateWearRate(wearHistory) {
                if (wearHistory.length < 2) return 0;
                
                const timeSpan = wearHistory[wearHistory.length - 1].timestamp - wearHistory[0].timestamp;
                const wearIncrease = wearHistory[wearHistory.length - 1].overall - wearHistory[0].overall;
                
                return (wearIncrease / timeSpan) * 3600000; // Convert to per hour
            }

            // Utility method to get thermal and wear status
            getComponentStatus() {
                return {
                    thermal: {
                        temperature: this.config.dynamicState.temperature || 80,
                        coolingEfficiency: this.calculateCoolingEfficiency(
                            this.config.dynamicState.temperature || 80,
                            this.config.dynamicState.rpm || 0
                        ),
                        thermalHistory: this.thermalHistory || []
                    },
                    wear: {
                        overall: this.calculateWearFactors(
                            this.config.dynamicState.operatingHours || 0,
                            this.config.dynamicState.rpm || 0,
                            this.config.dynamicState.load || 0,
                            this.config.dynamicState.temperature || 80
                        ),
                        maintenanceAlerts: Array.from(this.maintenanceIndicators || new Map()),
                        wearHistory: this.wearHistory || []
                    }
                };
            }

            // Camera Functions
            updateAutoRotation() {
                if (!this.components.get('controls')?.isInteracting) {
                    const time = this.config.animationState.time;
                    const rotationSpeed = 0.001 + Math.sin(time * 0.5) * 0.0005;
                    
                    this.config.three.engineGroup.rotation.y += rotationSpeed;
                    
                    // Enhanced oscillation with multiple components
                    const oscillation = Math.sin(time * 0.3) * 0.1 + Math.sin(time * 0.7) * 0.05;
                    this.config.three.engineGroup.position.y = oscillation;
                    
                    this.config.three.engineGroup.updateMatrix();
                }
            }

            updateLabels() {
                // Update labels to always face camera
                this.config.three.engineGroup.traverse(child => {
                    if (child.userData.labels) {
                        child.userData.labels.forEach(label => {
                            label.lookAt(this.config.three.camera.position);
                        });
                    }
                });
            }

            setupAdvancedLighting() {
                const { scene } = this.config.three;
                
                // Enhanced lighting with better energy conservation
                const lights = this.createLightingConfiguration();
                
                lights.forEach(lightConfig => {
                    const light = this.createLight(lightConfig);
                    if (light) {
                        scene.add(light);
                        if (light.target) scene.add(light.target);
                    }
                });
                
                // Add environment lighting
                this.setupEnvironmentLighting(scene);
            }

            createLightingConfiguration() {
                return [
                    { 
                        type: 'ambient', 
                        color: 0x404040, 
                        intensity: 0.2 // Reduced for better contrast
                    },
                    { 
                        type: 'directional', 
                        color: 0xffffff, 
                        intensity: 2.0, // Increased for main light
                        position: [10, 15, 5], 
                        castShadow: true,
                        shadowMapSize: 2048
                    },
                    { 
                        type: 'directional', 
                        color: 0x4488ff, 
                        intensity: 0.6, // Fill light
                        position: [-10, 8, -5] 
                    },
                    { 
                        type: 'spot', 
                        color: 0xffffff, 
                        intensity: 1.0, 
                        position: [0, 20, 0], 
                        castShadow: true,
                        angle: Math.PI / 4,
                        penumbra: 0.3,
                        decay: 2
                    },
                    { 
                        type: 'point', 
                        color: 0xff8844, 
                        intensity: 0.8, 
                        position: [0, 2, -4],
                        distance: 12,
                        decay: 2
                    }
                ];
            }

            setupEnvironmentLighting(scene) {
                // Create hemisphere light for more natural lighting
                const hemiLight = new THREE.HemisphereLight(0x88ccff, 0x332211, 0.3);
                hemiLight.position.set(0, 50, 0);
                scene.add(hemiLight);
                
                // Add environment sphere for reflections
                this.createEnvironmentSphere(scene);
            }

            createEnvironmentSphere(scene) {
                const envGeometry = new THREE.SphereGeometry(100, 16, 16);
                const envMaterial = new THREE.MeshBasicMaterial({
                    color: 0x666666,
                    side: THREE.BackSide,
                    transparent: true,
                    opacity: 0.1
                });
                
                const envSphere = new THREE.Mesh(envGeometry, envMaterial);
                envSphere.name = 'EnvironmentSphere';
                scene.add(envSphere);
            }

            createLight(config) {
                switch (config.type) {
                    case 'ambient':
                        return new THREE.AmbientLight(config.color, config.intensity);
                        
                    case 'directional':
                        const dirLight = new THREE.DirectionalLight(config.color, config.intensity);
                        if (config.position) dirLight.position.set(...config.position);
                        if (config.castShadow) this.setupDirectionalShadows(dirLight, config.shadowMapSize);
                        return dirLight;
                        
                    case 'spot':
                        const spotLight = new THREE.SpotLight(
                            config.color, 
                            config.intensity, 
                            config.distance || 0,
                            config.angle || Math.PI / 3,
                            config.penumbra || 0,
                            config.decay || 1
                        );
                        if (config.position) spotLight.position.set(...config.position);
                        spotLight.target.position.set(0, 0, 0);
                        if (config.castShadow) this.setupSpotShadows(spotLight);
                        return spotLight;
                        
                    case 'point':
                        const pointLight = new THREE.PointLight(
                            config.color,
                            config.intensity,
                            config.distance || 0,
                            config.decay || 1
                        );
                        if (config.position) pointLight.position.set(...config.position);
                        return pointLight;
                        
                    default:
                        return null;
                }
            }

            setupDirectionalShadows(light, mapSize = 2048) {
                light.castShadow = true;
                light.shadow.mapSize.width = mapSize;
                light.shadow.mapSize.height = mapSize;
                light.shadow.camera.near = 0.5;
                light.shadow.camera.far = 100;
                light.shadow.camera.left = -30;
                light.shadow.camera.right = 30;
                light.shadow.camera.top = 30;
                light.shadow.camera.bottom = -30;
                light.shadow.bias = -0.0001;
                light.shadow.normalBias = 0.02;
            }

            setupSpotShadows(light) {
                light.castShadow = true;
                light.shadow.mapSize.width = 1024;
                light.shadow.mapSize.height = 1024;
                light.shadow.camera.near = 0.5;
                light.shadow.camera.far = 50;
                light.shadow.bias = -0.0001;
            }

            setupInteractiveControls() {
                const canvas = this.config.three.renderer.domElement;
                const controls = new InteractionController(
                    canvas, 
                    this.config.three.engineGroup, 
                    this.config.three.camera
                );
                this.components.set('controls', controls);
            }

            setupEventListeners() {
                const eventHandlers = new EventHandlerManager(this);
                eventHandlers.setupAllListeners();
                
                window.addEventListener('resize', this.boundHandleResize, { passive: true });
                
                // Add visibility change listener for performance optimization
                document.addEventListener('visibilitychange', () => {
                    if (document.hidden) {
                        this.stopAnimation();
                    } else if (this.isInitialized) {
                        this.startAnimation();
                    }
                });
            }

            initializeAnimationState() {
                const { cylinders, firingOrder } = this.config.engineParameters;
                
                // Initialize piston phases based on firing order
                this.animationState.pistonPhases = new Array(cylinders).fill(0);
                this.animationState.combustionTimers = new Array(cylinders).fill(0);
                
                // Calculate firing intervals
                this.animationState.firingInterval = (2 * Math.PI) / cylinders;
                
                // Store original positions for smooth animation
                if (this.config.three.pistons) {
                    this.config.three.pistons.forEach((piston, i) => {
                        piston.userData.originalPosition = piston.position.clone();
                        piston.userData.cylinderIndex = i;
                    });
                }
            }

            startAnimation() {
                if (this.animationId) return;
                
                this.animationState.lastUpdateTime = performance.now();
                this.animate();
            }

            stopAnimation() {
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                    this.animationId = null;
                }
            }

            animate() {
                const frameStartTime = performance.now();
                
                // Calculate frame timing
                this.animationState.deltaTime = (frameStartTime - this.animationState.lastUpdateTime) / 1000;
                this.animationState.lastUpdateTime = frameStartTime;
                
                this.animationId = requestAnimationFrame(this.boundAnimate);
                
                // Enhanced performance monitoring
                this.updatePerformanceMetrics();
                
                // Adaptive updates based on performance
                if (this.shouldUpdateFrame()) {
                    this.config.animationState.time += this.animationState.deltaTime;
                    
                    // Update scene components
                    this.simulateEngineMotion();
                    this.updateAutoRotation();
                    this.updateLabels();
                }
                
                // Render scene
                const renderStartTime = performance.now();
                this.config.three.renderer.render(this.config.three.scene, this.config.three.camera);
                this.performanceMonitor.renderTime = performance.now() - renderStartTime;
                
                // Reset renderer info for next frame
                this.config.three.renderer.info.reset();
            }

            updatePerformanceMetrics() {
                this.performanceMonitor.frameCount++;
                const currentTime = performance.now();
                
                if (currentTime >= this.performanceMonitor.lastTime + 1000) {
                    // Calculate FPS
                    const fps = Math.round(
                        (this.performanceMonitor.frameCount * 1000) / 
                        (currentTime - this.performanceMonitor.lastTime)
                    );
                    
                    // Update FPS history with circular buffer
                    this.performanceMonitor.frameHistory.shift();
                    this.performanceMonitor.frameHistory.push(fps);
                    
                    this.performanceMonitor.fps = fps;
                    this.performanceMonitor.averageFps = Math.round(
                        this.performanceMonitor.frameHistory.reduce((a, b) => a + b, 0) / 
                        this.performanceMonitor.frameHistory.length
                    );
                    
                    // Update memory usage if available
                    if (performance.memory) {
                        this.performanceMonitor.memoryUsage = performance.memory.usedJSHeapSize / 1048576; // MB
                    }
                    
                    // Reset counters
                    this.performanceMonitor.frameCount = 0;
                    this.performanceMonitor.lastTime = currentTime;
                    
                    // Adaptive quality adjustments
                    this.adjustQualityBasedOnPerformance();
                }
            }

            adjustQualityBasedOnPerformance() {
                const avgFps = this.performanceMonitor.averageFps;
                const renderer = this.config.three.renderer;
                
                if (avgFps < 25) {
                    // Aggressive quality reduction
                    renderer.setPixelRatio(Math.min(window.devicePixelRatio * 0.5, 1));
                    renderer.shadowMap.autoUpdate = false;
                    this.enableLODMode('low');
                } else if (avgFps < 45) {
                    // Moderate quality reduction
                    renderer.setPixelRatio(Math.min(window.devicePixelRatio * 0.75, 1.5));
                    renderer.shadowMap.autoUpdate = false;
                    this.enableLODMode('medium');
                } else if (avgFps > 55) {
                    // Increase quality
                    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                    renderer.shadowMap.autoUpdate = true;
                    this.enableLODMode('high');
                }
            }

            enableLODMode(level) {
                const lodSettings = this.lodLevels[level];
                
                this.config.three.engineGroup.traverse(child => {
                    if (child.isMesh) {
                        // Switch materials based on LOD
                        const baseMaterialName = child.material.name || 'default';
                        const lodMaterialName = level === 'low' ? `${baseMaterialName}_low` : baseMaterialName;
                        
                        if (this.materials.has(lodMaterialName)) {
                            child.material = this.materials.get(lodMaterialName);
                        }
                        
                        // Adjust visibility based on importance
                        if (child.userData.lodLevel) {
                            child.visible = child.userData.lodLevel <= lodSettings.detail;
                        }
                    }
                });
            }

            // Utility methods
            recreateEngine() {
                if (this.config.onProgress) {
                    this.config.onProgress({
                        phase: 'recreating_engine',
                        progress: 0,
                        currentComponent: 'Clearing existing components'
                    });
                }
                
                this.createMaterialLibrary();
                this.createRealisticEngine();
            }

            updateVisualizationMode(mode, enabled) {
                const modes = {
                    wireframe: () => this.updateWireframeMode(enabled),
                    cutaway: () => this.updateCutawayMode(enabled),
                    thermal: () => this.updateThermalView(enabled),
                    xray: () => this.updateXRayMode(enabled),
                    exploded: () => this.updateExplodedView(enabled)
                };
                
                if (modes[mode]) {
                    modes[mode]();
                    this.updateShadowMaps();
                }
            }

            updateWireframeMode(enabled = this.config.animationState.wireframe) {
                this.materials.forEach(material => {
                    if (material.wireframe !== undefined) {
                        material.wireframe = enabled;
                    }
                });
            }

            updateCutawayMode(enabled = this.config.animationState.cutaway) {
                this.config.three.engineGroup.traverse((child) => {
                    if (child.isMesh && child.material) {
                        child.material.side = enabled ? THREE.DoubleSide : THREE.FrontSide;
                        child.material.transparent = enabled;
                        child.material.opacity = enabled ? 0.6 : 1.0;
                        
                        // Enhanced clipping plane setup
                        if (enabled && !child.material.clippingPlanes) {
                            const clippingPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
                            child.material.clippingPlanes = [clippingPlane];
                            this.config.three.renderer.localClippingEnabled = true;
                        } else if (!enabled && child.material.clippingPlanes) {
                            child.material.clippingPlanes = [];
                            this.config.three.renderer.localClippingEnabled = false;
                        }
                    }
                });
            }

            updateThermalView(enabled = this.config.animationState.thermalView) {
                this.config.three.engineGroup.traverse((child) => {
                    if (child.isMesh && child.material) {
                        if (enabled) {
                            const temp = this.calculateEnhancedComponentTemperature(child);
                            child.material.emissive.setHSL(0.9 - temp * 0.9, 1, temp * 0.4);
                            child.material.emissiveIntensity = temp * 0.8;
                            child.material.color.setHSL(0.9 - temp * 0.9, 0.8, 0.5);
                        } else {
                            // Reset to original material properties
                            child.material.emissive.setHex(0x000000);
                            child.material.emissiveIntensity = 0;
                        }
                    }
                });
            }

            updateXRayMode(enabled) {
                this.config.three.engineGroup.traverse((child) => {
                    if (child.isMesh && child.material) {
                        if (enabled) {
                            child.material.transparent = true;
                            child.material.opacity = 0.3;
                            child.material.emissive.setHex(0x004488);
                            child.material.emissiveIntensity = 0.2;
                            child.material.depthWrite = false;
                        } else {
                            child.material.transparent = false;
                            child.material.opacity = 1.0;
                            child.material.emissive.setHex(0x000000);
                            child.material.emissiveIntensity = 0;
                            child.material.depthWrite = true;
                        }
                    }
                });
            }

            updateExplodedView(enabled) {
                this.config.three.engineGroup.traverse((child) => {
                    if (child.isMesh) {
                        if (enabled && !child.userData.originalPosition) {
                            child.userData.originalPosition = child.position.clone();
                            
                            // Enhanced explosion logic with component grouping
                            const direction = this.calculateExplosionDirection(child);
                            child.position.add(direction.multiplyScalar(3));
                            child.updateMatrix();
                        } else if (!enabled && child.userData.originalPosition) {
                            child.position.copy(child.userData.originalPosition);
                            child.updateMatrix();
                        }
                    }
                });
            }

            calculateExplosionDirection(component) {
                // More sophisticated explosion direction based on component type
                const center = new THREE.Vector3(0, 0, 0);
                const direction = component.position.clone().sub(center).normalize();
                
                // Add some randomness for more interesting explosion
                direction.x += (Math.random() - 0.5) * 0.3;
                direction.y += Math.random() * 0.5; // Bias upward
                direction.z += (Math.random() - 0.5) * 0.3;
                
                return direction.normalize();
            }

            calculateEnhancedComponentTemperature(component) {
                // Enhanced temperature calculation with better component recognition
                if (this.config.calculationResults?.thermal_analysis) {
                    const exhaustTemp = this.config.calculationResults.thermal_analysis.exhaust_temperature;
                    const baseTemp = Math.min(exhaustTemp / 1000, 1.0);
                    
                    const tempMultipliers = {
                        'CombustionFlame': 1.0,
                        'ExhaustPort': 0.9,
                        'CylinderHead': 0.7,
                        'Piston': 0.8,
                        'EngineBlock': 0.6,
                        'Radiator': 0.3,
                        'OilPan': 0.4,
                        'Turbocharger': 0.85,
                        'ExhaustManifold': 0.9
                    };
                    
                    const multiplier = Object.keys(tempMultipliers).find(key => 
                        component.name && component.name.includes(key)
                    );
                    
                    return baseTemp * (tempMultipliers[multiplier] || 0.5);
                }
                
                // Fallback temperature calculation
                const hotComponents = ['Exhaust', 'Combustion', 'Turbo'];
                const warmComponents = ['Piston', 'Head', 'Manifold'];
                
                if (hotComponents.some(comp => component.name && component.name.includes(comp))) {
                    return 0.8 + Math.random() * 0.2;
                } else if (warmComponents.some(comp => component.name && component.name.includes(comp))) {
                    return 0.5 + Math.random() * 0.3;
                }
                
                return 0.3 + Math.random() * 0.2;
            }

            handleResize() {
                const container = document.querySelector('.canvas-container');
                if (!container || !this.isInitialized) return;
                
                const { camera, renderer } = this.config.three;
                
                // Enhanced resize handling with debouncing
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                camera.updateMatrixWorld();
                
                renderer.setSize(container.clientWidth, container.clientHeight);
                
                // Update screen-space dependent elements
                this.updateScreenSpaceElements();
                
                // Force a render to update immediately
                renderer.render(this.config.three.scene, camera);
            }

            updateScreenSpaceElements() {
                const { renderer } = this.config.three;
                const canvas = renderer.domElement;
                
                // Update label scaling based on screen size
                const scaleFactor = Math.min(canvas.width, canvas.height) / 800;
                const clampedScale = Math.max(0.5, Math.min(2.0, scaleFactor));
                
                this.config.three.uiElements.children.forEach(child => {
                    if (child.name && child.name.includes('Label')) {
                        child.scale.setScalar(clampedScale);
                        child.updateMatrix();
                    }
                });
            }

            setLOD(distance) {
                const lodLevel = distance < this.lodLevels.high.distance ? 'high' :
                                distance < this.lodLevels.medium.distance ? 'medium' : 'low';
                
                this.enableLODMode(lodLevel);
            }

            getPerformanceInfo() {
                const renderer = this.config.three.renderer;
                
                return {
                    fps: this.performanceMonitor.fps,
                    averageFps: this.performanceMonitor.averageFps,
                    renderTime: this.performanceMonitor.renderTime.toFixed(2),
                    updateTime: this.performanceMonitor.updateTime.toFixed(2),
                    memoryUsage: this.performanceMonitor.memoryUsage.toFixed(2),
                    triangles: renderer.info.render.triangles,
                    calls: renderer.info.render.calls,
                    geometries: renderer.info.memory.geometries,
                    textures: renderer.info.memory.textures,
                    pixelRatio: renderer.getPixelRatio(),
                    devicePixelRatio: window.devicePixelRatio
                };
            }

            exportScene() {
                return {
                    engineParameters: this.config.engineParameters,
                    animationState: this.config.animationState,
                    performanceInfo: this.getPerformanceInfo(),
                    componentsCount: this.components.size,
                    materialsCount: this.materials.size,
                    timestamp: new Date().toISOString()
                };
            }
        }

        // Enhanced interaction controller with zoom functionality
        class InteractionController {
            constructor(canvas, targetObject, camera) {
                this.canvas = canvas;
                this.target = targetObject;
                this.camera = camera;
                this.isInteracting = false;
                this.previousPosition = { x: 0, y: 0 };
                
                // Enhanced configuration
                this.zoomSpeed = 0.1;
                this.minDistance = 5;
                this.maxDistance = 50;
                this.rotationSpeed = 0.01;
                this.dampingFactor = 0.05;
                this.inertia = { x: 0, y: 0 };
                
                // Touch handling
                this.previousTouchDistance = null;
                this.touchStartTime = 0;
                this.lastTapTime = 0;
                
                this.setupEventListeners();
            }

            setupEventListeners() {
                // Enhanced event listeners with better options
                const options = { passive: true };
                const preventOptions = { passive: false };
                
                // Mouse events
                this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this), options);
                this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this), options);
                this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this), options);
                this.canvas.addEventListener('wheel', this.onWheel.bind(this), preventOptions);
                this.canvas.addEventListener('contextmenu', this.onContextMenu.bind(this), preventOptions);
                
                // Touch events with enhanced support
                this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this), preventOptions);
                this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this), options);
                this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this), preventOptions);
                this.canvas.addEventListener('touchcancel', this.onTouchEnd.bind(this), options);
                
                // Keyboard support
                window.addEventListener('keydown', this.onKeyDown.bind(this), options);
            }

            onContextMenu(event) {
                event.preventDefault();
            }

            onKeyDown(event) {
                // Basic keyboard shortcuts
                switch (event.code) {
                    case 'KeyR':
                        this.resetCamera();
                        break;
                    case 'KeyF':
                        this.focusOnTarget();
                        break;
                }
            }

            resetCamera() {
                // Smoothly reset camera to initial position
                this.animateCameraTo(new THREE.Vector3(12, 8, 12));
            }

            focusOnTarget() {
                // Focus camera on the target object
                const box = new THREE.Box3().setFromObject(this.target);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const distance = maxDim * 2;
                
                const direction = this.camera.position.clone().sub(center).normalize();
                const targetPosition = center.clone().add(direction.multiplyScalar(distance));
                
                this.animateCameraTo(targetPosition);
            }

            animateCameraTo(targetPosition) {
                // Smooth camera animation (basic implementation)
                const startPosition = this.camera.position.clone();
                const startTime = Date.now();
                const duration = 1000; // 1 second
                
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Smooth easing function
                    const eased = 1 - Math.pow(1 - progress, 3);
                    
                    this.camera.position.lerpVectors(startPosition, targetPosition, eased);
                    this.camera.updateMatrixWorld();
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                
                animate();
            }

            onMouseDown(event) {
                if (event.button === 0) { // Left mouse button
                    this.isInteracting = true;
                    this.previousPosition = { x: event.clientX, y: event.clientY };
                    this.inertia = { x: 0, y: 0 };
                    this.canvas.style.cursor = 'grabbing';
                }
            }

            onMouseUp(event) {
                if (event.button === 0) {
                    this.isInteracting = false;
                    this.canvas.style.cursor = 'grab';
                }
            }

            onMouseMove(event) {
                if (!this.isInteracting) return;
                
                const deltaMove = {
                    x: event.clientX - this.previousPosition.x,
                    y: event.clientY - this.previousPosition.y
                };
                
                // Store inertia for smooth continuation
                this.inertia.x = deltaMove.x * this.rotationSpeed;
                this.inertia.y = deltaMove.y * this.rotationSpeed;
                
                this.rotateTarget(deltaMove);
                this.previousPosition = { x: event.clientX, y: event.clientY };
            }

            rotateTarget(deltaMove) {
                this.target.rotation.y += deltaMove.x * this.rotationSpeed;
                this.target.rotation.x += deltaMove.y * this.rotationSpeed;
                
                // Enhanced rotation clamping
                this.target.rotation.x = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, this.target.rotation.x));
                
                // Update matrix for immediate visual feedback
                this.target.updateMatrix();
            }

            onWheel(event) {
                event.preventDefault();
                
                // Enhanced zoom with better sensitivity
                const delta = event.deltaY * this.zoomSpeed;
                const distance = this.camera.position.length();
                const newDistance = Math.max(this.minDistance, Math.min(this.maxDistance, distance + delta));
                
                // Smooth zoom with momentum
                const scale = newDistance / distance;
                this.camera.position.multiplyScalar(scale);
                this.camera.updateMatrixWorld();
            }

            onTouchStart(event) {
                event.preventDefault();
                this.touchStartTime = Date.now();
                
                if (event.touches.length === 1) {
                    // Single touch - rotation
                    this.isInteracting = true;
                    this.previousPosition = { 
                        x: event.touches[0].clientX, 
                        y: event.touches[0].clientY 
                    };
                } else if (event.touches.length === 2) {
                    // Two finger - zoom
                    this.previousTouchDistance = this.getTouchDistance(event.touches);
                }
            }

            onTouchEnd(event) {
                const touchDuration = Date.now() - this.touchStartTime;
                
                // Detect double tap
                if (touchDuration < 200 && event.changedTouches.length === 1) {
                    const currentTime = Date.now();
                    if (currentTime - this.lastTapTime < 300) {
                        this.onDoubleTap(event.changedTouches[0]);
                    }
                    this.lastTapTime = currentTime;
                }
                
                this.isInteracting = false;
                this.previousTouchDistance = null;
            }

            onDoubleTap(touch) {
                // Reset camera on double tap
                this.resetCamera();
            }

            onTouchMove(event) {
                event.preventDefault();
                
                if (event.touches.length === 1 && this.isInteracting) {
                    // Single touch rotation
                    const deltaMove = {
                        x: event.touches[0].clientX - this.previousPosition.x,
                        y: event.touches[0].clientY - this.previousPosition.y
                    };
                    
                    this.rotateTarget(deltaMove);
                    this.previousPosition = { 
                        x: event.touches[0].clientX, 
                        y: event.touches[0].clientY 
                    };
                } else if (event.touches.length === 2 && this.previousTouchDistance) {
                    // Two finger zoom
                    const currentDistance = this.getTouchDistance(event.touches);
                    const delta = (this.previousTouchDistance - currentDistance) * this.zoomSpeed * 0.05;
                    
                    const distance = this.camera.position.length();
                    const newDistance = Math.max(this.minDistance, Math.min(this.maxDistance, distance + delta));
                    
                    const scale = newDistance / distance;
                    this.camera.position.multiplyScalar(scale);
                    this.camera.updateMatrixWorld();
                    
                    this.previousTouchDistance = currentDistance;
                }
            }

            getTouchDistance(touches) {
                const dx = touches[0].clientX - touches[1].clientX;
                const dy = touches[0].clientY - touches[1].clientY;
                return Math.sqrt(dx * dx + dy * dy);
            }

            dispose() {
                // Clean up event listeners
                this.canvas.removeEventListener('mousedown', this.onMouseDown);
                this.canvas.removeEventListener('mouseup', this.onMouseUp);
                this.canvas.removeEventListener('mousemove', this.onMouseMove);
                this.canvas.removeEventListener('wheel', this.onWheel);
                this.canvas.removeEventListener('contextmenu', this.onContextMenu);
                this.canvas.removeEventListener('touchstart', this.onTouchStart);
                this.canvas.removeEventListener('touchend', this.onTouchEnd);
                this.canvas.removeEventListener('touchmove', this.onTouchMove);
                this.canvas.removeEventListener('touchcancel', this.onTouchEnd);
                window.removeEventListener('keydown', this.onKeyDown);
            }
        }

        // Event handler manager for better organization
        class EventHandlerManager {
            constructor(engine) {
                this.engine = engine;
                this.throttledHandlers = new Map();
            }

            setupAllListeners() {
                this.setupAnimationControls();
                this.setupVisualizationControls();
                this.setupEngineControls();
                this.setupFormInputs();
            }

            setupAnimationControls() {
                this.addToggleListener('animation-toggle', 'engineRunning');
                this.addToggleListener('wireframe-toggle', 'wireframe', () => this.engine.updateWireframeMode());
                this.addToggleListener('cutaway-toggle', 'cutaway', () => this.engine.updateCutawayMode());
                this.addToggleListener('thermal-view', 'thermalView', () => this.engine.updateThermalView());
            }

            setupVisualizationControls() {
                // Implementation for visualization controls
            }

            setupEngineControls() {
                this.addSliderListener('rpm-slider', 'rpm', (value) => {
                    this.engine.config.dynamicState.rpm = parseInt(value);
                    this.updateDisplay('rpm-display', value);
                    this.updateDisplay('rpm-value', value);
                    this.engine.updateEngineSpeed();
                });

                this.addSliderListener('throttle-slider', 'throttle', (value) => {
                    this.engine.config.dynamicState.throttle = parseInt(value);
                    this.updateDisplay('throttle-value', value + '%');
                    this.engine.updateThrottle();
                });
            }

            setupFormInputs() {
                const formInputs = ['bore_diameter', 'stroke_length', 'compression_ratio', 
                                'engine_type', 'block_material', 'head_material', 'turbocharging'];
                
                formInputs.forEach(inputId => {
                    const input = document.getElementById(inputId);
                    if (input) {
                        input.addEventListener('change', this.throttle(() => {
                            this.engine.config.updateFromFormData();
                            this.engine.recreateEngine();
                        }, 300));
                    }
                });
            }

            addToggleListener(elementId, stateProperty, callback = null) {
                const element = document.getElementById(elementId);
                if (element) {
                    element.addEventListener('change', (e) => {
                        this.engine.config.animationState[stateProperty] = e.target.checked;
                        if (callback) callback();
                    });
                }
            }

            addSliderListener(elementId, stateProperty, callback) {
                const element = document.getElementById(elementId);
                if (element) {
                    element.addEventListener('input', this.throttle((e) => {
                        callback(e.target.value);
                    }, 16)); // ~60fps throttling
                }
            }

            updateDisplay(elementId, value) {
                const element = document.getElementById(elementId);
                if (element) element.textContent = value;
            }

            throttle(func, delay) {
                let timeoutId;
                let lastExecTime = 0;
                
                return (...args) => {
                    const currentTime = Date.now();
                    
                    if (currentTime - lastExecTime > delay) {
                        func.apply(this, args);
                        lastExecTime = currentTime;
                    } else {
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(() => {
                            func.apply(this, args);
                            lastExecTime = Date.now();
                        }, delay - (currentTime - lastExecTime));
                    }
                };
            }
        }

        // Engine Calculator Class with PHP integration
        class EngineCalculator {
            constructor() {
                this.results = null;
                this.charts = {};
                this.engine3D = null;
                this.animationFrame = null;
                this.engineConfig = new EngineConfig();
                this.monitorUpdateInterval = null;
            }

            // Initialize with PHP results if available
            init() {
                // Check if PHP results are available
                if (typeof engineCalculationResults !== 'undefined') {
                    this.updateDisplaysFromPHP(engineCalculationResults);
                    this.engineConfig.updateFromCalculationResults(engineCalculationResults);
                    this.setupEngineMonitor();
                }
            }

            // Initialize 3D visualization
            init3D() {
                try {
                    this.engineConfig.updateFromFormData();
                    this.engine3D = new RealisticEngine3D(this.engineConfig);
                    this.engine3D.init();
                    console.log('3D Engine visualization initialized successfully');
                } catch (error) {
                    console.error('Failed to initialize 3D visualization:', error);
                    // Fallback to basic message
                    const container = document.querySelector('.canvas-container');
                    if (container) {
                        container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666;">3D visualization requires WebGL support</div>';
                    }
                }
            }

            // Setup dynamic engine monitor updates
            setupEngineMonitor() {
                if (this.monitorUpdateInterval) {
                    clearInterval(this.monitorUpdateInterval);
                }

                this.monitorUpdateInterval = setInterval(() => {
                    this.updateEngineMonitor();
                }, 500); // Update every 500ms
            }

            // Update engine monitor display with current values
            updateEngineMonitor() {
                const config = this.engineConfig;
                const state = config.dynamicState;
                
                // Calculate dynamic values based on current RPM and load
                const rpmSlider = document.getElementById('rpm-slider');
                const loadSlider = document.getElementById('load-slider');
                
                if (rpmSlider && loadSlider) {
                    const currentRPM = parseInt(rpmSlider.value);
                    const currentLoad = parseInt(loadSlider.value);
                    
                    // Calculate power and torque based on load percentage
                    const maxPower = this.results ? this.results.performance_metrics.max_power : state.power;
                    const maxTorque = this.results ? this.results.performance_metrics.peak_torque : state.torque;
                    
                    const currentPower = Math.round((maxPower * currentLoad) / 100);
                    const currentTorque = Math.round((maxTorque * currentLoad) / 100);
                    
                    // Calculate other dynamic values
                    const coolantTemp = Math.round(state.temperature + (currentLoad * 0.3));
                    const oilTemp = Math.round(state.oilTemperature + (currentLoad * 0.4));
                    const oilPressure = Math.max(1.5, state.oilPressure - ((100 - currentLoad) * 0.02));
                    const boostPressure = state.boostPressure * (currentLoad / 100);
                    const exhaustTemp = Math.round(state.exhaustTemp + (currentLoad * 2));
                    const fuelRate = Math.round((state.fuelFlow * currentLoad) / 100 * 100) / 100;
                    
                    // Update monitor display
                    this.updateElement('rpm-display', currentRPM);
                    this.updateElement('power-current', `${currentPower} HP`);
                    this.updateElement('torque-current', `${currentTorque} Nm`);
                    this.updateElement('load-current', `${currentLoad}%`);
                    this.updateElement('coolant-temp', `${coolantTemp}°C`);
                    this.updateElement('oil-temp-current', `${oilTemp}°C`);
                    this.updateElement('oil-pressure-current', `${oilPressure.toFixed(1)} bar`);
                    this.updateElement('boost-current', `${boostPressure.toFixed(1)} bar`);
                    this.updateElement('egt-current', `${exhaustTemp}°C`);
                    this.updateElement('fuel-rate-current', `${fuelRate} L/h`);
                }
            }

            // Helper method to safely format numbers
            safeToFixed(value, decimals = 1, fallback = 0) {
                if (value === undefined || value === null || isNaN(value)) {
                    return fallback.toFixed(decimals);
                }
                return parseFloat(value).toFixed(decimals);
            }

            // Helper method to safely get property value
            safeGet(obj, path, fallback = 0) {
                return path.split('.').reduce((current, key) => {
                    return (current && current[key] !== undefined) ? current[key] : fallback;
                }, obj);
            }

            // Update displays with PHP calculation results - ALIGNED WITH YOUR PHP STRUCTURE
            updateDisplaysFromPHP(results) {
                this.results = results;
            
                // Update design tab with actual PHP structure
                this.updateElement('displacement-display', `${this.safeToFixed(this.safeGet(results, 'engine_parameters.displacement_cc', 0) / 1000, 2)} L`);
                this.updateElement('bore-stroke-display', `${this.safeToFixed(this.safeGet(results, 'engine_parameters.bore', 0), 1)} × ${this.safeToFixed(this.safeGet(results, 'engine_parameters.stroke', 0), 1)} mm`);
                this.updateElement('bore-stroke-ratio-display', this.safeToFixed(this.safeGet(results, 'engine_parameters.bore_stroke_ratio', 0), 3));
                this.updateElement('compression-display', `${this.safeToFixed(this.safeGet(results, 'engine_parameters.compression_ratio', 0), 1)}:1`);
                this.updateElement('swept-volume-display', `${this.safeToFixed(this.safeGet(results, 'engine_parameters.displacement_cc', 0) / this.safeGet(results, 'engine_parameters.cylinders', 1) / 1000, 3)} L`);
                this.updateElement('piston-speed-display', `${this.safeToFixed(this.safeGet(results, 'engine_parameters.mean_piston_speed', 0), 1)} m/s`);

                // Material properties
                this.updateElement('block-material-display', this.safeGet(results, 'material_properties.block_material', 'N/A'));
                this.updateElement('head-material-display', this.safeGet(results, 'material_properties.head_material', 'N/A'));
                this.updateElement('block-density-display', `${this.safeToFixed(this.safeGet(results, 'material_properties.block_density', 0), 0)} kg/m³`);
                this.updateElement('tensile-display', `${this.safeGet(results, 'material_properties.tensile_strength', 0)} MPa`);
                this.updateElement('thermal-conductivity-display', `${this.safeGet(results, 'material_properties.thermal_conductivity', 0)} W/m·K`);
                this.updateElement('elastic-modulus-display', `${this.safeGet(results, 'material_properties.elastic_modulus', 0)} GPa`);

                // Performance metrics
                this.updateElement('power-display', `${this.safeToFixed(this.safeGet(results, 'performance_metrics.max_power', 0), 0)} HP`);
                this.updateElement('power-rpm-display', `${this.safeGet(results, 'performance_metrics.power_rpm', 0)}`);
                this.updateElement('torque-display', `${this.safeToFixed(this.safeGet(results, 'performance_metrics.peak_torque', 0), 0)} Nm`);
                this.updateElement('torque-rpm-display', `${this.safeGet(results, 'performance_metrics.torque_rpm', 0)}`);
                this.updateElement('bmep-display', `${this.safeToFixed(this.safeGet(results, 'performance_metrics.bmep', 0), 1)} bar`);
                this.updateElement('power-density-display', `${this.safeToFixed(this.safeGet(results, 'performance_metrics.power_density', 0), 1)} HP/L`);
                this.updateElement('specific-power-display', `${this.safeToFixed(this.safeGet(results, 'performance_metrics.specific_power', 0), 2)} kW/kg`);
                this.updateElement('efficiency-display', `${this.safeToFixed(this.safeGet(results, 'performance_metrics.thermal_efficiency', 0), 1)}%`);
                this.updateElement('bsfc-display', `${this.safeToFixed(this.safeGet(results, 'performance_metrics.bsfc', 0), 0)} g/kWh`);

                // Air management
                this.updateElement('turbo-type-display', this.safeGet(results, 'air_management.turbo_type', 'N/A'));
                this.updateElement('boost-display', `${this.safeToFixed(this.safeGet(results, 'air_management.boost_pressure', 0), 1)} bar`);
                this.updateElement('air-flow-display', `${this.safeToFixed(this.safeGet(results, 'air_management.air_flow_rate', 0), 0)} kg/h`);
                this.updateElement('vol-eff-display', `${this.safeToFixed(this.safeGet(results, 'air_management.volumetric_efficiency', 0), 1)}%`);

                // Update analysis tab
                this.updateElement('peak-pressure', `${this.safeToFixed(this.safeGet(results, 'structural_analysis.peak_pressure', 0), 1)} bar`);
                this.updateElement('hoop-stress', `${this.safeToFixed(this.safeGet(results, 'structural_analysis.hoop_stress', 0), 1)} MPa`);
                this.updateElement('thermal-stress', `${this.safeToFixed(this.safeGet(results, 'structural_analysis.thermal_stress', 0), 1)} MPa`);
                this.updateElement('combined-stress', `${this.safeToFixed(this.safeGet(results, 'structural_analysis.combined_stress', 0), 1)} MPa`);
                this.updateElement('safety-factor', this.safeToFixed(this.safeGet(results, 'structural_analysis.safety_factor', 0), 2));
                this.updateElement('fatigue-life', `${this.safeToFixed(this.safeGet(results, 'structural_analysis.fatigue_life', 0), 1)} million cycles`);
                this.updateElement('block-deflection', `${this.safeToFixed(this.safeGet(results, 'structural_analysis.block_deflection', 0), 3)} mm`);

                // Thermal analysis
                this.updateElement('heat-input', `${this.safeToFixed(this.safeGet(results, 'thermal_analysis.heat_input', 0), 1)} kW`);
                this.updateElement('useful-work', `${this.safeToFixed(this.safeGet(results, 'thermal_analysis.useful_work', 0), 1)} kW`);
                this.updateElement('heat-coolant', `${this.safeToFixed(this.safeGet(results, 'thermal_analysis.heat_coolant', 0), 1)} kW`);
                this.updateElement('heat-exhaust', `${this.safeToFixed(this.safeGet(results, 'thermal_analysis.heat_exhaust', 0), 1)} kW`);
                this.updateElement('heat-oil', `${this.safeToFixed(this.safeGet(results, 'thermal_analysis.heat_oil', 0), 1)} kW`);
                this.updateElement('radiation-loss', `${this.safeToFixed(this.safeGet(results, 'thermal_analysis.radiation_loss', 0), 1)} kW`);
                this.updateElement('exhaust-temp', `${this.safeToFixed(this.safeGet(results, 'thermal_analysis.exhaust_temperature', 0), 0)}°C`);

                // Performance analysis
                this.updateElement('indicated-power', `${this.safeToFixed(this.safeGet(results, 'performance_metrics.indicated_power', 0), 0)} HP`);
                this.updateElement('mech-efficiency', `${this.safeToFixed(this.safeGet(results, 'performance_metrics.mechanical_efficiency', 0), 1)}%`);
                this.updateElement('combustion-eff', `${this.safeToFixed(this.safeGet(results, 'performance_metrics.combustion_efficiency', 0), 1)}%`);
                this.updateElement('sfc', `${this.safeToFixed(this.safeGet(results, 'performance_metrics.bsfc', 0), 0)} g/kWh`);
                this.updateElement('fuel-flow', `${this.safeToFixed(this.safeGet(results, 'performance_metrics.fuel_flow_rate', 0), 1)} L/h`);
                this.updateElement('torque-backup', `${this.safeToFixed(this.safeGet(results, 'performance_metrics.torque_backup', 0), 1)}%`);

                // Emissions analysis
                this.updateElement('nox-emissions', `${this.safeToFixed(this.safeGet(results, 'emissions_analysis.nox_emissions', 0), 2)} g/kWh`);
                this.updateElement('pm-emissions', `${this.safeToFixed(this.safeGet(results, 'emissions_analysis.pm_emissions', 0), 3)} g/kWh`);
                this.updateElement('co-emissions', `${this.safeToFixed(this.safeGet(results, 'emissions_analysis.co_emissions', 0), 2)} g/kWh`);
                this.updateElement('hc-emissions', `${this.safeToFixed(this.safeGet(results, 'emissions_analysis.hc_emissions', 0), 2)} g/kWh`);
                this.updateElement('co2-emissions', `${this.safeToFixed(this.safeGet(results, 'emissions_analysis.co2_emissions', 0), 0)} g/kWh`);
                this.updateElement('aftertreatment-eff', `${this.safeToFixed(this.safeGet(results, 'emissions_analysis.aftertreatment_efficiency', 0), 1)}%`);

                // Update cost analysis with ZAR conversion
                this.updateElement('block-material-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.block_material_cost', 0))).toLocaleString()}`);
                this.updateElement('block-manufacturing-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.block_manufacturing_cost', 0))).toLocaleString()}`);
                this.updateElement('block-assembly-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.block_assembly_cost', 0))).toLocaleString()}`);
                this.updateElement('block-total-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.block_total_cost', 0))).toLocaleString()}`);
                
                this.updateElement('head-material-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.head_material_cost', 0))).toLocaleString()}`);
                this.updateElement('head-manufacturing-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.head_manufacturing_cost', 0))).toLocaleString()}`);
                this.updateElement('head-assembly-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.head_assembly_cost', 0))).toLocaleString()}`);
                this.updateElement('head-total-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.head_total_cost', 0))).toLocaleString()}`);
                
                this.updateElement('crank-material-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.crank_material_cost', 0))).toLocaleString()}`);
                this.updateElement('crank-manufacturing-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.crank_manufacturing_cost', 0))).toLocaleString()}`);
                this.updateElement('crank-assembly-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.crank_assembly_cost', 0))).toLocaleString()}`);
                this.updateElement('crank-total-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.crank_total_cost', 0))).toLocaleString()}`);
                
                this.updateElement('turbo-material-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.turbo_material_cost', 0))).toLocaleString()}`);
                this.updateElement('turbo-manufacturing-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.turbo_manufacturing_cost', 0))).toLocaleString()}`);
                this.updateElement('turbo-assembly-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.turbo_assembly_cost', 0))).toLocaleString()}`);
                this.updateElement('turbo-total-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.turbo_total_cost', 0))).toLocaleString()}`);
                
                this.updateElement('aftertreatment-material-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.aftertreatment_material_cost', 0))).toLocaleString()}`);
                this.updateElement('aftertreatment-manufacturing-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.aftertreatment_manufacturing_cost', 0))).toLocaleString()}`);
                this.updateElement('aftertreatment-assembly-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.aftertreatment_assembly_cost', 0))).toLocaleString()}`);
                this.updateElement('aftertreatment-total-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.aftertreatment_total_cost', 0))).toLocaleString()}`);
                
                this.updateElement('total-material-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.total_material_cost', 0))).toLocaleString()}`);
                this.updateElement('total-manufacturing-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.total_manufacturing_cost', 0))).toLocaleString()}`);
                this.updateElement('total-assembly-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.total_assembly_cost', 0))).toLocaleString()}`);
                this.updateElement('total-engine-cost', `R${Math.round(convertToZAR(this.safeGet(results, 'cost_analysis.total_engine_cost', 0))).toLocaleString()}`);
                

                // Update manufacturing specs and other sections
                this.updateElement('bore-tolerance', this.safeGet(results, 'manufacturing_specs.bore_tolerance', 'N/A'));
                this.updateElement('deck-flatness', this.safeGet(results, 'manufacturing_specs.deck_flatness', 'N/A'));
                this.updateElement('bore-roundness', this.safeGet(results, 'manufacturing_specs.bore_roundness', 'N/A'));
                this.updateElement('bore-surface', this.safeGet(results, 'manufacturing_specs.bore_surface_finish', 'N/A'));
                this.updateElement('centerline-tolerance', this.safeGet(results, 'manufacturing_specs.centerline_tolerance', 'N/A'));
                this.updateElement('pressure-test-spec', `${this.safeToFixed(this.safeGet(results, 'manufacturing_specs.pressure_test', 0), 1)} bar`);
                this.updateElement('leak-rate', this.safeGet(results, 'manufacturing_specs.leak_rate', 'N/A'));
                this.updateElement('core-integrity', this.safeGet(results, 'manufacturing_specs.core_integrity', 'N/A'));
                this.updateElement('material-cert', this.safeGet(results, 'manufacturing_specs.material_certification', 'N/A'));
                this.updateElement('dimensional-check', this.safeGet(results, 'manufacturing_specs.dimensional_inspection', 'N/A'));
                
                this.updateElement('main-bearing-torque-spec', `${this.safeGet(results, 'manufacturing_specs.main_bearing_torque', 0)} Nm`);
                this.updateElement('rod-bolt-torque', `${this.safeGet(results, 'manufacturing_specs.rod_bolt_torque', 0)} Nm`);
                this.updateElement('head-bolt-torque', `${this.safeGet(results, 'manufacturing_specs.head_bolt_torque', 0)} Nm`);
                this.updateElement('flywheel-torque', `${this.safeGet(results, 'manufacturing_specs.flywheel_torque', 0)} Nm`);
                this.updateElement('oil-pan-torque', `${this.safeGet(results, 'manufacturing_specs.oil_pan_torque', 0)} Nm`);

                // Update validation matrix with PHP values
                this.updateValidation(results);

                // Generate optimization recommendations from PHP results
                this.updateOptimizationRecommendations(results);

                // Update trade-off analysis
                this.updateTradeoffAnalysis(results);

                // Update documentation sections
                this.updateDocumentation(results);
            }

            updateDocumentation(results) {
                this.updateElement('engine-family', this.safeGet(results, 'documentation.engine_family', 'N/A'));
                this.updateElement('model-designation', this.safeGet(results, 'documentation.model_designation', 'N/A'));
                this.updateElement('application-rating', this.safeGet(results, 'documentation.application_rating', 'N/A'));
                this.updateElement('design-life', `${this.safeToFixed(this.safeGet(results, 'documentation.design_life', 0), 0)} hours`);
                this.updateElement('service-interval', `${this.safeGet(results, 'documentation.service_interval', 0)} hours`);
                this.updateElement('max-coolant-temp', `${this.safeGet(results, 'documentation.max_coolant_temp', 0)}°C`);
                this.updateElement('max-oil-temp', `${this.safeGet(results, 'documentation.max_oil_temp', 0)}°C`);
                this.updateElement('max-intake-temp', `${this.safeGet(results, 'documentation.max_intake_temp', 0)}°C`);
                this.updateElement('min-oil-pressure', this.safeGet(results, 'documentation.min_oil_pressure', 'N/A'));
                this.updateElement('max-exhaust-temp', `${this.safeGet(results, 'documentation.max_exhaust_temp', 0)}°C`);
                this.updateElement('oil-change-interval', `${this.safeGet(results, 'documentation.oil_change_interval', 0)} hours`);
                this.updateElement('filter-service', `${this.safeGet(results, 'documentation.filter_service_interval', 0)} hours`);
                this.updateElement('coolant-service', `${this.safeGet(results, 'documentation.coolant_service_interval', 0)} hours`);
                this.updateElement('valve-service', `${this.safeGet(results, 'documentation.valve_service_interval', 0)} hours`);
                this.updateElement('overhaul-interval', `${this.safeToFixed(this.safeGet(results, 'documentation.overhaul_interval', 0), 0)} hours`);
            }

            updateOptimizationRecommendations(results) {
                const recommendationsElement = document.getElementById('optimization-recommendations');
                if (recommendationsElement && this.safeGet(results, 'recommendations', null)) {
                    recommendationsElement.innerHTML = results.recommendations.map(rec => `<li>${rec}</li>`).join('');
                } else if (recommendationsElement) {
                    // Generate basic recommendations based on analysis
                    const recommendations = this.generateRecommendations(results);
                    recommendationsElement.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
                }
            }

            generateRecommendations(results) {
                const recommendations = [];
                
                if (this.safeGet(results, 'structural_analysis.safety_factor', 0) < 2.0) {
                    recommendations.push("Consider increasing block wall thickness or using higher strength material");
                }
                if (this.safeGet(results, 'performance_metrics.thermal_efficiency', 0) < 40) {
                    recommendations.push("Optimize combustion chamber design and increase compression ratio");
                }
                if (this.safeGet(results, 'cost_analysis.total_engine_cost', 0) > 15000) {
                    recommendations.push("Review material selection and manufacturing processes to reduce costs");
                }
                if (this.safeGet(results, 'emissions_analysis.nox_emissions', 0) > 5.0) {
                    recommendations.push("Implement advanced EGR system and optimize injection timing");
                }
                if (this.safeGet(results, 'performance_metrics.power_density', 0) < 60) {
                    recommendations.push("Consider turbocharging upgrades or bore/stroke optimization");
                }
                
                return recommendations.length > 0 ? recommendations : ["All parameters within acceptable ranges"];
            }

            updateTradeoffAnalysis(results) {
                // Power vs Fuel Economy
                const powerEconomy = this.safeGet(results, 'performance_metrics.power_density', 0) > 70 ? "Power-Optimized" : 
                                this.safeGet(results, 'performance_metrics.thermal_efficiency', 0) > 42 ? "Economy-Optimized" : "Balanced";
                this.updateElement('power-economy-tradeoff', powerEconomy);

                // Cost vs Durability
                const costDurability = this.safeGet(results, 'cost_analysis.total_engine_cost', 0) < 10000 ? "Cost-Optimized" : 
                                    this.safeGet(results, 'validation_results.durability_hours', 0) > 15000 ? "Durability-Optimized" : "Optimized";
                this.updateElement('cost-durability-tradeoff', costDurability);

                // Weight vs Strength
                const weightStrength = this.safeGet(results, 'structural_analysis.safety_factor', 0) > 3.0 ? "Strength-Optimized" : 
                                    this.safeGet(results, 'performance_metrics.specific_power', 0) > 0.08 ? "Weight-Optimized" : "Efficient";
                this.updateElement('weight-strength-tradeoff', weightStrength);

                // Emissions vs Performance
                const emissionsPerf = this.safeGet(results, 'emissions_analysis.nox_emissions', 0) < 3.0 ? "Emissions-Optimized" : 
                                    this.safeGet(results, 'performance_metrics.power_density', 0) > 80 ? "Performance-Optimized" : "Compliant";
                this.updateElement('emissions-performance-tradeoff', emissionsPerf);
            }

            updateValidation(results) {
                // Use PHP validation structure with safe access
                const validationResults = this.safeGet(results, 'validation_results', {});
                
                this.updateElement('stress-safety-value', this.safeToFixed(this.safeGet(validationResults, 'stress_safety_factor', 0), 2));
                this.updateElement('thermal-eff-value', `${this.safeToFixed(this.safeGet(validationResults, 'thermal_efficiency_value', 0), 1)}%`);
                this.updateElement('power-density-value', `${this.safeToFixed(this.safeGet(validationResults, 'power_density_value', 0), 1)} HP/L`);
                this.updateElement('emissions-compliance-value', this.safeGet(validationResults, 'emissions_compliance', 'N/A'));
                this.updateElement('durability-value', `${this.safeToFixed(this.safeGet(validationResults, 'durability_hours', 0), 0)} hrs`);
                this.updateElement('cooling-adequacy-value', `${this.safeToFixed(this.safeGet(validationResults, 'cooling_adequacy', 0), 0)}%`);

                // Update status classes based on PHP status
                this.updateValidationStatus('stress-safety-status', this.safeGet(validationResults, 'stress_status', 'unknown'));
                this.updateValidationStatus('thermal-eff-status', this.safeGet(validationResults, 'thermal_status', 'unknown'));
                this.updateValidationStatus('power-density-status', this.safeGet(validationResults, 'power_density_status', 'unknown'));
                this.updateValidationStatus('emissions-compliance-status', this.safeGet(validationResults, 'emissions_status', 'unknown'));
                this.updateValidationStatus('durability-status', this.safeGet(validationResults, 'durability_status', 'unknown'));
                this.updateValidationStatus('cooling-adequacy-status', this.safeGet(validationResults, 'cooling_status', 'unknown'));
            }

            updateValidationStatus(statusElementId, status) {
                const statusElement = document.getElementById(statusElementId);
                if (statusElement) {
                    statusElement.className = `check-status status-${status.toLowerCase()}`;
                    statusElement.textContent = status.charAt(0).toUpperCase() + status.slice(1);
                }
            }

            updateElement(id, value) {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = value;
                }
            }

            // Initialize charts with PHP results
            initCharts() {
                if (typeof Chart === 'undefined' || !this.results) return;

                // Clear existing charts
                Object.values(this.charts).forEach(chart => {
                    if (chart) chart.destroy();
                });
                this.charts = {};

                // Performance chart using actual PHP data
                const perfCtx = document.getElementById('performanceChart');
                if (perfCtx) {
                    this.charts.performance = new Chart(perfCtx, {
                        type: 'radar',
                        data: {
                            labels: ['Power Density', 'Efficiency', 'Safety Factor', 'Cost Effectiveness', 'Specific Power'],
                            datasets: [{
                                label: 'Engine Metrics',
                                data: [
                                    Math.min(100, this.safeGet(this.results, 'performance_metrics.power_density', 0) * 1.2),
                                    this.safeGet(this.results, 'performance_metrics.thermal_efficiency', 0),
                                    Math.min(100, this.safeGet(this.results, 'structural_analysis.safety_factor', 0) * 25),
                                    Math.max(0, 100 - (this.safeGet(this.results, 'cost_analysis.total_engine_cost', 0) / 200)),
                                    Math.min(100, this.safeGet(this.results, 'performance_metrics.specific_power', 0) * 1000)
                                ],
                                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                                borderColor: 'rgba(52, 152, 219, 1)',
                                borderWidth: 2
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                r: {
                                    beginAtZero: true,
                                    max: 100
                                }
                            }
                        }
                    });
                }

                // Stress analysis chart
                const stressCtx = document.getElementById('stressChart');
                if (stressCtx) {
                    this.charts.stress = new Chart(stressCtx, {
                        type: 'bar',
                        data: {
                            labels: ['Hoop Stress', 'Thermal Stress', 'Combined Stress', 'Material Limit'],
                            datasets: [{
                                label: 'Stress (MPa)',
                                data: [
                                    this.safeGet(this.results, 'structural_analysis.hoop_stress', 0),
                                    this.safeGet(this.results, 'structural_analysis.thermal_stress', 0),
                                    this.safeGet(this.results, 'structural_analysis.combined_stress', 0),
                                    this.safeGet(this.results, 'material_properties.tensile_strength', 0)
                                ],
                                backgroundColor: ['#e74c3c', '#f39c12', '#9b59b6', '#2ecc71']
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false
                        }
                    });
                }

                // Thermal analysis chart using PHP thermal data
                const thermalCtx = document.getElementById('thermalChart');
                if (thermalCtx) {
                    this.charts.thermal = new Chart(thermalCtx, {
                        type: 'doughnut',
                        data: {
                            labels: ['Useful Work', 'Heat to Coolant', 'Heat to Exhaust', 'Heat to Oil', 'Radiation Loss'],
                            datasets: [{
                                data: [
                                    this.safeGet(this.results, 'thermal_analysis.useful_work', 0),
                                    this.safeGet(this.results, 'thermal_analysis.heat_coolant', 0),
                                    this.safeGet(this.results, 'thermal_analysis.heat_exhaust', 0),
                                    this.safeGet(this.results, 'thermal_analysis.heat_oil', 0),
                                    this.safeGet(this.results, 'thermal_analysis.radiation_loss', 0)
                                ],
                                backgroundColor: [
                                    '#2ecc71',
                                    '#3498db',
                                    '#e74c3c',
                                    '#f39c12',
                                    '#95a5a6'
                                ]
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false
                        }
                    });
                }

                // Efficiency map chart
                const effCtx = document.getElementById('efficiencyChart');
                if (effCtx) {
                    this.charts.efficiency = new Chart(effCtx, {
                        type: 'scatter',
                        data: {
                            datasets: [{
                                label: 'Efficiency Map',
                                data: this.generateEfficiencyMapData(),
                                backgroundColor: 'rgba(46, 204, 113, 0.6)'
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Engine Speed (RPM)'
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Load (%)'
                                    }
                                }
                            }
                        }
                    });
                }
            }

            generateEfficiencyMapData() {
                const data = [];
                for (let rpm = 1000; rpm <= 2500; rpm += 200) {
                    for (let load = 25; load <= 100; load += 25) {
                        const efficiency = this.calculateEfficiencyAtPoint(rpm, load);
                        data.push({ x: rpm, y: load, v: efficiency });
                    }
                }
                return data;
            }

            calculateEfficiencyAtPoint(rpm, load) {
                if (!this.results) return 35;
                
                const baseEfficiency = this.safeGet(this.results, 'performance_metrics.thermal_efficiency', 35);
                const powerRpm = this.safeGet(this.results, 'performance_metrics.power_rpm', 2000);
                const rpmFactor = 1 - Math.abs(rpm - powerRpm) / 2000;
                const loadFactor = 0.7 + (load / 100) * 0.3;
                
                return baseEfficiency * rpmFactor * loadFactor;
            }

            handleResize() {
                // Handle window resize for 3D visualization
                if (this.engine3D) {
                    this.engine3D.handleResize();
                }
            }
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            const engineCalculator = new EngineCalculator();
            engineCalculator.init();
            
            // Setup slider handlers
            setupSliderHandlers();
            
            // Listen for form submissions to update visualization
            const form = document.querySelector('form');
            if (form) {
                form.addEventListener('submit', function() {
                    // Update configuration after form submission
                    setTimeout(() => {
                        engineCalculator.engineConfig.updateFromFormData();
                        if (typeof engineCalculationResults !== 'undefined') {
                            engineCalculator.updateDisplaysFromPHP(engineCalculationResults);
                            engineCalculator.engineConfig.updateFromCalculationResults(engineCalculationResults);
                        }
                    }, 100);
                });
            }
            
            // Handle window resize
            window.addEventListener('resize', () => engineCalculator.handleResize());
        });

        // Global engine calculator instance
        const engineCalculator = new EngineCalculator();

        // Event handlers
        function setupSliderHandlers() {
            const rpmSlider = document.getElementById('rpm-slider');
            const loadSlider = document.getElementById('load-slider');
            const rpmValue = document.getElementById('rpm-value');
            const loadValue = document.getElementById('load-value');

            if (rpmSlider && rpmValue) {
                rpmSlider.addEventListener('input', function() {
                    rpmValue.textContent = this.value;
                    engineCalculator.updateEngineMonitor();
                });
            }

            if (loadSlider && loadValue) {
                loadSlider.addEventListener('input', function() {
                    loadValue.textContent = this.value + '%';
                    engineCalculator.updateEngineMonitor();
                });
            }
        }

        function showLoading(show) {
            const overlay = document.getElementById('loadingOverlay');
            if (overlay) {
                if (show) {
                    overlay.classList.add('show');
                } else {
                    overlay.classList.remove('show');
                }
            }
        }

        function showMessage(message, isError = false) {
            const messageEl = document.getElementById(isError ? 'errorMessage' : 'successMessage');
            if (messageEl) {
                messageEl.textContent = message;
                messageEl.style.display = 'block';
                setTimeout(() => {
                    messageEl.style.display = 'none';
                }, 5000);
            }
        }

        function toggleFullscreen() {
            const container = document.querySelector('.canvas-container');
            if (container) {
                if (!document.fullscreenElement) {
                    container.requestFullscreen().catch(console.error);
                } else {
                    document.exitFullscreen();
                }
            }
        }

        // Export functions
        function exportToPDF() {
            window.print();
        }

        function exportToCAD() {
            this.results = engineCalculationResults;
            
            const cadData = {
                bore: results.engine_parameters.bore,
                stroke: results.engine_parameters.stroke,
                cylinders: results.engine_parameters.cylinders,
                block_height: results.engine_parameters.block_height,
                deck_thickness: results.engine_parameters.deck_thickness
            };
            
            const blob = new Blob([JSON.stringify(cadData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'engine_cad_parameters.json';
            a.click();
            URL.revokeObjectURL(url);
        }

        function exportToExcel() {
            this.results = engineCalculationResults;
            
            let csvContent = "Parameter,Value,Unit\n";
            
            // Add performance data
            csvContent += `Max Power,${results.performance_metrics.max_power},HP\n`;
            csvContent += `Peak Torque,${results.performance_metrics.peak_torque},Nm\n`;
            csvContent += `Thermal Efficiency,${results.performance_metrics.thermal_efficiency},%\n`;
            csvContent += `Power Density,${results.performance_metrics.power_density},HP/L\n`;
            csvContent += `BSFC,${results.performance_metrics.bsfc},g/kWh\n`;
            
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'engine_performance_data.csv';
            a.click();
            URL.revokeObjectURL(url);
        }

        function exportSpecSheet() {
            this.results = engineCalculationResults;
            
            const specData = {
                displacement: results.engine_parameters.displacement_cc,
                power: results.performance_metrics.max_power,
                torque: results.performance_metrics.peak_torque,
                efficiency: results.performance_metrics.thermal_efficiency,
                material: results.material_properties.block_material,
                cost: results.cost_analysis.total_engine_cost
            };
            
            const blob = new Blob([JSON.stringify(specData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'engine_specification_sheet.json';
            a.click();
            URL.revokeObjectURL(url);
        }

        function exportManufacturing() {
            this.results = engineCalculationResults;

            const mfgData = {
                tolerances: results.manufacturing_specs,
                materials: results.material_properties,
                costs: results.cost_analysis,
                quality_control: results.validation_tests
            };
            
            const blob = new Blob([JSON.stringify(mfgData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'manufacturing_package.json';
            a.click();
            URL.revokeObjectURL(url);
        }

        function convertToZAR(usdAmount) {
            const exchangeRate = 18.5; // USD to ZAR (update as needed)
            return usdAmount * exchangeRate;
        }

        // Form submission handler
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('engineForm');
            if (form) {
                form.addEventListener('submit', function(e) {
                    showLoading(true);
                    showMessage('Calculating engine parameters...');
                });
            }

            // Check if PHP results are available
            if (typeof engineCalculationResults !== 'undefined') {
                // PHP calculation completed, update displays
                engineCalculator.updateDisplaysFromPHP(engineCalculationResults);
                
                // Show results section
                const resultsSection = document.getElementById('results-section');
                if (resultsSection) {
                    resultsSection.style.display = 'block';
                }
                
                // Initialize charts
                setTimeout(() => {
                    engineCalculator.initCharts();
                }, 100);
                
                showMessage('Engine calculation completed successfully!');
                showLoading(false);
            }

            // Tab switching
            document.querySelectorAll('.tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs and panes
                    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                    
                    // Add active class to clicked tab and corresponding pane
                    this.classList.add('active');
                    const paneId = this.getAttribute('data-tab');
                    const pane = document.getElementById(paneId);
                    if (pane) {
                        pane.classList.add('active');
                    }
                });
            });

            // Initialize 3D visualization
            try {
                engineCalculator.init3D();
            } catch (error) {
                console.error('Failed to initialize 3D visualization:', error);
            }

            // Handle window resize
            window.addEventListener('resize', () => {
                engineCalculator.handleResize();
            });
        });
    </script>
</body>
</html>