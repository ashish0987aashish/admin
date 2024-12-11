import React,{useState,useEffect} from 'react'

import {useNavigate} from 'react-router-dom'
import axiosInstance from '../../../utils/axiosinstance'
import ProjectCard from '../../../components/Card/ProjectCard'
import Projectbar from   '../../../components/Projectbar'
import EmptyCard from '../../../components/Card/EmptyCard'
import Modal from 'react-modal'

import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


const Project = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null)
  const [allProjects,setAllProjects] = useState([])



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




// get  all the projects 

const getAllProjects = async() =>{

  try{
      const response = await axiosInstance.get("/get-all-projects")

       if(response.data && response.data.projects){
 
         setAllProjects(response.data.projects)


       }

  }catch(error){
        console.log("an unexpected error occured. please try again")
  }

}



 

  

 

  useEffect(() => {
    getUserInfo();
    getAllProjects();

    return () => { }
  }, [])

  return (
    <>
      <Projectbar  userInfo={userInfo}/>
        
      <h1  className=' text-3xl underline text-center pt-10 font-bold'>PROJECTS</h1>   
     {

       allProjects.length >0 ?(
      <div className='w-full h-auto flex justify-around flex-wrap  p-10 gap-4 '>
       {allProjects.map((project,index)=>{
              
         return(<ProjectCard
         
           key={project._id}
           pTitle={project.pTitle}
           pDesc={project.pDesc}
           pImgs={project.pImgs}
           fromDate={project.fromDate}
           toDate={project.toDate}
           fullName={project.fullName}
         />)      
         
       }).reverse()}
          
      </div>):(

        <EmptyCard  message={" oops! no project found"}/>
      )

      
    
    }


    </>
  )
}

export default Project