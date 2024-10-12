/* eslint-disable prettier/prettier */
import {TUser} from '@utils-types';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { loginUserThunk, logoutUserThunk, updateUserThunk, setUser } from '../services/userActions';

type TUserState = {
    user: TUser | null;
    isAuthChecked: boolean;
    isLoading: boolean;
}

const initialState: TUserState = {
    user: null,
    isAuthChecked: false,
    isLoading: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
            state.isAuthChecked = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
    selectors: {
        getIsAuthChecked: (state) => state.isAuthChecked,
        getUser: (state) => state.user,
        getIsLoading: (state) => state.isLoading,
    },
    extraReducers: (builder) => {
        builder
            .addCase(setUser, (state, action) => {
                state.user = action.payload;
            })
            .addCase(loginUserThunk.pending, (state) => {
                state.isLoading = true;
                state.user = null;
                state.isAuthChecked = false;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(loginUserThunk.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthChecked = false;
            })
            .addCase(logoutUserThunk.pending, (state) => {
                state.isLoading = true;
                state.isAuthChecked = true;
            })
            .addCase(logoutUserThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthChecked = false;
            })
            .addCase(logoutUserThunk.rejected, (state) => {
                state.isLoading = false;
                state.isAuthChecked = true;
            })
            .addCase(updateUserThunk.pending, (state) => {
                state.isLoading = true;
                state.isAuthChecked = true;
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(updateUserThunk.rejected, (state) => {
                state.isLoading = false;
                state.isAuthChecked = true;
            })
    }
})

export const { setIsAuthChecked, setIsLoading } = userSlice.actions;
export const { getIsAuthChecked, getUser, getIsLoading } = userSlice.selectors;

