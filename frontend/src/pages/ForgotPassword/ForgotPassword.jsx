import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAPI } from '../../API/myPostApiCall';

import "./ForgotPassword.css";
import { useAlert } from 'react-alert';
import { clearErrors, clearMessage } from '../../redux/slice/myPostsSlice';
import Loading from '../../components/Loading/Loading';

const ForgotPassword = () => {
 
const [email,setEmail] = useState("");
const dispatch = useDispatch();
const alert = useAlert();

const {loading,error,message} = useSelector(state=>state.myPosts);


 const submitHandler = (e) => {
   e.preventDefault();
   dispatch(forgotPasswordAPI(email));
 }

 useEffect(() => {
  if(error){
    alert.error(error);
    dispatch(clearErrors());
  }
  if(message){
    alert.success(message);
    dispatch(clearMessage());
  }
 },[alert,error,message,dispatch]);

  return (
    <div className='forgotPassword'>
      <form className='forgotPasswordForm' onSubmit={submitHandler}>
        <Typography variant='h3' style={{padding:"2vmax"}}>
          Social App
        </Typography>
        <input type='email' className='forgotPasswordInputs' placeholder='Email'required value={email} onChange={({target:{value}})=>setEmail(value)}/>
        <Button type="submit" disabled={loading}>{loading ? <Loading /> : "Send Token"}</Button>
      </form>
  </div>
  )
}

export default ForgotPassword;