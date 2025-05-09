const express = require("express");
const cors = require("cors");
const app = express();

const etudiantRoutes = require("./routes/etudiantRoutes");
const profRoutes = require("./routes/profRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/etudiant", etudiantRoutes);
app.use("/api/prof", profRoutes);

app.listen(3000, () => {
  console.log("Serveur en écoute sur le port 3000");
});
