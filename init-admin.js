require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('./config/db');

(async () => {
  try {
    const hash = await bcrypt.hash('admin123', 10);
    await pool.execute(
      `INSERT INTO Utilisateurs, TestTable (Login, MotDePasse, NomComplet, Role) VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE MotDePasse = VALUES(MotDePasse)`,
      ['admin', hash, 'Administrateur', 'Gestionnaire', 'ADMIN', [SUPERVISEUR]]
    );
    console.log('Utilisateur admin créé/mis à jour. Login: admin / Mot de passe: admin123');
    process.exit(0);
  } catch (err) {
    console.error('Erreur:', err.message);
    process.exit(1);
  }
})();
