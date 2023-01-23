export const validateNickname = (nickname: string): boolean => {
  const Regex = /^[a-zA-Z0-9가-힣]{2,8}$/i
  return Regex.test(nickname)
}

export const validateEmail = (email: string): boolean => {
  const Regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return Regex.test(email)
}

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
  // const imageLists = e.target.files
  // let imageUrlLists = [...fileNum]
  for (let i = 0; i < imageLists.length; i++) {
    const currentImageUrl = URL.createObjectURL(imageLists[i])
    imageUrlLists.push(currentImageUrl)
  }
  if (imageUrlLists.length > 3) {
    imageUrlLists = imageUrlLists.slice(0, 3)
  }
  //fileName(imageUrlLists)
}

export const handleFormData = (key: string, value: any) => {
  const formData = new FormData()
  formData.append(
    key,
    new Blob([JSON.stringify(value)], { type: 'application/json' }),
  )
}
