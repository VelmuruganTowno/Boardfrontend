/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core/";
import { Visibility, VisibilityOff } from "@material-ui/icons/";
import login from "../../assets/pictures/login.png";
import towno from "../../assets/logo/towno_logo.png";
import Board from "../../assets/logo/Board-logo-Black.png";
import "./auth.scss";
import Api from "../../Service/Api";
import { baseurl, loginbaseurl } from "../../Service/httpCommon";
import axios from "axios";
import { toast } from "react-toastify";
import BoardLogo from '../../assets/logo/Board-logo.png';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";

var CryptoJS = require("crypto-js");

const Login = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const unique = localStorage.getItem("unique_id");
  const role = localStorage.getItem("role");
  const designation = localStorage.getItem("designation");
  const token = localStorage.getItem("token");
  const checkAgent = localStorage.getItem("agent")


  /*useEffect(() => {
    if (unique && role !== "Agent Admin") {
      history.push(`/dashboard`);
    } else if (unique && role == "Agent Admin") {
      history.push(`/agent`);
    }
  }, [history, unique, role]);*/

  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = yup.object({
    username: yup
      .string()
      .strict()
      .trim()
      .required("Please Enter the Username"),
    password: yup
      .string()
      .strict()
      .trim()
      .required("Please Enter the Password"),
  });

  const onSubmit = (data) => {
    console.log(data);
    /*var ciphertextupdate = CryptoJS.AES.encrypt(JSON.stringify(data.password), 'my-secret-key@123').toString();
    data.password = ciphertextupdate;*/
    setLoading(true);
    axios.post(loginbaseurl+"loginnew", data)
      .then((res) => {
        if (res.data.id !== null) {
          window.sessionStorage.setItem("token", res.data.token);
          localStorage.setItem("unique_id", res.data.uniqueId);
          localStorage.setItem("employee_id", res.data.id);
          localStorage.setItem("auth", data.username.replace(/^\w/, c => c.toUpperCase()));
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("designation", res.data.designation);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("typeAgent",res.data.typeAgent);
          if (res.data.agent) {
            localStorage.setItem("agent", res.data.agent);
          } 
          setTimeout(() => {
            if (res.data.role === "Agent Admin" || res.data.agent === "Agent") {
              history.push(`/agent`);
              // window.open("/agent", "_blank");
            } else {
              history.push(`/dashboard`);
              //window.open(baseurl+"dashboard", "_self");
            }
  
            setLoading(false);
          }, 2000);
          
        } else {
          localStorage.removeItem("unique_id");
          localStorage.removeItem("employee_id");
          localStorage.removeItem("auth");
          localStorage.removeItem("role");
          localStorage.removeItem("designation");
          localStorage.removeItem("token");
          toast.error("Invalid Password or UserName");
          setLoading(false);
        }
      })
      .catch((err) => {
        //toast.error("Please Login after some Time"+err);
        setLoading(false);
      });
  };

  return (
    <>
      {/* Navbar  */}
      <div style={{ backgroundColor: '#111' }}>
        <Stack direction='row' justifyContent='space-between'>
          
          <Link to="/"><img src={BoardLogo} alt="logo" style={{ width: '12em', height: '2.5em', margin: '0.7em', marginLeft: '1.8em' }} /></Link>
        </Stack>
      </div>
      {/* Navbar Ends  */}
      <div className="container">
        <div className="contentLogin">
          <h1>
            Log In To {""}
            <img src={Board} alt="logo" />
          </h1>
          <p>Enter your details below</p>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form autoComplete="off">
              <Field
                as={TextField}
                name="username"
                label="Username"
                size="small"
                required
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <ErrorMessage name="username">
                {(error) => <div className="error">{error}</div>}
              </ErrorMessage>
              <Field
                as={TextField}
                name="password"
                label="Password"
                required
                fullWidth
                size="small"
                variant="outlined"
                margin="normal"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage name="password">
                {(error) => <div className="error">{error}</div>}
              </ErrorMessage>
              {loading ? (
                <Button type="submit" fullWidth disabled>
                  <i
                    className="fa fa-refresh fa-spin"
                    style={{
                      marginLeft: "-12px",
                      marginRight: "8px",
                    }}
                  ></i>
                  Login
                </Button>
              ) : (
                <Button type="submit" fullWidth>
                  Login
                </Button>
              )}
              {/* <p className="linking">
                Don't have an account ?{" "}
                <Link to="/companyregister">Register</Link>
              </p> */}
              <div className="powered">
                <h3>
                  Powered By <img src={towno} alt="logo" className="towno" />
                </h3>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="sideimage">
          <img src={login} alt="login" />
        </div>
      </div>
    </>
  );
};

export default Login;
