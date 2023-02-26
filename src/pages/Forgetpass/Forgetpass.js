import React from "react";
import { useFormik } from "formik";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Forgetpass = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values, { resetForm }) => {
      sendPasswordResetEmail(auth, formik.values.email)
        .then(() => {
          resetForm("");
          toast.success("Please Check Your Email", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/");
          }, 5500);
        })
        .catch((err) => {
          console.log(err.message);
          if (err.code.includes("auth/missing-email")) {
            toast.error("Fill The Email Box", {
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
          if (err.code.includes("auth/user-not-found")) {
            toast.error("This Email Not Found", {
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
          if (err.code.includes("auth/invalid-email")) {
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
        });
    },
    // Yup
  });

  return (
    <>
      <div className="wrapper">
        <ToastContainer />
        <div className="forget-wrapper">
          <div className="header">
            <h2>Reset Your Password</h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
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
            <div className="reset-btn">
              <Button type="submit" variant="contained">
                Reset
              </Button>
            </div>
            <p className="repass">
              {" "}
              <Link to="/login">Remember Password ?</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgetpass;
