import React, {
  useCallback,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  ActiveButton,
  Title,
  Error,
  Success,
} from '../../../style/CommonStyles';
import {
  ProfileComponentWrapper,
  ProfileWrapper,
  Icons,
  Line,
  NickNameInput,
  DoubleCheckButton,
  Header,
  Logo,
  ProfileImg,
} from './style';
import axios from 'axios';
import { validateNickname } from '../../util/usefulFunctions';
import { User } from '../../Interface';

interface Iprops {
  info: User;
  setInfo: Dispatch<SetStateAction<User>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  handleSignup: () => void;
}

function Profile(props: Iprops) {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [previewImg, setPreviewImg] = useState<string>();
  const imageInput = useRef<HTMLInputElement>(null);
  // 버튼클릭시 input태그에 클릭이벤트를 걸어준다.
  const onCickImageUpload = () => {
    imageInput.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!validateNickname(e.target.value)) {
      setError('2자 이상 8자 이하로 숫자, 한글, 영어만 가능해요!');
    } else {
      setError('');
      props.setInfo((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleDoubleCheck = async () => {
    const formData = new FormData();

    await formData.append('nickname', props.info.nickname);
    return axios({
      method: 'post',
      url: `/sign-up/nickname-duplicate-check`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.result.duplicateCheck === true) {
          setError('이미 사용 중인 닉네임이에요! 다른 닉네임을 사용해 주세요.');
          setSuccess('');
        } else {
          setSuccess('사용 가능한 닉네임이에요!');
          setError('');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    if (e.target.files[0]) {
      props.setFile(e.target.files[0]);
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (e) => {
      const result = e?.target?.result as string;
      setPreviewImg(result);
    };
  }, []);

  const handleRemoveImg = () => {
    setPreviewImg('');
    props.setFile(null);
  };

  return (
    <ProfileComponentWrapper>
      <Header>
        <Logo>로고</Logo>
        <Title>안녕하세요!</Title>
        <Title>닉네임과 프로필 사진(선택)을 등록해주세요.</Title>
      </Header>
      <ProfileWrapper>
        <ProfileImg
          src={previewImg ? previewImg : 'img/icon_profile.png'}
          alt='프로필 이미지'
        />
        <Icons>
          <input
            type='file'
            onChange={handleFile}
            accept='image/*'
            style={{ display: 'none' }}
            ref={imageInput}
          />
          <img
            alt='profile'
            src='img/icon_photo.png'
            onClick={onCickImageUpload}
          />
          <Line>|</Line>
          <img
            alt='profile'
            src='img/icon_delete.png'
            onClick={handleRemoveImg}
          />
        </Icons>
        <NickNameInput
          name='nickname'
          placeholder='사용하실 닉네임을 입력해주세요.'
          onChange={handleChange}
        ></NickNameInput>
        <Error>{error}</Error>
        <Success>{success}</Success>
        <DoubleCheckButton onClick={handleDoubleCheck}>
          닉네임 중복 확인
        </DoubleCheckButton>
      </ProfileWrapper>
      <ActiveButton onClick={props.handleSignup}>
        하루농장 시작하기
      </ActiveButton>
    </ProfileComponentWrapper>
  );
}

export default Profile;
