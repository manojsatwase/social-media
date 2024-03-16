
import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const allUsersSlice = createSlice({
    name:"allusers",
    initialState,
    reducers:{
        usersRequest : (state) => {
         state.loading = true;
        },
        usersSuccess : (state,action) => {
            state.loading = false;
            state.users = action.payload.users
        },
        userFailure : (state,action) => {
        state.loading = false;
        state.error = action.payload;
        },
        clearErrors : (state) => {
        state.error = null;
        },
      }
})

export const {usersRequest,usersSuccess,userFailure,clearErrors} = allUsersSlice.actions;
export default allUsersSlice.reducer;