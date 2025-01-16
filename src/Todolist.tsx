import React from 'react';
import {FilterType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableTitle} from "./components/EditableTitle";
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Checkbox,
    List,
    ListItem,
    Paper,
    styled,
} from "@mui/material";
import RuleIcon from '@mui/icons-material/Rule';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {blue, green} from "@mui/material/colors";

//Типизация задачи
export type TaskType = {
    id: string; //Идентификатор задачи
    title: string; //Заголовок задачи
    isDone: boolean; //Флаг выполнена задача или нет
}

//Типизация пропсов списка дел
type TodolistPropsType = {
    id: string; //Идентификатор списка дел
    title: string; //Заголовок списка дел
    tasks: TaskType[]; //Список задач
    filter: FilterType; //Фильтр списка дел

    removeTodolist: (idTodolist: string) => void; //Метод удаления списка дел
    changeTodolistTitle: (idTodolist: string, titleTodolist: string) => void; //Метод изменения заголовка списка дел
    changeTodolistFilter: (idTodolist: string, filter: FilterType) => void; //Метод изменения фильтра списка дел
    addTask: (idTodolist: string, titleTask: string) => void; //Метод добавления новой задачи
    removeTask: (idTodolist: string, idTask: string) => void; //Метод удаления одной задачи
    changeTaskTitle: (idTodolist: string, idTask: string, titleTask: string) => void; //Метод изменения заголовка задачи
    changeTaskStatus: (idTodolist: string, idTask: string, isDone: boolean) => void; //Метод изменения статуса выполнения задачи
}

const TaskPaper = styled(Paper)({
    color: "#fff",
    background: "#1c1c1c",
    borderRadius: "10px",
    boxShadow: "0px 0px 5px 5px rgba(0, 0, 0, 0.5)"
})

//Компонента списка задач
export const Todolist = (props: TodolistPropsType) => {
    const {
        id,
        title,
        tasks,
        filter,

        removeTodolist,
        changeTodolistTitle,
        changeTodolistFilter,
        addTask,
        removeTask,
        changeTaskTitle,
        changeTaskStatus
    } = props;

    const [value, setValue] = React.useState(0);

    const removeTodolistHandler = () => {removeTodolist(id)}
    const changeTodolistTitleHandler = (titleTodolist: string) => {changeTodolistTitle(id, titleTodolist);} //Обработчик изменения заголовка списка дел
    const addTaskHandler = (titleTask: string) => addTask(id, titleTask); //Обработчик добавления новой задачи
    const changeTodolistFilterHandler = (filter: FilterType) => {changeTodolistFilter(id, filter);} //Обработчик изменения фильтра списка дел

    //Функция отрисовки списка задач
    const drawTasks = () => {
        return (
            tasks.length === 0
                ? <span>There are no tasks</span>
                : <List>
                    {tasks.map((task) => {
                        return (
                            <ListItem key={task.id} disablePadding sx={{opacity: task.isDone ? 0.7 : 1, height: "100%", borderBottom: "solid 1px #333"}}>
                                <Checkbox
                                    sx={{
                                        color: blue[800],
                                        '&.Mui-checked': {color: green[800]}
                                }}
                                    checked={task.isDone}
                                    onChange={(event) => changeTaskStatus(id, task.id, event.currentTarget.checked)}/>

                                <EditableTitle
                                    title={task.title}
                                    removeTask={() => removeTask(id, task.id)}
                                    changeTitleItem={(title) => changeTaskTitle(id, task.id, title)}
                                />
                            </ListItem>
                        )
                    })}
                </List>
        )
    }

    return (
        <TaskPaper elevation={3} sx={{p: "15px"}}>
            <EditableTitle title={title} removeTask={removeTodolistHandler} changeTitleItem={changeTodolistTitleHandler}/>

            <AddItemForm addItem={addTaskHandler}/>

            <Box>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    sx={{background: "transparent"}}
                >
                    <BottomNavigationAction label="All" icon={<RuleIcon/>} onClick={() => changeTodolistFilterHandler("all")} sx={{color: "#fff"}}/>
                    <BottomNavigationAction label="Active" icon={<CrisisAlertIcon/>} onClick={() => changeTodolistFilterHandler("active")} sx={{color: "#fff"}}/>
                    <BottomNavigationAction label="Completed" icon={<TaskAltIcon/>} onClick={() => changeTodolistFilterHandler("completed")} sx={{color: "#fff"}}/>
                </BottomNavigation>
            </Box>

            {drawTasks()}
        </TaskPaper>
    );
};