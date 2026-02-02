import type {LoginArgs} from "../api/authApi.types";
import {setAppStatusAC} from "../../../app/app-reducer";
import type {AppDispatch} from "../../../app/store";
import {authApi} from "../api/authApi";
import {ResultCode} from "../../todolist/lib/enums";
import {handleAppError, handleServerError} from "common/utils";

//Инициализационные значения state
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
};

//Reducer авторизации в приложении
export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        //Задать флаг авторизации
        case "SET_IS_LOGGED_IN":
            return {...state, isLoggedIn: action.payload.isLoggedIn};

        //Задать флаг инициализации приложения
        case "SET_IS_INITIALIZED":
            return {...state, isInitialized: action.payload.isInitialized};
        default:
            return state;
    }
};

// Action Creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {type: "SET_IS_LOGGED_IN", payload: {isLoggedIn}} as const;
};

//Задать флаг инициализации приложения
const setIsInitializedAC = (isInitialized: boolean) => {
    return {type: "SET_IS_INITIALIZED", payload: {isInitialized}} as const;
};

//Thunks
//Авторизация в приложении
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"));

    authApi
        .login(data)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setIsLoggedInAC(true));
                localStorage.setItem("td-token", res.data.data.token);
            } else {
                handleAppError(dispatch, res.data);
            }
        })
        .catch(error => handleServerError(dispatch, error));
};

//Разавторизация в приложении
export const logoutTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"));

    authApi
        .logout()
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setIsLoggedInAC(false));
                localStorage.removeItem("td-token");
            } else {
                handleAppError(dispatch, res.data);
            }
        })
        .catch(error => handleServerError(dispatch, error));
};

//Задать флаг инициализации приложения
export const initializedTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"));

    authApi
        .me()
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setIsLoggedInAC(true));
                dispatch(setIsInitializedAC(true));
            } else {
                handleAppError(dispatch, res.data);
            }
        })
        .catch(error => handleServerError(dispatch, error))
        .finally(() => dispatch(setIsInitializedAC(true)));
};

//Типизация
type InitialStateType = typeof initialState; //Типизация инициализационных значений state
type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsInitializedAC>;
