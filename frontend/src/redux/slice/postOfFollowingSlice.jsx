import { createSlice } from "@reduxjs/toolkit";

const initialState = {} ;

export const postOfFollowingSlice = createSlice({
    name:"postOfFollowing",
    initialState,
    reducers:{
        postOfFollowingRequest : (state) => {
            state.loading = true;
        },
        postOfFollowingSuccess : (state,action) => {
            state.loading = false;
            state.posts = action.payload.posts;
        },
        postOfFollowingFailure : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors : (state) => {
            state.error = null;
        },
        
    }
})

export const {
     postOfFollowingRequest,
     postOfFollowingSuccess,
     postOfFollowingFailure,
     clearErrors
} = postOfFollowingSlice.actions;

export default postOfFollowingSlice.reducer;