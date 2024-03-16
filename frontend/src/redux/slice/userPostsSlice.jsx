import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

 const userPostsSlice = createSlice({
    name:"userPosts",
    initialState,
    reducers:{
        userPostsRequest : (state) => {
         state.loading = true;
        },
        userPostsSuccess : (state,action) => {
         state.loading = false;
         state.posts = action.payload.posts;
        },
        userPostsFailure : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors : (state) => {
         state.error = null;
        }
    }
})

export const {userPostsRequest,userPostsSuccess,userPostsFailure,clearErrors} = userPostsSlice.actions;

export default userPostsSlice.reducer;