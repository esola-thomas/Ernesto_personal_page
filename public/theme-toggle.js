const toggle = () => {
  const button = document.querySelector('[data-theme-toggle]');
  if (!button) return;

  const html = document.documentElement;

  const applyTheme = (theme) => {
    const isDark = theme !== "light";
    html.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    const sun = button.querySelector(".sun-icon");
    const moon = button.querySelector(".moon-icon");
    if (sun && moon) {
      sun.classList.toggle("hidden", isDark);
      moon.classList.toggle("hidden", !isDark);
    }
    button.setAttribute("aria-pressed", String(!isDark));
  };

  const current = localStorage.getItem("theme") === "light" ? "light" : "dark";
  applyTheme(current);

  button.addEventListener("click", () => {
    const next = html.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
  });
};

document.addEventListener("DOMContentLoaded", toggle);
