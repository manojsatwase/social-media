import React, { useEffect, useState } from 'react'
import {Button, Typography} from '@mui/material';
import "./NewPost.css";

import {useDispatch, useSelector} from "react-redux";
import {useAlert} from 'react-alert';
import { createNewPostAPI } from '../../API/myPostApiCall';
import { clearErrors, clearMessage } from '../../redux/slice/myPostsSlice';
import { loadUserAPI } from '../../API/userApiCall';

const NewPost = () => {
  const [caption,setCaption] = useState("");
  const [image,setImage] = useState("");
  const alert = useAlert();

  const dispatch = useDispatch();
  const {loading,error,message} = useSelector(state=> state?.myPosts);
 
  const resetForm = () => {
    setCaption("");
    setImage("");
  }

  const submitNewPost = async (e) => {
    e.preventDefault();
       // quicly update immediately not updating the post that why we use aync func
    await dispatch(createNewPostAPI(caption,image));
   // fresh data load when we create new post and update our slide bar post info
    dispatch(loadUserAPI());
    resetForm();
  }

  useEffect(()=>{
    if(message){
      alert.success(message);
      dispatch(clearMessage());
    }
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
  },[alert,error,message,dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      // 0 means initial 
      // 1 processing
      // 2 process done
      if(Reader.readyState === 2){
        setImage(Reader.result);
      }
    }
   
  }
  return (
    <div className='newPost'>
         <form className='newPostForm' onSubmit={submitNewPost}>
             <Typography variant='h3'>
                 New Post
             </Typography>
             {image && <img src={image} alt="post" />}
             <input type="file" accept="image/*" onChange={handleImageChange} />
                
             <input type='text' value={caption} onChange={(e) =>setCaption(e.target.value) } placeholder='Caption...' />
             <Button type='submit' disabled={loading}>{loading ? "Loading" : "Post"}</Button>
         </form>
    </div>
  )
}

export default NewPost;