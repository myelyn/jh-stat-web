<template>
  <view class="mine-wrapper">
    <view class="mine-header">
      <view class="header-cnt" :style="{'padding-top': safeAreaInsets?.top + 'px'}">
        <view class="avatar-wrapper">
          <image class="avatar-img" :src="`${imgBase}/${userInfoStore.userInfo ? 'avatar_default_login.png' : 'avatar_default_logout.png'}`"/>
        </view>
        <view v-if="userInfo" class="user-info-wrapper">
          <text class="fs-16">{{ userInfo.username }}</text><br/>
          <text class="fs-14">{{ roleName }}</text>
        </view>
        <view v-else class="user-info-wrapper">
          <navigator :url="`/pages/login/login`">
            <text class="fs-16">未登录</text><br/>
            <text class="fs-14">点击登录</text>
          </navigator>
        </view>
      </view>
    </view>
    <view class="mine-menu">
      <view class="menu-item" @tap="handleAboutTap">
        <icon class="iconfont l-icon icon-guanyuwomen"></icon>
        <text>关于</text>
        <icon class="iconfont icon-jinru fs-12"></icon>
      </view>
      <view url="/pages/secondrate/secondrate" class="menu-item" @tap="handleSecondRateTap">
        <icon class="iconfont l-icon icon-calculation"></icon>
        <text>同秒率计算工具</text>
        <icon class="iconfont icon-jinru fs-12"></icon>
      </view>
      <view class="menu-item" @tap="handleCreateBattleTap">
        <icon class="iconfont l-icon icon-duizhan-jian-tianchong"></icon>
        <text>管理战斗</text>
        <icon class="iconfont icon-jinru fs-12"></icon>
      </view>
      <view class="menu-item" @tap="handleAddPlayerTap">
        <icon class="iconfont l-icon icon-renyuan"></icon>
        <text>添加选手</text>
        <icon class="iconfont icon-jinru fs-12"></icon>
      </view>
      <button v-if="userInfo" @tap="clearUserInfo()" class="button-exit" hover-class="none" type="primary">退出登录</button>
    </view>
  </view>
  <up-toast ref="uToastRef"></up-toast>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed } from 'vue'
  import { useUserInfoStore } from '@/stores/userInfo'

  const { safeAreaInsets } = uni.getSystemInfoSync()
  const imgBase = ref(`${import.meta.env.VITE_IMAGE_BASE}/`)

  const userInfoStore = useUserInfoStore()

  const { userInfo, clearUserInfo,  } = toRefs(userInfoStore)

  const roleName = computed(() => { 
    if (!userInfo.value?.roleId) {
      return '未知'
    }
    switch (userInfo.value.roleId) {
      case 1:
        return '超级管理员'
      case 2: 
        return '管理员'
      default:
        return '普通成员'
    }
  })

  const uToastRef = ref()
  const verifyAuth = () => {
    if (!userInfo.value || ![1,2].includes(userInfo.value.roleId)) {
      uToastRef.value.show({
        type: 'error',  
        message: '仅管理员可以操作'
      })
      return Promise.reject('无权限')
    }
    return Promise.resolve()
  }
  const handleSecondRateTap = async () => {
    try {
      await verifyAuth()
      uni.navigateTo({
        url: '/pages/secondrate/secondrate'
      })
    } catch(e) {
      console.log(e)
    }
  }

  const handleCreateBattleTap = async () => {
    try {
      await verifyAuth()
      uni.navigateTo({
        url: '/pages/createbattle/createbattle'
      })
    } catch(e) {
      console.log(e)
    }
  }

  const handleAddPlayerTap = async () => {
    try {
      await verifyAuth()
      uni.navigateTo({
        url: '/pages/addplayer/addplayer'
      })
    } catch(e) {
      console.log(e)
    }
  }

  const handleAboutTap = () => {
    uni.navigateTo({
      url: '/pages/about/about'
    })
  }

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
