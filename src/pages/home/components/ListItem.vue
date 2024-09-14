<template>
  <navigator :url="`/pages/battle/battle?battleId=${datas.id}`">
    <view class="battle-list-item">
      <view class="time fs-12">{{ datas.startTime }} - {{ datas.endTime }}</view>
      <view class="score-box">
        <view class=lt>
          <view class="name-ctz fs-10">
            <text>CTZ</text>
            <icon v-if="datas.ctz.k > datas.mjs.k" class="iconfont icon-wangguan1"></icon>
          </view>
          <view class="score fs-14">{{ datas.ctz?.k || '-' }}</view>
        </view>
        <view class="md fs-20"><i class="iconfont icon-duizhan-jian-tianchong"></i></view>
        <view class="rt">
          <view class="score fs-14">{{ datas.mjs?.k || '-' }}</view>
          <view class="name-mjs fs-10">
            <text>MJS</text>
            <icon v-if="datas.mjs.k > datas.ctz.k" class="iconfont icon-wangguan1"></icon>
          </view>
        </view>
      </view>
      <icon class="iconfont icon-jinru fs-12"></icon>
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
        height: 30px;
        .score {
          width: 60px;
          padding: 7px 0;
          line-height: 1;
          font-weight: bold;
          color: #333;
        }
        .name-ctz, .name-mjs {
          position: relative;
          width: 30px;
          height: 14px;
          line-height: 14px;
          margin-top: 8px;
          border-radius: 4px;
          text-align: center;
          color: #fff;
          .icon-wangguan1 {
            position: absolute;
            color: #ffde21;
          }
        }
        .name-ctz {
          background-image: linear-gradient(90deg, #d984fd, #f0b5f8);
          .icon-wangguan1 {
            top: -10px;
            left: -10px;
          }
        }
        .name-mjs {
          background-image: linear-gradient(90deg, #aaf9f9, #7dfcfc);
          .icon-wangguan1 {
            top: -10px;
            right: -10px;
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
        width: 20px;
        padding: 5px 0;
        line-height: 1;
        text-align: center;
        color: #999;
      }
    }
    .icon-jinru {
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: #999;
    }
  }
</style>