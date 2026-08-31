import { prisma } from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const {title, description, date, completed, important} = await request.json();
    if (!title || !date || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if(title.length < 3) {
      return NextResponse.json({ error: 'Title must be at least 3 characters long' }, { status: 400 });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId
      }
    });
    return NextResponse.json(task);

  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const tasks = await prisma.task.findMany({ 
      where: { userId },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error getting task:', error);
    return NextResponse.json({ error: 'Failed to get task' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const { id, title, description, date, isCompleted, isImportant } = await request.json();
      if (!id || typeof id !== 'string') {
        return NextResponse.json({ error: 'Task id is required' }, { status: 400 });
      }

      const isFullUpdate = title !== undefined || description !== undefined || date !== undefined;
      if (isFullUpdate) {
        if (typeof title !== 'string' || title.trim().length < 3 || typeof description !== 'string' || !description.trim() || typeof date !== 'string' || !date) {
          return NextResponse.json({ error: 'Title, description, and date are required' }, { status: 400 });
        }
      }

      if (isCompleted !== undefined && typeof isCompleted !== 'boolean') {
        return NextResponse.json({ error: 'isCompleted must be a boolean' }, { status: 400 });
      }

      if (isImportant !== undefined && typeof isImportant !== 'boolean') {
        return NextResponse.json({ error: 'isImportant must be a boolean' }, { status: 400 });
      }

      const existingTask = await prisma.task.findFirst({ where: { id, userId } });
      if (!existingTask) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
      }

      const data: {
        title?: string;
        description?: string;
        date?: string;
        isCompleted?: boolean;
        isImportant?: boolean;
      } = {};

      if (title !== undefined) data.title = title.trim();
      if (description !== undefined) data.description = description.trim();
      if (date !== undefined) data.date = date;
      if (isCompleted !== undefined) data.isCompleted = isCompleted;
      if (isImportant !== undefined) data.isImportant = isImportant;

      const task = await prisma.task.update({
        where: { id },
        data,
      });
      return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}
