// 引入二次封装的axios
import request from "@/utils/request"
import type { AddOrUpdateUser,AllOrderStateResponseData,AllUserResponseData,UserParams,CertationnTypeResponseData,SubmitOrder,OrderResponsedata,QrCode,PayResult,UserInfoResponseData,UserOrderInfoResponseData } from '@/api/user/type'

// 枚举地址
enum API{
  // 获取订单地址
  SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/',
  // 获取订单详情
  GETORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',
  // 取消订单
  ORDERCANCLE_URL = '/order/orderInfo/auth/cancelOrder/',
  // 获取支付订单二维码
  QRCODE_URL = '/order/weixin/createNative/',
  // 查询订单支付的结果
  PAYRESUL_URL = '/order/weixin/queryPayStatus/',
  // 获取当前账号信息
  USERINFO_URL = '/user/auth/getUserInfo',
  // 获取证件类型
  CERTIFIFCATIONTYPE_URL = '/cmn/dict/findByDictCode/',
  // 用户认证
  USERCERTATION_URL = '/user/auth/userAuah',
  // 获取分页列表
  USERORDERINFO_URL = '/order/orderInfo/auth/',
  // 获取全部就诊人的信息
  ALLUSER_URL = '/user/patient/auth/findAll',
  // 获取订单状态
  ORDERSTATE_URL = '/order/orderInfo/auth/getStatusList',
  // 获取中国各个城市的接口
  CITY_URL = '/cmn/dict/findByParentId/',
  // 新增就诊人
  ADDUSER_URL = '/user/patient/auth/save',
  // 更新已有就诊人id
  UPDATEUSER_URL = '/user/patient/auth/update',
  // 删除就诊人
  DELETE_URL = '/user/patient/auth/remove/'
}
// 获取订单数据接口
export const reqSubmitOrder = (hoscode:string,scheduleId:string,patientId:number) => request.post<any,SubmitOrder>(API.SUBMITORDER_URL + `${ hoscode }/${ scheduleId }/${patientId}`)
// 获取订单详情接口
export const reqOrderInfo = (id:string) => request.get<any,OrderResponsedata>(API.GETORDERINFO_URL + id)
// 取消订单
export const reqCancleOrder = (id:string) => request.get<any,any>(API.ORDERCANCLE_URL + id)
// 获取支付的二维码接口
export const reqQrcode = (orderId:string) => request.get<any,QrCode>(API.QRCODE_URL + orderId)
// 查询订单支付状态
export const reqQueryPayState = (orderId:string) => request.get<any,PayResult>(API.PAYRESUL_URL + orderId)
// 获取当前用户信息的接口
export const reqUserInfo = () => request.get<any,UserInfoResponseData>(API.USERINFO_URL)
// 获取证件类型
export const reqCertationType = (CertificatesType = 'CertificatesType') => request.get<any,CertationnTypeResponseData>(API.CERTIFIFCATIONTYPE_URL + CertificatesType)
// 用户认证的接口
export const reqUserCertation = (data:UserParams) => request.post<any,any>(API.USERCERTATION_URL,data)
// 获取用户订单列表
export const reqUserOrderInfo = (page:number,limit:number,patientId:string,orderStatus:string) => request.get<any,UserOrderInfoResponseData>(API.USERORDERINFO_URL + `${ page }/${ limit }?patientId=${ patientId }&orderStatus=${orderStatus}`)
// 获取全部就诊人的信息
export const reqAllUser = () => request.get<any,AllUserResponseData>(API.ALLUSER_URL)
// 获取全部订单接口
export const reqOrderState = () => request.get<any,AllOrderStateResponseData>(API.ORDERSTATE_URL)
// 获取城市的数据
export const reqCity = (parentId:string) => request.get<any,any>(API.CITY_URL + parentId)
// 新增已有的就诊人接口方法
export const reqAddOrUpdateUser = (data:AddOrUpdateUser) => {
  if(data.id) {
    return request.put<any,any>(API.UPDATEUSER_URL,data)
  }else{
    return request.post<any,any>(API.ADDUSER_URL,data)
  }
}
// 删除就诊人
export const reqDeleteUser = (id:number) => request.delete<any,any>(API.DELETE_URL + id)