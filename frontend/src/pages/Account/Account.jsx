import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";

import { deleteProfileAPI, myPostAPI } from '../../API/myPostApiCall';
import Loading from '../../components/Loading/Loading';
import { useAlert } from 'react-alert';
import { clearErrors as clearErrorsMyPost } from '../../redux/slice/myPostsSlice';
import { clearErrors, clearMessage } from '../../redux/slice/postFeaturesSlice';
import Post from '../../components/Post/Post';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import User from '../../components/User/User';
import {clearErrors as clearMyPostErrors,clearMessage as clearMyPostMessage} from "../../redux/slice/myPostsSlice"

import "./Account.css";
import { logoutUserAPI } from '../../API/userApiCall';

const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {error,posts} = useSelector(state => state?.myPosts)
  const {error:postFeaturesError,message} = useSelector(state=>state.postFeatures);
  const {user,loading:userLoading} = useSelector(state=>state.userInfo);
  const {loading:myPostLoading,error:myPostError,message:myPostMessage} = useSelector(state => state?.myPosts)

  const [followersModel,setFollowersModel] = useState(false);
  const [followingModel,setFollowingModel] = useState(false);

  useEffect(()=>{
    dispatch(myPostAPI());
  },[dispatch]);

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrorsMyPost());
    }

    if(postFeaturesError){
      alert.error(postFeaturesError);
      dispatch(clearErrors());
    }

    
    if(message){
      alert.success(message);
      dispatch(clearMessage())
    }

    if(myPostError){
      alert.alert(myPostError);
      dispatch(clearMyPostErrors());
    }
    if(myPostMessage){
      alert.success(myPostMessage);
      dispatch(clearMyPostMessage());
    }
  },[alert,message,postFeaturesError,error,dispatch,myPostError,myPostMessage]);
  

  const lagoutHandler = () => {
     dispatch(logoutUserAPI());
    alert.success("Logged out successfully")
  };
  // if(loading || userLoading || myPostLoading) return <Loading/>

  const deleteMyProfile = async(e) => {
    e.preventDefault();
   await dispatch(deleteProfileAPI());
    dispatch(logoutUserAPI());
  } 

  return (
    <div className='account'>
        <div className='accountleft'>
          {myPostLoading && <Loading />}
          {
            posts?.length ? posts?.map(post => (
              <Post 
                key={post?._id}
                isAccount={true}
                postId={post?._id}
                caption={post?.caption}
                likes={post?.likes}
                postImage = {post.image.url}
                comments={post?.comments}
                ownerImage={post?.owner?.avatar?.url}
                ownerName={post?.owner?.name}
                ownerId={post?.owner?._id}
                isDelete={true}
                tabLike={"account"}
            />
            )) : (
              <Typography>
                 Yout have not made any post 
              </Typography>
            )
          }
        </div>
        <div className='accountright'>
          {userLoading ? <Loading /> : <>
          <Avatar 
          src={user.avatar?.url} 
          sx={{height:"8vmax",width:"8vmax"}}
          />
          <Typography variant='h5'>{user.name}</Typography>
          <div>
            <button onClick={() => setFollowersModel(!followersModel)}>
              <Typography>Followers</Typography>
            </button>
            <Typography>{user.followers?.length}</Typography>
          </div>
           {/* end followers */}
          <div>
            <button onClick={() => setFollowingModel(!followingModel)}>
              <Typography>Followings</Typography>
            </button>
            <Typography>{user.following?.length}</Typography>
          </div>
          {/* end following */}
          <div>
            <Typography>posts</Typography>
            <Typography>{user.posts?.length}</Typography>
          </div>
           {/* end post */}
           <Button variant='contained' onClick={lagoutHandler}>Logout</Button>
           <Link to="/update/profile">Edit Profile</Link>
           <Link to="/update/password">Change Password</Link>
           <Button 
           onClick={deleteMyProfile}
           variant='text'
           style={{color:"#833AB4",margin:"2vmax"}}
           >{myPostLoading ? <Loading /> : "Delete My Profile"}</Button>

             {/* open dialog model for followers */}
        <Dialog open={followersModel} onClose={()=>setFollowersModel(!followersModel)}>
          <div className='DialogBox'>
             <Typography variant='h4'>Followers</Typography>
              {
                user ? user?.followers?.map(follower=>(
                  <User 
                  userId = {follower?._id}
                  name = {follower?.name}
                  avatar={follower.avatar?.url}
                  /> 
                )) : (
                  <Typography style={{margin:"2vmax"}}>You have No Follower</Typography>
                )
              }
            
          </div>
        </Dialog>
         {/* open dialog model for following */}

         <Dialog open={followingModel} onClose={()=>setFollowingModel(!followingModel)}>
          <div className='DialogBox'>
             <Typography variant='h4'>Followers</Typography>
              {
                user ? user?.following?.map(follow=>(
                  <User 
                  userId = {follow?._id}
                  name = {follow?.name}
                  avatar={follow.avatar?.url}
                  /> 
                )) : (
                  <Typography style={{margin:"2vmax"}}>You are not following anyone</Typography>
                )
              }
            
          </div>
        </Dialog>
          </>}
         
        </div>
        
    </div>
  )
}

export default Account;