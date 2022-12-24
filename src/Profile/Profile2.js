import React from "react";
import ProfileBase from "./ProfileBase";
import padlock from "../images/padlock.svg";
import security from "../images/security.svg";
import general from "../images/general.svg";
import { Link } from "react-router-dom";

function Profile2() {
  const username = JSON.parse(localStorage.getItem("username"));

  return (
    <ProfileBase>
      <div className="general">
        <div className="leftside">
          <div className="avatarProfile"></div>
          <div className="profileName">{username}</div>
          <div className="professionName">Developer</div>
          <Link to="/user/dashboard/profile/general" className="link">
            <div className="generalInfo-panel">
              <div className="iconss">
                <img src={general} alt="" />
              </div>
              <div className="text-info-panel">
                <div className="panel-name-general-Chpass">
                  General Information
                </div>
                <div className="panel-subname">Profile</div>
              </div>
            </div>
          </Link>
          <div className="security-panel">
            <div className="iconss">
              <img src={security} alt="" />
            </div>
            <div className="text-info-panel">
              <div className="panel-name-security-Chpass">Security</div>
              <div className="panel-subname">Password</div>
            </div>
          </div>
        </div>

        <div className="rightside">
          <div className="topname">Change Password</div>
          <div className="ChangePass">
            <form action="">
              <div className="detailField">
                <div className="currentP">
                  <div className="subHeader">Current Password</div>
                  <div className="lockPass">
                    <p>********</p>
                    <img src={padlock} alt="" />
                  </div>
                </div>
              </div>
              <div className="detailField">
                <div className="currentP1">
                  <div className="subHeader">New Password</div>
                  <input type="password" placeholder="*******" />
                </div>
              </div>

              <div className="detailField">
                <div className="currentP1">
                  <div className="subHeader">Confirm New Password </div>
                  <input type="password" placeholder="*******" />
                </div>
              </div>
              <div className="updateSetting">
                <button>Update Setting</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProfileBase>
  );
}

export default Profile2;
