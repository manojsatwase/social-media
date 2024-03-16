
import { 
     addCommentFailure,
     addCommentRequest,
     addCommentSuccess,
     postLikeFailure,
     postLikeRequest, 
     postLikeSuccess,
     deleteCommentRequest,
     deleteCommentSuccess,
     deleteCommentFailure,
 } from "../redux/slice/postFeaturesSlice";
import { makeRequest } from "./apiCall";

export const postLikeUnlikeAPI = (postId) => async (dispatch) => {
    await makeRequest(
      dispatch,
      postLikeRequest,
      postLikeSuccess,
      postLikeFailure,
      "GET",`/api/v1/post/${postId}`,
      );
  }
  
  export const addCommentAPI = (postId,comment) => async(dispatch) => {
  await makeRequest(
    dispatch,
    addCommentRequest,
    addCommentSuccess,
    addCommentFailure,
    "PUT",
   `/api/v1/post/comment/${postId}`,
   {comment}
  )
  }

  export const deleteCommentAPI = (postId,commentId) => async (dispatch) => {
    await makeRequest(
      dispatch,
      deleteCommentRequest,
      deleteCommentSuccess,
      deleteCommentFailure,
      "DELETE",
      `/api/v1/post/comment/${postId}`,
      {commentId}
    )
  }