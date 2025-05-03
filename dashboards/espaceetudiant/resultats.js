document.addEventListener("DOMContentLoaded", () => {
    const scoreEl = document.getElementById("score");
    const bonnesListe = document.querySelector("#bonnes-reponses .liste");
    const mauvaisesListe = document.querySelector("#mauvaises-reponses .liste");
  
    // Récupérer les résultats depuis le localStorage
    const resultats = JSON.parse(localStorage.getItem("resultat_examen"));
  
    if (!resultats || !Array.isArray(resultats.reponses)) {
      scoreEl.textContent = "Aucun résultat disponible.";
      return;
    }
  
    let totalPoints = 0;
    let scoreObtenu = 0;
  
    resultats.reponses.forEach((rep, index) => {
      totalPoints += rep.note;
  
      const div = document.createElement("div");
      div.classList.add("result-item");
  
      const question = document.createElement("p");
      question.textContent = `Q${index + 1} : ${rep.question}`;
  
      const reponse = document.createElement("span");
      reponse.textContent = `Votre réponse : ${rep.reponse}`;
  
      const bonne = document.createElement("span");
      bonne.textContent = `Bonne réponse : ${rep.bonne}`;
  
      div.appendChild(question);
      div.appendChild(reponse);
      div.appendChild(bonne);
  
      if (rep.reponse === rep.bonne) {
        div.classList.add("correct");
        bonnesListe.appendChild(div);
        scoreObtenu += rep.note;
      } else {
        div.classList.add("incorrect");
        mauvaisesListe.appendChild(div);
      }
    });
  
    const scoreSur100 = ((scoreObtenu / totalPoints) * 100).toFixed(2);
    scoreEl.textContent = `Score : ${scoreSur100} / 100`;
  });

  if (scoreSur100 >= 50) {
    document.getElementById("badge-reussite").classList.remove("hidden");
  }
  if (scoreSur100 >= 50) {
    document.getElementById("badge-reussite").classList.remove("hidden");
  } else {
    document.getElementById("badge-echec").classList.remove("hidden");
  }
    