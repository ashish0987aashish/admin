import React, { useState } from 'react'
import moment from "moment/moment"
import { FaLongArrowAltRight } from 'react-icons/fa';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import ImageSelector from '../../../components/Input/ImageSelector';
import axiosInstance from '../../../utils/axiosinstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






const AddEditBlog = (
{blogInfo,
  type,
  onClosing,
  getAllBlogs
}) => {

  
   const [bTitle,setbTitle] = useState(blogInfo?.bTitle||"")
   const [bDesc,setbDesc] = useState(blogInfo?.bDesc||"")
   const [bImgs,setbImgs]= useState(blogInfo?.bImgs||[])
   const [postDate,setpostDate] = useState(blogInfo?.postDate||null)
  


   const [error,setError]  = useState("")

     // Function to handle the addition of images to pImgs
  const handleImageSelect = (imgUrl) => {
    setbImgs(prevImgs => [...prevImgs, imgUrl]);
  };



   
  // handle addBlog

  const addBlog = async()=>{

      try{
            const response  = await axiosInstance.post("/add-blog",{
                
              bTitle,
              bDesc,
              bImgs,
              postDate : postDate ? moment(postDate).valueOf() : moment().valueOf,
             
            })


            if(response.data && response.data.blog){
                  
                toast.success("Blog added successfully")
                 getAllBlogs()
                onClosing()
            }
          
      }catch(error){

          if(error.response && error.response.data && error.response.data.message){
              setError(error.response.data.message)
          }else{
            setError("something went wrong please try again")
          }

      }
  }  


  // handle upadateBlog
   const updateBlog = async()=>{

      const blogId =  blogInfo._id;

       try{

         let postData ={
         
           bTitle,
           bDesc,
           bImgs,
           postDate : postDate ? moment(postDate).valueOf() : moment().valueOf,
          
         }
  
        
        const response = await axiosInstance.put("/update-blog/"+blogId,postData) 

        if(response.data && response.data.blog){
            toast.success("Blog updated successfully")
           getAllBlogs()
            onClosing()
        }

            
       }catch(error){

         if( error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message)
         }else{
          setError("something went wrong please try again")
         }

       }
   } 


      // update project 

     const handleAddUpadateBlog = ()=>{
      
      if(!bTitle){
        setError("please enter the title")
        return
      }

      if(!bDesc){
        setError("Please enter blog description")
        return
      }

      if(bImgs.length<3){
        setError("atleast 3 images needed")
        return
      }

      if(!postDate){
        setError("please select the date")
        return
      }


        if(type === "edit"){
          updateBlog()
        }else{
          addBlog()
        }

     }
   



  return (
    <div className='w-full h-auto bg-white p-7 relative'>


       <div className="eadc absolute w-64 h-14 right-7 top-2 mt-2  mr-5 flex items-center justify-around text-xl">

             {
                type==='edit'?(
                  <div className="edit flex items-center bg-gradient-to-r from-blue-500  to-purple-500 bg-clip-text text-transparent font-semibold cursor-pointer active:scale-95 border hover:bg-gradient-to-l border-purple-500 rounded-md p-2 shadow-lg"
                   onClick={handleAddUpadateBlog}
                  >
                  
                   Update Blog
                  </div>
                  ):(
                    <div className="edit flex items-center bg-gradient-to-r from-blue-500  to-green-500 bg-clip-text text-transparent font-semibold cursor-pointer active:scale-95 border hover:bg-gradient-to-l border-green-500 rounded-md p-2 shadow-lg"
                     onClick={handleAddUpadateBlog}
                    >
                    
                     Add Blog
                    </div>
                    )
          }
                 
                   
          </div>      
      

         
         <div className="absolute text-xl text-blue-600 text-center font-extrabold  bg-gradient-to-r from-blue-500  to-purple-500 bg-clip-text text-transparent cursor-pointer active:scale-95 hover:bg-gradient-to-l flex justify-around gap-1"
                
                onClick={onClosing}
                >
                    {<FaLongArrowAltLeft
                       className='h-8 text-green-500'
                    />}
                    return allblogs
                </div>
    
       
    
    
          <div className='text-center underline text-3xl text-zinc-900 font-bold'>

            <input type="text"
                 className='w-1/2 outline-none p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-md text-center'
                 placeholder='Add blog title'
                 value={bTitle.toUpperCase()}
                 onChange={({target})=>{setbTitle(target.value)}}
            />
          </div>
        
          <div  className='p-4 text-lg text-gray-700 flex items-center font-medium '>
             Set date :

            <input type='date'  
         
             value={moment(postDate).format("YYYY-MM-DD")}
             onChange={({target})=>{setpostDate(target.value)}}
              className='bg-blue-100 p-2 rounded-md cursor-pointer outline-none active:scale-95'
              onFocus={(e) => e.target.showPicker()}
            />
            
            </div>

            { error && (

        <p className='text-rose-600 text-lg text-center p-1.5 ' >error: {error}</p>
            )}
            
          <div className="imgsection  w-full  p-3 h-auto  flex justify-center items-center flex-col">
          <p
             className='text-xl text-center p-4 underline font-medium'
            >Add some Images</p>

             <div className="imgcontainer w-9/12 h-auto bg-transparent flex gap-1 flex-wrap p-2 bg-cyan-50 justify-start items-start border border-cyan-400">
                 <ImageSelector
                    onImageSelect= {handleImageSelect}
                 />
    
                {   bImgs.map( (img,index)=>{

                       
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
         
          <div className="desc-container w-full text-center flex justify-center items-center flex-col">
            <p
             className='text-xl text-center p-4 underline font-medium'
            >Add a Blog Description</p>


           <textarea name="" id=""
           
           value={bDesc}
           placeholder='Blog Description'
           className='w-5/6 h-96 row-end-11 text-lg text-left  outline-none bg-gradient-to-r from-blue-50 to-purple-50 p-3 resize-none rounded-md'
           onChange={({target})=>{setbDesc(target.value)}}
           style={{ 
            overflowY: 'scroll', 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            whiteSpace: 'pre-wrap' 
          }}
        
           >
          
            
           </textarea>
          </div>
    
        
        </div>
  )
}

export default AddEditBlog