<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <!-- 用于展示就诊人信息的 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
    <template #header>
      <div class="card-header">
        <span>请选择就诊人</span>
        <el-button type="success" size="default" :icon="User" @click="goUser">添加就诊人</el-button>
      </div>
    </template>
    <!-- 卡片的身体部分要展示就诊人信息 -->
    <div class="user">
      <Visitor v-for="(user,index) in userArr" :key="user.id" @click="changeIndex(index)" class="item" :user="user" :index="index" :currentIndex="currentIndex"/>
    </div>
  </el-card>
  <!-- 展示医生的信息 -->
  <el-card class="box-card">
     <!-- 卡片的头部 -->
     <template #header>
       <div class="card-header">
        <span>挂号信息</span>
       </div>
     </template>
     <!-- 卡片的身体 -->
     <el-descriptions
     class="margin-top"
     :column="2"
     border
   >
     <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          就诊日期:
        </div>
      </template>
      {{ docInfo.workDate }}
     </el-descriptions-item>
     <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          就诊医院:
        </div>
      </template>
      {{ docInfo.param?.hosname }}
     </el-descriptions-item>
     <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          就诊科室:
        </div>
      </template>
      {{ docInfo.param?.depname }}
     </el-descriptions-item>
     <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          医生姓名:
        </div>
      </template>
      {{ docInfo.docname }}
     </el-descriptions-item>
     <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          医生职称:
        </div>
      </template>
      {{ docInfo.title }}
     </el-descriptions-item>
     <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          医生专长:
        </div>
      </template>
      {{ docInfo.skill }}
     </el-descriptions-item>
     <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          医事服务费:
        </div>
      </template>
      <span style="color: red;">{{ docInfo.amount }}</span>
     </el-descriptions-item>
   </el-descriptions>
   </el-card>
   <!-- 确认挂号按钮 -->
   <div class="btn">
    <el-button type="primary" :disabled="currentIndex == -1" @click="submitOrder">确认挂号</el-button>
   </div>
  </div>
</template>

<script setup lang='ts'>
import { User } from '@element-plus/icons-vue'
// 引入就诊人接口
import  { reqGetUser,reqDoctorInfo } from '@/api/hospital/index'
import { reqSubmitOrder } from '@/api/user/index'
import type { UserResponseData,UserArr,DoctorInfoData,Doctor } from '@/api/hospital/type'
import type { SubmitOrder } from '@/api/user/type'
import { onMounted,ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const $route = useRoute()
const $router = useRouter()
// 存储用户确定就诊人的索引值
const currentIndex = ref<number>(-1)
// 存储就诊人的信息
const userArr = ref<UserArr>([])
// 存储医生的信息
const docInfo = ref<Doctor>({})
// 获取就诊人信息
const fetchUserData = async () => {
  const result:UserResponseData = await reqGetUser()
  if(result.code == 200) {
    userArr.value = result.data
  }
}
// 获取医生信息
const fetchInfo = async () => {
  const result:DoctorInfoData = await reqDoctorInfo($route.query.docId)
  if(result.code == 200) {
    docInfo.value = result.data
  }
}
// 组件挂载时调用获取数据
onMounted(() => {
  // 获取就诊人信息
  fetchUserData()
  // 获取医生信息
  fetchInfo()
})
// 改变索引值
const changeIndex = (index:number) => {
  // 存储用户选择就诊人的信息
  currentIndex.value = index
}
// 确定挂号
const submitOrder = async () => {
  // 医院编号
  const hoscode = docInfo.value.hoscode
  // 医生id
  const scheduleId = docInfo.value.id
  // 就诊人的id
  const patientId = userArr.value[currentIndex.value].id
  
  const result:SubmitOrder = await reqSubmitOrder(hoscode,scheduleId,patientId)

  if(result.code == 200) {
    // 提交成功
    $router.push({ path: '/user/order',query: { orderId: result.data } })
  }else{
    // 提交失败
    ElMessage({
      type: 'error',
      message: '提交订单失败'
    })
  }
}
const goUser = () => {
  $router.push({ path: '/user/patient',query: { type: 'add' } })
} 
</script>

<style scoped lang='scss'>
.container{
  margin-left: 40px;
  .tip{
    font-weight: 900;
    font-size: 20px;
    color: #7f7f7f;
  }
  .box-card{
    margin-top: 40px;
    .card-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user{
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 32%;
        margin: 5px;
      }
    }
  }
  .btn{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>