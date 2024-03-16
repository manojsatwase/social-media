import React, { useEffect, useState } from 'react'


import { Typography,Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAPI } from '../../API/userApiCall';
import { clearErrors } from '../../redux/slice/userSlice';
import { useAlert } from 'react-alert';
import Loading from '../Loading/Loading';

import {clearErrors as clearDeleteUserErrors, clearMessage} from '../../redux/slice/myPostsSlice';

import "./Login.css";

const Login = () => {
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const dispatch = useDispatch();
const alert = useAlert();

const {error,loading} = useSelector(state => state?.userInfo)
const {error:errorDeleteUser,message} = useSelector(state => state?.myPosts);

const loginHandler = (e) => {
  e.preventDefault();
  dispatch(loginUserAPI(email,password));
} 

 
 useEffect(() => {
  if(error){
    alert.error(error);
    // remember inside dispatch you need to call this clearMessagw function otherwise is not working
    dispatch(clearErrors());
  }
  if(errorDeleteUser){
    alert.error(errorDeleteUser);
    dispatch(clearDeleteUserErrors());
  }
  if(message){
    alert.success(message);
    dispatch(clearMessage());
  }

 },[error,alert,dispatch,errorDeleteUser,message]);


return (
  <div className='login'>
      <form className='loginForm' onSubmit={loginHandler}>
        <Typography variant='h3' style={{padding:"2vmax"}}>
          Social App
        </Typography>
        <input type='email' placeholder='Email'required value={email} onChange={({target:{value}})=>setEmail(value)}/>
        <input type='password' placeholder='password' required value={password} onChange={({target:{value}})=>setPassword(value)} />
        <Link to="/forgot/password">
          <Typography variant='h6' style={{padding:"2vmax"}}>
              Forgot Password
          </Typography>
        </Link>
        <Button type='submit' disabled={loading}>{loading ? <Loading /> : "Login"}</Button>
        <Link to='/register'>
          <Typography>New User? </Typography>
        </Link>
      </form>
  </div>
)
}

export default Login;