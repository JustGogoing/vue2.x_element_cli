import { getToken } from "@/utils/auth";
const state = {
  token: getToken(),
  role: "",
  routes: [],
  isCollapse: false
};
export default state;
