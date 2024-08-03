import React, { useState, useEffect, useContext } from "react";
import "./PersonalDetailForm.css";
import BottomNavbar from "../Navbar/BottomNavbar/BottomNavbar";
import { Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { FormContext } from "../Context/DetailFormContext.js.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LandingNavbar from "../LandPage/LandingPageNavbar"
import * as yup from "yup";
import "yup-phone";
import personalForm from "../SVG/personalform.svg";
const schema = yup.object().shape({
  // UserType: yup.string().required(),
  FullName: yup.string().min(2, "Too Short!").max(50, "Too Long!").required(),
  Gender: yup.string().required(),
  Email: yup.string().email().required(),
  PhoneNo: yup.string().phone("IN").required(),
});

const PersonalDetailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { showPersonaldetailForm, showEducationForm } = useContext(FormContext);

  const navigate = useNavigate();
  // const docReference = doc(db,"user",currentUser.uid)
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [phoneno, setPhoneno] = useState();
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    return () => {
      setFullname("");
      setGender("");
      setPhoneno("");
      setError("");
      setUserType("");
    };
  }, []);

  const clickHandler = async (data) => {
    console.log(data);
    // if (userType !=="" && gender !== "") {
    //  setshowEducationForm(true);
    await setDoc(
      doc(db, "user", auth.currentUser.uid),
      // {
      //   name: fullname,
      //   phoneno: phoneno,
      //   gender: gender,
      //   userType: localStorage.getItem("userType"),
      // }
      data
    );
    navigate("/educationForm", { replace: true });
    // navigate("/Homepage");
    // setshowPersonaldetailForm(false);
    //   return;
    // } else {
    //   setError("please fill all details");
    // }
  };

  function changeHandler(e) {
    setUserType(e.target.value);
    localStorage.setItem("userType", e.target.value);
  }

  console.log(showPersonaldetailForm);
  console.log(showEducationForm);

  // setTimeout(() => {
  //   setError("");
  // }, [5000]);

  return (
    <>
    <LandingNavbar/>
      <Box
        className="PerosnalFormContainer"

        display="flex"
        flexDirection="row"
         bgcolor={"transparent"}
        height="100vh"
        margin="6rem 3rem 3rem 3rem"
      >
        <Box className="leftContainer" display={"flex"} flex="0.5">
          <img src={personalForm} alt="Form" width="100%" />
        </Box>

        <Box
          className="rightContainer"
          sx={{
            height: "95%",
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
            padding: "0.5rem 0 1rem 0",
            boxShadow: 5,
            borderRadius: "8px",
            marginLeft: "20px",
          }}
          flex={"0.5"}
        >
          <Typography
            textAlign="center"
            style={{ marginBottom: "1rem", fontSize: "30px" }}
          >
            Personal Details
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <form
            className="personalDetailForm"
            onSubmit={handleSubmit(clickHandler)}
          >
            <label style={{fontWeight:"500"}}>User Type</label>
            <div>
              <select
                className="formInput"
                placeholder="User Type..."
                {...register("UserType")}
              >
                <option value={"Learner"}>Learner</option>
                <option value={"Volunteer"}>Volunteer</option>
              </select>
              <p className="errorMessage">{errors.UserType?.message}</p>
            </div>

            <label style={{fontWeight:"500"}}>Full Name </label>
            <div>
              <input
                {...register("FullName")}
                placeholder="Fullname..."
                className="formInput"
              />
              <p className="errorMessage">{errors.FullName?.message}</p>
            </div>

            <label style={{fontWeight:"500"}}>Select Gender </label>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                cursor: "pointer",
              }}
            >
              <label style={{color:"grey"}} htmlFor="male">
                <input
                  style={{ cursor: "pointer" }}
                  type="radio"
                  id="male"
                  {...register("Gender")}
                  value={"Male"}
                  name="Gender"
                />
               &nbsp; Male
              </label>
              <label style={{color:"grey"}} htmlFor="female">
                <input
                  style={{ cursor: "pointer" }}
                  type="radio"
                  id="female"
                  {...register("Gender")}
                  value={"Female"}
                  name="Gender"
                />
               &nbsp; Female
              </label>
              <label style={{color:"grey"}} htmlFor="other">
                <input
                  style={{ cursor: "pointer" }}
                  type="radio"
                  id="other"
                  {...register("Gender")}
                  value={"Other"}
                  name="Gender"
                />
               &nbsp; Other
              </label>
            </div>

            <p className="errorMessage">
              {errors.Gender && "Please Select Gender"}
            </p>

            <label style={{fontWeight:"500"}}>Email</label>
            <div>
              <input
                name="Email"
                placeholder="ABC@gmail.com"
                {...register("Email")}
                className="formInput"
              />
              <p className="errorMessage">{errors.Email?.message}</p>
            </div>

            <label style={{fontWeight:"500"}}>Phone No: </label>
            <div>
              <input
                label="Phone No"
                name="PhoneNo"
                placeholder=""
                {...register("PhoneNo")}
                className="formInput"
              />
              <p className="errorMessage">{errors.PhoneNo?.message}</p>
            </div>

            <button
              type="submit"
              className="FormSubmitButton"
            >
              Next
            </button>
          </form>
        </Box>
      </Box>
      <BottomNavbar />
    </>
  );
};

export default PersonalDetailForm;
