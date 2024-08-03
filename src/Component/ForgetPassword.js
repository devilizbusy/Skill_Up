import React, { useState } from "react";
import {useAuth} from '../AuthContext'
import {auth} from '../firebase'
import ForgotPassword from './SVG/ForgotPassword.svg'
import { Link,useNavigate } from 'react-router-dom';
import {
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  Alert,
  Container
} from "@mui/material";


const ForgetPassword= () => {
  const [signInEmail, setsignInEmail] = useState();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const {forgotPassword} = useAuth();
  const [button, setButton] = useState('Send Link');
  const navigate = useNavigate();

  const ResetPassword = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
   const user = await forgotPassword(
        auth,
        signInEmail
      );
    //   navigate("/main" ,{replace:true});
      setMessage("Please Check your email to proceed further.");
      setButton('Resend Again');
      console.log(user);
    } 
    catch (error) {
      console.log(error);
      setError("Enter correct Email/Failed to Reset");
    }
  };
  setTimeout(()=>{
    setError("");
    },[5000])

  return (
    <Container sx=
    {{
      // bgcolor:"lightcoral",
      display:"flex",
      justifyItems:"center",
      alignItems:"center",
      flexDirection:"row",
      height:"100vh",
      width:"100wh"
      }}>

<Box  className='Left' marginLeft={"1rem"} flex={1}>
      <Typography variant="h4" justifySelf={"center"}>Welcome To SkillUp Family !</Typography>
     <img src={ForgotPassword} alt="Forgot Password"
      height={'70%'}
      width={'70%'}
      // border={"2px solid black"}
      />
    </Box>
   
    <Box className="Right"
     flex={1}
    sx={{
     display:"flex",
     justifyContent:"center",
     alignItems:"center",
    //  border:"2px solid black"
     }}>
  
  <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          height: "70%",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 2,
          bgcolor: "white",
          p: 2,
        }}
      >
        <Typography variant="h4" sx={{ m: 2 }}>
          Reset Password
        </Typography>
      {error && <Alert severity='error'>{error}</Alert>}
      {message && <Alert severity='success'>{message}</Alert>}
        <TextField
          label="Email"
          name="email"
          margin="dense"
          sx={{ width: "70%" }}
          onChange={(e) => setsignInEmail(e.target.value)}
        />

        <Button
          sx={{ m: 2, width: "30%" }}
          variant="contained"
          color="primary"
          onClick={ResetPassword}
          style={{textDecoration:"none"}}
        >
          {button}
        </Button>
     
        <Typography>
      <Link to="/signin" style={{textDecoration:"none",color:"blue"}}>Sign in</Link>
    </Typography>
      </FormControl>
     
    </Box>
    </Container>
  );
};

export default ForgetPassword;
