<template>
  <view class="create-battle-wrapper">
    <uni-section title="创建战斗" type="line">
      <uni-datetime-picker v-model="datetimerange" type="datetimerange" rangeSeparator="至" @change="haneleTimeChange" />
      <button @tap="handleCreate" class="confirm-btn" :disabled="createDisabled" hover-class="none" type="primary" size="mini">确认生成</button>
    </uni-section>
    <uni-section title="删除战斗" type="line">
      <uni-easyinput v-model="removeId" placeholder="请输入要删除的战斗ID" @input="handleInput"></uni-easyinput>
      <button @tap="handleDelete" class="confirm-btn" :disabled="deleteDisabled" hover-class="none" type="primary" size="mini">确认删除</button>
    </uni-section>
  </view>
  <up-toast ref="uToastRef"></up-toast>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { createBattleApi, deleteBattleApi } from '@/service/battle'

  // 错误提示
  const errorMessage = ref()
  const uToastRef = ref()
  const showNofity = (type: string, message: string) => {
    uToastRef.value.show({
      type,  
      message
    })
  }

  // 创建
  const datetimerange = ref()
  const createDisabled = ref(false)

  const haneleTimeChange = () => {
    createDisabled.value = false
  }
  const handleCreate = async () => {
    if (!datetimerange.value?.length || datetimerange.value.length < 2) {
      errorMessage.value = '请填写开始和结束时间'
      showNofity('error', errorMessage.value)
      return
    }
    try {
      createDisabled.value = true
      const res = await createBattleApi({
        startTime: datetimerange.value[0],
        endTime: datetimerange.value[1]
      })
      showNofity('success', res.msg)
    } catch(e) {
      showNofity('error', e.msg)
      createDisabled.value = false
    }
  }
  // 删除
  const removeId = ref('')
  const deleteDisabled = ref(false)
  const handleInput = () => {
    deleteDisabled.value = false
  }
  const handleDelete = async () => {
    if (!removeId.value) {
      errorMessage.value = '请填写需要删除的战斗ID'
      showNofity('error', errorMessage.value)
      return
    }
    try {
      deleteDisabled.value = true
      const res = await deleteBattleApi(removeId.value)
      showNofity('success', res.msg)
    } catch(e) {
      showNofity('error', e.msg)
      deleteDisabled.value = false
    }
  }

</script> 

<style lang="scss">
  .create-battle-wrapper {
    .uni-section-content {
      text-align: center;
    }
    .confirm-btn {
      margin: 20rpx 0;
      text-align: right;
    }
  }
</style>