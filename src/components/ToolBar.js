import React from "react";
import "../styles/ToolBar.css";
import  axios  from 'axios';
import { useCookies } from 'react-cookie';

const ToolBar = ({isLogin, onLoginChange}) => {
  const [cookies, removeCookie] = useCookies(["accessToken"]);

  const handleLogout = () => {
    axios
      .delete("/users/logout", {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${cookies.accessToken}`,
      },
    })
    .then(() => {
      onLoginChange(false);
      removeCookie("accessToken", { path: "/"});
    })
    .catch((err) => {
      console.log("LOGOUT API 요청 실패", err);
    });
  }
    return(
        <div className="toolbar-container">
            <img
              src={
                isLogin 
                ?`${process.env.PUBLIC_URL}/icon/icon_logout.svg`
                :`${process.env.PUBLIC_URL}/icon/icon_login.svg`
              }
              alt="login"
              className="toolbar-icon"
              onClick ={isLogin ? handleLogout : handleloginRedirect}
            ></img>
            <img
              src={`${process.env.PUBLIC_URL}/icon/icon_recent.svg`}
              alt="recent"
              className="toolbar-icon"
            ></img>  
            <img
              src={`${process.env.PUBLIC_URL}/icon/icon_up.svg`}
              alt="up"
              className="toolbar-icon"
              onClick={MoveToTop}
            ></img>  
            <img
              src={`${process.env.PUBLIC_URL}/icon/icon_down.svg`}
              alt="down"
              className="toolbar-icon"
              onClick={MoveToBottom}
            ></img>  
        </div>
    );
};

const MoveToTop = () => {
  window.scrollTo({top:0, behavior: "smooth"});
};

const MoveToBottom = () => {
  window.scrollTo({top:document.body.scrollHeight, behavior: "smooth"});
};

const handleloginRedirect = () => {
  const redirectUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://karsa-likelion.netlify.app/";

  const oauthUrl =
   "http://sajang-dev-env.eba-gchahrh4.ap-northeast-2.elasticbeanstalk.com/oauth2/start/kakao" + 
   `?redirect_uri=${encodeURIComponent(redirectUrl)}`;

  window.location.href = oauthUrl;
};



export default ToolBar;