import {RootState} from "../../../app/store";
import type {DomainTodolist} from "./todolist-reducer";

//Селекторы списков задач
export const selectTodolist = (state: RootState): DomainTodolist[] => state.todolist;
