const typeSelect = document.getElementById("typeQuestion");
const reponseDirecteContainer = document.getElementById("reponseDirecteContainer");
const propositionsContainer = document.getElementById("propositionsContainer");
const addPropositionBtn = document.getElementById("add-proposition");
const propositionsDiv = document.getElementById("propositions");
const form = document.getElementById("examForm");
const linkContainer = document.getElementById("lienExamen");
const generatedLinkInput = document.getElementById("generatedLink");

// Sélection des champs "filière" et "semestre"
const filiereSelect = document.getElementById("filiere");
const semestreSelect = document.getElementById("semestre");

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

  // Récupérer les valeurs de la filière et du semestre
  const filiere = filiereSelect.value;
  const semestre = semestreSelect.value;

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
    filiere, // Ajout de la filière
    semestre, // Ajout du semestre
    lien,
    questions: [question]
  };

  localStorage.setItem("dernierExamenCree", JSON.stringify(examen));
  alert("Examen enregistré avec succès !");
});

document.getElementById('examFile').addEventListener('change', function(e) {
  const file = e.target.files[0];
  const preview = document.getElementById('preview');
  preview.innerHTML = ''; // Vider l'ancien aperçu

  if (!file) return;

  const fileType = file.type;

  if (fileType.startsWith('image/')) {
    // Afficher une image
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.className = 'img-fluid mt-2'; // Bootstrap pour image responsive
    img.style.maxHeight = '300px'; // Limiter hauteur
    preview.appendChild(img);
  } else if (fileType === 'application/pdf') {
    // Afficher un aperçu de PDF
    const iframe = document.createElement('iframe');
    iframe.src = URL.createObjectURL(file);
    iframe.width = '100%';
    iframe.height = '400px';
    iframe.className = 'mt-2';
    preview.appendChild(iframe);
  } else if (fileType.startsWith('video/')) {
    // Afficher une vidéo
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    video.controls = true;
    video.width = 400;
    video.className = 'mt-2';
    preview.appendChild(video);
  } else {
    // Fichiers non reconnus : afficher un lien de téléchargement
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.textContent = 'Voir le fichier sélectionné';
    link.target = '_blank';
    link.className = 'btn btn-info mt-2';
    preview.appendChild(link);
  }
});

const addQuestionBtn = document.getElementById("btn-ajouter-question");
const questionsContainer = document.getElementById("questions-container");

// Ajout d'une question
addQuestionBtn.addEventListener("click", () => {
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");
  // Ajouter un label pour "Type de question"
  const typeLabel = document.createElement("label");
  typeLabel.textContent = "Type de question :";
  questionDiv.appendChild(typeLabel); 

  // Créer un champ pour sélectionner le type de question
  const typeSelect = document.createElement("select");
  const option1 = document.createElement("option");
  option1.textContent = "-- Choisir un type --";
  const option2 = document.createElement("option");
  option2.textContent = "Question directe";
  const option3 = document.createElement("option");
  option3.textContent = "QCM";
  typeSelect.appendChild(option1);
  typeSelect.appendChild(option2);
  typeSelect.appendChild(option3);
  questionDiv.appendChild(typeSelect);

  // Créer un champ pour l'énoncé de la question
  const enonceInput = document.createElement("textarea");
  enonceInput.placeholder = "Énoncé de la question";
  questionDiv.appendChild(enonceInput);

  // Créer des champs pour la durée et les points
  const durationInput = document.createElement("input");
  durationInput.type = "number";
  durationInput.placeholder = "Durée (en minutes)";
  questionDiv.appendChild(durationInput);

  const pointsInput = document.createElement("input");
  pointsInput.type = "number";
  pointsInput.placeholder = "Points";
  questionDiv.appendChild(pointsInput);

  // Créer le conteneur de la réponse directe, caché par défaut
  const reponseDirecteContainer = document.createElement("div");
  reponseDirecteContainer.classList.add("hidden");
  const reponseDirecteInput = document.createElement("input");
  reponseDirecteInput.type = "text";
  reponseDirecteInput.placeholder = "Bonne réponse";
  reponseDirecteContainer.appendChild(reponseDirecteInput);
  questionDiv.appendChild(reponseDirecteContainer);

  // Créer le conteneur de propositions, caché par défaut
  const propositionsContainer = document.createElement("div");
  propositionsContainer.classList.add("hidden");
  const propositionsDiv = document.createElement("div");
  propositionsContainer.appendChild(propositionsDiv);
  const addPropositionBtn = document.createElement("button");
  addPropositionBtn.textContent = "Ajouter une proposition";
  propositionsContainer.appendChild(addPropositionBtn);
  questionDiv.appendChild(propositionsContainer);

  // Créer un champ pour uploader un fichier (image, vidéo, PDF, doc)
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*,video/*,.pdf,.doc,.docx";
  questionDiv.appendChild(fileInput);

  // Lorsque le type de question est changé
  typeSelect.addEventListener("change", () => {
    if (typeSelect.value === "Question directe") {
      reponseDirecteContainer.classList.remove("hidden");
      propositionsContainer.classList.add("hidden");
    } else if (typeSelect.value === "QCM") {
      reponseDirecteContainer.classList.add("hidden");
      propositionsContainer.classList.remove("hidden");
    } else {
      reponseDirecteContainer.classList.add("hidden");
      propositionsContainer.classList.add("hidden");
    }
  });

  // Ajouter la question au conteneur de questions
  questionsContainer.appendChild(questionDiv);
});
