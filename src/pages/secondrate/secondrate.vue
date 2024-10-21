<template>
  <view class="second-rate-wrapper">
    <uni-section title="选择需要计算的选手" type="line">
      <uni-data-select
        v-model="playerName"
        :localdata="playerOptions"
        @change="handlePlayerChange"
      ></uni-data-select>
    </uni-section>
    <uni-section title="填写需要计算的时间段" type="line">
      <uni-datetime-picker v-model="datetimerange" type="datetimerange" rangeSeparator="至" @change="haneleTimeChange" />
      <button @tap="handleCreate" class="confirm-btn" hover-class="none" type="primary" size="mini">确认生成</button>
    </uni-section>
    <uni-section v-if="!showBtn" title="计算结果" type="line">
      <view class="second-rate">同秒率：<text>{{ resultData.sameSecondRate ? $formatnum(resultData.sameSecondRate, 2, true) : '0%' }}</text></view>
      <uni-table border stripe emptyText="暂无更多数据" >
        <!-- 表头行 -->
        <uni-tr>
          <uni-th>操作人</uni-th>
          <uni-th>对象</uni-th>
          <uni-th>操作/杀人时间</uni-th>
          <uni-th>内容</uni-th>
        </uni-tr>
        <!-- 表格数据行 -->
        <uni-tr v-for="item in resultData?.sameSecondList || []">
          <uni-td>{{ item.jh_killer_name || item.jh_operation_by }}</uni-td>
          <uni-td>{{ item.jh_killed_name || item.jh_operation_to }}</uni-td>
          <uni-td>{{ item.jh_kill_time || item.jh_operation_time }}</uni-td>
          <uni-td>{{ item.jh_kill_method || item.jh_operation_detail }}</uni-td>
        </uni-tr>
      </uni-table>
    </uni-section>
  </view>
  <up-toast ref="uToastRef"></up-toast>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app';
  import { getPlayerListApi } from '@/service/player'
  import { secondRateApi } from '@/service/battle'

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
  const showBtn = ref(true)
  const resultData = ref()
  const handleCreate = async () => {
    if (!datetimerange.value?.length || datetimerange.value.length < 2) {
      errorMessage.value = '请填写开始和结束时间'
      showNofity('error', errorMessage.value)
      return
    }
    try {
      const res = await secondRateApi({
        playerName: playerName.value,
        startTime: datetimerange.value[0],
        endTime: datetimerange.value[1]
      })
      resultData.value = res.result
      showBtn.value = false
      showNofity('success', res.msg)
    } catch(e) {
      showNofity('error', e.msg)
    }
  }

  // 选手列表
  const playerName = ref('')
  const playerOptions = ref([])
  const handlePlayerChange = () => {
    console.log(playerName.value)
  }
  onLoad(async () => {
    const res = await getPlayerListApi()
    playerOptions.value = res.result.map(item => {
      return {
        value: item.name,
        text: item.name
      }
    })
  })
</script> 

<style lang="scss">
  .second-rate-wrapper {
    .uni-section-content {
      text-align: center;
    }
    .second-rate {
      margin-bottom: 20rpx;
      text {
        color: Red;
        font-weight: bold;
      }
    }
    .confirm-btn {
      margin: 20rpx 0;
    }
  }
</style>