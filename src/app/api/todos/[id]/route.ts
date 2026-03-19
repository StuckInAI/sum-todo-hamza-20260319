import { NextRequest, NextResponse } from 'next/server'
import { updateTodo, deleteTodo } from '@/lib/todoService'
import { z } from 'zod'

const updateSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  completed: z.boolean().optional(),
}).refine(data => data.title !== undefined || data.completed !== undefined, {
  message: 'At least one field to update is required',
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid todo ID' },
        { status: 400 }
      )
    }
    const body = await request.json()
    const validation = updateSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }
    const todo = await updateTodo(id, validation.data)
    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(todo, { status: 200 })
  } catch (error) {
    console.error('Failed to update todo:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid todo ID' },
        { status: 400 }
      )
    }
    const success = await deleteTodo(id)
    if (!success) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ message: 'Todo deleted' }, { status: 200 })
  } catch (error) {
    console.error('Failed to delete todo:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
