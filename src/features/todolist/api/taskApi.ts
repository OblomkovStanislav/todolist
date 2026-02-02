import type {DomainTask, GetTasksResponse, UpdateTaskModel} from "./taskApi.types";
import {instance} from "common/instance/instance";
import type {BaseResponse} from "common/types/types";

//Объект с запросами на сервер по взаимодействую с задачами
export const taskApi = {
    //Получить задачи
    getTasks: (todolistId: string) => instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`),

    //Добавить задачу
    addTask: (payload: {todolistId: string; taskTitle: string}) => {
        const {todolistId, taskTitle} = payload;

        return instance.post<BaseResponse<{item: DomainTask}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle});
    },

    //Удалить задачу
    removeTask: (payload: {todolistId: string; taskId: string}) => {
        const {todolistId, taskId} = payload;

        return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },

    //Изменить задачу
    changeTask: (payload: {todolistId: string; taskId: string; model: UpdateTaskModel}) => {
        const {todolistId, taskId, model} = payload;

        return instance.put<BaseResponse<{item: DomainTask}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
};
