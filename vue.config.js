/*
 * @Author: your name
 * @Date: 2020-07-05 17:07:38
 * @LastEditTime: 2020-07-06 12:55:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-cli/vue.config.js
 */
const path = require("path");

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
  configureWebpack: {},
  chainWebpack(config) {
    config.resolve.alias
      .set("@com", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@api", resolve("src/api"))
      .set("@store", resolve("src/store"))
      .set("$static", resolve("./static"));
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styles/mixins.scss";`
      }
    }
  }
};

function resolve(dir) {
  return path.join(__dirname, dir);
}
