import {RootState} from "./store";

//Селекторы приложения
export const selectStatus = (state: RootState) => state.app.status; //Селектор статуса приложения
export const selectError = (state: RootState) => state.app.error; //Селектор ошибки приложения
