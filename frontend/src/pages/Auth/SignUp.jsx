import React,{useState} from 'react'
import PasswordInput  from '../../components/Input/PasswordInput'
import {useNavigate} from 'react-router-dom'
import {validateEmail} from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'
import AccessCodeInput from '../../components/Input/AccessCodeInput'

const SignUp = () => {
    
  const [fullname,setFullname] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword]= useState('')
  const [creatorAccess,setCreatorAccess] = useState("")
  const [error,setError] = useState(null)


  const navigate = useNavigate();
  
  
  const handleSignUp=async(e)=>{

    e.preventDefault();  // Prevent form submission (page reload)

  
  if(!fullname){
     setError("Please enter your fullname")
     return;
  }

  if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return;
  }

  if(!password){
    setError("Please enter a password")
    return;
  }

  if(!creatorAccess){
    setError("give the accesscode to create account")
    return
  }


  setError("")

    // backend create-account api call 

    try{
       
        const response = await axiosInstance.post("/create-account",{
          
           fullName:fullname,
           email:email,
           password:password,
           creatorAccess:creatorAccess
        })

      

        if(response){
         
          console.log(response.data)
       }
     
       // if call succesfull redirect dashboard 
         
       if(response.data && response.data.accessToken){
        
          
        
          localStorage.setItem("token",response.data.accessToken)
          navigate("/dashboard")
       }



    }catch(error){
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred please try again");
      }
    }

  }


  return (
    <div className='w-screen h-screen bg-[#eaf3fb] flex justify-center items-center'>
     <div className="flex justify-start items-center flex-col h-2/3">
       
       <h1 className="text-4xl text-blue-600 text-center font-extrabold pb-7 bg-gradient-to-r from-purple-500 via-green-500 to-blue-500 bg-clip-text text-transparent ">My Website</h1>

       <div className='w-96 h-96 bg-white shadow-2xl rounded-xl flex justify-center items-center flex-col'>

        <h2 className='text-slate-950 text-xl text-center  font-bold underline'>SIGNUP</h2>


        <form className='w-full h-full flex justify-around items-center flex-col' onSubmit={handleSignUp} action="">


        
        <div className="w-3/4 flex items-center bg-slate-200 px-5 text-gray-700 rounded mb-3 ">

          <input type="text" 
           value={fullname}
           onChange={({target})=>{
            setFullname(target.value)
           }}
           placeholder="fullname"
           className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none font-bold" 
          />
        </div>

        <div className="w-3/4 flex items-center bg-slate-200 px-5 text-gray-700 rounded mb-3 ">

          <input type="email"
           value={email}   
            onChange={({target})=>{
              setEmail(target.value)
            }}
           placeholder= "email"
           className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none font-semibold" 
          />
        </div>

        <PasswordInput
        
          value={password}
          onChange={({target})=>{
            setPassword(target.value)
          }}
        />

   


        <AccessCodeInput
        
          value={creatorAccess}
          onChange={({target})=>{
            setCreatorAccess(target.value)
          }}
        
        />

       {error && <p className="text-red-500 text-sm py-2">{error}</p>}

      <button type='submit'
      className='w-24 h-8 text-white bg-green-600 rounded-lg active:scale-95'>
       signup
      </button>
      

      </form>


        <p className='text-center text-sm text-gray-600'>or</p>
        
        <p
        onClick={()=>{
          navigate("/login")
        }}
        
        className='text-center text-lg text-blue-900 underline cursor-pointer active:text-blue-600 pb-3'>have an account? login</p>   

      </div>   

       </div>
    </div>
  )
}

export default SignUp
