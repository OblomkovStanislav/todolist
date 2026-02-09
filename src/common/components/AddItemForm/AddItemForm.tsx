import React, {ChangeEvent, useState} from "react";
import {Button, Stack} from "@mui/material";
import type {RequestStatus} from "../../../app/appSlice";
import {TextFieldStyled} from "common/components";

//Типизация props
type AddItemFormProps = {
    addItem: (title: string) => void; //Типизация функции добавления элемента
    entityStatus?: RequestStatus; //Типизация статуса компонента
};

//Компонента добавления элемента
export const AddItemForm = ({addItem, entityStatus}: AddItemFormProps) => {
    const [newTitleItem, setNewTitleItem] = useState(""); //Состояние заголовка нового элемента
    const [error, setError] = useState<string | null>(null); //Состояние ошибки

    //Обработчик ввода нового значения элемента
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitleItem(event.currentTarget.value);
    };

    //Обработчик добавления элемента по нажатию кнопки
    const addItemHandler = (titleTask: string) => {
        if (titleTask.trim() !== "") {
            addItem(titleTask.trim());
            setNewTitleItem("");
        } else setError("Поле обязательно для заполнения");
    };

    //Обработчик добавления элемента по нажатию на "Enter"
    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter") addItemHandler(newTitleItem);
        setError(null);
    };

    return (
        <div>
            <Stack direction={"row"} alignItems={"start"} spacing={1}>
                <TextFieldStyled
                    id="outlined-basic"
                    label="Заголовок"
                    variant="outlined"
                    size="small"
                    value={newTitleItem}
                    error={!!error}
                    helperText={error}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyDownHandler}
                    disabled={entityStatus === "loading"}
                />

                <Button
                    variant="contained"
                    size="medium"
                    onClick={() => addItemHandler(newTitleItem)}
                    disabled={entityStatus === "loading"}>
                    +
                </Button>
            </Stack>
        </div>
    );
};
