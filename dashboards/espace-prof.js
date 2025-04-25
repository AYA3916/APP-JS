const form = document.getElementById("examForm");
const linkContainer = document.getElementById("lienExamen");
const generatedLinkInput = document.getElementById("generatedLink");

const typeSelect = document.getElementById("typeQuestion");
const reponseDirecteContainer = document.getElementById("reponseDirecteContainer");
const propositionsContainer = document.getElementById("propositionsContainer");

typeSelect.addEventListener("change", () => {
  if (typeSelect.value === "directe") {
    reponseDirecteContainer.classList.remove("hidden");
    propositionsContainer.classList.add("hidden");
  } else if (typeSelect.value === "qcm") {
    propositionsContainer.classList.remove("hidden");
    reponseDirecteContainer.classList.add("hidden");
  } else {
    propositionsContainer.classList.add("hidden");
    reponseDirecteContainer.classList.add("hidden");
  }
});

document.getElementById("add-proposition").addEventListener("click", () => {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Proposition" />
    <label><input type="checkbox" /> Correcte</label>
  `;
  document.getElementById("propositions").appendChild(div);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const titre = document.getElementById("titre").value.trim();
  const description = document.getElementById("description").value.trim();
  const publicCible = document.getElementById("public").value.trim();

const uniqueId = Math.random().toString(36).substr(2, 8);
const lien = `https://testopia.exams/${uniqueId}`;

generatedLinkInput.value = lien;
linkContainer.classList.remove("hidden");
});