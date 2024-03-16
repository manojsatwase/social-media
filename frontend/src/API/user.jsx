import axios from "axios";
import { LoadUserFailure, LoadUserRequest, LoadUserSuccess, LoginFailure, LoginRequest, LoginSuccess } from "../redux/slice/userSlice";
import { postOfFollowingFailure, postOfFollowingRequest, postOfFollowingSuccess } from "../redux/slice/postOfFollowingSlice";
import { userFailure, usersRequest, usersSuccess } from "../redux/slice/allUsersSlice";


export const loginUserAPI = (email,password) => async(dispatch) => {
    try {
        dispatch(LoginRequest());
        const options = { 
            headers: { 
                "Content-Type": "application/json"
            }
        };
        const {data} = await axios.post("/api/v1/login",{email,password},options);
        dispatch(LoginSuccess(data.user));
    } catch (error) {
       dispatch(LoginFailure(error.response.data.message)); 
    }
}
export const registerUserAPI = (name, email, password) => async(dispatch) => {
    try {
        dispatch(LoginRequest());
        const options = { 
            headers: {
                "Content-Type": "application/json"
            }
        };
        const {data} = await axios.post("/api/v1/register",{name, email, password},options);
        dispatch(LoginSuccess(data.user));
    } catch (error) {
       dispatch(LoginFailure(error.response.data.message)); 
    }
}

export const loadUserAPI = () => async(dispatch) => {
    try {
    dispatch(LoadUserRequest());
    const {data} = await axios.get("/api/v1/me");

    dispatch(LoadUserSuccess(data.user));
        
    } catch (error) {
        dispatch(LoadUserFailure(error.response.data.message)); 
    }
}

export const postOfFollowingAPI = () => async (dispatch) =>{
    try {
        dispatch(postOfFollowingRequest());
        const {data} = await axios.get("/api/v1/posts");
        dispatch(postOfFollowingSuccess(data.posts));
    } catch (error) {
        dispatch(postOfFollowingFailure(error.response.data.message))
    }
} 

export const getAllUsersAPI = () => async (dispatch) => {
    try {
        dispatch(usersRequest());
        const {data} = await axios.get("/api/v1/users");
        dispatch(usersSuccess(data.users));
    } catch (error) {
        dispatch(userFailure(error.response.data.message));
    }
}


