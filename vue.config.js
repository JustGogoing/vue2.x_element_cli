/*
 * @Author: your name
 * @Date: 2020-07-05 17:07:38
 * @LastEditTime: 2020-07-05 17:41:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-cli/vue.config.js
 */

module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      title: "考研掌中宝后台管理系统"
    }
  },
  devServer: {
    open: true
  },
  configureWebpack: {
    externals: {
      vue: "Vue",
      ElementUI: "ElementUI"
    }
  }
};
