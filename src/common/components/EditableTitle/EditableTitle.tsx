import React, {ChangeEvent, useState} from "react";
import {IconButton, Input, Stack} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import type {RequestStatus} from "../../../app/app-reducer";

//Типизация props
type EditableTitleProps = {
    title: string; //Типизация заголовка
    removeTask: () => void; //Типизация функции удаления ???
    changeTitleItem: (title: string) => void; //Типизация функции изменения заголовка
    entityStatus: RequestStatus; //Типизация статуса компонента
};

//Компонент редактирования заголовка
export const EditableTitle = ({title, removeTask, changeTitleItem, entityStatus}: EditableTitleProps) => {
    const [editMode, setEditMode] = useState(false); //Состояние режима редактирования
    const [titleItem, setTitleItem] = useState(title); //Состояние нового заголовка элемента

    const onEditMode = () => setEditMode(true); //Функция включения режима редактирования

    //Функция выключения режима редактирования
    const offEditMode = () => {
        if (titleItem.trim() !== "") changeTitleItem(titleItem.trim());
        setEditMode(false);
    };

    //Функция ввода нового значения элемента
    const setNewTitleItem = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleItem(event.currentTarget.value);
    };

    return editMode ? (
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Input
                defaultValue="Hello world"
                value={titleItem}
                autoFocus={true}
                sx={{color: "#fff"}}
                onBlur={offEditMode}
                onChange={setNewTitleItem}
            />

            <IconButton aria-label="apply" size="large" sx={{color: "#00a86b"}} onClick={offEditMode}>
                <DoneIcon fontSize="inherit" />
            </IconButton>
        </Stack>
    ) : (
        <Stack direction={"row"} alignItems={"center"} width={"100%"} justifyContent={"space-between"} spacing={0}>
            <span onDoubleClick={onEditMode}>{title}</span>

            <Stack direction={"row"} alignItems={"center"} spacing={0}>
                <IconButton
                    aria-label="edit"
                    size="small"
                    sx={{color: "#ff7f49"}}
                    onClick={onEditMode}
                    disabled={entityStatus === "loading"}>
                    <EditIcon />
                </IconButton>

                <IconButton
                    aria-label="delete"
                    size="small"
                    sx={{color: "#d5265b"}}
                    onClick={removeTask}
                    disabled={entityStatus === "loading"}>
                    <DeleteIcon />
                </IconButton>
            </Stack>
        </Stack>
    );
};
