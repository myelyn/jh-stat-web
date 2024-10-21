import http from '@/utils/http'
import type { BattlePlayerDetailType } from '@/types/home'

export const createBattleApi = (data: any) => {
  return http({
    method: "POST",
    url: "/battle",
    data
  })
}

export const deleteBattleApi = (id: string) => {
  return http({
    method: "DELETE",
    url: `/battle/${id}`
  })
}

export const secondRateApi = (data: any) => {
  return http<BattlePlayerDetailType>({
    method: "POST",
    url: "/battle/secondrate",
    data
  })
}