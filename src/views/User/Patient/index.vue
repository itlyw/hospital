<template>
  <!-- 就诊人静态结构 -->
    <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>就诊人管理</span>
        <el-button type="success" :icon="User" @click="addUser">添加就诊人</el-button>
      </div>
    </template>
    <!-- 就诊人管理模块展示就诊人信息的结构 -->
    <div class="visitors" v-if="scene == 0">
      <Visitor @changeScene="changeScene" @removeUser="removeUser" class="item" v-for="(user,index) in userArr" :key="user.id" :user="user" :index="index"></Visitor>
    </div>
    <!-- 添加就诊人|修改已有的就诊人信息结构 -->
    <div class="form" v-if="scene == 1">
      <el-divider content-position="left">就诊人信息</el-divider>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input placeholder="请你输入用户姓名" v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select placeholder="请你选择证件类型" style="width: 100%;" v-model="userParams.certificatesType">
            <el-option :label="item.name" v-for="item in certationArr" :key="item.id" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="请你输入证件号码" v-model="userParams.certificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="userParams.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
          v-model="userParams.birthdate"
          value-format="YYYY-MM-D"
          type="date"
          placeholder="请选择出生日期"
          size="default"
        />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请你输入手机号码" v-model="userParams.phone"></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">建档信息（完善后部分医院首次就诊不排队建档）</el-divider>
      <el-form>
        <el-form-item label="婚姻状况">
          <el-radio-group v-model="userParams.isMarry">
            <el-radio :label="1">已婚</el-radio>
            <el-radio :label="0">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保">
          <el-radio-group v-model="userParams.isInsure">
            <el-radio :label="1">自费</el-radio>
            <el-radio :label="0">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前住址">
          <el-cascader :props="props" v-model="userParams.addressSelect"/>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input placeholder="请你输入用户详细地址" v-model="userParams.address"></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">联系人信息（选填）</el-divider>
      <el-form label-width="80px">
        <el-form-item label="用户姓名">
          <el-input placeholder="请你输入用户姓名" v-model="userParams.contactsName"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select placeholder="请你选择证件类型" style="width: 100%;" v-model="userParams.contactsCertificatesType">
            <el-option :label="item.name" v-for="item in certationArr" :key="item.id" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="请你输入证件号码" v-model="userParams.contactsCertificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请你输入手机号码" v-model="userParams.contactsPhone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="submit">提交</el-button>
          <el-button type="primary" size="default" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup lang='ts'>
import { useRoute,useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User } from '@element-plus/icons-vue'
import type { CascaderProps } from 'element-plus'
import { reqGetUser } from '@/api/hospital/index'
import { reqCertationType,reqCity,reqAddOrUpdateUser } from '@/api/user/index'
import type { CertationnTypeResponseData,AddOrUpdateUser,CertationType } from '@/api/user/type'
import type { UserResponseData,UserArr } from '@/api/hospital/type'
import { onMounted,ref,reactive,watch } from 'vue'
// 获取路由器
const $route = useRoute()
const $router = useRouter()
// 存储全部就诊人信息
const userArr = ref<UserArr>([])
// 存储证件类型的数据
const certationArr = ref<CertationType>([])
// 定义响应式数据，决定卡片显示的内容
const scene = ref<number>(0)
// 收集就诊人的数据
const userParams = reactive<AddOrUpdateUser>({
  name: '',
  certificatesNo: '',
  certificatesType: '',
  sex: 0,
  birthdate: '',
  phone: '',
  isMarry: 0,
  isInsure: 0,
  address: '',
  addressSelected: [],
  contactsName: '',
  contactsCertificatesType: '',
  contactsCertificatesNo: '',
  contactsPhone: ''
})
// 组件挂载完毕获取就诊人信息
onMounted(() => {
  // 获取就诊人信息
  getUser()
  // 获取证件类型
  getCertationType()
  // 判断当前这个路由组件是不是从挂号组件而来，路径上是否带了type=add参数
  if($route.query.type == 'add') {
    scene.value = 1
  }
  if($route.query.type == 'edit') {
    scene.value = 1
  }
})
// 获取证件类型
const getCertationType = async () => {
  const result:CertationnTypeResponseData = await reqCertationType()
  if(result.code) {
    certationArr.value = result.data
  }
}
// 获取就诊人信息方法
const getUser = async () => {
  const result:UserResponseData = await reqGetUser()
  if(result.code == 200) {
    userArr.value = result.data
  }
}
// 添加就诊人
const addUser = () => {
  // 点击之前清空数据
  reset()
  scene.value = 1
}
// 清空数据
const reset = () => {
  Object.assign(userParams,{
    id: null,
    name: '',
    certificatesNo: '',
    certificatesType: '',
    sex: 0,
    birthdate: '',
    phone: '',
    isMarry: 0,
    isInsure: 0,
    address: '',
    addressSelected: [],
    contactsName: '',
    contactsCertificatesType: '',
    contactsCertificatesNo: '',
    contactsPhone: ''
  })
}
// 就诊人子组件自定义事件的回调
const changeScene = (user:AddOrUpdateUser) => {
  // 切换场景
  scene.value = 1
  // 收集用户数据
  Object.assign(userParams,user)
}
// 级联
const props:CascaderProps = {
  // 开启懒加载
  lazy: true,
  async lazyLoad(node: any, resolve: (arg0: any) => void) {
    // 加载数据的方法
    const result = await reqCity(node.data.id ||'86')
    // 整理数据
    const showData = result.data.map((item:any) => {
      return {
        label: item.name,
        value: item.value,
        leaf: !item.hasChildren,
        id: item.id
      }
    })
     // 注入组件需要展示的数据
     resolve(showData)
  },
}
// 提交的点击事件
const submit = async () => {
    // 更新或者新增就诊人信息
    const result = await reqAddOrUpdateUser(userParams)
    if(result.code == 200) {
      ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '新增成功'
    })
    // 切换场景为0
    if($route.query.type == 'add'){
      $router.back()
    }else{
      scene.value = 0
    }
    // 再获取全部就诊人的信息
    getUser()
    }else{
    // 提交失败
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '新增失败'
    })
    }
}
// 监听全部就诊人的数据变化
watch(() => userArr.value,() => {
  if($route.query.type == 'edit') {
    const user = userArr.value.find((item:any) => {
      return item.id == $route.query.id 
    })
    Object.assign(userParams,user)
  }
})
// 子组件的自定义事件
const removeUser = () => {
  getUser()
}
</script>

<style scoped lang='scss'>
.box-card{
  .card-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .visitors{
    display: flex;
    flex-wrap: wrap;
    .item{
      width: 32%;
      margin: 5px;
    }
  }
  .form{
   ::v-deep(.el-form){
      width: 60%;
      margin: 10px auto;
    }
  }
}
</style>