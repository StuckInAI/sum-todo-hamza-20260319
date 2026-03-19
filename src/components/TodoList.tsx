'use client'

import { useState, useEffect } from 'react'
import TodoItem from './TodoItem'
import { Todo } from '@/types'

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos')
      if (response.ok) {
        const data = await response.json()
        setTodos(data)
      }
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  const handleToggle = async (id: number, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      })
      if (response.ok) {
        setTodos(todos.map(todo => 
          todo.id === id ? { ...todo, completed } : todo
        ))
      }
    } catch (error) {
      console.error('Failed to toggle todo:', error)
    }
  }

  const handleUpdate = async (id: number, title: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
      if (response.ok) {
        setTodos(todos.map(todo => 
          todo.id === id ? { ...todo, title } : todo
        ))
      }
    } catch (error) {
      console.error('Failed to update todo:', error)
    }
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No todos yet. Add your first task above!
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
        />
      ))}
    </ul>
  )
}
