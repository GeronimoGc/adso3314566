let lastTime = 0;

document.addEventListener("mousemove", function (e) {
  const currentTime = new Date().getTime();
  if (currentTime - lastTime < 30) return; // Limit spawning frequency
  lastTime = currentTime;

  const star = document.createElement("div");
  star.className = "star";

  // Position the star at the mouse coordinates
  star.style.left = e.clientX + "px";
  star.style.top = e.clientY + "px";

  // Random direction for the animation
  const x = (Math.random() - 0.5) * 150;
  const y = (Math.random() - 0.5) * 150;

  star.style.setProperty("--x", `${x}px`);
  star.style.setProperty("--y", `${y}px`);

  // Random size
  const size = Math.random() * 6 + 2;
  star.style.width = size + "px";
  star.style.height = size + "px";

  // Random star color variants (soft colors)
  const colors = ["#ffffff", "#fff4e6", "#e6f7ff", "#fffde6"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  star.style.background = `radial-gradient(circle, ${randomColor} 0%, rgba(255, 255, 255, 0) 80%)`;
  star.style.boxShadow = `0 0 10px ${randomColor}`;

  document.body.appendChild(star);

  // Remove the star after the animation completes
  setTimeout(() => {
    star.remove();
  }, 1200);
});
