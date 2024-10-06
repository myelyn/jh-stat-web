<template>
  <scroll-view 
    class="index-list-wrapper" 
    refresher-enabled 
    scroll-y
    :refresher-triggered="isTriggered"
    @refresherrefresh="onRefresherrefresh" 
    @scrolltolower="onScrollToLower"
  >
    <ListItem v-for="item in battleList" :datas="item" :key="item.id"></ListItem>
    <up-loadmore v-if="showLoading" :status="loadStatus" />
  </scroll-view>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { onLoad } from '@dcloudio/uni-app';
  import { getBattleListApi } from '@/service/home'
  import type { BattleListType } from '@/types/home'
  import ListItem from './ListItem.vue';

  const battleList = ref<BattleListType[]>([])
  const isTriggered = ref(false)
  const loadStatus = ref('loadmore')
  const showLoading = ref(true)

  const page = reactive({
    pageNum: 1,
    pageSize: 10,
    totalPage: 1
  })

  const onRefresherrefresh = async () => {
    page.pageNum = 1
    battleList.value = []
    isTriggered.value = true
    showLoading.value = false
    await getBattleList()
    showLoading.value = true
    isTriggered.value = false
  }

  const onScrollToLower = () => {
    if (page.pageNum >= page.totalPage) {
      loadStatus.value = 'nomore'
      return
    }
    page.pageNum++
    getBattleList()
  }
  
  const getBattleList = async () => {
    loadStatus.value = 'loading'
    const res = await getBattleListApi(page.pageNum, page.pageSize)
    page.totalPage = res.result?.totalPage || 0
    if (res.result?.list) {
      battleList.value = [...battleList.value, ...res.result.list]
    }
    loadStatus.value = 'nomore'
  }

  onLoad (() => {
    getBattleList()
  })
</script>

<style lang="scss">
  .index-list-wrapper {
    width: 100%;
    height: 100%;
  }
</style>