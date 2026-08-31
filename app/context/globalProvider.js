"use client";
import React, { useContext, createContext, useState, use } from "react";
import themes  from "./themes";
import axios, { all } from "axios";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({ children }) => {
    const {user} = useUser();
    const [selectedTheme, setSelectedTheme] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const theme = themes[selectedTheme];
    const [tasks, setTasks] = useState([]);
    const [modal, setModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [collapsed, setColapsed] = useState(false);

    const openModal = (task = null) => {
        setEditingTask(task);
        setModal(true);
    };

    const closeModal = () => {
        setEditingTask(null);
        setModal(false);
    }

    const collapsedMenu = () => {
        setColapsed(!collapsed);
    }

    const allTasks = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/tasks');
            const sorted = response.data.sort((a,b) => {
                return (
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            });
            setTasks(sorted);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const updateTask = async (task) => {
        try {
            const res = await axios.put('/api/tasks', task);
            toast.success("Tarea actualizada");
            await allTasks();
            return true;
        } catch (error) {
            console.log(error);
            toast.error("Algo salio mal");
            return false;
        }
    }

    const deleteTask = async (id) => {
        try{
            const res = await axios.delete(`/api/tasks/${id}`);
            toast.success("Tarea eliminada");
            allTasks();
        } catch (error) {
            console.log(error);
            toast.error("Algo salio mal");
        }
    }

    const completedTask = tasks.filter((task) => task.isCompleted === true);

    const importantTask = tasks.filter((task) => task.isImportant === true);

    const incompleteTask = tasks.filter((task) => task.isCompleted === false);

    React.useEffect(() => {
        if(user){
            allTasks();
        }
    }, [user]);

    return (
        <GlobalContext.Provider value={{theme, tasks, deleteTask, isLoading, completedTask, importantTask, incompleteTask, updateTask, modal, editingTask, openModal, closeModal, allTasks, collapsed, collapsedMenu}}>
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
