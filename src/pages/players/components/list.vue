<template>
  <up-dropdown>
    <up-dropdown-item v-model="showType" title="查看范围" active-color="#558dda" :options="playerCampOptions"></up-dropdown-item>
    <up-dropdown-item v-model="sortType" title="排序方式" active-color="#558dda" :options="playersOrderOptions"></up-dropdown-item>
  </up-dropdown>
  <scroll-view 
    class="player-list-wrapper" 
    refresher-enabled 
    scroll-y
    :refresher-triggered="isTriggered"
    @refresherrefresh="onRefresherrefresh" 
  >
    <ListItem 
      v-for="item in playerList.filter(p => showType==='all' || showType===p.camp)" 
      @tap="showPop(item)"
      :sortType="sortType" 
      :datas="item" 
      :key="item.id"
    ></ListItem>
  </scroll-view>
  <up-popup v-model:show="isShowPop" v-if="popData" :customStyle="{background: '#f4f8ff'}">
    <view class="player-detail-popup-content">
      <view class="pop-title">赛季数据统计</view>
      <scroll-view  class="pop-bd">
        <view><text class="title">选手姓名：</text><text class="primary-value">{{ popData.name }}</text></view>
        <view>
          <text class="title">所有角色：</text><text>{{ popData.roles.join('/') }}</text>
        </view>
        <view 
          v-for="opt in playersOrderOptions">
          <text class="title">{{ opt.name }}：</text>
          <text class="data-value">{{ popData?.seasonData && (['k', 'a', 'cost', 'mscs'].includes(opt.value) ? $formatnum(popData.seasonData[opt.value]) : $formatnum(popData.seasonData[opt.value], 0, true)) || '0' }}</text>
        </view>
        <view class="add-wrapper" v-if="userInfoStore?.userInfo?.roleId===1 || userInfoStore?.userInfo?.roleId===2" title="选手全部角色，用/分隔" type="line">
          <view class="add-text">添加角色：</view>
          <uni-easyinput
            v-model="newRoles"
            type="text"
            placeholder=""
          />
          <button @tap="handleAdd" class="confirm-btn" hover-class="none" type="primary" size="mini">确认添加</button>
        </view>
      </scroll-view>
      <up-toast ref="uToastRef"></up-toast>
    </view>
  </up-popup>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { orderBy } from 'lodash-es';
  import { onLoad } from '@dcloudio/uni-app';
  import { getPlayerListApi, updatePlayerApi } from '@/service/player'
  import type { playerListItemType, orderByType } from '@/types/player'
  import { playerCampOptions, playersOrderOptions } from '@/constant/options'
  import ListItem from './listItem.vue';
  import { useUserInfoStore } from '@/stores/userInfo'

  const userInfoStore = useUserInfoStore()


  const playerList = ref<playerListItemType[]>([])
  const isTriggered = ref(false)

  const onRefresherrefresh = async () => {
    isTriggered.value = true
    await getPlayerList()
    isTriggered.value = false
  }
  
  const getPlayerList = async () => {
    const res = await getPlayerListApi()
    playerList.value = res.result.filter(p => p.seasonData) || []
    sortList()
  }

  // 筛选和排序
  const showType = ref('all')
  const sortType = ref<orderByType>('k')

  const sortList = () => {
    playerList.value = orderBy(playerList.value, [`seasonData.${sortType.value}`, sortType.value === 'k' ? 'a' : 'k'], ['desc', 'desc'])
  }

  watch(() => sortType.value, () => {
    sortList()
  })

  // 弹出层
  const popData = ref()
  const isShowPop = ref(false)
  const showPop = (item: playerListItemType) => {
    popData.value = item
    isShowPop.value = true
  }

  // 添加角色
  const uToastRef = ref()
  const newRoles = ref('')
  const handleAdd = async () => {
    if (!newRoles.value) {
      return
    }
    const params = {
      id: popData.value.id,
      roles: popData.value.roles.concat(newRoles.value.split('/')).join(',')
    }
    try {
      await updatePlayerApi(params)
      uToastRef.value.show({
        type: 'success',  
        message: '添加成功'
      })
      popData.value.roles = params.roles.split(',')
      newRoles.value = ''
      await getPlayerList()
    } catch(e) {
      uToastRef.value.show({
        type: 'error',  
        message: e.msg
      })
    }
  }

  onLoad (() => {
    getPlayerList()
  })
</script>

<style lang="scss">
  .player-list-wrapper {
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .player-detail-popup-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 400rpx;
    padding: 30rpx 60rpx;
    font-size: 26rpx;
    color: #999;
    -webkit-text-fill-color: #999;
    .pop-title {
      font-size: 30rpx;
      color: #022202;
      -webkit-text-fill-color: #022202;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20rpx;
    }
    .pop-bd {
      flex: 1;
      line-height: 40rpx;
      .primary-value {
        -webkit-text-fill-color: $primary-color;
        font-weight: bold;
      }
      .data-value {
        -webkit-text-fill-color: #000;
        font-weight: bold;
      }
      .add-text {
        font-size: 26rpx;
        line-height: 30rpx;
        -webkit-text-fill-color: $primary-color;
      }
    }
    .add-wrapper {
      margin: 40rpx 0 20rpx;
      .confirm-btn, .add-text {
        margin: 20rpx 0;
      }
      .confirm-btn {
        text-align: center;
      }
    }
  }
</style>