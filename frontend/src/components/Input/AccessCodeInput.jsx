
import React, { useState } from "react";
import {FaRegEye,FaRegEyeSlash} from 'react-icons/fa6'

const AccessCodeInput = ({value,onChange,placeholder})=>{

        
       const[isShowPassword,setIsShowPassword] = useState(false)
         
         const toggleShowPassword = () =>{
            setIsShowPassword(!isShowPassword)
         }


         return(
            
             <div className="w-3/4 flex items-center bg-slate-200 px-5 text-gray-700 rounded mb-3 ">
              
              <input 
              
              value={value}
              onChange={onChange}
              placeholder= "AccessCode"
              type={isShowPassword?"text":"password"}
               className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none" 
              />
               
              {isShowPassword?(<FaRegEye
              size={22}
              className="text-green-600 cursor-pointer font-bold"
              onClick={()=>{
                  toggleShowPassword()
              }}
              
              />):(<FaRegEyeSlash
              
                 size={22}
                 className="text-gray-500 cursor-pointer"
                onClick={()=>{
                    toggleShowPassword()
                }}
              />)} 


             </div>
         )
   }


   export default AccessCodeInput