// 统一管理首页模块的接口
import request from "@/utils/request"
import type { HospitalResponseData,HospitalLevelAndRegionResponseData,HospitalInfo } from '@/api/home/type'

// 通过枚举去管理首页模块的接口地址
enum API {
  // 获取枚举管理首页模块的接口地址
  HOSPITAL_URL = '/hosp/hospital/',
  // 获取地区和医院等级
  HOSPITALLEVELANDREGION_URL =  '/cmn/dict/findByDictCode/',
  // 根据关键字医院的名字获取医院信息
  HOSPITALINFO_URL = '/hosp/hospital/findByHosname/'
}

// 获取首页信息
export const reqHospital = (page:number,limit:number,hostype='',districtCode='') => request.get<any,HospitalResponseData>(API.HOSPITAL_URL + `${ page }/${limit}?hostype=${ hostype }&districtCode=${ districtCode }`)
// 获取医院的等级或者是获取医院的数据
export const reqHospitalLevelAndRegion = (dictCode:string) => request.get<any,HospitalLevelAndRegionResponseData>(API.HOSPITALLEVELANDREGION_URL + dictCode)
// 根据关键字医院的名字获取医院信息数据
export const reqHospitalInfo = (hosname:string) => request.get<any,HospitalInfo>(API.HOSPITALINFO_URL + hosname)