import {Grid2} from "@mui/material";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "common/hooks";
import {TodolistItem} from "./TodolistItem/TodolistItem";
import {selectTodolist} from "../../model/todolist-selectors";
import {setTodolistTC} from "../../model/todolist-reducer";

//Компонент списков задач
export const Todolist = () => {
    const todolist = useAppSelector(selectTodolist); //Селектор списков задач
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTodolistTC());
    }, []);

    //Функция возвращающая компоненты списков дел
    const getTodolistComponents = todolist.map(tl => {
        return (
            <Grid2 key={tl.id}>
                <TodolistItem todolist={tl} />
            </Grid2>
        );
    });

    return <>{getTodolistComponents}</>;
};
