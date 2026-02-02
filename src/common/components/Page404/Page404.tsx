import {Page404Styled, Page404SubTitle, Page404Title} from "./Page404Styled";
import {Button} from "@mui/material";
import {Link} from "react-router";
import {Path} from "common/routing";

//Компонент ошибки 404
export const Page404 = () => {
    return (
        <Page404Styled>
            <Page404Title>404</Page404Title>
            <Page404SubTitle>Страницы не существует</Page404SubTitle>
            <Button component={Link} to={Path.Main} variant="contained" size="medium" sx={{mt: "50px"}}>
                Главная
            </Button>
        </Page404Styled>
    );
};
