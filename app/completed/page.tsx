"use client";
import React from "react";
import { useGlobalState } from "../context/globalProvider";
import Tasks from "../Components/Tasks/Tasks";

export default function page() {
  const { completedTask } = useGlobalState();
  return (
    <Tasks title="Tareas Completadas" tasks={completedTask} />
  );
}