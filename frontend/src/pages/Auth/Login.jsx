import React,{useState} from 'react'
import PasswordInput  from '../../components/Input/PasswordInput'
import {useNavigate} from 'react-router-dom'
import {validateEmail} from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'


const Login = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword]= useState("")
  const [error,setError] = useState(null)
 
  const navigate = useNavigate()

  const handleLogin = async(e)=>{

    e.preventDefault()

    if(!validateEmail(email)){

      setError("Please enter a valid email")
      return;
    }

    if(!password){
      setError("Please enter a valid password")
      return;
    }

   setError("")


   // backend login api call


    try {

       const response = await axiosInstance.post("/login",{

        email:email,
        password:password,

       })


      // handle sucessful login response 
      
     if(response.data&&response.data.accessToken){

      localStorage.setItem("token",response.data.accessToken)
      navigate("/dashboard")
  }

      
    } catch (error) {
        
      if (error.response&&error.response.data&&error.response.data.message) {
        
        setError(error.response.data.message)
      }else{

        setError("something went wrong please try again")
      }
       
    }


  }
  


  return (
    <div className='w-screen h-screen bg-[#eaf3fb] flex justify-center items-center'>
      
       <div className="flex justify-start items-center flex-col h-2/3">
       
       <h1 className="text-4xl text-blue-600 text-center font-extrabold pb-7 ">My Website</h1>

       <div className='w-96 h-72 bg-white shadow-2xl rounded-xl flex justify-around items-center flex-col'>

        <h2 className='text-slate-950 text-xl text-center  font-bold underline'>LOGIN</h2>

   <form onSubmit={handleLogin} className="w-full h-full flex justify-around items-center flex-col" action="">
        <div className="w-3/4 flex items-center bg-slate-200 px-5 text-gray-700 rounded mb-3 ">

          <input type="email" 

           value={email}
           onChange={({target})=>{
              setEmail(target.value)
           }}
           placeholder="email"
           className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none font-semibold" 
          />
        </div>

        <PasswordInput
        
        value={password}
        onChange={({target})=>{

          setPassword(target.value)
        }}        />

{error && <p className="text-red-500 text-sm py-2 font-bold">{error}</p>}

      <button className='w-24 h-8 text-white bg-green-600 rounded-lg active:bg-green-200'>
        login 
      </button>

      </form>

        <p className='text-center text-sm text-gray-600'>or</p>
        
        <p
         onClick={()=>{
          navigate("/signup")
         }}
        
        className='text-center text-lg text-blue-900 underline cursor-pointer active:text-blue-600'>no account? signup</p>   

      </div>   

       </div>

    </div>
  )
}

export default Login
