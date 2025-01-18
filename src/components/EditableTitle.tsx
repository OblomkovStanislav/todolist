import React, {ChangeEvent, useState} from 'react';
import {IconButton, Input, Stack} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from '@mui/icons-material/Done';

type SpanTaskPropsType = {
    title: string;
    removeTask: () => void;
    changeTitleItem: (title: string) => void;
}

export const EditableTitle = ({title, removeTask, changeTitleItem}: SpanTaskPropsType) => {
    const[editMode, setEditMode] = useState(false);
    const[titleItem, setTitleItem] = useState(title);

    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        if (titleItem.trim() !== "") changeTitleItem(titleItem.trim());
        setEditMode(false);
    }
    const setNewTitleItem = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleItem(event.currentTarget.value);
    }

    return (
            editMode
            ? <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Input defaultValue="Hello world" value={titleItem} autoFocus={true} sx={{ color: "#fff" }} onBlur={offEditMode} onChange={setNewTitleItem}/>

                    <IconButton aria-label="apply" size="large" sx={{color: "#00a86b"}} onClick={offEditMode}>
                        <DoneIcon fontSize="inherit"/>
                    </IconButton>
                </Stack>
                : <Stack direction={"row"} alignItems={"center"} width={"100%"} justifyContent={"space-between"} spacing={0}>
                    <span onDoubleClick={onEditMode}>{title}</span>

                    <Stack direction={"row"} alignItems={"center"} spacing={0}>
                        <IconButton aria-label="edit" size="small" sx={{color: "#ff7f49"}} onClick={onEditMode}>
                            <EditIcon/>
                        </IconButton>

                        <IconButton aria-label="delete" size="small" sx={{color: "#d5265b"}} onClick={removeTask}>
                            <DeleteIcon/>
                        </IconButton>
                    </Stack>
                </Stack>
    );
};