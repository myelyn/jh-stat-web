<template>
  <div class="page-index-wrapper">
    <Header></Header>
    <List class="home-list-wrapper"></List>
  </div>
</template>

<script setup lang="ts">
  import Header from './components/Header.vue'
  import List from './components/List.vue'
</script>

<style lang="scss" scoped>
  .page-index-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    .home-list-wrapper {
      flex: 1;
      overflow: hidden;
      box-sizing: border-box;
      padding: 12px;
      margin-top: -12px;
      border-radius: 10px;
      background-color: #fff;
    }
  }
</style>