import React, { useEffect, useContext } from "react";
import {BsCalendarDate,BsClockHistory} from "react-icons/bs"
import { singleBlog } from "../../App";
import './SingleBlog.css'
import Navbar from "../Navbar/Navbar";
const SingleBlog = () => {
 
    const { singleBlogDetail, setSingleBlogDetail } = useContext(singleBlog);
   console.log(singleBlogDetail);
    

  return (
      <>
      <Navbar/>
      
    <div className="singleBlog">
        <div className="singleBlogTitleWrapper" style={{display:"flex",alignItems:"flex-start",width:"100%"}}>
      <p className="singleBlogTitle">{singleBlogDetail.title}</p>
    
    <div className="singleBlogDateandTime">
      <div style={{display:"flex"}}>
          <BsCalendarDate style={{marginRight:"5px"}}/>
       <p className="singleBlogDate">{singleBlogDetail.date}</p>
      </div>
      <div style={{display:"flex"}}>
        <BsClockHistory style={{marginRight:"5px"}}/>
       <p className="singleBlogTime">{singleBlogDetail.time}</p>
      </div>
        

    </div>
      
        </div>
      <img src={singleBlogDetail.image} alt="img" className="singleBlogImage" />
      <div className="singleBogTextWrapper">
      </div>
      <p className="singleBlogText">{singleBlogDetail.text}</p>
    </div>
      </>
  );
};

export default SingleBlog;
