import type {RootState} from "../../../app/store";

//Селекторы авторизации
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn; //Селектор авторизации
export const selectIsInitialized = (state: RootState) => state.auth.isInitialized; //Селектор инициализации
