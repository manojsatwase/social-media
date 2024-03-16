// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {};

// const postCommentSlice = createSlice({
//     name:"comment",
//     initialState,
//     reducers:{
//         addCommentRequest : (state) => {
//             state.loading = true;
//         },
//         addCommentSuccess : (state,action) => {
//             console.log(action.payload.message);
//             state.loading = false;
//             state.message = action.payload.message;
//         },
//         addCommentFailure : (state,action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         clearErrors : (state) => {
//             state.error = null;
//         }, 
//         clearMessage : (state) => {
//             state.message = null;
//         },
//     }
// })

// export const {addCommentRequest,addCommentSuccess,addCommentFailure,clearErrors,clearMessage} = postCommentSlice.actions;

// export default postCommentSlice.reducer;