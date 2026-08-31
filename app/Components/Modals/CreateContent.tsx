"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import axios from "axios";
import React, {useState} from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "../Button/Button";
import { edit, plus } from "@/app/utils/Icons";

export default function CreateContent() {
  const {theme, allTasks, closeModal, editingTask, updateTask} = useGlobalState();
  const [title, setTitle] = useState(editingTask?.title ?? "");
  const [description, setDescription] = useState(editingTask?.description ?? "");
  const [date, setDate] = useState(editingTask?.date ?? "");
  const [completed, setCompleted] = useState(editingTask?.isCompleted ?? false);
  const [important, setImportant] = useState(editingTask?.isImportant ?? false);
  const isEditing = Boolean(editingTask);

  const handleChange = (name : string) => (e: any) => {
    switch (name) {
        case "title":
            setTitle(e.target.value);
            break;
        case "description":
            setDescription(e.target.value);
            break;
        case "date":
            setDate(e.target.value);
            break;
        case "completed":
            setCompleted(e.target.checked);
            break;
        case "important":
            setImportant(e.target.checked);
            break;
        default:
            break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const taskData = {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
    };
    try 
    {
        if (isEditing) {
          const updated = await updateTask({ id: editingTask.id, ...taskData });
          if (updated) {
            closeModal();
          }
          return;
        }

        const createTaskData = {
          ...taskData,
          completed,
          important,
        };
        const response = await axios.post("/api/tasks", createTaskData);
        if (response.data.error){
            toast.error(response.data.error);
        }
        if(!response.data.error){
            toast.success("Tarea creada con éxito");
            allTasks();
            closeModal();
        }
    }
    catch (error) {
        toast.error("Algo salió mal al crear la tarea");
    }
  };

  return (
    <InputStyles onSubmit={handleSubmit} theme={theme}>
    <div>
      <h1 className="text-2xl font-semibold">{isEditing ? "Edita la tarea" : "Crea una tarea"}</h1>
      <div className="input-control relative m-2 font-medium">
        <label className="mb-2 inline-block font-medium" htmlFor="title">Título</label>
        <input
         type="text"
         id="title"
         placeholder="titulo"
         value={title}
         name="title"
         onChange={handleChange("title")}
         />
      </div>
      <div className="input-control relative m-2 font-medium">
        <label className="mb-2 inline-block font-medium" htmlFor="description">Descripción</label>
        <textarea
         id="description"
         placeholder="descripción"
         value={description}
         name="description"
         onChange={handleChange("description")}
         rows={2}
         />
      </div>
        <div className="input-control relative m-2 font-medium">
        <label className="mb-2 inline-block font-medium" htmlFor="date">Fecha</label>
        <input
         type="date"
            id="date"
            placeholder="fecha"
            value={date}
            name="date"
            onChange={handleChange("date")}
         />
      </div>
        <div className="input-control toggler flex flex-1 items-center justify-between m-2 font-medium">
        <label className="mb-2 flex flex-1 inline-block font-medium" htmlFor="completed">Tarea completada</label>
        <input
            type="checkbox"
            id="completed"
            checked={completed}
            name="completed"
            onChange={handleChange("completed")}
            className="w-initial"
        />
      </div>
        <div className="input-control toggler flex items-center justify-between m-2 font-medium">
        <label className="mb-2 flex flex-1 inline-block font-medium" htmlFor="important">Tarea importante</label>
        <input
            type="checkbox"
            id="important"
            checked={important}
            name="important"
            onChange={handleChange("important")}
        />
      </div>
      <div className="submit-btn flex justify-end">
        <Button type="submit"
         name={isEditing ? "Actualizar tarea" : "Crear Tarea"}
          icon={isEditing ? edit : plus}
         padding={"0.8rem 2rem"}
         borderRad={"0.8rem"}
         fw={"500"}
         fs={"1.2rem"}
         background={theme.colorPrimary}
         />
      </div>
    </div>
    </InputStyles>
  );
}

const InputStyles = styled.form`
  
  color: ${(props: any) => props.theme.colorGrey1};

  .input-control{
  label {
      spam{
        color: ${(props: any) => props.theme.colorGrey3};  
      }
    }
    input, textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props: any) => props.theme.colorGreyDark};
      color: ${(props: any) => props.theme.colorGrey2};
      border-radius: 1rem;
    }
  }
    .submit-btn button{
      transition: all 0.30s ease-in-out;
      i{
        color: ${(props: any) => props.theme.colorGrey0};
      }
        &:hover{
          background-color: ${(props: any) => props.theme.colorPrimaryGreen} !important;
          color: ${(props: any) => props.theme.colorWhite} !important;
        }
    }
        .toggler{
          input{
            width: initial;
          }
        }
`;
