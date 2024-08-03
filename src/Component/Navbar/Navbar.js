import React, { useState,useEffect } from "react";
import './Navbar.css'
import { Link,NavLink } from "react-router-dom";
import { Box, Typography,Avatar } from "@mui/material";
import { auth } from "../../firebase"; 
import DropMenu from '../Dropdown Menu/DropMenu'
import Logo from "../SVG/SKIllUpLogo.svg"
const Navbar = () => {
 const [dropMenu, setDropMenu]=useState(false);
 
//  useEffect(()=>{
//    return ()=>{
//    setDropMenu(false);
//    }
//  },[]) 
 
  return (
    <>
      <Box
        sx={{
          height: "4rem",
          // borderBottom: "3px solid black",
          position:"fixed",
          width:"100%",
          zIndex:"100",
          top:0,
          backgroundColor: "rgba(255, 255, 255, 0.266)",
          backdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "space-around",
          alignItems:"center",
          // position:"fixed",
          // top:"0",
          // width:"100%"
        }}
      > 
      <Box className="LeftNavbar" width={"30%"} >
      <Link to="/Homepage" style={{textDecoration:"none"}} >
        <img src={Logo} alt="Logo" style={{height:"3.5rem",width:"auto",marginLeft:"-40px"}}/>
      </Link>
      </Box>

      <Box className="RightNavbar" 
      sx={{ 
         width:"50%",
         display: "flex",
         justifyContent: "space-around",
         alignItems:"center",
         
        }}> 

        <NavLink to="/Homepage" className="activeLink-Home" style={{textDecoration:"none"}} >
          <div className="homeButton" variant="h6" 
          sx={{color:"black"}} 
          >
            Home
          </div>
        </NavLink>

        <NavLink exact to="/blogs" className="activeLink-Blog" style={{textDecoration:"none"}} >
          <div variant="h6"
          className="blogButton"
           sx={{color:"black"}}
           >
             Blogs
          </div>
        </NavLink>

        <NavLink exact to="/videos" className="activeLink-Blog" style={{textDecoration:"none"}} >
          <div variant="h6"
          className="blogButton"
           sx={{color:"black"}}
           >
            Video Lessons
          </div>
        </NavLink>


        <NavLink to="/liveSessions"  className="activeLink-Session" style={{textDecoration:"none"}} >
          <div variant="h6" 
          className="sessionButton" 
          sx={{
            color:"black",
            }} 
           >
            Live Session
          </div>
        </NavLink>


        <Avatar className="Avatar" src={auth.currentUser.photoURL} sx={{border:"0.3px solid black"}} 
        onClick={()=>{setDropMenu(!dropMenu)}}
         />
      </Box>
        {dropMenu && <DropMenu dropMenu={dropMenu} setDropMenu={setDropMenu}/>}
      </Box>
    </>
  );
};

export default Navbar;
