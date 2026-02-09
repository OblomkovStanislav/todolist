import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid} from "@mui/material";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import s from "./Login.module.css";
import type {LoginArgs} from "../../api/authApi.types";
import {useAppDispatch, useAppSelector} from "common/hooks";
import {loginTC, selectIsLoggedIn} from "../../model/authSlice";
import {Navigate} from "react-router";
import {Path} from "common/routing";
import {TextFieldStyled} from "common/components/TextFieldStyled/TextFieldStyled";

//Компонент авторизации в приложении
export const Login = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn); //Селектор состояния авторизации пользователя
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        control,
    } = useForm<LoginArgs>();

    //Функция авторизации в приложении
    const onSubmit: SubmitHandler<LoginArgs> = data => {
        dispatch(loginTC(data));
        reset();
    };

    //Если пользователь авторизирован, то перенаправить его на главную страницу
    if (isLoggedIn) {
        return <Navigate to={Path.Main} />;
    }

    return (
        <Grid container justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
                <FormControl>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <TextFieldStyled
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                type={"email"}
                                label="Email"
                                margin="normal"
                                {...register("email", {
                                    required: "Введите e-mail",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Некорректный формат e-mail",
                                    },
                                })}
                            />

                            {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}

                            <TextFieldStyled
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                type="password"
                                label="Пароль"
                                margin="normal"
                                {...register("password", {
                                    required: "Введите пароль",
                                    minLength: {value: 6, message: "Пароль должен быть длиной не менее 6 символов"},
                                })}
                            />

                            {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}

                            <FormControlLabel
                                label={"Remember me"}
                                control={
                                    <Controller
                                        name={"rememberMe"}
                                        control={control}
                                        render={({field: {onChange, value}}) => (
                                            <Checkbox onChange={e => onChange(e.target.checked)} checked={value} />
                                        )}
                                    />
                                }
                            />

                            <Button type={"submit"} variant={"contained"} color={"primary"}>
                                Войти
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Grid>
        </Grid>
    );
};
