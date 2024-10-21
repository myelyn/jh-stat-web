import http from '@/utils/http'
import type { playerListItemType } from '@/types/player'

export const getPlayerListApi = () => {
  return http<playerListItemType[]>({
    method: "GET",
    url: "/player",
  })
}