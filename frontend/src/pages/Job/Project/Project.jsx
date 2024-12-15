import React,{useState,useEffect} from 'react'

import {data, useNavigate} from 'react-router-dom'
import axiosInstance from '../../../utils/axiosinstance'
import ProjectCard from '../../../components/Card/ProjectCard'
import Projectbar from   '../../../components/Projectbar'
import EmptyCard from '../../../components/Card/EmptyCard'
import ViewProject from './ViewProject'
import AddEditProject from './AddEditProject'

import { MdCreateNewFolder } from 'react-icons/md';




import Modal from 'react-modal'

import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


const Project = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null)
  const [allProjects,setAllProjects] = useState([])


  const [openViewProjectModal,setOpenViewProjectModal] = useState({
    isShown:false,
    data:null
  })

  const [AddEditProjectModal,setAddEditProjectModal] = useState({
    isShown:false,
    type:"add",
    data:null
  })


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


     // delete project 
      const deleteProject = async(project)=>{


           const projectId = project._id

           try{

               const response = await axiosInstance.delete("/delete-project/"+projectId)

                if(response.data && !response.data.error){

                   toast.error("project deleted successfully")
                   setOpenViewProjectModal((prevstate)=>({...prevstate,isShown:false}))
                   getAllProjects();
                }
           }catch(error){

             console.log("un unexpected error occurred please try again")
           }
      }
     



    // handle view project 

       const handleViewProject = (data)=>{
        setOpenViewProjectModal({
          isShown:true,
          data
        })
         
       }   

    // handle edit project 
    
        const handleEditProject = (data) =>{

          setAddEditProjectModal({
            isShown:true,
            type:"edit",
            data
          })
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
           pManagerName={project.pManagerName}
           onClick={()=>{handleViewProject(project)}}
           onEdit={()=>{handleEditProject(project)}}
           
         />)      
         
       }).reverse()}
          
      </div>):(

        <EmptyCard  message={" oops! no project found"}/>
      )}



       {/*view project modal*/}

       <Modal
       
           isOpen={openViewProjectModal.isShown}
           onRequestClose={()=>{ setOpenViewProjectModal((prevstate)=>({...prevstate,isShown:false}))}}
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
     
         <ViewProject
          
          projectInfo={openViewProjectModal.data||null}
          onClose={()=>{
            setOpenViewProjectModal((prevstate)=>({...prevstate,isShown:false}))
          }}

          onEditClick={()=>{
              setOpenViewProjectModal((prevstate)=>({
                    ...prevstate,isShown:false
              }))
              handleEditProject(openViewProjectModal.data||null)
          }}

          onDeleteClick={()=>{
             deleteProject(openViewProjectModal.data||null)
          }}
          
         />

       </Modal>


          {/*AddEditProjectModal*/}

       <Modal
       
           isOpen={AddEditProjectModal.isShown}
           onRequestClose={()=>{ setAddEditProjectModal((prevstate)=>({...prevstate,isShown:false}))}}
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
     
         <AddEditProject
         type={AddEditProjectModal.type}
         projectInfo={AddEditProjectModal.data}
         onClose={() => {
           setAddEditProjectModal({ isShown: false, type: "add",data});
         }}
         getAllProjects={getAllProjects}
       />

       </Modal>

         <button
        className="w-20 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500  fixed right-10 bottom-10 hover:bg-gradient-to-l active:scale-95 duration-75"
        onClick={() => {
          setAddEditProjectModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdCreateNewFolder className="text-[32px] text-white" />
        
      </button>

       

      <ToastContainer/>
    </>
  )
}

export default Project