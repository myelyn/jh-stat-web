<template>
  <view class="battle-wrapper">
    <up-subsection :list="['战斗概览', '选手排名']" :current="activityIndex" @change="sectionChange"></up-subsection>
    <overview v-if="activityIndex===0" :datas="overviewDatas" class="overview-wrapper"></overview>
    <rank :datas="playerDatas" v-else class="rank-wrapper"></rank>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app';
  import overview from './components/overview.vue'
  import rank from './components/rank.vue';
  import { getBattleDetailApi, getBattlePlayerApi } from '@/service/home'

  // tab切换
  const activityIndex = ref(1)
  const sectionChange = (index:number) => {
    activityIndex.value = index
  }

  // 获取传入的战斗id
  const query = defineProps<{
    battleId: string
  }>()

  // 请求数据
  
  const overviewDatas = ref()
  const playerDatas = ref()
  onLoad(async () => {
    const resPlayer = await getBattlePlayerApi(query.battleId)
    playerDatas.value = resPlayer.result
    const resOverview = await getBattleDetailApi(query.battleId)
    overviewDatas.value = resOverview.result
    console.log(playerDatas.value)
  })

</script>

<style lang="scss">
  @import './styles/battle.scss';
</style>