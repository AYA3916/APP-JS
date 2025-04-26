const typeSelect = document.getElementById("typeQuestion");
const reponseDirecteContainer = document.getElementById("reponseDirecteContainer");
const propositionsContainer = document.getElementById("propositionsContainer");
const addPropositionBtn = document.getElementById("add-proposition");
const propositionsDiv = document.getElementById("propositions");
const form = document.getElementById("examForm");
const linkContainer = document.getElementById("lienExamen");
const generatedLinkInput = document.getElementById("generatedLink");


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


addPropositionBtn.addEventListener("click", () => {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Proposition" />
    <label><input type="checkbox" /> Correcte</label>
  `;
  propositionsDiv.appendChild(div);
});


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const titre = document.getElementById("titre").value.trim();
  const description = document.getElementById("description").value.trim();
  const publicCible = document.getElementById("public").value.trim();
  const typeQuestion = typeSelect.value;
  const enonce = document.getElementById("enonce").value.trim();
  const duree = parseInt(document.getElementById("duree").value);
  const points = parseInt(document.getElementById("points").value);

  let question;

  if (typeQuestion === "directe") {
    const reponse = document.getElementById("reponseDirecte").value.trim();
    if (!reponse) {
      alert("Veuillez saisir la bonne réponse.");
      return;
    }
    question = { type: "directe", enonce, duree, points, reponse };
  } else if (typeQuestion === "qcm") {
    const propositions = [];
    let auMoinsUneCorrecte = false;

    document.querySelectorAll('#propositions div').forEach(div => {
      const texte = div.querySelector('input[type="text"]').value.trim();
      const correcte = div.querySelector('input[type="checkbox"]').checked;
      if (texte !== '') {
        propositions.push({ texte, correcte });
        if (correcte) auMoinsUneCorrecte = true;
      }
    });

    if (propositions.length === 0) {
      alert("Ajoutez au moins une proposition.");
      return;
    }

    if (!auMoinsUneCorrecte) {
      alert("Une proposition correcte est requise.");
      return;
    }

    question = { type: "qcm", enonce, duree, points, propositions };
  } else {
    alert("Veuillez choisir un type de question.");
    return;
  }

  const uniqueId = Math.random().toString(36).substr(2, 8);
  const lien = `https://testopia.exams/${uniqueId}`;

  generatedLinkInput.value = lien;
  linkContainer.classList.remove("hidden");

  const examen = {
    titre,
    description,
    public: publicCible,
    lien,
    questions: [question]
  };

  localStorage.setItem("dernierExamenCree", JSON.stringify(examen));
  alert("Examen enregistré avec succès !");
});
