import http from '@/utils/http'

export const loginApi = (data: any) => {
  return http<any>({
    method: "POST",
    url: "/users/login",
    data
  })
}

export const registerApi = (data: any) => {
  return http<any>({
    method: "POST",
    url: "/users/register",
    data
  })
}

export const userInfoApi = (data: any) => {
  return http<any>({
    method: "POST",
    url: "/users/userInfo",
    data
  })
}