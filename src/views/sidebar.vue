<template>
  <div class="weui-flex container">
    <div class="weui-flex tab-box">
      <div class="weui-flex__item tab-box-reply" style="font-family: '微软雅黑', 'Microsoft YaHei';">快捷回复</div>
      <!-- <div class="tab-box-line"></div>
      <div class="weui-flex__item tab-box-portrait" style="font-family: '微软雅黑','Microsoft YaHei';" >客户画像</div> -->
    </div>
    <div class="weui-flex public-box">
      <!-- 搜索 -->
      <div class="weui-flex__item weui-search-bar">
        <form :class="['weui-search-bar__form', { 'weui-search-bar_focusing': !inputbox }]" @submit.prevent>
          <div class="weui-search-bar__box reset-search">
            <i class="weui-icon-search"></i>
            <input
              style="font-family: '微软雅黑', 'Microsoft YaHei';"
              type="search"
              class="weui-search-bar__input"
              placeholder="搜索"
              ref="inputref"
              v-model="kewords"
              autocomplete="off"
              @change="onSearch"
            />
            <a href="javascript:" class="weui-icon-clear" v-if="kewords" @click.stop="searchClear"></a>
          </div>
          <label class="weui-search-bar__label" v-if="inputbox" @click="searchText">
            <i class="weui-icon-search"></i>
            <span style="font-family: '微软雅黑', 'Microsoft YaHei';">搜索</span>
          </label>
        </form>
        <a
          href="javascript:"
          style="font-family: '微软雅黑', 'Microsoft YaHei';"
          :class="['weui-search-bar__cancel-btn', { 'search-txt': !inputbox }]"
          @click="searchCancel"
          >取消</a
        >
      </div>
      <!-- 添加 -->
      <div class="add-btn" @click="addPersonalText" v-if="navactive === 0">
        <i class="el-icon-circle-plus-outline"></i>
      </div>
    </div>
    <!-- 一级分类 -->
    <div class="type-box">
      <div class="weui-flex type-box-subset">
        <div
          :class="['type-box-subset-box-me', { 'tab-active': navactive == 0 }]"
          @click="handleNavActive(0, 0)"
          style="font-family: '微软雅黑', 'Microsoft YaHei';"
        >
          我的
        </div>
        <div class="weui-flex__item type-box-subset-con">
          <div class="weui-flex type-box-subset-box">
            <div
              style="font-family: '微软雅黑', 'Microsoft YaHei';"
              :class="['type-box-subset-box-item', { 'tab-active': navactive == item.id }]"
              @click="handleNavActive(item.id, item.materialType)"
              v-for="item in firstmenulist"
              :key="'first' + item.id"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 二级分类 -->
    <div class="type-secondary">
      <div class="weui-flex type-secondary-box">
        <div
          style="font-family: '微软雅黑', 'Microsoft YaHei';"
          :class="['type-secondary-box-all', { 'classification-active': navsecondactive == 0 }]"
          @click="handleSecondNavActive(0)"
        >
          全部
        </div>
        <div class="weui-flex__item type-secondary-con">
          <div class="weui-flex type-secondary-box-list">
            <div
              style="font-family: '微软雅黑', 'Microsoft YaHei';"
              :class="['type-secondary-box-list-item', { 'classification-active': navsecondactive == item.id }]"
              v-for="item in secondmenulist"
              :key="'second' + item.id"
              @click="handleSecondNavActive(item.id)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="weui-flex list-box">
      <div class="list-box-container">
        <!-- list start -->
        <div class="list-box-container-item" v-for="item in materialList" :key="'list' + item.id">
          <div style="word-break: break-all;">
            {{ JSON.stringify(item) }}
          </div>
          <div style="word-break: break-all;">
            {{ userInfoId }}
          </div>

          <div class="weui-flex list-box-container-item-top" @click="onDetail(item)">
            <div class="list-media" v-if="item.type != 2">
              <!-- 图片/网页/文件/ -->
              <div class="list-media-type" v-if="item.type === 3 || item.type === 4 || item.type === 7">
                <img :src="setIcon(item.fileSuffixName)" alt="" v-if="item.type === 7" />
                <img :src="item.thumbPath" alt="" v-else />
              </div>
              <!-- 视频 -->
              <div class="list-media-type" v-if="item.type === 6">
                <div class="list-media-type-video">
                  <div class="list-media-type-video-play">
                    <img src="https://v8-dev.wshoto.com/attachment/images/49/2020/04/MdyeKJF3dDI3i3lR3QIIiJiQqY4Liz.jpg" />
                    <i class="el-icon-video-play" v-if="true"></i>
                    <i class="el-icon-video-pause" v-else></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="weui-flex__item list-text" style="font-family: '微软雅黑', 'Microsoft YaHei';">
              <template v-if="item.type == 2">
                {{ item.text }}
              </template>
              <template v-else>
                {{ item.title }}
              </template>
            </div>
          </div>
          <div class="weui-flex list-box-container-item-bottom">
            <div class="weui-flex list-info">
              <div class="list-info-name" style="font-family: '微软雅黑', 'Microsoft YaHei';">{{ item.username }}</div>
              <div class="list-info-time" style="font-family: '微软雅黑', 'Microsoft YaHei';">{{ item.createTime }}</div>
            </div>
            <div class="weui-flex list-options">
              <div class="list-options-btn" @click="handleSend(item)" style="font-family: '微软雅黑', 'Microsoft YaHei';">
                <i class="el-icon-position"></i> 发送
              </div>
              <div
                class="list-options-btn"
                v-if="!item.materialRource"
                @click="handleDel(item.id)"
                style="font-family: '微软雅黑', 'Microsoft YaHei';"
              >
                <i class="el-icon-delete"></i> 删除
              </div>
              <div
                class="list-options-btn"
                v-if="item.materialRource"
                @click="handleCollection(item)"
                style="font-family: '微软雅黑', 'Microsoft YaHei';"
              >
                <i :class="item.isFavorite ? 'el-icon-star-on' : 'el-icon-star-off'"></i>
                {{ item.isFavorite ? '已收藏' : '收藏' }}
              </div>
            </div>
          </div>
        </div>
        <!-- list end -->
        <div class="weui-flex loading" v-if="loadBox">
          <el-button type="text" :loading="loadStatus" @click="onLoading" style="font-family: '微软雅黑', 'Microsoft YaHei';"
            >点击加载更多</el-button
          >
        </div>
        <div class="weui-loadmore weui-loadmore_line" v-else>
          <span class="weui-loadmore__tips no-data" style="font-family: '微软雅黑', 'Microsoft YaHei';">暂无数据</span>
        </div>
      </div>
    </div>
    <!-- 添加我的素材 -->
    <div v-if="addPersonal">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd">
          <strong class="weui-dialog__title" style="font-family: '微软雅黑', 'Microsoft YaHei';"
            >添加"我的" {{ addForm.type == 1 ? '文本' : '分类' }}</strong
          >
        </div>
        <div class="weui-dialog__bd diy-dialog">
          <el-form size="small" :model="addForm" label-position="top" ref="addForm">
            <el-form-item label="添加类型" class="weui-cell__hd" style="font-family: '微软雅黑', 'Microsoft YaHei';">
              <el-radio-group v-model="addForm.type">
                <el-radio :label="1">文本</el-radio>
                <el-radio :label="2">分类</el-radio>
              </el-radio-group>
            </el-form-item>
            <template v-if="addForm.type == 1">
              <el-form-item label="文本分类" style="font-family: '微软雅黑', 'Microsoft YaHei';">
                <el-select v-model="addForm.classId" placeholder="请选择" :style="{ width: '100%' }">
                  <el-option v-for="item in classificationOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="文本信息" style="font-family: '微软雅黑', 'Microsoft YaHei';">
                <textarea
                  class="weui-textarea textarea-style"
                  v-model="addForm.infotxt"
                  style="font-family: '微软雅黑', 'Microsoft YaHei';"
                  placeholder="请描述你所发生的问题"
                  rows="3"
                ></textarea>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item label="分类名称">
                <el-input v-model="addForm.classification"></el-input>
              </el-form-item>
            </template>
          </el-form>
        </div>
        <div class="weui-dialog__ft">
          <a
            @click="closePersonal"
            href="javascript:;"
            class="weui-dialog__btn weui-dialog__btn_default"
            style="font-family: '微软雅黑', 'Microsoft YaHei';"
            >取消</a
          >
          <a
            @click="createdPersonal"
            href="javascript:;"
            class="weui-dialog__btn weui-dialog__btn_primary"
            style="font-family: '微软雅黑', 'Microsoft YaHei';"
            >确定</a
          >
        </div>
      </div>
    </div>
    <!-- dialog -->
    <div class="detail-dialog" v-if="detailDialog">
      <div class="detail-dialog-body">
        <div class="detail-dialog-top">
          <div>&nbsp;</div>
          <div class="detail-dialog-top-title" style="font-family: '微软雅黑', 'Microsoft YaHei';">
            {{ detailInfo.username }} | {{ detailInfo.createTime }}
          </div>
          <div><i class="el-icon-close" @click="detailDialog = false"></i></div>
        </div>
        <div class="detail-dialog-bottom" style="font-family: '微软雅黑', 'Microsoft YaHei';">
          <template v-if="detailInfo.type === 2">
            {{ detailInfo.text }}
          </template>
          <template v-else-if="detailInfo.type === 3">
            <div>
              <img :src="detailInfo.thumbPath" />
            </div>
            <div class="detail-dialog-txt" style="font-family: '微软雅黑', 'Microsoft YaHei';">
              {{ detailInfo.fileName }}
            </div>
          </template>
          <template v-else>
            <video width="100%" style="height: 200px;" controls>
              <source :src="detailInfo.thumbPath" type="video/mp4" />
            </video>
            <div class="detail-dialog-txt" style="font-family: '微软雅黑', 'Microsoft YaHei';">
              {{ detailInfo.fileName }}
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- dialog end -->
  </div>
</template>
<script>
/**
 * 2文本,3图片,4网页,6视频,7文件
 */
import {
  getToolConfig,
  getToolMenu,
  getToolCollection,
  getToolMenuSecond,
  addMaterialType,
  delMaterialType,
  getMaterialList,
  getMaterialTypeList,
  addUserMaterial,
  getUserMaterialList,
  getUserId,
  getEnterprise,
  getAgent
} from '@/api/sidebar'

// import wx from 'weixin-js-sdk'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      kewords: '',
      inputbox: true,
      addPersonal: false,
      firstmenulist: [],
      navactive: 0,
      secondmenulist: [],
      navsecondactive: 0,
      firstType: 0,
      secondId: 0,
      listPage: 1,
      // 添加我的
      addForm: {
        type: 1,
        classId: '',
        classification: '',
        infotxt: ''
      },
      classificationOptions: [],
      detailDialog: false,
      materialList: [], // 素材公共列表
      // 预览 2,3,6
      detailInfo: {},
      loadBox: false,
      loadStatus: false,
      // 用户信息
      userInfoId: '',
      configInfo: {},
      agentInfo: {}
    }
  },
  methods: {
    // 获取企业配置
    async getEnterprise(newCode, corpId) {
      const formData = {}
      formData.newCode = newCode
      formData.corpId = corpId
      const { code, data } = await getEnterprise(formData)
      if (code === 200) {
        this.configInfo = data.agentConfigDTOS[0]
      }
    },
    // 获取应用配置
    async getAgent(newCode, corpId) {
      const formData = {}
      formData.newCode = newCode
      formData.corpId = corpId
      const { code, data } = await getAgent(formData)
      if (code === 200) {
        this.agentInfo = data.agentConfigDTOS[0]
      }
    },
    // JSSDK配置
    getToolConfig() {
      const _this = this
      wx.config({
        beta: true,
        debug: true,
        appId: _this.configInfo.corpId,
        timestamp: _this.configInfo.timeStamp,
        nonceStr: _this.configInfo.nonceStr,
        signature: _this.configInfo.signature,
        jsApiList: ['checkJsApi', 'agentConfig']
      })
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: ['checkJsApi', 'agentConfig'],
          success: function (res) {}
        })
        wx.agentConfig({
          corpid: _this.agentInfo.corpId,
          agentid: _this.agentInfo.agentId,
          timestamp: _this.agentInfo.timeStamp,
          nonceStr: _this.agentInfo.nonceStr,
          signature: _this.agentInfo.signature,
          jsApiList: ['sendChatMessage'],
          success: function (res) {},
          fail: function (res) {
            if (res.errMsg.indexOf('function not exist') > -1) {
              _this.$weui.toast('版本过低请升级', { duration: 1500, className: 'toast-txt' })
            }
          }
        })
      })
    },
    // 构造授权登录
    async getAuthorization(corpId) {
      const { code, data } = await getToolConfig(corpId)
      this.authorization(corpId, data.callbackUrl)
    },
    authorization(corpId, redirect) {
      let redirectUrl = encodeURIComponent(redirect + '/H5/')
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corpId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base&state=${corpId}#wechat_redirect`
    },
    // code2userid
    async getUserId(codeInfo, corpId) {
      const formData = {}
      formData.code = codeInfo
      formData.state = corpId
      const { code, data } = await getUserId(formData)
      if (code === 200) {
        this.userInfoId = data.id
        // this.userInfoId = 14632
        await this.getToolMenu()
        await this.getUserMaterialList()
      } else {
        console.log('getUserId error', code)
      }
    },
    // 一级分类
    async getToolMenu() {
      const { code, data } = await getToolMenu(this.userInfoId)
      if (code === 200) {
        this.firstmenulist = data
        this.getToolMenuSecond(0, this.userInfoId) // 进入页面首次定位全部
      } else {
        console.log('getToolMenu error', code)
      }
    },
    handleNavActive(id, mtype) {
      console.log('id==>', id, 'mtype==>', mtype)
      this.$weui.loading('正在加载')
      // 重置
      this.kewords = ''
      this.inputbox = true
      this.navactive = id
      this.navsecondactive = 0 // 重置二级分类
      this.getToolMenuSecond(id, this.userInfoId) // 二级分类
      this.firstType = mtype
      this.secondId = 0
      this.listPage = 1
      this.materialList = []
      this.secondmenulist = []
      if (mtype === 0) {
        this.getUserMaterialList()
      } else {
        this.getMaterialList()
      }
    },
    // 二级分类
    async getToolMenuSecond(id, userid) {
      const formData = {}
      formData.id = id
      formData.userId = userid
      const { code, data } = await getToolMenuSecond(formData)
      if (code === 200) {
        this.secondmenulist = data
      } else {
        console.log('getToolMenuSecond error', code)
      }
    },
    handleSecondNavActive(id) {
      console.log('second id==>', id)
      this.navsecondactive = id
      this.secondId = id
      // 重置
      this.kewords = ''
      this.inputbox = true
      this.listPage = 1
      this.materialList = []
      if (this.firstType === 0) {
        this.getUserMaterialList()
      } else {
        this.getMaterialList()
      }
    },
    async getMaterialList() {
      const listData = {}
      listData.currentPage = this.listPage
      listData.key = this.kewords
      listData.id = this.firstType
      listData.catagoryId = this.secondId
      listData.pageSize = 10
      listData.userId = this.userInfoId
      const { code, data } = await getMaterialList(listData)
      if (code === 200) {
        this.materialList = this.listPage == 1 ? data.qwToolbarMaterialDTOS : [...this.materialList, ...data.qwToolbarMaterialDTOS]
        this.loadBox = data.qwToolbarMaterialDTOS.length && data.total > 10 ? true : false
        this.loadStatus = false
        this.$weui.loading().hide()
      } else {
        this.$weui.loading().hide()
        console.log('getMaterialList error', code)
      }
    },
    // 我的
    async getUserMaterialList() {
      const isMeList = {}
      isMeList.currentPage = this.listPage
      isMeList.key = this.kewords
      isMeList.classifyId = this.secondId
      isMeList.pageSize = 10
      isMeList.id = this.userInfoId
      const { code, data } = await getUserMaterialList(isMeList)
      if (code === 200) {
        this.materialList = this.listPage == 1 ? data.qwToolbarMaterialDTOS : [...this.materialList, ...data.qwToolbarMaterialDTOS]
        this.loadBox = data.qwToolbarMaterialDTOS.length && data.total > 10 ? true : false
        this.loadStatus = false
        this.$weui.loading().hide()
      } else {
        this.$weui.loading().hide()
        console.log('getUserMaterialList error', code)
      }
    },
    // 搜索
    searchText() {
      this.inputbox = false
      this.$refs.inputref.focus()
    },
    searchClear() {
      this.kewords = ''
    },
    searchCancel() {
      this.inputbox = true
      this.kewords = ''
    },
    onSearch() {
      this.$weui.loading('正在加载')
      if (this.firstType == 0) {
        this.getUserMaterialList()
      } else {
        this.getMaterialList()
      }
    },
    // 我的分类列表
    async getMaterialTypeList() {
      const { code, data } = await getMaterialTypeList(this.userInfoId)
      if (code === 200) {
        this.classificationOptions = data
      } else {
        console.log('getMaterialTypeList error', code)
      }
    },
    addPersonalText() {
      this.addForm.type = 1
      this.addForm.classId = ''
      this.addForm.classification = ''
      this.addForm.infotxt = ''
      this.getMaterialTypeList()
      this.addPersonal = true
    },
    closePersonal() {
      this.addPersonal = false
      this.addForm.type = 1
      this.addForm.classId = ''
      this.addForm.classification = ''
      this.addForm.infotxt = ''
    },
    async createdPersonal() {
      const addInfo = {}
      const addClassInfo = {}
      if (this.addForm.type == 1) {
        if (!this.addForm.classId) {
          this.$weui.toast('请选择分类', { duration: 1500, className: 'toast-txt' })
          return false
        }
        if (!this.addForm.infotxt) {
          this.$weui.toast('请填写文本信息', { duration: 1500, className: 'toast-txt' })
          return false
        }
        this.addForm.classification = ''
        this.$weui.loading('正在加载')
        addInfo.classifyId = this.addForm.classId
        addInfo.text = this.addForm.infotxt
        addInfo.id = this.userInfoId
        const { code, data } = await addUserMaterial(addInfo)
        if (code === 200) {
          this.$weui.loading().hide()
          this.$weui.toast('添加成功', 1500)
          this.getUserMaterialList()
          this.addPersonal = false
        } else {
          this.$weui.loading().hide()
          console.log('addUserMaterial error', code)
        }
      } else {
        if (!this.addForm.classification) {
          this.$weui.toast('请填写分类名称', { duration: 1500, className: 'toast-txt' })
          return false
        }
        addClassInfo.classifyName = this.addForm.classification
        addClassInfo.id = this.userInfoId
        this.addForm.classId = ''
        this.addForm.infotxt = ''
        this.$weui.loading('正在加载')
        const { code, data } = await addMaterialType(addClassInfo)
        if (code === 200) {
          this.$weui.loading().hide()
          this.$weui.toast('添加成功', 1500)
          this.getToolMenu() // 添加成功刷新接口
          this.addPersonal = false
        } else {
          this.$weui.loading().hide()
          console.log('addMaterialType error', code)
        }
      }
    },
    // 详情
    onDetail(detail) {
      if (detail.type === 2 || detail.type === 3 || detail.type === 6) {
        this.detailInfo = detail
        this.detailDialog = true
      } else {
        console.log('仅图片/视频支持预览')
      }
      console.log(detail)
    },
    // 发送
    handleSend(e) {
      let data = {}
      console.log(e.text)
      switch (e.typeName) {
        case 'text':
          data = {
            msgtype: 'text',
            text: {
              content: e.text
            }
          }
          break
        case 'image':
          data = {
            msgtype: 'image',
            image: {
              mediaid: e.mediaid
            }
          }
          break
        case 'link':
          data = {
            msgtype: 'news',
            news: {
              link: e.link, //H5消息页面url 必填
              title: e.title, //H5消息标题
              desc: e.desc, //H5消息摘要
              imgUrl: e.imgUrl //H5消息封面图片URL
            }
          }
          break
        case 'video':
          data = {
            msgtype: 'video',
            video: {
              mediaid: e.mediaid
            }
          }
          break
        case 'file':
          data = {
            msgtype: 'file',
            file: {
              mediaid: e.mediaid
            }
          }
          break
      }
      wx.invoke('sendChatMessage', data, function (res) {
        alert(res.err_msg)
        if (res.err_msg == 'sendChatMessage:ok') {
        } else {
          this.$weui.toast('发送失败，请检查企微配置', {
            duration: 1500,
            className: 'toast-txt'
          })
        }
      })
    },
    // 删除
    async handleDel(id) {
      this.$weui.loading('正在加载')
      const { code, data } = await delMaterialType(id)
      if (code === 200) {
        this.$weui.toast('删除成功', 1500)
        this.getUserMaterialList()
        this.$weui.loading().hide()
      } else {
        this.$weui.loading().hide()
        console.log('delMaterialType error', code)
      }
    },
    // 收藏
    async handleCollection(e) {
      this.$weui.loading('正在加载')
      const colleTxt = ''
      const collectInfo = {}
      collectInfo.materialId = e.id
      collectInfo.materialClassifyId = 0
      collectInfo.favorite = !e.isFavorite
      collectInfo.id = this.userInfoId
      this.listPage = 1
      const { code, data } = await getToolCollection(collectInfo)
      if (code === 200) {
        if (this.firstType == 0) {
          this.getUserMaterialList()
        } else {
          this.getMaterialList()
        }
      } else {
        this.$weui.loading().hide()
        console.log('getToolCollection error', code)
      }
    },
    // Loading
    onLoading() {
      this.loadStatus = true
      this.listPage++
      if (this.firstType == 0) {
        this.getUserMaterialList()
      } else {
        this.getMaterialList()
      }
    },
    // 文件图标
    setIcon(type) {
      let img = ''
      if (type == 'zip' || type == 'rar' || type == 'tar' || type == 'gz' || type == '7z') {
        img = require('../assets/img/zipicon.png')
      } else if (type == 'doc' || type == 'docx' || type == 'docm') {
        img = require('../assets/img/word.png')
      } else if (type == 'xls' || type == 'xlsx') {
        img = require('../assets/img/xls.png')
      } else if (type == 'csv') {
        img = require('../assets/img/csv.png')
      } else if (type == 'pdf') {
        img = require('../assets/img/pdf.png')
      } else if (type == 'ppt' || type == 'pptx') {
        img = require('../assets/img/pptx.png')
      } else {
        img = require('../assets/img/html.png')
      }
      return img
    }
  },
  async created() {
    console.log('wx===', wx)
    let { code, state, corpId } = this.$route.query
    if (!code && !state) {
      this.getAuthorization(corpId)
    }
    if (code && state) {
      await this.getEnterprise(code, state)
      await this.getAgent(code, state)
      await this.getToolConfig()
      await this.getUserId(code, state)
    }
  }
}
</script>

<style lang="less" scoped>
.texthide(@e) {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  white-space: initial;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: @e;
}
.container {
  width: 100%;
  flex-direction: column;
  height: 100vh;
}
// tabs
.tab-box {
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  background-color: #fff;
  border-bottom: 1px solid #dae0e8;
  color: #333333;
  cursor: pointer;
  &-line {
    width: 1px !important;
    flex-shrink: 0;
    height: 20px;
    background-color: #dae0e8;
    align-self: center;
  }
}
// search
.public-box {
  background-color: #ffffff;
  .add-btn {
    width: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 25px;
    color: #999999;
    align-self: center;
    cursor: pointer;
  }
  .weui-search-bar {
    background-color: #ffffff !important;
  }
  .search-txt {
    display: block;
  }
}
// type-parent
.type-box {
  padding: 0 8px;
  background-color: #ffffff;
  &-subset {
    background-color: #fff;
    font-size: 14px;
    padding-bottom: 10px;
    &-con {
      overflow-x: auto;
      flex-grow: 1;
    }
    &-box {
      flex-grow: 1;
      flex-wrap: nowrap;
      &-me {
        flex-shrink: 0;
      }
      &-me,
      &-item {
        border: 1px solid #dae0e8;
        height: 24px;
        padding: 0 5px;
        line-height: 24px;
        text-align: center;
        border-radius: 3px;
        color: #666;
        margin-right: 10px;
        cursor: pointer;
        flex-shrink: 0;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
// type-secondary
.type-secondary {
  font-size: 14px;
  padding: 8px;
  &-con {
    overflow-x: auto;
    flex-grow: 1;
  }
  &-box {
    color: #999999;
    &-all {
      margin-right: 10px;
      cursor: pointer;
      flex-shrink: 0;
    }
    &-list {
      flex-wrap: nowrap;
      flex-grow: 1;
      &-item {
        margin-right: 10px;
        cursor: pointer;
        flex-shrink: 0;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
// list
.list-box {
  height: 100%;
  overflow-y: auto;
  padding: 0 8px;
  flex-direction: column;
  &-container {
    &-item {
      background-color: #ffffff;
      border-radius: 4px;
      padding: 10px;
      margin-bottom: 10px;
      &-top {
        padding-bottom: 10px;
        color: #666;
        .list-media {
          width: 66px;
          height: 66px;
          margin-right: 10px;
          overflow: hidden;
          &-type {
            img {
              display: block;
              width: 66px;
              height: 66px;
              border-radius: 2px;
            }
            &-video {
              position: relative;
              cursor: pointer;
              &-play {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 8;
                i {
                  display: inline-block;
                  position: absolute;
                  z-index: 9;
                  color: #fff;
                  left: 50%;
                  right: 0;
                  top: 50%;
                  bottom: 0;
                  margin-left: -16px;
                  margin-top: -16px;
                  width: 32px;
                  height: 32px;
                  font-size: 32px;
                }
              }
            }
          }
        }
        .list-text {
          .texthide(3);
          font-size: 14px;
          word-break: break-all;
        }
      }
      &-bottom {
        justify-content: space-between;
        font-size: 14px;
        color: #999999;
        .list-info {
          &-name {
            max-width: 82px;
            padding-right: 5px;
            .texthide(1);
            position: relative;
            &::before {
              content: '';
              position: absolute;
              right: 0;
              top: 50%;
              margin-top: -7px;
              height: 14px;
              width: 1px;
              background-color: #dae0e8;
            }
          }
          &-time {
            padding-left: 5px;
          }
        }
        .list-options {
          &-btn {
            margin-left: 10px;
            cursor: pointer;
            .el-icon-star-on {
              color: #ff8022;
              font-size: 14px;
            }
          }
        }
      }
    }
    .loading {
      justify-content: center;
      text-align: center;
    }
  }
}
.diy-dialog {
  text-align: left;
  margin-bottom: 0;
  padding-bottom: 20px;
  .el-form-item {
    margin-bottom: 0;
  }
}
.tab-active {
  border: 1px solid var(--weui-LINK);
  color: var(--weui-LINK);
}
.classification-active {
  color: var(--weui-LINK);
}
.loading .el-button--text {
  color: var(--weui-LINK);
}
.weui-search-bar__cancel-btn {
  font-size: 14px;
}
.textarea-style {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 5px 15px;
  box-sizing: border-box;
}
// dialog
.detail-dialog {
  display: flex;
  align-items: flex-end;
  position: fixed;
  z-index: 6000;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  &-body {
    background-color: #fff;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
  }
  &-top {
    display: flex;
    justify-content: space-between;
    &-title {
      color: #999;
      font-size: 14px;
      line-height: 25px;
    }
    i {
      font-size: 20px;
      cursor: pointer;
    }
  }
  &-bottom {
    min-height: 200px;
    max-height: 390px;
    overflow-y: auto;
    padding: 15px 0;
    box-sizing: border-box;
    font-size: 14px;
    color: #666;
    img {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      max-height: 390px;
    }
  }
  &-txt {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
}
.no-data {
  background-color: #ececec !important;
}
.reset-search {
  height: 32px;
}
</style>
