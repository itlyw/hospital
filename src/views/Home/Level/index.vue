<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级：</div>
      <ul class="hospital">
        <li :class="{ active : activeFlag == '' }" @click="changLevel('')">全部</li>
        <li v-for="level in levelArr" :key="level.value"  :class="{ active : activeFlag == level.value }"  @click="changLevel(level.value)">{{ level.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reqHospitalLevelAndRegion } from '@/api/home/index'
import type { HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr } from '@/api/home/type'
import { onMounted,ref } from 'vue'
// 定义存储医院等级的数据
const levelArr = ref<HospitalLevelAndRegionArr>([])
// 控制医院等级高亮的响应式数据
let activeFlag = ref<string>('')
// 组件挂载完毕，请求数据
onMounted(() => {
  getLevel()
})
// 将获取医院等级数据封装成一个方法
const getLevel = async () => {
  const result:HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('Hostype')
  if(result.code == 200) {
    // 存储医院等级的数组
    levelArr.value = result.data
  }
}

// 改变等级的按钮回调
const changLevel = (level:string) => {
  // 响应式数据存储level的值
  activeFlag.value = level  
  // 触发自定义事件：将医院的等级参数传递给父组件
  $emit('getLevel',level)
}

const $emit = defineEmits(['getLevel'])
</script>

<style scoped lang='scss'>
.level{
  color: #7f7f7f;
  h1{
    font-size: 900;
    margin: 10px 0;
  }
  .content{
    display: flex;
    .left{
      margin-right: 10px;
    }
    .hospital{
      display: flex;
      li{
        margin-right: 10px;
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