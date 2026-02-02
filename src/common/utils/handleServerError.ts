import type {AppDispatch} from "../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";

//Утилитарная функция, отправляющая ошибку на сервере в reducer
export const handleServerError = (dispatch: AppDispatch, err: {message: string}) => {
    dispatch(setAppStatusAC("failed"));
    dispatch(setAppErrorAC(err.message));
};
