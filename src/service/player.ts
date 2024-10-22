import http from '@/utils/http'
import type { playerListItemType } from '@/types/player'

export const getPlayerListApi = () => {
  return http<playerListItemType[]>({
    method: "GET",
    url: "/player",
  })
}

export const addPlayerApi = (data: object) => {
  return http({
    method: "POST",
    url: "/player",
    data
  })
}

export const updatePlayerApi = (data: object) => {
  return http({
    method: "POST",
    url: "/player/update",
    data
  })
}