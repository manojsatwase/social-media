import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated:false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        LoginRequest : (state) => {
         state.loading = true;
        },
        LoginSuccess : (state,action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
        },
        LoginFailure : (state,action) => {
          state.loading = false;
          state.error = action.payload;
          state.isAuthenticated = false;

        },
         RegisterRequest : (state) => {
            state.loading = true;
        },
        RegisterSuccess : (state, action) => {
            state.loading = false;
            state.user = action.payload.message;
            state.isAuthenticated = true;
        },
        RegisterFailure : (state,action) =>{
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        LoadUserRequest : (state) =>{
            state.loading = true;
        },
        LoadUserSuccess : (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        LoadUserFailure : (state,action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        logoutUserRequest : (state) => {
            state.loading = true;
        },
        logoutUserSuccess : (state,action) => {
         state.loading = false;
         state.user = null;
         state.isAuthenticated = false;
         state.message = action.payload;
        },
        logoutUserFailure : (state,action) => {
          state.loading = false;
          state.error = action.payload;
          state.isAuthenticated = true;
        },
        clearErrors : (state) => {
            state.error = null;
        },
        clearMessage : (state) => {
            state.message = null;
        },

    }
}) 

export const { 
    LoginRequest,
    LoginSuccess,
    LoginFailure, 
    RegisterRequest,
    RegisterSuccess,
    RegisterFailure,
    LoadUserRequest,
    LoadUserSuccess,
    LoadUserFailure,
    logoutUserRequest,
    logoutUserSuccess,
    logoutUserFailure,
    clearErrors,
    clearMessage
} = userSlice.actions;

export default userSlice.reducer;
