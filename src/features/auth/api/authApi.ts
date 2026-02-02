import {LoginArgs, type MeResponse} from "./authApi.types";
import {instance} from "common/instance";
import type {BaseResponse} from "common/types";

//Объект с запросами на сервер по авторизации пользователя
export const authApi = {
    //Авторизация пользователя
    login(payload: LoginArgs) {
        return instance.post<BaseResponse<{userId: number; token: string}>>(`auth/login`, payload);
    },

    //Разавторизация пользователя
    logout() {
        return instance.delete<BaseResponse>("auth/login");
    },

    //Аутентификация пользователя
    me() {
        return instance.get<BaseResponse<MeResponse>>("auth/me");
    },
};
