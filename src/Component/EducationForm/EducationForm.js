import React, { useState, useEffect, useContext } from "react";
import BottomNavbar from "../Navbar/BottomNavbar/BottomNavbar";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";

import "./EducationForm.css";
import { FormControl, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone";
import study from "../SVG/Study.svg";

const schema = yup.object().shape({
  Qualification: yup.string().required(),
  Institute: yup.string().required(),
  InstituteState: yup.string().required(),
  InstituteCity: yup.string().required(),
  Achievement: yup.string(),
});

const EducationForm = () => {
  // const {setshowEducationalForm} = useContext(FormContext);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState([]);

  const navigate = useNavigate();
  // const docReference = doc(db,"user",currentUser.uid)
  const [educationalDetails, setEducationalDetails] = useState({
    heighestQualification: "",
    institutionName: "",
    institutionCity: "",
    institutionState: "",
    Achievement: "",
  });

  useEffect(() => {
    const getData = async () => {
      const Data = await getDoc(doc(db, "user", auth.currentUser.uid));
      setInfo(Data.data());
    };
    getData();
  }, []);

  console.log(info);

  const clickHandler = async (data) => {
    await setDoc(doc(db, "user", auth.currentUser.uid), data, { merge: true });

    if (info.UserType === "Volunteer") navigate("/documentForm");
    else navigate("/HomePage");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //  const submitHandler = (data) => {
  //    console.log(data);
  //    reset();
  //  };

  //   setTimeout(() => {
  //     setError("");
  //   }, [5000]);

  return (
    <>
      <Box
        className="EduContainer"
        display={"flex"}
        flexDirection="row-reverse"
        margin={"3rem"}
      >
        <Box display={"flex"} flex={0.5}>
          <img
            src={study}
            alt="Form"
            width="100%"
            style={{ marginTop: "-100px" }}
          />
        </Box>

        <Box
          sx={{
            // width: "80%",
            height: "auto",
            // border:"2px solid black",
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItem: "center",
            padding: "0.5rem 0 1rem 0",
            boxShadow: 5,
          }}
          flex={0.5}
        >
          <Typography
            textAlign="center"
            style={{ marginBottom: "1rem", fontSize: "30px" }}
          >
            Educational Background
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <form
            className="EducationForm"
            onSubmit={handleSubmit(clickHandler)}
            style={{ fontSize: "16px" }}
          >
            <label>Highest Qualification</label>
            <div>
              <select
                className="EducationformInput"
                placeholder="10th/12th/UG/PG"
                {...register("Qualification")}
              >
              <option value="5th Grade">5th Grade</option>
                <option value="6th Grade">6th Grade</option>
                <option value="7th Grade">7th Grade</option>
                <option value="8th Grade">8th Grade</option>
                <option value="9th Grade">9th Grade</option>
                <option value="10th Grade">10th Grade</option>
                <option value="11th Grade">11th Grade</option>
                <option value="12th Grade">12th Grade</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>

              </select>

              <p className="errorMessage">{errors.Qualification?.message}</p>
            </div>

            <label>Institute/School Name </label>
            <div>
              <input
                {...register("Institute")}
                placeholder="Institute Name"
                className="EducationformInput"
              />
              <p className="errorMessage">{errors.Institute?.message}</p>
            </div>

            <label>Institute State</label>
            <div>
              <select
                {...register("InstituteState")}
                className="EducationformInput"
              >
                <option value="Andaman and Nicobar Islands">
                  Andaman and Nicobar Islands
                </option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Dadra and Nagar Haveli">
                  Dadra and Nagar Haveli
                </option>
                <option value="Daman and Diu">Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
              </select>

              <p className="errorMessage">
                {errors.InstituteState && "Please Select your Institute City"}
              </p>
            </div>

            <label>Institute City</label>
            <div>
              <input
                name="Institute City"
                {...register("InstituteCity")}
                className="EducationformInput"
              />
              <p className="errorMessage">{errors.InstituteCity?.message}</p>
            </div>

            <label>Any Achievement <span style={{color:"grey"}}> (optional)</span></label>
            <div>
              <textarea
                name="Achievement"
                placeholder="Anything of which you are proud of OR got recognised"
                {...register("Achievement")}
                // className="EducationformInput"
                rows={10}
                cols={20}
                style={{
                  padding: "10px",
                  resize: "none",
                  fontSize: "15px",
                  outline: "none",
                  width: "100%",
                }}
              />
              <p className="errorMessage">{errors.Achievement?.message}</p>
            </div>

            <button
              type="submit"
              className="FormSubmitButton"
              // style={{
              //   width: "8rem",
              //   height: "2.5rem",
              //   fontSize: "15px",
              //   marginLeft: "65%",
              //   border: "none",
              //   backgroundColor: "purple",
              //   color: "white",
              //   padding: "5px",
              //   borderRadius: "5px",
              // }}
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

export default EducationForm;
