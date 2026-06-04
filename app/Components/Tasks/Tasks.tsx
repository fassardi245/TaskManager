"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";
import Taskitem from "../Taskitem/Taskitem";
import { plus } from "@/app/utils/Icons";
import Modal from "./Modal";

interface Props {
    title: string;
    tasks: any[];
}

export default function Tasks({title, tasks}: Props) {
    const {theme, isLoading, openModal, modal} = useGlobalState();
  return (
        <TaskStyled theme={theme}>
            {modal && <Modal content={<CreateContent />} />}
            <h1 className="text-[clamp(1.5rem,2vw,2rem)] font-extrabold relative">{title}</h1>
            <div className="tasks grid">
                {tasks.map((task) => (
                    <Taskitem key={task.id} 
                    title={task.title} 
                    description={task.description} 
                    date={task.date} 
                    isCompleted={task.isCompleted} 
                    id={task.id} 
                    />
                ))}
                <button className="create-task flex items-center justify-center gap-2 h-64 font-bold cursor-pointer rounded-2xl" onClick={openModal}>
                    {plus}
                    Agregar nueva tarea
                </button>
            </div>
        </TaskStyled>
  );
}

const TaskStyled = styled.main`
    padding: 2rem;
    width: 100%;
    height: 100%;
    background-color: ${(props: any) => props.theme.colorBg2};
    border: 2px solid ${(props: any) => props.theme.borderColor2};
    border-radius: 1rem;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 0.5rem;
    }
        .tasks{
                margin: 2rem 0;
            }
        h1{
             &::after{
                    position: absolute;
                    content: "";
                    bottom: -0.5rem;
                    left: 0;
                    width: 3rem;
                    height: 0.2rem;
                    background-color: ${(props : any) => props.theme.colorPrimaryGreen};
                    border-radius: 0.5rem;
                }  
        }
        .create-task{
            color: ${(props: any) => props.theme.colorGrey2};
            border: 3px dashed ${(props: any) => props.theme.colorGrey5};
            transition: all 0.3s ease;
            &:hover{
                background-color: ${(props: any) => props.theme.colorGrey5};
                color: ${(props: any) => props.theme.colorGrey0};
            }
        }
    `;