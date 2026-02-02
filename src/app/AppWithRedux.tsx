import React, {useEffect} from "react";
import "./App.css";
import {Header} from "common/components/Header/Header";
import {CircularProgressContainer, ErrorSnackbar} from "common/components";
import {Routing} from "common/routing";
import {useAppDispatch, useAppSelector} from "common/hooks";
import {initializedTC} from "../features/auth/model/auth-reducer";
import {selectIsInitialized} from "../features/auth/model/auth-selectors";

function AppWithRedux() {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(selectIsInitialized);

    useEffect(() => {
        dispatch(initializedTC());
    }, []);

    if (!isInitialized) {
        return <CircularProgressContainer />;
    }

    return (
        <div className="App">
            <Header />
            <Routing />
            <ErrorSnackbar />
        </div>
    );
}

export default AppWithRedux;
