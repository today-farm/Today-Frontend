import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const questions = [
  "오늘 먹은 음식은?",
  "오늘 기록하고 싶은 일은?",
  "오늘을 한 단어로 정리하자면?",
  "오늘 만난 사람은?",
  "오늘 나에게 하고 싶은 말이 있다면?",
];

const getRandomQuestion = (): string => {
  return questions[Math.floor(Math.random() * questions.length)];
};

function Today() {
  const [question1, setQuestion1] = useState<string>(getRandomQuestion());
  const [question2, setQuestion2] = useState<string>(getRandomQuestion());
  const [content1, setContent1] = useState<string>("");
  const [content2, setContent2] = useState<string>("");
  const [imgFile1, setImgFile1] = useState<File[]>([]);
  const [imgFile2, setImgFile2] = useState<File[]>([]);
  const [videoFile1, setVideoFile1] = useState<File[]>([]);
  const [videoFile2, setVideoFile2] = useState<File[]>([]);
  const [todayFeeling, setTodayFeeling] = useState<string>("");
  const [secret, setSecret] = useState<boolean>(true);
  const [cookies] = useCookies(["accessToken", "password"]);
  const navigate = useNavigate();

  const handleImgFile = (
    index: any,
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

  const handleToday = async () => {
    const formData = new FormData();
    for (let i = 0; i < imgFile1.length; i++) {
      formData.append("uploadImgs", imgFile1[i]);
    }
    for (let i = 0; i < imgFile2.length; i++) {
      formData.append("uploadImgs", imgFile2[i]);
    }
    for (let i = 0; i < videoFile1.length; i++) {
      formData.append("uploadVideos", videoFile1[i]);
    }
    for (let i = 0; i < videoFile2.length; i++) {
      formData.append("uploadVideos", videoFile2[i]);
    }

    const randomQuestion = getRandomQuestion();
    setQuestion1(randomQuestion);
    setQuestion2(randomQuestion);

    const TodayPost = {
      postQuestions: [
        {
          question: question1,
          content: content1,
          imgCount: imgFile1.length,
          videoCount: videoFile1.length,
        },
        {
          question: question2,
          content: content2,
          imgCount: imgFile2.length,
          videoCount: videoFile2.length,
        },
      ],
      todayFeeling: todayFeeling,
      canPublicAccess: secret,
    };

    await formData.append(
      "postSaveDto",
      new Blob([JSON.stringify(TodayPost)], { type: "application/json" })
    );

    return axios({
      method: "post",
      url: `/post/save`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    })
      .then((res) => {
        console.log("글 등록 성공!");
        navigate("/todaylist");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <label>비밀여부</label>
        <input
          type="checkbox"
          onChange={() => {
            setSecret((e) => !e);
          }}
        />
        <p>오늘의 기분을 입력하세요</p>
        <input
          type="text"
          placeholder="기분 입력하기"
          value={todayFeeling}
          onChange={(e) => setTodayFeeling(e.target.value)}
        />
      </div>
      <div>
        <p>{question1}</p>
        <input
          type="text"
          placeholder="내용 입력하기"
          value={content1}
          onChange={(e) => setContent1(e.target.value)}
        />
        <input
          type={"file"}
          onChange={(e) => {
            handleImgFile(1, e);
          }}
          multiple
        />
        <input
          type={"file"}
          onChange={(e) => {
            handleVideoFile(1, e);
          }}
          multiple
        />
      </div>
      <div>
        <p>{question2}</p>
        <input
          type="text"
          placeholder="내용 입력하기"
          value={content2}
          onChange={(e) => setContent2(e.target.value)}
        />
        <input
          type={"file"}
          onChange={(e) => {
            handleImgFile(2, e);
          }}
          multiple
        />
        <input
          type={"file"}
          onChange={(e) => {
            handleVideoFile(2, e);
          }}
          multiple
        />
      </div>

      <button onClick={handleToday}>등록하기</button>
    </>
  );
}

export default Today;
