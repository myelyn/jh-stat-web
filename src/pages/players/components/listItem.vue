<template>
  <view class="player-list-item">
    <view class="row">
      <up-avatar
        :text="datas.name.substring(0,1)"
        fontSize="18"
        randomBgColor
      ></up-avatar>
      <view class="col1">
        <view class="player-name">{{ datas.name }}</view>
        <view class="sub-title">{{ datas.camp.toUpperCase() }}</view>
      </view>
      <view class="col2">
        <view class="sub-title">{{ label }}</view>
        <view class="value-data">{{ datas?.seasonData && (['k', 'a', 'cost', 'mscs'].includes(sortType) ? $formatnum(datas.seasonData[sortType]) : $formatnum(datas.seasonData[sortType], 0, true)) || '0' }}</view>
      </view>
    </view>
    <icon class="iconfont icon-jinru"></icon>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { playersOrderOptions } from '@/constant/options'
  import type { playerListItemType } from '@/types/player'
  import type { orderByType } from '@/types/player'
  const props = defineProps<{
    datas: playerListItemType,
    sortType: orderByType
  }>()

  const label = computed(() => {
    return playersOrderOptions.find(o => o.value === props.sortType)?.name || ''
  })

  
</script>

<style lang="scss" scoped>
  .player-list-item {
    position: relative;
    border: 1px solid #e6e6e6;
    background-image: linear-gradient(180deg, #f7fbfe, #f3f7ff, #e8f6ff);
    border-radius: 6px;
    margin-bottom: 20rpx;
    padding: 20rpx;
    .row {
      display: flex;
    }
    .col1 {
      flex: 0.4;
      padding: 0 30rpx;
    }

    .col2 {
      flex: 0.6;
    }

    .col1, .col2, .col3 {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .sub-title {
      font-size: 24rpx;
      color: #999;
    }
    .value-data {
      font-size: 26rpx;
      color: #000000;
      font-weight: bold;
    }
    .player-name {
      font-size: 28rpx;
      font-weight: bold;
      color: #333;
    }

    .icon-jinru {
      position: absolute;
      bottom: 40rpx;
      right: 10px;
      font-size: 26rpx;
      color: #999;
    }
  }
  
</style>