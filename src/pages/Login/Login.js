import React, { useEffect, useState } from "react";
import "./login.css";
import "../Forgetpass/forgetpass.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { signin } from "../../Validation/validation";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { json, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loginuser } from "../../Redux/Slice/LoginSlice";
import { getDatabase, onValue, ref, set } from "firebase/database";
import "../../components/Search/search.css";
import "../../components/Style/home-page.css";

const Login = () => {
  const auth = getAuth();
  const [dbtn, setDbtn] = useState("contained");
  const googleProvider = new GoogleAuthProvider();
  const [showpass, setShowpass] = useState("password");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigat = useNavigate();
  const fbprovider = new FacebookAuthProvider();
  const db = getDatabase();
  const [userid, setUserid] = useState([]);

  const user = useSelector((users) => users.login.loggedin);

  let handleShowPass = () => {
    if (showpass === "password") {
      setShowpass("text");
    } else {
      setShowpass("password");
    }
  };
  // FB Signup

  const handleFacebook = () => {
    signInWithPopup(auth, fbprovider)
      .then((f) => {
        console.log(f.user);
        dispatch(Loginuser(f.user));
        localStorage.setItem("users", JSON.stringify(f.user));
        navigat("/");
      })
      .catch((error) => {
        console.log(error.code);
      });
  };
  ////

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let useridArr = [];
      snapshot.forEach((item) => {
        useridArr.push({ ...item.val(), id: item.key });
      });

      setUserid(useridArr);
    });
  }, []);
  // google signUP
  const checkUser = () => {
    userid.map((item) => {});
  };
  const handleGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((g) => {
        dispatch(Loginuser(g.user));
        localStorage.setItem("users", JSON.stringify(g.user));
        navigat("/");
        // set(ref(db, "users/" + g.user.uid), {
        //   username: g.user.displayName,
        //   email: g.user.email,
        // });
        userid.map((item) => {
          console.log(item.id);
          if (item.id != g.user.uid) {
            set(ref(db, "users/" + g.user.uid), {
              username: g.user.displayName,
              email: g.user.email,
            });
          } else {
          }
        });
        // console.log(g.user);
      })

      .catch((error) => {
        console.log(error.message);
        toast.error("Login Failed Please Try Again", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
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
        .then(({ user }) => {
          if (auth.currentUser.emailVerified == true) {
            setDbtn("disabled");
            resetForm({ values: "" });
            dispatch(Loginuser(user));
            localStorage.setItem("users", JSON.stringify(user));
            setLoading(false);
            navigat("/");
          } else {
            setLoading(false);
            toast.warn("Please Verify Your Email", {
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
        })

        .catch((error) => {
          setLoading(false);
          if (error.code.includes("auth/user-not-found")) {
            toast.error("Invalid Email", {
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
          if (error.code.includes("auth/wrong-password")) {
            toast.error("Wrong Password", {
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
        });
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

              <Box className="login-auth">
                <Box className="auth-google" onClick={handleGoogle}>
                  <picture>
                    <img src="../img/google.png" alt="" />
                  </picture>
                  <span>Login with Google</span>
                </Box>
                <Box className="auth-google auth-fb" onClick={handleFacebook}>
                  <picture>
                    <img src="../img/facebook.png" alt="" />
                  </picture>
                  <span>Login with facebook</span>
                </Box>
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
                      <Button className="loader-btn" variant="disabled">
                        <ScaleLoader color="#ffffff" height={21} />
                      </Button>
                    ) : (
                      <Button type="submit" variant={dbtn}>
                        Login
                      </Button>
                    )}
                  </Box>
                </Box>
              </form>
            </Box>
            <Box className="si-link forgetpass">
              <p>
                <Link to="/forgetpass">Forgot Password ?</Link>
              </p>
            </Box>
            <Box className="si-link ">
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
