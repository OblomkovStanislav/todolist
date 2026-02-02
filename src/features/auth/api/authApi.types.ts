//Типизация аргументов запроса на сервер при авторизации
export type LoginArgs = {
    email: string;
    password: string;
    rememberMe?: boolean;
    captcha?: string;
};

//Типизация ответа от сервера при аутентификации
export type MeResponse = {
    id: number;
    email: string;
    login: string;
};
