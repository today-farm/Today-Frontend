export const validateNickname = (nickname: string): boolean => {
  const Regex = /^[a-zA-Z0-9가-힣]{2,8}$/i
  return Regex.test(nickname)
}

export const validateEmail = (email: string): boolean => {
  const Regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return Regex.test(email)
}

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,8}$/i
export const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^+\-=])(?=\S+$).{8,}$/

export const validatePassword = (password: string): boolean => {
  const Regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^+\-=])(?=\S+$).{8,}$/
  return Regex.test(password)
}

const questions = [
  '오늘 먹은 음식은?',
  '오늘 기록하고 싶은 일은?',
  '오늘을 한 단어로 정리하자면?',
  '오늘 만난 사람은?',
  '오늘 나에게 하고 싶은 말이 있다면?',
]

export const getRandomQuestion = (): string => {
  return questions[Math.floor(Math.random() * questions.length)]
}

export const handlePreviewFiles = (
  imageLists: FileList,
  imageUrlLists: string[],
) => {
  for (let i = 0; i < imageLists.length; i++) {
    const currentImageUrl = URL.createObjectURL(imageLists[i])
    imageUrlLists.push(currentImageUrl)
  }
  if (imageUrlLists.length > 3) {
    imageUrlLists = imageUrlLists.slice(0, 3)
  }
}

export const handleFormData = (key: string, value: any) => {
  const formData = new FormData()
  formData.append(
    key,
    new Blob([JSON.stringify(value)], { type: 'application/json' }),
  )
}

export const matchFeeling = (feeling: string, size: number) => {
  if (feeling === 'happy') {
    return size === 0 ? '/img/feeling/happy.png' : '/img/feeling/happy_big.png'
  } else if (feeling === 'angry') {
    return size === 0 ? '/img/feeling/angry.png' : '/img/feeling/angry_big.png'
  } else if (feeling === 'cold') {
    return size === 0 ? '/img/feeling/cold.png' : '/img/feeling/cold_big.png'
  } else if (feeling === 'excited') {
    return size === 0
      ? '/img/feeling/excited.png'
      : '/img/feeling/excited_big.png'
  } else if (feeling === 'exhausted') {
    return size === 0
      ? '/img/feeling/exhausted.png'
      : '/img/feeling/exhausted_big.png'
  } else if (feeling === 'heart') {
    return size === 0 ? '/img/feeling/heart.png' : '/img/feeling/heart_big.png'
  } else if (feeling === 'proud') {
    return size === 0 ? '/img/feeling/proud.png' : '/img/feeling/proud_big.png'
  } else if (feeling === 'sad') {
    return size === 0 ? '/img/feeling/sad.png' : '/img/feeling/sad_big.png'
  } else if (feeling === 'sparkling') {
    return size === 0
      ? '/img/feeling/sparkling.png'
      : '/img/feeling/sparkling_big.png'
  } else if (feeling === 'surprised') {
    return size === 0
      ? '/img/feeling/surprised.png'
      : '/img/feeling/surprised_big.png'
  }
}
