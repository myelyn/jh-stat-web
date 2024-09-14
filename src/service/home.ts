import http from '@/utils/http'
import type { BattleListType, BattleListApiResult, BattlePlayerDetailType } from '@/types/home'

export const getBattleListApi = (pageNum: number, pageSize: number) => {
  return http<BattleListApiResult>({
    method: "GET",
    url: "/battle/list",
    data: {
      pageNum,
      pageSize
    }
  })
}

export const getBattleDetailApi = (id: string) => {
  return http<BattleListType>({
    method: "GET",
    url: `/battle/${id}`
  })
}

export const getBattlePlayerApi = (id: string) => {
  return http<BattlePlayerDetailType[]>({
    method: "GET",
    url: `/battleplayer/${id}`
  })
}