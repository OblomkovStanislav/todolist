import {Container, Grid2} from "@mui/material";
import {AddItemForm} from "common/components";
import React from "react";
import {addTodolistTC} from "../features/todolist/model/todolist-reducer";
import {useAppDispatch, useAppSelector} from "common/hooks";
import {Todolist} from "../features/todolist/ui/Todolist/Todolist";
import {Navigate} from "react-router";
import {Path} from "common/routing";
import {selectIsLoggedIn} from "../features/auth/model/auth-selectors";

//Основной компонент приложения
export const Main = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn); //Селектор флага авторизации пользователя
    const dispatch = useAppDispatch();

    //Функция добавления списка дел
    const addTodolist = (todolistTitle: string) => dispatch(addTodolistTC(todolistTitle));

    //Если пользователь не авторизирован, то перенаправить его на страницу авторизации
    if (!isLoggedIn) {
        return <Navigate to={Path.Login} />;
    }

    return (
        <Container>
            <Grid2 container justifyContent={"center"} spacing={4} sx={{p: "30px 0"}}>
                <AddItemForm addItem={addTodolist} />
            </Grid2>

            <Grid2 container justifyContent={"center"} spacing={4}>
                <Todolist />
            </Grid2>
        </Container>
    );
};
