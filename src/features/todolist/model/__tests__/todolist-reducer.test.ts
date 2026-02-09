import {v1} from "uuid";
import {
    addTodolist,
    type DomainTodolist,
    removeTodolist,
    todolistReducer,
    changeTodolistTitle,
    changeTodolistFilter,
} from "../todolistSlice";

let todolistId1: string;
let todolistId2: string;
let startState: DomainTodolist[] = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 1, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 1, entityStatus: "idle"},
    ];
});

test("correct todolist should be created", () => {
    const todolist: DomainTodolist = {
        id: "todolistId3",
        title: "New todolist",
        addedDate: "",
        order: 1,
        filter: "all",
        entityStatus: "idle",
    };

    const endState = todolistReducer(startState, addTodolist({todolist}));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("New todolist");
});

test("correct todolist should be deleted", () => {
    const endState = todolistReducer(startState, removeTodolist({todolistId: todolistId1}));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should change its title", () => {
    const newTitle = "New TodolistItem";
    const endState = todolistReducer(
        startState,
        changeTodolistTitle({todolistId: todolistId2, todolistTitle: newTitle}),
    );

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTitle);
});

test("correct todolist should change its filter", () => {
    const newFilter = "completed";
    const endState = todolistReducer(startState, changeTodolistFilter({todolistId: todolistId2, filter: newFilter}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
