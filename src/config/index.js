/*
 * @Author: your name
 * @Date: 2020-07-06 13:06:36
 * @LastEditTime: 2020-07-06 15:11:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-cli/src/config/index.js
 */

import pro from "./pro.env";
import dev from "./dev.env";

export default process.env.NODE_ENV === "production" ? pro : dev;
