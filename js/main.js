const canvas = document.getElementById('tractorCanvas');
const ctx = canvas.getContext('2d');

// Enhanced simulation parameters
let simulation = {
    time: 0,
    startTime: Date.now(),
    fuel: 100,
    distance: 0,
    speed: 0,
    maxSpeed: 5,
    acceleration: 0.1,
    deceleration: 0.05,
    fuelConsumption: 0.05,
    sandCapacity: 100,
    gravity: 0.4,
    windResistance: 0.98
};

// Resize handler
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Tractor state
let tractorState = {
    x: 100,
    y: canvas.height - 150,
    width: 200,
    height: 100,
    bucketAngle: 0,
    targetBucketAngle: 0,
    isLifting: false,
    isMoving: false,
    isDumping: false,
    sandLevel: 0,
    direction: 1,
    engineRunning: false,
    // New properties
    wheelbase: 250,
    tireDiameter: 60,
    bucketSize: 80,
    cabinSize: 70,
    tractorScale: 1
};

// Enhanced sand particle system
class SandParticle {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = Math.random() * 3 + 2;
        this.color = `hsl(45, ${Math.random() * 20 + 70}%, ${Math.random() * 20 + 40}%)`;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.005;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += simulation.gravity;
        this.vx *= simulation.windResistance;
        this.life -= this.decay;
        return this.life > 0 && this.y < canvas.height - 50;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

let sandParticles = [];

// Enhanced drawing functions
function drawTractor() {
    ctx.save();
    ctx.translate(tractorState.x, tractorState.y);
    ctx.scale(tractorState.tractorScale, tractorState.tractorScale);
    
    // Draw shadows
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    // Draw tractor body with gradient
    let gradient = ctx.createLinearGradient(0, 0, tractorState.width, tractorState.height);
    gradient.addColorStop(0, '#ff4444');
    gradient.addColorStop(1, '#cc0000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, tractorState.width, tractorState.height);

    // Draw cabin - adjusted size based on calculations
    ctx.fillStyle = '#333';
    ctx.fillRect(tractorState.width - tractorState.cabinSize - 30, -tractorState.cabinSize + 20, 
                tractorState.cabinSize, tractorState.cabinSize);
    
    // Draw windows
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(tractorState.width - tractorState.cabinSize - 20, -tractorState.cabinSize + 30, 
                tractorState.cabinSize - 20, tractorState.cabinSize - 40);

    // Draw wheels with calculated diameter
    drawWheel(tractorState.wheelbase * 0.2, tractorState.height, tractorState.tireDiameter * 0.5);
    drawWheel(tractorState.width - tractorState.wheelbase * 0.2, tractorState.height, 
            tractorState.tireDiameter * 0.5);

    // Draw lift arm mechanism with scaled bucket
    ctx.save();
    ctx.translate(tractorState.width - tractorState.wheelbase * 0.3, 20);
    ctx.rotate(tractorState.bucketAngle);
    
    // Draw hydraulic cylinder - scaled
    ctx.fillStyle = '#666';
    ctx.fillRect(0, -10 * tractorState.tractorScale, 
                100 * tractorState.tractorScale, 20 * tractorState.tractorScale);
    
    // Draw bucket with calculated size
    ctx.translate(100 * tractorState.tractorScale, 0);
    ctx.rotate(tractorState.isDumping ? Math.PI/3 : 0);
    gradient = ctx.createLinearGradient(-20, -40, tractorState.bucketSize, tractorState.bucketSize);
    gradient.addColorStop(0, '#999');
    gradient.addColorStop(1, '#666');
    ctx.fillStyle = gradient;
    ctx.fillRect(-20, -tractorState.bucketSize/2, 
                tractorState.bucketSize, tractorState.bucketSize);

    // Draw sand in bucket - scaled with bucket size
    if (tractorState.sandLevel > 0 && !tractorState.isDumping) {
        gradient = ctx.createLinearGradient(-15, 0, tractorState.bucketSize - 10, 
                                        tractorState.sandLevel * tractorState.tractorScale);
        gradient.addColorStop(0, '#DAA520');
        gradient.addColorStop(1, '#B8860B');
        ctx.fillStyle = gradient;
        ctx.fillRect(-15, tractorState.bucketSize/2 - tractorState.sandLevel * tractorState.tractorScale, 
                    tractorState.bucketSize - 10, tractorState.sandLevel * tractorState.tractorScale);
    }

    ctx.restore();
    ctx.restore();
}

function drawWheel(x, y, radius) {
    ctx.save();
    ctx.translate(x, y);
    
    // Wheel body
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    // Wheel rim
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, radius - 5, 0, Math.PI * 2);
    ctx.stroke();

    // Wheel treads
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
        ctx.rotate(Math.PI / 4);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius, 0);
        ctx.stroke();
    }

    ctx.restore();
}

function drawEnvironment() {
    // Sky gradient
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#4A90E2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sun
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(100, 100, 40, 0, Math.PI * 2);
    ctx.fill();

    // Clouds
    drawCloud(300, 100);
    drawCloud(600, 150);
    drawCloud(900, 80);

    // Ground with texture
    gradient = ctx.createLinearGradient(0, canvas.height - 100, 0, canvas.height);
    gradient.addColorStop(0, '#8B4513');
    gradient.addColorStop(1, '#654321');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

    // Sand pile with detailed texture
    drawSandPile();
}

function drawCloud(x, y) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.arc(x + 25, y - 10, 25, 0, Math.PI * 2);
    ctx.arc(x + 25, y + 10, 25, 0, Math.PI * 2);
    ctx.arc(x + 50, y, 30, 0, Math.PI * 2);
    ctx.fill();
}

function drawSandPile() {
    let gradient = ctx.createLinearGradient(400, canvas.height - 150, 800, canvas.height - 50);
    gradient.addColorStop(0, '#DAA520');
    gradient.addColorStop(1, '#B8860B');
    ctx.fillStyle = gradient;
    
    ctx.beginPath();
    ctx.moveTo(400, canvas.height - 50);
    ctx.quadraticCurveTo(600, canvas.height - 200, 800, canvas.height - 50);
    ctx.fill();

    // Add texture details
    ctx.strokeStyle = 'rgba(139, 69, 19, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 420; i < 780; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, canvas.height - 50);
        ctx.lineTo(i + 10, canvas.height - 100 - Math.sin((i-400)/400 * Math.PI) * 50);
        ctx.stroke();
    }
}

function updateSimulation() {
    simulation.time = (Date.now() - simulation.startTime) / 1000;
    
    // Update fuel consumption
    if (tractorState.isMoving || tractorState.isLifting) {
        simulation.fuel = Math.max(0, simulation.fuel - simulation.fuelConsumption);
        document.getElementById('fuelLevel').style.width = `${simulation.fuel}%`;
    }

    // Update speed and movement
    if (tractorState.isMoving && simulation.fuel > 0) {
        simulation.speed = Math.min(simulation.speed + simulation.acceleration, simulation.maxSpeed);
        tractorState.x += simulation.speed * tractorState.direction;
        simulation.distance += Math.abs(simulation.speed);

        // Screen wrapping
        if (tractorState.x > canvas.width + 100) {
            tractorState.x = -tractorState.width;
        } else if (tractorState.x < -tractorState.width - 100) {
            tractorState.x = canvas.width;
        }
    } else {
        simulation.speed = Math.max(0, simulation.speed - simulation.deceleration);
    }

    // Update bucket angle
    if (tractorState.isLifting && simulation.fuel > 0) {
        tractorState.targetBucketAngle = Math.PI/4;
    } else {
        tractorState.targetBucketAngle = 0;
    }
    tractorState.bucketAngle += (tractorState.targetBucketAngle - tractorState.bucketAngle) * 0.1;

    // Update sand collection
    if (tractorState.x > 400 && tractorState.x < 800 && !tractorState.isDumping && tractorState.isLifting) {
        tractorState.sandLevel = Math.min(tractorState.sandLevel + 1, simulation.sandCapacity);
    }

    // Update sand particles
    if (tractorState.isDumping && tractorState.sandLevel > 0) {
        for (let i = 0; i < 3; i++) {
            let bucketPos = {
                x: tractorState.x + tractorState.width + 60,
                y: tractorState.y - 20 + tractorState.bucketAngle * 100
            };
            sandParticles.push(new SandParticle(
                bucketPos.x,
                bucketPos.y,
                Math.random() * 4 - 2,
                -Math.random() * 2
            ));
        }
        tractorState.sandLevel = Math.max(0, tractorState.sandLevel - 0.5);
    }

    // Update particles
    sandParticles = sandParticles.filter(particle => particle.update());
}

function updateStats() {
    document.getElementById('loadAmount').textContent = Math.round(tractorState.sandLevel);
    document.getElementById('liftHeight').textContent = (tractorState.bucketAngle * 2).toFixed(1);
    document.getElementById('speed').textContent = (simulation.speed * 10).toFixed(1);
    document.getElementById('distance').textContent = Math.round(simulation.distance);
    
    let minutes = Math.floor(simulation.time / 60);
    let seconds = Math.floor(simulation.time % 60);
    document.getElementById('workTime').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawEnvironment();
    drawTractor();
    sandParticles.forEach(particle => particle.draw(ctx));
    
    updateSimulation();
    updateStats();

    requestAnimationFrame(animate);
}

// Control functions
function toggleLift() {
    if (simulation.fuel > 0) {
        tractorState.isLifting = !tractorState.isLifting;
        document.getElementById('liftBtn').style.background = 
            tractorState.isLifting ? '#ff4444' : '#4CAF50';
    }
}

function toggleMovement() {
    if (simulation.fuel > 0) {
        tractorState.isMoving = !tractorState.isMoving;
        document.getElementById('moveBtn').style.background = 
            tractorState.isMoving ? '#ff4444' : '#4CAF50';
    }
}

function dumpSand() {
    tractorState.isDumping = !tractorState.isDumping;
    document.getElementById('dumpBtn').style.background = 
        tractorState.isDumping ? '#ff4444' : '#4CAF50';
}

function refuel() {
    simulation.fuel = 100;
    document.getElementById('fuelLevel').style.width = '100%';
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            toggleLift();
            break;
        case 'ArrowRight':
            tractorState.direction = 1;
            toggleMovement();
            break;
        case 'ArrowLeft':
            tractorState.direction = -1;
            toggleMovement();
            break;
        case ' ':
            dumpSand();
            break;
        case 'r':
            refuel();
            break;
    }
});

// Start animation
animate();

function toggleCalculator() {
    const calculator = document.getElementById('calculator');
    calculator.style.display = calculator.style.display === 'none' ? 'block' : 'none';
}

function calculate() {
    // Get input values - note the unit conversions
    const enginePower = parseFloat(document.getElementById('enginePower').value); // Now in kW
    const mass = parseFloat(document.getElementById('weight').value); // In kg
    const bucketCapacity = parseFloat(document.getElementById('bucketCapacity').value); // In m³
    const liftHeight = parseFloat(document.getElementById('liftHeight').value) / 1000; // Convert mm to m
    const wheelbase = parseFloat(document.getElementById('wheelbase').value) / 1000; // Convert mm to m
    const tireDiameter = parseFloat(document.getElementById('tireDiameter').value) / 1000; // Convert mm to m
    const systemPressure = parseFloat(document.getElementById('systemPressure').value); // Now in kPa

    // Calculate key parameters with updated units
    // Tipping load (based on mass distribution and wheelbase)
    const tippingLoad = mass * 0.4 * (wheelbase / 2.5);
    
    // Maximum lifting force (based on hydraulic pressure and cylinder area)
    const liftForce = enginePower * 0.204; // Adjusted for kW
    
    // Traction force calculation
    const tractionForce = enginePower * 0.75; // Adjusted for kW
    
    // Estimated fuel consumption (L/h)
    const fuelConsumption = enginePower * 0.25; // Adjusted for kW
    
    // Required hydraulic flow
    const hydraulicFlow = enginePower * 1.2; // Adjusted for kW
    
    // Ground pressure calculation (now in kPa)
    const contactArea = tireDiameter * 0.3 * 2; // m²
    const groundPressure = (mass * 9.81) / (contactArea);

    // Additional calculations for South African metrics
    const powerToMassRatio = enginePower / (mass / 1000); // kW/ton
    const hydraulicPower = (systemPressure * parseFloat(document.getElementById('pumpFlow').value)) / 60000; // kW
    const breakoutForce = liftForce * 1.5; // kN
    const drawbarPull = tractionForce * 0.85; // kN
    const turningRadius = wheelbase * 1.8 * 1000; // Convert to mm
    const ptoPower = enginePower * 0.9; // kW

    // Efficiency calculations
    const fuelEfficiency = fuelConsumption / enginePower; // L/kWh
    const hydraulicEfficiency = 85 - (systemPressure / 1000); // Percentage
    const transmissionEfficiency = 92; // Percentage
    const overallEfficiency = (hydraulicEfficiency + transmissionEfficiency) / 2;

    // Operating costs in Rand
    const fuelCostPerLiter = 23.50; // Example fuel price in Rand
    const fuelCostPerHour = fuelConsumption * fuelCostPerLiter;
    const maintenanceCostIndex = mass * 0.0015; // Rand per hour
    const serviceIntervals = 250; // Hours

    // Update results
    document.getElementById('tippingLoad').textContent = tippingLoad.toFixed(0);
    document.getElementById('liftForce').textContent = liftForce.toFixed(1);
    document.getElementById('tractionForce').textContent = tractionForce.toFixed(1);
    document.getElementById('fuelConsumption').textContent = fuelConsumption.toFixed(1);
    document.getElementById('hydraulicFlow').textContent = hydraulicFlow.toFixed(0);
    document.getElementById('groundPressure').textContent = groundPressure.toFixed(2);

    // Update additional metrics
    document.getElementById('powerWeight').textContent = powerToMassRatio.toFixed(2);
    document.getElementById('hydraulicPower').textContent = hydraulicPower.toFixed(1);
    document.getElementById('breakoutForce').textContent = breakoutForce.toFixed(1);
    document.getElementById('drawbarPull').textContent = drawbarPull.toFixed(1);
    document.getElementById('turningRadius').textContent = turningRadius.toFixed(0);
    document.getElementById('ptoPower').textContent = ptoPower.toFixed(1);

    // Update efficiency metrics
    document.getElementById('fuelEfficiency').textContent = fuelEfficiency.toFixed(3);
    document.getElementById('hydraulicEfficiency').textContent = hydraulicEfficiency.toFixed(1);
    document.getElementById('transmissionEfficiency').textContent = transmissionEfficiency.toFixed(1);
    document.getElementById('overallEfficiency').textContent = overallEfficiency.toFixed(1);

    // Update operating costs
    document.getElementById('fuelCost').textContent = fuelCostPerHour.toFixed(2);
    document.getElementById('maintenanceCost').textContent = maintenanceCostIndex.toFixed(2);
    document.getElementById('serviceIntervals').textContent = serviceIntervals;

    // Update simulation parameters
    simulation.maxSpeed = enginePower * 0.04; // Adjusted for kW
    simulation.acceleration = enginePower * 0.0008; // Adjusted for kW
    simulation.sandCapacity = bucketCapacity * 1000;
    simulation.fuelConsumption = fuelConsumption * 0.01;

    // Update tractor dimensions
    const baseWidth = 200;
    const baseHeight = 100;
    
    // Scale tractor based on engine power and mass
    const powerScale = enginePower / 55; // 55 kW as baseline
    const massScale = mass / 3500; // 3500 kg as baseline
    const averageScale = (powerScale + massScale) / 2;
    
    tractorState.tractorScale = Math.min(Math.max(averageScale, 0.7), 1.5);

    // Update tractor dimensions with metric units
    tractorState.width = baseWidth * tractorState.tractorScale;
    tractorState.height = baseHeight * tractorState.tractorScale;
    tractorState.wheelbase = wheelbase * 1000 * tractorState.tractorScale;
    tractorState.tireDiameter = tireDiameter * 1000 * tractorState.tractorScale;
    tractorState.bucketSize = bucketCapacity * 60 * tractorState.tractorScale;
    tractorState.cabinSize = tractorState.height * 0.7;
}

// Initial calculation
calculate();