export interface User {
  email: string;
  password: string;
  nickname: string;
}

export interface errorData {
  emailError: string;
  passwordError: string;
  passwordCheckError: string;
}
