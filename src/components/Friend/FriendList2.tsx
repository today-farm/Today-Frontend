import React, { useState, useEffect, createElement } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { FriendListProvider } from "../../context/FriendListContext";
function FriendList2() {
  //const [friend_ID, setfriend_ID] = useState<any>();
    const [friendInfos, setfriendInfos] = useState();
    const [cookies, setCookie, getCookie] = useCookies<string>(["accessToken"]);
    
    useEffect(() => {
      setfriendInfos([]);
        axios({
            url: `friends/${localStorage.getItem('userId')}`, // 통신할 웹문서
            method: 'get', // 통신할 방식
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.accessToken}`,
            }
          })
          .then((res) => {
            console.log("컴포넌트가 화면에 나타나고, axios 요청 성공");
            //문제가 있을 시, 여기를 좀 건드려줄 것. 
            console.log(res.data.result.friendInfos);
            setfriendInfos([...res.data.result.friendInfos]);
            console.log(friendInfos);
            // let userID : number = 0;            
          })
          .catch((err) => {
            console.log(err);
          });
        
        console.log('컴포넌트가 화면에 나타남');
        return () => {
          
        };
      }, []);


    return (
        <>
        
        </>
    )
}


export default FriendList2;