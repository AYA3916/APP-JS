// Importation des dépendances nécessaires
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Charge les variables d'environnement depuis le fichier .env

const app = express();
const port = process.env.PORT || 5000; // Port par défaut ou celui défini dans .env

// Middleware pour parser les corps de requêtes JSON
app.use(express.json());

// Connexion à la base de données MongoDB avec Mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion réussie à MongoDB');
  })
  .catch(err => {
    console.log('Erreur de connexion à MongoDB: ', err);
  });

// Définition de routes (exemple)
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de TesTopia');
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
