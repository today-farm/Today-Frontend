import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

function TodayUpdate() {
  const [content1, setContent1] = useState<string>("");
  const [content2, setContent2] = useState<string>("");
  const [questionId1, setQuestionId1] = useState<string>("");
  const [questionId2, setQuestionId2] = useState<string>("");
  const [postQuestions, setPostQuestions] = useState<any[]>([]);
  const [imgId, setImgId] = useState<number[]>([]);
  const [videoId, setVideoId] = useState<number[]>([]);
  const [creationDay, setCreationDay] = useState<string>("");
  const [todayFeeling, setTodayFeeling] = useState<string>("");
  const [imgFile1, setImgFile1] = useState<File[]>([]);
  const [imgFile2, setImgFile2] = useState<File[]>([]);
  const [videoFile1, setVideoFile1] = useState<File[]>([]);
  const [videoFile2, setVideoFile2] = useState<File[]>([]);
  const [canPublicAccess, setCanPublicAccess] = useState<boolean>();
  const [secret, setSecret] = useState<boolean>(true);

  const [cookies] = useCookies(["accessToken", "password"]);
  const navigate = useNavigate();
  const params = useParams();
  const todayId = params.id;
  const amazonUrl = `https://todayproject-bucket.s3.ap-northeast-2.amazonaws.com/`;

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
        const todayData = res.data.result;
        const todayPostQuestios = res.data.result.postQuestions;
        setPostQuestions(todayPostQuestios);
        setCreationDay(todayData.creationDay);
        setTodayFeeling(todayData.todayFeeling);
        setQuestionId1(todayPostQuestios[0].questionId);
        setQuestionId2(todayPostQuestios[1].questionId);
        setCanPublicAccess(todayData.canPublicAccess);
        setContent1(todayPostQuestios[0].content);
        setContent2(todayPostQuestios[1].content);
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

  const handleImgFile = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files === null) return;
    index === 1
      ? setImgFile1([...imgFile1, ...e.target.files])
      : setImgFile2([...imgFile2, ...e.target.files]);
  };

  const handleVideoFile = (
    index: any,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files === null) return;
    index === 1
      ? setVideoFile1([...videoFile1, ...e.target.files])
      : setVideoFile2([...videoFile2, ...e.target.files]);
  };

  const handleTodayUpdate = async () => {
    const formData = new FormData();
    for (let i = 0; i < imgFile1.length; i++) {
      formData.append("addImgs", imgFile1[i]);
    }
    for (let i = 0; i < imgFile2.length; i++) {
      formData.append("addImgs", imgFile2[i]);
    }
    for (let i = 0; i < videoFile1.length; i++) {
      formData.append("addVideos", videoFile1[i]);
    }
    for (let i = 0; i < videoFile2.length; i++) {
      formData.append("addVideos", videoFile2[i]);
    }

    const TodayPost = {
      postQuestions: [
        {
          questionId: questionId1,
          content: content1,
          deleteImgUrlId: imgId,
          deleteVideoUrlId: videoId,
          addImgCount: imgFile1.length,
          addVideoCount: videoFile1.length,
        },
        {
          questionId: questionId2,
          content: content2,
          deleteImgUrlId: imgId,
          deleteVideoUrlId: videoId,
          addImgCount: imgFile2.length,
          addVideoCount: videoFile2.length,
        },
      ],
      todayFeeling: todayFeeling,
      canPublicAccess: secret,
    };

    await formData.append(
      "postUpdateDto",
      new Blob([JSON.stringify(TodayPost)], { type: "application/json" })
    );

    return axios({
      method: "PATCH",
      url: `/post/update/${todayId}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    })
      .then((res) => {
        console.log("글 수정 성공!");
        navigate(`/todaylist/${todayId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <label>비밀여부 재설정</label>
        <input
          type="checkbox"
          onChange={() => {
            setSecret((e) => !e);
          }}
        />
      </div>
      <div>날짜 : {creationDay}일</div>
      <div>나의 기분</div>
      <input
        value={todayFeeling}
        onChange={(e) => setTodayFeeling(e.target.value)}
      />
      <div>
        {postQuestions.map((today: any, index: number) => {
          return (
            <div>
              <div>{today.question}</div>
              <input
                type="text"
                placeholder="내용 입력하기"
                value={index === 0 ? content1 : content2}
                onChange={(e) => {
                  index === 0
                    ? setContent1(e.target.value)
                    : setContent2(e.target.value);
                }}
              />
              {today.postImgUrls.map((img: any) => {
                return (
                  <div>
                    <button
                      onClick={() => {
                        setImgId((imgId) => [...imgId, img.postImgUrlId]);
                      }}
                    >
                      X
                    </button>
                    <img src={`${amazonUrl}${img.postImgUrl}`} />
                  </div>
                );
              })}
              <input
                type={"file"}
                onChange={(e) => {
                  index === 0 ? handleImgFile(1, e) : handleImgFile(2, e);
                }}
                multiple
                accept=".gif, .jpg, .png"
              />
              {today.postVideoUrls.map((video: any) => {
                return (
                  <div>
                    <button
                      onClick={() => {
                        setVideoId((videoId) => [
                          ...videoId,
                          video.postVideoUrlId,
                        ]);
                      }}
                    >
                      X
                    </button>
                    <video controls src={`${amazonUrl}${video.postVideoUrl}`} />
                  </div>
                );
              })}
              <input
                type={"file"}
                onChange={(e) => {
                  index === 0 ? handleVideoFile(1, e) : handleVideoFile(2, e);
                }}
                multiple
                accept=".mp4"
              />
            </div>
          );
        })}
      </div>
      <button onClick={handleTodayUpdate}>수정하기</button>
    </>
  );
}

export default TodayUpdate;
