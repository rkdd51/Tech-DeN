import "./App.css";
import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Navbar from "./componenet/Navbar";
import SignIn from "./componenet/SignIn";
import Signup from "./componenet/SignUp";
import PrivateRoutes from "./auth/PrivateRoute";
import AdminRoutes from "./auth/AdminRoutes";
import UserDashboard from "./MainDashBoard/Dashboard";
import AdminDashboard from "./Dashboard/AdminDashBoard";
import Error from "./componenet/Error";
import ProfileBase from "./Profile/ProfileBase";
import GeneralProfile from "./Profile/Profile1";
import ChangePassword from "./Profile/Profile2";
import Overview from "./Profile/Profile3";
import { Auth } from "./auth/Auth";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/auth" exact component={Auth} />
        <Route exact path="/profile" component={ProfileBase} />

        <PrivateRoutes exact path="/user/dashboard" component={UserDashboard} />
        <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard} />
        <PrivateRoutes
          path="/user/dashboard/profile/general"
          exact
          component={GeneralProfile}
        />
        <PrivateRoutes
          path="/user/dashboard/profile/changepassword"
          exact
          component={ChangePassword}
        />
        <PrivateRoutes
          path="/user/dashboard/profile/overview"
          exact
          component={Overview}
        />

        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
