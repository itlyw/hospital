// 定义详情模块的ts类型
export interface ResponseData{
  code: number,
  message: string,
  ok: boolean
}
// 提交订单数据的类型
export interface SubmitOrder extends ResponseData{
  data:number
}
// 订单详情
export interface OrderInfo {
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
    orderStatusString: string
  },
  userId: number,
  outTradeNo: string,
  hoscode: string,
  hosname: string,
  depcode: string,
  depname: string,
  scheduleId: string,
  title: string,
  reserveDate: string,
  reserveTime: number,
  patientId: number,
  patientName: string,
  patientPhone: string,
  hosRecordId: string,
  number: number,
  fetchTime: string,
  fetchAddress: string,
  amount: number,
  quitTime: string,
  orderStatus: number
}
// 返回订单数据
export interface OrderResponsedata extends ResponseData{
  data: OrderInfo
}
// 获取二维码返回的数据
export interface PayInfo{
  codeUrl: string,
  orderId: number,
  totalFee: number,
  resultCode: string
}
export interface QrCode extends ResponseData{
  data: PayInfo
}
// 查询支付结果
export interface PayResult extends ResponseData{
  data: boolean
}
// 代表一个用户信息的数据类型
export interface UserInfo{
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {},
  openid: null,
  nickName: null,
  phone: string,
  name: string,
  certificatesType: string,
  certificatesNo: string,
  certificatesUrl: null,
  authStatus: number,
  status: number
}
// 获取用户信息接口的返回数据类型
export interface UserInfoResponseData extends ResponseData{
  data: UserInfo
}
// 代表证件类型
export interface CertationType{
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {},
  parentId: number,
  name: string,
  value: string,
  dictCode: string,
  hasChildren: boolean
}
export type CertationArr = CertationType[]

export interface CertationnTypeResponseData extends ResponseData{
  data: CertationArr
}
export interface UserParams{
  certificatesNo: string,
  certificatesType: string,
  certificatesUrl: string,
  name: string
}
// 代表着一个订单的数据详情
export interface Order{
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
    orderStatusString: string
  },
 userId: number,
 outTradeNo: string,
 hoscode: string,
 hosname: string,
 depcode: string,
 depname: string,
 scheduleId: null,
 title: string,
 reserveDate: string,
 reserveTime: number,
 patientId:  number,
 patientName: string,
 patientPhone: string,
 hosRecordId: string,
 number: number,
 fetchTime:string,
 fetchAddress: string,
 amount: number,
 quitTime:string,
 orderStatus: number
}

export type Records = Order[]

export interface UserOrderInfoResponseData extends ResponseData{
  data: {
    records: Records,
    total: number,
    size: number,
    current: number,
    orders: [],
    hitCount: boolean,
    searchCount: boolean,
    pages: number
  }
}

// 就诊人类型
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
  isMarry: 0,
  provinceCode: null,
  cictyCode: null,
  districtCode: null,
  address: string,
  contactsName: string,
  contactsCertificatesType: string,
  contactsPhone: string,
  isInsure: number,
  cardNo: null,
  status: string
}
export type AllUser = User[]
// 获取全部就诊人的类型
export interface AllUserResponseData extends ResponseData{
  data: AllUser
}
// 订单状态
export interface OrderState{
  comment: string,
  status: number
}

export type AllOrderState = OrderState []

// 全部订单状态返回的接口数据类型
export interface AllOrderStateResponseData extends ResponseData{
  data: AllOrderState
}
// 新增与修改已有的就诊人参数的数据类型
export interface AddOrUpdateUser{
  id?: string,
  name: string,
  certificatesNo: string,
  certificatesType: string,
  sex: number,
  birthdate: string,
  phone: string,
  isMarry: number,
  isInsure: number,
  address: string,
  addressSelected: string[],
  contactsName: string,
  contactsCertificatesType: string,
  contactsCertificatesNo: string,
  contactsPhone: string
}