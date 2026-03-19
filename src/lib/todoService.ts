import { initializeDatabase } from './data-source'
import { Todo } from '@/entities/Todo'

export async function getTodos(): Promise<Todo[]> {
  const dataSource = await initializeDatabase()
  const todoRepository = dataSource.getRepository(Todo)
  return todoRepository.find({ order: { createdAt: 'DESC' } })
}

export async function createTodo(title: string): Promise<Todo> {
  const dataSource = await initializeDatabase()
  const todoRepository = dataSource.getRepository(Todo)
  const todo = todoRepository.create({ title })
  return todoRepository.save(todo)
}

export async function updateTodo(id: number, updates: Partial<Todo>): Promise<Todo | null> {
  const dataSource = await initializeDatabase()
  const todoRepository = dataSource.getRepository(Todo)
  await todoRepository.update(id, updates)
  return todoRepository.findOne({ where: { id } })
}

export async function deleteTodo(id: number): Promise<boolean> {
  const dataSource = await initializeDatabase()
  const todoRepository = dataSource.getRepository(Todo)
  const result = await todoRepository.delete(id)
  return result.affected !== null && result.affected > 0
}
