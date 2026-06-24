require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('./config/db');

(async () => {
  try {
    const hash = await bcrypt.hash('admin123', 10);
    await pool.execute(
      `INSERT INTO Utilisateurs (Login, MotDePasse, NomComplet, Role) VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE MotDePasse = VALUES(MotDePasse)`,
      ['admin', hash, 'Administrateur', 'ADMIN']
    );
    console.log('Utilisateur admin créé/mis à jour. Login: admin / Mot de passe: admin123');
    process.exit(0);
  } catch (err) {
    console.error('Erreur:', err.message);
    process.exit(1);
  }
})();
