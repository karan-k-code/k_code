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
const uploadForm = document.getElementById("uploadForm");
const codeInput = document.getElementById("code");
const highlightedCode = document.getElementById("highlightedCode");
const languageSelect = document.getElementById("language");
const languageDisplay = document.getElementById("languageDisplay");
const previewBtn = document.getElementById("previewBtn");
const previewModal = document.getElementById("previewModal");
const closeModal = document.getElementById("closeModal");
const backToEdit = document.getElementById("backToEdit");
const confirmUpload = document.getElementById("confirmUpload");
const submitBtn = document.getElementById("submitBtn");
const spinner = document.getElementById("spinner");
const btnText = document.querySelector(".btn-text");

// Editor Toolbar Buttons
const indentBtn = document.getElementById("indent");
const commentBtn = document.getElementById("comment");
const clearBtn = document.getElementById("clear");
const copyPreviewBtn = document.getElementById("copyPreviewCode");

// Preview Elements
const previewTitle = document.getElementById("previewTitle");
const previewDescription = document.getElementById("previewDescription");
const previewLanguage = document.getElementById("previewLanguage");
const previewCode = document.getElementById("previewCode");
const previewTags = document.getElementById("previewTags");

// API Configuration
const API_ENDPOINT = "https://your-api-endpoint.com/code/upload";
const DEFAULT_LANGUAGE = "plaintext";

// Initialize the page
document.addEventListener("DOMContentLoaded", init);

function init() {
  // Set up syntax highlighting
  setupSyntaxHighlighting();

  // Set up event listeners
  setupEventListeners();
}

function setupSyntaxHighlighting() {
  // Update syntax highlighting when code changes
  codeInput.addEventListener("input", updateHighlighting);

  // Update language display when language changes
  languageSelect.addEventListener("change", updateLanguageDisplay);

  // Initial update
  updateLanguageDisplay();
  updateHighlighting();
}

function setupEventListeners() {
  // Form submission
  uploadForm.addEventListener("submit", handleFormSubmit);

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
  confirmUpload.addEventListener("click", () =>
    uploadForm.dispatchEvent(new Event("submit"))
  );

  // Toolbar buttons
  indentBtn.addEventListener("click", handleIndent);
  commentBtn.addEventListener("click", handleComment);
  clearBtn.addEventListener("click", handleClear);
  copyPreviewBtn.addEventListener("click", copyPreviewCode);

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === previewModal) {
      previewModal.style.display = "none";
    }
  });
}

function updateHighlighting() {
  const code = codeInput.value;
  const language = languageSelect.value || DEFAULT_LANGUAGE;

  highlightedCode.textContent = code;
  hljs.highlightElement(highlightedCode);

  // Sync scroll between textarea and pre element
  highlightedCode.scrollTop = codeInput.scrollTop;
  highlightedCode.scrollLeft = codeInput.scrollLeft;
}

function updateLanguageDisplay() {
  const language = languageSelect.value;
  const displayText = language
    ? language.charAt(0).toUpperCase() + language.slice(1)
    : "Plain Text";
  languageDisplay.textContent = displayText;

  // Update highlighting for the new language
  if (language) {
    highlightedCode.className = `language-${language}`;
  } else {
    highlightedCode.className = "";
  }
  updateHighlighting();
}

function handleIndent() {
  const startPos = codeInput.selectionStart;
  const endPos = codeInput.selectionEnd;
  const value = codeInput.value;

  // Insert 4 spaces at the start of each selected line
  const beforeSelection = value.substring(0, startPos);
  const selection = value.substring(startPos, endPos);
  const afterSelection = value.substring(endPos);

  const indentedSelection = selection.replace(/^/gm, "    ");
  codeInput.value = beforeSelection + indentedSelection + afterSelection;

  // Restore selection
  codeInput.selectionStart = startPos;
  codeInput.selectionEnd =
    endPos + (indentedSelection.length - selection.length);

  updateHighlighting();
}

function handleComment() {
  const startPos = codeInput.selectionStart;
  const endPos = codeInput.selectionEnd;
  const value = codeInput.value;
  const language = languageSelect.value;

  const commentSyntax = getCommentSyntax(language);
  if (!commentSyntax) return;

  const beforeSelection = value.substring(0, startPos);
  const selection = value.substring(startPos, endPos);
  const afterSelection = value.substring(endPos);

  let commentedSelection;
  if (selection.includes("\n")) {
    // Multi-line comment
    commentedSelection = selection.replace(/^/gm, commentSyntax.line + " ");
  } else {
    // Single-line comment
    commentedSelection = commentSyntax.line + " " + selection;
  }

  codeInput.value = beforeSelection + commentedSelection + afterSelection;

  // Restore selection
  codeInput.selectionStart = startPos;
  codeInput.selectionEnd =
    endPos + (commentedSelection.length - selection.length);

  updateHighlighting();
}

function getCommentSyntax(language) {
  const syntaxMap = {
    javascript: { line: "//", block: ["/*", "*/"] },
    python: { line: "#", block: ['"""', '"""'] },
    java: { line: "//", block: ["/*", "*/"] },
    csharp: { line: "//", block: ["/*", "*/"] },
    cpp: { line: "//", block: ["/*", "*/"] },
    php: { line: "//", block: ["/*", "*/"] },
    ruby: { line: "#", block: ["=begin", "=end"] },
    go: { line: "//", block: ["/*", "*/"] },
    typescript: { line: "//", block: ["/*", "*/"] },
  };

  return syntaxMap[language] || { line: "//", block: ["/*", "*/"] };
}

function handleClear() {
  if (confirm("Are you sure you want to clear all code?")) {
    codeInput.value = "";
    updateHighlighting();
  }
}

function showPreview() {
  if (!validateForm(true)) return;

  // Populate preview modal
  previewTitle.textContent = uploadForm.title.value;
  previewDescription.textContent =
    uploadForm.description.value || "No description provided";
  previewLanguage.textContent =
    languageSelect.options[languageSelect.selectedIndex].text;

  // Highlight code in preview
  previewCode.textContent = codeInput.value;
  previewCode.className = `language-${
    languageSelect.value || DEFAULT_LANGUAGE
  }`;
  hljs.highlightElement(previewCode);

  // Add tags if any
  previewTags.innerHTML = "";
  const tags = uploadForm.tags.value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag);
  tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.textContent = tag;
    previewTags.appendChild(tagElement);
  });

  // Show modal
  previewModal.style.display = "block";
}

function copyPreviewCode() {
  const code = codeInput.value;
  navigator.clipboard.writeText(code).then(() => {
    copyPreviewBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
      copyPreviewBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
    }, 2000);
  });
}

function validateForm(isPreview = false) {
  let isValid = true;

  // Reset errors
  document
    .querySelectorAll(".error")
    .forEach((el) => el.classList.remove("error"));
  document.querySelectorAll(".error-message").forEach((el) => el.remove());

  // Validate title
  if (!uploadForm.title.value.trim()) {
    showError(uploadForm.title, "Title is required");
    isValid = false;
  }

  // Validate language
  if (!uploadForm.language.value) {
    showError(uploadForm.language, "Please select a language");
    isValid = false;
  }

  // Validate code
  if (!uploadForm.code.value.trim()) {
    showError(uploadForm.code.parentElement, "Code is required");
    isValid = false;
  }

  // If just preview, don't show API-related errors
  if (isPreview) return isValid;

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
    title: uploadForm.title.value,
    description: uploadForm.description.value,
    language: uploadForm.language.value,
    code: codeInput.value,
    tags: uploadForm.tags.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag),
    visibility: uploadForm.visibility.value,
    createdAt: new Date().toISOString(),
  };

  // Show loading state
  submitBtn.disabled = true;
  btnText.textContent = "Uploading...";
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
    alert("Code uploaded successfully!");
    window.location.href = `/code/${data.id}`;
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Failed to upload code. Please try again.");
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    btnText.textContent = "Upload Code";
    spinner.classList.add("hidden");

    // Close modal if open
    previewModal.style.display = "none";
  }
}

// Helper function to get auth token (implementation depends on your auth system)
function getAuthToken() {
  return localStorage.getItem("auth_token") || "";
}

// Sync textarea scrolling with highlighted code
codeInput.addEventListener("scroll", () => {
  highlightedCode.scrollTop = codeInput.scrollTop;
  highlightedCode.scrollLeft = codeInput.scrollLeft;
});
