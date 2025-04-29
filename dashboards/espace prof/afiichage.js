function displayExams() {
    const exams = JSON.parse(localStorage.getItem("exams")) || [];
    const examsContainer = document.getElementById("exams-container");
  
    examsContainer.innerHTML = '';  // Réinitialiser l'affichage
  
    exams.forEach((exam) => {
      const examDiv = document.createElement("div");
      examDiv.classList.add("exam");
  
      examDiv.innerHTML = `
        <h3>${exam.titre}</h3>
        <p><strong>Description :</strong> ${exam.description}</p>
        <p><strong>Public :</strong> ${exam.public}</p>
        <p><strong>Lien :</strong> <a href="${exam.lien}" target="_blank">Accéder à l'examen</a></p>
        <button onclick="takeExam('${exam.lien}')">Passer l'examen</button>
      `;
      
      examsContainer.appendChild(examDiv);
    });
  }
  
  function takeExam(link) {
    // Rediriger vers la page d'examen
    window.location.href = link;
  }

  window.onload = function() {
    displayExams();
  };
  


















  