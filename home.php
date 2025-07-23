<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BLOCK DIGITAL MANUFACTURING</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        :root {
            --primary: #2563eb;
            --primary-dark: #1d4ed8;
            --secondary: #64748b;
            --background: #f8fafc;
            --surface: #ffffff;
            --text: #1e293b;
            --success: #22c55e;
            --warning: #f59e0b;
            --error: #ef4444;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background: var(--background);
            color: var(--text);
            min-height: 100vh;
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        header {
            text-align: center;
            margin-bottom: 4rem;
            position: relative;
        }

        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 1rem;
            position: relative;
            display: inline-block;
        }

        h1::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 4px;
            background: var(--primary);
            border-radius: 2px;
        }

        .design-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .design-card {
            background: var(--surface);
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .design-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: var(--primary);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
        }

        .design-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        }

        .design-card:hover::before {
            transform: scaleX(1);
        }

        .design-card h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--primary);
        }

        .design-card p {
            color: var(--secondary);
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
        }

        .status {
            display: inline-flex;
            align-items: center;
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .status::before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 8px;
        }

        .not-started {
            background: rgba(239, 68, 68, 0.1);
            color: var(--error);
        }

        .not-started::before {
            background: var(--error);
        }

        .in-progress {
            background: rgba(245, 158, 11, 0.1);
            color: var(--warning);
        }

        .in-progress::before {
            background: var(--warning);
        }

        .completed {
            background: rgba(34, 197, 94, 0.1);
            color: var(--success);
        }

        .completed::before {
            background: var(--success);
        }

        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }

            h1 {
                font-size: 2rem;
            }

            .design-options {
                grid-template-columns: 1fr;
            }
        }

        /* Animation */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .design-card {
            animation: fadeInUp 0.6s ease backwards;
        }

        .design-card:nth-child(1) { animation-delay: 0.1s; }
        .design-card:nth-child(2) { animation-delay: 0.2s; }
        .design-card:nth-child(3) { animation-delay: 0.3s; }
        .design-card:nth-child(4) { animation-delay: 0.4s; }
        .design-card:nth-child(5) { animation-delay: 0.5s; }
        .design-card:nth-child(6) { animation-delay: 0.6s; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Block Digital Manufacturing Design System</h1>
        </header>
        
        <div class="design-options">
            <div class="design-card" data-href="tractorenginedesign.php">
                <h3>Engine Design</h3>
                <p>Design the power unit including engine specifications, fuel system, and cooling system</p>
                <span class="status not-started">Not Started</span>
            </div>

            <div class="design-card" data-href="tractortransmissiondesign.php">
                <h3>Transmission</h3>
                <p>Configure transmission type, gear ratios, and drive system</p>
                <span class="status not-started">Not Started</span>
            </div>

            <div class="design-card" data-href="tractorhydraulicsdesign.php">
                <h3>Hydraulic System</h3>
                <p>Design hydraulic pump, valves, and control systems</p>
                <span class="status not-started">Not Started</span>
            </div>

            <div class="design-card" data-href="tractorchassisdesign.php">
                <h3>Chassis & Frame</h3>
                <p>Design the main frame, axles, and suspension system</p>
                <span class="status not-started">Not Started</span>
            </div>

            <div class="design-card" data-href="tractorcabindesign.php">
                <h3>Cabin & Controls</h3>
                <p>Design operator cabin, controls, and instrumentation</p>
                <span class="status not-started">Not Started</span>
            </div>

            <div class="design-card" data-href="tractorimplementsdesign.php">
                <h3>Implements & PTO</h3>
                <p>Configure power take-off and implement attachment systems</p>
                <span class="status not-started">Not Started</span>
            </div>
        </div>
    </div>

    <script>
        document.querySelectorAll('.design-card').forEach(card => {
            card.addEventListener('click', function(e) {
                const status = this.querySelector('.status');
                const url = this.dataset.href;
                
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                ripple.style.pointerEvents = 'none';
                ripple.style.width = ripple.style.height = '100px';
                ripple.style.transform = 'translate(-50%, -50%)';
                ripple.style.left = e.clientX - this.getBoundingClientRect().left + 'px';
                ripple.style.top = e.clientY - this.getBoundingClientRect().top + 'px';
                
                this.appendChild(ripple);
                
                ripple.style.animation = 'ripple 0.6s linear';

                // Update status
                if (status.classList.contains('not-started')) {
                    status.classList.remove('not-started');
                    status.classList.add('in-progress');
                    status.textContent = 'In Progress';
                    
                    // Wait for ripple and status change animation
                    setTimeout(() => {
                        window.location.href = url;
                    }, 600);
                }

                ripple.addEventListener('animationend', () => ripple.remove());
            });
        });

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: translate(-50%, -50%) scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    </script>
</body>
</html>