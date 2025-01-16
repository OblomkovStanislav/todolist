import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export type AddTodolistAT = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>;
type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>;

type ActionType = AddTodolistAT | RemoveTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT;

export const todolistReducer = (todolist: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "ADD-TODOLIST":{
            const {todolistId, todolistTitle} = action.payload;
            return [...todolist, {id: todolistId, title: todolistTitle, filter: "all"}];
        }

        case "REMOVE-TODOLIST": {
            const {todolistId} = action.payload;
            return todolist.filter(tl => tl.id !== todolistId);
        }

        case "CHANGE-TODOLIST-TITLE":{
            const {todolistId, todolistTitle} = action.payload;
            return todolist.map(tl => tl.id === todolistId ? {...tl, title: todolistTitle} : tl);
        }
        case "CHANGE-TODOLIST-FILTER": {
            const {todolistId, filter} = action.payload;
            return todolist.map(tl => tl.id === todolistId ? {...tl, filter} : tl);
        }

        default: return todolist;
    }
}

export const addTodolistAC  = (payload: {todolistTitle: string}) => {
    return {
        type: "ADD-TODOLIST",
        payload: {todolistId: v1(), ...payload}
    } as const
}

export const removeTodolistAC  = (payload: {todolistId: string}) => {
    return {
        type: "REMOVE-TODOLIST",
        payload
    } as const
}

export const changeTodolistTitleAC  = (payload: {todolistId: string, todolistTitle: string}) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload
    } as const
}

export const changeTodolistFilterAC  = (payload: {todolistId: string, filter: FilterType}) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload
    } as const
}