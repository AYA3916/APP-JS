const params = new URLSearchParams(window.location.search);
const examId = params.get("id");
const examen = JSON.parse(localStorage.getItem(examId));

document.getElementById("titre").value = examen.titre;
document.getElementById("description").value = examen.description;
document.getElementById("filiere").value = examen.filiere;
document.getElementById("semestre").value = examen.semestre;

const questionsContainer = document.getElementById("questions-container");

function createQuestionElement(question) {
  const div = document.createElement("div");
  div.className = "question-block";

  div.innerHTML = `
    <label>Type :</label>
    <select class="type">
      <option value="directe" ${question.type === "directe" ? "selected" : ""}>Directe</option>
      <option value="qcm" ${question.type === "qcm" ? "selected" : ""}>QCM</option>
    </select>

    <label>Énoncé :</label>
    <textarea class="enonce" required>${question.enonce}</textarea>

    <div class="propositions-section" style="display: ${question.type === "qcm" ? "block" : "none"};">
      <label>Propositions :</label>
      <div class="propositions-list"></div>
      <button type="button" class="btn-ajouter-proposition">+ Ajouter une proposition</button>
    </div>

    <label>Note :</label>
    <input type="number" class="note" value="${question.note}" required>

    <label>Tolérance :</label>
    <input type="number" class="tolerance" value="${question.tolerance}" required>

    <label>Durée (secondes) :</label>
    <input type="number" class="duree" value="${question.duree}" required>

    <button type="button" class="supprimer-question">Supprimer</button>
    <hr />
  `;

  const propositionsSection = div.querySelector(".propositions-section");
  const propositionsList = div.querySelector(".propositions-list");
  const btnAjouterProp = div.querySelector(".btn-ajouter-proposition");

  // Fonction d'ajout de proposition (QCM)
  function ajouterProposition(val = "", estBonne = false) {
    const propDiv = document.createElement("div");
    propDiv.className = "proposition-item";
    propDiv.innerHTML = `
      <input type="checkbox" class="case-bonne" ${estBonne ? "checked" : ""} />
      <input type="text" class="proposition" value="${val}" required />
      <button type="button" class="btn-supprimer-prop">Supprimer</button>
    `;
    propDiv.querySelector(".btn-supprimer-prop").addEventListener("click", () => {
      propDiv.remove();
    });
    propositionsList.appendChild(propDiv);
  }

  // Chargement des propositions existantes (QCM)
  if (question.type === "qcm") {
    (question.propositions || []).forEach(p => {
      ajouterProposition(p, p === question.bonneReponse);
    });
  }

  btnAjouterProp.addEventListener("click", () => ajouterProposition());

  const selectType = div.querySelector(".type");
  selectType.addEventListener("change", () => {
    const isQCM = selectType.value === "qcm";
    propositionsSection.style.display = isQCM ? "block" : "none";
  });

  div.querySelector(".supprimer-question").addEventListener("click", () => {
    div.remove();
  });

  questionsContainer.appendChild(div);
}

examen.questions.forEach(q => createQuestionElement(q));

document.getElementById("ajouter-question").addEventListener("click", () => {
  createQuestionElement({
    type: "directe",
    enonce: "",
    propositions: [],
    bonneReponse: "",
    note: 0,
    tolerance: 0,
    duree: 30,
  });
});

document.getElementById("form-modifier").addEventListener("submit", function (e) {
  e.preventDefault();

  const updatedExam = {
    id: examId,
    titre: document.getElementById("titre").value,
    description: document.getElementById("description").value,
    filiere: document.getElementById("filiere").value,
    semestre: document.getElementById("semestre").value,
    questions: [],
  };

  document.querySelectorAll(".question-block").forEach(block => {
    const type = block.querySelector(".type").value;
    const enonce = block.querySelector(".enonce").value;
    const note = parseFloat(block.querySelector(".note").value);
    const tolerance = parseFloat(block.querySelector(".tolerance").value);
    const duree = parseInt(block.querySelector(".duree").value);

    let propositions = [];
    let bonneReponse = "";

    if (type === "qcm") {
      const inputs = block.querySelectorAll(".proposition-item");
      inputs.forEach(item => {
        const text = item.querySelector(".proposition").value.trim();
        const estBonne = item.querySelector(".case-bonne").checked;
        if (text !== "") {
          propositions.push(text);
          if (estBonne) bonneReponse = text;
        }
      });
    } else {
      bonneReponse = block.querySelector(".bonne-reponse")?.value?.trim() || "";
    }

    updatedExam.questions.push({
      type,
      enonce,
      propositions,
      bonneReponse,
      note,
      tolerance,
      duree,
    });
  });

  localStorage.setItem(examId, JSON.stringify(updatedExam));
  alert("Examen mis à jour !");
  window.location.href = "examens_prof.html";
});
