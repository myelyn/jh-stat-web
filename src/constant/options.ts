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
  label: '综合评分',
  value: 'score'
},{
  label: '获得称号',
  value: 'tags'
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