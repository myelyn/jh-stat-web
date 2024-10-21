import type { OptionsItemType } from '@/types/home'
export const showCampOptions: OptionsItemType[] = [{
  label: '全部选手',
  value: '全部选手',
},{
  label: '只看CTZ',
  value: '只看CTZ',
},{
  label: '只看MJS',
  value: '只看MJS',
}]

export const dimensionOptions: OptionsItemType[] = [{
  label: '获得称号',
  value: 'tags'
},{
  label: '综合评分',
  value: 'score'
},{
  label: 'KDA',
  value: 'kda'
},{
  label: '每死承伤',
  value: 'mscs'
},{
  label: '杀人数',
  value: 'k'
},{
  label: '阵亡数',
  value: 'd'
},{
  label: '助攻数',
  value: 'a'
},{
  label: '承伤数',
  value: 's'
},{
  label: '连杀',
  value: 'multikill'
},{
  label: '招杀数',
  value: 'k_zs'
},{
  label: '毒杀数',
  value: 'k_ds'
},{
  label: '法器杀人',
  value: 'k_fq'
},{
  label: '小孩杀人',
  value: 'k_xh'
},{
  label: '使用解除',
  value: 'a_jc'
},{
  label: '使用陷害',
  value: 'a_xh'
},{
  label: '使用吃豆',
  value: 'a_cd'
},{
  label: '使用死神',
  value: 'a_ss'
},{
  label: '使用霹雳',
  value: 'a_pl'
},{
  label: '被霹雳',
  value: 's_pl'
},{
  label: '花费金币',
  value: 'cost'
}]


export const playerDetailList: OptionsItemType[] = [{
  label: '总杀人',
  value: 'k'
},{
  label: '最高连杀',
  value: 'multikill'
},{
  label: '招杀',
  value: 'k_zs'
},{
  label: '毒杀',
  value: 'k_ds'
},{
  label: '法器杀人',
  value: 'k_fq'
},{
  label: '小孩杀人',
  value: 'k_xh'
},{
  label: '总阵亡',
  value: 'd'
},{
  label: '被招杀',
  value: 'd_zs'
},{
  label: '被毒杀',
  value: 'd_ds'
},{
  label: '被小孩杀',
  value: 'd_xh'
},{
  label: '被法器杀',
  value: 'd_fq'
},{
  label: '自杀',
  value: 'suicide'
},{
  label: '总助攻',
  value: 'a'
},{
  label: '用解除',
  value: 'a_jc'
},{
  label: '用吃豆',
  value: 'a_cd'
},{
  label: '用陷害',
  value: 'a_xh'
},{
  label: '用吸血',
  value: 'a_xx'
},{
  label: '用化功',
  value: 'a_hg'
},{
  label: '用死神',
  value: 'a_ss'
},{
  label: '用霹雳',
  value: 'a_pl'
},{
  label: '用法器',
  value: 'a_fq'
},{
  label: '总承伤',
  value: 's'
},{
  label: '被解除',
  value: 's_jc'
},{
  label: '被吃豆',
  value: 's_cd'
},{
  label: '被陷害',
  value: 's_xh'
},{
  label: '被吸血',
  value: 's_xx'
},{
  label: '被化功',
  value: 's_hg'
},{
  label: '被下死神',
  value: 's_ss'
},{
  label: '被霹雳',
  value: 's_pl'
},{
  label: '被用法器',
  value: 's_fq'
},{
  label: '综合评分',
  value: 'score'
},{
  label: 'KDA',
  value: 'kda'
},{
  label: '每死承伤',
  value: 'mscs'
},{
  label: '花费金币',
  value: 'cost'
},{
  label: '消耗对方金币',
  value: 'consume'
}]


export const battleOverviewTableHeaders: OptionsItemType[] = [{
  label: '参战人数',
  value: 'n'
},{
  label: '总杀人',
  value: 'k'
},{
  label: '总招杀',
  value: 'k_zs'
},{
  label: '总毒杀',
  value: 'k_ds'
},{
  label: '总法器杀人',
  value: 'k_fq'
},{
  label: '总小孩杀人',
  value: 'k_xh'
},{
  label: '总助攻',
  value: 'a'
},{
  label: '总解除',
  value: 'a_jc'
},{
  label: '总陷害',
  value: 'a_xh'
},{
  label: '总法器失败',
  value: 'a_fq'
},{
  label: '总死神',
  value: 'a_ss'
},{
  label: '总霹雳',
  value: 'a_pl'
},{
  label: '总阵亡',
  value: 'd'
},{
  label: '平均评分',
  value: 'avgscore'
},{
  label: '平均每死承伤',
  value: 'avgmscs'
},{
  label: '花费金币估算',
  value: 'cost'
}]

export const playerCampOptions: OptionsItemType[] = [{
  label: '全部选手',
  value: 'all',
},{
  label: '只看CTZ',
  value: 'ctz',
},{
  label: '只看MJS',
  value: 'mjs',
}]

export const playersOrderOptions: OptionsItemType[] = [
  {
    label: '总杀人数优先',
    name: '赛季总杀人',
    value: 'k'
  },{
    label: '总助攻数优先',
    name: '赛季总助攻',
    value: 'a'
  },{
    label: '出勤率优先',
    value: 'attendanceRate',
    name: '赛季出勤率',
  },{
    label: '同秒率优先',
    value: 'sameSecondRate',
    name: '赛季平均同秒率',
  },{
    label: '每死承伤优先',
    name: '赛季平均每死承伤',
    value: 'mscs'
  },{
    label: '总花费优先',
    name: '赛季总花费（估算）',
    value: 'cost'
  }
]