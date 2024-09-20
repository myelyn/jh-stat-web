<template>
  <uni-table emptyText="暂无更多数据">
    <!-- 表头行 -->
    <uni-tr>
      <uni-th width="120"></uni-th>
      <uni-th width="50%">CTZ</uni-th>
      <uni-th width="50%">MJS</uni-th>
    </uni-tr>
    <!-- 表格数据行 -->
    <uni-tr v-for="h in headers">
      <uni-td><view :class="['td-title', ['k', 'd', 'a', 's'].includes(h.value) && 'highlight']">{{ h.label }}</view></uni-td>
      <uni-td><view :class="['td-data', datas.ctz[h.value] > datas.mjs[h.value] && 'highlight']">{{ datas.ctz[h.value] }}</view></uni-td>
      <uni-td><view :class="['td-data', datas.ctz[h.value] < datas.mjs[h.value] && 'highlight']">{{ datas.mjs[h.value] }}</view></uni-td>
    </uni-tr>
  </uni-table>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { battleOverviewTableHeaders } from '@/constant/options'
  import type { battleOverviewType } from  '@/types/home'

  defineProps<{
    datas: battleOverviewType
  }>()
  
  const headers = ref(battleOverviewTableHeaders)
</script>

<style lang="scss">
  @import '../styles/battle.scss';
</style>