import {list, check, todo, home} from "./Icons";

const menu = [
    {
        id: 1,
        title: "Todas las tareas",
        icon: home,
        link: "/",
    },
    {
        id: 2,
        title: "Tareas importantes",
        icon: list,
        link: "/important",
    },
    {
        id: 3,
        title: "Tareas completadas",
        icon: check,
        link: "/completed",
    },
    {
        id: 4,
        title: "Hacer ahora",
        icon: todo,
        link: "/incomplete",
    },
];

export default menu;