// 定义小仓库
import { defineStore } from "pinia"
import { reqHospitalDetail,reqHospitalDepartment } from '@/api/hospital/index'
import type { HospitalDetail,DepartmentResponseData } from "@/api/hospital/type"
import type { DetailState } from '@/store/modules/interface/index'

// pinia有两种写法，组合式API和选择式API
const useDetailStore = defineStore('Detail',{
  state: ():DetailState => {
    return {
      // 医院详情的数据
      hospitalInfo:({} as HospitalDetail),
      // 存储医院科室
      departmentArr: []
    }
  },
  actions:{
    // 获取医院详情的数据
    async getHospital(hoscode:string) {
      const result:HospitalDetail = await reqHospitalDetail(hoscode)
      if(result.code == 200) {
        this.hospitalInfo = result.data
      }
    },
    // 获取医院科室的数据
    async getDepartment(hoscode:string) {
      const result:DepartmentResponseData = await reqHospitalDepartment(hoscode)
      if(result.code == 200) {
        this.departmentArr = result.data
      }
    }
  },
  getters:{}
})

// 获取仓库的方法要对外暴露
export default useDetailStore