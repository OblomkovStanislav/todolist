import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid2, IconButton, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./model/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./model/tasks-reducer";

export type FilterType = "all" | "active" | "completed"; //Тип со значениями фильтра

//Типизация одного списка дел
export type TodolistType = {
    id: string; //Идентификатор списка дел
    title: string; //Заголовок списка дел
    filter: FilterType; //Фильтр списка дел
}

export type TasksType = {[todolistId: string]: TaskType[];} //Типизация всех задач

function App() {
    //Идентификаторы списков дел
    const todolistId1: string = v1();
    const todolistId2: string = v1();

    //Списки дел
    const [todolist, dispatchToTodolist] = useReducer(todolistReducer, [
        {id: todolistId1, title: "FrontEnd", filter: "all"},
        {id: todolistId2, title: "Shopping", filter: "all"}
    ]);

    //Все задачи
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]:[
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],

        [todolistId2]:[
            {id: v1(), title: "Coca-cola", isDone: true},
            {id: v1(), title: "Pepsi", isDone: true},
            {id: v1(), title: "Santa", isDone: false}
        ]
    });

    //Функция добавления списка дел
    const addTodolist = (todolistTitle: string) => {
        const action = addTodolistAC({todolistTitle});
        dispatchToTodolist(action);
        dispatchToTasks(action);
    }

    //Функция удаления списка дел
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC({todolistId});
        dispatchToTodolist(action);
        dispatchToTasks(action);
    }

    //Функция изменения заголовка списка дел
    const changeTodolistTitle = (todolistId: string, todolistTitle: string) => {
        dispatchToTodolist(changeTodolistTitleAC({todolistId, todolistTitle}));
    }

    //Функция изменения фильтра списка дел
    const changeTodolistFilter = (todolistId: string, filter: FilterType) => {
        dispatchToTodolist(changeTodolistFilterAC({todolistId, filter}));
    }

    //Функция добавления новой задачи
    const addTask = (todolistId: string, taskTitle: string) => {
        dispatchToTasks(addTaskAC({todolistId: todolistId, taskTitle}));
    }

    //Функция удаления задачи
    const removeTask = (todolistId: string, taskId: string) => {
        dispatchToTasks(removeTaskAC({todolistId: todolistId, taskId}));
    }

    //Функция изменения заголовка задачи
    const changeTaskTitle = (todolistId: string, taskId: string, taskTitle: string) => {
        dispatchToTasks(changeTaskTitleAC({todolistId: todolistId, taskId, taskTitle}));
    }

    //Функция изменения статуса выполнения задачи
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC({todolistId: todolistId, taskId, isDone: isDone}));
    }

    //Функция получающая отфильтрованный список дел
    const getFilterForTasks = (todolistId: string, filter: FilterType) => {
        switch (filter) {
            case "active": return tasks[todolistId].filter(task => !task.isDone);
            case "completed": return tasks[todolistId].filter(task => task.isDone);
            default: return tasks[todolistId].map(task => task);
        }
    }

    //Функция возвращающая компоненты списков дел
    const getTodolistComponents = todolist.map((tl) => {
        return (
            <Grid2 key={tl.id}>
                <Todolist
                    id={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={getFilterForTasks(tl.id, tl.filter)}

                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    changeTodolistFilter={changeTodolistFilter}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskTitle={changeTaskTitle}
                    changeTaskStatus={changeTaskStatus}
                />
            </Grid2>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Button color="inherit">Sign in</Button>
                </Toolbar>
            </AppBar>

            <Container>
                <Grid2 container justifyContent={"center"} spacing={4} sx={{p: "30px 0"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid2>

                <Grid2 container justifyContent={"center"} spacing={4}>
                    {getTodolistComponents}
                </Grid2>
            </Container>
        </div>
    );
}

export default App;
