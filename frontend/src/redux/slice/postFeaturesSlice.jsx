import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

const postFeatureSlice = createSlice({
    name:"postfetures",
    initialState,
    reducers:{
        // like start
        postLikeRequest : (state) => {
            state.loading = true;
        },
        postLikeSuccess : (state,action) => {
          state.loading = false;
          state.message = action.payload.message;
        },
        postLikeFailure : (state,action) => {
            state.loading = false;
            state.error = action.payload
        },
       // like end
        addCommentRequest : (state) => {
            state.loading = true;
        },
        addCommentSuccess : (state,action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        addCommentFailure : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // comment end
        deleteCommentRequest : (state) => {
            state.loading = false;
        },
        deleteCommentSuccess : (state,action) => {
           state.loading = false;
           state.message = action.payload.message;
        },
        deleteCommentFailure :(state,action) => {
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
    postLikeRequest,
    postLikeSuccess,
    postLikeFailure,
    addCommentRequest,
    addCommentSuccess,
    addCommentFailure,
    deleteCommentRequest,
    deleteCommentSuccess,
    deleteCommentFailure,
    clearErrors,
    clearMessage
} = postFeatureSlice.actions;

export default postFeatureSlice.reducer;


