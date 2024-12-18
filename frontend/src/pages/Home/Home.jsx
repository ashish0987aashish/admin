import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import axiosInstance from '../../utils/axiosinstance'
import { useNavigate } from 'react-router-dom'
import { FaFile, FaLongArrowAltRight } from 'react-icons/fa';

import { MdHome, MdBook, MdPerson } from 'react-icons/md';



const Home = () => {

   
   const nav = useRef() 


  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null)

  const [totalProjects,setTotalProjects] = useState(0) 
  const [totalBlogs,setTotalBlogs] = useState(0)
  const [totalUsers,setTotalUsers] = useState(0)



  // get user information 

  const getUserInfo = async () => {

    try {

      const response = await axiosInstance.get("/get-user");

      if (response.data && response.data.user) {

        setUserInfo(response.data.user)
      }

    } catch (error) {

      if (error.response.status === 401) {

        localStorage.clear();
        navigate("/login")
      }
    }

  }


    // get all projects 

    const getAllProjects = async()=>{
      
         const response = await axiosInstance.get("/get-all-projects")
         if(response.data && response.data.projects ){

          setTotalProjects(response.data.projects.length)

         }
    }


    // get all users 

     const getAllUsers = async()=>{

       const response = await axiosInstance.get("/get-all-users")
       if(response.data && response.data.users){
            
           setTotalUsers(response.data.users.length)
       }
     }


     // get all blogs 

     const getAllBlogs = async()=>{
         const response = await axiosInstance.get("/get-all-blogs")
         if(response.data && response.data.blogs){
    
             setTotalBlogs(response.data.blogs.length)
         }
     } 



    


  useEffect(() => {
    getUserInfo()
    getAllProjects()
    getAllBlogs()
    getAllUsers()
    return () => { }
  }, [])


  return (
    <div className='w-full h-screen m-0 p-0 flex flex-col'>
      <Navbar
        userInfo={userInfo}
      />

      <div className='dash w-full flex-1  flex ' >
      
           
           
      <div className=" w-1/4 h-full column1  border border-r-2 flex flex-col gap-1">

      <div className="dashboard h-16 font-bold flex justify-start  items-center hover:scale-95 duration-75 cursor-pointer active:scale-100 bg-blue-100 pl-10 active">
               <MdHome size={30} className='text-neutral-800'/>
              <p className="text-xl text-center flex  items-center">
                
                Dashboard
              </p>
             
            </div>

     <div className="project h-16 font-bold flex justify-start items-center hover:scale-95 duration-75 cursor-pointer active:scale-100  hover:bg-blue-100 pl-10" 
        
        onClick={()=>{navigate('/project')}}
     >

            <FaFile size={20} className='text-amber-400'/>
              <p className="text-xl text-center flex  items-center">
              
                Manage Project
              </p>
             
            </div>

     <div className="blog h-16 font-bold flex justify-start items-center hover:scale-95 duration-75 cursor-pointer active:scale-100 pl hover:bg-blue-100 pl-10 "
          onClick={()=>{navigate('/blog')}}
     >
              <MdBook size={26} className='text-purple-500'/>
              <p className="text-xl text-center flex  items-center">
               
                Manage Blog
              </p>
            </div>

     <div className="user h-16 font-bold flex justify-start items-center hover:scale-95 duration-75 cursor-pointer active:scale-100  hover:bg-blue-100 pl-10 "
     
         onClick={()=>{navigate('/user')}}
     >
                <MdPerson size={30} className='text-blue-500'/>
              <p className="text-xl text-center flex  items-center">
                
                Manage User
              </p>
             
            </div>



      </div>



      <div className='w-3/4 h-full  column2 '>
         
       <div className="datacontainer pt-10 flex justify-evenly items-center">
         

         <div className='w-64 h-44 bg-gradient-to-r from-amber-300 to-amber-400 rounded-lg  text-white cursor-pointer hover:scale-95 duration-75 shadow-md'>
           <h3 className='text-center text-2xl pt-7 font-bold'>Toal Projects</h3>

           <div className='text-2xl flex justify-center items-center w-full font-semibold'>
           <FaFile size={20} className='text-white'/>
           {totalProjects}
           </div>
          
         </div>

         <div className='w-64 h-44 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg text-white cursor-pointer hover:scale-95 duration-75 shadow-md'>
         <h3 className='text-center text-2xl pt-7 font-bold'>Toal Blogs</h3>
           
         <div className='text-2xl flex justify-center items-center w-full font-semibold'>
         <MdBook size={26} className='text-white'/>
          {totalBlogs}
         </div>
         </div> 

         <div className='w-64 h-44 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg text-white cursor-pointer hover:scale-95 duration-75 shadow-md'>
         <h3 className='text-center text-2xl pt-7 font-bold'>Toal Users(admin)</h3>
            
           <div className='text-2xl flex justify-center items-center w-full font-semibold'>
           <MdPerson size={30} className='text-white'/>
            {totalUsers}
           </div>
         </div>


       </div>
               

      </div>


      </div>


    </div>
  )
}

export default Home
