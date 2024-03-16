import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { useAlert } from 'react-alert';

import Loading from '../../components/Loading/Loading';
import { getAllUsersAPI, getFollowingPostsAPI } from '../../API/userApiCall';
import Post from '../../components/Post/Post';
import User from '../../components/User/User';
import {clearErrors as clearUserError} from "../../redux/slice/userSlice";
import { clearErrors, clearMessage } from '../../redux/slice/postFeaturesSlice';


import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  const {loading,error,posts} = useSelector(state=>state.postOfFollowing);
  const {loading:userLoading , error:userError,users} = useSelector(state=>state.users);
  const {loading:loadingPostFeatures ,error:postFeaturesError,message} = useSelector(state=>state.postFeatures);
  

  const alert = useAlert();

  useEffect(()=>{
    dispatch(getFollowingPostsAPI());
    dispatch(getAllUsersAPI());
   },[dispatch]);

   // why error handling here not inside post.js component because post render multiple time and
   // so alert message also show multiple time that why we are handling error here
   useEffect(()=>{
    if(postFeaturesError){
      alert.error(postFeaturesError);
      dispatch(clearErrors());
    }
    if(message){
      alert.success(message);
      dispatch(clearMessage())
    }
    if(userError){
    alert.alert(userError);
    dispatch(clearUserError());
    }
   
  
   },[alert,error,message,userError,dispatch,postFeaturesError]);

   if(loading || userLoading || loadingPostFeatures) return <Loading />

  return (
    <>
   <div className='home'>
     <div className='homeleft'>
      {
        posts?.length > 0 ? (
          posts?.map(post=> (
            <Post 
            key={post._id}
            isAccount={false}
            postId={post._id}
            caption={post?.caption}
            likes={post?.likes}
            postImage = {post.image.url}
            comments={post?.comments}
            ownerImage={post?.owner?.avatar?.url}
            ownerName={post?.owner?.name}
            ownerId={post?.owner?._id}
            tabLike={"home"}
            />
          )) 
        ): (
          <Typography variant='h6'>No posts yet</Typography>
        )
      }
     </div>
     <div className='homeright'>
      {
        users ? (users?.map(user => (
          <User 
          key={user?._id}
          userId = {user?._id}
          name = {user?.name}
          avatar = {user?.avatar?.url}
          />
        ))) : (
          <Typography>No Users Yet</Typography>
        )
      }
       
     </div>
   </div>
    </>
  )
}

export default Home;