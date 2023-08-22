<template>
  <div>
    <div v-if="$route.query.orderId">
      <Detail></Detail>
    </div>
    <div v-else>
      <AllOrder></AllOrder>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router'
import Detail from '@/views/User/Order/Detail/index.vue'
import AllOrder from '@/views/User/Order/AllOrder/index.vue'
// 获取路由对象
const $route = useRoute()
</script>

<style scoped lang='scss'>

</style>