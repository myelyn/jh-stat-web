export type playerListItemType = {
  beforeRoles: string[],
  camp: string,
  id: number,
  name: string,
  roles: string[],
  a?: number,
  attendanceRate?: number,
  cost?: number,
  k?: number,
  mscs?: number,
  sameSecondRate?: number,
  seasonData?: {
    a: number,
    attendanceRate: number,
    cost: number,
    k: number,
    mscs: number,
    sameSecondRate: number
  }
}
export type orderByType = 'k' | 'a' | 'attendanceRate' | 'cost' | 'mscs' | 'sameSecondRate'