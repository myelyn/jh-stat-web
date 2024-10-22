<template>
  <uni-section title="版本" type="line">
    <view class="content-wrapper">v1.0.0</view>
  </uni-section>
  <uni-section title="说明" type="line">
    <view class="content-wrapper" v-html="textValue"></view>
  </uni-section>
</template>


<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app';
  import { getAboutApi } from '@/service/about'

  const textValue = ref('')
  onLoad(async () => {
    const res = await getAboutApi()
    textValue.value = res.result || ''
  })
  
</script>

<style lang="scss" scoped>
  .content-wrapper {
    padding: 0 40rpx;
    color: #333;
    font-weight: 26rpx;
    line-height: 40rpx;
  }
</style>