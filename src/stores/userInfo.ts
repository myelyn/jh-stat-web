import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { userInfoType } from '@/types/user'

export const useUserInfoStore = defineStore(
  'userInfo', 
  () => {
    const userInfo = ref<userInfoType>()
    const token = ref('')
    const setUserInfo = (val: any) => {
      userInfo.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = undefined
      clearToken()
    }

    const setToken = (val: string) => {
      token.value = val
    }

    const clearToken = () => {
      token.value = ''
    }

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      setToken,
      clearToken,
      token
    }

  }, {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          return uni.setStorageSync(key, value)
        }
      }
    }
  }
)