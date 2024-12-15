import React from 'react'
import moment from "moment/moment"
import { FaLongArrowAltRight } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import {FaEdit} from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';


const ViewBlog = ({
  blogInfo,
  onClosing,
   onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className='w-full h-auto bg-white p-7 relative'>
     
     <div className="absolute text-xl text-blue-600 text-center font-extrabold  bg-gradient-to-r from-blue-500  to-purple-500 bg-clip-text text-transparent cursor-pointer active:scale-95 hover:bg-gradient-to-l flex justify-around gap-1"
            
            onClick={onClosing}
            >
                {<FaLongArrowAltLeft
                   className='h-8 text-green-500'
                />}
                return allblogs
            </div>


            <div className="eadc absolute w-64 h-14 right-7 top-2 mt-2  mr-5 flex items-center justify-around text-xl">
            <div className="edit flex items-center bg-gradient-to-r from-blue-500  to-purple-500 bg-clip-text text-transparent cursor-pointer active:scale-95 hover:border border-purple-500 rounded-md p-2"
             onClick={onEditClick}
            >
            <FaEdit
             className='text-blue-500'
             />
             Edit
            </div>

            <div className="delete flex items-center bg-gradient-to-r from-purple-500  to-red-500 bg-clip-text text-transparent cursor-pointer active:scale-95 hover:border border-rose-500 rounded-md p-2"
              
              onClick={onDeleteClick}
            >
             <FaTrash
              className='text-rose-600'
             />
             Delete
            </div>
             
            </div>      




        <h1 className='text-center  text-3xl text-zinc-900 font-medium mx-auto w-1/2 py-8 underline'>{blogInfo.postDate ? moment(blogInfo.postDate).format("Do MMM YYYY") : "_"}</h1>

        
      <div className="imgsection  w-full  p-3 h-auto  flex justify-center items-center ">
         
         <div className="imgcontainer w-9/12 h-auto bg-transparent flex gap-1 flex-wrap p-2 bg-cyan-50 justify-start items-start border border-cyan-400">

            {  blogInfo.bImgs.map( (img,index)=>{
                   
                return(
                  <img  

                    key={index}          
                    src={img}
                    alt='img'
                    className='w-auto h-60 hover:scale-95 duration-75 cursor-pointer'
                  
                  />
                )
            }
            )}
         </div>
      </div>

      <h1 className='text-center underline text-3xl text-zinc-900 font-bold mx-auto w-1/2 py-5'>{blogInfo.bTitle.toUpperCase()}</h1>
    
     
      <div className="desc-container w-full text-center flex justify-center items-center">

      <p className='w-5/6 text-lg text-left'  style={{ whiteSpace: "pre-wrap" }}>
       {blogInfo.bDesc}
       </p>
      </div>

      <div className='fullName  w-full h-10 overflow-hidden text-sm  p-7 flex justify-start items-center gap-1'>
          <MdEdit
             
             className='w-8'
          />
         <p className='overflow-y-scroll truncate'>
          {blogInfo.bManagerName}
        </p> 
       </div>

    </div>
  )
}

export default ViewBlog