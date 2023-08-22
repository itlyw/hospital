<template>
  <div></div>
</template>

<script setup lang='ts'>
import { SET_TOKEN } from '@/utils/user.ts'
// 获取用户信息
import { useRoute } from 'vue-router'
// 获取路由器实例
const $route = useRoute()
// 持久化存储用户数据
SET_TOKEN(JSON.stringify($route.query))
// 此路由组件代码执行，说明授权成功
const html:any = document.querySelector('html')
html.style.display = 'none'
</script>

<style scoped lang='scss'>

</style>