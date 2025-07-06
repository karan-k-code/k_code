// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("toggle");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("toggle");
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Sticky navbar on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("sticky", window.scrollY > 0);
});

// Code copy functionality
function copyCode(elementId) {
  const codeElement = document.getElementById(elementId);
  const codeText = codeElement.textContent;

  navigator.clipboard
    .writeText(codeText)
    .then(() => {
      // Change button text temporarily
      const copyBtn =
        codeElement.previousElementSibling.querySelector(".copy-btn");
      const originalText = copyBtn.innerHTML;

      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      copyBtn.style.backgroundColor = "#4CAF50";

      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.backgroundColor = "#3e3e42";
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy code: ", err);
    });
}

// Form submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Here you would typically send the data to a server
    console.log({ name, email, message });

    // Show success message
    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
  });
}
