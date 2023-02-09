import React, { useEffect, useState } from "react";
import "./login.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { signin } from "../../components/validation";
import ScaleLoader from "react-spinners/ScaleLoader";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const auth = getAuth();
  const [showpass, setShowpass] = useState("password");
  const [loading, setLoading] = useState(false);

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
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      // Sign up new users
      setLoading(true);
      signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(() => {
          console.log("hoiche");
          setLoading(false);
          toast.success("Login successfull !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })

        .catch((error) => {
          console.log(error.code);
        });

      resetForm({ values: "" });
    },
    // Yup
    validationSchema: signin,
  });

  return (
    <>
      <Container fixed>
        <ToastContainer />
        <Grid className="box" container spacing={2}>
          <Grid item xs={6}>
            <picture>
              <img
                className="sugnup-img"
                loading="lazy"
                src="../img/signin.png"
                alt=""
              />
            </picture>
          </Grid>
          <Grid item xs={6}>
            <Box className="froms">
              <Box className="login-avatar">
                <picture>
                  <img src="../img/login-avatar.png" alt="" />
                </picture>
              </Box>
              <Box className="reg-header log-header">
                <h2>Login to your account!</h2>
              </Box>
              <form onSubmit={formik.handleSubmit}>
                <Box className="inputs">
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
                    {formik.errors.password && formik.touched.password ? (
                      <p>{formik.errors.password}</p>
                    ) : null}
                    <Box className="input-icon" onClick={handleShowPass}>
                      {showpass === "password" ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </Box>
                  </Box>

                  <Box className="signup-btn">
                    {loading ? (
                      <Button className="loader-btn" variant="contained">
                        <ScaleLoader color="#ffffff" height={21} />
                      </Button>
                    ) : (
                      <Button type="submit" variant="contained">
                        Sign Up
                      </Button>
                    )}
                  </Box>
                </Box>
              </form>
            </Box>
            <Box className="si-link">
              <p>
                Don’t have an account ?
                <span>
                  <Link to="/register"> Sign Up</Link>
                </span>
              </p>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
