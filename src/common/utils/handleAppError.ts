import type {AppDispatch} from "../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import type {BaseResponse} from "common/types";

//Утилитарная функция, отправляющая ошибку в приложении в reducer
export const handleAppError = <T>(dispatch: AppDispatch, data: BaseResponse<T>) => {
    dispatch(setAppStatusAC("failed"));
    dispatch(setAppErrorAC(data.messages[0]));
};
