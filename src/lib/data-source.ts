import { DataSource } from 'typeorm'
import { Todo } from '@/entities/Todo'
import path from 'path'

const databasePath = process.env.DATABASE_PATH || './data/todos.db'

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: databasePath,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: [Todo],
  migrations: [path.join(__dirname, '../migrations/*.ts')],
  subscribers: [],
})

let initialized = false

export async function initializeDatabase() {
  if (initialized) {
    return AppDataSource
  }
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
    await AppDataSource.runMigrations()
  }
  initialized = true
  return AppDataSource
}

export default AppDataSource
