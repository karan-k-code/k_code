// Blog Post Specific JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Table of Contents Generator
  generateTOC();

  // Add smooth scrolling for anchor links within the post
  document.querySelectorAll('.post-content a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  // Newsletter Form Submission
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector("input").value;

      // In a real app, you would send this to your backend
      console.log("Subscribed email:", email);

      // Show success message
      alert("Thanks for subscribing to our newsletter!");
      this.reset();
    });
  }

  // Comment Form Submission
  const commentForm = document.querySelector(".comment-form");
  if (commentForm) {
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const commentText = this.querySelector("textarea").value;

      // In a real app, you would send this to your backend
      console.log("New comment:", commentText);

      // Show success message
      alert(
        "Your comment has been submitted and will appear after moderation."
      );
      this.reset();
    });
  }
});

// Generate Table of Contents from headings
function generateTOC() {
  const headings = document.querySelectorAll(".post-content h2");
  const sidebar = document.querySelector(".sidebar");

  if (headings.length > 0 && sidebar) {
    const tocContainer = document.createElement("div");
    tocContainer.className = "sidebar-widget toc-widget";

    const tocTitle = document.createElement("h3");
    tocTitle.textContent = "Table of Contents";
    tocContainer.appendChild(tocTitle);

    const tocList = document.createElement("ul");
    tocList.className = "toc-list";

    headings.forEach((heading, index) => {
      // Add ID if not already present
      if (!heading.id) {
        heading.id = "section-" + (index + 1);
      }

      const tocItem = document.createElement("li");
      const tocLink = document.createElement("a");
      tocLink.href = "#" + heading.id;
      tocLink.textContent = heading.textContent;

      tocItem.appendChild(tocLink);
      tocList.appendChild(tocItem);
    });

    tocContainer.appendChild(tocList);
    sidebar.insertBefore(tocContainer, sidebar.firstChild);
  }
}

// Enhanced code copy functionality with syntax highlighting
function copyCode(elementId) {
  const codeElement = document.getElementById(elementId);
  const codeText = codeElement.textContent;

  navigator.clipboard
    .writeText(codeText)
    .then(() => {
      const copyBtn =
        codeElement.previousElementSibling.querySelector(".copy-btn");
      const originalText = copyBtn.innerHTML;
      const originalBg = copyBtn.style.backgroundColor;

      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      copyBtn.style.backgroundColor = "#4CAF50";

      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.backgroundColor = originalBg;
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy code: ", err);
    });
}
