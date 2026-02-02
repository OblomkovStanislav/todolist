import {addTodolistAC, type DomainTodolist, todolistReducer} from "../todolist-reducer";
import {tasksReducer, TasksType} from "../tasks-reducer";

test("ids should be equals", () => {
    const startTasksState: TasksType = {};
    const startTodolistState: DomainTodolist[] = [];

    const todolist: DomainTodolist = {
        id: "todolistId3",
        title: "New todolist",
        addedDate: "",
        order: 1,
        filter: "all",
    };

    const action = addTodolistAC(todolist);

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistState = todolistReducer(startTodolistState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolist = endTodolistState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolist).toBe(action.payload.todolist.id);
});
