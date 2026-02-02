/*Стили поля ввода*/
import {styled, TextField} from "@mui/material";

export const TextFieldStyled = styled(TextField)({
    input: {
        color: "#fff",
    },
    label: {color: "#fff"},

    "& label.Mui-focused": {
        color: "#1976d2",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#fff",
        },
        "&:hover fieldset": {
            borderColor: "#1976d2",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#1976d2",
        },
    },
});
