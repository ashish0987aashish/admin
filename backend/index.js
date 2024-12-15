require("dotenv").config();

const express = require("express");
const config = require("./config.json");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");


const { authenticateToken } = require("./utilities");

const User = require("./models/user.model");
const Project = require("./models/project.model");
const upload = require("./multer");
const path = require('path')
const fs = require('fs').promises;

const Blog = require("./models/blog.model")

const { error } = require("console");
const { errorMonitor } = require("events");

mongoose.connect(config.connectionString);
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));



         // user section

// Create Account
app.post("/create-account", async (req, res) => {
   
   const creatorAccessToken = "lipumamu@385ls"

  const { fullName, email, password,creatorAccess } = req.body;

  if (!fullName || !email || !password  || !creatorAccess) {
    return res.status(400).json({
      error: true,
      message: "All fields are required",
    });
  }

  if(creatorAccessToken !== creatorAccess){

     return res.status(400).json({
      error:true,
      message:"Access Denied due to wrong CreatorAccessCode"
     }) 
  }

  const isUser = await User.findOne({ email });

  if (isUser) {
    return res.status(400).json({
      error: true,
      message: "User already exits",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  await user.save();

  const accessToken = jwt.sign(
    { userId: user._id, fullName: user.fullName },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "72h",
    }
  );

  return res.status(200).json({
    error: false,
    user: {
      fullName: user.fullName,
      email: user.email,
    },
    accessToken,
    message: "Registraction Successful"
  });
});


// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const accessToken = jwt.sign(
    { userId: user._id, fullName: user.fullName },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "72h",
    }
  );

  return res.json({
    error: false,
    message: "Login SuccessFul",
    user: { fullName: user.fullName, email: user.email },
    accessToken,
  });
});


// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
  const { userId } = req.user;

  const isUser = await User.findOne({ _id: userId });

  if (!isUser) {
    return res.sendStatus(401);
  }

  return res.json({
    user: isUser,
    message: "Ja This is User",
  });
});





// Get all Users 

app.get("/get-all-users",authenticateToken,async(req,res)=>{

   try{
    const users = await User.find()
    res.status(200).json({
      users:users
    })
  }catch(error){
      
     res.status(500).json({
         error:true,
         message:error.message
     })
  }

})



// Delete a user 

 app.delete("/delete-user/:id",authenticateToken,async(req,res)=>{

      const {id} = req.params
      
      const access = "lipumamu@385rm"

       
      let {deleteAccess} = req.body
        
      if(!deleteAccess){

         return res.status(400).json({
          error:true,
          message:"accesscode required "
         })
      }


      if(deleteAccess !== access){
        return res.status(400).json({
             error:true,
             message:"delete access denied due to wrong accesscode"
         })          
      }

     

    try{
        const user = await User.findByIdAndDelete(id)
   
        if(!user){
           
            return res.status(404).json({
              error:true,
              message:"user not found"
            })
        }

        res.status(200).json({
          message:"user deleted successfully"
        })

    }catch(error){

       console.error("some unexpected error occurred",error)
        res.status(500).json({

          error:true,
          message:"internal server error"
        })
    }

 })




           //Image Section

// handle pimage upload
app.post("/image-upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: true, message: "no image uploaded" });
    }
    const path = `http://localhost:1000/uploads/`

    // const pImgArr = []
    const pimageUrl = path+`${req.file.filename}`
    // pImgArr.push(pimageUrl)
    // const pImgs = pimageUrl
    res.status(201).json({pimageUrl})
  } catch (error) {
     res.status(500).json({error:true,message:error.message})
  }
});


// Delete and image from the upload folder
app.delete("/delete-image",async(req,res)=>{
         
    const {pimageUrl} = req.query;
   
    if(!pimageUrl){
          return res.status(400).json({
            error:true,
            message:"imageUrl parameter is required"
          })
    }
     
    try{

      // Extracting the filename from the imageUrl 

      const filename = path.basename(pimageUrl)

      // Define the file path

      const filepath = path.join(__dirname,'uploads',filename)
        
      // Check if the file exists 
      if(fs.existsSync(filepath)){
             
         // Delete the file from the uploads folder
          fs.unlinkSync(filepath);
          res.status(200).json({
            message:"Image deleted successfully"
          })             
      }else{
         res.status(200).json({message:"Image not found"})
      }

    }catch(error){
         res.status(500).json({
          error:true,
          message:error.message
         })
    } 
})

app.use("/uploads",express.static(path.join(__dirname,"uploads")))






          //project section 

// Add projects
app.post("/add-project", authenticateToken, async (req, res) => {
  const { pTitle, pDesc, pImgs, fromDate, toDate } = req.body;
  let { fullName } = req.user;
  const creatortag = "(creator)"
  const pManagerName =   fullName + creatortag

  // validate required fields :

  if (!pTitle || !pDesc || !pImgs || !fromDate || !toDate) {
    return res.status(400).json({
      error: true,
      message: "All fields are required",
    });
  }

  // Convert Date from milliseconds to Date Object

  const parsedfromDate = new Date(parseInt(fromDate));
  const parsedtoDate = new Date(parseInt(toDate));

  try {
    const project = new Project({
      pTitle,
      pDesc,
      pImgs,
      fromDate: parsedfromDate,
      toDate: parsedtoDate,
      pManagerName,
    });

    await project.save();
    res.status(201).json({
      project: project,
      message: "Project Added Successfully",
    });
  } catch (error) {
    res.status(404).json({
      error: true,
      message: error.message,
    });
  }
});


// Get All projects
app.get("/get-all-projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects: projects });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});


// Edit project details 
app.put("/update-project/:id",authenticateToken,async(req,res)=>{

   const {id} = req.params
   const { pTitle, pDesc, pImgs, fromDate, toDate } = req.body;
   const {userId,fullName} = req.user;

  
     // validate required fields :
    
     if(!pTitle||!pDesc||!pImgs||!fromDate||!toDate){

        return res.status(400).json({
          error:true,
          message:"All fields are required"
        })
     }



     // convert milliseconds to real date
      const parsedfromDate = new Date(parseInt(fromDate));
      const parsedtoDate = new Date(parseInt(toDate));

      
      try{

        const project = await Project.findOne({_id:id})

        if(!project){
            return res.status(404).json({
              error:true,
              message:"Project not found"
            })
        }

        project.pTitle = pTitle
        project.pDesc = pDesc
        project.pImgs = pImgs
        project.fromDate = fromDate
        project.toDate = toDate
        project.pManagerName += ","+fullName+"(editor)"

        await project.save()  
        res.status(200).json({project:project,message:"Update Successful"})
      }catch(error){
          res.status(500).json({
            error:true,
            message:error.message
          })    
      }
   
})


// Delete a project
app.delete("/delete-project/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res
        .status(404)
        .json({ error: true, message: "Project not found" });
    }

    // Delete associated images
    const pImgs = project.pImgs;
    await Promise.all(
      pImgs.map(async (img) => {
        try {
          const filename = path.basename(img);
          const filepath = path.join(__dirname, "uploads", filename);
          await fs.unlink(filepath);
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      })
    );

    res.status(200).json({ message: "Project deleted successfully" });

  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});


// Search projects

app.get("/search-project",authenticateToken,async(req,res)=>{

  const {query} = req.query;
  

  if(!query){
       return res.status(404).json({error:true,
        message:"query is required"
       })
  }  

  try{

    const searchResults = await Project.find({
      
      $or:[
          {pTitle:{$regex:query,$options:"i"}},
          {pDesc:{$regex:query,$options:"i"}},    
      ]    
    })

    res.status(200).json({
      stories:searchResults
    })

  }catch(error){
    res.status(500).json({
      error:true,
      message:error.message
    })                
  }
})




             
            // blog section

// Add blogs
app.post("/add-blog",authenticateToken,async(req,res)=>{
 
  const  {bTitle,bDesc,bImgs,postDate} = req.body 
  let {fullName} = req.user
  const writertag = "(writer)"
  const bManagerName = fullName + writertag


  // validate required fields :
  
  if(!bTitle|| !bDesc || !bImgs|| !postDate){
     
    return res.status(400).json({
      error:true,
      message:"All fields are required"
    })
  }
   

  // converting the date from milliseconds to real date
  const parsedpostDate  = new Date(parseInt(postDate))
    

  try{
    const blog = new Blog({
      bTitle,
      bDesc,
      bImgs,
      postDate:parsedpostDate,
     bManagerName
    })

   await blog.save()
    
   res.status(200).json({
    blog:blog, 
    error:false,
    message:"blog added successfully" 
   })

  }catch(error){
        
      res.status(400).json({
         error:true,
         message: error.message
      })
  }

})


// get all blogs
app.get("/get-all-blogs",async(req,res)=>{

   try{
    const blogs = await Blog.find()
     res.status(200).json({
       blogs:blogs
     })
   }catch(error){
       res.status(500).json({
        error:true,
        message:error.message
       })
   }

})


// edit blog details 

app.put("/update-blog/:id",authenticateToken,async(req,res)=>{
        
  const {id} = req.params
  const{bTitle,bDesc,bImgs,postDate} = req.body
  const{fullName} = req.user

  // validate required fileds 
   if(!bTitle || !bDesc || !bImgs  || !postDate){
      
      return res.status(400).json({
        error:true,
        message: "All fields are required"
      })
   } 


   // converting milliseconds to real date  

   const parsedpostDate = new Date(parseInt(postDate))
    
   try{
         const blog = await Blog.findOne({_id:id})
         
         if(!blog){
             return res.status(404).json({
                 error:true,
                 message:"blog not found"
             })
         }

      blog.bTitle = bTitle
      blog.bDesc = bDesc
      blog.bImgs = bImgs
      blog.postDate = parsedpostDate
      blog.bManagerName += "," + fullName + "(editor)";

      await blog.save()

       res.status(200).json({
           blog:blog,
           message:"update successful"
       })
   }catch(error){
        res.status(500).json({
          error:true,
          message:error.message
        })
   }
})


// delete a blog
app.delete("/delete-blog/:id",authenticateToken,async(req,res)=>{
       
      const {id} = req.params;
       
      try{
         
        const blog = await Blog.findByIdAndDelete(id)
        if(!blog){
            return res.status(404).json({
              error:true,
              message:"Blog not found"
            })
        }     

        // deleting associated images 
         const bImgs = blog.bImgs
         await Promise.all(
          bImgs.map(async(img)=>{
            try{
                
               const filename = path.basename(img)
               const filepath = path.join(__dirname,"uploads",filename)
               await fs.unlink(filepath)
               
            }catch(error){
                console.error("Error Deleting image",error)
            }
          }))
     
         res.status(200).json({message:"blog deleted successfully"})
           
      }catch(error){
         console.error("error deleting blog",error)
         res.status(500).json({
             error:true,
             message:"internal server error"  
         }) 
      }
     
})

// search blogs
app.get("/search-blog",authenticateToken,async(req,res)=>{

   const{query} = req.query
   if(!query){
      return res.status(400).json({
        error:true,
        message:"query is required"
      })
   }
  
    try{
       
    const searchResults = await Blog.find({
      $or: [
        { bTitle: { $regex: query, $options: "i" } },
        { bDesc: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({
      stories: searchResults,
    });

    }catch(error){

          res.status(500).json({
            error: true,
            message: error.message,
          });      
    }  

})


app.listen(1000);
