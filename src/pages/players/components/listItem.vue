<template>
  <view class="player-list-item">
    <view class="row">
      <up-avatar
        :text="datas.name.substring(0,1)"
        fontSize="18"
        randomBgColor
      ></up-avatar>
      <view class="col1">
        <view class="sub-title">{{ datas.camp.toUpperCase() }}</view>
        <view class="data">{{ datas.name }}</view>
      </view>
      <view class="col2">
        <view class="sub-title">赛季杀人: 100</view>
        <view class="sub-title">赛季出勤: 20场</view>
      </view>
      <view class="col3">
        <view class="sub-title"></view>
        <view class="sub-title"></view>
      </view>
    </view>
    <icon class="iconfont icon-jinru"></icon>
  </view>
</template>

<script setup lang="ts">
  import type { playerListItemType } from '@/types/player'
  defineProps<{
    datas: playerListItemType
  }>()
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
      flex: 0.3;
      padding: 0 30rpx;
    }

    .col2 {
      flex: 0.35;
    }

    .col3 {
      flex: 0.35;
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
    .data {
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