import React, {useState, useEffect} from "react";
import "../../styles/Mypage.css";
import Profile from './Profile';
import Status from './Status';
import Address from './Address';
import Histrory from './History';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Mypage = () => {
    const [cookies] = useCookies(["accessToken"]);
    const [profileData, setProfileData] = useState({});
    const [orderStatusData, setOrderStatusData] = useState({});

    useEffect (()=> {
            axios
                .get("/users/profile", {
                    headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${cookies.accessToken}`,
                },
                })
                .then((response) => {
                    setProfileData({
                        usernickname: response.data.result.usernickname,
                        recentTotal: response.data.result.recentTotal,
                        maxMileage: response.data.result.maxMileage,
                    });
                    setOrderStatusData(response.data.result.orderStatusCounts);
                })
                .catch((err) => {
                console.log("API 요청 실패", err);
                });
            }, [cookies.accessToken]);
    const handleSave = async (zipcode,address,addressDetail) => {
        try{
            const response = await axios.post("/users/address",
                {
                    "zipcode":zipcode,
                    "address":address,
                    "addressDetail":addressDetail
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cookies.accessToken}`,
                    },
                }
            );

            if(response.data.isSuccess){
                alert("주소가 성공적으로 저장되었습니다.");
            } else{
                alert(`주소 저장 실패: ${response.data.message}`);
            }
        } catch (error){
            console.error("주소 저장 오류:", error);
            alert("주소 저장 중 오류가 발생했습니다.");
        }
    };
    return(
        <div className="page-container">
         <Profile profileData={profileData} />
         <Status orderStatusData={orderStatusData}/>
         <Address handleSave={handleSave} />
         <Histrory />
        </div>
    );
};

export default Mypage;