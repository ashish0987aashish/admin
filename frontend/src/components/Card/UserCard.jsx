import React from 'react'
import { FaTrash } from 'react-icons/fa';

 import  {FaUser} from 'react-icons/fa'
  import  {MdPerson} from 'react-icons/md'
  import   {AiOutlineUser}  from 'react-icons/ai'

  import  {FaUserCircle} from 'react-icons/fa'
  import   {MdAccountCircle} from 'react-icons/md'
   import   {AiOutlineProfile} from 'react-icons/ai'


const UserCard = ({
    User,
    onDelUser
}) => {
  return (
    <div className='w-3/5 bg-gradient-to-r from-blue-100 to-purple-100 h-16 flex justify-around items-center rounded-md hover:scale-105 duration-75 cursor-pointer'>
       <p className='w-3/4 text-2xl  flex justify-start pl-7 items-center'>

       <AiOutlineUser/>
        {User && User.email}
       </p>

       <div className="delete flex items-center bg-gradient-to-r from-purple-500  to-red-500 bg-clip-text text-transparent cursor-pointer active:scale-95 hover:border border-rose-500 rounded-md p-2"
              
              onClick={onDelUser}
            >
             <FaTrash
              className='text-rose-600'
             />
           
            </div>

    </div>
  )
}

export default UserCard