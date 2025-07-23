<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BLOCK DIGITAL MANUFACTURING</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
            color: white;
            overflow: hidden;
        }

        .loader-container {
            text-align: center;
            position: relative;
            width: 90%;
            max-width: 600px;
            padding: 1rem;
        }

        .loader-title {
            font-size: clamp(1.5rem, 5vw, 2.5rem);
            margin-bottom: clamp(15px, 3vw, 30px);
            opacity: 0;
            animation: fadeIn 1s ease forwards;
        }

        .loader {
            width: clamp(120px, 30vw, 200px);
            height: clamp(120px, 30vw, 200px);
            position: relative;
            margin: 0 auto;
        }

        .tractor {
            position: absolute;
            width: clamp(60px, 15vw, 100px);
            height: clamp(36px, 9vw, 60px);
            background: #ffd700;
            border-radius: 10px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            animation: bounce 2s infinite;
        }

        .wheel {
            position: absolute;
            width: clamp(18px, 4.5vw, 30px);
            height: clamp(18px, 4.5vw, 30px);
            background: #333;
            border-radius: 50%;
            border: clamp(3px, 0.75vw, 5px) solid #666;
            animation: rotate 2s linear infinite;
        }

        .wheel-front {
            bottom: clamp(-9px, -2.25vw, -15px);
            left: clamp(6px, 1.5vw, 10px);
        }

        .wheel-back {
            bottom: clamp(-9px, -2.25vw, -15px);
            right: clamp(6px, 1.5vw, 10px);
        }

        .cabin {
            position: absolute;
            width: clamp(24px, 6vw, 40px);
            height: clamp(18px, 4.5vw, 30px);
            background: #333;
            top: clamp(-12px, -3vw, -20px);
            right: clamp(6px, 1.5vw, 10px);
            border-radius: 5px;
        }

        .progress-bar {
            width: clamp(200px, 80%, 300px);
            height: clamp(6px, 1.5vw, 10px);
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            margin: clamp(20px, 5vw, 40px) auto 0;
            overflow: hidden;
        }

        .progress {
            width: 0%;
            height: 100%;
            background: #ffd700;
            border-radius: 5px;
            animation: progress 5s linear forwards;
        }

        .loading-text {
            margin-top: clamp(10px, 2.5vw, 20px);
            font-size: clamp(0.9rem, 2.5vw, 1.2rem);
            opacity: 0.8;
        }

        @keyframes bounce {
            0%, 100% { transform: translate(-50%, -45%); }
            50% { transform: translate(-50%, -55%); }
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .particles {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }

        .particle {
            position: absolute;
            width: clamp(3px, 0.75vw, 5px);
            height: clamp(3px, 0.75vw, 5px);
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: particleFloat 3s infinite linear;
        }

        @keyframes particleFloat {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }

        /* Additional media queries for very small screens */
        @media (max-width: 320px) {
            .loader-container {
                padding: 0.5rem;
            }

            .loader-title {
                font-size: 1.2rem;
                margin-bottom: 10px;
            }

            .loading-text {
                font-size: 0.8rem;
            }
        }
    </style>
</head>
<body>
    <div class="particles" id="particles"></div>
    
    <div class="loader-container">
        <h1 class="loader-title">Block Digital Manufacturing</h1>
        <div class="loader">
            <div class="tractor">
                <div class="cabin"></div>
                <div class="wheel wheel-front"></div>
                <div class="wheel wheel-back"></div>
            </div>
        </div>
        <div class="progress-bar">
            <div class="progress"></div>
        </div>
        <div class="loading-text">Initializing System...</div>
    </div>

    <script>
        // Create floating particles
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particlesContainer.appendChild(particle);
        }

        // Redirect after 5 seconds
        setTimeout(() => {
            window.location.href = 'home.php';
        }, 5000);
    </script>
</body>
</html>