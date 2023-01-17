import { createContext, useState,useEffect } from 'react';
import axios from "axios";
import { useCookies } from "react-cookie";


export const FriendListContext = createContext({});

export function FriendListProvider({ children }:any) {
  const [cookies, setCookie, getCookie] = useCookies<string>(["accessToken"]);

  const [friendInfos, setfriendInfos] = useState({});
  
  const loadFriendList = () => {
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
      }, [friendInfos]);
  }
  return (
    <FriendListContext.Provider value={{ friendInfos }}>
      {children}
    </FriendListContext.Provider>
  );
}