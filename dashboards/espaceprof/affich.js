const sidebarContainer = document.querySelector(".sidebar-container");
const detailsBtn = document.querySelector(".sidebar-container .details-btn");

detailsBtn.addEventListener("click", () => {
  sidebarContainer.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("examens-container");

  try {
    const token = localStorage.getItem("token");

    const response = await fetch('http://localhost:5000/api/exams', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (!response.ok) throw new Error('Erreur lors du chargement des examens.');

    const examens = await response.json();

    if (examens.length === 0) {
      container.innerHTML = "<p>Aucun examen trouvé.</p>";
      return;
    }

    examens.forEach(examen => {
      const card = document.createElement("div");
      card.className = "examen-card";

      const lien = `${window.location.origin}/exam_etudiant.html?id=${examen._id}`;

      card.innerHTML = `
        <h3>${examen.titre}</h3>
        <p><strong>Description:</strong> ${examen.description}</p>
        <p><strong>Filière:</strong> ${examen.filiere}</p>
        <p><strong>Semestre:</strong> ${examen.semestre}</p>
        <a href="${lien}" target="_blank">Lien étudiant</a>
        <br />
        <button onclick="modifierExamen('${examen._id}')">Modifier</button>
        <button onclick="supprimerExamen('${examen._id}')">Supprimer</button>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Erreur lors du chargement des examens.</p>";
  }
});

function modifierExamen(id) {
  window.location.href = `modifier_examen.html?id=${id}`;
}

function supprimerExamen(id) {
  if (confirm("Confirmer la suppression de cet examen ?")) {
    fetch(`http://localhost:5000/api/exams/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors de la suppression.");
        location.reload();
      })
      .catch(err => alert(err.message));
  }
}
