import React from 'react'
import { useNavigate } from 'react-router-dom'
import UserInfo from './Card/UserInfo'
import { FaLongArrowAltLeft } from 'react-icons/fa';

const Navbar = ({ userInfo }) => {

    const navigate = useNavigate()

  

    return (
        <div className='bg-white flex items-center justify-between px-8 py-4 drop-shadow sticky top-0 z-10'>
            <div className="text-xl text-blue-600 text-center font-extrabold  bg-gradient-to-r from-blue-500  to-purple-500 bg-clip-text text-transparent cursor-pointer active:scale-95 hover:bg-gradient-to-l flex justify-around gap-3"
            
            onClick={()=>{
                navigate("/dashboard")
            }}
            
            >
                {<FaLongArrowAltLeft
                   className='h-8 text-green-500'
                />}
                return dashboard
            </div>

            <UserInfo userInfo={userInfo} />

        </div>
    )
}

export default Navbar