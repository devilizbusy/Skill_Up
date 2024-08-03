import React, { useState, useEffect, useContext,useRef } from "react";
import { button, div, p } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import {useDispatch} from "react-redux"
import { db } from "../../firebase";
import "../Homepage.css";
import { singleBlog } from "../../App";
import { collection, getDocs,query,where} from "firebase/firestore";
import Navbar from "../Navbar/Navbar";
import { FcSearch } from "react-icons/fc";
import {Fade} from "react-awesome-reveal";

import Empty from "../SVG/emptyBlog.svg"


const Blogs = () => {
  const [article, setArticle] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState("");
  const [categorySelect,setCategorySelected] = useState(false);
  const [searchKeyword, setSearchKeyword] =useState(null);
  const SearchedKey = useRef();
  
  const { singleBlogDetail, setSingleBlogDetail } = useContext(singleBlog);
  const navigate = useNavigate();
  const Category = ["All","Cooking", "Computer science","Music","Dance","Photography","Art & Craft"];

  // const ArticleHandler = (Title, data, Image, Date) => {
  //   //  console.log(index,Title,data);
  //   setSingleBlogDetail({
  //     title: Title,
  //     text: data,
  //     image: Image,
  //     time: String(Date.toDate().toLocaleTimeString("en-US")),
  //     date: Date.toDate().toDateString(),
  //   });
  //   navigate("/singleBlog");
  // };

  useEffect(() => {
    
    getArticles();
    
    return () => {
      // useEffect CleanUp function
      
      setArticle([]);
    };
  }, []);
  
  const getArticles = async () => {
    const getData = [];
    const Snapshot = await getDocs(collection(db, "video"));

    Snapshot.forEach((doc) => {
      getData.push({
        ...doc.data(),
      });
    });
    setArticle(getData);
  };
  
  async function selectCategory(category) {
     if(category==="All")
     {
        return getArticles();
     }
    const Data=[];
    const collectionRef = collection(db, "video");
    const blogs = await getDocs(query(collectionRef ,where("Category", "==", `${category}`)))
    blogs.forEach((doc)=>{
     if(doc.exists){   
       Data.push({
         ...doc.data(),
        })
      }
    })
    if(Data.length >0)
    {
      setArticle(Data);
    }
  }

  // selectCategory();

   function SearchVideo(e){
    setSearchKeyword(e.target.value)
    if(SearchedKey.current.value===null)
    {
      return;
    }
    if(SearchedKey.current.value.length ===0)
    {
      getArticles() ;
      return;
    }

   const searchedVideo = article.filter((video)=>{
       return (
         video.info.toLowerCase().includes(SearchedKey.current.value.toLowerCase()) 
        ||
          video.title.toLowerCase().includes(SearchedKey.current.value.toLowerCase())
       )
    })
    console.log(searchedVideo)
    setArticle(searchedVideo);
  }
  
  console.log(searchKeyword)
  return (
    <div style={{marginTop:"7rem"}}>
      <Navbar />
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search Something..."
          style={{ display: "flex", alignItems: "center" }}
          value={searchKeyword}
          onChange={SearchVideo}
          ref={SearchedKey}
        />
        <FcSearch className="searchIcon" onClick={SearchVideo} />
      </div>

      <div className="allBlogsContainer">
        <div className="category">
          <div className="categoryTitle">Skills Categories</div>
          <div className="categoryShower">
             <Fade bottom>

            {Category.map((item, index) => (
              <div onClick={()=>setCategorySelected(true)}>
                <p key={index} onClick={()=>selectCategory(item)} className='Categories' >{item}</p>
              </div>
            ))}
            </Fade>
          </div>
        </div>
        <div className="allBlogs">
            
          {
            article.length >0 ? 
            article.map((item, index) => (
            <Fade>
            <div className="allBlogWrapper" key={index}>
              <div className="allBlogImage">
                <img src={item.piclink} alt="BlogImage" className="allblogImage" />
              </div>
              <div className="allVideoTextSection">
                {/* <p>{item.Date}</p> */}
                <p className="allBlogTitle">{item.title}</p>
                <div className="allBlogText">
                  <p style={{ lineHeight: "1.5rem" }}>{item.info}</p>
                </div>
                <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  color: "black",
                  margin: "0 auto",
                }}
              >
                <button
                  className="allBlogButton"
                  >
                  Watch Now
                </button>
                </a>
              </div>
            </div>
            </Fade>
          ))
          :
          <div className='emptySearch'>
          <img src={Empty} alt="Empty" height={"200px"} width="200px" />
           <p  className="emptyMessage">No Videos Lessons available for <b> "{searchKeyword}"</b> keyword</p>
           </div>
        }
        </div>
      </div>
    </div>
  );
};

export default Blogs;
