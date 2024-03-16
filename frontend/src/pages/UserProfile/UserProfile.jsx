import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";

import Loading from '../../components/Loading/Loading';
import { useAlert } from 'react-alert';
import { clearErrors as clearErrorsMyPost , clearMessage as clearErrorsMyPostMessage} from '../../redux/slice/myPostsSlice';
import { clearErrors, clearMessage } from '../../redux/slice/postFeaturesSlice';
import Post from '../../components/Post/Post';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import {useParams } from 'react-router-dom';
import User from '../../components/User/User';
import "../../pages/Account/Account.css";

import { followUnfollowAPI, getUserPostsAPI, getUserProfileAPI } from '../../API/userApiCall';

const UserProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {id} = useParams();

 
  const {error:postFeaturesError,message} = useSelector(state=>state.postFeatures);
  const {loading:myPostLoading,error:myPostError,message:myPostMessage} = useSelector(state => state?.myPosts)
  const {loading,error,posts} = useSelector(state => state.userPosts);
  const {user,loading:userLoading} = useSelector(state=>state.userProfile);
  const {user:me} = useSelector(state => state.userInfo);

  const [followersModel,setFollowersModel] = useState(false);
  const [followingModel,setFollowingModel] = useState(false);
  const [following,setFollowing] = useState(false);
  const [myProfile,setMyProfile] = useState(false);
 
  useEffect(()=>{
    dispatch(getUserPostsAPI(id));
    dispatch(getUserProfileAPI(id));

  },[dispatch,id]);


  useEffect(() => {
     // don't write here otherwise re render infinete why due id dependancy
    // dispatch(getUserPostsAPI(id));
    // dispatch(getUserProfileAPI(id));

    // Check if the current user is viewing their own profile
    if (me._id === id) {
      setMyProfile(true);
    }
  
    // Determine follow/unfollow state based on user's followers 
    // loop through followers user and check if the following user id === my id 
    if (user) {
      user.followers.forEach((follower) => {
        if (follower._id === me._id) {
          setFollowing(true); // User is following
        } else {
          setFollowing(false); // User is not following
        }
      });
    }
  }, [user, me._id, id]);
  

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
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
      alert.error(myPostError);
      dispatch(clearErrorsMyPost());
    }
    
    if(myPostMessage){
      alert.success(myPostMessage);
      dispatch(clearErrorsMyPostMessage());
    }
  },[alert,message,postFeaturesError,error,dispatch,myPostError,myPostMessage]);

 const followHandler = async (e) => {
  e.preventDefault();
  setFollowing(!following);
  // jisbhi user co pollow kar rahe ho uski id
  await dispatch(followUnfollowAPI(user._id));
  // after the following get fresh data from backend
  dispatch(getUserProfileAPI(id));
 }

if(myPostLoading) return <Loading />

  return (
    <div className='account'>
        <div className='accountleft'>
          {loading && <Loading />}
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
                tabLike={"userProfile"}
                userId = {id}
            />
            )) : (
              <Typography>
                 User has not made any post 
              </Typography>
            )
          }
        </div>
        <div className='accountright'>
          {userLoading ? <Loading /> : <>
          <Avatar 
          src={user?.avatar?.url} 
          sx={{height:"8vmax",width:"8vmax"}}
          />
          <Typography variant='h5'>{user?.name}</Typography>
          <div>
            <button onClick={() => setFollowersModel(!followersModel)}>
              <Typography>Followers</Typography>
            </button>
            <Typography>{user?.followers?.length}</Typography>
          </div>
           {/* end followers */}
          <div>
            <button onClick={() => setFollowingModel(!followingModel)}>
              <Typography>Followings</Typography>
            </button>
            <Typography>{user?.following?.length}</Typography>
          </div>
          {/* end following */}
          <div>
            <Typography>posts</Typography>
            <Typography>{user?.posts?.length}</Typography>
          </div>
           {/* end post */}
           {
            myProfile ? null : (
             <Button
              variant='contained'
              onClick={followHandler}
              style={{background: following ? "#FF0000" :"#1664C0"}}
              >
                 {following ? "Unfollow" : "Follow"}
             </Button>
            )
           }

             {/* open dialog model for followers */}
        <Dialog open={followersModel} onClose={()=>setFollowersModel(!followersModel)}>
          <div className='DialogBox'>
             <Typography variant='h4'>Followers</Typography>
              {
                user ? user?.followers?.map(follower=>(
                  <User 
                  userId = {follower?._id}
                  name = {follower?.name}
                  avatar={follower?.avatar?.url}
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
                  avatar={follow?.avatar?.url}
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

export default UserProfile