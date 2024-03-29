import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

 const userProfileSlice = createSlice({
    name:"userProfile",
    initialState,
    reducers:{
        userProfileRequest : (state) => {
         state.loading = true;
        },
        userProfileSuccess : (state,action) => {
         state.loading = false;
         state.user = action.payload.user;
        },
        userProfileFailure : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors : (state) => {
            state.error = null;
         }
    }
})

export const {userProfileRequest,userProfileSuccess,userProfileFailure,clearErrors} = userProfileSlice.actions;

export default userProfileSlice.reducer;