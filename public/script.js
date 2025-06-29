function toggleForm() {
  const wrapper = document.getElementById('formWrapper');
  wrapper.style.transform = wrapper.style.transform === 'translateX(-50%)' ? 'translateX(0%)' : 'translateX(-50%)';
}

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.success) window.location.href = "/home.html";
  else alert("Login failed.");
});

document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const res = await fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.success) {
    alert("Signup successful! Please login.");
    toggleForm();
  } else {
    alert("Signup failed.");
  }
});

async function generateStory() {
  const prompt = document.getElementById("prompt")?.value;
  const storyBox = document.getElementById("story");
  if (!prompt) return;
  storyBox.textContent = "Generating...";
  const res = await fetch("/generate", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  const data = await res.json();
  storyBox.textContent = data.story || "Error generating story.";
}
