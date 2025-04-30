// Change password handler
document.getElementById("passwordForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const current = document.getElementById("currentPassword").value;
  const newPwd = document.getElementById("newPassword").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (newPwd !== confirm) {
      document.getElementById("passwordMessage").textContent = "Les mots de passe ne correspondent pas.";
      return;
  }

  // Simulate password update
  document.getElementById("passwordMessage").textContent = "Mot de passe mis à jour avec succès.";
  this.reset();
});

// Edit profile handler
document.getElementById("profileForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Simulate localStorage storage
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);

  document.getElementById("profileMessage").textContent = "Profil mis à jour.";
});

// Change language handler
document.getElementById("languageForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const language = document.getElementById("languageSelect").value;
  
  // Simulate language change (e.g., using localStorage or more complex solution)
  localStorage.setItem("userLanguage", language);

  document.getElementById("languageMessage").textContent = `Langue changée à ${language}.`;
});

// Privacy settings handler
document.getElementById("privacyForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const dataSharing = document.getElementById("dataSharing").checked;

  // Simulate privacy setting change
  localStorage.setItem("dataSharing", dataSharing);

  document.getElementById("privacyMessage").textContent = `Paramètres de confidentialité mis à jour. Partage des données: ${dataSharing ? "Activé" : "Désactivé"}.`;
});
