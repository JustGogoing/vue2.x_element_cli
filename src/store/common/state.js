import { getToken } from "@/utils/auth";
const state = {
  token: getToken(),
  role: "",
  routes: []
};
export default state;
