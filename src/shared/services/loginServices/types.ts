export type TLoginData =  {login: string, password: string}

export type TLoginServices = {
  login: (data: TLoginData) => Promise<{ refresh_token: string, token: string }>
}