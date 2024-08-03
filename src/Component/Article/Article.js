import React,{useState,useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import { db } from '../../firebase'
import {getDocs,collection} from "firebase/firestore"
import { Typography } from '@mui/material'
import {OpenArticleDetail} from '../Reducers/ArticleReducer'


function Article(props) {
  const { Title}=props;
const [article, setArticle] = useState([]);
const articleRefrence = collection(db,"data");

useEffect(()=>{
const getArticle = async()=>{
    const getData=[];
    const Snapshot = await getDocs(articleRefrence);
    Snapshot.forEach((doc)=>{
        getData.push({
        ...doc.data()
              })
         })
        //  setArticle(getData.filter((doc)=>(doc.Title===Title)));
         setArticle(getData.filter((item,id)=>{return item.Title===Title}));
      }
      getArticle();
},[])
  console.log(Title)
  console.log(article);
  console.log(OpenArticleDetail)
  
  return (
    <Typography>Article</Typography>
   
  )
}

export default Article;