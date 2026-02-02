import React from "react";
import {CircularProgress} from "@mui/material";
import {CircularProgressContainerStyled} from "common/components";

export const CircularProgressContainer = () => {
    return (
        <CircularProgressContainerStyled>
            <CircularProgress size={150} thickness={3} />
        </CircularProgressContainerStyled>
    );
};
