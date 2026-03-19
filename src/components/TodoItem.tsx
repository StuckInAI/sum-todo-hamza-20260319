'use client'

import { useState } from 'react'
import { Todo } from '@/types'
import { clsx } from 'clsx'

export default function TodoItem({
  todo,
  onDelete,
  onToggle,
  onUpdate,
}: {
  todo: Todo
  onDelete: (id: number) => void
  onToggle: (id: number, completed: boolean) => void
  onUpdate: (id: number, title: string) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)

  const handleEdit = () => {
    if (isEditing && editTitle.trim() && editTitle !== todo.title) {
      onUpdate(todo.id, editTitle.trim())
    }
    setIsEditing(!isEditing)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      setEditTitle(todo.title)
      setIsEditing(false)
    }
  }

  return (
    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onToggle(todo.id, e.target.checked)}
          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
        />
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleEdit}
            className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span
            className={clsx(
              'flex-1 text-lg',
              todo.completed && 'line-through text-gray-500'
            )}
          >
            {todo.title}
          </span>
        )}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleEdit}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
      </div>
    </li>
  )
}
