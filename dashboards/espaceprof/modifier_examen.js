document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const examId = urlParams.get("id");

  const exam = JSON.parse(localStorage.getItem(examId));

  if (!exam) {
    alert("Examen introuvable !");
    window.location.href = "exam.html";
    return;
  }

  // Remplir les champs
  document.getElementById("titre").value = exam.titre;
  document.getElementById("description").value = exam.description;
  document.getElementById("filiere").value = exam.filiere;
  document.getElementById("semestre").value = exam.semestre;

  const questionsContainer = document.getElementById("questions-container");

  function createQuestionElement(question, index) {
    const div = document.createElement("div");
    div.className = "question-block";
    div.innerHTML = `
      <h4>Question ${index + 1}</h4>
      <label>Type :</label>
      <select class="type">
        <option value="directe" ${question.type === "directe" ? "selected" : ""}>Directe</option>
        <option value="qcm" ${question.type === "qcm" ? "selected" : ""}>QCM</option>
      </select>

      <label>Énoncé :</label>
      <input type="text" class="texte" value="${question.texte}" required />

      <label>Propositions (séparées par ;) :</label>
      <input type="text" class="propositions" value="${(question.propositions || []).join(';')}" ${question.type === "qcm" ? "" : "disabled"} />

      <label>Bonne réponse :</label>
      <input type="text" class="bonne_reponse" value="${question.bonne_reponse}" required />

      <label>Note :</label>
      <input type="number" class="note" value="${question.note}" min="0" required />

      <label>Tolérance :</label>
      <input type="number" class="tolerance" value="${question.tolerance}" min="0" required />

      <label>Durée (secondes) :</label>
      <input type="number" class="duree" value="${question.duree}" min="10" required />

      <button type="button" class="btn-supprimer">Supprimer</button>
      <hr />
    `;

    // Événement type → activer/désactiver propositions
    div.querySelector(".type").addEventListener("change", (e) => {
      const propInput = div.querySelector(".propositions");
      propInput.disabled = e.target.value !== "qcm";
    });

    // Supprimer question
    div.querySelector(".btn-supprimer").addEventListener("click", () => {
      div.remove();
    });

    questionsContainer.appendChild(div);
  }

  // Charger les questions existantes
  exam.questions.forEach((q, index) => createQuestionElement(q, index));

  // Ajouter une nouvelle question
  document.getElementById("btn-ajouter-question").addEventListener("click", () => {
    createQuestionElement({
      type: "directe",
      texte: "",
      propositions: [],
      bonne_reponse: "",
      note: 1,
      tolerance: 0,
      duree: 60
    }, document.querySelectorAll(".question-block").length);
  });

  // Enregistrer les modifications
  document.getElementById("examForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const questions = [];
    document.querySelectorAll(".question-block").forEach(block => {
      const type = block.querySelector(".type").value;
      const texte = block.querySelector(".texte").value;
      const propositions = block.querySelector(".propositions").value.split(";").map(p => p.trim()).filter(p => p !== "");
      const bonne_reponse = block.querySelector(".bonne_reponse").value;
      const note = parseFloat(block.querySelector(".note").value);
      const tolerance = parseFloat(block.querySelector(".tolerance").value);
      const duree = parseInt(block.querySelector(".duree").value);

      questions.push({ type, texte, propositions: type === "qcm" ? propositions : [], bonne_reponse, note, tolerance, duree });
    });

    const updatedExam = {
      titre: document.getElementById("titre").value,
      description: document.getElementById("description").value,
      filiere: document.getElementById("filiere").value,
      semestre: document.getElementById("semestre").value,
      questions
    };

    localStorage.setItem(examId, JSON.stringify(updatedExam));
    alert("Modifications enregistrées !");
    window.location.href = "affich.html";
  });
});
