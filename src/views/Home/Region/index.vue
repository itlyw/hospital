<template>
  <div class="region">
    <div class="content">
      <div class="left">地区：</div>
      <ul>
        <li :class="{ active : RegionFlag == '' }" @click="changeRegion('')">全部</li>
        <li v-for="region in RegionArr" :class="{ active : RegionFlag == region.value }" @click="changeRegion(region.value)" :key="region.value">{{ region.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reqHospitalLevelAndRegion } from '@/api/home/index'
import type { HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr } from '@/api/home/type'
import { onMounted,ref } from 'vue'

// 存储地区数组
const RegionArr = ref<HospitalLevelAndRegionArr>([])
// 地区高亮的响应式数据
const RegionFlag = ref<string>('')
// 地区组件挂载完毕获取地区数据
onMounted(() => {
  getRegion()
})

// 获取地区的数据
const getRegion = async () => {
  const result:HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('Beijin')
  if(result.code == 200){
    RegionArr.value = result.data
  }
}

// 点击不同区域按钮回调
const changeRegion = (region:string) => {
  RegionFlag.value = region
  // 给父组件传递参数
  $emit('getRegion',region)
}

const $emit = defineEmits(['getRegion'])
</script>

<style scoped lang='scss'>
.region{
  color: #7f7f7f;
  margin-top: 10px;
  .content{
    display: flex;
    .left{
      margin-right: 10px;
      width: 56px;
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        margin-right: 10px;
        margin-bottom: 10px;
        &.active{
          color: #55a6fe;
        }
      }
      li:hover{
        color: #55a6fe;
        cursor: pointer;
      }
    }
 }
}
</style>