//Типизация ошибки
export type FieldError = {
    error: string;
    field: string;
};

//Типизация ответа от сервера
export type BaseResponse<T = {}> = {
    resultCode: number;
    messages: string[];
    fieldsErrors: FieldError[];
    data: T;
};
