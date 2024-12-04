const multer = require('multer')
const path  = require('path')

// Storate configuration 

const storage = multer.diskStorage({

    destination: function(req,file,cb){
        cb(null,"./uploads/")
    },
    
    filename: function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }

})


// function to accept only image

const fileFilter = (req,file,cb)=>{
       
    if(file.mimetype.startsWith("image/")){
        cb(null,true)
    }else{
        cb(new Error("you can only upload image file"),false)
    }
}


// initialize multer instance 
const upload = multer({storage,fileFilter})
module.exports = upload;