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
      const {userId} = await auth();
      const {isCompleted, id} = await request.json();
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }    
      const task = await prisma.task.update({
        where: { id },
        data: { isCompleted },
      });
      return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}
