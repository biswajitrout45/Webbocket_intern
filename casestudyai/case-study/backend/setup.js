import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import pg from 'pg'

const { Pool } = pg
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const readSql = (name) => readFile(new URL(name, import.meta.url), 'utf8')

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required. Copy .env.example to .env and configure PostgreSQL.')
  process.exit(1)
}

try {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query(await readSql('./schema.sql'))
    await client.query(await readSql('./seed.sql'))
    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
  console.log('Database schema is ready and sample data has been seeded.')
} catch (error) {
  console.error('Database setup failed:', error.message)
  process.exitCode = 1
} finally {
  await pool.end()
}
