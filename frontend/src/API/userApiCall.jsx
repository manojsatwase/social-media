import { makeRequest } from "./apiCall";

import { 
    LoadUserFailure, 
    LoadUserRequest, 
    LoadUserSuccess, 
    LoginFailure, 
    LoginRequest, 
    LoginSuccess,
    logoutUserRequest,
    logoutUserSuccess,
    logoutUserFailure,
    RegisterRequest,
    RegisterSuccess,
    RegisterFailure,
} from "../redux/slice/userSlice";
import { 
    postOfFollowingFailure, 
    postOfFollowingRequest, 
    postOfFollowingSuccess 
} from "../redux/slice/postOfFollowingSlice";
import { 
    userFailure, 
    usersRequest, 
    usersSuccess 
} from "../redux/slice/allUsersSlice";
import { userPostsFailure, userPostsRequest, userPostsSuccess } from "../redux/slice/userPostsSlice";
import { userProfileFailure, userProfileRequest, userProfileSuccess } from "../redux/slice/userProfileSlice";
import { followUserFailure, followUserRequest, followUserSuccess } from "../redux/slice/myPostsSlice";


export const loginUserAPI = (email, password) => async (dispatch) => {
    await makeRequest(
        dispatch,
        LoginRequest,
        LoginSuccess,
        LoginFailure,
        'POST',
        "/api/v1/login",
        { email, password }
    );
};

export const registerUserAPI = (name,email,avatar,password) => async (dispatch) => {
    await makeRequest(
        dispatch,
        RegisterRequest,
        RegisterSuccess,
        RegisterFailure,
        'POST',
        "/api/v1/register",
        { name,email,avatar,password }
    );
};

export const loadUserAPI = () => async (dispatch) => {
    await makeRequest(
        dispatch,
        LoadUserRequest,
        LoadUserSuccess,
        LoadUserFailure,
        'GET',
        "/api/v1/me"
    );
};

export const getFollowingPostsAPI = () => async (dispatch) => {
    await makeRequest(
        dispatch,
        postOfFollowingRequest,
        postOfFollowingSuccess,
        postOfFollowingFailure,
        'GET',
        "/api/v1/posts"
    );
};

export const getAllUsersAPI = (name = "") => async (dispatch) => {
    await makeRequest(
        dispatch,
        usersRequest,
        usersSuccess,
        userFailure,
        'GET',
        `/api/v1/users?name=${name}`
    );
};

export const logoutUserAPI =  () => async(dispatch) => {
    await makeRequest(
        dispatch,
        logoutUserRequest,
        logoutUserSuccess,
        logoutUserFailure,
        "GET",
        "/api/v1/logout"
    )
}

export const getUserPostsAPI = (id) => async (dispatch) => {
    await makeRequest(
        dispatch, 
        userPostsRequest,
        userPostsSuccess,
        userPostsFailure,
        "GET",
        `/api/v1/userposts/${id}`,

    )
}

export const getUserProfileAPI = (id) => async (dispatch) => {
    await makeRequest(
         dispatch, 
         userProfileRequest,
         userProfileSuccess,
         userProfileFailure,
         "GET",
        `/api/v1/user/${id}`, 
    )
}

export const followUnfollowAPI = (id) => async (dispatch) => {
 await makeRequest(
    dispatch,
    followUserRequest,
    followUserSuccess,
    followUserFailure,
    "GET",
    `/api/v1/follow-unfollow/${id}`,
 )
}