"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".nav-dropdown");
  const yearElement = document.getElementById("current-year");
  const scrollVideos = document.querySelectorAll(".youtube-scroll-video");

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

  // Start embedded YouTube videos when they scroll into view.
  if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            if (!video.src) {
              video.src = video.dataset.src;
            }
          } else if (video.src) {
            // Removing the source stops playback when scrolled away.
            video.removeAttribute("src");
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    scrollVideos.forEach((video) => {
      videoObserver.observe(video);
    });
  } else {
    // Fallback for browsers without IntersectionObserver support.
    scrollVideos.forEach((video) => {
      video.src = video.dataset.src;
    });
  }
});
