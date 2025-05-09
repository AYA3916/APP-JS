const sidebarContainer = document.querySelector(".sidebar-container");
const detailsBtn = document.querySelector(".sidebar-container .details-btn");

detailsBtn.addEventListener("click", () => {
  sidebarContainer.classList.toggle("active");
});
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("examForm");
  const addQuestionBtn = document.getElementById("btn-ajouter-question");
  const questionsContainer = document.getElementById("questions-container");
  const lienExamenDiv = document.getElementById("lienExamen");
  const generatedLinkInput = document.getElementById("generatedLink");

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
      propDiv.classList.add("proposition");
      propDiv.innerHTML = `
        <input type="text" class="prop-text" placeholder="Proposition" />
        <label><input type="checkbox" class="prop-correct" /> Correcte</label>
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

    // ✅ Vérifier qu’au moins une question a été ajoutée
    const questionElements = document.querySelectorAll(".question");
    if (questionElements.length === 0) {
      alert("Veuillez ajouter au moins une question avant de créer l'examen.");
      return;
    }

    const examen = {
      titre: document.getElementById("titre").value,
      description: document.getElementById("description").value,
      filiere: document.getElementById("filiere").value,
      semestre: document.getElementById("semestre").value,
      questions: [],
    };

    questionElements.forEach((questionDiv) => {
      const type = questionDiv.querySelector("select").value;
      const enonce = questionDiv.querySelector("textarea").value;
      const inputs = questionDiv.querySelectorAll("input[type='number']");
      const duration = inputs[0]?.value || 0;
      const points = inputs[1]?.value || 0;

      let question = { type, enonce, duration, points };

      if (type === "directe") {
        const reponse = questionDiv.querySelector("input[type='text']").value;
        question.reponse = reponse;
      } else if (type === "qcm") {
        const propositions = [];
        questionDiv.querySelectorAll(".proposition").forEach((propDiv) => {
          const text = propDiv.querySelector(".prop-text").value;
          const correct = propDiv.querySelector(".prop-correct").checked;
          propositions.push({
            proposition: text,
            correcte: correct,
          });
        });
        question.propositions = propositions;
      }

      examen.questions.push(question);
    });

    // ✅ Enregistrement de l'examen
    const idUnique = "examen_" + Date.now(); // Créer un ID unique
    localStorage.setItem(idUnique, JSON.stringify(examen));

    // ✅ Générer un lien d'accès unique
    const examenLink = `${window.location.origin}../dashboards/espaceetudiant/afiexam.html?id=${idUnique}`;
    generatedLinkInput.value = examenLink;  // Afficher le lien généré

    // ✅ Afficher le lien et le rendre visible
    lienExamenDiv.classList.remove("hidden");

    // ✅ Afficher un message de confirmation
    alert("Examen créé avec succès !");

    // ✅ Rediriger vers la page des examens créés après un délai
    setTimeout(() => {
      window.location.href = "affich.html"; // Remplace par le chemin de la page qui affiche les examens créés
    }, 10000);  // Attendre 2 secondes avant la redirection
  });
});
