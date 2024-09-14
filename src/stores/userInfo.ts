import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore(
  'userInfo', 
  () => {
    const userInfo = ref()

    const setUserInfo = (val: any) => {
      console.log(val)
      userInfo.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = undefined
    }

    return {
      userInfo,
      setUserInfo,
      clearUserInfo
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