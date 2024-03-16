// import {createSlice} from '@reduxjs/toolkit';

// const initialState = {};

// const postLikeSlice = createSlice({
//     name:"like",
//     initialState,
//     reducers:{
//         postLikeRequest : (state) => {
//             state.loading = true;
//         },
//         postLikeSuccess : (state,action) => {
//           state.loading = false;
//           state.message = action.payload.message;
//         },
//         postLikeFailure : (state,action) => {
//             state.loading = false;
//             state.error = action.payload
//         },
//         clearErrors : (state) => {
//             state.error = null;
//         }, 
//         clearMessage : (state) => {
//             state.message = null;
//         }
//     }
// }) 

// export const {postLikeRequest,postLikeSuccess,postLikeFailure,clearErrors,clearMessage} = postLikeSlice.actions;

// export default postLikeSlice.reducer;