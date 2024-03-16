import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import postOfFollowingSlice from "./slice/postOfFollowingSlice";
import allUsersSlice from "./slice/allUsersSlice";
import postFeaturesSlice from "./slice/postFeaturesSlice";
import myPostsSlice from "./slice/myPostsSlice";
import routerSlice from "./slice/routerSlice";
import userPostsSlice from "./slice/userPostsSlice";
import userProfileSlice from "./slice/userProfileSlice";

const store = configureStore({
    reducer:{
        router: routerSlice,
        userInfo: userSlice,
        users:allUsersSlice,
        postOfFollowing:postOfFollowingSlice,
        postFeatures:postFeaturesSlice,
        myPosts: myPostsSlice,
        userPosts:userPostsSlice,
        userProfile:userProfileSlice,
    }
})

export default store; 