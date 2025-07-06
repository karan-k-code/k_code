// Auth Form Validation and Handling
document.addEventListener("DOMContentLoaded", function () {
  // Password strength indicator
  const passwordInput = document.getElementById("password");
  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      updatePasswordStrength(this.value);
    });
  }

  // Toggle password visibility
  document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.parentElement.querySelector("input");
      const icon = this.querySelector("i");

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
        this.setAttribute("aria-label", "Hide password");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
        this.setAttribute("aria-label", "Show password");
      }
    });
  });

  // Signup form validation
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate form
      const isValid = validateSignupForm();

      if (isValid) {
        // In a real app, you would send data to your backend here
        const formData = {
          username: document.getElementById("username").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        };

        console.log("Form submitted:", formData);

        // Show success message and redirect
        alert("Account created successfully! Redirecting to dashboard...");
        // window.location.href = 'dashboard.html';
      }
    });
  }

  // Login form handling
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate form
      const isValid = validateLoginForm();

      if (isValid) {
        // In a real app, you would authenticate with your backend here
        const formData = {
          emailOrUsername: document.getElementById("loginEmail").value,
          password: document.getElementById("loginPassword").value,
          remember: document.getElementById("remember").checked,
        };

        console.log("Login attempt:", formData);

        // Show success message and redirect
        alert("Login successful! Redirecting to dashboard...");
        // window.location.href = 'dashboard.html';
      }
    });
  }

  // Social login buttons
  document.querySelectorAll(".btn-social").forEach((button) => {
    button.addEventListener("click", function () {
      const provider = this.classList.contains("google") ? "Google" : "GitHub";
      alert(`In a real app, this would initiate ${provider} OAuth flow`);
    });
  });
});

function updatePasswordStrength(password) {
  const strengthBar = document.querySelector(".strength-bar");
  const strengthText = document.querySelector(".strength-text");

  if (!strengthBar || !strengthText) return;

  // Calculate strength (simple example)
  let strength = 0;
  let width = "20%";
  let color = "#e74c3c";
  let text = "Weak";

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  switch (strength) {
    case 2:
      width = "40%";
      color = "#f39c12";
      text = "Fair";
      break;
    case 3:
      width = "70%";
      color = "#3498db";
      text = "Good";
      break;
    case 4:
      width = "100%";
      color = "#2ecc71";
      text = "Strong";
      break;
  }

  strengthBar.style.setProperty("--strength-width", width);
  strengthBar.style.setProperty("--strength-color", color);
  strengthText.textContent = text;

  // Update the pseudo-element
  strengthBar.innerHTML = "";
  strengthBar.appendChild(document.createElement("span")).style.width = width;
  strengthBar.querySelector("span").style.backgroundColor = color;
  strengthBar.querySelector("span").style.display = "block";
  strengthBar.querySelector("span").style.height = "100%";
  strengthBar.querySelector("span").style.borderRadius = "2px";
  strengthBar.querySelector("span").style.transition = "width 0.3s ease";
}

function validateSignupForm() {
  let isValid = true;
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const terms = document.getElementById("terms");

  // Reset errors
  document.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("error");
    const errorMessage = group.querySelector(".error-message");
    if (errorMessage) errorMessage.remove();
  });

  // Validate username
  if (username.value.length < 4 || username.value.length > 20) {
    showError(username, "Username must be between 4-20 characters");
    isValid = false;
  }

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showError(email, "Please enter a valid email address");
    isValid = false;
  }

  // Validate password
  if (password.value.length < 8) {
    showError(password, "Password must be at least 8 characters");
    isValid = false;
  }

  // Validate password match
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "Passwords do not match");
    isValid = false;
  }

  // Validate terms
  if (!terms.checked) {
    const termsGroup = terms.closest(".form-group");
    termsGroup.classList.add("error");
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.textContent = "You must accept the terms";
    termsGroup.appendChild(errorMessage);
    isValid = false;
  }

  return isValid;
}

function validateLoginForm() {
  let isValid = true;
  const emailOrUsername = document.getElementById("loginEmail");
  const password = document.getElementById("loginPassword");

  // Reset errors
  document.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("error");
    const errorMessage = group.querySelector(".error-message");
    if (errorMessage) errorMessage.remove();
  });

  // Validate email/username
  if (emailOrUsername.value.trim() === "") {
    showError(emailOrUsername, "Please enter your email or username");
    isValid = false;
  }

  // Validate password
  if (password.value.trim() === "") {
    showError(password, "Please enter your password");
    isValid = false;
  }

  return isValid;
}

function showError(input, message) {
  const formGroup = input.closest(".form-group");
  formGroup.classList.add("error");

  const errorMessage = document.createElement("div");
  errorMessage.className = "error-message";
  errorMessage.textContent = message;

  // Insert after input container
  const inputContainer =
    formGroup.querySelector(".input-with-icon") ||
    formGroup.querySelector("input");
  inputContainer.insertAdjacentElement("afterend", errorMessage);
}
