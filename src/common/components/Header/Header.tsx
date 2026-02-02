import {AppBar, Box, Button, IconButton, LinearProgress, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import {selectStatus} from "../../../app/app-selectors";
import {useAppDispatch, useAppSelector} from "common/hooks";
import {logoutTC} from "../../../features/auth/model/auth-reducer";
import {selectIsLoggedIn} from "../../../features/auth/model/auth-selectors";

//Компонент шапки приложения
export const Header = () => {
    const status = useAppSelector(selectStatus); //Селектор статуса приложения
    const isLoggedIn = useAppSelector(selectIsLoggedIn); //Селектор состояния авторизации пользователя
    const dispatch = useAppDispatch();

    const handleLogout = () => dispatch(logoutTC()); //Обработчик разавторизации пользователя

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{flexGrow: 1}}>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                </Box>

                {isLoggedIn && (
                    <Button color="inherit" onClick={handleLogout}>
                        Выход
                    </Button>
                )}
            </Toolbar>

            {status === "loading" && <LinearProgress />}
        </AppBar>
    );
};
