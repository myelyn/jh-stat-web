import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore(
  'userInfo', 
  () => {
    const userInfo = ref()
    const token = ref('')
    const setUserInfo = (val: any) => {
      console.log(val)
      userInfo.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = undefined
    }

    const setToken = (val: string) => {
      token.value = val
    }

    const clearToken = (val: string) => {
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