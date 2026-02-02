import Snackbar, {SnackbarCloseReason} from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {type SyntheticEvent} from "react";
import {useSelector} from "react-redux";
import {selectError} from "../../../app/app-selectors";
import {useAppDispatch} from "common/hooks";
import {setAppErrorAC} from "../../../app/app-reducer";

//Компонент уведомления об ошибке
export const ErrorSnackbar = () => {
    const error = useSelector(selectError); //Селектор ошибки
    const dispatch = useAppDispatch();

    //Обработчик закрытия уведомления об ошибке
    const handleClose = (_?: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === "clickaway") {
            return;
        }

        dispatch(setAppErrorAC(null));
    };

    return (
        <div>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" variant="filled" sx={{width: "100%"}}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};
