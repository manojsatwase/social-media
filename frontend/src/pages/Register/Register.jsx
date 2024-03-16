import React, { useEffect, useState } from 'react'
import { Typography,Button, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import { registerUserAPI } from '../../API/userApiCall';
import Loading from '../../components/Loading/Loading';
import { clearErrors } from '../../redux/slice/userSlice';

import "./Register.css";

const Register = () => {
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [avatar,setAvatar] = useState("");

const {loading,error,isAuthenticated} = useSelector(state=>state?.userInfo);

const dispatch = useDispatch();
const navigate = useNavigate();
const alert = useAlert();

// const resetForm = () => {
//   setName("");
//   setEmail("");
//   setPassword("");
//   setAvatar("");
// }

const registerHandler = async (e) => {
    e.preventDefault();
    await dispatch(registerUserAPI(name,email,avatar,password));
    // resetForm();
}  

useEffect(()=>{

  if(isAuthenticated){
    navigate("/account")
  }

  if(error){
    alert.error(error);
    // remember inside dispatch you need to call this clearMessagw function otherwise is not working
    dispatch(clearErrors());
  }

},[dispatch,navigate,isAuthenticated,alert,error])



const handleImageChange = (e) => {
  const file = e.target?.files[0];
  const Reader = new FileReader();
  Reader.readAsDataURL(file);
  Reader.onload = () => {
    // 0 means initial 
    // 1 processing
    // 2 process done
    if(Reader.readyState === 2){
      setAvatar(Reader?.result);
    }
  }
}

  return (
    <div className='register'>
        <form className='registerForm' onSubmit={registerHandler}>
         <Typography variant='h3' style={{padding:"2vmax"}}>
            Social App
         </Typography>
         <Avatar sx={{width:"10vmax",height:"10vmax"}} src={avatar} alt='user' />
          <input type="file" accept="image/*" onChange={handleImageChange} />
         <input type='text' className="registerInputs" placeholder='Name'required value={name} onChange={({target:{value}})=>setName(value)}/>
         <input type='email' className="registerInputs" placeholder='Email'required value={email} onChange={({target:{value}})=>setEmail(value)}/>
         <input type='password'className="registerInputs" placeholder='password' required value={password} onChange={({target:{value}})=>setPassword(value)} />
         <Button type='submit' disabled={loading}>{loading ? <Loading/> : "Register" }</Button>
         <Link to='/'>
            <Typography>Already Sign In? Login now</Typography>
         </Link>
        </form>
    </div>
  )
}

export default Register;