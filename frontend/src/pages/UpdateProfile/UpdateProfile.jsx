
import React, { useEffect, useState } from 'react'
import { Typography,Button, Avatar } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import { UpdateProfileAPI } from '../../API/myPostApiCall';
import Loading from '../../components/Loading/Loading';
import { loadUserAPI } from '../../API/userApiCall';
import { clearErrors, clearMessage } from '../../redux/slice/myPostsSlice';

import "./UpdateProfile.css";

const UpdateProfile = () => {
const user = useSelector(state=>state?.userInfo.user);
const {loading,error,message} = useSelector(state => state?.myPosts);

const [name,setName] = useState(user?.name);
const [email,setEmail] = useState(user?.email);
const [avatarPrev,setAvatarPrev] = useState(user?.avatar.url);
const [avatar,setAvatar] = useState("");

const dispatch = useDispatch();
const navigate = useNavigate();
const alert = useAlert();


const updateProfileHandler = async (e) => {
    e.preventDefault();
    await dispatch(UpdateProfileAPI(name,email,avatar));
    await dispatch(loadUserAPI());
}  

useEffect(()=>{

  if(error){
    alert.error(error);
    // remember inside dispatch you need to call this clearMessagw function otherwise is not working
    dispatch(clearErrors());
  }
  if(message){
    alert.success(message);
    // remember inside dispatch you need to call this clearMessagw function otherwise is not working
    dispatch(clearMessage());
  }

},[dispatch,navigate,alert,error,message])



const handleImageChange = (e) => {
  const file = e.target.files[0];
  const Reader = new FileReader();
  Reader.readAsDataURL(file);
  Reader.onload = () => {
    // 0 means initial 
    // 1 processing
    // 2 process done
    if(Reader.readyState === 2){
      setAvatar(Reader.result);
      setAvatarPrev(Reader.result);
    }
  }
}

  return (
    <div className='updateProfile'>
        <form className='updateProfileForm' onSubmit={updateProfileHandler}>
         <Typography variant='h3' style={{padding:"2vmax"}}>
            Social App
         </Typography>
         <Avatar sx={{width:"10vmax",height:"10vmax"}} src={avatarPrev} alt='user' />
          <input type="file" accept="image/*" onChange={handleImageChange} />
         <input type='text' className="updateProfileInputs" placeholder='Name'required value={name} onChange={({target:{value}})=>setName(value)}/>
         <input type='email' className="updateProfileInputs" placeholder='Email'required value={email} onChange={({target:{value}})=>setEmail(value)}/>
         <Button type='submit' disabled={loading}>{loading ? <Loading/> : "Update Profile" }</Button>
        </form>
    </div>
  )
}

export default UpdateProfile