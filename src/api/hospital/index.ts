// 引入axios二次封装
import request from "@/utils/request"
// 引入接口类型
import type { HospitalDetail,UserResponseData,DepartmentResponseData,loginData,UserLoginResponseData,WXLoginResponseData,HospitalWordData,DoctorResponseData,DoctorInfoData } from '@/api/hospital/type'

// 定义接口路径
enum API {
  HOSPITALDETAIL_URL = '/hosp/hospital/',
  // 获取某一个医院科室的数据
  HOSPITALDEPARTMENT_URL = '/hosp/hospital/department/',
  // 获取验证码接口
  GETUSERCODE_URL = '/sms/send/',
  // 用户登录接口
  USERLOGIN_URL= '/user/login',
  // 获取微信扫码登录需要参数
  WXLOGIN_URL = '/user/weixin/getLoginParam/',
  // 获取某一个科室某一个医院的某一个科室预约挂号的数据
  HOSPITALWORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
  // 获取医院某个科室排班的数据
  HOSPITALDOCTOR_URL = '/hosp/hospital/auth/findScheduleList/',
  // 获取某一个账号下就诊人的信息
  GETUSER_URL = '/user/patient/auth/findAll',
  // 获取医院排班的数据
  GETDOCTOR_URL = '/hosp/hospital/getSchedule/'
}

// 获取医院详情的接口
export const reqHospitalDetail = (hoscode:string) => request.get<any,HospitalDetail>(API.HOSPITALDETAIL_URL + hoscode)
// 获取医院科室的接口
export const reqHospitalDepartment = (hoscode:string) => request.get<any,DepartmentResponseData>(API.HOSPITALDEPARTMENT_URL + hoscode)
// 获取验证码
export const reqCode = (phone:string) => request.get<any,any>(API.GETUSERCODE_URL + phone)
// 用户登录接口
export const reqUserLogin = (data:loginData) => request.post<any,UserLoginResponseData>(API.USERLOGIN_URL,data)
// 返回微信登录的二维码
export const reqWxLogin = (wxRedirectUri:string) => request.get<any,WXLoginResponseData>(API.WXLOGIN_URL + `?wxRedirectUri=${ wxRedirectUri }`)
// 返回科室预约挂号的数据
export const reqHospitalWork = (page:number,limit:number,hoscode:string,depcode:string) => request.get<any,HospitalWordData>(API.HOSPITALWORK_URL + `${ page }/${ limit }/${ hoscode }/${ depcode }`)
// 科室排班的数据
export const reqHospitalDoctor = (hoscode:string,depcode:string,workDate:string) => request.get<any,DoctorResponseData>(API.HOSPITALDOCTOR_URL + `${ hoscode }/${ depcode }/${ workDate }`)
// 获取某一个账号下就诊人的信息
export const reqGetUser = () => request.get<any,UserResponseData>(API.GETUSER_URL)
// 获取挂号医生的信息
export const reqDoctorInfo = (scheduleId:string) => request.get<any,DoctorInfoData>(API.GETDOCTOR_URL + scheduleId)