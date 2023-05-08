import React, { useEffect, useState } from "react";
import "./registration.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { signup } from "../../Validation/validation";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [dbtn, setDbtn] = useState("contained");
  const [showpass, setShowpass] = useState("password");
  const [loading, setLoading] = useState(false);
  let navigat = useNavigate();
  let handleShowPass = () => {
    if (showpass === "password") {
      setShowpass("text");
    } else {
      setShowpass("password");
    }
  };

  // Formik

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    onSubmit: (values, { resetForm }) => {
      // Sign up new users
      setLoading(true);
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(({ user }) => {
          updateProfile(auth.currentUser, {
            displayName: formik.values.name,
          })
            .then(() => {
              sendEmailVerification(auth.currentUser).then(() => {
                set(ref(db, "users/" + user.uid), {
                  username: user.displayName,
                  email: user.email,
                }).then(() => {
                  toast.success("Please Verify Your Email !", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  setTimeout(() => {
                    navigat("/login");
                  }, 3500);
                });
              });
            })
            .catch((error) => {
              console.log(error.message);
            });
          setDbtn("disabled");
          resetForm({ values: "" });
          setLoading(false);
        })
        .catch((error) => {
          if (error.code.includes("auth/email-already-in-use")) {
            toast.error("This Email Already In Use", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }

          console.log(error.code);
          setLoading(false);
        });
    },
    // Yup
    validationSchema: signup,
  });

  return (
    <>
      <Container fixed>
        <ToastContainer />
        <Grid className="box" container spacing={2}>
          <Grid item xs={6}>
            <Box className="froms">
              <Box className="reg-header">
                <h2>Get started with easily register</h2>
                <p>Free register and you can enjoy it</p>
              </Box>
              <form onSubmit={formik.handleSubmit}>
                <Box className="inputs">
                  <Box className="input-box">
                    <TextField
                      type="text"
                      label="Full Name"
                      variant="outlined"
                      name="name"
                      className="w-70"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused": {
                          "& > fieldset": {
                            borderColor: "#11175d",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#11175d",
                        },
                      }}
                      value={formik.values.name}
                    />
                    {formik.errors.name && formik.touched.name ? (
                      <p>{formik.errors.name}</p>
                    ) : null}
                  </Box>
                  <Box className="input-box">
                    <TextField
                      type="email"
                      label="Email"
                      variant="outlined"
                      className="w-70"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name="email"
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused": {
                          "& > fieldset": {
                            borderColor: "#11175d",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#11175d",
                        },
                      }}
                      value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <p>{formik.errors.email}</p>
                    ) : null}
                  </Box>
                  <Box className="input-box" sx={{ position: "relative" }}>
                    <TextField
                      type={showpass}
                      label="Password"
                      variant="outlined"
                      className="w-70"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name="password"
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused": {
                          "& > fieldset": {
                            borderColor: "#11175d",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#11175d",
                        },
                      }}
                      value={formik.values.password}
                    />
                    <Box className="input-icon" onClick={handleShowPass}>
                      {showpass === "password" ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </Box>
                    {formik.errors.password && formik.touched.password ? (
                      <p>{formik.errors.password}</p>
                    ) : null}
                  </Box>
                  <Box className="input-box">
                    <TextField
                      type="password"
                      label="Confirm Password"
                      variant="outlined"
                      className="w-70"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="confirmpassword"
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused": {
                          "& > fieldset": {
                            borderColor: "#11175d",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#11175d",
                        },
                      }}
                      value={formik.values.confirmpassword}
                    />
                    {formik.errors.confirmpassword &&
                    formik.touched.confirmpassword ? (
                      <p>{formik.errors.confirmpassword}</p>
                    ) : null}
                  </Box>

                  <Box className="signup-btn">
                    {loading ? (
                      <Button className="loader-btn" variant="disabled">
                        <ScaleLoader color="#ffffff" height={21} />
                      </Button>
                    ) : (
                      <Button
                        style={{ color: "#fff" }}
                        type="submit"
                        variant={dbtn}
                      >
                        Sign Up
                      </Button>
                    )}
                  </Box>
                </Box>
              </form>
            </Box>
            <Box className="si-link">
              <p>
                Already have an account ?
                <span>
                  <Link to="/login"> Sign In</Link>
                </span>
              </p>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <picture>
              <img
                className="sugnup-img"
                loading="lazy"
                src="../img/signup.png"
                alt=""
              />
            </picture>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Registration;
