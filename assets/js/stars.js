(function() {
    /**
     * EFECTO 1: Estrellas que siguen al puntero del ratón
     */
    let lastTime = 0;

    document.addEventListener("mousemove", function (e) {
        const currentTime = new Date().getTime();
        if (currentTime - lastTime < 30) return; // Limita la frecuencia de creación
        lastTime = currentTime;

        const star = document.createElement("div");
        star.className = "star";

        // Posiciona la estrella en las coordenadas del ratón
        star.style.left = e.clientX + "px";
        star.style.top = e.clientY + "px";

        // Dirección aleatoria para la animación
        const x = (Math.random() - 0.5) * 150;
        const y = (Math.random() - 0.5) * 150;

        star.style.setProperty("--x", `${x}px`);
        star.style.setProperty("--y", `${y}px`);

        // Tamaño aleatorio
        const size = Math.random() * 6 + 2;
        star.style.width = size + "px";
        star.style.height = size + "px";

        // Colores aleatorios suaves
        const colors = ["#ffffff", "#fff4e6", "#e6f7ff", "#fffde6"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        star.style.background = `radial-gradient(circle, ${randomColor} 0%, rgba(255, 255, 255, 0) 80%)`;
        star.style.boxShadow = `0 0 10px ${randomColor}`;

        document.body.appendChild(star);

        // Elimina la estrella después de la animación (1.2s según CSS)
        setTimeout(() => {
            star.remove();
        }, 1200);
    });

    /**
     * EFECTO 2: Fondo de partículas (Orbe de Estrellas)
     */
    const canvas = document.getElementById('canvasfondo');
    
    // Solo se ejecuta si el canvas existe en el HTML
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 500; 

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                // Posicionamiento en una esfera 3D
                this.theta = Math.random() * Math.PI * 2;
                this.phi = Math.acos((Math.random() * 2) - 1);
                this.dist = 280; // Radio del orbe
                
                // Colores cálidos (Rojos, Naranjas, Amarillos)
                const hues = [10, 25, 40]; 
                this.color = `hsla(${hues[Math.floor(Math.random() * hues.length)]}, 100%, 50%, ${Math.random() * 0.8 + 0.2})`;
            }

            draw() {
                // Rotación continua
                this.theta += 0.003;

                // Proyectar 3D a 2D
                const x3d = this.dist * Math.sin(this.phi) * Math.cos(this.theta);
                const y3d = this.dist * Math.sin(this.phi) * Math.sin(this.theta);
                const z3d = this.dist * Math.cos(this.phi);

                const scale = 500 / (500 + z3d); 
                const x2d = x3d * scale + canvas.width / 2;
                const y2d = y3d * scale + canvas.height / 2;

                ctx.beginPath();
                ctx.arc(x2d, y2d, scale * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        // Inicializar partículas
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            // Fondo con estela suave para efecto de movimiento
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => p.draw());
            requestAnimationFrame(animate);
        }

        animate();
    }
})();