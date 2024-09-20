<template>
  <view class="player-detail-drawer">
    <uni-section title="选手信息" type="line" padding="0 0 5px 10px">
      <view class="baseInfo">
        <view class="row">
          <up-avatar
            :text="datas.playerInfo?.name.substring(0,1)"
            fontSize="18"
            randomBgColor
          ></up-avatar>
          <view class="roles">
            <view class="main-role">{{ datas.playerInfo?.name }}</view>
            <view class="sub-role">{{ datas.playerInfo?.roles.join('/') }}</view>
          </view>
        </view>
      </view>
    </uni-section>

    <uni-section title="本场基础数据" type="line" padding="0 0 5px 10px">
      <uni-grid :column="3" :show-border="false" :square="false">
        <uni-grid-item v-for="(item ,index) in gridList" :index="index" :key="index">
          <view class="grid-item-box">
            <view class="item-label">{{ item.label }}</view>
            <text class="item-data">{{ datas[item.value] }}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </uni-section>

    <uni-section title="本场详细数据" type="line" padding="0 0 5px 10px">
      <view class="sub-title">我杀的人</view>
      <view class="content" v-html="formatItem(datas.killNames)"></view>
      <view class="sub-title">杀我的人</view>
      <view class="content" v-html="formatItem(datas.killByNames)"></view>
      <view class="sub-title">我使用卡片/配药/法器的人</view>
      <view class="content" v-html="formatItem(datas.operationNames)"></view>
      <view class="sub-title">对我使用卡片/配药/法器的人</view>
      <view class="content" v-html="formatItem(datas.operationByNames)"></view>
    </uni-section>
  </view>
</template>

<script setup lang="ts">
  import { ref, watch, nextTick } from 'vue'
  import { orderBy } from 'lodash-es'
  import type { BattlePlayerDetailType } from '@/types/home'
  import { playerDetailList } from '@/constant/options'

  const props = defineProps<{datas: BattlePlayerDetailType}>()

  const collapseValue = ref(['0', '1', '2', '3'])
  const gridList = ref(playerDetailList)

  interface detailType {[key: string]: number}
  const formatItem = (obj: detailType) => {
    if (!obj) { return '暂无数据' }
    let str = ''
    const arr: any[] = []
    Object.keys(obj).forEach(key => {
      arr.push({
        name: key,
        value: obj[key]
      })
    })
    if (!arr.length) { return '暂无数据' }
    orderBy(arr, ['value'], ['desc']).forEach(item => {
      str += `<span style="margin-right: 10px;">${item.name}: ${item.value}</span>`
    })
    return str
  }

  watch(() => props.datas, async () => {
    collapseValue.value = []
    await nextTick()
    collapseValue.value = ['0', '1', '2', '3']
  }, {
    immediate: true,
    deep: true
  })
</script>

<style lang="scss">
  .player-detail-drawer {
    padding-bottom: 30rpx;
    .baseInfo {
      display: flex;
      .row {
        display: flex;
      }
      .roles {
        flex: 1;
        padding: 0 10rpx;
        .main-role {
          font-size: 28rpx;
          font-weight: bold;
          color: #333;
        }
        .sub-role {
          font-size: 24rpx;
          color: #999;
        }
      }
    }
    .grid-item-box {
      margin-bottom: 16rpx;
      text-align: center;
      .item-label {
        font-size: 24rpx;
        color: #b6b6b6;
      }
      .item-data {
        font-size: 32rpx;
        color: #333;
        font-weight: bold;
      }
    }
    .sub-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #666;
      padding: 0 24rpx 8rpx;
    }
    .content {
      color: #999;
      padding: 0 24rpx 30rpx;
      font-size: 26rpx;
    }
  }


</style>