import React, {ChangeEvent} from "react";
import {useAppDispatch} from "common/hooks";
import {Checkbox, ListItem} from "@mui/material";
import {blue, green} from "@mui/material/colors";
import {EditableTitle} from "common/components";
import {changeTaskTC, removeTaskTC} from "../../../../../model/tasks-reducer";
import type {DomainTask, UpdateTaskModel} from "../../../../../api/taskApi.types";
import {TaskStatus} from "../../../../../lib/enums";
import type {RequestStatus} from "../../../../../../../app/app-reducer";

//Типизация props
type TaskProps = {
    todolistId: string; //Типизация id списка задач
    task: DomainTask; //Типизация задачи
    entityStatus: RequestStatus; //Типизация статуса задачи
};

//Компонент задачи
export const Task = ({todolistId, task, entityStatus}: TaskProps) => {
    const dispatch = useAppDispatch();

    //Функция удаления задачи
    const removeTask = () => dispatch(removeTaskTC({todolistId: todolistId, taskId: task.id}));

    //Функция изменения заголовка задачи
    const changeTaskTitle = (taskTitle: string) => {
        const model: UpdateTaskModel = {
            title: taskTitle,
        };

        dispatch(changeTaskTC({todolistId: todolistId, taskId: task.id, domainModel: model}));
    };

    //Функция изменения статуса выполнения задачи
    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        const model: UpdateTaskModel = {
            status: event.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
        };

        dispatch(changeTaskTC({todolistId, taskId: task.id, domainModel: model}));
    };

    return (
        <>
            <ListItem
                disablePadding
                sx={{
                    opacity: task.status === TaskStatus.Completed ? 0.7 : 1,
                    height: "100%",
                    borderBottom: "solid 1px #333",
                }}>
                <Checkbox
                    sx={{
                        color: blue[800],
                        "&.Mui-checked": {color: green[800]},
                    }}
                    checked={task.status === TaskStatus.Completed}
                    onChange={changeTaskStatus}
                    disabled={entityStatus === "loading"}
                />

                <EditableTitle
                    title={task.title}
                    removeTask={removeTask}
                    changeTitleItem={changeTaskTitle}
                    entityStatus={entityStatus}
                />
            </ListItem>
        </>
    );
};
