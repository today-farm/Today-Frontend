export interface User {
  email: string
  password?: string
  nickname: string
  img?: string
  passwordCheck?: string
}

export interface errorData {
  emailError?: string
  passwordError: string
  passwordCheckError: string
}

export interface Icrops {
  // data: {
  cropNumber: number
  cropStatus: string
  // }
}

export interface Icontent {
  content1: string
  content2: string
  content3: string
}

export interface Iquestion {
  question1: string
  question2: string
  question3: string
}
