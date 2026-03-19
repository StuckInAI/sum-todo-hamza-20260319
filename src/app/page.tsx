import TodoList from '@/components/TodoList'
import AddTodo from '@/components/AddTodo'
import { getTodos } from '@/lib/todoService'

export default async function Home() {
  const todos = await getTodos()

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Todo</h2>
        <AddTodo />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Todos</h2>
        <TodoList initialTodos={todos} />
      </div>
    </div>
  )
}
