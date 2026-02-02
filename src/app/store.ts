import {applyMiddleware, combineReducers, legacy_createStore as createStore, type UnknownAction} from "redux";
import {tasksReducer} from "../features/todolist/model/tasks-reducer";
import {todolistReducer} from "../features/todolist/model/todolist-reducer";
import {thunk, type ThunkDispatch} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/auth/model/auth-reducer";

//Объект всех reducers приложения
const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    tasks: tasksReducer,
    todolist: todolistReducer,
});

//Хранилище состояний приложения
export const store = createStore(rootReducer, {}, applyMiddleware(thunk));

//Типизация
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

// @ts-ignore
window.store = store;
