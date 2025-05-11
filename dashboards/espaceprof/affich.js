// Gérer l'ouverture/fermeture de la sidebar
const sidebarContainer = document.querySelector(".sidebar-container");
const detailsBtn = document.querySelector(".sidebar-container .details-btn");

detailsBtn.addEventListener("click", () => {
  sidebarContainer.classList.toggle("active");
});

// Charger et afficher les examens
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("examens-container");
  let examsFound = false;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("examen_")) {
      const examen = JSON.parse(localStorage.getItem(key));
      examsFound = true;

      const card = document.createElement("div");
      card.className = "examen-card";

      const lienAcces = `${window.location.origin}/exam_etudiant.html?id=${key}`;

      // Contenu HTML de la carte
      card.innerHTML = `
        <h2>${examen.titre}</h2>
        <p><strong>Description :</strong> ${examen.description}</p>
        <p><strong>Filière :</strong> ${examen.filiere}</p>
        <p><strong>Semestre :</strong> ${examen.semestre}</p>
        <p><strong>Questions :</strong> ${examen.questions.length}</p>
        <p><strong>Lien d’accès :</strong> 
          <a href="${lienAcces}" target="_blank">${lienAcces}</a>
          <button class="copy-btn" style="margin-left: 10px;">📋 Copier le lien</button>
        </p>
      `;

      // 👉 Gérer le clic sur le bouton "Copier"
      const copyBtn = card.querySelector(".copy-btn");
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(lienAcces).then(() => {
          copyBtn.textContent = "✅ Copié !";
          setTimeout(() => {
            copyBtn.textContent = "📋 Copier";
          }, 2000);
        }).catch(() => {
          alert("Erreur lors de la copie du lien");
        });
      });

      // 👉 Boutons Modifier / Supprimer
      const buttonsDiv = document.createElement("div");
      buttonsDiv.className = "exam-buttons";

      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️ Modifier";
      editBtn.className = "edit-btn";
      editBtn.addEventListener("click", () => {
        window.location.href = `modifier_examen.html?id=${key}`;
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️ Supprimer";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => {
        if (confirm("Voulez-vous vraiment supprimer cet examen ?")) {
          localStorage.removeItem(key);
          card.remove();
          if (container.children.length === 0) {
            container.innerHTML = `<p style="text-align:center; font-size:1.1rem;">Aucun examen trouvé.</p>`;
          }
        }
      });

      buttonsDiv.appendChild(editBtn);
      buttonsDiv.appendChild(deleteBtn);
      card.appendChild(buttonsDiv);

      container.appendChild(card);
    }
  }

  if (!examsFound) {
    container.innerHTML = `<p style="text-align:center; font-size:1.1rem;">Aucun examen trouvé.</p>`;
  }
});
