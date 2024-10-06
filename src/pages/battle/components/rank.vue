<template>
  <view class="header">
    <view class="hd-1">指标</view>
    <view class="hd-2">
      <up-dropdown title-size="26rpx">
        <up-dropdown-item v-model="showCamp" :title="showCamp" :options="campOptions"></up-dropdown-item>
      </up-dropdown>
    </view>
    <view class="hd-3">{{ curDimension.label }}</view>
  </view>
  <view class="container">
    <!-- 左侧指标列表 -->
    <scroll-view class="cnt-l" scroll-y>
      <view 
        v-for="item in dimensionList" 
        :class="['dimension-item', curDimension.value===item.value && 'active']" 
        :key="item.value"
        @click="handleDimensionClick(item)"
      >{{ item.label }}</view>
    </scroll-view>
    <!-- 右侧数据表格 -->
    <scroll-view class="cnt-r" :key="curDimension.value + showCamp" scroll-y>
      <view 
        v-for="(item, index) in showDatas" 
        :key="`${curDimension.value}-${showCamp}-${item.id}`"
        :class="['list-item', curDimension.value==='tags' && 'tag-item', index===0 && 'first', index===1 && 'second', index===2 && 'third']" 
      >
        <view class="td1">{{ index + 1 }}</view>
        <view class="td2" @click="showDrawer(item)"><text class="player-name">{{ item.playerInfo?.name }}</text><view :class="item.playerInfo.camp">{{ item.playerInfo.camp?.toUpperCase() }}</view><icon class="iconfont icon-jinru"></icon></view>
        <view class="td3">
          <template v-if="curDimension.value==='tags'">
            <tags class="tags" v-for="text in item.tags" :text="text"></tags>
          </template>
          <text v-else>{{ item[curDimension.value] }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
  <view>
    <up-popup :show="isShowDrawer" closeable @close="isShowDrawer=false" mode="right" :overlayOpacity="0.7" :zIndex="100000">
      <scroll-view style="height: 100%; width: 600rpx;" scroll-y>
        <playerDetail v-if="curPlayer" :datas="curPlayer"></playerDetail>
      </scroll-view>
    </up-popup>
  </view>
</template>

<script lang="ts" setup>
  import { ref, watch, reactive, computed } from 'vue'
  import { orderBy, filter } from 'lodash-es'
  import type { OptionsItemType } from '@/types/home'
  import { showCampOptions, dimensionOptions } from '@/constant/options'
  import type { BattlePlayerDetailType } from '@/types/home'
  import tags from './tags.vue'
  import playerDetail from './playerDetail.vue'

  const props = defineProps<{
    datas: BattlePlayerDetailType[]
  }>()

  const showCamp = ref('全部选手')
  const campOptionsMap = reactive<{[key: string]: string}>({
    '全部选手': 'ctz,mjs',
    '只看CTZ': 'ctz',
    '只看MJS': 'mjs'
  })
  const campOptions = ref(showCampOptions)
  const dimensionList = ref(dimensionOptions)
  const curDimension = ref<OptionsItemType>(dimensionOptions[0])

  const handleDimensionClick = (item: OptionsItemType) => {
    curDimension.value = item
    setData()
  }

  // 选手详情抽屉
  const curPlayer = ref()
  const isShowDrawer = ref(false)
  const showDrawer = async (item: BattlePlayerDetailType) => {
    curPlayer.value = item
    isShowDrawer.value = true
  }

  // 计算展示的数据
  const showDatas = computed(() => {
    const ret = filter(rankDatas.value, (item: BattlePlayerDetailType) => {
      return campOptionsMap[showCamp.value].includes(item.playerInfo?.camp)
    })
    return ret
  })

  const rankDatas = ref<BattlePlayerDetailType[]>([])
  const setData = () => {
    const orderByField = curDimension.value.value === 'tags' ? 'score' : curDimension.value.value
    rankDatas.value = orderBy(props.datas, [orderByField], ['desc'])
  }

  watch(() => props.datas, () => {
    if (!props.datas) return 
    setData()
  }, {
    immediate: true
  })
</script>
<style lang="scss">
  @import '../styles/battle.scss';
</style>