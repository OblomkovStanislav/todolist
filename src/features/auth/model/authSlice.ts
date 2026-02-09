import type {LoginArgs} from "../api/authApi.types";
import type {AppDispatch} from "../../../app/store";
import {authApi} from "../api/authApi";
import {ResultCode} from "../../todolist/lib/enums";
import {handleAppError, handleServerError} from "common/utils";
import {createSlice} from "@reduxjs/toolkit";
import {setAppStatus} from "app/appSlice";

export const authSlice = createSlice({
    name: "auth",

    initialState: {
        isLoggedIn: false,
        isInitialized: false,
    },

    selectors: {
        selectIsLoggedIn: sliceState => sliceState.isLoggedIn,
        selectIsInitialized: sliceState => sliceState.isInitialized,
    },

    reducers: creators => ({
        setIsLoggedIn: creators.reducer<{isLoggedIn: boolean}>((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        }),

        setIsInitialized: creators.reducer<{isInitialized: boolean}>((state, action) => {
            state.isInitialized = action.payload.isInitialized;
        }),
    }),
});

export const authReducer = authSlice.reducer;
export const {setIsLoggedIn, setIsInitialized} = authSlice.actions;
export const selectIsLoggedIn = authSlice.selectors.selectIsLoggedIn;
export const selectIsInitialized = authSlice.selectors.selectIsInitialized;

//Thunks
//Авторизация в приложении
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: "loading"}));

    authApi
        .login(data)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: "succeeded"}));
                dispatch(setIsLoggedIn({isLoggedIn: true}));
                localStorage.setItem("td-token", res.data.data.token);
            } else {
                handleAppError(dispatch, res.data);
            }
        })
        .catch(error => handleServerError(dispatch, error));
};

//Разавторизация в приложении
export const logoutTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: "loading"}));

    authApi
        .logout()
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: "succeeded"}));
                dispatch(setIsLoggedIn({isLoggedIn: false}));
                localStorage.removeItem("td-token");
            } else {
                handleAppError(dispatch, res.data);
            }
        })
        .catch(error => handleServerError(dispatch, error));
};

//Задать флаг инициализации приложения
export const initializedTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: "loading"}));

    authApi
        .me()
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: "succeeded"}));
                dispatch(setIsLoggedIn({isLoggedIn: true}));
                dispatch(setIsInitialized({isInitialized: true}));
            } else {
                handleAppError(dispatch, res.data);
            }
        })
        .catch(error => handleServerError(dispatch, error))
        .finally(() => dispatch(setIsInitialized({isInitialized: true})));
};
