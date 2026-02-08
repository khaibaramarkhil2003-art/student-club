let token = '';
const API = 'http://localhost:3000/api';

// Helper functions
function showRegister() {
  document.getElementById('register-section').style.display = 'block';
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('app-section').style.display = 'none';
}

function showLogin() {
  document.getElementById('register-section').style.display = 'none';
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('app-section').style.display = 'none';
}

function showApp() {
  document.getElementById('register-section').style.display = 'none';
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('app-section').style.display = 'block';
}

// =====================
// Register
// =====================
async function register() {
  const username = document.getElementById('reg-username').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert('User registered successfully');
    showLogin(); // 👈 بعد از Register برو Login
  } else {
    alert(data.message || 'User already exists');
  }
}

// =====================
// Login
// =====================
async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    token = data.token;
    alert('Login successful');
    showApp(); // 👈 بعد از Login برو داخل برنامه
  } else {
    alert('Invalid credentials or user not registered');
  }
}

// =====================
// Create Post
// =====================
async function createPost() {
  const title = document.getElementById('post-title').value;
  const content = document.getElementById('post-content').value;

  const res = await fetch(`${API}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, content })
  });

  if (res.ok) {
    alert('Post created successfully');
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
  } else {
    alert('Failed to create post');
  }
}

// =====================
// Load Posts
// =====================
async function loadPosts() {
  const res = await fetch(`${API}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  const postsDiv = document.getElementById('posts');
  postsDiv.innerHTML = '';

  data.data.forEach(post => {
    // container for each post
    const postDiv = document.createElement('div');
    postDiv.style.marginBottom = '10px';

    // title
    const titleDiv = document.createElement('div');
    titleDiv.innerText = post.title;
    titleDiv.style.cursor = 'pointer';
    titleDiv.style.fontWeight = 'bold';
    titleDiv.style.background = '#e0e0e0';
    titleDiv.style.padding = '8px';
    titleDiv.style.borderRadius = '5px';

    // content (hidden by default)
    const contentDiv = document.createElement('div');
    contentDiv.innerText = post.content;
    contentDiv.style.display = 'none';
    contentDiv.style.padding = '8px';
    contentDiv.style.background = '#f9f9f9';
    contentDiv.style.borderRadius = '0 0 5px 5px';

    // toggle content on title click
    titleDiv.onclick = () => {
      contentDiv.style.display =
        contentDiv.style.display === 'none' ? 'block' : 'none';
    };

    postDiv.appendChild(titleDiv);
    postDiv.appendChild(contentDiv);
    postsDiv.appendChild(postDiv);
  });
}
