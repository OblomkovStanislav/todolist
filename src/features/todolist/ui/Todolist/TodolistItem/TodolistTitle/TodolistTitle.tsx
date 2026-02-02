import React from "react";
import {EditableTitle} from "common/components";
import {changeTodolistTitleTC, type DomainTodolist, removeTodolistTC} from "../../../../model/todolist-reducer";
import {useAppDispatch} from "common/hooks";

//Типизация props
type TodolistTitleProps = {
    todolist: DomainTodolist; //Типизация списка задач
};

//Компонент заголовка списка задач
export const TodolistTitle = ({todolist}: TodolistTitleProps) => {
    const dispatch = useAppDispatch();

    const removeTodolist = () => dispatch(removeTodolistTC(todolist.id)); //Функция удаления списка дел
    const changeTodolistTitle = (todolistTitle: string) =>
        dispatch(changeTodolistTitleTC({todolistId: todolist.id, todolistTitle})); //Функция изменения заголовка списка дел

    return (
        <EditableTitle
            title={todolist.title}
            removeTask={removeTodolist}
            changeTitleItem={changeTodolistTitle}
            entityStatus={todolist.entityStatus}
        />
    );
};
