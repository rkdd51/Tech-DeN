import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { API } from "../backend";
import axios from "axios";
import { Redirect } from "react-router";
import { isAuthenticated } from "./index";
import { authenticate } from "./index";

export const Auth = () => {
  const [values, setvalues] = useState({
    loading: false,
    didRidirect: false,
  });

  const { didRidirect } = values;
  const { user } = isAuthenticated();

  const responseGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: `${API}/googlelogin`,
      data: { tokenId: response.tokenId },
    }).then((response) => {
      authenticate(response.data, () => {
        setvalues({
          ...values,
          didRidirect: true,
        });
      });
      console.log("Google login success", response);
    });
  };

  const GoogleAuth = () => {
    return (
      <div>
        <GoogleLogin
          clientId="501834169926-3se3mm2s4568jhchs064b5of1tklfuna.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
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
    <div>
      {GoogleAuth()}
      {performRedirect()}
    </div>
  );
};
