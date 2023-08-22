import { type } from "os"

// 定义详情模块的ts类型
export interface ResponseData{
  code: number,
  message: string,
  ok: boolean
}
// 医院详情对象
export interface HospitalDetailObject{
  bookingRule: {
    cycle: number,
    releaseTime: string,
    stopTime: string,
    quitDay: number,
    quitTime: string,
    rule: string[]
  },
  hospital: {
    id: string,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
      hostypeString: string,
      fullAddress: string
    },
    hoscode: string,
    hosname: string,
    hostype: string,
    provinceCode: string,
    cityCode: string,
    districtCode: string,
    address: string,
    logoData: string,
    intro: string,
    route: string,
    status: number,
    bookingRule: null
  }
}
// 医院详情返回的数据
export interface HospitalDetail extends ResponseData{
  data:HospitalDetailObject
}
// 代表了医院科室的数据
export interface Department{
  depcode: string,
  depname: string,
  children?: Department[]
}
// 代表存储科室的数据类型
export type DepartmentArr = Department[]
// 获取科室接口返回数据类型
export interface DepartmentResponseData extends ResponseData{
  data: DepartmentArr
}
// 用户登录接口需要携带的参数
export interface loginData{
  phone: string,
  code: string
}
// 登录接口返回用户信息的接口
export interface UserInfo {
  name: string,
  token: string
}
// 登录接口返回的数据类型
export interface UserLoginResponseData{
  code: any
  data: UserInfo
}
// 定义微信登录扫码返回的数据类型
export interface WXLogin{
  redirectUri: string,
  appid: string,
  scope: string,
  state: string
}

export interface WXLoginResponseData extends ResponseData{
  data: WXLogin
}

export interface BaseMap {
  workDateString: string,
  releaseTime: string,
  bingname: string,
  stopTime: string,
  depname: string,
  hosname: string
}
export interface WorkDate{
  workDate: string,
  workDateMd: string,
  dayOfWeek: string,
  docCount: number,
  reservedNumber: null,
  availableNumber: number,
  status: number
}

export type  BookingScheduleList = WorkDate[]

export interface HospitalWordData extends ResponseData{
  data:{
    total: number,
    bookingScheduleList: BookingScheduleList,
    baseMap: BaseMap
  }
}
// 代表一个医生的数据
export interface Doctor{
  id: string,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
    dayOfWeek: string,
    depname: string,
    hosname: string
  },
  hoscode: string,
  depcode: string,
  title: string,
  docname: string,
  skill: string,
  workDate: string,
  workTime: number,
  reservedNumber: number,
  availableNumber: number,
  amount: number,
  status: number,
  hosScheduleId: string
}
// 数组包含全部医生
export type DocArr = Doctor[]
// 获取医生的排班数据接口
export interface DoctorResponseData extends ResponseData {
  data: DocArr
}
// 代表一个就诊人的数据类型
export interface User{
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
    certificatesTypeString: string,
    contactsCertificatesTypeString: string,
    cictyString: null,
    fullAddress: string,
    districtString: null,
    provinceString: null
  },
  userId: number,
  name: string,
  certificatesType: string,
  certificatesNo: string,
  sex: number,
  birthdate: string,
  phone: string,
  isMarry: number,
  provinceCode: null,
  cictyCode: null,
  address: string,
  contactsName: string,
  contactsCertificatesType: string,
  contactsCertificatesNo: string,
  contactsPhone: string,
  isInsure: number,
  cardNo: null,
  status: string
}
export type UserArr = User[]
export interface UserResponseData extends ResponseData{
  data: UserArr
}
// 获取一个医生挂号的详情
export interface DoctorInfoData extends ResponseData{
  data: Doctor
}