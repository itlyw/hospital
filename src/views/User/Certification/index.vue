<template>
    <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h1>实名信息</h1>
      </div>
    </template>
    <div class="tip">
      <p><el-icon><InfoFilled /></el-icon>完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</p>
    </div>
    <!-- 卡片身体的底部,已验证后 -->
    <el-descriptions size="small" class="margin-top" :column="1" border v-if="userInfo.authStatus == 1">
      <el-descriptions-item label-align="center" :width="20">
        <template #label>
          <div class="cell-item">
            用户姓名
          </div>
        </template>
        {{ userInfo.name }}
      </el-descriptions-item>
      <el-descriptions-item label-align="center" :width="20">
        <template #label>
          <div class="cell-item">
            证件类型
          </div>
        </template>
        {{ userInfo.certificatesType == '10' ? '身份证' : '户口本'}}
      </el-descriptions-item>
      <el-descriptions-item label-align="center" :width="20">
        <template #label>
          <div class="cell-item">
            证件号
          </div>
        </template>
        {{ userInfo.certificatesNo }}
      </el-descriptions-item>
    </el-descriptions>
    <!-- 未验证的结构 -->
    <el-form style="width: 60%;margin: 20px auto;" label-width="80px"  :model="params"  :rules="rules" ref="formRef" v-else>
      <el-form-item label="用户姓名" prop="name"> 
        <el-input placeholder="请输入用户的姓名" v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="certificatesType">
        <el-select placeholder="请选择证件类型" style="width:100%" v-model="params.certificatesType">
          <el-option  v-for="(item,index) in arrType" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="certificatesNo"> 
        <el-input placeholder="请输入用户的证件号码" v-model="params.certificatesNo"></el-input>
      </el-form-item>
      <el-form-item label="上传证件" prop="certificatesUrl">
        <!-- action向服务器提交数据的路径 -->
        <!-- limit照片的数量 -->
        <!-- on-exceed:超出约束数量的钩子 -->
        <!-- :on-success成功的回调 -->
        <el-upload list-type="picture-card" :on-exceed="exceedhandler" ref="uploadRef"
        :on-success="successhandler" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
         :limit="1" action="/api/oss/file/fileUpload?fileHost=userAuah">
         <img  style="width:100%;height:100%" src="../../../assets/images/auth_example.png" alt="">
       </el-upload>
       <el-dialog v-model="dialogVisible">
         <img w-full :src="params.certificatesUrl" v-if="params.certificatesUrl" style="width: 100%;height: 100%;" alt="Preview Image" />
       </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="submit">提交</el-button>
        <el-button type="primary" size="default" @click="reset">重写</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang='ts'>
import { InfoFilled } from '@element-plus/icons-vue'
import type { UserParams,UserInfoResponseData,CertationnTypeResponseData,CertationArr } from '@/api/user/type'
import { reqUserInfo,reqCertationType,reqUserCertation } from '@/api/user/index'
import { onMounted,ref,reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 定义用户信息
const userInfo = ref<any>({})
// 证件类型
const arrType = ref<CertationArr>([])
// 获取上传文件的实例
const uploadRef = ref()
// 定义对话框的显示与隐藏
const dialogVisible = ref<number>(false)
// 获取form组件
const formRef =ref()
// 收集用户表单填写的信息
const params = reactive<UserParams>({
  certificatesNo: '',
  certificatesType: '',
  certificatesUrl: '',
  name: ''
})
// 名字自定义校验规则
const validatorName = (rule: any, value: any, callback: any) => {
  const reg = /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/ 
  if(reg.test(value)) {
    callback()
  }else {
    callback(new Error('请输入正确的中文名字'))
  }
}
// 身份证类型校验规则
const validatorcertificatesType = (rule: any, value: any, callback: any) => {
  if(value == '10' || value == '20') {
    callback()
  }else {
    callback(new Error('请选择证件类型'))
  }
}
// 证件号码校验规则
const validatorcertificatesNo = (rule: any, value: any, callback: any) => {
  const regId = /^(^\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/ 
  const regNo = /^\d{9}$/
  if(regId.test(value) || regNo.test(value)) {
    callback()
  }else {
    callback(new Error('请输入正确的身份证或者是户口本号码'))
  }
}
// 证件照校验规则
const validatorcertificatesUrl = (rule: any, value: any, callback: any) => {
  if(value.length) {
    callback()
  }else{
    callback(new Error('去上传证件照片'))
  }
}
// 自定义表单校验规则
const rules = {
  name: [ { required: true, validator:validatorName } ],
  certificatesType: [ { required: true, validator:validatorcertificatesType } ],
  certificatesNo: [ { required: true, validator:validatorcertificatesNo } ],
  certificatesUrl: [ { required: true, validator:validatorcertificatesUrl } ]
}
// 获取用户信息的方法
const getUserInfo = async () => {
  const result:UserInfoResponseData = await reqUserInfo()
  if(result.code == 200) {
    userInfo.value = result.data
  }
}
const getType = async () => {
  const result:CertationnTypeResponseData = await reqCertationType()
  if(result.code == 200) {
    arrType.value = result.data
  }
}
// 组件挂载完毕
onMounted(() => {
  // 获取用户信息
  getUserInfo()
  // 获取证件类型接口
  getType()
})
// 超出数量限制时的钩子函数
const exceedhandler = () => {
  ElMessage({
    type: 'error',
    message: '图片只能上传一张'
  })
}
// 成功的回调
const successhandler = (response: any) => {
  // 如果上传成功，校验结果清除
  formRef.value.clearValidate('certificatesUrl')
  // 上传成功的地址
  // response是上传成功返回的数据
  // uploadFile是图片的对象
  params.certificatesUrl = response.data
}
// 预览
const handlePictureCardPreview = () => {
  dialogVisible.value = true
}
// 删除上传图片
const handleRemove = () => {
  params.certificatesUrl = ''
}
// 重写按钮的回调
const reset = () => {
  // 清除文件的列表
  uploadRef.value.clearFiles()
  // 清空数据
  Object.assign(params,{
  certificatesNo: '',
  certificatesType: '',
  certificatesUrl: '',
  name: ''
})
}
// 提交按钮
const submit = async () => {
  // 进行全部的表单校验
  // 如果有一个表单校验失败返回的是一个失败的promise对象，后面的语句不再执行
  await formRef.value.validate()
  try {
    // 认证成功
    await reqUserCertation(params)
    // 提示
    ElMessage({
      type: 'success',
      message: '认证成功'
    })
    // 认证成功之后再次获取用户信息
    getUserInfo()
  } catch (error) {
    // 认证失败
    ElMessage({
      type: 'error',
      message: '认证失败'
    })
  }
} 
</script>

<style scoped lang='scss'>
.box-card{
  .tip{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #7f7f7f;
    margin-bottom: 20px;
  }
}
</style>