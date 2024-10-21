export type BattleListType = {
  id: number,
  ctz: any,
  mjs: any,
  startTime: string,
  endTime: string
}

export type BattleListApiResult = {
  pageNum: number,
  pageSize: number,
  total: number,
  totalPage: number,
  list: BattleListType[]
}

export type OptionsItemType = {
  label: string,
  value: string,
  name?: string
}

export type playerInfoType = {
  beforeRoles: string[],
  camp: string,
  id: number,
  name: string,
  roles: string[]
}

export type BattlePlayerDetailType = {
  [key: string]: any,
  battleId: number,
  a: number,
  a_cd: number,
  a_fq: number,
  a_hg: number,
  a_jc: number,
  a_pl: number,
  a_ss: number,
  a_xh: number,
  a_xx: number,
  battleInfo:  {[key: string]: any},
  consume: number,
  cost: number,
  d: number,
  d_ds: number,
  d_fq: number,
  d_xh: number,
  d_zs: number,
  dyo: number,
  fwg: number,
  fx: number,
  id: number,
  k: number,
  k_ds: number,
  k_fq: number,
  k_xh: number,
  k_zs: number,
  kda: number,
  killByNames: {[key: string]: number},
  killNames: {[key: string]: number},
  mscs: number,
  multikill: number,
  operationByNames: {[key: string]: number},
  operationNames: {[key: string]: number},
  playerId: number,
  playerInfo: playerInfoType,
  s: number,
  s_cd: number,
  s_fq: number,
  s_hg: number,
  s_jc: number,
  s_pl: number,
  s_ss: number,
  s_xh: number,
  s_xx: number,
  score: number,
  sd: number,
  suiside: number,
  tags: string[],
  wdo: number
}

export type battleOverviewItemType = {
  a: number,
  a_fq: number,
  a_jc: number,
  a_pl: number,
  a_ss: number,
  a_xh: number,
  a_xx: number,
  avgmscs: number,
  avgscore: number,
  cost: number,
  d: number,
  fx: number,
  k: number,
  k_ds: number,
  k_fq: number,
  k_xh: number,
  k_zs: number,
  mscs: number,
  n: number,
  s: number,
  score: number,
  sd: number,
  [key: string]: number
} 
export type battleOverviewType = {
  ctz: battleOverviewItemType,
  mjs: battleOverviewItemType,
  id: number,
  startTime: string,
  endTime: string
}