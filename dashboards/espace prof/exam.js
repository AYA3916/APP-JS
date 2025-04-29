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
  
        card.innerHTML = `
          <h2>${examen.titre}</h2>
          <p><strong>Description :</strong> ${examen.description}</p>
          <p><strong>Filière :</strong> ${examen.filiere}</p>
          <p><strong>Semestre :</strong> ${examen.semestre}</p>
          <p><strong>Questions :</strong> ${examen.questions.length}</p>
          <a href="exam_etudiant.html?id=${key}">Lien d’accès</a>
        `;
  
        container.appendChild(card);
      }
    }
  
    if (!examsFound) {
      container.innerHTML = `<p style="text-align:center; font-size:1.1rem;">Aucun examen trouvé.</p>`;
    }
  });
  