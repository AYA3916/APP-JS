// Récupérer les examens depuis localStorage, ou utiliser un tableau par défaut si aucune donnée n'est présente
let exams = JSON.parse(localStorage.getItem('exams')) || [
    { id: 1, titre: "Examen Informatique 1", filiere: "informatique", semestre: "semestre1" },
    { id: 2, titre: "Examen Mathématiques 1", filiere: "maths", semestre: "semestre1" },
    { id: 3, titre: "Examen Informatique 2", filiere: "informatique", semestre: "semestre2" },
  ];
  
  // Fonction pour sauvegarder les examens dans localStorage
  function saveExams() {
    localStorage.setItem('exams', JSON.stringify(exams));
  }
  
  // Fonction pour afficher les examens
  function displayExams(examsToDisplay) {
    const examsContainer = document.getElementById('exams-container');
    examsContainer.innerHTML = ''; // Vide le conteneur avant de réafficher
  
    if (examsToDisplay.length === 0) {
      examsContainer.innerHTML = "<p>Aucun examen trouvé pour ces filtres.</p>";
    } else {
      examsToDisplay.forEach(exam => {
        const examCard = document.createElement('div');
        examCard.classList.add('exam-card');
        examCard.innerHTML = `
          <h3>${exam.titre}</h3>
          <p>Filière: ${exam.filiere}</p>
          <p>Semestre: ${exam.semestre}</p>
          <button class="edit-btn" onclick="editExam(${exam.id})">
            <i class="fas fa-edit"></i> Modifier
          </button>
          <button class="delete-btn" onclick="deleteExam(${exam.id})">
            <i class="fas fa-trash"></i> Supprimer
          </button>
        `;
        examsContainer.appendChild(examCard);
      });
    }
  }
  
  // Afficher tous les examens au départ
  displayExams(exams);
  
  // Fonction pour filtrer les examens en fonction des filtres choisis
  function filterExams() {
    const filiere = document.getElementById('filiere').value;
    const semestre = document.getElementById('semestre').value;
  
    const filteredExams = exams.filter(exam => {
      return (
        (filiere ? exam.filiere === filiere : true) &&
        (semestre ? exam.semestre === semestre : true)
      );
    });
  
    displayExams(filteredExams); // Afficher les examens filtrés
  }
  
  // Fonction pour modifier un examen
  function editExam(examId) {
    const examToEdit = exams.find(exam => exam.id === examId);
    if (examToEdit) {
      const newTitre = prompt("Modifier le titre de l'examen:", examToEdit.titre);
      const newFiliere = prompt("Modifier la filière:", examToEdit.filiere);
      const newSemestre = prompt("Modifier le semestre:", examToEdit.semestre);
  
      if (newTitre && newFiliere && newSemestre) {
        examToEdit.titre = newTitre;
        examToEdit.filiere = newFiliere;
        examToEdit.semestre = newSemestre;
  
        saveExams(); // Sauvegarder les examens modifiés
        displayExams(exams); // Réafficher les examens après modification
      }
    }
  }
  
  // Fonction pour supprimer un examen
  function deleteExam(examId) {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cet examen ?");
    if (confirmDelete) {
      // Supprimer l'examen du tableau
      const index = exams.findIndex(exam => exam.id === examId);
      if (index !== -1) {
        exams.splice(index, 1); // Supprimer l'examen du tableau
        saveExams(); // Sauvegarder les examens après suppression
        displayExams(exams); // Réafficher les examens après suppression
      }
    }
  }
  