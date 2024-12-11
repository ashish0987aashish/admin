import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import axiosInstance from '../../utils/axiosinstance'
import { useNavigate } from 'react-router-dom'
import { FaLongArrowAltRight } from 'react-icons/fa';






const Home = () => {

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null)

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


  useEffect(() => {
    getUserInfo()
    return () => { }
  }, [])


  return (
    <>
      <Navbar
        userInfo={userInfo}
      />

      <div className='w-full h-full flex justify-start items-center overflow-hidden gap-8 flex-col pt-24 ' >

        <div className='w-80 h-14  bg-gradient-to-r  from-blue-500  to-purple-500 rounded-lg text-white flex justify-evenly items-center hover:bg-gradient-to-l  cursor-pointer active:scale-95'
          onClick={() => { navigate("/project") }}
        >

          <p className='text-2xl w-3/4'>Manage Projects </p>
          <FaLongArrowAltRight
            size={30}
          />
        </div>

        <div className='w-80 h-14  bg-gradient-to-r  from-purple-500  to-blue-500  rounded-lg text-white flex justify-evenly items-center hover:bg-gradient-to-l  cursor-pointer active:scale-95'
          onClick={() => {
            navigate("/blog")
          }}
        >

          <p className='text-2xl w-3/4'>Manage Blogs </p>
          <FaLongArrowAltRight
            size={30}
          />

        </div>


      </div>


    </>
  )
}

export default Home
