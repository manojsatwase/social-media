MONGO_URL = 'mongodb://localhost:27017/SocialMedia'


// 
if token save cookie then token not mandatory for Authorization don't need pass 
if token can not store cookie then token is mandatory for Authorization
 Authorization: 
            click on Authorization 
                Type select =>  Bearer token
                      // pass token login user
              Token  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU4N2MzY2NlY2I5MTA4NTMxNGM3MjAiLCJpYXQiOjE3MDk3MzUwMTQsImV4cCI6MTcwOTgyMTQxNH0.KRDB5pZcZolx6FBDChEEmNegeleEvNatKFPArQQjxuU
///

----------------------------------------------------------

User => login
    REQUEST :
            method : POST
            url : localhost:4000/api/v1/login
            body:{
                   "email":"raj@gmail.com",
                   "password":"raj123"
                }

    RESPONSE :
          {
            "success": true,
            "user": {
                "avatar": {
                    "public_id": "sample id",
                    "url": "sample url"
                },
                "_id": "65e87c3ccecb91085314c720",
                "name": "raj",
                "email": "raj@gmail.com",
                "password": "$2b$10$wsVIVxXNa8YZ8OtWeZLQ6uUYUJuZHpBzOxGka1Sz7b857f6HNkGoa",
                "posts": [],
                "followers": [],
                "following": [],
                "__v": 0
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU4N2MzY2NlY2I5MTA4NTMxNGM3MjAiLCJpYXQiOjE3MDk3MzUwMTQsImV4cCI6MTcwOTgyMTQxNH0.KRDB5pZcZolx6FBDChEEmNegeleEvNatKFPArQQjxuU"
        }

------------------------------------------------

User => register
    REQUEST :
            method : POST
            url : localhost:4000/api/v1/post/create
            body : {
                    "name":"raj",
                    "email":"raj@gmail.com",
                    "password":"raj123"
                }

    RESPONSE:
            {
    "success": true,
    "message": "User registered successfully",
    "user": {
        "name": "raj",
        "avatar": {
            "public_id": "sample id",
            "url": "sample url"
        },
        "email": "raj@gmail.com",
        "password": "$2b$10$wsVIVxXNa8YZ8OtWeZLQ6uUYUJuZHpBzOxGka1Sz7b857f6HNkGoa",
        "posts": [],
        "followers": [],
        "following": [],
        "_id": "65e87c3ccecb91085314c720",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU4N2MzY2NlY2I5MTA4NTMxNGM3MjAiLCJpYXQiOjE3MDk3MzQ5NzIsImV4cCI6MTcwOTgyMTM3Mn0.IYC8HSmy6ciZmWsR7DxC-s4M85TUSxnHzxtuTc9Bk5s"
}

--------------------------------------------------------------

USER => update-password
    REQUEST :
            method : PUT
            url : localhost:4000/api/v1/update-password
            body : {
                    "oldPassword":"manish1234",
                    "newPassword":"manish123"
                }
            Authorization: 
            click on Authorization 
                Type select =>  Bearer token
                      // pass token login user
              Token  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU4N2MzY2NlY2I5MTA4NTMxNGM3MjAiLCJpYXQiOjE3MDk3MzUwMTQsImV4cCI6MTcwOTgyMTQxNH0.KRDB5pZcZolx6FBDChEEmNegeleEvNatKFPArQQjxuU
    
    RESPONSE :
         {
            "success": false,
            "message": "Password updated successfully"
        }

---------------------------------------------------------------


USER => Updated Profile 

    REQUEST :
            method : PUT
            url : localhost:4000/api/v1/update-profile
            body : {
                    "name":"manisha",     
                    "email":"manisha@gmail.com",    
                 }
            OR --- if we pass name or email
            body :{
                "name":"manish",   
            }

            Authorization: 
            click on Authorization 
                Type select =>  Bearer token
                      // pass token login user
              Token  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU4N2MzY2NlY2I5MTA4NTMxNGM3MjAiLCJpYXQiOjE3MDk3MzUwMTQsImV4cCI6MTcwOTgyMTQxNH0.KRDB5pZcZolx6FBDChEEmNegeleEvNatKFPArQQjxuU
   REQUEST :

        {
    "success": false,
    "user": {
        "avatar": {
            "public_id": "sample id",
            "url": "sample url"
        },
        "_id": "65e94662ae74167dc7a1ce76",
        "name": "manisha",
        "email": "manisha",
        "posts": [
            "65e946e0ae74167dc7a1ce7a"
        ],
        "followers": [],
        "following": [
            "65e87c3ccecb91085314c720"
        ],
        "__v": 14
    }
}

{
    "success": false,
    "user": {
        "avatar": {
            "public_id": "sample id",
            "url": "sample url"
        },
        "_id": "65e94662ae74167dc7a1ce76",
        "name": "manish",
        "email": "manisha",
        "posts": [
            "65e946e0ae74167dc7a1ce7a"
        ],
        "followers": [],
        "following": [
            "65e87c3ccecb91085314c720"
        ],
        "__v": 14
    }
}
------------------------------------------------------------------

POST => Create Post
    REQUEST :
            method : POST
            url : localhost:4000/api/v1/post/create
            body : {
                    "caption":"this is my most latest post"
                }
            Authorization: 
            click on Authorization 
                Type select =>  Bearer token
                      // pass token login user
              Token  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU4N2MzY2NlY2I5MTA4NTMxNGM3MjAiLCJpYXQiOjE3MDk3MzUwMTQsImV4cCI6MTcwOTgyMTQxNH0.KRDB5pZcZolx6FBDChEEmNegeleEvNatKFPArQQjxuU
    RESPONSE : 
            {
            "success": true,
            "post": {
                "caption": "this is my most latest post",
                "image": {
                    "public_id": "req.body.public.id",
                    "url": "req.body.url"
                },
                "owner": "65e87c3ccecb91085314c720",
                "likes": [],
                "_id": "65e87d5fcecb91085314c727",
                "createdAt": "2024-03-06T14:27:43.965Z",
                "comments": [],
                "__v": 0
            }
        }

--------------------------------------------------------

Post => Like and Deslike
    REQUEST :
                method : GET                     // post id
                url : localhost:4000/api/v1/post/65e8763be86f20c9b3fe4a48
                Authorization: 
                click on Authorization 
                    Type select =>  Bearer token
                        // pass token login user
                Token  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU4N2MzY2NlY2I5MTA4NTMxNGM3MjAiLCJpYXQiOjE3MDk3MzUwMTQsImV4cCI6MTcwOTgyMTQxNH0.KRDB5pZcZolx6FBDChEEmNegeleEvNatKFPArQQjxuU
    RESPONSE:
        {
            "success": true,
            "message": "Post liked."
        }

-------------------------------------------------------------

Post => Delete Post
 RESPONSE :
       method : DELETE                     // post id
       url : localhost:4000/api/v1/post/65e880ffcecb91085314c741
        Authorization: 
        click on Authorization 
            Type select =>  Bearer token
                // pass token login user
        Token  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU4N2MzY2NlY2I5MTA4NTMxNGM3MjAiLCJpYXQiOjE3MDk3MzUwMTQsImV4cCI6MTcwOTgyMTQxNH0.KRDB5pZcZolx6FBDChEEmNegeleEvNatKFPArQQjxuU
  
 RESPONSE :
        {
            "success": true,
            "message": "Successfully deleted post"
        }

----------------------------------------------------------


User => Follow and Unfollow
   REQUEST : 
      method : GET                       pass id user who want to follow
      url : localhost:4000/api/v1/follow-unfollow/65e87c3ccecb91085314c720
      Authorization: 
        click on Authorization 
            Type select =>  Bearer token
                // pass token login user
        Token  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU4N2MzY2NlY2I5MTA4NTMxNGM3MjAiLCJpYXQiOjE3MDk3MzUwMTQsImV4cCI6MTcwOTgyMTQxNH0.KRDB5pZcZolx6FBDChEEmNegeleEvNatKFPArQQjxuU

   RESPONSE :
     {
        "success": true,
        "message": "User followed successfully"
    }
 
 AGAIN SAME REQUEST : localhost:4000/api/v1/follow-unfollow/65e87c3ccecb91085314c720
  
     RESPONSE : 
       {
        "success": true,
        "message": "User Unfollowed successfully"
       }

---------------------------------------------------------

Get All User Post Who i'm following
first following the user we already created route for that about Post => Like and Deslike
 REQUEST : 
      method : GET                      
      url : localhost:4000/api/v1/posts
      Authorization: 
        click on Authorization 
            Type select =>  Bearer token
                // pass token login user
        Token  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU4N2MzY2NlY2I5MTA4NTMxNGM3MjAiLCJpYXQiOjE3MDk3MzUwMTQsImV4cCI6MTcwOTgyMTQxNH0.KRDB5pZcZolx6FBDChEEmNegeleEvNatKFPArQQjxu
RESPONSE :
        {
            "success": true,
            "posts": [
                {
                    "image": {
                        "public_id": "req.body.public.id",
                        "url": "req.body.url"
                    },
                    "_id": "65e87d5fcecb91085314c727",
                    "caption": "this is my most latest post",
                    "owner": "65e87c3ccecb91085314c720",
                    "likes": [],
                    "createdAt": "2024-03-06T14:27:43.965Z",
                    "comments": [],
                    "__v": 0
                }
            ]
        }

--------------------------------------------------

Updated Caption : 

 REQUEST : 
      method : PUT                     pass id which post you want to update only authorize user can allow post to update
      url : localhost:4000/api/v1/post/65e97f853dad2ac1fd6d42b3
      body :{
          "caption":"latest post"
      }
      Authorization: 
        click on Authorization 
            Type select =>  Bearer token
                // pass token login user
        Token  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU4N2MzY2NlY2I5MTA4NTMxNGM3MjAiLCJpYXQiOjE3MDk3MzUwMTQsImV4cCI6MTcwOTgyMTQxNH0.KRDB5pZcZolx6FBDChEEmNegeleEvNatKFPArQQjxu
    
RESPONSE :
       {
        "success": true,
        "message": "Post Updated"
      }


-------------------------------------------

Delete My Profile
REQUEST : 
      method : DELETE                    
      url : localhost:4000/api/v1/delete/me
      Authorization: 
        click on Authorization 
            Type select =>  Bearer token
                // pass token login user
        Token  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU4N2MzY2NlY2I5MTA4NTMxNGM3MjAiLCJpYXQiOjE3MDk3MzUwMTQsImV4cCI6MTcwOTgyMTQxNH0.KRDB5pZcZolx6FBDChEEmNegeleEvNatKFPArQQjxu
    
RESPONSE : 
    {
        "success": true,
        "message": "Profile Deleted"
    }

-----------------------------------------


Get My Profile
REQUEST : 
      method : GET                    
      url : localhost:4000/api/v1/me
      Authorization: 
        click on Authorization 
            Type select =>  Bearer token
                // pass token login user
        Token  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU4N2MzY2NlY2I5MTA4NTMxNGM3MjAiLCJpYXQiOjE3MDk3MzUwMTQsImV4cCI6MTcwOTgyMTQxNH0.KRDB5pZcZolx6FBDChEEmNegeleEvNatKFPArQQjxu

RESPONSE :
        {
    "success": true,
    "user": {
        "avatar": {
            "public_id": "sample id",
            "url": "sample url"
        },
        "_id": "65e87c3ccecb91085314c720",
        "name": "raj",
        "email": "raj@gmail.com",
        "posts": [
            {
                "image": {
                    "public_id": "req.body.public.id",
                    "url": "req.body.url"
                },
                "_id": "65e9b7c471e69227e316a473",
                "caption": "this is my first post",
                "owner": "65e87c3ccecb91085314c720",
                "likes": [],
                "createdAt": "2024-03-07T12:49:08.212Z",
                "comments": [],
                "__v": 0
            }
        ],
        "followers": [
            "65e85a744358a631a5e7337b",
            "65e87c3ccecb91085314c720",
            "65e94662ae74167dc7a1ce76"
        ],
        "following": [
            "65e87c3ccecb91085314c720"
        ],
        "__v": 50
    }
  }

-------------------------------------------------------------
GET SINGLE USER
REQUEST : 
     method : GET ,                        pass the user id
     url : localhost:4000/api/v1/user/65ea6176304edb6130b3fb80

 RESPONSE :
        {
    "success": true,
    "user": {
        "avatar": {
            "public_id": "sample id",
            "url": "sample url"
        },
        "_id": "65ea6176304edb6130b3fb80",
        "name": "raj",
        "email": "raj@gmail.com",
        "posts": [],
        "followers": [
            {
                "avatar": {
                    "public_id": "sample id",
                    "url": "sample url"
                },
                "_id": "65e9dbc1c127ebce3ca01c5f",
                "name": "manoj",
                "email": "manoj@gmail.com",
                "posts": [
                    "65ea684ce5ef91ec8129d9d0"
                ],
                "followers": [
                    "65ea6176304edb6130b3fb80"
                ],
                "following": [
                    "65ea6176304edb6130b3fb80"
                ],
                "__v": 15
            }
        ],
        "following": [
            {
                "avatar": {
                    "public_id": "sample id",
                    "url": "sample url"
                },
                "_id": "65e9dbc1c127ebce3ca01c5f",
                "name": "manoj",
                "email": "manoj@gmail.com",
                "posts": [
                    "65ea684ce5ef91ec8129d9d0"
                ],
                "followers": [
                    "65ea6176304edb6130b3fb80"
                ],
                "following": [
                    "65ea6176304edb6130b3fb80"
                ],
                "__v": 15
            }
        ],
        "__v": 7
    }
}

----------------------------------------------------------

GET ALL USERS
REQUEST : 
     method : GET ,                       
     url : localhost:localhost:4000/api/v1/users

RESPONSE : 
{
    "success": true,
    "users": [
        {
            "avatar": {
                "public_id": "sample id",
                "url": "sample url"
            },
            "_id": "65e9dbc1c127ebce3ca01c5f",
            "name": "manoj",
            "email": "manoj@gmail.com",
            "posts": [
                "65ea684ce5ef91ec8129d9d0"
            ],
            "followers": [
                "65ea6176304edb6130b3fb80"
            ],
            "following": [
                "65ea6176304edb6130b3fb80"
            ],
            "__v": 15
        },
        {
            "avatar": {
                "public_id": "sample id",
                "url": "sample url"
            },
            "_id": "65ea6176304edb6130b3fb80",
            "name": "raj",
            "email": "raj@gmail.com",
            "posts": [
                "65ea6920e5ef91ec8129d9e0"
            ],
            "followers": [
                "65e9dbc1c127ebce3ca01c5f"
            ],
            "following": [
                "65e9dbc1c127ebce3ca01c5f"
            ],
            "__v": 7
        }
    ]
}


-------------------------------------------------------------

ADD COMMENTS
   REQUEST : 
     method : POST ,                             pass post id which post you want to comment
     url : localhost:4000/api/v1/post/comments/65ea9d8be6a9254c8b6ca15a
     body :
       {
        "text":"beatiful pic"
      } 

RESPONSE :
   {
    "success": true,
    "post": {
        "image": {
            "public_id": "req.body.public.id",
            "url": "req.body.url"
        },
        "_id": "65ea9d8be6a9254c8b6ca15a",
        "caption": "this is my manoj post",
        "owner": "65ea6176304edb6130b3fb80",
        "likes": [],
        "createdAt": "2024-03-08T05:09:31.725Z",
        "comments": [
            {
                "user": "65ea6176304edb6130b3fb80",
                "comment": "beatiful pic",
                "_id": "65eaa30f3a9ecd219c9ed62f",
                "createdAt": "2024-03-08T05:33:03.360Z",
                "replies": []
            }
        ],
        "__v": 3
    }
}
-------------------------------------------------------------------

ADD COMMENTS =>
     REQUEST : 
     method : POST ,       
                    pass post id which post you want to comment and comment id  => emaple "/post/:postId/comments/:commentId/reply"
     url : localhost:4000/api/v1/post/65ea9d8be6a9254c8b6ca15a/comments/65eaa30f3a9ecd219c9ed62f/reply
     body :
        {
           "text":"nice pic my love"
        } 
    RESPONSE :
      {
    "success": true,
    "post": {
        "image": {
            "public_id": "req.body.public.id",
            "url": "req.body.url"
        },
        "_id": "65ea9d8be6a9254c8b6ca15a",
        "caption": "this is my manoj post",
        "owner": "65ea6176304edb6130b3fb80",
        "likes": [],
        "createdAt": "2024-03-08T05:09:31.725Z",
        "comments": [
            {
                "user": "65ea6176304edb6130b3fb80",
                "comment": "beatiful pic",
                "_id": "65eaa30f3a9ecd219c9ed62f",
                "createdAt": "2024-03-08T05:33:03.360Z",
                "replies": [
                    {
                        "user": "65ea6176304edb6130b3fb80",
                        "reply": "nice pic my love",
                        "_id": "65eaa38755798d4374b4d197",
                        "createdAt": "2024-03-08T05:35:03.876Z"
                    },
                    {
                        "user": "65ea6176304edb6130b3fb80",
                        "reply": "nice pic my babby",
                        "_id": "65eaa37355798d4374b4d191",
                        "createdAt": "2024-03-08T05:34:43.962Z"
                    }
                ]
            }
        ],
        "__v": 5
    }
}

-------------------------------------------------------------------------

UPDATE POST
 REQUEST : 
   method : PUT ,                               post id
   url : localhost:4000/api/v1/post/comments/65ea9d8be6a9254c8b6ca15a
   body:{
       "text":"nice pic"
   }

RESPONSE : 
{
    "success": true,
    "message": "Comment updated successfully",
    "post": {
        "image": {
            "public_id": "req.body.public.id",
            "url": "req.body.url"
        },
        "_id": "65ea9d8be6a9254c8b6ca15a",
        "caption": "this is my manoj post",
        "owner": "65ea6176304edb6130b3fb80",
        "likes": [],
        "createdAt": "2024-03-08T05:09:31.725Z",
        "comments": [
            {
                "user": "65ea6176304edb6130b3fb80",
                "comment": "beatiful pic",
                "_id": "65eaa30f3a9ecd219c9ed62f",
                "createdAt": "2024-03-08T05:33:03.360Z",
                "replies": [
                    {
                        "user": "65e9dbc1c127ebce3ca01c5f",
                        "reply": "hi dear how are you",
                        "_id": "65eaa6ef55798d4374b4d1ac",
                        "createdAt": "2024-03-08T05:49:35.159Z"
                    },
                    {
                        "user": "65ea6176304edb6130b3fb80",
                        "reply": "hi manoj",
                        "_id": "65eaa69455798d4374b4d1a3",
                        "createdAt": "2024-03-08T05:48:04.425Z"
                    },
                    {
                        "user": "65ea6176304edb6130b3fb80",
                        "reply": "nice pic my love",
                        "_id": "65eaa38755798d4374b4d197",
                        "createdAt": "2024-03-08T05:35:03.876Z"
                    },
                    {
                        "user": "65ea6176304edb6130b3fb80",
                        "reply": "nice pic my babby",
                        "_id": "65eaa37355798d4374b4d191",
                        "createdAt": "2024-03-08T05:34:43.962Z"
                    }
                ]
            }
        ],
        "__v": 7
    }
}



// git base

cd frontend
// rm -rf .git
cd ..
main 
// rm -rf .git