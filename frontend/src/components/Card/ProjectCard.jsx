import React from 'react'
import moment from "moment/moment"
import { FaLongArrowAltRight } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';




const ProjectCard = ({

  pTitle,
  pDesc,
  pImgs,
  fromDate,
  toDate,
  fullName

}) => {
  return (
    <div className='w-1/3 h-2/3  border-slate-900 shadow-xl p-3 m-6 rounded-lg bg-blue-50 cursor-pointer hover:scale-105 duration-75 '>

      <p  className='pb-2 text-base text-gray-700 flex items-center font-medium'>{fromDate ? moment(fromDate).format("Do MMM YYYY") : "_"}<FaLongArrowAltRight/>{toDate?moment(toDate).format("Do MMM YYYY"):"_"}</p>

      <div className='image w-full h-2/3 bg-gray-900 flex'>

        <div className='column1 h-full w-4/6 bg-slate-700 border-spacing-1 border-neutral-50 '>
          <img
            src={pImgs[pImgs.length - 1]}
            alt="img"
            className="w-full h-full object-cover"
          />

        </div>

        <div className='column2 w-2/6  bg-stone-700 flex flex-col flex-wrap'>

          <div className='row1 w-full  h-1/2 bg-blue-500'>
            <img
              src={pImgs[pImgs.length - 2]}
              alt="img"
              className="w-full h-full object-cover "
            />
          </div>

          <div className='row2 w-full h-1/2 relative'>
            <img
              src={pImgs[pImgs.length - 3]}
              alt="img"
              className="w-full h-full object-cover "
            />

            <div className="absolute w-full h-full top-0 left-0 text-white text-3xl bg-gradient-to-b from-black to-slate-800 opacity-65  flex justify-center items-center">
              <p className=''>+{pImgs.length - 2}</p>
            </div>


          </div>

        </div>


      </div>

      
       <div className='ptitle text-xl font-semibold underline'>
        <h1>{pTitle.toUpperCase()}</h1>
       </div>

       <div className="pDesc w-full h-16 overflow-hidden">
         <p> {pDesc.substring(0, 110)}......
        </p>  
      </div>   
   

       <div className='fullName  w-full h-10 overflow-hidden text-sm  pt-3 flex justify-start items-center gap-2'>
          <MdEdit/>
          {fullName}
       </div>
        

    </div>
  )
}

export default ProjectCard