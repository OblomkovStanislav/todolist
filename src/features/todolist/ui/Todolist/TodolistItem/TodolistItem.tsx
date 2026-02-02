import React from "react";
import {AddItemForm} from "common/components";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {Tasks} from "./Tasks/Tasks";
import {addTaskTC} from "../../../model/tasks-reducer";
import {useAppDispatch} from "common/hooks";
import type {DomainTodolist} from "../../../model/todolist-reducer";
import {TodolistPaperStyled} from "./TodolistPaperStyled";

//Типизация props
type TodolistProps = {todolist: DomainTodolist};

//Компонент списка задач
export const TodolistItem = ({todolist}: TodolistProps) => {
    const dispatch = useAppDispatch();
    const addTask = (taskTitle: string) => dispatch(addTaskTC({todolistId: todolist.id, taskTitle})); //Функция добавления новой задачи

    return (
        <TodolistPaperStyled elevation={3} sx={{p: "15px"}}>
            <TodolistTitle todolist={todolist} />
            <AddItemForm addItem={addTask} entityStatus={todolist.entityStatus} />
            <FilterButtons todolist={todolist} />
            <Tasks todolist={todolist} />
        </TodolistPaperStyled>
    );
};
