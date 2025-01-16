import React, {ChangeEvent, useState} from 'react';
import {Button, Stack, styled, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
}

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#1976d2',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#fff',
        },
        '&:hover fieldset': {
            borderColor: '#1976d2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#1976d2',
        },
    },
});

export const AddItemForm = ({addItem}: AddItemFormPropsType) => {
    const[newItemTask, setNewItemTask] = useState(""); //Состояние заголовка новой задачи
    const[error, setError] = useState<string | null>(null);

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewItemTask(event.currentTarget.value);
    }

    const addItemHandler = (titleTask: string) => {
        if (titleTask.trim() !== "") {
            addItem(titleTask.trim());
            setNewItemTask("");
        }
        else setError("Title is required");
    }

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLElement>)=> {
        if (event.key === "Enter") addItemHandler(newItemTask);
        setError(null);
    }

    return (
        <div>
            <Stack direction={"row"} alignItems={"start"} spacing={1}>
                <CssTextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    size="small"
                    value={newItemTask}
                    error={!!error}
                    helperText={error}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyDownHandler}
                    sx={{ input: {color: "#fff"}, label: {color: "#fff"}}}
                />

                <Button variant="contained" size="medium" onClick={() => addItemHandler(newItemTask)}>+</Button>
            </Stack>
        </div>
    );
};