//Инициализационные значения state
const initialState = {
    status: "idle" as RequestStatus, //Статус приложения
    error: null as string | null, //Ошибка в приложении
};

//Reducer приложения
export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        //Задать статус приложению
        case "SET_STATUS":
            return {...state, status: action.payload.status};

        //Задать ошибку приложению
        case "SET_ERROR":
            return {...state, error: action.payload.error};

        default:
            return state;
    }
};

//Action Creators
export const setAppStatusAC = (status: RequestStatus) => {
    return {
        type: "SET_STATUS",
        payload: {status},
    } as const;
};

export const setAppErrorAC = (error: string | null) => {
    return {
        type: "SET_ERROR",
        payload: {error},
    } as const;
};

//Типизация
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
type AppStateType = typeof initialState;
type setAppStatusAT = ReturnType<typeof setAppStatusAC>;
type setAppErrorAT = ReturnType<typeof setAppErrorAC>;
type ActionsType = setAppStatusAT | setAppErrorAT;
