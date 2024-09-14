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
    <scroll-view class="cnt-r" scroll-y>
      <view 
        :class="['list-item', curDimension.value==='tags' && 'tag-item']" 
        v-for="(item, index) in showDatas" 
        :key="item.id"
      >
        <view :class="['td1', index===0 && 'first', index===1 && 'second', index===2 && 'third']">{{ index + 1 }}</view>
        <view class="td2">{{ item.playerInfo?.name }}</view>
        <view class="td3">
          <template v-if="curDimension.value==='tags'">
            <tags v-for="text in item.tags" :text="text"></tags>
          </template>
          <text v-else>{{ item[curDimension.value] }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
  import { ref, watch, reactive, computed } from 'vue'
  import { orderBy, filter } from 'lodash-es'
  import type { OptionsItemType } from '@/types/home'
  import { showCampOptions, dimensionOptions } from '@/constant/options'
  import type { BattlePlayerDetailType } from '@/types/home'
  import tags from './tags.vue'

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

  const showDatas = computed(() => {
    console.log(rankDatas.value)
    return filter(rankDatas.value, (item: BattlePlayerDetailType) => {
      return campOptionsMap[showCamp.value].includes(item.playerInfo?.camp)
    })
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