import {TasksType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolist-reducer";

type AddTaskAT = ReturnType<typeof addTaskAC>;
type RemoveTaskAT = ReturnType<typeof removeTaskAC>;
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>;
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>;
type ActionType = AddTaskAT | RemoveTaskAT | ChangeTaskTitleAT | ChangeTaskStatusAT | AddTodolistAT | RemoveTodolistAT;

export const tasksReducer = (tasks: TasksType, action: ActionType): TasksType => {
    switch (action.type) {
        case "ADD-TASK": {
            const {todolistId, taskTitle} = action.payload;
            return {...tasks, [todolistId]: [{id: v1(), title: taskTitle, isDone: false}, ...tasks[todolistId]]};
        }

        case "REMOVE-TASK": {
            const {todolistId, taskId} = action.payload;
            return {...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)};
        }

        case  "CHANGE-TASK-TITLE": {
            debugger
            const {todolistId, taskId, taskTitle} = action.payload;
            return {...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title: taskTitle} : task)};
        }

        case "CHANGE-TASK-STATUS": {
            const {todolistId, taskId, isDone} = action.payload;
            return {...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: isDone} : task)};
        }

        case "ADD-TODOLIST": {
            const {todolistId} = action.payload;
            return {...tasks, [todolistId]: []};
        }

        case "REMOVE-TODOLIST": {
            const {todolistId} = action.payload;
            delete tasks[todolistId];
            return {...tasks};
        }

        default: return tasks;
    }
};

export const addTaskAC = (payload: {todolistId: string, taskTitle: string}) => {
    return {
        type: "ADD-TASK",
        payload
    } as const
};

export const removeTaskAC = (payload: {todolistId: string, taskId: string}) => {
    return {
        type: "REMOVE-TASK",
        payload
    } as const
};

export const changeTaskTitleAC = (payload: {todolistId: string, taskId: string, taskTitle: string}) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload
    } as const
}

export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, isDone: boolean}) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload
    } as const
}