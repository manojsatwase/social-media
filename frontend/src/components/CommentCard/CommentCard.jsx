    import React from 'react'
    import "./CommentCard.css";
    import { Link } from 'react-router-dom';
    import { Button, Typography } from '@mui/material';
    import { Delete } from "@mui/icons-material";
    import { useDispatch, useSelector } from 'react-redux';
    import { getFollowingPostsAPI } from '../../API/userApiCall';
    import { deleteCommentAPI } from '../../API/postApiCall';
import { myPostAPI } from '../../API/myPostApiCall';

    const CommentCard = ({
    userId,
    name,
    avatar,
    comment,
    commentId,
    postId,
    isAccount,
    createdAt
    }) => {
    
   const dispatch = useDispatch();
    
   const user = useSelector(state=>state.userInfo.user);
    
   const deleteCommentHandler = async (e) => {
     e.preventDefault();
     await dispatch(deleteCommentAPI(postId,commentId));
     if(isAccount){
      dispatch(myPostAPI());
     }else{
        dispatch(getFollowingPostsAPI());
     }
   }

   return (
    <div className='commentUser'>
      <Link to={`user/${userId}`}>
        <img src={avatar?.url} alt={name} />
         <Typography style={{minWidth:"6vmax"}}>
            {name}
         </Typography>
      </Link>
      <Typography>{comment}</Typography>
       {isAccount ? (
        <Button onClick={deleteCommentHandler}>
            <Delete/>
        </Button>
       ): userId === user._id ? (
        <Button onClick={deleteCommentHandler}>
            <Delete/>
        </Button>
       ) : null}
       <div style={{padding:"0.6rem"}}>
          <strong>
          Created At - {createdAt.substring(0,10)}
          </strong>
       </div>
    </div>
  )
}

export default CommentCard;