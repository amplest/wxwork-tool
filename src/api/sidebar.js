import axios from '@/util/sidebar_axios'
const baseURL = '/v3/custom-app/public/sidebar'
const settingBaseURL = '/v3/custom-app/public/qwMaterialType'
const materialBaseURL = '/v3/resource-center/material/common'
const userMaterialBaseURL = '/v3/custom-app/public/qwMaterialUser'

// 配置
export const getToolConfig = corpId => {
  return axios.request({
    baseURL,
    url: '/qwToolbarConfig1',
    method: 'GET',
    params: {
      corpId
    }
  })
}

// 企业配置
export const getEnterprise = data => {
  return axios.request({
    baseURL,
    url: '/corpConfig',
    method: 'GET',
    params: {
      ...data
    }
  })
}

// 应用配置

export const getAgent = data => {
  return axios.request({
    baseURL,
    url: '/agentConfig',
    method: 'GET',
    params: {
      ...data
    }
  })
}

// 一级栏目
export const getToolMenu = id => {
  return axios.request({
    baseURL,
    url: '/getListQwToolbarEnable',
    method: 'GET',
    params: {
      id
    }
  })
}

// 二级栏目
export const getToolMenuSecond = data => {
  return axios.request({
    baseURL,
    url: '/listClassIfyByMaterialType',
    method: 'GET',
    params: {
      ...data
    }
  })
}

// 我的 - 添加 - 分类
export const addMaterialType = data => {
  return axios.request({
    baseURL: settingBaseURL,
    url: '/add',
    method: 'POST',
    data: {
      ...data
    }
  })
}

// 我的 - 添加 - 分类列表
export const getMaterialTypeList = id => {
  return axios.request({
    baseURL: settingBaseURL,
    url: '/list',
    method: 'GET',
    params: {
      id
    }
  })
}

// 我的 - 列表 - 删除
export const delMaterialType = id => {
  return axios.request({
    baseURL: userMaterialBaseURL,
    url: `/delete/${id}`,
    method: 'DELETE'
  })
}

// 我的 - 添加 - 个人话术

export const addUserMaterial = data => {
  return axios.request({
    baseURL: userMaterialBaseURL,
    url: '/add',
    method: 'POST',
    data: {
      ...data
    }
  })
}

// 我的 - 列表
export const getUserMaterialList = data => {
  return axios.request({
    baseURL: userMaterialBaseURL,
    url: '/listMaterialUser',
    method: 'POST',
    data: {
      ...data
    }
  })
}

// 素材库 - 列表
export const getMaterialList = data => {
  return axios.request({
    baseURL: materialBaseURL,
    url: '/getPageMaterialList',
    method: 'POST',
    data: {
      ...data
    }
  })
}

// 收藏
export const getToolCollection = data => {
  return axios.request({
    baseURL: userMaterialBaseURL,
    url: '/addCancelFavorite',
    method: 'POST',
    data: {
      ...data
    }
  })
}

// code换userid
export const getUserId = data => {
  return axios.request({
    baseURL,
    url: '/getUserInfoByCode',
    method: 'GET',
    params: {
      ...data
    }
  })
}
