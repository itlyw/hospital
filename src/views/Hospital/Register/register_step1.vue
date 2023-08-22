<template>
  <div class="warp">
    <!-- 顶部结构 -->
    <div class="top">
      <div class="hosname">{{ workData.baseMap?.hosname }}</div>
      <div class="line">|</div>
      <div>{{ workData.baseMap?.bigname }}</div>
      <div class="dot">·</div>
      <div class="hosdepartment">{{ workData.baseMap?.depname }}</div>
    </div>
    <!-- 中间展示日期结构 -->
    <div class="center">
      <h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
      <div class="container">
        <div class="item" v-for="item in workData.bookingScheduleList" :key="item"
         :class="{ active : item.status == -1 || item.availableNumber == -1,cur : item.workDate == workTime.workDate }" @click="changeTime(item)">
          <div class="con-top">{{ item.workDate }}-{{ item.dayOfWeek }}</div>
        <div class="con-bottom">
          <div v-if="item.status == -1">停止挂号</div>
          <div v-if="item.status == 0">
            {{ item.availableNumber == -1 ? '约满了' : `有号${ item.availableNumber }` }}
          </div>
          <div v-if="item.status == 1">即将放号</div>
        </div>
        </div>
      </div>
      <el-pagination layout="prev, pager, next" :total="workData.total"  v-model:current-page="pageNo" @current-change="fetchWorkData"/>
    </div>
    <!-- 底部展示医生的结构 -->
    <div class="bottom">
      <!-- 展示即将放号的时间 -->
      <div class="will" v-if="workTime.status == 1">
        <span>2023年2月25日8:20</span>
        <span>放号</span>
      </div>
      <!-- 展示医生的结构：上午，下午 -->
      <div class="doctor" v-else>
        <div class="morning">
          <!-- 顶部文字的提示 -->
          <div class="tip">
            <svg t="1690116949997" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1533" width="32" height="32"><path d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z" fill="#96c9e3" p-id="1534"></path></svg>
            <span class="text">上午号源</span>
          </div>
          <!-- 每一个医生的信息 -->
          <div class="doc-info" v-for="doctor in morningArr" :key="doctor.id">
            <!-- 医生的名字技能等 -->
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">
              {{ doctor.skill }}
              </div>
            </div>
            <!-- 右侧区域展示挂号的钱数 -->
            <div class="right">
              <div class="money">￥{{ doctor.amount }}</div>
              <el-button type="primary" @click="goStep(doctor)">剩余{{ doctor.availableNumber }}</el-button>
            </div>
          </div>
        </div>
        <div class="morning">
          <!-- 顶部文字的提示 -->
          <div class="tip">
            <svg t="1690168882128" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2042" width="32" height="32"><path d="M418.857773 926.454686c-216.541566 0-392.66505-176.123484-392.66505-392.66505v-62.998015c0-18.741345 15.128556-33.869901 33.869901-33.869901h717.590298c18.741345 0 33.869901 15.128556 33.8699 33.869901v62.998015c0 216.541566-176.123484 392.66505-392.665049 392.66505zM93.932525 504.661521v29.128115c0 179.058875 145.866373 324.925248 324.925248 324.925248 179.058875 0 324.925248-145.866373 324.925248-324.925248v-29.128115H93.932525z" fill="#96c9e3" p-id="2043"></path><path d="M588.658875 987.646307H264.185226c-18.741345 0-33.869901-15.128556-33.869901-33.869901s15.128556-33.869901 33.869901-33.869901h324.473649c18.741345 0 33.869901 15.128556 33.869901 33.869901s-15.128556 33.869901-33.869901 33.869901zM837.489746 768.16935c-30.031312 0-63.675413-7.451378-100.706505-24.837928a34.00538 34.00538 0 0 1-16.257552-45.159867c7.902977-16.93495 28.224917-24.160529 45.159868-16.257553 104.545094 49.224256 150.833958-15.354355 162.575523-36.353693 23.257332-41.547078 19.644542-91.674531-7.902976-109.28688-15.805954-10.16097-29.805513-13.096362-44.030871-9.483572-32.740904 8.580375-60.514223 50.353252-68.4172 65.707607-8.580375 16.483352-28.902315 23.257332-45.611466 14.676957a33.598942 33.598942 0 0 1-14.676957-45.385667c4.290187-8.354576 43.579272-82.190959 111.093274-100.254906 32.966703-8.806174 67.062404-2.709592 98.674311 18.063947 58.03043 37.70849 71.352591 125.318633 30.031312 199.155016-26.418523 47.192062-77.900772 89.416538-149.930761 89.416539zM218.799559 417.051378c-11.515766 0-22.805733-5.870783-29.128115-16.709151-1.806395-3.161191-44.708269-78.35237-0.225799-156.704741 12.644763-22.128335 16.031753-76.320176 2.709592-93.932525-11.515766-14.902756-8.580375-36.127894 6.322382-47.417861s36.127894-8.580375 47.417861 6.322382c34.321499 44.934068 24.386329 129.83462 2.483792 168.446306-24.837927 44.030871-1.128997 87.610143 0 89.416538 9.031974 16.257552 3.38699 36.805292-12.644763 46.063065-5.419184 2.935391-11.064168 4.515987-16.93495 4.515987zM360.149945 417.051378c-11.515766 0-22.805733-5.870783-29.128115-16.709151-1.806395-3.161191-44.708269-78.35237-0.225799-156.704741 12.418964-22.128335 16.031753-76.094377 2.483793-93.932525a33.802161 33.802161 0 1 1 53.740242-41.095479c34.321499 44.934068 24.386329 129.83462 2.483793 168.446306-24.837927 44.030871-1.128997 87.610143 0 89.416538 9.031974 16.257552 3.38699 36.805292-12.644763 46.063065-5.193385 2.935391-10.838368 4.515987-16.709151 4.515987zM504.435722 417.051378c-11.515766 0-22.805733-5.870783-29.128115-16.709151-1.806395-3.161191-44.708269-78.35237-0.225799-156.704741 12.418964-22.128335 16.031753-76.094377 2.483793-93.706725a33.802161 33.802161 0 1 1 53.740242-41.09548c34.321499 44.934068 24.386329 129.83462 2.483793 168.446307-24.837927 44.030871-1.128997 87.610143 0 89.416538 9.031974 16.257552 3.38699 36.805292-12.644763 46.063065-5.193385 2.709592-11.064168 4.290187-16.709151 4.290187z" fill="#96c9e3" p-id="2044"></path><path d="M92.12613 715.558104c-10.838368 0-21.450937-5.193385-27.999118-14.676957-10.612569-15.354355-6.77398-36.353693 8.580375-46.966263 6.77398-4.741786 170.478501-115.835061 358.569349-41.547078 146.995369 58.03043 272.314002 4.515987 319.506064-21.225138a33.960221 33.960221 0 1 1 32.515105 59.611025c-55.320838 30.257111-203.219405 93.255127-376.859096 24.837928-153.76935-60.740022-293.764939 33.192503-295.119735 34.321499-5.870783 3.612789-12.644763 5.644983-19.192944 5.644984z" fill="#96c9e3" p-id="2045"></path></svg>
            <span class="text">下午号源</span>
          </div>
          <!-- 每一个医生的信息 -->
          <div class="doc-info" v-for="doctor in afterArr" :key="doctor.id">
            <!-- 医生的名字技能等 -->
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">
              {{ doctor.skill }}
              </div>
            </div>
            <!-- 右侧区域展示挂号的钱数 -->
            <div class="right">
              <div class="money">￥{{ doctor.amount }}</div>
              <el-button type="primary" @click="goStep(doctor)">剩余{{ doctor.availableNumber }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted,ref,computed } from 'vue'
import { reqHospitalWork,reqHospitalDoctor } from '@/api/hospital/index'
import { HospitalWordData,DoctorResponseData,DocArr,Doctor } from '@/api/hospital/type'
import { useRoute,useRouter } from 'vue-router'
// 获取路由实例
const $route = useRoute()
// 获取路由器对象
const $router = useRouter()
// 分页器当前页码
const pageNo = ref<number>(1)
// 每一页展示几条数据
const limit = ref<number>(6)
// 存储医院挂号的数据
const workData = ref({})
// 存储排班日期，当前数据的第一个
const workTime = ref({})
// 存储排班医生的数据
const docArr = ref<DocArr>([])
// 点击某一天的回调
const changeTime = (item: any) => {
  workTime.value = item
  getDoctorWorkData()
}
// 获取某一天医生排班的数据
const getDoctorWorkData = async () => {
  // 医院的编号
  const hoscode:string =$route.query.hoscode
  // 科室的编号
  const depcode:string = $route.query.depcode
  // 时间
  const workDate:string = workTime.value.workDate 
  // 获取医生的数据
  const result:DoctorResponseData = await reqHospitalDoctor(hoscode,depcode,workDate)
  if(result.code == 200) {
    docArr.value = result.data
  }  
}
// 获取挂号的方法
const fetchWorkData = async () => { 
  const result:HospitalWordData = await reqHospitalWork(pageNo.value,limit.value,$route.query.hoscode,$route.query.depcode)
  if(result.code == 200) {
    workData.value = result.data
    // 存储第一天的数据
    workTime.value = workData.value.bookingScheduleList[0]
    // 获取一次医生的数据
    getDoctorWorkData()
  }
}
// 组件挂在完毕，发送请求
onMounted(() => {
  fetchWorkData()
})
// 计算出上午排班的数据
const morningArr = computed(() => {
  return docArr.value.filter((doc:Doctor) => {
    return doc.workTime == 0
  })
})
// 计算出下午的排班
const afterArr = computed(() => {
  return docArr.value.filter((doc:Doctor) => {
    return doc.workTime == 1
  })
})
// 路由跳转
const goStep = (doctor:Doctor) => {
  $router.push({ path: '/hospital/register_step2',query:{ docId: doctor.id } })
} 
</script>

<style scoped lang='scss'>
.warp{
  margin-left: 40px;
  .top{
    display: flex;
    color: #7f7f7f;
    .line{
      width: 3px;
      height: 100%;
      margin: 0 5px;
    }
    .dot{
      width: 3px;
      height: 100%;
      margin: 0 5px;
    }
  }
  .center{
    margin: 30px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    .time{
      font-weight: 900;
    }
    .container{
      display: flex;
      width: 100%;
      margin: 30px 0;
      .item{
        flex: 1;
        border: 1px solid skyblue;
        margin: 0 5px;
        transition: all 0.5s;
        &.active{
          border: 1px solid #ccc;
          color: #7f7f7f;
          .con-top{
            background-color: #ccc;
          }
        }
        &.cur{
          transform: scale(1.1);
        }
        .con-top{
          background-color: #e8f2ff;
          width: 100%;
          height: 30px;
          text-align: center;
          line-height: 30px;
        }
        .con-bottom{
          width: 100%;
          height: 50px;
          text-align: center;
          line-height: 50px;
        }
      }
    }
 }
 .bottom{
  .will{
    text-align: center;
    font-weight: 700;
    font-size: 25px;
    color: rgb(96, 94, 94);
  }
  .doctor{
    .morning{
      .tip{
        display: flex;
        align-items: center;
        .text{
          color: #7f7f7f;
          font-weight: 800;
        }
      }
      .doc-info{
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
        border-bottom: 1px solid #ccc;
        .left{
          .info{
            color: skyblue;
            margin: 10px 0;
            span{
              margin: 0 5px;
              font-weight: 600;
              font-size: 18px;
           }
          }
          .skill{
            margin: 10px 0;
            color: #7f7f7f;
          }
        }
        .right{
          width: 150px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .money{
            color: #7f7f7f;
            font-weight: 900;
          }
        }
      }
    }
  }
 }
}
</style>