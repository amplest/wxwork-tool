<template>
  <div id="app" v-cloak>
    <router-view />
  </div>
</template>

<style lang="less">
[v-cloak] {
  display: none !important;
}
html,
body {
  background-color: #ededed;
  width: 100%;
  height: 100%;
}
.toast-txt {
  .weui-toast {
    height: auto;
    padding: 10px;
    width: auto;
    .weui-icon_toast {
      display: none !important;
    }
  }
}
.el-select-dropdown {
  z-index: 5000 !important;
}
.custom-gallery {
    .weui-gallery__opr {
        display: none !important;
    }
}
.diy-dialog {
  .el-radio__input.is-checked .el-radio__inner {
    border-color: var(--weui-LINK) !important;
    background: var(--weui-LINK) !important;
  }
  .el-radio__inner:hover {
    border: 1px solid var(--weui-LINK) !important;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: var(--weui-LINK) !important;
  }
  .el-select .el-input__inner:focus,
  .el-select .el-input.is-focus .el-input__inner {
    border-color: var(--weui-LINK) !important;
  }
  .el-select-dropdown__item.selected,
  .el-select-dropdown__item.hover {
    color: var(--weui-LINK) !important;
    span {
      color: var(--weui-LINK) !important;
    }
  }
  .el-input__inner:focus {
    border-color: var(--weui-LINK) !important;
  }
}
#app {
  width: 100%;
  height: 100%;
}
</style>
