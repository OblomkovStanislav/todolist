import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    type DomainTodolist,
    removeTodolistAC,
    todolistReducer,
} from "../todolist-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: DomainTodolist[] = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 1},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 1},
    ];
});

test("correct todolist should be created", () => {
    const todolist: DomainTodolist = {
        id: "todolistId3",
        title: "New todolist",
        addedDate: "",
        order: 1,
        filter: "all",
    };

    const endState = todolistReducer(startState, addTodolistAC(todolist));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("New todolist");
});

test("correct todolist should be deleted", () => {
    const endState = todolistReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should change its title", () => {
    const newTitle = "New TodolistItem";
    const endState = todolistReducer(
        startState,
        changeTodolistTitleAC({todolistId: todolistId2, todolistTitle: newTitle}),
    );

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTitle);
});

test("correct todolist should change its filter", () => {
    const newFilter = "completed";
    const endState = todolistReducer(startState, changeTodolistFilterAC({todolistId: todolistId2, filter: newFilter}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
