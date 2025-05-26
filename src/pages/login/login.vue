<template>
  <view class="login-wrapper">
    <navigator open-type="navigateBack" :delta="1" class="back-arrow" :style="{ 'top': safeAreaInsets?.top + 'px' }">
      <up-icon name="arrow-left"></up-icon></navigator>
    <view>
      <image class="login-img" :src="`${imgBase}/login_icon.png`" />
    </view>
    <template v-if="type === 'login'">
      <view class="login-form">
        <view style="margin-bottom: 30rpx;">
          <uni-easyinput v-model="loginInfo.username" primaryColor="#558dda;" placeholder="请输入用户名"></uni-easyinput>
        </view>
        <view style="margin-bottom: 30rpx;">
          <uni-easyinput type="password" primaryColor="#558dda;" v-model="loginInfo.password"
            placeholder="请输入密码"></uni-easyinput>
        </view>
        <button type="primary" :disabled="btnDisabled" hover-class="none" @tap="handleLogin">登录</button>
      </view>
      <view class="switch-tips">还没有账号？<text class="link" @tap="changeType('register')">马上注册</text></view>
    </template>
    <template v-else>
      <view class="login-form">
        <view style="margin-bottom: 30rpx;">
          <uni-easyinput v-model="regInfo.username" primaryColor="#558dda;" placeholder="请输入用户名"></uni-easyinput>
        </view>
        <view style="margin-bottom: 30rpx;">
          <uni-easyinput type="password" primaryColor="#558dda;" v-model="regInfo.password"
            placeholder="请输入密码"></uni-easyinput>
        </view>
        <view style="margin-bottom: 30rpx;">
          <uni-easyinput type="password" primaryColor="#558dda;" v-model="regInfo.passwordConfirm"
            placeholder="请再次输入密码"></uni-easyinput>
        </view>
        <button type="primary" :disabled="btnDisabled" hover-class="none" @tap="handleReg">注册</button>
      </view>
      <view class="switch-tips">已有账号？<text class="link" @tap="changeType('login')">去登录</text></view>
    </template>
    <up-notify ref="uNotifyRef" :message="errorMessage"></up-notify>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw } from 'vue'
import { useUserInfoStore } from '@/stores/userInfo'
import type { registorOrLoginInfo } from '@/types/login'
import { loginApi, registerApi, userInfoApi } from '@/service/login'

const userInfoStore = useUserInfoStore()

const imgBase = ref(`${import.meta.env.VITE_IMAGE_BASE}/`)

const { safeAreaInsets } = uni.getSystemInfoSync()

// 表单信息
const type = ref('login')
const loginInfo = reactive({
  username: '',
  password: ''
})
const regInfo = reactive({
  username: '',
  password: '',
  passwordConfirm: ''
})

// 表单校验
const errorMessage = ref('')
const uNotifyRef = ref()
const btnDisabled = ref(false)
const changeType = (t: 'login' | 'register') => {
  type.value = t
  btnDisabled.value = false
  if (t === 'login') {
    loginInfo.username = ''
    loginInfo.password = ''
  } else {
    regInfo.username = ''
    regInfo.password = ''
    regInfo.passwordConfirm = ''
  }
}

const showNofity = (type: string, message: string) => {
  uNotifyRef.value.show({
    top: 100,
    type,
    message
  })
}

const usernameReg = /^[(a-zA-Z0-9\u4e00-\u9fa5){1}_]{2,20}$/
const passwordReg = /^[a-zA-Z0-9_-]{6,18}$/

const verifyFormat = async (data: registorOrLoginInfo) => {
  if (!data.username) {
    errorMessage.value = '用户名不能为空'
    return Promise.reject({ msg: errorMessage.value })
  }
  if (!data.password) {
    errorMessage.value = '密码不能为空'
    return Promise.reject({ msg: errorMessage.value })
  }
  if (!usernameReg.test(data.username)) {
    errorMessage.value = '用户名只能由中文、英文、数字、下划线组成，长度为2-20位，请重新输入'
    return Promise.reject({ msg: errorMessage.value })
  }
  if (!passwordReg.test(data.password)) {
    errorMessage.value = '密码只能由字母、数字、下划线组成，长度为6-18位，请重新输入'
    return Promise.reject({ msg: errorMessage.value })
  }
  if (type.value === 'register') {
    if (!data.passwordConfirm) {
      errorMessage.value = '请再次输入密码'
      return Promise.reject({ msg: errorMessage.value })
    }
    if (data.password !== data.passwordConfirm) {
      errorMessage.value = '两次输入密码不一致，请重新输入'
      return Promise.reject({ msg: errorMessage.value })
    }
  }
  return Promise.resolve()
}

// 提交登录
const handleLogin = async () => {
  btnDisabled.value = true
  try {
    await verifyFormat(loginInfo)
    loginAndGetInfo(loginInfo)
  } catch (e: any) {
    showNofity('error', e.msg || e.data?.msg)
    btnDisabled.value = false
  }
}

// 提交注册
const handleReg = async () => {
  btnDisabled.value = true
  try {
    await verifyFormat(regInfo)
    const params = {
      username: regInfo.username,
      password: regInfo.password
    }
    await registerApi(params)
    showNofity('success', '注册成功，即将自动登录..')
    setTimeout(() => {
      loginAndGetInfo(params)
    }, 1000)
  } catch (e: any) {
    showNofity('error', e.msg || e.data?.msg)
    btnDisabled.value = false
  }
}

// 注册成功后自动登录并跳转
const loginAndGetInfo = async (params: registorOrLoginInfo) => {
  try {
    const res = await loginApi(params)
    const userInfoRes = await userInfoApi({
      username: params.username,
    })
    userInfoStore.setToken(res.result)
    userInfoStore.setUserInfo(userInfoRes.result)
    uni.navigateBack({
      delta: 1
    })
  } catch (e: any) {
    showNofity('error', e.msg || e.data?.msg)
    btnDisabled.value = false
  }

}
</script>

<style lang="scss">
.login-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  height: 100vh;

  .login-img {
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    margin-bottom: 100rpx;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;
  }

  .back-arrow {
    position: absolute;
    left: 16px;
    font-size: 26px;
    color: #fff;
  }

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

  .switch-tips {
    font-size: 26rpx;
    color: #666;

    .link {
      color: $primary-color;
    }
  }
}
</style>