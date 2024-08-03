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
import "./Blog.css";

const Blogs = () => {
  const [article, setArticle] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState("");
  const [categorySelect,setCategorySelected] = useState(false);
  const [searchKeyword, setSearchKeyword] =useState(null);
  const SearchedKey = useRef();

  const { singleBlogDetail, setSingleBlogDetail } = useContext(singleBlog);
  const navigate = useNavigate();
  const Category = ["All","Cooking", "Computer science","Music","Dance","Photography","Art & Craft"];

  const ArticleHandler = (Title, data, Image, Date) => {
    //  console.log(index,Title,data);
    setSingleBlogDetail({
      title: Title, 
      text: data,
      image: Image,
      time: String(Date.toDate().toLocaleTimeString("en-US")),
      date: Date.toDate().toDateString(),
    });
    navigate("/singleBlog");
  };

  useEffect(() => {
    
    getArticles();
    
    return () => {
      // useEffect CleanUp function
      
      setArticle([]);
    };
  }, []);
  const getArticles = async () => {
    const getData = [];
    const Snapshot = await getDocs(collection(db, "AllBlogs"));

    Snapshot.forEach((doc) => {
      getData.push({
        ...doc.data(),
      });
    });
    setArticle(getData);
  };


  function SearchBlogs(e){
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

   const searchedBlog = article.filter((video)=>{
       return (
         video.text.toLowerCase().includes(SearchedKey.current.value.toLowerCase()) 
        ||
          video.title.toLowerCase().includes(SearchedKey.current.value.toLowerCase())
       )
    })
    console.log(searchedBlog)
    console.log(SearchedKey.current.value.length)
    setArticle(searchedBlog);
  }
  


  async function selectCategory(category) {
    if(category==="All")
    {
       return getArticles();
    }
    const Data=[];
    const collectionRef = collection(db, "AllBlogs");
    const blogs = await getDocs(query(collectionRef ,where("category", "==", `${category}`)))
     blogs.forEach((doc)=>{
     Data.push({
        ...doc.data(),
      })
    })
    if(Data.length >0)
    {
      setArticle(Data);
    }
  }

  selectCategory();
  
  return (
    <div  style={{marginTop:"7rem"}}>
      <Navbar />
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search Something..."
          style={{ display: "flex", alignItems: "center" }}
          value={searchKeyword}
          onChange={SearchBlogs}
          ref = {SearchedKey}
        />
        <FcSearch className="searchIcon" onClick={SearchBlogs} />
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
                <img src={item.pic} alt="BlogImage" className="allblogImage" />
              </div>
              <div className="allBlogTextSection">
                {/* <p>{item.Date}</p> */}
                <p className="allBlogTitle">{item.title}</p>
                <div className="allBlogText">
                  <p style={{ lineHeight: "1.5rem" }}>{item.text}</p>
                </div>
                <button
                  className="allBlogButton"
                  onClick={() =>
                    ArticleHandler(item.title, item.text, item.pic, item.date)
                  }
                  >
                  READ MORE
                </button>
              </div>
            </div>
            </Fade>
          ))
          :
          <div className='emptySearch'>
          <img src={Empty} alt="Empty" height={"200px"} width="200px" />
           <p  className="emptyMessage">No Blogs available for <b>"{searchKeyword}" </b>keyword</p>
           {/* <p >No Sessions available !</p> */}
            </div>
        }
        </div>
      </div>
    </div>
  );
};

export default Blogs;
