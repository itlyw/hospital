<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HospitalTop></HospitalTop>
    <!-- 展示路由组件的区域 -->
    <div class="content">
     <!-- 展示路由组件 -->
     <router-view></router-view>
    </div>
    <HospitalBottom></HospitalBottom>
    <!-- 登录组件 -->
    <Login></Login>
  </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  .content{
  margin-top: 70px;
  width: 1200px;
  min-height: 750px;
  }
}

</style>