<template>
  <view class="login-wrapper" :style="{'background-image': `url(${imgBase}/login_bg.png)`}">
    <view class="login-form">
      <up-input
        placeholder="用户名"
        prefixIcon="man-add"
        color="#f9f9f9"
        prefixIconStyle="font-size: 22px;color: #909399"
      ></up-input>
      <up-input
        placeholder="密码"
        password
        prefixIcon="lock"
        color="#f9f9f9"
        prefixIconStyle="font-size: 22px;color: #909399"
      ></up-input>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useUserInfoStore } from '@/stores/userInfo'

  const imgBase = ref(`${import.meta.env.VITE_IMAGE_BASE}/`)

  const userInfoStore = useUserInfoStore()

</script>

<style lang="scss">
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    height: 100vh;
    .login-form {
      position: relative;
      width: 600rpx;
      height: 600rpx;
      border-radius: 20rpx;
      .u-input {
        margin-bottom: 30rpx;
        color: #fff;
      }
    }
  }
</style>