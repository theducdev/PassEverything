import fs from 'fs';
import path from 'path';
import url from 'url';
import pool from '../src/config/database.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

async function runMigrations() {
  const migrationsDir = path.resolve(__dirname, '..', 'migrations');
  const files = fs.readdirSync(migrationsDir).filter((file) => file.endsWith('.sql')).sort();

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, 'utf-8');
    console.log(`Running migration: ${file}`);
    await pool.query(sql);
  }
}

runMigrations()
  .then(() => {
    console.log('Migrations completed successfully.');
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  })
  .finally(() => pool.end());
