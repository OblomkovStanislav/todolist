import {Route, Routes} from "react-router";
import {Main} from "../../app/Main";
import {Login} from "../../features/auth/ui/Login/Login";
import React from "react";
import {Page404} from "common/components/Page404/Page404";

//Объект с маршрутами по приложению
export const Path = {
    Main: "/",
    Login: "/Login",
    NotFound: "*",
} as const;

//Компонент с маршрутами по приложению
export const Routing = () => {
    return (
        <Routes>
            <Route path={Path.Main} element={<Main />} />
            <Route path={Path.Login} element={<Login />} />
            <Route path={Path.NotFound} element={<Page404 />} />
        </Routes>
    );
};
