// ─────────────────────────────────────────
// 🌸 Skill Toggle
// ─────────────────────────────────────────
const icons = document.querySelectorAll(".skill-icon");
const categories = document.querySelectorAll(".skills-category");

icons.forEach(icon => {
    icon.addEventListener("click", () => {
        const target = icon.dataset.category;

        categories.forEach(cat => {
            if (cat.id === target) {
                cat.style.display =
                    cat.style.display === "block" ? "none" : "block";
            } else {
                cat.style.display = "none";
            }
        });
    });
});


// ─────────────────────────────────────────
// ✨ Mouse Tracking (GLOBAL)
// ─────────────────────────────────────────
let mouse = { x: null, y: null };

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});


// ─────────────────────────────────────────
// 🧠 SAFE Neural Cursor Interaction (FIXED)
// ─────────────────────────────────────────
(function enhanceNeuralNetwork() {

    const canvas = document.getElementById("neural-bg");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function drawCursorConnections(nodes) {
        if (!mouse.x || !mouse.y) return;

        nodes.forEach(n => {
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 180) {
                ctx.beginPath();
                ctx.moveTo(n.x, n.y);
                ctx.lineTo(mouse.x, mouse.y);

                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 180})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        });
    }

    // ✅ SAFE hook instead of overriding requestAnimationFrame
    const originalDraw = window.__neuralDraw;

    window.__neuralDraw = function(nodes) {

        // If original draw exists, call it first
        if (typeof originalDraw === "function") {
            originalDraw(nodes);
        }

        // Cursor attraction
        if (window.nodes && mouse.x != null) {
            window.nodes.forEach(n => {
                const dx = mouse.x - n.x;
                const dy = mouse.y - n.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    n.x += dx * 0.002;
                    n.y += dy * 0.002;
                }
            });

            drawCursorConnections(window.nodes);
        }
    };

})();
