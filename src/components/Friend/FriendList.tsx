import React, { useState, useEffect, createElement, useContext } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { FriendListContext, FriendListProvider } from "../../context/FriendListContext";

function Friendlist2() {
  //const [friend_ID, setfriend_ID] = useState<any>();
    // const {friendInfos, loadFriendList} = useContext(FriendListContext)
    const [cookies, setCookie, getCookie] = useCookies<string>(["accessToken"]);
    
    


    return (
        <>
        현재 나의 친구 목록
        <FriendBowl>
          
        </FriendBowl>
        </>
    )
}

function FriendBowl({ children }:any) {
    return (
      <div
        style={{
          backgroundColor: 'black',
          borderRadius: '20px',
          color: 'white',
          minHeight: '200px',
          maxWidth: '200px',
          margin: '1rem',
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        {children}
      </div>
    );
  }
const initialState = [<object></object>];

export default Friendlist2;