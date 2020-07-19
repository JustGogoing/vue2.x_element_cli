<template>
  <div>
    404 error
    <el-button @click="addRoutes">动态挂载路由</el-button>
  </div>
</template>

<script>
import allDyRoutes from "@/router/modules";
export default {
  name: "404",
  methods: {
    addRoutes() {
      console.log("add");
      console.log(allDyRoutes);
      console.log(this.$router);
      this.$router.addRoutes(allDyRoutes);
      console.log(this.$router);
    }
  }
};
</script>

<style lang="scss" scoped></style>
