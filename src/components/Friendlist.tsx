import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

function Friendlist() {
    const [friend_ID, setfriend_ID] = useState<any>();
    const [cookies, setCookie, getCookie] = useCookies<string>(["accessToken"]);

    const friend_add = ()=> {
        console.log("친구목록 조회");
        
        axios({
            method: "post",
            url: `friends/${friend_ID}`,//받은 입력값으로 url요청 보내기1
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
              }
        }).then(function(res) {
            console.log("친구목록 조회 성공");
            let refreshToken: string = res.headers["authorization-refresh"]!;
            let accessToken = res.headers.authorization;
            setCookie("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            // 친구 목록 보여주는 로직 
        })
    }
    



    return (
        <>
        <input type="text" placeholder="친구목록 조회하고 싶은 유저 ID를 입력하세요" value ={friend_ID} 
        onChange={(e) => setfriend_ID(e.target.value)}/>
        <button onClick={friend_add} className="friend-add">친구목록 조회</button>
        </>
    )
}

export default Friendlist;