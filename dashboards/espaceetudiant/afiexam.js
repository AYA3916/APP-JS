let examen = JSON.parse(localStorage.getItem("examen_en_cours")); // récupère l'examen en cours
let currentQuestionIndex = 0;
let score = 0;
let reponsesCorrectes = [];
let reponsesIncorrectes = [];
let timerInterval;

const examContainer = document.querySelector(".exam-container");
const nextBtn = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer");

// Lance le premier affichage
afficherQuestion();

function afficherQuestion() {
  const question = examen.questions[currentQuestionIndex];
  examContainer.classList.remove("fade-in");
  void examContainer.offsetWidth; // Hack pour relancer l'animation
  examContainer.classList.add("fade-in");

  // Affichage de l'énoncé
  examContainer.innerHTML = `
    <h2>Question ${currentQuestionIndex + 1} : ${question.enonce}</h2>
    <div id="timer"></div>
  `;

  // Réponse QCM
  if (question.type === "qcm") {
    question.propositions.forEach((prop, index) => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="radio" name="reponse" value="${prop}" />
        ${prop}
      `;
      examContainer.appendChild(label);
    });
  } 
  // Réponse directe
  else {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "reponseInput";
    input.placeholder = "Votre réponse ici...";
    examContainer.appendChild(input);
  }

  // Bouton suivant
  examContainer.appendChild(nextBtn);
  nextBtn.disabled = false;

  // Lancer le timer
  lancerTimer(question.duree);
}

function lancerTimer(duree) {
  clearInterval(timerInterval);
  let tempsRestant = duree;
  timerDisplay.textContent = `Temps restant : ${tempsRestant} sec`;
  timerInterval = setInterval(() => {
    tempsRestant--;
    timerDisplay.textContent = `Temps restant : ${tempsRestant} sec`;
    if (tempsRestant <= 0) {
      clearInterval(timerInterval);
      validerReponse();
    }
  }, 1000);
}

nextBtn.addEventListener("click", () => {
  validerReponse();
});

function validerReponse() {
  nextBtn.disabled = true;
  clearInterval(timerInterval);

  const question = examen.questions[currentQuestionIndex];
  let reponseDonnee;

  if (question.type === "qcm") {
    const selected = document.querySelector("input[name='reponse']:checked");
    reponseDonnee = selected ? selected.value : "";
  } else {
    reponseDonnee = document.getElementById("reponseInput").value.trim();
  }

  const estCorrecte =
    reponseDonnee.toLowerCase() === question.bonneReponse.toLowerCase();

  if (estCorrecte) {
    score += question.note;
    reponsesCorrectes.push({
      enonce: question.enonce,
      bonneReponse: question.bonneReponse,
    });
  } else {
    reponsesIncorrectes.push({
      enonce: question.enonce,
      bonneReponse: question.bonneReponse,
      reponseDonnee: reponseDonnee,
    });
  }

  currentQuestionIndex++;


};
const sidebarContainer = document.querySelector(".sidebar-container");
const detailsBtn = document.querySelector(".sidebar-container .details-btn");

detailsBtn.addEventListener("click", () => {
  sidebarContainer.classList.toggle("active");
});
