document.getElementById("logoutBtn").addEventListener("click", function (e) {
    e.preventDefault();
  
    // Afficher la section de confirmation
    document.getElementById("confirmationMessage").style.display = "block";
  });
  
  document.getElementById("confirmLogout").addEventListener("click", function () {
    // Effacer les données du stockage local
    localStorage.clear();
    
    // Rediriger vers la page de connexion
    window.location.href = "/APP-JS/LOGIN/login.html";
  });
  
  document.getElementById("cancelLogout").addEventListener("click", function () {
    // Masquer la section de confirmation
    document.getElementById("confirmationMessage").style.display = "none";
  });
  