import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";

export default function TodayDetail(): JSX.Element {
  const [cookies] = useCookies(["accessToken", "password"]);
  const [postQuestions, setPostQuestions] = useState<string[]>([]);
  const [creationDay, setCreationDay] = useState("");
  const [todayFeeling, setTodayFeeling] = useState("");
  const [canPublicAccess, setCanPublicAccess] = useState<boolean>();
  const navigate = useNavigate();
  const params = useParams();
  const todayId = params.id;
  const amazonUrl = `https://todayproject-bucket.s3.ap-northeast-2.amazonaws.com/`;
  console.log(canPublicAccess);

  async function getDetailToday() {
    return axios({
      method: "get",
      url: `/post/${todayId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    })
      .then((res) => {
        console.log(res.data.result);
        setPostQuestions(res.data.result.postQuestions);
        setCreationDay(res.data.result.creationDay);
        setTodayFeeling(res.data.result.todayFeeling);
        setCanPublicAccess(res.data.result.canPublicAccess);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      await getDetailToday();
    };
    fetchData();
  }, []);

  async function deleteToday() {
    // try {
    //   const res = await axios.delete(`/post/delete/${todayId}`, {
    //     headers: {
    //       Authorization: `Bearer ${cookies.accessToken}`,
    //     },
    //   });
    //   console.log(res);
    //   alert("정상적으로 삭제되었습니다.");
    // } catch (e) {
    //   console.log(e);
    // }
    return axios({
      method: "DELETE",
      url: `/post/delete/${todayId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    })
      .then((res) => {
        console.log(res);
        navigate("/todaylist");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div>날짜 : {creationDay}</div>
      <div>나의 기분 : {todayFeeling}</div>
      <div>
        <label>비밀여부</label>
        <input type="checkbox" checked={!canPublicAccess} />
      </div>
      {postQuestions.map((today: any) => {
        return (
          <div>
            <div>{today.question}</div>
            <div>{today.content}</div>
            {today.postImgUrls.map((img: any) => {
              return <img src={`${amazonUrl}${img.postImgUrl}`} />;
            })}

            {today.postVideoUrls.map((video: any) => {
              return (
                <video controls src={`${amazonUrl}${video.postVideoUrl}`} />
              );
            })}
          </div>
        );
      })}
      <Link to={`/todaylist/update/${todayId}`}>
        <button>수정하기</button>
      </Link>

      <button onClick={deleteToday}>삭제하기</button>
    </div>
  );
}
