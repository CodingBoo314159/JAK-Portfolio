// script.js
const icons = document.querySelectorAll(".skill-icon");
const categories = document.querySelectorAll(".skills-category");

icons.forEach(icon => {
    icon.addEventListener("click", () => {
        const target = icon.dataset.category;

        categories.forEach(cat => {
            if (cat.id === target) {
                cat.style.display = cat.style.display === "block" ? "none" : "block";
            } else {
                cat.style.display = "none";
            }
        });
    });
});