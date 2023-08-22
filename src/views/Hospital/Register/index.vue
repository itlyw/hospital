<template>
  <div class="register">
    <div class="top">
      <div class="title">{{ detailStore.hospitalInfo.hospital?.hosname }}</div>
      <div class="level">
        <svg t="1689751140256" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2318" width="16" height="16"><path d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z" p-id="2319"></path></svg>
        <span>{{ detailStore.hospitalInfo.hospital?.param.hostypeString }}</span>
      </div>
    </div>
    <!-- 展示内容区域 -->
    <div class="content">
      <div class="left">
        <img :src="`data:image/jpeg;base64,${ detailStore.hospitalInfo.hospital?.logoData }`" alt="">
      </div>
      <div class="right">
        <div>挂号规则</div>
        <div class="time">
          预约周期:10天 放号时间:{{ detailStore.hospitalInfo.bookingRule?.releaseTime }} 停挂时间:{{ detailStore.hospitalInfo.bookingRule?.stopTime }}
        </div>
        <div class="address">
          具体位置：{{ detailStore.hospitalInfo.hospital?.param.fullAddress }}
        </div>
        <div class="route">
          具体的路线：{{ detailStore.hospitalInfo.hospital?.route }}
        </div>
        <div class="releaseTime">
          退号时间:就诊前一工作日{{ detailStore.hospitalInfo.hospital?.quitTime }}前取消
        </div>
        <div class="rule">医院预约规则</div>
        <div class="ruleInfo" v-for="(item,index) in detailStore.hospitalInfo.bookingRule?.rule" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
    <h1>选择科室</h1>
    <!-- 放置医院各个科室的数据 -->
    <div class="department">
      <div class="left-nav">
        <ul>
          <li v-for="(department,index) in detailStore.departmentArr" :key="department.depcode" :class="{ active : currentIndex == index }" @click="changeIndex(index)">{{ department.depname }}</li>
        </ul>
      </div>
      <div class="department-content">
        <!-- 用一个div代表一个大科室和一个小科室 -->
        <div class="showDepartment" v-for="department in detailStore.departmentArr" :key="department.depcode">
          <h1 class="cur">{{ department.depname }}</h1>
          <!-- 每一个大的科室下的小科室 -->
          <ul>
            <li @click="showLogin(item)" v-for="item in department.children" :key="item.depcode">{{ item.depname }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useRouter,useRoute } from 'vue-router'
import useDetailStore  from '@/store/modules/hospitalDetail'
// import useUserStore from '@/store/modules/user'
import { ref } from 'vue'
// 定义仓库
const detailStore = useDetailStore()
const $router = useRouter()
const $route = useRoute()
// const userStore = useUserStore()
// 控制科室高亮的响应式数据
let currentIndex = ref<number>(0)

// 改变索引值
const changeIndex = (index:number) => {
  currentIndex.value = index
  // 点击导航获取右侧科室（大的科室的h1标题）
  const allH1 = document.querySelectorAll('.cur')
  // 滚动到对应科室的位置
  allH1[currentIndex.value].scrollIntoView({ behavior: 'smooth' })
}

// 点击科室的按钮回调
// item即为点中科室的数据
const showLogin = (item:any) => {
  // userStore.visiable = true
  // 点击某一个医院科室按钮，进入到相应的预约挂号详情页面
  $router.push({ path:'/hospital/register_step1',query: { hoscode: $route.query.hoscode,depcode: item.depcode } })
} 
</script>

<style scoped lang='scss'>
.register{
  margin-left: 40px;
  .top{
    display: flex;
    .title{
      font-size: 30px;
    }
    .level{
      color: #7f7f7f;
      margin-left: 10px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      span{
        margin-left: 10px;
      }
    }
  }
  .content{
    display: flex;
    margin-top: 40px;
    .left{
      width: 80px;
      img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .right{
      flex: 1;
      font-size: 14px;
      margin-left: 40px;
      .time{
        margin-top: 10px;
        color: #7f7f7f;
      }
      .address{
        margin-top: 10px;
        color: #7f7f7f;
      }
      .route{
        margin-top: 10px;
        color: #7f7f7f;
        line-height: 30px;
      }
      .releaseTime{
        margin-top: 10px;
        color: #7f7f7f;
      }
      .rule{
        margin: 10px 0;
      }
      .ruleInfo{
        margin-top: 10px;
        color: #7f7f7f;
      }
    }
  }
  h1{
    margin: 20px 0;
  }
  .department{
    width: 100%;
    height: 500px;
    display: flex;
    margin-top: 20px;
    .left-nav{
      width: 80px;
      height: 100%;
      ul{
        width: 100%;
        height: 100%;
        background-color: rgb(248,248,248);
        display: flex;
        flex-direction: column;
        li{
          flex: 1;
          text-align: center;
          color: #7f7f7f;
          font-size: 14px;
          line-height: 40px;
          &.active{
            border-left: 2px solid rgb(119, 197, 231);
            color: rgb(119, 197, 231);
            background-color: white;
          }
        }
      }
    }
    .department-content{
      flex: 1;
      margin-left: 40px;
      height: 100%;
      overflow: auto;
      &::-webkit-scrollbar{
        display: none;
      }
      .showDepartment{
        h1{
          background-color: rgb(248,248,248);
          color: #7f7f7f;
          border-left: 4px solid rgb(113, 173, 225);
          padding-left: 5px ;
          line-height: 30px;
        }
        ul{
          display: flex;
          flex-wrap: wrap;
          li{
            width: 33%;
            color: #7f7f7f;
            line-height: 30px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>