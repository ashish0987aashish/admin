import React from 'react'
import { MdSearchOff } from 'react-icons/md';


const EmptyCard = ({message}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
        
      <MdSearchOff 
        size={50}
      />     

      <p className="w-1/2 text-2xl font-medium text-blue-700 text-center leading-7 mt-5">
       {message}
      </p>
      
    </div>
  )
}

export default EmptyCard