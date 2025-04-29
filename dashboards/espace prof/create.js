document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("examForm");
  const addQuestionBtn = document.getElementById("btn-ajouter-question");
  const questionsContainer = document.getElementById("questions-container");

  addQuestionBtn.addEventListener("click", () => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const typeSelect = document.createElement("select");
    typeSelect.innerHTML = `
      <option value="">-- Choisir un type --</option>
      <option value="directe">Question directe</option>
      <option value="qcm">QCM</option>
    `;
    questionDiv.appendChild(typeSelect);

    const enonceInput = document.createElement("textarea");
    enonceInput.placeholder = "Énoncé de la question";
    questionDiv.appendChild(enonceInput);

    const durationInput = document.createElement("input");
    durationInput.type = "number";
    durationInput.placeholder = "Durée (en secondes)";
    questionDiv.appendChild(durationInput);

    const pointsInput = document.createElement("input");
    pointsInput.type = "number";
    pointsInput.placeholder = "Points";
    questionDiv.appendChild(pointsInput);

    const reponseDirecteContainer = document.createElement("div");
    reponseDirecteContainer.classList.add("hidden");
    const reponseDirecteInput = document.createElement("input");
    reponseDirecteInput.type = "text";
    reponseDirecteInput.placeholder = "Bonne réponse";
    reponseDirecteContainer.appendChild(reponseDirecteInput);
    questionDiv.appendChild(reponseDirecteContainer);

    const propositionsContainer = document.createElement("div");
    propositionsContainer.classList.add("hidden");
    const propositionsDiv = document.createElement("div");
    const addPropBtn = document.createElement("button");
    addPropBtn.type = "button";
    addPropBtn.textContent = "Ajouter une proposition";

    addPropBtn.addEventListener("click", () => {
      const propDiv = document.createElement("div");
      propDiv.innerHTML = `
        <input type="text" placeholder="Proposition" />
        <label><input type="checkbox" /> Correcte</label>
      `;
      propositionsDiv.appendChild(propDiv);
    });

    propositionsContainer.appendChild(propositionsDiv);
    propositionsContainer.appendChild(addPropBtn);
    questionDiv.appendChild(propositionsContainer);

    typeSelect.addEventListener("change", () => {
      if (typeSelect.value === "directe") {
        reponseDirecteContainer.classList.remove("hidden");
        propositionsContainer.classList.add("hidden");
      } else if (typeSelect.value === "qcm") {
        reponseDirecteContainer.classList.add("hidden");
        propositionsContainer.classList.remove("hidden");
      } else {
        reponseDirecteContainer.classList.add("hidden");
        propositionsContainer.classList.add("hidden");
      }
    });

    questionsContainer.appendChild(questionDiv);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const examen = {
      titre: document.getElementById("titre").value,
      description: document.getElementById("description").value,
      filiere: document.getElementById("filiere").value,
      semestre: document.getElementById("semestre").value,
      questions: [],
    };
  
    document.querySelectorAll(".question").forEach((questionDiv) => {
      const type = questionDiv.querySelector("select").value;
      const enonce = questionDiv.querySelector("textarea").value;
      const inputs = questionDiv.querySelectorAll("input[type='number']");
      const duration = inputs[0].value;
      const points = inputs[1].value;
  
      let question = { type, enonce, duration, points };
  
      if (type === "directe") {
        question.reponse = questionDiv.querySelector("input[type='text']").value;
      } else if (type === "qcm") {
        const propositions = [];
        questionDiv.querySelectorAll("div > div input[type='text']").forEach((input, index) => {
          const checkbox = input.parentElement.querySelector("input[type='checkbox']");
          propositions.push({
            proposition: input.value,
            correcte: checkbox.checked,
          });
        });
        question.propositions = propositions;
      }
  
      examen.questions.push(question);
    });
  
    // Enregistrement
    const idUnique = "examen_" + Date.now();
    localStorage.setItem(idUnique, JSON.stringify(examen));
  
    // Générer le lien d'accès fictif
    const lien = `${window.location.origin}/exam_etudiant.html?id=${idUnique}`;
    const lienInput = document.getElementById("generatedLink");
    lienInput.value = lien;
  
    // Afficher le lien
    document.getElementById("lienExamen").classList.remove("hidden");
  
    alert("Examen enregistré avec succès !");
  });
  
});
