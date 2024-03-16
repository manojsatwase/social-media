  import React, {useEffect, useState } from 'react';

  import { useDispatch, useSelector} from "react-redux";
  import { Avatar, Button, Typography ,Dialog} from '@mui/material';
  import {Link} from "react-router-dom";
  import {
      MoreVert,
      Favorite,
      FavoriteBorder,
      ChatBubbleOutline,
      DeleteOutline,

  } from "@mui/icons-material";

  import { addCommentAPI, postLikeUnlikeAPI } from '../../API/postApiCall';

  import "./Post.css";
  import { getFollowingPostsAPI, getUserPostsAPI, loadUserAPI } from '../../API/userApiCall';
  import User from '../User/User';
  import CommentCard from '../CommentCard/CommentCard';
import { deleteMyPostAPI, myPostAPI, updateCaptionAPI } from '../../API/myPostApiCall';
import Loading from '../Loading/Loading';


  const Post = ({
      postId,
      caption,
      postImage,
      likes = [],
      comments =[],
      ownerImage,
      ownerName,
      ownerId,
      isDelete = false , 
      isAccount = false,
      tabLike,
      userId
    }) => {

  const dispatch = useDispatch();
  const [liked,setLiked] = useState(false);
  const [likeModel,setLikeModel] = useState(false);
  const [commentModel,setCommentModel] = useState(false);
  const [commentValue,setCommentValue] = useState("");
  const [captionValue,setCaptionValue] = useState(caption);
  const [captionModal,setCaptionModel] = useState(false);

  const user = useSelector(state => state.userInfo.user);
  const {loading} = useSelector(state=>state.myPosts)
 
  const handlelike = async () => {
    setLiked(!liked)
    // Resolve instance like and not updating like issue using async function
    await dispatch(postLikeUnlikeAPI(postId));
    if(isAccount){
      // Owner account post: make API call and reuse post component for account post
      dispatch(myPostAPI());
    }
    if(["home","account"].includes(tabLike)){
      // follow post show only
      dispatch(getFollowingPostsAPI());
    }
    if(["userProfile"].includes(tabLike)){
      dispatch(getUserPostsAPI(userId));
    }
    
  }

  useEffect(() => {
    // This useEffect is used to handle the case where the like status needs to be updated based on the user's likes.
    // Without this useEffect, updating the like status could cause multiple updates and potentially lead to an infinite loop.
    likes?.forEach(item => {
      if(item?._id === user?._id){
        // Resolve issue like and unlike post and active state and active like color based on active user like
        setLiked(true);
      }
    })
  }, [likes, user._id]);

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentAPI(postId,commentValue));
    if(isAccount){
      // dispatch(deleteMyPostCommentAPI(postId))
      dispatch(myPostAPI());
    }else{
      dispatch(getFollowingPostsAPI());
    }
  
  }

  const handlePostDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteMyPostAPI(postId));
     dispatch(myPostAPI());
     // load user fresh data after deleting my post 
     dispatch(loadUserAPI());
  }

  const updateCaptionHandler = async(e) => {
    e.preventDefault();
   await dispatch(updateCaptionAPI(captionValue,postId))
    dispatch(myPostAPI());
  }

// useEffect(() => {
//   const timer = setTimeout(() => {
//     setCommentModel(true);
//   },0);

//   return () => clearTimeout(timer);
  
// },[postId]);

  return (
    <div className='post'>
       <div className='postHeader'>
        {isAccount && (
           <Button style={{cursor:"pointer"}} onClick={()=>setCaptionModel(!captionModal)}><MoreVert /></Button>
        )}
         </div>
         <img src={postImage} alt='Post' />
          <div className='postDetails'>
            <Avatar src={ownerImage} alt='User' sx={{
                height:"3vmax",
                width:"3vmax",
                cursor:"pointer"
            }} />
            <Link to={`/user/${ownerId}`}>
                <Typography fontWeight={700}>{ownerName}</Typography>
            </Link>

            <Typography 
                fontWeight={100}
                color="rgba(0 , 0, 0 ,0.582)"
                style={{alignSelf:"center"}}
            >
                {caption}
            </Typography>
          </div>
          <button style={{
            border:"none",
            backgroundColor:"white",
            cursor:"pointer",
            margin:"1vmax 2vmax"
          }}
          onClick={()=>setLikeModel(!likeModel)}
          disabled={likes.length === 0 ? true : false}
          >
            <Typography>{likes?.length} Likes</Typography>
          </button>
        <div className="postFooter">
            <Button onClick={handlelike}>
               {liked ? <Favorite style={{color:" #ff69b4",cursor:"pointer"}}/> :  <FavoriteBorder/>}
            </Button>
            <Button onClick={()=>setCommentModel(!commentModel)}>
                <ChatBubbleOutline/>
            </Button>
            { isDelete && (
                <Button onClick={handlePostDelete}>{loading ? <Loading /> : <DeleteOutline/>}</Button>
            )}
        </div>
        {/* like diglog box */}
        <Dialog open={likeModel} onClose={()=>setLikeModel(!likeModel)}>
          <div className='DialogBox'>
             <Typography variant='h4'>Like By</Typography>
              {
                likes.map(like=>(
                  // re-use user component
                  <User 
                  key={like._id}
                  userId={like._id}
                  name={like.name}
                  avatar={like.avatar.url}
                  />
                ))
              }
            
          </div>
        </Dialog>
        {/* comment diaglog box */}
        <Dialog open={likeModel} onClose={()=>setLikeModel(!likeModel)}>
          <div className='DialogBox'>
             <Typography variant='h4'>Like By</Typography>
              {
                likes.map(like=>(
                  // re-use user component
                  <User 
                  key={like._id}
                  userId={like._id}
                  name={like.name}
                  avatar={like.avatar.url}
                  />
                ))
              }
            
          </div>
        </Dialog>
          <Dialog open={commentModel} onClose={()=>setCommentModel(!commentModel)}>
          <div className='DialogBox'>
             <Typography variant='h4'>Comments</Typography>
             <form className='commentForm' onSubmit={(e) => addCommentHandler(e)}>
             <input 
               type='text'
               placeholder='Comment Here...'
               required
               value={commentValue}
               onChange={({target:{value}})=>setCommentValue(value)}
               />
               <Button 
                type='submit'
                variant='contained'>
                 Add
               </Button>
             </form>
              {
                comments?.length ? comments.map(item=>(
                   <CommentCard
                   userId={item.user._id}
                   name={item.user.name}
                   avatar={item.user.avatar}
                   comment={item.comment}
                   commentId={item._id}
                   postId={postId}
                   isAccount={isAccount}
                   createdAt={item.createdAt}
                  />     
                )) : (
                  <Typography>No Comment Yet</Typography>
                )
              }
            
          </div>
        </Dialog>
        <Dialog open={captionModal} onClose={()=>setCaptionModel(!captionModal)}>
          <div className='DialogBox'>
             <Typography variant='h4'>Updated caption</Typography>
             <form className='commentForm' onSubmit={updateCaptionHandler}>
             <input 
               type='text'
               placeholder='Update Caption ...'
               required
               value={captionValue}
               onChange={({target:{value}})=>setCaptionValue(value)}
               />
               <Button 
                type='submit'
                variant='contained'>
                 Update
               </Button>
             </form>
          </div>
        </Dialog>
       </div>
  )  
}  

export default Post;