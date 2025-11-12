import React, { useEffect } from 'react';
import Menu from "./Menu";
import Banner from './Banner';
import Info from './Info';
import "../../styles/Home.css";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'; //URL에서 accessToken 지우기

const Home = ({onLoginChange}) => {
    const [, setCookie] = useCookies(["accessToken"]);
    const navigate = useNavigate();//ff

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken");

        if(accessToken) {
            setCookie("accessToken", accessToken, {
                path: "/",
                maxAge: 60*60*24*7
            });
            navigate("/", { replace: true});
            onLoginChange(true);
        }
    }, [setCookie, navigate, onLoginChange]);
    return(
        <div className="home-container">
         <Banner />
         <Menu />
         <Info />
        </div>
    );
};

export default Home;