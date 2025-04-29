// Changer le mot de passe//
document.getElementById("passwordForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const current = document.getElementById("currentPassword").value;
    const newPwd = document.getElementById("newPassword").value;
    const confirm = document.getElementById("confirmPassword").value;
  
    if (newPwd !== confirm) {
      document.getElementById("passwordMessage").textContent = "Les mots de passe ne correspondent pas.";
      return;
    }
  
    // Simuler mise à jour//
    document.getElementById("passwordMessage").textContent = "Mot de passe mis à jour avec succès.";
    this.reset();
  });
  
  // Modifier le profil//
  document.getElementById("profileForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
  
    // Simuler stockage dans localStorage (ou API plus tard)
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
  
    document.getElementById("profileMessage").textContent = "Profil mis à jour.";
  });
  