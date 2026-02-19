/**
 * Lógica para el Orbe de Datos de IA
 * Genera un sistema de partículas 3D conectadas en un canvas
 */

const canvas = document.getElementById('orbCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 400; 
const connectionDistance = 150;
const orbRadius = 300;

// Ajustar el tamaño del canvas al redimensionar la ventana
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

/**
 * Clase que representa cada nodo/partícula del flujo de datos
 */
class Particle {
    constructor() {
        // Posicionamiento esférico aleatorio
        this.theta = Math.random() * Math.PI * 2;
        this.phi = Math.acos((Math.random() * 2) - 1);
        // Velocidad de rotación aleatoria
        this.speed = 0.002 + Math.random() * 0.005;
    }

    update() {
        // Actualizar rotación
        this.theta += this.speed;

        // Convertir coordenadas esféricas a 3D (x, y, z)
        const x3d = orbRadius * Math.sin(this.phi) * Math.cos(this.theta);
        const y3d = orbRadius * Math.sin(this.phi) * Math.sin(this.theta);
        const z3d = orbRadius * Math.cos(this.phi);

        // Proyectar de 3D a 2D basándose en la perspectiva
        const perspective = 600 / (600 + z3d);
        this.x = (x3d * perspective) + canvas.width / 2;
        this.y = (y3d * perspective) + canvas.height / 2;

        // Calcular transparencia según profundidad (eje Z)
        this.alpha = (z3d + orbRadius) / (orbRadius * 2);
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        // Usamos magenta (#FF00FF) para coincidir con tu tema CSS
        ctx.fillStyle = `rgba(255, 0, 255, ${this.alpha})`; 
        ctx.fill();
    }
}

// Inicializar colección de partículas
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

/**
 * Dibuja líneas de conexión entre partículas cercanas
 */
function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                
                // La opacidad depende de la distancia y de la profundidad de la partícula
                const opacity = (1 - dist / connectionDistance) * 0.2 * particles[i].alpha;
                ctx.strokeStyle = `rgba(255, 0, 255, ${opacity})`;
                ctx.stroke();
            }
        }
    }
}

/**
 * Bucle de animación principal
 */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    drawConnections();
    requestAnimationFrame(animate);
}

// Iniciar animación
animate();