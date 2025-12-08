import sqlite3 from 'sqlite3';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Criar conexão com banco de dados
const db = new sqlite3.Database('./fraud_detection.db', (err) => {
  if (err) {
    console.error('Erro ao conectar com banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados SQLite');
  }
});

// Inicializar banco de dados com schema
export function initDatabase() {
  const schema = readFileSync(join(__dirname, 'database.sql'), 'utf8');

  db.exec(schema, (err) => {
    if (err) {
      console.error('Erro ao inicializar banco de dados:', err);
    } else {
      console.log('Banco de dados inicializado com sucesso');
    }
  });
}

// Funções auxiliares para operações no banco
export function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

export function getQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function allQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export default db;
