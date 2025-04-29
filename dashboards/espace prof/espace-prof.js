const sidebarContainer = document.querySelector(".sidebar-container");
const detailsBtn = document.querySelector(".sidebar-container .details-btn");

detailsBtn.addEventListener("click", () => {
  sidebarContainer.classList.toggle("active");
});

document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const confirmLogout = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");

  if (confirmLogout) {
    localStorage.clear();
    window.location.href = "/APP-JS/LOGIN/login.html";

  }
});
