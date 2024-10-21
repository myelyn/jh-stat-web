import { useUserInfoStore } from '@/stores/userInfo'

const userInfoStore = useUserInfoStore()

const baseUrl = 'http://localhost:9090'
// const baseUrl = 'https://mxmjh.top/jhstat'

uni.addInterceptor('request', {
  invoke(options) {
    if (!options.url.startsWith('http')) {
      options.url = baseUrl + options.url
    }
  }
})

interface resType<T> {
  code: number
  msg: string
  result: T
}

const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<resType<T>>((resolve, reject) => {
    uni.request({
      ...options,
      header: {
        authorization: userInfoStore.token
      },
      success (res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as resType<T>)
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as resType<T>).msg || '请求错误'
          })
          reject(res)
        }
      },
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误'
        })
        reject(err)
      }
    })
  })
}


export default http