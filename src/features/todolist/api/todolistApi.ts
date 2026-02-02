import type {Todolist} from "./todolistApi.types";
import {instance} from "common/instance/instance";
import type {BaseResponse} from "common/types/types";

//Объект с запросами на сервер по взаимодействию со списками задач
export const todolistApi = {
    //Получить списки задач
    getTodolist: () => instance.get<Todolist[]>("todo-lists"),

    //Добавить список задач
    addTodolist: (todolistTitle: string) =>
        instance.post<BaseResponse<{item: Todolist}>>("todo-lists", {title: todolistTitle}),

    //Удалить список задач
    removeTodolist: (todolistId: string) => instance.delete<BaseResponse>(`todo-lists/${todolistId}`),

    //Изменить список задач
    changeTodolist: (payload: {todolistId: string; todolistTitle: string}) => {
        const {todolistId, todolistTitle} = payload;
        return instance.put<BaseResponse>(`todo-lists/${todolistId}`, {title: todolistTitle});
    },
};
