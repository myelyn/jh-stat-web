<template>
  <view class="add-player-wrapper">
    <uni-section title="管理姓名" type="line">
      <uni-easyinput
        v-model="player.name"
        type="text"
        placeholder=""
      />
    </uni-section>
    <uni-section title="选择阵营" type="line">
      <uni-data-select
        v-model="player.camp"
        :localdata="[{value: 'ctz', text: 'ctz'}, {value: 'mjs', text: 'mjs'}]"
      ></uni-data-select>
    </uni-section>
    <uni-section title="选手全部角色，用/分隔" type="line">
      <uni-easyinput
        v-model="player.roles"
        type="text"
        placeholder=""
      />
      <button @tap="handleCreate" class="confirm-btn" :disabled="disabled" hover-class="none" type="primary" size="mini">确认删除</button>
    </uni-section>
  </view>
  <up-toast ref="uToastRef"></up-toast>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { onLoad } from '@dcloudio/uni-app';
  import dayjs from 'dayjs'
  import { addPlayerApi } from '@/service/player'

  // 错误提示
  const errorMessage = ref()
  const uToastRef = ref()
  const showNofity = (type: string, message: string) => {
    uToastRef.value.show({
      type,  
      message
    })
  }

  const player = reactive({
    name: '',
    roles: '',
    camp: '',
  })
  // 创建
  const disabled = ref(false)
  const handleCreate = async () => {
    if (!player.name) {
      errorMessage.value = '请填写选手姓名'
      showNofity('error', errorMessage.value)
      return
    }
    if (!player.camp) {
      errorMessage.value = '请选择选手阵营'
      showNofity('error', errorMessage.value)
      return
    }
    if (!player.roles) {
      errorMessage.value = '请填写选手角色'
      showNofity('error', errorMessage.value)
      return
    }
    try {
      disabled.value = true
      const res = await addPlayerApi({
        name: player.name,
        camp: player.camp,
        roles: player.roles.split('/').join(',')
      })
      showNofity('success', res.msg)
      disabled.value = false
    } catch(e) {
      showNofity('error', e.msg)
      disabled.value = false
    }
  }


</script> 

<style lang="scss">
  .add-player-wrapper {
    .uni-section-content {
      text-align: center;
    }
    .confirm-btn {
      margin: 20rpx 0;
    }
  }
</style>