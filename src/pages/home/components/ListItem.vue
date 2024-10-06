<template>
  <navigator :url="`/pages/battle/battle?battleId=${datas.id}`">
    <view class="battle-list-item">
      <view class="time">{{ datas.startTime }} - {{ datas.endTime }}</view>
      <view class="score-box">
        <view class=lt>
          <view class="name-ctz">
            <text>CTZ</text>
            <icon v-if="datas.ctz.k > datas.mjs.k" class="iconfont icon-wangguan1"></icon>
          </view>
          <view class="score">{{ datas.ctz?.k || '-' }}</view>
        </view>
        <view class="md"><i class="iconfont icon-duizhan-jian-tianchong"></i></view>
        <view class="rt">
          <view class="score">{{ datas.mjs?.k || '-' }}</view>
          <view class="name-mjs">
            <text>MJS</text>
            <icon v-if="datas.mjs.k > datas.ctz.k" class="iconfont icon-wangguan1"></icon>
          </view>
        </view>
      </view>
      <icon class="iconfont icon-jinru"></icon>
    </view>
  </navigator>
</template>

<script setup lang="ts">
  import type { BattleListType } from '@/types/home'
  const props = defineProps<{
    datas: BattleListType
  }>()
</script>

<style lang="scss" scoped>
  .battle-list-item {
    position: relative;
    border: 1px solid #e6e6e6;
    background-image: linear-gradient(180deg, #f7fbfe, #f3f7ff, #e8f6ff);
    border-radius: 6px;
    margin-bottom: 10px;
    .time {
      padding: 6px 0;
      text-align: center;
      line-height: 1;
      font-size: 26rpx;
      color: #c2c2c2;
    }
    .score-box {
      display: flex;
      justify-content: space-between;
      .lt, .rt {
        display: flex;
        width: 50%;
        flex: 1;
        text-align: center;
        height: 60rpx;
        .score {
          width: 120rpx;
          padding: 12rpx 0;
          line-height: 1;
          font-weight: bold;
          font-size: 32rpx;
          color: #333;
        }
        .name-ctz, .name-mjs {
          position: relative;
          width: 56rpx;
          height: 28rpx;
          line-height: 28rpx;
          margin-top: 16rpx;
          border-radius: 8rpx;
          text-align: center;
          font-size: 20rpx;
          color: #fff;
          .icon-wangguan1 {
            position: absolute;
            font-size: 32rpx;
            width: 32rpx;
            line-height: 32rpx;
            height: 32rpx;
            top: -20rpx;
            color: #ffde21;
            &:before {
              position: absolute;
              top: 0;
              left: 0;
            }
          }
        }
        .name-ctz {
          background-image: linear-gradient(90deg, #d984fd, #f0b5f8);
          .icon-wangguan1 {
            left: -20rpx;
          }
        }
        .name-mjs {
          background-image: linear-gradient(90deg, #aaf9f9, #7dfcfc);
          .icon-wangguan1 {
            right: -20rpx;
            transform: rotate(90deg);
          }
        }
      }
      .lt {
        justify-content: flex-end;
      }
      .rt {
        justify-content: flex-start;
      }
      .md {
        width: 60rpxpx;
        padding: 10rpx 0;
        line-height: 1;
        text-align: center;
        color: #999;
        .iconfont {
          font-size: 38rpx;
        }
      }
    }
    .icon-jinru {
      position: absolute;
      bottom: 10px;
      right: 10px;
      font-size: 26rpx;
      color: #999;
    }
  }
</style>