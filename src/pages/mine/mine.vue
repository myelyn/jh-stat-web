<template>
  <view class="mine-wrapper">
    <view class="mine-header">
      <view class="header-cnt" :style="{'padding-top': safeAreaInsets?.top + 'px'}">
        <view class="avatar-wrapper">
          <image class="avatar-img" :src="`${imgBase}/${userInfoStore.userInfo ? 'avatar_default_login.png' : 'avatar_default_logout.png'}`"/>
        </view>
        <view v-if="userInfoStore.userInfo" class="user-info-wrapper">
          <text class="fs-16">{{ userInfoStore.userInfo.username }}</text><br/>
          <text class="fs-14">普通成员</text>
        </view>
        <!-- @tap="userInfoStore.setUserInfo({username: 'test11'})" -->
        <view v-else class="user-info-wrapper">
          <navigator :url="`/pages/login/login`">
            <text class="fs-16">未登录</text><br/>
            <text class="fs-14">点击登录</text>
          </navigator>
        </view>
      </view>
    </view>
    <view class="mine-menu">
      <template v-if="userInfoStore.userInfo">
        <view class="menu-item">
          <icon class="iconfont l-icon icon-shezhi"></icon>
          <text>账号管理</text>
          <icon class="iconfont icon-jinru fs-12"></icon>
        </view>
        <view class="menu-item">
          <icon class="iconfont l-icon icon-shenfenrenzheng"></icon>
          <text>创建战斗</text>
          <icon class="iconfont icon-jinru fs-12"></icon>
        </view>
      </template>
      <view class="menu-item">
        <icon class="iconfont l-icon icon-guanyuwomen"></icon>
        <text>关于</text>
        <icon class="iconfont icon-jinru fs-12"></icon>
      </view>
      <button v-if="userInfoStore.userInfo" @tap="userInfoStore.clearUserInfo()" class="button-exit" type="primary">退出登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useUserInfoStore } from '@/stores/userInfo'

  const { safeAreaInsets } = uni.getSystemInfoSync()
  const imgBase = ref(`${import.meta.env.VITE_IMAGE_BASE}/`)

  const userInfoStore = useUserInfoStore()

</script>

<style lang="scss">
  .mine-wrapper {
    height: calc(100vh);
    .mine-header {
      width: 100%;
      padding: 30px 20px;
      background: $primary-color;
      color: #fff;
      .header-cnt {
        width: 100%;
        display: flex;
        align-items: center;
        .avatar-wrapper {
          width: 75px;
          height: 75px;
          .avatar-img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .user-info-wrapper {
          flex: 1;
          padding-left: 20px;
          line-height: 30px;
        }
      }
    }
    .mine-menu {
      padding: 12px;
      margin-top: -12px;
      border-radius: 10px;
      background-color: #fff;
      min-height: calc(100vh - 200px);
      .menu-item {
        position: relative;
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #666;
        .l-icon {
          font-size: 16px;
          margin-right: 10px;
        }
        .icon-jinru {
          position: absolute;
          right: 10px;
        }
      }
      .button-exit {
        margin: 20px 0;
      }
    }
  }
</style>
