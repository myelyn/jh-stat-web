<template>
  <view class="header-wrapper" :style="{backgroundImage: `url(${imgBase}/header_bg.png)`}">
    <image :src="`${imgBase}/header_bg.png`" class="bg"></image>
    <view class="header-cnt" :style="{'padding-top': safeAreaInsets?.top + 'px'}">
      <view class="title-text fs-16 fw-bold">
        <text>S2赛季战斗统计</text>
      </view>
      <view class="camp-wrap">
        <view class="ctz">
          <image :src="`${imgBase}/camp_ctz.png`" class="img"/>
          <text>CTZ战队</text>
        </view>
        <view class="vs">
          <p class="fs-20 fw-bold">VS</p>
          <p class="fs-10">进行中</p>
        </view>
        <view class="mjs">
          <image :src="`${imgBase}/camp_mjs.png`" class="img"/>
          <text class="fs-12">MJS战队</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  const imgBase = ref(`${import.meta.env.VITE_IMAGE_BASE}/`)
  const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style lang="scss" scoped>
  .header-wrapper {
    width: 100%;
    background-size: cover;
    color: #fff;
    .bg {
      display: none;
    }
    .header-cnt {
      padding-bottom: 20px;
      background-color: rgba(0, 0, 0, .2);
      .title-text {
        text-align: center;
      }
      .camp-wrap {
        width: 100%;
        display: inline-flex;
        justify-content: space-around;
        align-items: center;
        .vs {
          width: 50px;
          text-align: center;
          .fs-10 {
            color: #ececec;
          }
        }
        .ctz, .mjs {
          display: flex;
          flex-direction: column;
          font-size: 12px;
          >.img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-bottom: 6px;
          }
        }
      }
    }
    
  }
</style>