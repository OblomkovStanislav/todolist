//Набор статусов для задач
export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

//Набор приоритетов для задач
export enum TaskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

//Набор результатов ответов при запросе на сервер
export enum ResultCode {
    Success = 0,
    Error = 1,
    CaptchaError = 10,
}
