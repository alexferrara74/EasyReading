// models/User.js

const mongoose = require('mongoose');

// Definizione dello schema dell'utente
const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  riassunto: { type: String, required: true, unique: true },
  file: { type: String, required: true }
}, {
  timestamps: true  // Aggiunge i campi createdAt e updatedAt automaticamente
});

// Creazione del modello User basato sullo schema
const User = mongoose.model('File', fileSchema);

module.exports = File;
