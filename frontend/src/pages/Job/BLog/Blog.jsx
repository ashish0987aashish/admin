import React from 'react'
import { data, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../utils/axiosinstance'
import EmptyCard from '../../../components/Card/EmptyCard'
import Blogbar from '../../../components/Blogbar'
import BlogCard from '../../../components/Card/BlogCard'
import ViewBlog from './ViewBlog'
import AddEditBlog from './AddEditBlog'
import { useEffect, useState } from 'react'



import {IoIosCreate} from 'react-icons/io'

import Modal from 'react-modal'


import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


const Blog = () => {

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null)
  const [allBlogs,setAllBlogs] = useState([])


  const [openViewBlogModal,setOpenViewBlogModal] = useState({
    isShown:false,
    data:null
  })


  const [AddEditBlogModal,setAddEditBlogModal] = useState({
    isShown:false,
    type:"add",
    data:null
  })



   
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

     const getAllBlogs = async()=>{

        try{
            const response = await axiosInstance.get("/get-all-blogs")

            if(response.data && response.data.blogs ){
               setAllBlogs(response.data.blogs)
            }

        }catch(error){
            console.log("something went wrong while fetching data")
        }
     }



     // delete blog 

     const deleteBlog = async(blog)=>{
        
        const blogId = blog._id

         try{

            const response = await axiosInstance.delete("/delete-blog/"+blogId)

            if(response.data && !response.data.error){

              toast.error("blog deleted successfully")
              setOpenViewBlogModal((prevstate)=>({...prevstate,isShown:false}))
              getAllBlogs()
            }

         }catch(error){
         
             console.log("an unexpected error occurred please try again")
         }
     }


     // handle view blog 

     const handleReadBlog = (data)=>{
        setOpenViewBlogModal({
          isShown:true,
          data
        })
     }


     // handle edit blog

     const handleEditBlog = (data)=>{
        setAddEditBlogModal({
          isShown:true,
          type:"edit",
          data
        })
     }





     useEffect(()=>{

      getUserInfo()
      getAllBlogs()

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
           bManagerName={blog.bManagerName}
           onReadMore={()=>{handleReadBlog(blog)}}
           onEdit={()=>{handleEditBlog(blog)}}
         />)      
         
       }).reverse()}
          
      </div>): (

        <EmptyCard message={"oops! no blog found"}/>
      )}     


      {/*viewBlogModal*/}

      <Modal
       
       isOpen={openViewBlogModal.isShown}
       onRequestClose={()=>{ setOpenViewBlogModal((prevstate)=>({...prevstate,isShown:false}))}}
       style={{
             overlay:{
              backgroundColor:"rgba(0,0,0,0.4)",
              zIndex:999,
             },
             content: {
              top: 0, // Start at the top of the screen
              left: 0, // Start at the left of the screen
              right: 0, // Stretch to the right edge
              bottom: 0, // Stretch to the bottom edge
              margin: "0", // Remove default margins
              padding: "0", // Remove default padding
              border: "none", // Remove border
              height: "100vh", // Full viewport height
              width: "100vw", // Full viewport width
              overflow: "auto", // Allow scrolling if necessary
              backgroundColor: "white", // Ensure a consistent background color
            },
       }}
        appElement={document.getElementById("root")}
        className="modal-box "
   >
 
     <ViewBlog
      
      blogInfo={openViewBlogModal.data||null}
      onClosing={()=>{
        setOpenViewBlogModal((prevstate)=>({...prevstate,isShown:false}))
      }}

      onEditClick={()=>{
          setOpenViewBlogModal((prevstate)=>({
                ...prevstate,isShown:false
          }))
          handleEditBlog(openViewBlogModal.data||null)
      }}

      onDeleteClick={()=>{
         deleteBlog(openViewBlogModal.data||null)
      }}
      
     />

   </Modal>

     

      {/* AddEditBlogModal */}


      <Modal
       
           isOpen={AddEditBlogModal.isShown}
           onRequestClose={()=>{ setAddEditBlogModal((prevstate)=>({...prevstate,isShown:false}))}}
           style={{
                 overlay:{
                  backgroundColor:"rgba(0,0,0,0.4)",
                  zIndex:999,
                 },
                 content: {
                  top: 0, // Start at the top of the screen
                  left: 0, // Start at the left of the screen
                  right: 0, // Stretch to the right edge
                  bottom: 0, // Stretch to the bottom edge
                  margin: "0", // Remove default margins
                  padding: "0", // Remove default padding
                  border: "none", // Remove border
                  height: "100vh", // Full viewport height
                  width: "100vw", // Full viewport width
                  overflow: "auto", // Allow scrolling if necessary
                  backgroundColor: "white", // Ensure a consistent background color
                },
           }}
            appElement={document.getElementById("root")}
            className="modal-box "
       >
     
         <AddEditBlog
         type={AddEditBlogModal.type}
         blogInfo={AddEditBlogModal.data}
         onClosing={() => {
           setAddEditBlogModal({ isShown: false, type: "add",data});
         }}
          getAllBlogs={getAllBlogs}

       />

       </Modal>





        <button
              className="w-20 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500  fixed right-10 bottom-10 hover:bg-gradient-to-l active:scale-95 duration-75 text-white"
              onClick={() => {
                setAddEditBlogModal({ isShown: true, type: "add", data: null });
              }}
            >
             <IoIosCreate  size={38}/>
            </button>
      
      <ToastContainer/>
    </>
  )
}

export default Blog