import { prisma } from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try{
        const { userId } = await auth();
        const {id} = await params;

        if(!userId) return NextResponse.json("Unauthorized", {status: 401});

        const task = await prisma.task.delete({
            where: {
                id,
            },
        });
        return NextResponse.json(task);
    }catch(error){
        console.log("ERROR ELIMINANDO TAREA", error);
        return NextResponse.json("Error eliminando tarea", {status: 500});
    }
}
