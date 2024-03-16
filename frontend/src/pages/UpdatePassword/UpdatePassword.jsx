import React, { useEffect, useState } from 'react'

import { Typography,Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loading from '../../components/Loading/Loading';
import { updatePasswordAPI } from '../../API/myPostApiCall';
import { clearErrors, clearMessage } from '../../redux/slice/myPostsSlice';

import "./UpdatePassword.css";

const UpdatePassword = () => {
const [oldPassword,setOldPassword] = useState("");
const [newPassword,setNewPassword] = useState("");

const dispatch = useDispatch();
const alert = useAlert();

const {error,loading,message} = useSelector(state => state?.myPosts)

const submitHandler = async(e) => {
  e.preventDefault();
  await dispatch(updatePasswordAPI(oldPassword,newPassword));
} 

 
 useEffect(() => {
  if(error){
    alert.error(error);
    // remember inside dispatch you need to call this clearMessagw function otherwise is not working
    dispatch(clearErrors());
  }
  if(message){
   alert.success(message);
   dispatch(clearMessage());
  }
 },[error,alert,message,dispatch]);


return (
  <div className='updatePassword'>
      <form className='updatePasswordForm' onSubmit={submitHandler}>
        <Typography variant='h3' style={{padding:"2vmax"}}>
          Social App
        </Typography> 
        <input type='password' className='updatePasswordInputs' placeholder='old password' required value={oldPassword} onChange={({target:{value}})=>setOldPassword(value)}/>
        <input type='password' className='updatePasswordInputs' placeholder='new password' required value={newPassword} onChange={({target:{value}})=>setNewPassword(value)} /> 
        <Button type='submit' disabled={loading}>{loading ? <Loading /> : "Change Password"}</Button>
        <Link to="/forgot/password">
          <Typography variant='h6' style={{padding:"2vmax"}}>
              Forgot Password
          </Typography>
        </Link>
      </form>
  </div>
)
}

export default UpdatePassword;