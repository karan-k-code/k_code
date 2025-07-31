document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const profileNavItems = document.querySelectorAll(".profile-nav li");
  const tabContents = document.querySelectorAll(".tab-content");
  const editProfileBtn = document.getElementById("editProfileBtn");
  const editProfileModal = document.getElementById("editProfileModal");
  const closeEditModal = document.getElementById("closeEditModal");
  const cancelEditBtn = document.getElementById("cancelEditBtn");
  const editProfileForm = document.getElementById("editProfileForm");
  const editBannerBtn = document.getElementById("editBannerBtn");
  const editAvatarBtn = document.getElementById("editAvatarBtn");
  const loadMorePostsBtn = document.getElementById("loadMorePosts");
  const sortPostsSelect = document.getElementById("sortPosts");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const createTutorialBtn = document.getElementById("createTutorialBtn");
  const createProjectBtn = document.getElementById("createProjectBtn");
  const shareProfileBtn = document.getElementById("shareProfileBtn");

  // Current user data (would normally come from API)
  let currentUser = {
    name: "Alex Johnson",
    username: "alexj",
    bio: "Full-stack developer | Open source contributor | Coffee enthusiast",
    about:
      "I'm a passionate full-stack developer with 5 years of experience building web applications. I specialize in JavaScript, React, Node.js, and Python. When I'm not coding, I enjoy hiking and photography.",
    location: "San Francisco, CA",
    joinDate: "January 2020",
    email: "alex.johnson@example.com",
    skills: ["JavaScript", "React", "Node.js", "Python", "HTML/CSS", "MongoDB"],
    socialLinks: {
      github: "https://github.com/alexj",
      twitter: "https://twitter.com/alexj",
      linkedin: "https://linkedin.com/in/alexj",
    },
    stats: {
      posts: 47,
      followers: 1250,
      following: 356,
    },
    bannerImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    avatarImage: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  // Initialize the page
  initProfilePage();

  // Set up event listeners
  setupEventListeners();

  function initProfilePage() {
    // Load user data
    loadUserData();

    // Load initial tab content
    loadTabContent("posts");

    // Set banner and avatar
    document.getElementById(
      "bannerImage"
    ).style.backgroundImage = `url(${currentUser.bannerImage})`;
    document.getElementById("profileAvatar").src = currentUser.avatarImage;
  }

  function loadUserData() {
    document.getElementById("userName").textContent = currentUser.name;
    document.getElementById(
      "userUsername"
    ).textContent = `@${currentUser.username}`;
    document.getElementById("userBio").textContent = currentUser.bio;
    document.getElementById("userAbout").textContent = currentUser.about;
    document.getElementById("userLocation").textContent = currentUser.location;
    document.getElementById("joinDate").textContent = currentUser.joinDate;
    document.getElementById("userEmail").textContent = currentUser.email;
    document.getElementById("postCount").textContent = currentUser.stats.posts;
    document.getElementById("followerCount").textContent = formatNumber(
      currentUser.stats.followers
    );
    document.getElementById("followingCount").textContent =
      currentUser.stats.following;

    // Load skills
    const skillsList = document.getElementById("skillsList");
    skillsList.innerHTML = "";
    currentUser.skills.forEach((skill) => {
      const skillElement = document.createElement("span");
      skillElement.className = "skill-tag";
      skillElement.textContent = skill;
      skillsList.appendChild(skillElement);
    });

    // Load social links
    const socialLinks = document.getElementById("socialLinks");
    socialLinks.innerHTML = "";
    for (const [platform, url] of Object.entries(currentUser.socialLinks)) {
      if (url) {
        const link = document.createElement("a");
        link.href = url;
        link.className = "social-link";
        link.target = "_blank";
        link.innerHTML = `<i class="fab fa-${platform}"></i> ${url.replace(
          "https://",
          ""
        )}`;
        socialLinks.appendChild(link);
      }
    }
  }

  function setupEventListeners() {
    // Profile navigation tabs
    profileNavItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Update active tab
        profileNavItems.forEach((i) => i.classList.remove("active"));
        this.classList.add("active");

        // Show corresponding content
        const tabName = this.dataset.tab;
        loadTabContent(tabName);
      });
    });

    // Edit profile button
    editProfileBtn.addEventListener("click", openEditProfileModal);
    closeEditModal.addEventListener("click", closeEditProfileModal);
    cancelEditBtn.addEventListener("click", closeEditProfileModal);

    // Edit profile form submission
    editProfileForm.addEventListener("submit", function (e) {
      e.preventDefault();
      saveProfileChanges();
    });

    // Edit banner/avatar buttons
    editBannerBtn.addEventListener("click", function () {
      alert(
        "In a real app, this would open a file picker to upload a new banner image"
      );
    });

    editAvatarBtn.addEventListener("click", function () {
      alert(
        "In a real app, this would open a file picker to upload a new profile picture"
      );
    });

    // Load more posts
    loadMorePostsBtn.addEventListener("click", loadMorePosts);

    // Sort posts
    sortPostsSelect.addEventListener("change", function () {
      loadTabContent("posts", this.value);
    });

    // Filter saved items
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        filterBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        filterSavedItems(this.dataset.filter);
      });
    });

    // Create new tutorial/project
    createTutorialBtn.addEventListener("click", function () {
      window.location.href = "upload-tutorial.html";
    });

    createProjectBtn.addEventListener("click", function () {
      window.location.href = "upload-project.html";
    });

    // Share profile
    shareProfileBtn.addEventListener("click", shareProfile);
  }

  function loadTabContent(tabName, sortBy = "newest") {
    // Hide all tab contents
    tabContents.forEach((content) => content.classList.remove("active"));

    // Show selected tab content
    document.getElementById(`${tabName}Tab`).classList.add("active");

    // Load appropriate content
    switch (tabName) {
      case "posts":
        loadPosts(sortBy);
        break;
      case "tutorials":
        loadTutorials();
        break;
      case "projects":
        loadProjects();
        break;
      case "saved":
        loadSavedItems();
        break;
      case "about":
        // About content is already loaded
        break;
    }
  }

  function loadPosts(sortBy) {
    // In a real app, this would fetch from API
    const postsGrid = document.getElementById("postsGrid");
    postsGrid.innerHTML = "";

    // Simulated posts data
    const posts = [
      {
        id: 1,
        title: "Understanding React Hooks",
        excerpt:
          "A deep dive into React Hooks and how they can simplify your components.",
        date: "2023-05-15",
        likes: 42,
        comments: 7,
        image:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
      {
        id: 2,
        title: "JavaScript Performance Tips",
        excerpt:
          "10 tips to make your JavaScript code run faster and more efficiently.",
        date: "2023-04-28",
        likes: 35,
        comments: 4,
        image:
          "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
      {
        id: 3,
        title: "Building a REST API with Node.js",
        excerpt:
          "Step-by-step guide to creating a robust REST API using Node.js and Express.",
        date: "2023-04-10",
        likes: 28,
        comments: 3,
        image:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
      {
        id: 4,
        title: "CSS Grid vs Flexbox",
        excerpt:
          "When to use CSS Grid and when to stick with Flexbox for your layouts.",
        date: "2023-03-22",
        likes: 56,
        comments: 12,
        image:
          "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
      {
        id: 5,
        title: "Python for Data Analysis",
        excerpt:
          "Getting started with Pandas and NumPy for data analysis in Python.",
        date: "2023-03-15",
        likes: 31,
        comments: 5,
        image:
          "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
      {
        id: 6,
        title: "TypeScript Best Practices",
        excerpt: "How to get the most out of TypeScript in your projects.",
        date: "2023-02-28",
        likes: 47,
        comments: 8,
        image:
          "https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ];

    // Sort posts
    let sortedPosts = [...posts];
    if (sortBy === "oldest") {
      sortedPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "popular") {
      sortedPosts.sort((a, b) => b.likes - a.likes);
    } else {
      // Default: newest first
      sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Display posts
    sortedPosts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post-card";
      postElement.innerHTML = `
                <div class="post-image" style="background-image: url(${
                  post.image
                })"></div>
                <div class="post-content">
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-meta">
                        <span>${formatDate(post.date)}</span>
                        <span>${post.likes} likes</span>
                    </div>
                </div>
            `;
      postsGrid.appendChild(postElement);
    });
  }

  function loadMorePosts() {
    // Simulate loading more posts
    const loadingText = loadMorePostsBtn.innerHTML;
    loadMorePostsBtn.disabled = true;
    loadMorePostsBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Loading...';

    setTimeout(() => {
      // In a real app, this would fetch more posts from API
      const newPosts = [
        {
          id: 7,
          title: "Vue.js Composition API",
          excerpt: "Exploring the new Composition API in Vue 3.",
          date: "2023-02-15",
          likes: 23,
          comments: 3,
          image:
            "https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        },
        {
          id: 8,
          title: "Docker for Developers",
          excerpt:
            "A practical guide to using Docker in your development workflow.",
          date: "2023-01-28",
          likes: 38,
          comments: 6,
          image:
            "https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        },
      ];

      newPosts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "post-card";
        postElement.innerHTML = `
                    <div class="post-image" style="background-image: url(${
                      post.image
                    })"></div>
                    <div class="post-content">
                        <h3 class="post-title">${post.title}</h3>
                        <p class="post-excerpt">${post.excerpt}</p>
                        <div class="post-meta">
                            <span>${formatDate(post.date)}</span>
                            <span>${post.likes} likes</span>
                        </div>
                    </div>
                `;
        document.getElementById("postsGrid").appendChild(postElement);
      });

      loadMorePostsBtn.disabled = false;
      loadMorePostsBtn.innerHTML = loadingText;
    }, 1000);
  }

  function loadTutorials() {
    // In a real app, this would fetch from API
    const tutorialsList = document.getElementById("tutorialsList");
    tutorialsList.innerHTML = "";

    const tutorials = [
      {
        id: 1,
        title: "React Hooks Masterclass",
        views: 1250,
        likes: 87,
        date: "2023-04-10",
        thumbnail:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
      },
      {
        id: 2,
        title: "JavaScript ES6+ Features",
        views: 980,
        likes: 65,
        date: "2023-03-22",
        thumbnail:
          "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
      },
      {
        id: 3,
        title: "Node.js Authentication",
        views: 750,
        likes: 42,
        date: "2023-02-15",
        thumbnail:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
      },
    ];

    tutorials.forEach((tutorial) => {
      const tutorialElement = document.createElement("div");
      tutorialElement.className = "tutorial-item";
      tutorialElement.innerHTML = `
                <div class="tutorial-thumbnail" style="background-image: url(${
                  tutorial.thumbnail
                })"></div>
                <div class="tutorial-info">
                    <h3 class="tutorial-title">${tutorial.title}</h3>
                    <div class="tutorial-stats">
                        <span>${formatNumber(tutorial.views)} views</span>
                        <span>${tutorial.likes} likes</span>
                        <span>${formatDate(tutorial.date)}</span>
                    </div>
                </div>
                <div class="tutorial-actions">
                    <button class="btn btn-small"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-small"><i class="fas fa-trash"></i></button>
                </div>
            `;
      tutorialsList.appendChild(tutorialElement);
    });
  }

  function loadProjects() {
    // In a real app, this would fetch from API
    const projectsGrid = document.getElementById("projectsGrid");
    projectsGrid.innerHTML = "";

    const projects = [
      {
        id: 1,
        title: "E-commerce Platform",
        description:
          "A full-featured e-commerce platform built with React and Node.js",
        image:
          "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=60",
        github: "#",
        demo: "#",
      },
      {
        id: 2,
        title: "Task Management App",
        description: "A productivity app for managing tasks and projects",
        image:
          "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=60",
        github: "#",
        demo: "#",
      },
      {
        id: 3,
        title: "Weather Dashboard",
        description: "Real-time weather information with interactive maps",
        image:
          "https://images.unsplash.com/photo-1561484930-974554019ade?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=60",
        github: "#",
        demo: "#",
      },
    ];

    projects.forEach((project) => {
      const projectElement = document.createElement("div");
      projectElement.className = "project-card";
      projectElement.innerHTML = `
                <div class="project-image" style="background-image: url(${project.image})"></div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-links">
                        <a href="${project.github}" class="btn btn-small"><i class="fab fa-github"></i> Code</a>
                        <a href="${project.demo}" class="btn btn-small"><i class="fas fa-external-link-alt"></i> Demo</a>
                    </div>
                </div>
            `;
      projectsGrid.appendChild(projectElement);
    });
  }

  function loadSavedItems() {
    // In a real app, this would fetch from API
    const savedItems = document.getElementById("savedItems");
    savedItems.innerHTML = "";

    const items = [
      {
        type: "tutorial",
        title: "React Performance Optimization",
        excerpt: "Techniques to make your React apps faster",
        date: "2023-05-10",
        image:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
      },
      {
        type: "post",
        title: "CSS Grid Layout Guide",
        excerpt: "Complete guide to CSS Grid layout system",
        date: "2023-04-28",
        image:
          "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
      },
      {
        type: "project",
        title: "Open Source Contribution",
        excerpt: "How to contribute to open source projects",
        date: "2023-04-15",
        image:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
      },
    ];

    items.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "post-card saved-item";
      itemElement.dataset.type = item.type;
      itemElement.innerHTML = `
                <div class="post-image" style="background-image: url(${
                  item.image
                })"></div>
                <div class="post-content">
                    <span class="item-type">${item.type}</span>
                    <h3 class="post-title">${item.title}</h3>
                    <p class="post-excerpt">${item.excerpt}</p>
                    <div class="post-meta">
                        <span>${formatDate(item.date)}</span>
                        <button class="btn-unsave"><i class="fas fa-bookmark"></i> Saved</button>
                    </div>
                </div>
            `;
      savedItems.appendChild(itemElement);
    });
  }

  function filterSavedItems(filter) {
    const savedItems = document.querySelectorAll(".saved-item");

    savedItems.forEach((item) => {
      if (filter === "all" || item.dataset.type === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  function openEditProfileModal() {
    // Populate form with current data
    document.getElementById("editName").value = currentUser.name;
    document.getElementById("editUsername").value = currentUser.username;
    document.getElementById("editBio").value = currentUser.bio;
    document.getElementById("editAbout").value = currentUser.about;
    document.getElementById("editLocation").value = currentUser.location;
    document.getElementById("editSkills").value = currentUser.skills.join(", ");
    document.getElementById("editGithub").value =
      currentUser.socialLinks.github || "";
    document.getElementById("editTwitter").value =
      currentUser.socialLinks.twitter || "";
    document.getElementById("editLinkedin").value =
      currentUser.socialLinks.linkedin || "";

    // Show modal
    editProfileModal.style.display = "block";
  }

  function closeEditProfileModal() {
    editProfileModal.style.display = "none";
  }

  function saveProfileChanges() {
    // Get form values
    currentUser.name = document.getElementById("editName").value;
    currentUser.username = document.getElementById("editUsername").value;
    currentUser.bio = document.getElementById("editBio").value;
    currentUser.about = document.getElementById("editAbout").value;
    currentUser.location = document.getElementById("editLocation").value;
    currentUser.skills = document
      .getElementById("editSkills")
      .value.split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    currentUser.socialLinks.github =
      document.getElementById("editGithub").value;
    currentUser.socialLinks.twitter =
      document.getElementById("editTwitter").value;
    currentUser.socialLinks.linkedin =
      document.getElementById("editLinkedin").value;

    // In a real app, this would send to API
    console.log("Updated profile:", currentUser);

    // Update UI
    loadUserData();
    closeEditProfileModal();

    // Show success message
    alert("Profile updated successfully!");
  }

  function shareProfile() {
    // In a real app, this would use the Web Share API or social sharing buttons
    const profileUrl = window.location.href;
    navigator.clipboard
      .writeText(profileUrl)
      .then(() => {
        alert("Profile link copied to clipboard!");
      })
      .catch(() => {
        prompt("Copy this link to share:", profileUrl);
      });
  }

  // Helper functions
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  }
});
