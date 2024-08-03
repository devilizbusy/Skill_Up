import React from 'react'
import {FormControl,Box,Typography,TextField,Button} from '@mui/material'
import {getDoc,collection,doc} from "firebase/firestore"
import Navbar from '../Navbar/Navbar'
import "yup-phone"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form"


const schema = yup.object().shape({
  
})


const EditProfile = () => {
 
const {register,handleSubmit,formState:{errors}} = useForm({
  resolver:yupResolver(schema)
})

  return (
      <>
    <Navbar/>
    <Typography variant="h2" 
    sx={{
        display:"flex",
        justifyContent:"center",
        margin:"5rem 1rem 1rem 1rem"
        }}
        >Edit Profile</Typography>
    <Box sx={{
        width:"50%",
        height:"auto",
        display:"flex",
        justifyItems:"center",
        // border:"2px solid black",
        margin:"auto",
        padding:"1rem",
        boxShadow:15
        }}>
    <FormControl sx={{
        width:"70%",
        height:"auto",
        display:"flex",
        justifyItems:"space-between",
        margin:"auto",
        padding:"1rem"
        }} >
{/* 
    <TextField
      label="Email" 
      id="Email"
      sx={{margin:"1rem"}}
      /> */}

 <TextField
      label="First Name" 
      id="First Name"
      sx={{margin:"1rem"}}
      />
<TextField
      label="Last Name" 
      id="Last Name"
      sx={{margin:"1rem"}}
      />

<TextField
      label="Phone No" 
      id="Phone No"
      sx={{margin:"1rem"}}
      />

 <TextField
          id="outlined-multiline-static"
          label="Tell us about Yourself"
          multiline
          rows={8}
          sx={{margin:"1rem"}}
        />        
   
<TextField
      label="School/College/University" 
      id="Phone No"
      sx={{margin:"1rem"}}
      required
      />

<TextField
      label="Class/Standard/Course" 
      id="Class"
      sx={{margin:"1rem"}}
      required
      />

<Button variant="outlined" style={{width:"30%",marginLeft:"65%"}} >Save</Button>
    </FormControl>
    </Box>
      </>
  )
}

export default EditProfile