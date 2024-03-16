import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { clearErrors, clearMessage } from '../../redux/slice/myPostsSlice';
import { resetPasswordAPI } from '../../API/myPostApiCall';
import Loading from '../../components/Loading/Loading'

import "./ResetPassword.css";

const ResetPassword = () => {
 const {loading,error,message} = useSelector(state => state?.myPosts);
 const [newPassword,setNewPassword] = useState("");

 const alert = useAlert();
 const dispatch = useDispatch();
 const  {token} = useParams();

const submitHandler = (e) => {
  e.preventDefault();
  dispatch(resetPasswordAPI(token,newPassword));
}

useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
  }, [alert, error, dispatch, message]);

 return (
    <div className='resetPassword'>
    <form className='resetPasswordForm' onSubmit={submitHandler}>
      <Typography variant='h3' style={{padding:"2vmax"}}>
        Social App
      </Typography> 
      <input type='password' className='resetPasswordInputs' placeholder='new password' required value={newPassword} onChange={({target:{value}})=>setNewPassword(value)} /> 
      <Button type='submit' disabled={loading}>{loading ? <Loading /> : "Change Password"}</Button>
      <Link to="/forgot/password">
        <Typography>
           Request Another Token!
        </Typography>
      </Link>
      <Typography>OR</Typography>
      <Link to='/'>
        <Typography>Login now</Typography>
    </Link>
    </form>
</div>
  )
}

export default ResetPassword