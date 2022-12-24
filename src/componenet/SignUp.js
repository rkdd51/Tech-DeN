import React, { useState } from "react";
import Base from "./core/Base";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import { Link } from "react-router-dom";
import "./Signup.css";
import { signup } from "../auth/index";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
    ></Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { firstName, lastName, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
    })
      .then((data) => {
        console.log("data", data);
        if (data.error) {
          setValues({
            ...values,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            error: data.error,
            success: false,
          });
        } else {
          setValues({
            ...values,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("error in signup"));
  };
  const successMessaage = () => {
    return (
      <div className="success-message">
        <p>
          New account created successfully. Please{" "}
          <Link to="/" className="signinlink">
            Sign here
          </Link>
        </p>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="error-message">
        <p> Error: {error}</p>
      </div>
    );
  };
  return (
    <Base>
      <Container component="main" maxWidth="xs" className="main">
        <CssBaseline />
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
          <Typography component="h1" variant="h5">
            <span style={{ fontWeight: "bold" }}>Welcome to Tech</span>
            <span style={{ fontWeight: "bold", color: "#362BB2" }}>House</span>
            <br />
            <span style={{ fontWeight: "bold" }}>SignUp to get Started</span>
          </Typography>
          {success && successMessaage()}
          {error && errorMessage()}
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item s={12} sm={6}>
                <TextField
                  className="one"
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label=" First Name"
                  autoFocus
                  onChange={handleChange("firstName")}
                  value={firstName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={handleChange("lastName")}
                  value={lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange("email")}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange("password")}
                  value={password}
                />
              </Grid>
            </Grid>
            <br></br>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              Sign Up
            </Button>

            <Button
              className="btn-Signup"
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              <GTranslateIcon />
              Sign Up with Google
            </Button>
          </form>
        </div>
        {/* <p>{JSON.stringify(values)}</p> */}
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </Base>
  );
}
