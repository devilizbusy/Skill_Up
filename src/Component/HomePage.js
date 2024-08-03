import React, { useState, useEffect, useContext } from "react";
import { /*Button, Box,*/ Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import {useDispatch} from "react-redux"
import { db } from "../firebase";
import "./Homepage.css";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import Navbar from "./Navbar/Navbar";
import BottomNavbar from "./Navbar/BottomNavbar/BottomNavbar";
// import {OpenArticle} from './Reducers/ArticleReducer'
import { singleBlog } from "../App";
import { Fade } from "react-awesome-reveal";
const HomePage = () => {
  const { /*singleBlogDetail,*/ setSingleBlogDetail } = useContext(singleBlog);

  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [article, setArticle] = useState([]);
  const [mainBlog, setMainBlog] = useState([]);
  const [mainVideo, setMainVideo] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const getData = [];
      const Snapshot = await getDocs(collection(db, "data"));
      Snapshot.forEach((doc) => {
        getData.push({
          ...doc.data(),
        });
      });
      setArticle(getData);
    };
    getArticles();

    const getVideos = async () => {
      const getVideo = [];
      const Snapshot = await getDocs(collection(db, "video"));
      Snapshot.forEach((doc) => {
        getVideo.push({
          ...doc.data(),
        });
      });
      setVideos(getVideo);
    };
    getVideos();

    return () => {
      // useEffect CleanUp function
      setVideos([]);
      setArticle([]);
      setMainBlog([]);
    };
  }, []);

  useEffect(() => {
    //let isUnmount = false; //my edit

    const getMainBlog = async () => {
      const Snapshot = await getDoc(doc(db, "Blogs", "2"));
      setMainBlog(Snapshot);
    };

    getMainBlog();

    const getMainVideo = async () => {
      const Snapshot = await getDoc(doc(db, "MainVideo", "1"));
      setMainVideo(Snapshot);
    };

    getMainVideo();

    return () => {
      // useEffect CleanUp function
      //isUnmount = true; //my edit~
      setMainBlog();
      getMainVideo();
    };
  }, []);

  console.log(mainBlog);
  console.log(mainVideo);

  const ArticleHandler = (Title, data, Image, Date) => {
    console.log(Title, data);
    setSingleBlogDetail({
      title: Title,
      text: data,
      image: Image,
      time: String(Date.toDate().toLocaleTimeString("en-US")),
      date: Date.toDate().toDateString(),
    });

    navigate("/singleBlog");
  };

  return (
    <div>
      <Navbar />

      {/* !-------------------BLOGS SECTION---------------------! */}

      <Typography
        variant="h2"
        display={"flex"}
        flexDirection={"column"}
        marginX={"1rem"}
        marginTop={"6rem"}
        marginBottom={"1rem"}
        color={" rgb(224, 165, 82)"}
        fontWeight={"600"}
        style={{
          textShadow: "2px 2px 2px rgba(0, 0, 0, 0.85) ",
        }}
      >
        Blogs
      </Typography>
      <div className="homeBlogContainer">
        <Fade bottom>
          <div className="mainBlogWrapper">
            <div className="mainBlogImage">
              <img src={mainBlog.pic} alt="BlogImage" className="blogImage" />
            </div>
            <div className="mainBlogTextSection">
              {/* <p>{mainBlog.Date}</p> */}
              <p className="mainBlogTitle">{mainBlog.title}</p>
              <div className="mainBlogText">
                <p style={{ lineHeight: "1.5rem" }}>{mainBlog.text}</p>
              </div>
              <button
                className="mainBlogButton"
                onClick={() =>
                  ArticleHandler(
                    mainBlog.title,
                    mainBlog.text,
                    mainBlog.pic,
                    mainBlog.date
                  )
                }
              >
                READ MORE
              </button>
            </div>
          </div>

          <div className="blogGrid">
            {article.map((item, index) => (
              // <Fade top>
              <div key={index} className="blogContainer">
                <div className="blogWrapper">
                  <div className="blogImageWrapper">
                    <img className="blogImg" src={item.image} alt="students" />
                  </div>

                  <div className="blogTextWrapper">
                    <p className="blogTitle">
                      {item.Title}
                      {item.date}
                    </p>
                    <p className="blogText">{item.article}</p>
                  </div>
                  <button
                    className="BlogButton"
                    onClick={() =>
                      ArticleHandler(
                        // index,
                        item.Title,
                        item.article,
                        item.image,
                        item.Date
                      )
                    }
                    sx={{ width: "50%", marginX: "auto", position: "static" }}
                  >
                    Read More
                  </button>
                </div>
              </div>
              // </Fade>
            ))}
          </div>
        </Fade>
      </div>

      <Typography
        variant="h2"
        display={"flex"}
        flexDirection={"column"}
        marginX={"1rem"}
        marginTop={"6rem"}
        marginBottom={"1rem"}
        color={"rgb(209 209 138)"}
        fontWeight="bold"
        style={{
          textShadow: "2px 2px 2px rgba(0, 0, 0, 0.85) ",
        }}
      >
        Video Courses
      </Typography>

      {/* !-------------------------VIDEO SECTION--------------------! */}

      <div className="homeBlogContainer">
        <Fade bottom>
          <div className="mainBlogWrapper">
            <div className="mainBlogImage">
              <img
                src={mainVideo.piclink}
                alt="BlogImage"
                className="blogImage"
              />
            </div>
            <div className="mainVideoTextSection">
              {/* <p>{mainBlog.Date}</p> */}
              <p className="mainBlogTitle">{mainVideo.title}</p>
              <div className="mainBlogText">
                <p style={{ lineHeight: "1.5rem" }}>{mainVideo.info}</p>
              </div>
              <a
                href={mainVideo.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  color: "black",
                  margin: "0 auto",
                }}
              >
                <button className="mainBlogButton">WATCH</button>
              </a>
            </div>
          </div>

          <div className="blogGrid">
            {videos.map((item, index) => (
              // <Fade top>
              <div key={index} className="blogContainer">
                <div className="blogWrapper">
                  <div className="blogImageWrapper">
                    <img
                      className="blogImg"
                      src={item.piclink}
                      alt="students"
                    />
                  </div>

                  <div className="blogTextWrapper">
                    <p className="blogTitle">
                      {item.title}
                      {item.date}
                    </p>
                    <p className="blogText">{item.info}</p>
                  </div>
                  <button
                    className="VideoButton"
                    sx={{ width: "50%", marginX: "auto", position: "static" }}
                  >
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
                      Watch
                    </a>
                  </button>
                </div>
              </div>
              // </Fade>
            ))}
          </div>
        </Fade>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default HomePage;
