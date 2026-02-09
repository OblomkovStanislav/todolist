import type {AppDispatch} from "../../app/store";
import {setAppError, setAppStatus} from "../../app/appSlice";
import axios from "axios";

//Утилитарная функция, отправляющая ошибку на сервере в reducer
export const handleServerError = (dispatch: AppDispatch, error: unknown) => {
    let errorMessage = "Some error occurred";

    if (axios.isAxiosError(error)) errorMessage = error.response?.data?.message || error?.message || errorMessage;
    else if (error instanceof Error) errorMessage = `Native error: ${error.message}`;
    else errorMessage = JSON.stringify(error);

    dispatch(setAppError({error: errorMessage}));
    dispatch(setAppStatus({status: "failed"}));
};
