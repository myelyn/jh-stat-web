<template>
  <scroll-view 
    class="player-list-wrapper" 
    refresher-enabled 
    scroll-y
    :refresher-triggered="isTriggered"
    @refresherrefresh="onRefresherrefresh" 
  >
    <ListItem v-for="item in playerList" :datas="item" :key="item.id"></ListItem>
  </scroll-view>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { onLoad } from '@dcloudio/uni-app';
  import { getPlayerListApi } from '@/service/player'
  import type { playerListItemType } from '@/types/player'
  import ListItem from './listItem.vue';

  const playerList = ref<playerInfoType[]>([])
  const isTriggered = ref(false)

  const onRefresherrefresh = async () => {
    isTriggered.value = true
    await getPlayerList()
    isTriggered.value = false
  }
  
  const getPlayerList = async () => {
    const res = await getPlayerListApi()
    playerList.value = res.result || []
  }

  onLoad (() => {
    getPlayerList()
  })
</script>

<style lang="scss">
  .player-list-wrapper {
    width: 100%;
    height: 100%;
  }
</style>