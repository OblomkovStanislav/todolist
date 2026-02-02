import {addTaskAC, changeTaskAC, removeTaskAC, tasksReducer, TasksType} from "../tasks-reducer";
import {addTodolistAC, type DomainTodolist, removeTodolistAC} from "../todolist-reducer";
import {TaskPriority, TaskStatus} from "../../lib/enums";
import type {DomainTask, UpdateTaskModel} from "../../api/taskApi.types";

let startState: TasksType = {};

beforeEach(() => {
    startState = {
        todolistId1: [
            {
                description: "",
                title: "CSS",
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                id: "1",
                todoListId: "todolistId1",
                order: 1,
                addedDate: "",
            },

            {
                description: "",
                title: "JS",
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                id: "2",
                todoListId: "todolistId1",
                order: 1,
                addedDate: "",
            },

            {
                description: "",
                title: "React",
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                id: "3",
                todoListId: "todolistId1",
                order: 1,
                addedDate: "",
            },
        ],

        todolistId2: [
            {
                description: "",
                title: "bread",
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                id: "1",
                todoListId: "todolistId2",
                order: 1,
                addedDate: "",
            },

            {
                description: "",
                title: "milk",
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                id: "2",
                todoListId: "todolistId2",
                order: 1,
                addedDate: "",
            },

            {
                description: "",
                title: "tea",
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                id: "3",
                todoListId: "todolistId2",
                order: 1,
                addedDate: "",
            },
        ],
    };
});

test("array should be created for new todolist", () => {
    const task: DomainTask = {
        description: "",
        title: "juice",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        id: "4",
        todoListId: "todolistId2",
        order: 1,
        addedDate: "",
    };

    const endState = tasksReducer(startState, addTaskAC(task));

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TaskStatus.New);
});

test("correct task should be deleted from correct array", () => {
    const endState = tasksReducer(startState, removeTaskAC({todolistId: "todolistId2", taskId: "2"}));

    expect(endState).toEqual({
        todolistId1: [
            {
                description: "",
                title: "CSS",
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                id: "1",
                todoListId: "todolistId1",
                order: 1,
                addedDate: "",
            },

            {
                description: "",
                title: "JS",
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                id: "2",
                todoListId: "todolistId1",
                order: 1,
                addedDate: "",
            },

            {
                description: "",
                title: "React",
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                id: "3",
                todoListId: "todolistId1",
                order: 1,
                addedDate: "",
            },
        ],

        todolistId2: [
            {
                description: "",
                title: "bread",
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                id: "1",
                todoListId: "todolistId2",
                order: 1,
                addedDate: "",
            },

            {
                description: "",
                title: "tea",
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                id: "3",
                todoListId: "todolistId2",
                order: 1,
                addedDate: "",
            },
        ],
    });
});

test("title of specified task should be changed", () => {
    const model: UpdateTaskModel = {
        title: "juice",
        description: "",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
    };

    const endState = tasksReducer(startState, changeTaskAC({todolistId: "todolistId2", taskId: "2", model}));

    expect(endState["todolistId2"][1].title).toBe("juice");
    expect(endState["todolistId1"][1].status).toBe(TaskStatus.New);
});

test("status of specified task should be changed", () => {
    const model: UpdateTaskModel = {
        title: "milk",
        description: "",
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
    };

    const endState = tasksReducer(startState, changeTaskAC({todolistId: "todolistId2", taskId: "2", model}));

    expect(endState["todolistId2"][1].status).toBe(TaskStatus.Completed);
    expect(endState["todolistId1"][1].status).toBe(TaskStatus.New);
});

test("new array should be added when new todolist is added", () => {
    const todolist: DomainTodolist = {
        id: "todolistId3",
        title: "New todolist",
        addedDate: "",
        order: 1,
        filter: "all",
        entityStatus: "succeeded",
    };

    const endState = tasksReducer(startState, addTodolistAC(todolist));

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added");
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
    const endState = tasksReducer(startState, removeTodolistAC("todolistId2"));

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
    expect(endState["todolistId2"]).toBeUndefined();
});
