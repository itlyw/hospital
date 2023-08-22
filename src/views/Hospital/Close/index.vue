<template>
  <div class="info">
    <h1>{{ detailStore.hospitalInfo.hospital?.hosname }}停诊信息</h1>
    <el-empty description="暂无信息" />
  </div>
</template>

<script setup lang='ts'>
import useDetailStore  from '@/store/modules/hospitalDetail.ts'
// 获取医院详情
const detailStore = useDetailStore()
</script>

<style scoped lang='scss'>
.info{
  h1{
    text-align: center;
    font-size: 20px;
  }
}
</style>