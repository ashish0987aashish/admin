import React from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../utils/axiosinstance'
import EmptyCard from '../../../components/Card/EmptyCard'
import Blogbar from '../../../components/Blogbar'
import BlogCard from '../../../components/Card/BlogCard'
import { useEffect, useState } from 'react'


import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const Blog = () => {

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null)
  const [allBlogs,setAllBlogs] = useState([])

   
   // getting userInfo 

     const getUserInfo = async() =>{
   
      try{

        const response = await axiosInstance.get("/get-user")

        if(response.data && response.data.user){
          setUserInfo(response.data.user)
        }

      }catch(error){

         if(error.response.status == 401){
            
            localStorage.clear()
            navigate("/login")
         }

      }
     }


     // getting all blogs 

     const getAllBLogs = async()=>{

        try{
            const response = await axiosInstance.get("/get-all-blogs")

            if(response.data && response.data.blogs ){
               setAllBlogs(response.data.blogs)
            }

        }catch(error){

        }
     }


     useEffect(()=>{

      getUserInfo()
      getAllBLogs()

      return ()=>{}
     },[])

  return (
    <>
    <Blogbar userInfo={userInfo}/>
    <h1  className=' text-3xl underline text-center pt-10 font-bold'>BLOGS</h1>   
     {
      allBlogs.length >0?(
    <div className='w-full h-auto flex justify-around flex-wrap  p-10 gap-4 '>
       {allBlogs.map((blog,index)=>{
              
         return(<BlogCard
         
           key={blog._id}
           bTitle={blog.bTitle}
           bDesc={blog.bDesc}
           bImgs={blog.bImgs}
           postDate={blog.postDate}
           fullName={blog.fullName}
         />)      
         
       }).reverse()}
          
      </div>): (

        <EmptyCard message={"oops! no blog found"}/>
      )

      }     

    </>
  )
}

export default Blog