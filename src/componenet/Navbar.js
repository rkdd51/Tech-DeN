import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const Navbar = () => {
  return (
    <div className="main_nav">
      <div className="logo">
        {/* <a href="#">logo</a> */}
        <div style={{float:'left',display:'flex',alignContent:'left'}}>

        <span style={{color:'black',fontWeight:'bold'}}>Tech</span>
        <span style={{color:'#362BB2',fontWeight:'bold'}}>Den</span>
        
        </div>
      </div>
      <ul className="list">
        {!isAuthenticated() && (
          <>
            <NavLink className="NavLink" to="/">
              <li>
                <button>Sign In</button>
              </li>
            </NavLink>
            <NavLink className="NavLink" to="/signup">
              <li>
                <button className="signUp">Sign Up</button>
              </li>
            </NavLink>
          </>
        )}

        {isAuthenticated() && (
          <NavLink className="NavLink" to="/">
            <li>
              <button
                className="signUp"
                onClick={() => {
                  signout(() => {
                    console.log("user sign out");
                  });
                }}
              >
                Sign Out
              </button>
            </li>
          </NavLink>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
