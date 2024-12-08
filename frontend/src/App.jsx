import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom"
import React from "react"


import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Home/Home'
import Blog from './pages/Work/Blog'
import Project from './pages/Work/Project'



function App() {


  return (
    <div>

        <Router>
            
          <Routes>
            <Route path="/"  element={<Root/>} /> 
            <Route path="/dashboard"  element={<Home/>}   />
            <Route path="/login"  element={<Login/>} />
            <Route path="/signup"  element={<SignUp/>} />
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/project" element={<Project/>}/>

          </Routes>   
       
       </Router> 
     

    </div>
  )
}


// Defining initial redirect

const Root = () =>{
     
  const isAuthenticated = !!localStorage.getItem("token")

  return isAuthenticated?(
    <Navigate to="/dashboard" />
  ):(
     <Navigate to="/login"/>
  )

}

export default App
