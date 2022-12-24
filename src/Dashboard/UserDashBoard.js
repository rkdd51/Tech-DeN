import React from "react";
import { Link, Redirect } from "react-router-dom";
import { signout } from "../auth";

const UserDashboard = () => {
  return (
    <>
      <div className="test">
        <h1>This is UserDashBoard board page</h1>
        <Link to="/">
          <button
            onClick={() => {
              signout(() => {
                console.log("signout from dashbaord");
              });
            }}
          >
            Signout
          </button>
        </Link>
        <Link to="/user/dashboard/profile/general">
          <button style={{ width: "150px" }}>General Profile</button>
        </Link>
        <Link to="/user/dashboard/profile/changepassword">
          <button style={{ width: "150px" }}>ChangePassword</button>
        </Link>
        <Link to="/user/dashboard/profile/overview">
          <button>Overview</button>
        </Link>
      </div>
    </>
  );
};
export default UserDashboard;
