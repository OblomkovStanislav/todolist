import {TasksType, TodolistType} from "../App";
import {addTodolistAC, todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

test("ids should be equals", () => {
    const startTasksState: TasksType = {};
    const startTodolistState: TodolistType[] = [];

    const action = addTodolistAC({todolistTitle: "new todolist"});

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistState = todolistReducer(startTodolistState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolist = endTodolistState[0].id;

    expect(idFromTasks).toBe(action.payload.todolistId);
    expect(idFromTodolist).toBe(action.payload.todolistId);
})