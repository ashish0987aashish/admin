import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileInfo from './Card/ProfileInfo'

const Navbar = ({ userInfo }) => {

  const navigate = useNavigate()

  const onLogout = () => {

    localStorage.clear()
    navigate("/login")
  }


  return (
    <div className='bg-white flex items-center justify-between px-8 py-4 drop-shadow sticky top-0 z-10'>
      <h2 className="text-3xl text-blue-600 text-center font-extrabold  bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 bg-clip-text text-transparent cursor-pointer active:scale-95">My Website</h2>

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />

    </div>
  )
}

export default Navbar