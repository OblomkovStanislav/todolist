import type {AppDispatch} from "../../app/store";
import type {BaseResponse} from "common/types";
import {setAppError, setAppStatus} from "../../app/appSlice";

//Утилитарная функция, отправляющая ошибку в приложении в reducer
export const handleAppError = <T>(dispatch: AppDispatch, data: BaseResponse<T>) => {
    dispatch(setAppStatus({status: "failed"}));
    dispatch(setAppError({error: data.messages[0]}));
};
