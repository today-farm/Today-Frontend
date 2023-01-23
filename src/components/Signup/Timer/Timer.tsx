import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { TimerWrapper } from './style';

interface Iprops {
  setStartTimer: Dispatch<SetStateAction<boolean>>;
  setEmailAuthError: Dispatch<SetStateAction<string>>;
}

const Timer = (props: Iprops) => {
  const [seconds, setSeconds] = useState(300);
  const HOUR = 60 * 60;
  const mm = Math.floor((seconds % HOUR) / 60);
  const ss = seconds % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 0) {
        clearInterval(interval);
        props.setStartTimer(false);
        props.setEmailAuthError(
          '제한 시간이 초과되었어요! 다시 요청 버튼을 눌러 주세요.'
        );
      } else setSeconds(seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  });

  const formatTime = (time: number) =>
    time >= 10 ? time : '0'.concat(time.toString());

  return (
    <TimerWrapper>
      {formatTime(mm)}:{formatTime(ss)}
    </TimerWrapper>
  );
};

export default Timer;
