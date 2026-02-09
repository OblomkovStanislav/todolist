import React, {useState} from "react";
import {changeTodolistFilter, type DomainTodolist, FilterType} from "../../../../model/todolistSlice";
import {useAppDispatch} from "common/hooks";
import {BottomNavigation, BottomNavigationAction, Box} from "@mui/material";
import RuleIcon from "@mui/icons-material/Rule";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

//Типизация props
type FilterButtonsProps = {todolist: DomainTodolist};

//Компонент списка задач
export const FilterButtons = ({todolist}: FilterButtonsProps) => {
    const [value, setValue] = useState<Number>(0);
    const dispatch = useAppDispatch();

    //Функция изменения фильтра списка задач
    const changeTodolistFilterHandler = (filter: FilterType) =>
        dispatch(changeTodolistFilter({todolistId: todolist.id, filter})); //Функция изменения фильтра списка дел

    return (
        <Box>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{background: "transparent"}}>
                <BottomNavigationAction
                    label="Все"
                    icon={<RuleIcon />}
                    onClick={() => changeTodolistFilterHandler("all")}
                    sx={{color: "#fff"}}
                />
                <BottomNavigationAction
                    label="Активные"
                    icon={<CrisisAlertIcon />}
                    onClick={() => changeTodolistFilterHandler("active")}
                    sx={{color: "#fff"}}
                />
                <BottomNavigationAction
                    label="Выполненные"
                    icon={<TaskAltIcon />}
                    onClick={() => changeTodolistFilterHandler("completed")}
                    sx={{color: "#fff"}}
                />
            </BottomNavigation>
        </Box>
    );
};
