"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import formatDate from "@/app/utils/formatDate";
import { edit, trash } from "@/app/utils/Icons";
import styled from "styled-components";

interface Props {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    id: string;
}

export default function Taskitem({title, description, date, isCompleted, id}: Props) {
    const {theme, deleteTask, updateTask} = useGlobalState();
  return (
    <TaskStyled theme={theme}>
        <h1 className="font-semibold text-2xl">{title}</h1>
        <p>{description}</p>
        <p className="date mt-auto">{formatDate(date)}</p>
        <div className="task-footer flex items-center gap-2">
        {isCompleted ? (
            <button className="completed border-none outline-none cursor-pointer" onClick={()=> {
                const task = { id, isCompleted: !isCompleted };
                updateTask(task);
            }}>Completa</button>
        ) : (
            <button className="incompleted border-none outline-none cursor-pointer" onClick={()=> {
                const task = { id, isCompleted: !isCompleted };
                updateTask(task);
            }}>incompleta</button>
        )}
        {/* <button className="edit border-none outline-none cursor-pointer ml-auto text-xl">{edit}</button> */}
            <button className="delete border-none outline-none cursor-pointer text-xl ml-auto" onClick={() => deleteTask(id)}>{trash}</button>
        </div>
    </TaskStyled>            
    );
    }

const TaskStyled = styled.div`
    padding: 1.2rem 1rem;
    border-radius: 1rem;
    background-color: ${(props: any) => props.theme.borderColor2};
    box-shadow: ${(props: any) => props.theme.shadow7};
    border: 2px solid ${(props: any) => props.theme.borderColor2};
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .task-footer{
        i{
            color: ${(props: any) => props.theme.colorGrey2};
        }
            .completed, .incompleted{
                display: inline-block;
                padding: 0.4rem 1rem;
                background-color: ${(props: any) => props.theme.colorDanger};
                border-radius: 30px;
            }
                .completed{
                    background-color: ${(props: any) => props.theme.colorGreenDark};
                    }
    }
`;