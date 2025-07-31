// Mock: Load tutorial data (simulate fetch)
const tutorialId = 1; // Normally from URL/query
const mockTutorial = {
  id: tutorialId,
  title: "How to Write a Blog",
  description: "A step-by-step guide to writing a blog post.",
  content: "Start with an idea...\nWrite an outline...\nEdit and publish.",
};

function loadTutorial() {
  // Simulate async fetch
  setTimeout(() => {
    document.getElementById("title").value = mockTutorial.title;
    document.getElementById("description").value = mockTutorial.description;
    document.getElementById("content").value = mockTutorial.content;
  }, 200);
}

function validateForm(data) {
  if (!data.title.trim() || !data.description.trim() || !data.content.trim()) {
    return "All fields are required.";
  }
  if (data.title.length > 100) return "Title too long.";
  return "";
}

document.addEventListener("DOMContentLoaded", () => {
  loadTutorial();

  const form = document.getElementById("editForm");
  const errorMsg = document.getElementById("errorMsg");
  const successMsg = document.getElementById("successMsg");
  const cancelBtn = document.getElementById("cancelBtn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorMsg.textContent = "";
    successMsg.textContent = "";

    const data = {
      title: form.title.value,
      description: form.description.value,
      content: form.content.value,
    };

    const error = validateForm(data);
    if (error) {
      errorMsg.textContent = error;
      return;
    }

    // Mock: Save tutorial (simulate API call)
    setTimeout(() => {
      // Update mockTutorial
      mockTutorial.title = data.title;
      mockTutorial.description = data.description;
      mockTutorial.content = data.content;
      successMsg.textContent = "Tutorial updated successfully!";
    }, 400);
  });

  cancelBtn.addEventListener("click", function () {
    // Reload original data
    loadTutorial();
    errorMsg.textContent = "";
    successMsg.textContent = "";
  });
});
