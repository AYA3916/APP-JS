const sidebarContainer = document.querySelector(".sidebar-container");
const detailsBtn = document.querySelector(".sidebar-container .details-btn");

detailsBtn.addEventListener("click", () => {
  sidebarContainer.classList.toggle("active");
});
document.getElementById("logoutBtn").addEventListener("click", function (e) {
    e.preventDefault();
  
    document.getElementById("confirmationMessage").style.display = "block";
  });
  
  document.getElementById("confirmLogout").addEventListener("click", function () {
    localStorage.clear();
    

    window.location.href = "../../LOGIN/login.html";
  });
  
  document.getElementById("cancelLogout").addEventListener("click", function () {
    document.getElementById("confirmationMessage").style.display = "none";
  });
  