import {RootState} from "../../../app/store";
import {TasksType} from "./tasks-reducer";

//Селекторы задач
export const selectTasks = (state: RootState): TasksType => state.tasks;
