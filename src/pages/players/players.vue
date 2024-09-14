<template>
  <view class="content">
    <view class="text-area">
      <button
        hover-class="button-hover"
        @tap="testRequest"
      >
        测试请求
      </button>{{ title }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import http from '@/utils/http'

const title = ref('Hello')

const testRequest = async () => {
  const res = await http<any[]>({
    method: "GET",
    url: "/battle/list2"
  })
  console.log(res)
}


</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
