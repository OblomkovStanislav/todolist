import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "common/hooks";
import {List} from "@mui/material";
import {selectTasks} from "../../../../model/tasks-selectors";
import {Task} from "./Task/Task";
import type {DomainTodolist} from "../../../../model/todolist-reducer";
import {setTasksTC} from "../../../../model/tasks-reducer";
import {TaskStatus} from "../../../../lib/enums";

//Типизация props
type TasksProps = {todolist: DomainTodolist};

//Компонент задач
export const Tasks = ({todolist}: TasksProps) => {
    const tasks = useAppSelector(selectTasks); //Селектор списка задач
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTasksTC(todolist.id));
    }, []);

    //Функция получающая отфильтрованный список задач
    const getTasksForTodolist = () => {
        if (!tasks[todolist.id]) return [];

        switch (todolist.filter) {
            case "active":
                return tasks[todolist.id].filter(task => task.status === TaskStatus.New);
            case "completed":
                return tasks[todolist.id].filter(task => task.status === TaskStatus.Completed);
            default:
                return tasks[todolist.id].map(task => task);
        }
    };

    //Функция отрисовки списка задач
    const drawTasks = () => {
        return getTasksForTodolist().length === 0 ? (
            <span>There are no tasks</span>
        ) : (
            <List>
                {getTasksForTodolist().map(task => {
                    return (
                        <Task key={task.id} todolistId={todolist.id} task={task} entityStatus={todolist.entityStatus} />
                    );
                })}
            </List>
        );
    };

    return <>{drawTasks()}</>;
};
