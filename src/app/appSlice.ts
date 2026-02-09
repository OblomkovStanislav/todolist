import {createSlice} from "@reduxjs/toolkit";

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export const appSlice = createSlice({
    name: "app",

    initialState: {
        status: "idle" as RequestStatus,
        error: null as string | null,
    },

    selectors: {
        selectStatus: sliceState => sliceState.status,
        selectError: sliceState => sliceState.error,
    },

    reducers: creators => ({
        setAppStatus: creators.reducer<{status: RequestStatus}>((state, action) => {
            state.status = action.payload.status;
        }),

        setAppError: creators.reducer<{error: string | null}>((state, action) => {
            state.error = action.payload.error;
        }),
    }),
});

export const appReducer = appSlice.reducer;
export const {setAppStatus, setAppError} = appSlice.actions;
export const selectStatus = appSlice.selectors.selectStatus;
export const selectError = appSlice.selectors.selectError;
