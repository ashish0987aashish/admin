import React,{useState,useEffect} from 'react'

import {data, useNavigate} from 'react-router-dom'
import axiosInstance from '../../../utils/axiosinstance'
import Projectbar from   '../../../components/Projectbar'
import UserCard from '../../../components/Card/UserCard'
import Modal from "react-modal";




import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import DelUser from './DelUser'


const User = () => {

    const navigate = useNavigate();
    
      const [userInfo, setUserInfo] = useState(null)
      const [allUsers,setAllUsers] = useState([])


      const[openDeleteUserModal,setopenDeleteUserModal] = useState({
        isShown:false,
        data:null
      })

      const [accessCode,setAccessCode] = useState("")

      const [error,setError] = useState("")

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




// get  all the  Users

const getAllUsers = async() =>{

  try{
      const response = await axiosInstance.get("/get-all-users")

       if(response.data && response.data.users){
 
         setAllUsers(response.data.users)


       }

  }catch(error){
        console.log("an unexpected error occured. please try again")
  }

}



  // handle delete  user

  const deleteUserData = async(User) =>{

     const userId = User._id

     try{
     
      if(!accessCode){

        setError("AccessCode required")
      }else{
        setError("")
      }  

     
         
      const response = await axiosInstance.request({
        url: `/delete-user/${userId}`,
        method: 'DELETE',
        data: { deleteAccess: accessCode }, // Add the accessCode to the request body
      });

      if(response.data && !response.data.error){

        console.log(response.data) 
         toast.error("user deleted successfully")
         setopenDeleteUserModal((prevstate)=>({...prevstate,isShown:false}))
         getAllUsers()
      }

     }catch(error){

      if (error.response) {
        console.log(error.response.data.message); // Log the error message from backend
        setError(error.response.data.message || "An unexpected error occurred");
      } 
     }

  }


  const openDelUser = (data)=>{
    
     setopenDeleteUserModal({
      isShown:true,
      data
     })
  }
  






  useEffect(() => {
    getUserInfo();
    getAllUsers();

    return () => { }
  }, [])


  return (
    <>

        <Projectbar  userInfo={userInfo}/>
        
        <div  className=' text-3xl text-center pt-10 font-bold flex justify-center'>
          <p className='underline text-center'>USERS</p>
          <p className='text-center'>(Admins)</p>
          
        </div>   

        <div className='w-full h-auto flex justify-around items-center flex-col  p-10 gap-4 '>
        {allUsers.map((User,index)=>{
              
             
              return(<UserCard
                    key={index}
                    User={User}
                   onDelUser={()=>{openDelUser(User)}}
              />)      
              
            })}

         </div>   

         <Modal
       
       isOpen={openDeleteUserModal.isShown}
       onRequestClose={()=>{ setopenDeleteUserModal((prevstate)=>({...prevstate,isShown:false}))}}
       style={{
             overlay:{
              backgroundColor:"rgba(0,0,0,0.4)",
              zIndex:999,
              display: "flex", // Add flexbox for centering
              justifyContent: "center",
              alignItems: "center",
             },
       }}
        appElement={document.getElementById("root")}
        className="modal-box outline-none w-80 h-80 shadow-lg "
   >
 
     <DelUser
      
      info={openDeleteUserModal.data||null}
      onClose={()=>{
        setopenDeleteUserModal((prevstate)=>({...prevstate,isShown:false}))
      }}

      accessCode={accessCode}
      setAccessCode={setAccessCode}
      onDeleteClick={()=>{
         deleteUserData(openDeleteUserModal.data||null)
      }}

      error={error}
      
     />

   </Modal>
    <ToastContainer/>
         
    </>
  )
}

export default User