import React, { useState } from 'react'
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAPI } from '../../API/userApiCall';
import User from "../../components/User/User";

import "./Search.css";
const Search = () => {
  const [name,setName] = useState("");
  
  const dispatch = useDispatch();

  const {users,loading} = useSelector(state => state.users);

  const submitHandler = (e) => {
    e.preventDefault();
    // we are re-using this function for all user and search search 
    // if name is empty then we get all users otherwise search user on name
    dispatch(getAllUsersAPI(name));
    setName("");

  }
 
  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography>

        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Search
        </Button>

        <div className="searchResults">
          {
            users?.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))}
        </div>
      </form>
    </div>
  )
}

export default Search