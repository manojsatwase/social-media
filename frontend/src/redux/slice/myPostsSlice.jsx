import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const myPostSlice = createSlice({
    name:"myposts",
    initialState,
    reducers:{
       myPostsRequest : (state) => {
        state.loading = true;
       },
       myPostsSuccess : (state,action) => {
        state.loading = false;
        state.posts = action.payload.posts;
       },
       myPostsFailure : (state,action) => {
        state.loading = false;
        state.error = action.payload;
       },
       deleteMyPostRequest : (state) => {
        state.loading = true;
       },
       deleteMyPostSuccess : (state,action) => {
         state.loading = false;
         state.message = action.payload.message;
       },
       deleteMyPostFailure : (state,action) => {
        state.loading = false;
        state.message = action.payload;
      },
      createNewPostRequest : (state) => {
        state.loading = true;
      },
      createNewPostSuccess : (state,action) => {
         state.loading = false;
         state.message = action.payload.message;
       },
      createNewPostFailure : (state,action) => {
      state.loading = false;
      state.error = action.payload;
      },
     updateCaptionRequest : (state) => {
      state.loading = true;
     },
     updateCaptionSuccess : (state,action) => {
       state.loading = false;
       state.message = action.payload.message;
     },
     updateCaptionFailure : (state,action) => {
      state.loading = false;
      state.error = action.payload;
      },
      updateProfileRequest : (state) => {
        state.loading = true;
      },
      updateProfileSuccess : (state,action) => {
        state.loading = false;
        state.message = action.payload.message;
      },
      updateProfileFailure : (state,action) => {
       state.loading = false;
       state.error = action.payload;
      },
      updatePasswordRequest : (state) => {
        state.loading = true;
      },
      updatePasswordSuccess : (state,action) => {
       state.loading = false;
       state.message = action.payload.message;
      },
      updatePasswordFailure : (state,action) => {
       state.loading = false;
       state.error = action.payload;
      },
      deleteProfileRequest : (state) => {
       state.loading = true;
      },
      deleteProfileSuccess : (state,action) => {
        state.loading = false;
        state.action = action.payload.message;
      },
      deleteProfileDelete : (state,action) => {
        state.loading = false;
        action.error = action.payload;
      },
      forgotPasswordRequest : (state) => {
        state.loading = true;
      },
      forgotPasswordSuccess : (state,action) => {
        state.loading = false;
        state.message = action.payload.message;
      },
      forgotPasswordFailure : (state,action) => {
        state.loading = false;
        state.error = action.payload;
      },
      resetPasswordRequest : (state) => {
        state.loading = true;
      },
      resetPasswordSuccess : (state,action) => {
        state.loading = false;
        state.message = action.payload.message;
      },
      resetPasswordFailure : (state,action) => {
        state.loading = false;
        state.error = action.payload;
      },
      followUserRequest : (state) => {
        state.loading = true;
      },
      followUserSuccess : (state,action) => {
        state.loading = false;
        state.message = action.payload.message;
      },
      followUserFailure : (state,action) => {
        state.loading = false;
        state.error = action.payload;
      },
      clearErrors : (state) => {
      state.error = null;
      },
      clearMessage : (state) => {
      state.message = null;
      }
    } 
}) 

export const {
    myPostsRequest,
    myPostsSuccess,
    myPostsFailure,
    deleteMyPostRequest,
    deleteMyPostSuccess,
    deleteMyPostFailure,
    createNewPostRequest,
    createNewPostSuccess,
    createNewPostFailure,
    updateCaptionRequest,
    updateCaptionSuccess,
    updateCaptionFailure,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFailure,
    deleteProfileRequest,
    deleteProfileSuccess,
    deleteProfileDelete,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailure,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailure,
    followUserRequest,
    followUserSuccess,
    followUserFailure,
    clearErrors,
    clearMessage
} = myPostSlice.actions;

export default myPostSlice.reducer;