import {todolistReducer, todolistSlice} from "../features/todolist/model/todolistSlice";
import {appReducer, appSlice} from "./appSlice";
import {authReducer, authSlice} from "../features/auth/model/authSlice";
import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer, tasksSlice} from "../features/todolist/model/tasksSlice";

//Хранилище состояний приложения
export const store = configureStore({
    reducer: {
        [appSlice.name]: appReducer,
        [authSlice.name]: authReducer,
        [tasksSlice.name]: tasksReducer,
        [todolistSlice.name]: todolistReducer,
    },
});

//Типизация
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;
