import type { HospitalDetailObject,DepartmentArr,UserInfo } from '@/api/hospital/type'
// 定义仓库数据的类型
export interface DetailState{
  hospitalInfo: HospitalDetailObject
  departmentArr: DepartmentArr
}

// 用户仓库相关的state数据类型
export interface UserState{
  visiable: boolean,
  code: string,
  userInfo: UserInfo
}