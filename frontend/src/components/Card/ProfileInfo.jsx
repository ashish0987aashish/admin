import React from 'react'
import {getInitials} from '../../utils/helper'
import { MdLogout } from 'react-icons/md';



const ProfileInfo = ({userInfo,onLogout}) => {
  return (
    userInfo && <div className='flex items-center gap-3 overflow-hidden'>

     <div className='w-10 h-10 flex items-center justify-center rounded-full text-white font-medium bg-gradient-to-b from-blue-500 via-green-500 to-purple-500'>
      {getInitials(userInfo?userInfo.fullName:"")}
     </div>
     
     <div className='flex  justify-center items-center gap-4'>
        
       <p className='text-xl font-medium bg-gradient-to-t from-blue-500 via-green-500 to-purple-500 bg-clip-text text-transparent'>
        {userInfo&& userInfo.fullName}
       </p>

       <button className='text-2xl text-red-600 font-bold hover:scale-110' onClick={onLogout}>
      <MdLogout/>
     </button>

     </div>

    </div>
  )
}

export default ProfileInfo