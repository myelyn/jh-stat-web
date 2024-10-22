import http from '@/utils/http'

export const getAboutApi = () => {
  return http({
    method: "GET",
    url: "/about/info"
  })
}