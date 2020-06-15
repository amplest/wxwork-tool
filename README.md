# 基于企业微信开发聊天工具栏

## 基础技术栈

- vue-cli
- vuex
- vue-route
- WeUI for Work
- axios

## 依赖

```sh
# less
npm install less less-loader --save-dev
# UI
npm i -D weui-for-vue
# http
npm install axios
# cookie
npm install js-cookie --save
# weixin-js-sdk
# npm install weixin-js-sdk
# npm install weixin-js-sdk@1.2.0
# npm i -S weixin-js-sdk
```

## 启动项目

```sh
npm install
npm run serve
```

## 文档

- [企业微信API](https://work.weixin.qq.com/api/doc/90000/90135/91020)
  - 网页授权登录
- [JSSDK](https://work.weixin.qq.com/api/doc/90000/90136/90512)
  - 脚本依赖 [http://res.wx.qq.com/open/js/jweixin-1.2.0.js](http://res.wx.qq.com/open/js/jweixin-1.2.0.js) 在vue的index.html内使用script引入即可
  - [聊天工具栏分享消息到会话能力](https://work.weixin.qq.com/api/doc/90000/90136/91789)

## 前端页面地址信息（该地址仅提供思路，无法正常访问）

- 前台地址
  - https://www.molerose.com/H5/?corpId=xxx
- 回调地址
  - https://www.molerose.com/H5/?code=xxx&state=xxx

## JAVA接口数据结构一览(仅供参考且仅展示配置相关接口)

tips：不要惊讶后端的数据结构，因为种种调试原因，我们都默认不要去改数据结构了，就这样先

- corpConfig (获取企业配置)
``` json
"data": {
    "agentConfigDTOS": [
        {
            "corpId": "xxx", // corpid
            "nonceStr": "hWmmXlAaiB",
            "signature": "31dad969f0ce88619507c9658485c11bbb59883d",
            "timeStamp": 1592210643,
        }
    ],
},
```
- agentConfig (获取应用配置)
``` json
"data": {
    "agentConfigDTOS": [
        {
            "corpId": "xxx", // cropid
            "nonceStr": "zjUMsYIGTz",
            "signature": "d86b528eea531da4bb4be8469c62fc49793663ca",
            "agentId": 1000090,
            "timeStamp": 1592210412,
        }
    ],
},
```

- qwToolbarConfig1 (获取corpid及回调地址)
``` json
"data": {
    "corpId": "xxx",
    "callbackUrl": "https://www.molerose.com",
},
```

- getUserInfoByCode (换取userid)
``` json
"data": {
    "id": 9527,
    "userid": "axing",
},
```

## Tips

- 由于该H5页面是依附于平台的项目所以需要 Nginx 静态资源指向这样子就可以不用依赖平台权限
- 涉及到接口均走白名单