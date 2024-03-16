import { METHOD, makeRequest } from "./apiCall"
import {
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
    } from "../redux/slice/myPostsSlice";

export const myPostAPI = () => async (dispatch) =>  {
    await makeRequest(
        dispatch,
        myPostsRequest,
        myPostsSuccess,
        myPostsFailure,
        METHOD.GET,
        "/api/v1/me/myposts"
    )
}

export const deleteMyPostAPI = (postId) => async (dispatch) => {
    await makeRequest(
        dispatch,
        deleteMyPostRequest,
        deleteMyPostSuccess,
        deleteMyPostFailure,
        METHOD.DELETE,
        `/api/v1/post/${postId}`
    )
}

export const createNewPostAPI = (caption,image) => async (dispatch) => {
    await makeRequest(
        dispatch,
        createNewPostRequest,
        createNewPostSuccess,
        createNewPostFailure,
        METHOD.POST,
        "/api/v1/post/create",
        {caption,image}
    )
}

export const updateCaptionAPI = (caption,postId) => async (dispatch) => {
    await makeRequest(
        dispatch,
        updateCaptionRequest,
        updateCaptionSuccess,
        updateCaptionFailure,
        METHOD.PUT,
        `/api/v1/post/${postId}`, 
        {caption}
    )
}

export const UpdateProfileAPI = (name,email,avatar) => async (dispatch) => {
    await makeRequest(
        dispatch,
        updateProfileRequest,
        updateProfileSuccess,
        updateProfileFailure,
        METHOD.PUT,
        "/api/v1/update-profile",
        {name,email,avatar}
    )
}

export const updatePasswordAPI = (oldPassword,newPassword) => async (dispatch) => {
    await makeRequest(dispatch,
        updatePasswordRequest,
        updatePasswordSuccess,
        updatePasswordFailure,
        METHOD.PUT,
        "/api/v1/update-password",
        {oldPassword,newPassword}
        )
}

export const deleteProfileAPI = () => async (dispatch) => {
    await makeRequest(
        dispatch,
        deleteProfileRequest,
        deleteProfileSuccess,
        deleteProfileDelete,
        METHOD.DELETE,
        "/api/v1/delete/me",
    )
}

export const forgotPasswordAPI = (email) => async (dispatch) => {
    await makeRequest(
        dispatch,
        forgotPasswordRequest,
        forgotPasswordSuccess,
        forgotPasswordFailure,
        METHOD.POST,
        "/api/v1/forget/password",
        {email}
    )
} 

export const resetPasswordAPI = (token,newPassword) => async (dispatch) => {
    await makeRequest(
        dispatch,
        resetPasswordRequest,
        resetPasswordSuccess,
        resetPasswordFailure,
         METHOD.PUT,
        `/api/v1/password/reset/${token}`,
        {newPassword}
    )
}