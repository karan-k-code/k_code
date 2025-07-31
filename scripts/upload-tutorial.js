// Import highlight.js languages
import hljs from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js";
import javascript from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/javascript.min.js";
import python from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/python.min.js";
import java from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/java.min.js";
import csharp from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/csharp.min.js";
import cpp from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/cpp.min.js";
import php from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/php.min.js";
import ruby from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/ruby.min.js";
import go from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/go.min.js";
import typescript from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/typescript.min.js";

// Register languages
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("php", php);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("go", go);
hljs.registerLanguage("typescript", typescript);

// DOM Elements
const tutorialForm = document.getElementById("tutorialForm");
const topicsContainer = document.getElementById("topicsContainer");
const addTopicBtn = document.getElementById("addTopicBtn");
const previewBtn = document.getElementById("previewBtn");
const previewModal = document.getElementById("previewModal");
const closeModal = document.getElementById("closeModal");
const backToEdit = document.getElementById("backToEdit");
const confirmPublish = document.getElementById("confirmPublish");
const submitBtn = document.getElementById("submitBtn");
const spinner = document.getElementById("spinner");
const btnText = document.querySelector(".btn-text");
const tagsInput = document.getElementById("tutorialTags");
const tagsList = document.getElementById("tagsList");

// API Configuration
const API_ENDPOINT = "https://your-api-endpoint.com/tutorials/create";
let topicCounter = 0;

// Initialize the page
document.addEventListener("DOMContentLoaded", init);

function init() {
  // Add first topic by default
  addNewTopic();

  // Set up event listeners
  setupEventListeners();
}

function setupEventListeners() {
  // Form submission
  tutorialForm.addEventListener("submit", handleFormSubmit);

  // Add topic button
  addTopicBtn.addEventListener("click", addNewTopic);

  // Preview button
  previewBtn.addEventListener("click", showPreview);

  // Modal buttons
  closeModal.addEventListener(
    "click",
    () => (previewModal.style.display = "none")
  );
  backToEdit.addEventListener(
    "click",
    () => (previewModal.style.display = "none")
  );
  confirmPublish.addEventListener("click", () =>
    tutorialForm.dispatchEvent(new Event("submit"))
  );

  // Tags input
  tagsInput.addEventListener("keydown", handleTagInput);

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === previewModal) {
      previewModal.style.display = "none";
    }
  });
}

// function addNewTopic() {
//   const template = document.getElementById("topicTemplate");
//   const clone = template.content.cloneNode(true);
//   const topicElement = clone.querySelector(".topic-card");

//   // Set unique ID for the topic
//   topicCounter++;
//   const topicId = `topic-${topicCounter}`;
//   topicElement.dataset.topicId = topicId;

//   // Set up topic header click to toggle content
//   const topicHeader = topicElement.querySelector(".topic-header");
//   topicHeader.addEventListener("click", () => {
//     topicElement.classList.toggle("expanded");
//   });

//   // Set up topic actions
//   const moveUpBtn = topicElement.querySelector(".move-up");
//   const moveDownBtn = topicElement.querySelector(".move-down");
//   const deleteBtn = topicElement.querySelector(".delete-topic");

//   moveUpBtn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     moveTopicUp(topicElement);
//   });

//   moveDownBtn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     moveTopicDown(topicElement);
//   });

//   deleteBtn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     if (
//       topicsContainer.children.length > 1 ||
//       confirm("This is the only topic. Delete it?")
//     ) {
//       topicElement.remove();
//     }
//   });

//   // Set up code editor
//   const codeInput = topicElement.querySelector(".code-input");
//   const highlightedCode = topicElement.querySelector(".highlighted-code");
//   const languageSelect = topicElement.querySelector(".language-select");

//   codeInput.addEventListener("input", () => {
//     updateTopicCodeHighlighting(
//       codeInput,
//       highlightedCode,
//       languageSelect.value
//     );
//   });

//   languageSelect.addEventListener("change", () => {
//     updateTopicCodeHighlighting(
//       codeInput,
//       highlightedCode,
//       languageSelect.value
//     );
//   });

//   // Set up key points
//   const addPointBtn = topicElement.querySelector(".add-point-btn");
//   const pointsContainer = topicElement.querySelector(".key-points-container");

//   addPointBtn.addEventListener("click", () => {
//     addNewPointOrPitfall(pointsContainer, "point");
//   });

//   // Set up pitfalls
//   const addPitfallBtn = topicElement.querySelector(".add-pitfall-btn");
//   const pitfallsContainer = topicElement.querySelector(".pitfalls-container");

//   addPitfallBtn.addEventListener("click", () => {
//     addNewPointOrPitfall(pitfallsContainer, "pitfall");
//   });

//   // Add to container
//   topicsContainer.appendChild(topicElement);

//   // Initialize code highlighting
//   updateTopicCodeHighlighting(codeInput, highlightedCode, languageSelect.value);
// }

function moveTopicUp(topicElement) {
  const prev = topicElement.previousElementSibling;
  if (prev) {
    topicsContainer.insertBefore(topicElement, prev);
  }
}

function moveTopicDown(topicElement) {
  const next = topicElement.nextElementSibling;
  if (next) {
    topicsContainer.insertBefore(next, topicElement);
  }
}

// function updateTopicCodeHighlighting(codeInput, highlightedCode, language) {
//   const code = codeInput.value;
//   const lang = language || "plaintext";

//   highlightedCode.textContent = code;
//   highlightedCode.className = `language-${lang}`;
//   hljs.highlightElement(highlightedCode);

//   // Sync scroll
//   highlightedCode.scrollTop = codeInput.scrollTop;
//   highlightedCode.scrollLeft = codeInput.scrollLeft;
// }

function addNewPointOrPitfall(container, type) {
  const element = document.createElement("div");
  element.className = type;

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = type === "point" ? "Key point..." : "Common pitfall...";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = `btn-remove-${type}`;
  removeBtn.innerHTML = '<i class="fas fa-times"></i>';

  removeBtn.addEventListener("click", () => {
    element.remove();
  });

  element.appendChild(input);
  element.appendChild(removeBtn);
  container.appendChild(element);
}

function handleTagInput(e) {
  if (e.key === "Enter" || e.key === ",") {
    e.preventDefault();
    const tag = tagsInput.value.trim();
    if (tag) {
      addTag(tag);
      tagsInput.value = "";
    }
  }
}

function addTag(tagText) {
  // Check if tag already exists
  const existingTags = Array.from(tagsList.querySelectorAll(".tag")).map(
    (tag) => tag.textContent.replace("×", "").trim()
  );
  if (existingTags.includes(tagText)) return;

  const tagElement = document.createElement("span");
  tagElement.className = "tag";
  tagElement.textContent = tagText;

  const removeBtn = document.createElement("span");
  removeBtn.className = "tag-remove";
  removeBtn.innerHTML = "&times;";
  removeBtn.addEventListener("click", () => {
    tagElement.remove();
  });

  tagElement.appendChild(removeBtn);
  tagsList.appendChild(tagElement);
}

function getTags() {
  return Array.from(tagsList.querySelectorAll(".tag")).map((tag) =>
    tag.textContent.replace("×", "").trim()
  );
}

function showPreview() {
  if (!validateForm(true)) return;

  // Populate preview modal
  document.getElementById("previewTutorialTitle").textContent =
    tutorialForm.tutorialTitle.value;
  document.getElementById("previewDescription").textContent =
    tutorialForm.tutorialDescription.value;
  document.getElementById("previewCategory").textContent =
    tutorialForm.tutorialCategory.options[
      tutorialForm.tutorialCategory.selectedIndex
    ].text;
  document.getElementById("previewLevel").textContent =
    tutorialForm.tutorialLevel.options[
      tutorialForm.tutorialLevel.selectedIndex
    ].text;
  document.getElementById("previewDate").textContent = "Today";

  // Add tags
  const previewTagsContainer = document.getElementById("previewTags");
  previewTagsContainer.innerHTML = "";
  getTags().forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.textContent = tag;
    previewTagsContainer.appendChild(tagElement);
  });

  // Add topics
  const previewTopicsContainer = document.getElementById("previewTopics");
  previewTopicsContainer.innerHTML = "";

  Array.from(topicsContainer.querySelectorAll(".topic-card")).forEach(
    (topic) => {
      const topicElement = document.createElement("div");
      topicElement.className = "preview-topic";

      const title =
        topic.querySelector(".topic-title-input").value || "Untitled Topic";
      const description =
        topic.querySelector(".topic-description").value ||
        "No description provided";
      const code = topic.querySelector(".code-input").value;
      const language = topic.querySelector(".language-select").value;

      const points = Array.from(topic.querySelectorAll(".key-point input"))
        .map((input) => input.value.trim())
        .filter((value) => value);

      const pitfalls = Array.from(topic.querySelectorAll(".pitfall input"))
        .map((input) => input.value.trim())
        .filter((value) => value);

      topicElement.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            
            ${
              code
                ? `
            <div class="preview-code-container">
                <div class="preview-code-header">
                    <span>${language}</span>
                    <button class="btn-copy">
                        <i class="far fa-copy"></i> Copy
                    </button>
                </div>
                <pre class="preview-code"><code class="language-${language}">${escapeHtml(
                    code
                  )}</code></pre>
            </div>
            `
                : ""
            }
            
            ${
              points.length > 0
                ? `
            <div class="key-points-section">
                <h4>Key Points</h4>
                <ul class="key-points-list">
                    ${points
                      .map((point) => `<li>${escapeHtml(point)}</li>`)
                      .join("")}
                </ul>
            </div>
            `
                : ""
            }
            
            ${
              pitfalls.length > 0
                ? `
            <div class="pitfalls-section">
                <h4>Common Pitfalls</h4>
                <ul class="pitfalls-list">
                    ${pitfalls
                      .map((pitfall) => `<li>${escapeHtml(pitfall)}</li>`)
                      .join("")}
                </ul>
            </div>
            `
                : ""
            }
        `;

      // Set up copy button
      const copyBtn = topicElement.querySelector(".btn-copy");
      if (copyBtn) {
        copyBtn.addEventListener("click", () => {
          navigator.clipboard.writeText(code).then(() => {
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
              copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
            }, 2000);
          });
        });
      }

      previewTopicsContainer.appendChild(topicElement);
    }
  );

  // Highlight all code blocks in preview
  document.querySelectorAll(".preview-code code").forEach((block) => {
    hljs.highlightElement(block);
  });

  // Show modal
  previewModal.style.display = "block";
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validateForm(isPreview = false) {
  let isValid = true;

  // Reset errors
  document
    .querySelectorAll(".error")
    .forEach((el) => el.classList.remove("error"));
  document.querySelectorAll(".error-message").forEach((el) => el.remove());

  // Validate tutorial title
  if (!tutorialForm.tutorialTitle.value.trim()) {
    showError(tutorialForm.tutorialTitle, "Title is required");
    isValid = false;
  }

  // Validate description
  if (!tutorialForm.tutorialDescription.value.trim()) {
    showError(tutorialForm.tutorialDescription, "Description is required");
    isValid = false;
  }

  // Validate category
  if (!tutorialForm.tutorialCategory.value) {
    showError(tutorialForm.tutorialCategory, "Please select a category");
    isValid = false;
  }

  // Validate level
  if (!tutorialForm.tutorialLevel.value) {
    showError(tutorialForm.tutorialLevel, "Please select a difficulty level");
    isValid = false;
  }

  // Validate topics
  const topics = Array.from(topicsContainer.querySelectorAll(".topic-card"));
  topics.forEach((topic, index) => {
    const titleInput = topic.querySelector(".topic-title-input");
    const descriptionInput = topic.querySelector(".topic-description");

    if (!titleInput.value.trim()) {
      showError(titleInput, `Topic ${index + 1}: Title is required`);
      isValid = false;
    }

    if (!descriptionInput.value.trim()) {
      showError(
        descriptionInput,
        `Topic ${index + 1}: Description is required`
      );
      isValid = false;
    }
  });

  return isValid;
}

function showError(input, message) {
  const formGroup = input.closest(".form-group") || input.parentElement;
  formGroup.classList.add("error");

  const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.textContent = message;

  formGroup.appendChild(errorElement);
}

async function handleFormSubmit(e) {
  e.preventDefault();

  if (!validateForm()) return;

  // Prepare data
  const formData = {
    title: tutorialForm.tutorialTitle.value,
    description: tutorialForm.tutorialDescription.value,
    category: tutorialForm.tutorialCategory.value,
    level: tutorialForm.tutorialLevel.value,
    tags: getTags(),
    visibility: tutorialForm.visibility.value,
    allowComments: tutorialForm.allowComments.checked,
    topics: [],
    createdAt: new Date().toISOString(),
  };

  // Add topics data
  Array.from(topicsContainer.querySelectorAll(".topic-card")).forEach(
    (topic) => {
      const topicData = {
        title: topic.querySelector(".topic-title-input").value,
        description: topic.querySelector(".topic-description").value,
        code: topic.querySelector(".code-input").value,
        language: topic.querySelector(".language-select").value,
        keyPoints: Array.from(topic.querySelectorAll(".key-point input"))
          .map((input) => input.value.trim())
          .filter((value) => value),
        pitfalls: Array.from(topic.querySelectorAll(".pitfall input"))
          .map((input) => input.value.trim())
          .filter((value) => value),
        order: Array.from(topicsContainer.children).indexOf(topic),
      };

      formData.topics.push(topicData);
    }
  );

  // Show loading state
  submitBtn.disabled = true;
  btnText.textContent = "Publishing...";
  spinner.classList.remove("hidden");

  try {
    // Send to API
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Show success and redirect
    alert("Tutorial published successfully!");
    window.location.href = `/tutorial/${data.id}`;
  } catch (error) {
    console.error("Publish failed:", error);
    alert("Failed to publish tutorial. Please try again.");
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    btnText.textContent = "Publish Tutorial";
    spinner.classList.add("hidden");

    // Close modal if open
    previewModal.style.display = "none";
  }
}

// Helper function to get auth token
function getAuthToken() {
  return localStorage.getItem("auth_token") || "";
}

// ... (keep all previous imports and setup code)

function addNewTopic() {
  const template = document.getElementById("topicTemplate");
  const clone = template.content.cloneNode(true);
  const topicElement = clone.querySelector(".topic-card");

  // Set unique ID for the topic
  topicCounter++;
  const topicId = `topic-${topicCounter}`;
  topicElement.dataset.topicId = topicId;

  // Set up topic header click to toggle content
  const topicHeader = topicElement.querySelector(".topic-header");
  topicHeader.addEventListener("click", () => {
    topicElement.classList.toggle("expanded");
  });

  // Set up topic actions
  const moveUpBtn = topicElement.querySelector(".move-up");
  const moveDownBtn = topicElement.querySelector(".move-down");
  const deleteBtn = topicElement.querySelector(".delete-topic");

  moveUpBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    moveTopicUp(topicElement);
  });

  moveDownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    moveTopicDown(topicElement);
  });

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (
      topicsContainer.children.length > 1 ||
      confirm("This is the only topic. Delete it?")
    ) {
      topicElement.remove();
    }
  });

  // Set up code editor
  const codeInput = topicElement.querySelector(".code-input");
  const highlightedCode = topicElement.querySelector(".highlighted-code");
  const languageSelect = topicElement.querySelector(".language-select");

  // Initialize the editor
  setupCodeEditor(codeInput, highlightedCode, languageSelect);

  // Set up key points
  const addPointBtn = topicElement.querySelector(".add-point-btn");
  const pointsContainer = topicElement.querySelector(".key-points-container");

  addPointBtn.addEventListener("click", () => {
    addNewPointOrPitfall(pointsContainer, "point");
  });

  // Set up pitfalls
  const addPitfallBtn = topicElement.querySelector(".add-pitfall-btn");
  const pitfallsContainer = topicElement.querySelector(".pitfalls-container");

  addPitfallBtn.addEventListener("click", () => {
    addNewPointOrPitfall(pitfallsContainer, "pitfall");
  });

  // Add to container
  topicsContainer.appendChild(topicElement);

  // Initialize code highlighting
  updateTopicCodeHighlighting(codeInput, highlightedCode, languageSelect.value);
}

function setupCodeEditor(codeInput, highlightedCode, languageSelect) {
  // Set up initial highlighting
  updateTopicCodeHighlighting(codeInput, highlightedCode, languageSelect.value);

  // Handle input events
  codeInput.addEventListener("input", () => {
    updateTopicCodeHighlighting(
      codeInput,
      highlightedCode,
      languageSelect.value
    );
  });

  // Handle language changes
  languageSelect.addEventListener("change", () => {
    updateTopicCodeHighlighting(
      codeInput,
      highlightedCode,
      languageSelect.value
    );
  });

  // Handle scroll synchronization
  codeInput.addEventListener("scroll", () => {
    highlightedCode.scrollTop = codeInput.scrollTop;
    highlightedCode.scrollLeft = codeInput.scrollLeft;
  });

  // Handle cursor positioning
  codeInput.addEventListener("click", (e) => {
    updateCursorPosition(codeInput, highlightedCode);
  });

  codeInput.addEventListener("keyup", (e) => {
    updateCursorPosition(codeInput, highlightedCode);
  });

  // Handle tab key
  codeInput.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = codeInput.selectionStart;
      const end = codeInput.selectionEnd;

      // Insert 4 spaces at the cursor position
      codeInput.value =
        codeInput.value.substring(0, start) +
        "    " +
        codeInput.value.substring(end);

      // Move cursor to after the inserted spaces
      codeInput.selectionStart = codeInput.selectionEnd = start + 4;

      updateTopicCodeHighlighting(
        codeInput,
        highlightedCode,
        languageSelect.value
      );
    }
  });
}

function updateCursorPosition(codeInput, highlightedCode) {
  // Get the current cursor position
  const cursorPosition = codeInput.selectionStart;
  const code = codeInput.value;

  // Count lines before cursor
  const textBeforeCursor = code.substring(0, cursorPosition);
  const linesBeforeCursor = textBeforeCursor.split("\n");
  const lineNumber = linesBeforeCursor.length;
  const columnNumber =
    linesBeforeCursor[linesBeforeCursor.length - 1].length + 1;

  // You could use this information to show cursor position
  // console.log(`Line: ${lineNumber}, Column: ${columnNumber}`);

  // For now, just ensure the highlighted code stays in sync
  updateTopicCodeHighlighting(
    codeInput,
    highlightedCode,
    codeInput.closest(".topic-card").querySelector(".language-select").value
  );
}

function updateTopicCodeHighlighting(codeInput, highlightedCode, language) {
  const code = codeInput.value;
  const lang = language || "plaintext";

  highlightedCode.textContent = code;
  highlightedCode.className = `language-${lang}`;
  hljs.highlightElement(highlightedCode);

  // Sync scroll
  highlightedCode.scrollTop = codeInput.scrollTop;
  highlightedCode.scrollLeft = codeInput.scrollLeft;

  // Ensure the editor and highlighted code have the same dimensions
  const lineHeight = 18; // Adjust based on your CSS
  const padding = 15; // Match your CSS padding

  // Calculate height based on number of lines
  const lineCount = code.split("\n").length;
  const minHeight = 200; // Minimum height from CSS
  const calculatedHeight = Math.max(
    minHeight,
    lineCount * lineHeight + padding * 2
  );

  // Sync scroll
  highlightedCode.scrollTop = codeInput.scrollTop;
  highlightedCode.scrollLeft = codeInput.scrollLeft;

  codeInput.style.height = `${calculatedHeight}px`;
  highlightedCode.style.height = `${calculatedHeight}px`;
  highlightedCode.parentElement.style.height = `${calculatedHeight}px`;
}

// ... (keep all remaining existing functions)
