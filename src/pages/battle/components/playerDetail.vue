<template>
  <view class="player-detail-drawer">
    <uni-section title="选手信息" type="line" padding="0 0 5px 10px">
      <view class="baseInfo">
        <view class="row">
          <up-avatar
            :text="datas.playerInfo.name.substring(0,1)"
            fontSize="18"
            randomBgColor
          ></up-avatar>
          <view class="roles">
            <view class="main-role">{{ datas.playerInfo.name }}</view>
            <view class="sub-role">{{ datas.playerInfo.roles.join('/') }}</view>
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
      <uni-collapse ref="collapse" v-model="collapseValue">
				<uni-collapse-item title="我杀的人" >
					<view class="content" v-html="formatItem(datas.killNames)"></view>
				</uni-collapse-item>
				<uni-collapse-item title="杀我的人" >
					<view class="content" v-html="formatItem(datas.killByNames)"></view>
				</uni-collapse-item>
        <uni-collapse-item title="我使用卡片/配药/法器的人">
					<view class="content" v-html="formatItem(datas.operationNames)"></view>
				</uni-collapse-item>
        <uni-collapse-item title="对我使用卡片/配药/法器的人" >
					<view class="content" v-html="formatItem(datas.operationByNames)"></view>
				</uni-collapse-item>
			</uni-collapse>
    </uni-section>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { orderBy } from 'lodash-es'
  import type { BattlePlayerDetailType } from '@/types/home'
  import { playerDetailList } from '@/constant/options'

  defineProps<{datas: BattlePlayerDetailType}>()

  const collapseValue = ref(['0', '1', '2', '3'])
  const gridList = ref(playerDetailList)

  interface detailType {[key: string]: number}
  const formatItem = (obj: detailType) => {
    if (!obj) {
      return '暂无数据'
    }
    let str = ''
    const arr: any[] = []
    Object.keys(obj).forEach(key => {
      arr.push({
        name: key,
        value: obj[key]
      })
    })
    orderBy(arr, ['value'], ['desc']).forEach(item => {
      str += `<span style="margin-right: 10px;">${item.name}: ${item.value}</span>`
    })
    console.log(str)
    return str
  }
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
    .content {
      color: #999;
      padding: 0 32rpx 20rpx;
    }
  }

  .uni-collapse-item {
    .uni-collapse-item__title-box {
      height: 60rpx;
      line-height: 60rpx;
    }
    .uni-collapse-item__title-text {
      font-size: 32rpx;
    }
  }
</style>