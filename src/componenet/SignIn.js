import React, { useState } from "react";
import Base from "./core/Base";
import "./SignIn.css";
import { Link, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { API } from "../backend";
import { signin, authenticate, isAuthenticated } from "../auth/index";

function SignIn() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRidirect: false,
  });
  const { email, password, didRidirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (field) => (event) => {
    setValues({ ...values, error: false, [field]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false, laoding: true });
    signin({ email: email, password: password })
      .then((data) => {
        console.log("token and user", data);
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
            didRidirect: false,
          });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRidirect: true,
            });
          });
        }
      })
      .catch(console.log("sign in requestt failed"));
  };

  const responseGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: `${API}/googlelogin`,
      data: { tokenId: response.tokenId },
    }).then((response) => {
      authenticate(response.data, () => {
        setValues({
          ...values,
          didRidirect: true,
        });
      });
      console.log("Google login success", response);
    });
  };

  const signinform = () => {
    return (
      <div>
        <div className="img">
          <img
            src="https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            alt="signIn img"
          />
        </div>
        <div className="form_signIn">
          <form action="submit">
            <h2>Welcome to TechHouse Sign In to get started</h2>
            {/* <p className="signIn_txt">Enter your details to procced further</p> */}

            <label htmlFor="">Email </label>

            <input
              type="email"
              id="fname"
              s
              name="email"
              placeholder="Enter email"
              onChange={handleChange("email")}
              value={email}
            />
            <hr />
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={handleChange("password")}
            />
            <hr />
            <input type="checkbox" id="checkbox" />

            <label htmlFor="checkbox" className="remember_me">
              Remember Me
            </label>

            <a href="#" className="forget_psd">
              Forget password?
            </a>
            <button onClick={onSubmit} className="signIn_btn ">
              Sign In
            </button>

            <GoogleLogin
              clientId="501834169926-3se3mm2s4568jhchs064b5of1tklfuna.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />

            {/* <img src={ReactLogo} alt="google logo" />
              <p>Sign Up with Google</p> */}
            <div></div>
          </form>
        </div>
      </div>
    );
  };

  const performRedirect = () => {
    if (didRidirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    // if (isAuthenticated()) {
    //   return <Redirect to="/" />;
    // }
  };

  return (
    <Base>
      {signinform()}
      {performRedirect()}
    </Base>
  );
}

export default SignIn;
