import React, { useState,useContext } from "react";
import { Typography, TextField, Box, FormControl, Alert } from "@mui/material";

import { auth } from "../firebase";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Signup from "./SVG/Signup.svg";
import PersonalDetailForm from "./PersonalForms/PersonalDetailForm";
import { FormContext } from "./Context/DetailFormContext.js";
import EducationalForm from "./EducationForm/EducationForm"


const ConfirmPage = () => {
  const {
    showPersonaldetailForm,
    showEducationForm, 
   setshowPersonaldetailForm,
   setshowEducationForm
  } = useContext(FormContext);
  console.log(showPersonaldetailForm);
  const [registerEmail, setRegisterEmail] = useState();
  // const [showPersonaldetailForm, setshowPersonaldetailForm] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const { signInWithEmail } = useAuth();
  const navigate = useNavigate();
  
  const getUser = async () => {
    const Snapshot = await getDoc(doc(db, "user", auth.currentUser.uid));
    if (Snapshot.exists()) {
      navigate("/Homepage", { replace: true });
    } else setshowPersonaldetailForm(true);
  };

  const SignUp = async (e) => {
    e.preventDefault();
    setLoading(!loading);
    try {
      setError("");
      await signInWithEmail(auth, registerEmail);
      await getUser();
    } catch (error) {
      setLoading(false);
      setError(error.code);
      console.log(error);
    }
  };

  setTimeout(() => {
    setError("");
  }, [5000]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        flexDirection: "row",
        height: "100vh",
        width: "100wh",
        top: "10rem",
      }}
    >
      <Box
        className="Left"
        display="flex"
        justifyItems="center"
        alignItems="center"
        flexDirection="column"
        flex={1}
      >
        <Typography variant="h4" textAlign={"center"}>
          Confirm Your Email
        </Typography>
        <img
          src={Signup}
          alt="Signup"
          height={"70%"}
          width={"70%"}
          // border={"2px solid black"}
        />
      </Box>

      <Box
        className="Right"
        flex={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //  border:"2px solid black"
        }}
      >
        {!showPersonaldetailForm && (
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "30rem",
              height: "auto",
              // justifyContent:"center",
              // alignItems:"center",
              boxShadow: 8,
              bgcolor: "white",
              p: 2,
              // marginTop:"5rem"
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, alignSelf: "center" }}>
              Confirm Your Email
            </Typography>

            {error && (
              <Alert severity="error" style={{ marginBottom: "1rem" }}>
                {error}
              </Alert>
            )}

            <TextField
              label="Email"
              name="email"
              type={"email"}
              margin="dense"
              sx={{ width: "100%" }}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />

            <LoadingButton
              loading={loading}
              type={"submit"}
              variant="contained"
              sx={{ width: "30%", alignSelf: "center", m: "1rem" }}
              onClick={SignUp}
            >
              Sign up
            </LoadingButton>
          </FormControl>
        )}

        {showPersonaldetailForm && <PersonalDetailForm/>}
        {showEducationForm && <EducationalForm />}
        {/* {showPersonaldetailForm && <PersonalDetailForm/>} */}
      </Box>
    </Box>
  );
};

export default ConfirmPage;
