import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
export interface IProps {
  detail: { postId: number };
}

export default function TodayList(props: any) {
  const [cookies] = useCookies(["accessToken", "password"]);
  const [todaies, setTodaies] = useState<string[]>([]);
  let userId: string | null = localStorage.getItem("userId");
  let month = 12;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`post/${userId}/${month}`, {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        });
        setTodaies(res.data.result.postInfoDtos);
        console.log(res.data.result.postInfoDtos);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  if (!todaies) {
    return null;
  }
  return (
    <div>
      {todaies.map((today: any) => (
        <Link to={`/todaylist/${today.postId}`}>
          <button key={today.postId}>{today.creationDay}</button>
        </Link>
      ))}
    </div>
  );
}
