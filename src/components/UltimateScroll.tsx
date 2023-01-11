import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import React from "react";

export default function UltimateScroll () {
    const [friend_ID, setfriend_ID] = useState<any>();
    const [cookies, setCookie, getCookie] = useCookies<string>(["accessToken"]);

    const [items, setItems] = useState([]); // 추가된 부분
    const [target, setTarget] = useState(null);
    let page = 1;

const fetchData = async () => {
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
            let userID : number = 0;
            setItems((prev) => prev.concat(res.data.results));
            page++;
                console.log(res.data);
          })
        .catch((err) => {
            console.log(err);
          });
        
        return () => {

        };
      
//   const response = await fetch(`/api/db/${page}`);
//   const data = await response.json();
//   setItems((prev) => prev.concat(data.results));
//   page++;
};

// 추가된 부분
useEffect(() => {
  fetchData();
}, []);

useEffect(() => {
  let observer:any;
  if (target) {
    const onIntersect = async ([entry]:any, observer:any) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        await fetchData();
        observer.observe(entry.target);
      }
    };
    observer = new IntersectionObserver(onIntersect, { threshold: 1 }); // 추가된 부분
    observer.observe(target);
  }
  return () => observer && observer.disconnect();
}, [target]);

return (
  <div>
    
    <div ref='setTarget'>
      This is Target.
    </div>
  </div>
);
}

