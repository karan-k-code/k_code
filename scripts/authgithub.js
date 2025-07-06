// authgithub.js - GitHub OAuth Authentication

// GitHub OAuth Configuration
const githubAuthConfig = {
  clientId: "YOUR_GITHUB_CLIENT_ID",
  clientSecret: "YOUR_GITHUB_CLIENT_SECRET",
  redirectUri: window.location.origin + "/auth/github/callback",
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  userEndpoint: "https://api.github.com/user",
  scope: "user:email",
  state: generateRandomString(16),
};

// Initialize GitHub Auth
export function initGitHubAuth() {
  // Add event listener to GitHub buttons
  document.querySelectorAll(".btn-social.github").forEach((button) => {
    button.addEventListener("click", handleGitHubLogin);
  });

  // Check for GitHub callback
  if (window.location.pathname === "/auth/github/callback") {
    handleGitHubCallback();
  }
}

// Handle GitHub Login
function handleGitHubLogin() {
  // Store state in localStorage for validation later
  localStorage.setItem("github_auth_state", githubAuthConfig.state);

  // Construct authorization URL
  const authUrl = new URL(githubAuthConfig.authorizationEndpoint);
  authUrl.searchParams.append("client_id", githubAuthConfig.clientId);
  authUrl.searchParams.append("redirect_uri", githubAuthConfig.redirectUri);
  authUrl.searchParams.append("scope", githubAuthConfig.scope);
  authUrl.searchParams.append("state", githubAuthConfig.state);

  // Redirect to GitHub for authorization
  window.location.href = authUrl.toString();
}

// Handle GitHub Callback
async function handleGitHubCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const state = urlParams.get("state");
  const error = urlParams.get("error");

  // Check for errors
  if (error) {
    console.error(
      "GitHub Auth Error:",
      error,
      urlParams.get("error_description")
    );
    showAuthError(error);
    return;
  }

  // Validate state
  const storedState = localStorage.getItem("github_auth_state");
  if (state !== storedState) {
    console.error("State mismatch");
    showAuthError("Invalid state parameter");
    return;
  }

  // Clear state from storage
  localStorage.removeItem("github_auth_state");

  try {
    // Exchange code for access token
    const token = await exchangeCodeForToken(code);

    // Get user info
    const user = await fetchGitHubUser(token);

    // Process user data and log in
    await processGitHubUser(user);
  } catch (err) {
    console.error("GitHub Auth Error:", err);
    showAuthError("Authentication failed. Please try again.");
  }
}

// Exchange authorization code for access token
async function exchangeCodeForToken(code) {
  const response = await fetch(githubAuthConfig.tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: githubAuthConfig.clientId,
      client_secret: githubAuthConfig.clientSecret,
      code,
      redirect_uri: githubAuthConfig.redirectUri,
      state: githubAuthConfig.state,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to exchange code for token");
  }

  const data = await response.json();
  return data.access_token;
}

// Fetch GitHub user data
async function fetchGitHubUser(accessToken) {
  const response = await fetch(githubAuthConfig.userEndpoint, {
    headers: {
      Authorization: `token ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const user = await response.json();

  // Fetch primary email if not included in user response
  if (!user.email) {
    const emails = await fetchGitHubEmails(accessToken);
    const primaryEmail = emails.find((email) => email.primary) || emails[0];
    user.email = primaryEmail.email;
  }

  return user;
}

// Fetch GitHub user emails
async function fetchGitHubEmails(accessToken) {
  const response = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `token ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user emails");
  }

  return await response.json();
}

// Process GitHub user data and log in/sign up
async function processGitHubUser(user) {
  // Prepare user data for your backend
  const userData = {
    provider: "github",
    providerId: user.id.toString(),
    name: user.name || user.login,
    email: user.email,
    avatar: user.avatar_url,
    username: user.login,
  };

  try {
    // Send to your backend for verification/registration
    const response = await fetch("/api/auth/github", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to authenticate with backend");
    }

    const data = await response.json();

    // Store authentication token (implementation depends on your system)
    storeAuthToken(data.token);

    // Redirect to dashboard or return URL
    const returnUrl = localStorage.getItem("returnUrl") || "/dashboard";
    localStorage.removeItem("returnUrl");
    window.location.href = returnUrl;
  } catch (err) {
    console.error("Backend Auth Error:", err);
    showAuthError("Failed to complete authentication");
  }
}

// Helper function to store authentication token
function storeAuthToken(token) {
  // Implementation depends on your frontend auth system
  localStorage.setItem("auth_token", token);
  // You might also want to set cookies or other storage mechanisms
}

// Show authentication error
function showAuthError(message) {
  // Implementation depends on your UI framework
  const errorElement =
    document.getElementById("authError") || createErrorElement();
  errorElement.textContent = message;
  errorElement.style.display = "block";

  // Hide after 5 seconds
  setTimeout(() => {
    errorElement.style.display = "none";
  }, 5000);
}

function createErrorElement() {
  const errorElement = document.createElement("div");
  errorElement.id = "authError";
  errorElement.style.color = "#e74c3c";
  errorElement.style.margin = "10px 0";
  errorElement.style.padding = "10px";
  errorElement.style.border = "1px solid #e74c3c";
  errorElement.style.borderRadius = "4px";
  errorElement.style.backgroundColor = "#fdecea";
  errorElement.style.display = "none";

  const authForm = document.querySelector(".auth-form") || document.body;
  authForm.prepend(errorElement);

  return errorElement;
}

// Generate random string for state parameter
function generateRandomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initGitHubAuth);
