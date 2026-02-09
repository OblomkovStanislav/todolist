import {taskApi} from "../api/taskApi";
import type {DomainTask, UpdateTaskModel} from "../api/taskApi.types";
import {handleAppError, handleServerError} from "common/utils";
import {ResultCode} from "../lib/enums";
import {setAppStatus} from "../../../app/appSlice";
import {createSlice} from "@reduxjs/toolkit";
import {addTodolist, removeTodolist} from "./todolistSlice";
import type {AppDispatch, RootState} from "../../../app/store";
import {setIsLoggedIn} from "../../auth/model/authSlice";

export type TasksType = {[todolistId: string]: DomainTask[]}; //Типизация всех задач

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: {} as TasksType,

    selectors: {
        selectTasks: sliceState => sliceState,
    },

    reducers: creators => ({
        setTasks: creators.reducer<{todolistId: string; tasks: DomainTask[]}>((state, action) => {
            state[action.payload.todolistId] = action.payload.tasks;
        }),

        addTask: creators.reducer<{task: DomainTask}>((state, action) => {
            state[action.payload.task.todoListId].push(action.payload.task);
        }),

        removeTask: creators.reducer<{todolistId: string; taskId: string}>((state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(task => task.id === action.payload.taskId);
            if (index !== -1) tasks.splice(index, 1);
        }),

        changeTask: creators.reducer<{todolistId: string; taskId: string; model: UpdateTaskModel}>((state, action) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId);
            if (task) {
                if (action.payload.model.title !== undefined) task.title = action.payload.model.title;
                if (action.payload.model.status !== undefined) task.status = action.payload.model.status;
            }
        }),
    }),
    extraReducers: builder => {
        builder
            .addCase(addTodolist, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(removeTodolist, (state, action) => {
                delete state[action.payload.todolistId];
            })
            .addCase(setIsLoggedIn, (state, action) => {
                if (action.payload.isLoggedIn === false) return {};
            });
    },
});

export const tasksReducer = tasksSlice.reducer;
export const {setTasks, addTask, removeTask, changeTask} = tasksSlice.actions;
export const selectTasks = tasksSlice.selectors.selectTasks;

//Thunks
//Отправить все задачи
export const setTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    taskApi.getTasks(todolistId).then(res => {
        dispatch(setAppStatus({status: "succeeded"}));
        dispatch(setTasks({todolistId, tasks: res.data.items}));
    });
};

//Добавить задачу
export const addTaskTC = (payload: {todolistId: string; taskTitle: string}) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    taskApi
        .addTask(payload)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: "succeeded"}));
                dispatch(addTask({task: res.data.data.item}));
            } else handleAppError(dispatch, res.data);
        })
        .catch(err => handleServerError(dispatch, err.message));
};

//Удалить задачу
export const removeTaskTC = (payload: {todolistId: string; taskId: string}) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    taskApi
        .removeTask(payload)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: "succeeded"}));
                dispatch(removeTask(payload));
            } else handleAppError(dispatch, res.data);
        })
        .catch(err => handleServerError(dispatch, err.message));
};

//Изменить задачу
export const changeTaskTC =
    (payload: {todolistId: string; taskId: string; domainModel: UpdateTaskModel}) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setAppStatus({status: "loading"}));
        let {todolistId, taskId, domainModel} = payload;

        const task = getState().tasks[todolistId].find(task => task.id === taskId);

        if (task) {
            const model: UpdateTaskModel = {
                title: domainModel.title !== undefined ? domainModel.title : task.title,
                description: task.description,
                status: domainModel.status !== undefined ? domainModel.status : task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            };

            taskApi
                .changeTask({todolistId, taskId, model})
                .then(res => {
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatus({status: "succeeded"}));
                        dispatch(changeTask({todolistId, taskId, model}));
                    } else handleAppError(dispatch, res.data);
                })
                .catch(err => handleServerError(dispatch, err.message));
        }
    };
