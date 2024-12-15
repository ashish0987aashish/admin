import React, { useState } from 'react'
import {FaUser} from 'react-icons/fa'
import {MdEmail} from 'react-icons/md'
import { useSearchParams } from 'react-router-dom'






const DelUser = ({
  info,
  onClose,
  accessCode,
  setAccessCode,
  onDeleteClick,
  error
}) => {


  return (
    <div className='w-full h-full bg-white rounded-md relative flex justify-evenly flex-col items-center'>

     <button onClick={onClose}
       
       className='bg-gradient-to-r from-rose-600 to-red-600 hover:bg-gradient-to-l text-white top-1 right-1 absolute p-1 rounded-md shadow-lg font-semibold active:scale-95 duration-75 hover:scale-105 '
     > 
      <p className='w-6 h-6'>X</p>
     </button>
  
      <div className='p-6 text-xl'>
       <p className='text-center text-lg font-medium'>Are you sure to delete user ?</p>
       <p className='flex justify-center items-center font-medium'><FaUser
         className='text-blue-500 overflow-hidden'
       />{info&& info.fullName}</p>

       <p className='flex justify-center items-center font-medium'><MdEmail
           className='text-yellow-400 pt-1 w-8 h-8 overflow-hidden'
       />{info && info.email}</p>

      </div>

      <div className="w-3/4 flex items-center bg-slate-200 px-5 text-gray-700 rounded mb-3 ">

          <input type="text" 
           value={accessCode}
           onChange={({target})=>{
            setAccessCode(target.value)
            }}
           placeholder="Access Code"
           className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none font-bold" 
          />
      </div>

      { error && (

<p className='text-rose-600 text-sm text-center p-1.5 ' >error: {error}</p>
)}

     

         <div className='w-1/2 flex justify-center items-center text-lg pb-3'>
         
         <button className='w-40 h-10 text-white rounded-lg flex justify-center items-center gap-2  bg-gradient-to-r  from-rose-500  to-red-500 hover:bg-gradient-to-l active:scale-95'
         onClick={onDeleteClick}
         >
         
         delete user
         </button>
        </div>


    </div>
  )
}

export default DelUser