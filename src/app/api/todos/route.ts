import { NextRequest, NextResponse } from 'next/server'
import { createTodo, getTodos } from '@/lib/todoService'
import { z } from 'zod'

const todoSchema = z.object({
  title: z.string().min(1).max(255),
})

export async function GET() {
  try {
    const todos = await getTodos()
    return NextResponse.json(todos, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch todos:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = todoSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }
    const todo = await createTodo(validation.data.title)
    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    console.error('Failed to create todo:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
