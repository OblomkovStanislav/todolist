import type {Todolist} from "../api/todolistApi.types";
import {todolistApi} from "../api/todolistApi";
import type {AppDispatch} from "../../../app/store";
import {type RequestStatus, setAppStatusAC} from "../../../app/app-reducer";
import {handleAppError, handleServerError} from "common/utils";
import {ResultCode} from "../lib/enums";

//Инициализационные значения state
const initialState: DomainTodolist[] = [];

//Reducer списков задач
export const todolistReducer = (state: DomainTodolist[] = initialState, action: ActionType): DomainTodolist[] => {
    switch (action.type) {
        //Отправить списки задач
        case "SET-TODOLIST": {
            return action.payload.todolist.map(tl => ({...tl, filter: "all", entityStatus: "idle"}));
        }

        //Добавить список задач
        case "ADD-TODOLIST": {
            const todolist = action.payload.todolist;
            return [
                ...state,
                {
                    id: todolist.id,
                    title: todolist.title,
                    filter: "all",
                    order: 1,
                    addedDate: "",
                    entityStatus: "idle",
                },
            ];
        }

        //Удалить список задач
        case "REMOVE-TODOLIST": {
            const {todolistId} = action.payload;
            return state.filter(tl => tl.id !== todolistId);
        }

        //Изменить заголовок списка задач
        case "CHANGE-TODOLIST-TITLE": {
            const {todolistId, todolistTitle} = action.payload;
            return state.map(tl => (tl.id === todolistId ? {...tl, title: todolistTitle} : tl));
        }

        //Изменить фильтр списка задач
        case "CHANGE-TODOLIST-FILTER": {
            const {todolistId, filter} = action.payload;
            return state.map(tl => (tl.id === todolistId ? {...tl, filter} : tl));
        }

        //Изменить статус списка задач
        case "CHANGE-TODOLIST-STATUS": {
            const {todolistId, entityStatus} = action.payload;
            return state.map(tl => (tl.id === todolistId ? {...tl, entityStatus} : tl));
        }

        default:
            return state;
    }
};

//Action Creators
//Отправить списки задач
export const setTodolistAC = (todolist: Todolist[]) => {
    return {
        type: "SET-TODOLIST",
        payload: {
            todolist,
        },
    } as const;
};

//Добавить список задач
export const addTodolistAC = (todolist: Todolist) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            todolist,
        },
    } as const;
};

//Удалить список задач
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId,
        },
    } as const;
};

//Изменить заголовок списка задач
export const changeTodolistTitleAC = (payload: {todolistId: string; todolistTitle: string}) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload,
    } as const;
};

//Изменить фильтр списка задач
export const changeTodolistFilterAC = (payload: {todolistId: string; filter: FilterType}) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload,
    } as const;
};

//Изменить статус списка задач
export const changeTodolistStatusAC = (payload: {todolistId: string; entityStatus: RequestStatus}) => {
    return {
        type: "CHANGE-TODOLIST-STATUS",
        payload,
    } as const;
};

//Thunks
//Отправить все списка задач
export const setTodolistTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"));
    todolistApi.getTodolist().then(res => {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(setTodolistAC(res.data));
    });
};

//Добавить список задач
export const addTodolistTC = (todolistTitle: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"));
    todolistApi
        .addTodolist(todolistTitle)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC("succeeded"));
                dispatch(addTodolistAC(res.data.data.item));
            } else handleAppError(dispatch, res.data);
        })
        .catch(err => handleServerError(dispatch, err.message));
};

//Удалить список задач
export const removeTodolistTC = (todolistId: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(changeTodolistStatusAC({todolistId, entityStatus: "loading"}));
    todolistApi
        .removeTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC("succeeded"));
                dispatch(removeTodolistAC(todolistId));
            } else handleAppError(dispatch, res.data);
        })
        .catch(err => {
            handleServerError(dispatch, err.message);
            dispatch(changeTodolistStatusAC({todolistId, entityStatus: "failed"}));
        });
};

//Изменить заголовок списка задач
export const changeTodolistTitleTC =
    (payload: {todolistId: string; todolistTitle: string}) => (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC("loading"));
        todolistApi
            .changeTodolist(payload)
            .then(res => {
                if (res.data.resultCode === ResultCode.Success) {
                    dispatch(setAppStatusAC("succeeded"));
                    dispatch(changeTodolistTitleAC(payload));
                } else handleAppError(dispatch, res.data);
            })
            .catch(err => {
                handleServerError(dispatch, err.message);
                console.log(err.message);
            });
    };

//Типизация
type SetTodolistAT = ReturnType<typeof setTodolistAC>;
export type AddTodolistAT = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>;
type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>;
type ChangeTodolistStatusAT = ReturnType<typeof changeTodolistStatusAC>;

type ActionType =
    | SetTodolistAT
    | AddTodolistAT
    | RemoveTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | ChangeTodolistStatusAT;

export type FilterType = "all" | "active" | "completed"; //Тип со значениями фильтра

export type DomainTodolist = Todolist & {
    filter: FilterType; //Типизация фильтра списка задач
    entityStatus: RequestStatus; //Типизация статуса списка задач
};
