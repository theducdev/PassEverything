import fs from 'fs';
import path from 'path';
import url from 'url';
import pool from '../src/config/database.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

async function runSeed() {
  const seedFile = path.resolve(__dirname, '..', 'seeds', 'posts_seed.sql');
  const sql = fs.readFileSync(seedFile, 'utf-8');
  await pool.query(sql);
}

runSeed()
  .then(() => {
    console.log('Seed data inserted successfully.');
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(() => pool.end());
