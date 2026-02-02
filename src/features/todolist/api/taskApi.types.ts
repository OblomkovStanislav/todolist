import {TaskPriority, TaskStatus} from "../lib/enums";

//Типизация задачи
export type DomainTask = {
    description: string;
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};

//Типизация ответа от сервера при получении задач
export type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: DomainTask[];
};

//Типизация модели отправки запроса на сервер при обновлении задач
export type UpdateTaskModel = {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    startDate?: string;
    deadline?: string;
};
