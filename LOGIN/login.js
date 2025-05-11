const signUpButton = document.getElementById('register');
const signInButton = document.getElementById('login');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add("active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("active");
});

// Get the forms
const signUpForm = document.querySelector(".sign-up form");
const signInForm = document.querySelector(".sign-in form");

// Handle Sign Up
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = signUpForm.querySelector("input[placeholder='Full Name']").value;
  const email = signUpForm.querySelector("input[type='email']").value;
  const password = signUpForm.querySelector("input[type='password']").value;
  const birthday = signUpForm.querySelector("#birthday").value;
  const gender = signUpForm.querySelector("#gender").value;
  const university = signUpForm.querySelector("#university").value;
  const filiere = signUpForm.querySelector("#filiere").value;
  const role = signUpForm.querySelector("#role").value;


  const userData = {
    fullName,
    email,
    password,
    birthday,
    gender,
    university,
    filiere,
    role
  };

  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    const result = await response.text();
    alert(result);
  } catch (err) {
    alert("Error during sign up: " + err.message);
  }
});

// Handle Sign In
signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = signInForm.querySelector("input[type='email']").value;
  const password = signInForm.querySelector("input[type='password']").value;

  try {
    const response = await fetch("http://localhost:5000/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      
      // Redirect based on role
      if (data.role === "student") {
        window.location.href = "http://127.0.0.1:5501/dashboards/espaceetudiant/afiexam.html";
      } else if (data.role === "professor") {
        window.location.href = "http://127.0.0.1:5501/dashboards/espaceprof/affich.html";
      } else {
        alert("Unknown role: " + data.role);
      }
    } else {
      alert(data); // server may return plain text on error
    }
  } catch (err) {
    alert("Error during sign in: " + err.message);
  }
});
