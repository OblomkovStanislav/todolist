import {AddTodolistAT, RemoveTodolistAT} from "./todolist-reducer";
import type {AppDispatch, RootState} from "../../../app/store";
import {taskApi} from "../api/taskApi";
import type {DomainTask, UpdateTaskModel} from "../api/taskApi.types";
import {setAppStatusAC} from "../../../app/app-reducer";
import {handleAppError, handleServerError} from "common/utils";
import {ResultCode} from "../lib/enums";

//Инициализационные значения state
const initialState: TasksType = {};

//Reducer задач
export const tasksReducer = (state: TasksType = initialState, action: ActionType): TasksType => {
    switch (action.type) {
        //Отправить задачи
        case "SET-TASKS": {
            const {todolistId, tasks} = action.payload;
            return {...state, [todolistId]: tasks};
        }

        //Добавить задачу
        case "ADD-TASK": {
            const task = action.payload.task;
            return {...state, [task.todoListId]: [task, ...state[task.todoListId]]};
        }

        //Удалить задачу
        case "REMOVE-TASK": {
            const {todolistId, taskId} = action.payload;
            return {...state, [todolistId]: state[todolistId].filter(task => task.id !== taskId)};
        }

        //Изменить задачу
        case "CHANGE-TASK": {
            const {todolistId, taskId, model} = action.payload;
            return {
                ...state,
                [todolistId]: state[todolistId].map(task =>
                    task.id === taskId
                        ? {
                              ...task,
                              title: model.title !== undefined ? model.title : task.title,
                              status: model.status !== undefined ? model.status : task.status,
                          }
                        : task,
                ),
            };
        }

        //Добавить список задач
        case "ADD-TODOLIST": {
            const todolist = action.payload.todolist;
            return {...state, [todolist.id]: []};
        }

        //Удалить список задач
        case "REMOVE-TODOLIST": {
            const {todolistId} = action.payload;
            delete state[todolistId];
            return {...state};
        }

        default:
            return state;
    }
};

//Action Creators
//Отправить задачи
export const setTasksAC = (payload: {todolistId: string; tasks: DomainTask[]}) => {
    return {
        type: "SET-TASKS",
        payload,
    } as const;
};

//Добавить задачу
export const addTaskAC = (task: DomainTask) => {
    return {
        type: "ADD-TASK",
        payload: {
            task,
        },
    } as const;
};

//Удалить задачу
export const removeTaskAC = (payload: {todolistId: string; taskId: string}) => {
    return {
        type: "REMOVE-TASK",
        payload,
    } as const;
};

//Изменить задачу
export const changeTaskAC = (payload: {todolistId: string; taskId: string; model: UpdateTaskModel}) => {
    return {
        type: "CHANGE-TASK",
        payload,
    } as const;
};

//Thunks
//Отправить все задачи
export const setTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"));
    taskApi.getTasks(todolistId).then(res => {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(setTasksAC({todolistId, tasks: res.data.items}));
    });
};

//Добавить задачу
export const addTaskTC = (payload: {todolistId: string; taskTitle: string}) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"));
    taskApi
        .addTask(payload)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC("succeeded"));
                dispatch(addTaskAC(res.data.data.item));
            } else handleAppError(dispatch, res.data);
        })
        .catch(err => handleServerError(dispatch, err.message));
};

//Удалить задачу
export const removeTaskTC = (payload: {todolistId: string; taskId: string}) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"));
    taskApi
        .removeTask(payload)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC("succeeded"));
                dispatch(removeTaskAC(payload));
            } else handleAppError(dispatch, res.data);
        })
        .catch(err => handleServerError(dispatch, err.message));
};

//Изменить задачу
export const changeTaskTC =
    (payload: {todolistId: string; taskId: string; domainModel: UpdateTaskModel}) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setAppStatusAC("loading"));
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

            console.log(model);

            taskApi
                .changeTask({todolistId, taskId, model})
                .then(res => {
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatusAC("succeeded"));
                        dispatch(changeTaskAC({todolistId, taskId, model}));
                    } else handleAppError(dispatch, res.data);
                })
                .catch(err => handleServerError(dispatch, err.message));
        }
    };

//Типизация
export type TasksType = {[todolistId: string]: DomainTask[]}; //Типизация всех задач
type setTasksAT = ReturnType<typeof setTasksAC>;
type AddTaskAT = ReturnType<typeof addTaskAC>;
type RemoveTaskAT = ReturnType<typeof removeTaskAC>;
type ChangeTaskStatusAT = ReturnType<typeof changeTaskAC>;
type ActionType = setTasksAT | AddTaskAT | RemoveTaskAT | ChangeTaskStatusAT | AddTodolistAT | RemoveTodolistAT;
