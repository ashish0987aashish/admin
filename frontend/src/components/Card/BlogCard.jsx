import React from 'react'
import moment from "moment/moment"
import { MdEdit } from 'react-icons/md';
import { FaLongArrowAltRight } from 'react-icons/fa';

const BlogCard = ({
  bTitle,
  bDesc,
  bImgs,
  postDate,
  bManagerName,
  onReadMore

}) => {
  return (
    <div className='w-11/12 h-96 border shadow-lg mb-10 rounded-xl overflow-hidden p-5 flex bg-blue-50 hover:shadow-2xl'>

      <div className='w-1/3 h-full bg-slate-600'>

        <div className="row1 w-full h-2/3 bg-gradient-to-b from-black to-slate-800 opacity-65">
          <img
            src={bImgs[bImgs.length - 1]}
            alt="img"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="row2 h-1/3 flex">

          <div className="col1 w-1/2 h-full bg-gradient-to-b from-black to-slate-800 opacity-65">
            <img
              src={bImgs[bImgs.length - 2]}
              alt="img"
              className="w-full h-full object-cover"
            />

          </div>

          <div className="col2 w-1/2 h-full bg-gradient-to-b from-black to-slate-800 opacity-65 relative">

            <img
              src={bImgs[bImgs.length - 3]}
              alt="img"
              className="w-full h-full object-cover"
            />

            <div className="absolute w-full h-full top-0 left-0 text-white text-3xl bg-gradient-to-b from-black to-slate-800 opacity-65  flex justify-center items-center">
               { bImgs.length > 3 &&   <p className=''>+{bImgs.length - 2}</p>  } 
            </div>
          </div>

        </div>

      </div>

      <div className='w-2/3'>
        <div className='date text-center w-full font-medium text-xl text-neutral-800'>
          {postDate ? moment(postDate).format("Do MMM YYYY") : "_"}
        </div>

        <div className='w-11/12 p-2'>
          <div className='ptitle text-xl font-semibold underline'>
            <h1>{bTitle.toUpperCase()}</h1>
          </div>

          <div className="pDesc text-xl font-normal w-full h-60 overflow-hidden">
            <p> {bDesc.substring(0, 400)}......
            </p>
          </div>


          <div className='fullName  w-full h-10   pt-3 flex'>

            <div className='w-2/3 h-full overflow-hidden text-sm flex justify-start items-center gap-1 truncate'>

              <MdEdit />
              {bManagerName}
            </div>

            <div className='w-1/3 flex justify-center items-center text-lg'>

              <button className='w-40 h-10 text-white rounded-lg flex justify-center items-center gap-2  bg-gradient-to-r  from-purple-500  to-blue-500 hover:bg-gradient-to-l active:scale-95'
                onClick={onReadMore}
              >
               read more
               <FaLongArrowAltRight/>
              </button>
            </div>


          </div>

        </div>

      </div>


    </div>
  )
}

export default BlogCard
