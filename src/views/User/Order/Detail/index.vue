<template>
  <div>
    <!-- 展示订单详情的结构 -->
    <el-card class="box-card">
    <template #header>
      <div class="detail">挂号详情</div>
    </template>
    <!-- 展示身体部分顶部的结构 -->
    <div class="top">
    <!-- 左侧标签 -->
      <el-tag class="ml-2" type="success">
        <div class="tag">
          <svg t="1690270944459" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2437" width="16" height="16"><path d="M392.533333 806.4L85.333333 503.466667l59.733334-59.733334 247.466666 247.466667L866.133333 213.333333l59.733334 59.733334L392.533333 806.4z" fill="#1afa29" p-id="2438"></path></svg>
          <span>{{ orderInfo.param?.orderStatusString }}</span>
        </div>
      </el-tag>
      <!-- 右侧二维码 -->
      <div class="right-info">
        <img src="../../../../assets/images/code_app.png" alt="">
        <div class="info">
          <p>微信 关注"北京114预约挂号"</p>
          <p>"快速预约挂号"</p>
        </div>
      </div>
    </div>
    <!-- 订单详情底部的结构 -->
    <div class="bottom">
      <div class="left">
        <el-descriptions class="margin-top" :column="1" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                就诊人信息
              </div>
            </template>
            {{ orderInfo.patientName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                就诊日期
              </div>
            </template>
           {{ orderInfo.reserveDate }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                就诊医院
              </div>
            </template>
            {{ orderInfo.hosname }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                就诊科室
              </div>
            </template>
            {{ orderInfo.depname }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                医生职称
              </div>
            </template>
            {{ orderInfo.title }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                医事服务费
              </div>
            </template>
           <span style="color: red;">{{ orderInfo.amount }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                 挂号单号
              </div>
            </template>
            {{ orderInfo.outTradeNo }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                挂号时间
              </div>
            </template>
            {{ orderInfo.createTime }}
          </el-descriptions-item>
        </el-descriptions>
        <div class="btn" v-if="orderInfo.orderStatus == -1 || orderInfo.orderStatus == 1">
          <el-popconfirm title="是否取消订单?" @confirm="cancel">
            <template #reference>
              <el-button>取消预约</el-button>
            </template>
          </el-popconfirm>
          <el-button type="primary" v-if="orderInfo.orderStatus == 0" @click="openDialog">支付</el-button>
        </div>
      </div>
      <div class="right">
        <el-card class="box-card">
           <template #header>
             <div class="card-header">
               <span>注意事项</span>
             </div>
           </template>
           <p>1.请确认就诊人信息是否正确,若填写错误将无法取号就诊,损失由本人承担;</p>
           <p style="color: red;">2.[取号]就诊当天需要在{{ orderInfo.fetchTime }}前取号,未取号视为爽约,改号不退不换;</p>
           <p>3.[退号]在{{ orderInfo.quitTime }}前可在线退号,逾期将不可办理退号退费;</p>
           <p>4.北京114预约挂号支持自费患者使用身份证预约,同时支持北京市医保患者使用北京社保卡在平台预约挂号.请于就诊当日,携带预约挂号所使用的有效身份证件到院取号</p>
           <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号.</p>
        </el-card>
      </div>
    </div>
    </el-card>
    <!-- 展示支付二维码的结构 -->
    <el-dialog v-model="dialogTableVisible" title="微信支付" width="400px" @close="close">
      <!-- 支付需要使用到的二维码图片 -->
      <div class="qrcode">
        <img :src="imgUrl" alt="">
        <p>请使用微信扫一扫</p>
        <p>扫码二维码支付</p>
      </div>
      <template #footer>
        <el-button type="primary" @click="closeDialog">关闭窗口</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { onMounted,ref } from 'vue'
import { reqOrderInfo,reqCancleOrder,reqQrcode,reqQueryPayState } from '@/api/user/index'
import type { OrderResponsedata,QrCode,PayResult } from '@/api/user/type'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
// 引入qrcode插件
import QRcode from 'qrcode'

const $route = useRoute()
// 存储展示的数据
const orderInfo = ref({})
// 图片地址
const imgUrl = ref<string>('')
// 定义响应式数据控制对话框的显示与隐藏
const dialogTableVisible = ref<boolean>(false)
// 存储定时器的引用
const timer = ref<any>('')
// 支付
const openDialog = async () => {
  // 展示对话框
  dialogTableVisible.value = true
  // 获取支付需要使用的二维码信息
  const result:QrCode = await reqQrcode($route.query.orderId)
  // 根据服务器返回的二维码信息生成二维码图片
  imgUrl.value = await QRcode.toDataURL(result.data.codeUrl)
  // 询问服务器当前这笔交易的支付结果
  // 只要二维码出来,需要每隔几秒询问服务器是否支付成功
  timer.value = setInterval(async () => {
    const result:PayResult = await reqQueryPayState($route.query.orderId)
    // 如果服务器返回的data为真,代表支付成功
    if(result.data) {
      // 关闭对话框
      dialogTableVisible.value = false
      // 提示信息
      ElMessage({
        type: 'success',
        message: '支付成功'
      })
      // 清除定时器
      clearInterval(timer.value)
      // 再次获取订单详情
      getOrderInfo()
    }
  },2000)
}
const closeDialog = () => {
  dialogTableVisible.value = false
  // 清除定时器
  clearInterval(timer.value)
}
// 关闭按钮
const close = () => {
  dialogTableVisible.value = false
  // 清除定时器
  clearInterval(timer.value)
}
// 组件挂在完毕
onMounted(() => {
  getOrderInfo()
})
// 获取订单详情
const getOrderInfo = async () => {
  const result:OrderResponsedata = await reqOrderInfo($route.query.orderId)
  
  if(result.code == 200) {
    orderInfo.value = result.data
  }
} 
// 取消订单
// 订单的状态有三种
// orderStatus -1->取消预约  0->预约了但是没有支付  1->支付成功
const cancel = async () => {
  try {
    // 取消预约成功之后
    await reqCancleOrder($route.query.orderId)
    // 再次获取订单数据
    getOrderInfo()
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '取消预约失败'
    })
  }
}
</script>

<style scoped lang='scss'>
.box-card{
  .detail{
    color: #7f7f7f;
    font-weight: 900;
  }
  .top{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #7f7f7f;
    .tag{
      display: flex;
      justify-content: center;
      align-items: center;
      span{
        margin-left: 5px;
      }
    }
    .right-info{
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 50px;
        height: 50px;
      }
      .info{
        margin-left: 10px;
        p{
          line-height: 30px;
          margin: 10px 0;
          font-size: 12px;
        }
      }
    }
  }
  .bottom{
    display: flex;
    margin-top: 20px;
    .left{
      flex:4;
      .btn{
          margin-top: 10px;
        }
    }
    .right{
      flex: 6;
      margin-left: 20px;
      p{
        line-height: 30px;
      }
    }
  }
}
::v-deep(.el-dialog__body){
  border-top: 1px solid #7f7f7f;
  border-bottom: 1px solid #7f7f7f;
}
.qrcode{
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    line-height: 30px;
  }
}
</style>