import type {Todolist} from "../api/todolistApi.types";
import {todolistApi} from "../api/todolistApi";
import type {AppDispatch} from "../../../app/store";
import {handleAppError, handleServerError} from "common/utils";
import {ResultCode} from "../lib/enums";
import {RequestStatus, setAppStatus} from "../../../app/appSlice";
import {createSlice} from "@reduxjs/toolkit";
import {setIsLoggedIn} from "../../auth/model/authSlice";

export type FilterType = "all" | "active" | "completed"; //Тип со значениями фильтра

export type DomainTodolist = Todolist & {
    filter: FilterType; //Типизация фильтра списка задач
    entityStatus: RequestStatus; //Типизация статуса списка задач
};

export const todolistSlice = createSlice({
    name: "todolist",
    initialState: [] as DomainTodolist[],

    selectors: {
        selectTodolist: sliceState => sliceState,
    },

    reducers: creators => ({
        setTodolist: creators.reducer<{todolist: Todolist[]}>((state, action) => {
            return action.payload.todolist.map(tl => ({...tl, filter: "all", entityStatus: "idle"}));
        }),

        addTodolist: creators.reducer<{todolist: Todolist}>((state, action) => {
            state.push({...action.payload.todolist, filter: "all", entityStatus: "idle"});
        }),

        removeTodolist: creators.reducer<{todolistId: string}>((state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId);
            if (index !== -1) state.splice(index, 1);
        }),

        changeTodolistTitle: creators.reducer<{todolistId: string; todolistTitle: string}>((state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.todolistId);
            if (todolist) todolist.title = action.payload.todolistTitle;
        }),

        changeTodolistFilter: creators.reducer<{todolistId: string; filter: FilterType}>((state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.todolistId);
            if (todolist) todolist.filter = action.payload.filter;
        }),

        changeTodolistStatus: creators.reducer<{todolistId: string; entityStatus: RequestStatus}>((state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.todolistId);
            if (todolist) todolist.entityStatus = action.payload.entityStatus;
        }),
    }),

    extraReducers: builder => {
        builder.addCase(setIsLoggedIn, (state, action) => {
            if (action.payload.isLoggedIn === false) return [];
        });
    },
});

export const todolistReducer = todolistSlice.reducer;
export const {
    setTodolist,
    addTodolist,
    removeTodolist,
    changeTodolistTitle,
    changeTodolistFilter,
    changeTodolistStatus,
} = todolistSlice.actions;
export const selectTodolist = todolistSlice.selectors.selectTodolist;

//Thunks
//Отправить все списка задач
export const setTodolistTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    todolistApi.getTodolist().then(res => {
        dispatch(setAppStatus({status: "succeeded"}));
        dispatch(setTodolist({todolist: res.data}));
    });
};

//Добавить список задач
export const addTodolistTC = (todolistTitle: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    todolistApi
        .addTodolist(todolistTitle)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: "succeeded"}));
                dispatch(addTodolist({todolist: res.data.data.item}));
            } else handleAppError(dispatch, res.data);
        })
        .catch(err => handleServerError(dispatch, err.message));
};

//Удалить список задач
export const removeTodolistTC = (todolistId: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    dispatch(changeTodolistStatus({todolistId, entityStatus: "loading"}));
    todolistApi
        .removeTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: "succeeded"}));
                dispatch(removeTodolist({todolistId}));
            } else handleAppError(dispatch, res.data);
        })
        .catch(err => {
            handleServerError(dispatch, err.message);
            dispatch(changeTodolistStatus({todolistId, entityStatus: "failed"}));
        });
};

//Изменить заголовок списка задач
export const changeTodolistTitleTC =
    (payload: {todolistId: string; todolistTitle: string}) => (dispatch: AppDispatch) => {
        dispatch(setAppStatus({status: "loading"}));
        dispatch(changeTodolistStatus({todolistId: payload.todolistId, entityStatus: "loading"}));
        todolistApi
            .changeTodolist(payload)
            .then(res => {
                if (res.data.resultCode === ResultCode.Success) {
                    dispatch(setAppStatus({status: "succeeded"}));
                    dispatch(changeTodolistStatus({todolistId: payload.todolistId, entityStatus: "idle"}));
                    dispatch(changeTodolistTitle(payload));
                } else handleAppError(dispatch, res.data);
            })
            .catch(err => {
                handleServerError(dispatch, err.message);
                dispatch(changeTodolistStatus({todolistId: payload.todolistId, entityStatus: "failed"}));
            });
    };
