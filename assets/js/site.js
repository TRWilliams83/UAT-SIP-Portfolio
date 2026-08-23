"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".nav-dropdown");
  const yearElement = document.getElementById("current-year");

  // Automatically update the copyright year.
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Only allow one navigation dropdown to remain open.
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("toggle", () => {
      if (!dropdown.open) {
        return;
      }

      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.removeAttribute("open");
        }
      });
    });
  });

  // Close dropdowns when clicking outside the navigation.
  document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        dropdown.removeAttribute("open");
      }
    });
  });

  // Close dropdowns when Escape is pressed.
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    dropdowns.forEach((dropdown) => {
      if (!dropdown.open) {
        return;
      }

      dropdown.removeAttribute("open");

      const summary = dropdown.querySelector("summary");

      if (summary) {
        summary.focus();
      }
    });
  });
});
