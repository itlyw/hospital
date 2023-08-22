<template>
  <div class="visitor">
    <div class="top">
      <div class="left">
        <span class="free">{{ user.isInsure == 1 ? '医保': '自费' }}</span>
        <span class="username">{{ user.name }}</span>
      </div>
      <div class="right">
        <el-button type="primary" :icon="Edit" @click="handler" circle></el-button>
        <el-popconfirm  width="200px" :title="`你确定要删除${ user.name }吗？`" @confirm="removeUser">
          <template #reference>
            <el-button type="danger" :icon="Delete"  v-if="$route.path == '/user/patient'" circle></el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="bottom">
      <p>证件类型：{{ user.param.certificatesTypeString }}</p>
      <p>证件号码：{{ user.certificatesNo }}</p>
      <p>用户性别：{{ user.sex == 0 ? '女': '男' }}</p>
      <p>出生日期：{{ user.birthdate }}</p>
      <p>手机号码吗：{{ user.phone }}</p>
      <p>婚姻状况：{{ user.isMarry == 0 ? '未婚' : '已婚' }}</p>
      <p>当前住址：{{ user.param.cityString }}</p>
      <p>当前住址： {{ user.param.fullAddress }}</p>
      <!-- 红色的已选择的盒子 -->
      <transition name="confirm">
        <div class="confirm" v-if="index == currentIndex">已选择</div>
      </transition>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useRoute,useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Edit,Delete } from '@element-plus/icons-vue'
import { reqDeleteUser } from '@/api/user/index'
const $route = useRoute()
const $router = useRouter()
// 接收父亲传来的值
const props = defineProps(['user','index','currentIndex'])
const $emit = defineEmits(['changeScene','removeUser'])
// 点击编辑按钮
const handler = () => {
  // 要么是就诊人管理模块点击修改按钮
  // 要么预约挂号点击修改按钮
  if($route.path == '/user/patient') {
    $emit('changeScene',props.user)
  }else{
    // 路由跳转且携带参数
    $router.push({ path: '/user/patient',query: { type: 'edit',id: props.user.id } })
  }
}
// 删除就诊人信息
const removeUser = async () => {
  const result = await reqDeleteUser(props.user.id)
  if(result.code == 200){
    $emit('removeUser')
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
  }else{
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}
</script>
<style scoped lang='scss'>
.visitor{
  box-shadow: 0px 0px 12px rgb(0,0,0,0.12);
  .top{
    height: 50px;
    background-color: #e5e5e5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left{
      .free{
        background-color: white;
        padding: 3px;
        font-size: 12px;
        margin-right: 5px;
      }
      .username{
        color: #7f7f7f;
      }
    }
  }
  .bottom{
    padding: 20px;
    position: relative;
    p{
      line-height: 30px;
    }
    .confirm{
      position: absolute;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      color: red;
      border: 1px dashed red;
      text-align: center;
      line-height: 200px;
      left: 20%;
      top: 20%;
      opacity: 0.5;
      transform: rotate(35deg);
      font-weight: 900;
      font-size: 20px;
    }
    .confirm-enter-from{
      transform: scale(1);
    }
    .confirm-enter-active{
      transition: all 0.3s;
    }
    .confirm-enter-to{
      transform: scale(1.1);
    }
  }
}
</style>