<template>
  <scroll-view class="index-list-wrapper" refresher-enabled scroll-y :refresher-triggered="isTriggered"
    @refresherrefresh="onRefresherrefresh" @scrolltolower="onScrollToLower">
    <ListItem v-for="item in battleList" :datas="item" :key="item.id"></ListItem>
    <up-loadmore v-if="showLoading && !isTriggered" :status="loadStatus" />

  </scroll-view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onShow } from '@dcloudio/uni-app';
import { getBattleListApi } from '@/service/home'
import type { BattleListType } from '@/types/home'
import ListItem from './ListItem.vue';

const battleList = ref<BattleListType[]>([])
const isTriggered = ref(false)
const showLoading = ref(true)
const loadStatus = ref('loadmore')

const page = reactive({
  pageNum: 1,
  pageSize: 10,
  totalPage: 1
})

const onRefresherrefresh = async () => {
  page.pageNum = 1
  battleList.value = []
  isTriggered.value = true
  try {
    await getBattleList()
    isTriggered.value = false
  } catch (e) {
    isTriggered.value = false
  }

}

const onScrollToLower = async () => {
  showLoading.value = true
  if (page.pageNum >= page.totalPage) {
    loadStatus.value = 'nomore'
    return
  }
  page.pageNum++
  getBattleList()
}

const getBattleList = async () => {
  try {
    loadStatus.value = 'loading'
    const res = await getBattleListApi(page.pageNum, page.pageSize)
    page.totalPage = res.result?.totalPage || 0
    showLoading.value = false
    if (res.result?.list) {
      battleList.value = [...battleList.value, ...res.result.list]
    }
  } catch (e) {
    showLoading.value = false
  }
}

onShow(() => {
  battleList.value = []
  getBattleList()
})
</script>

<style lang="scss">
.index-list-wrapper {
  width: 100%;
  height: 100%;
}
</style>