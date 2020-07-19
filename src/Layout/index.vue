<template>
  <div class="wrap">
    <SideBar />
    <div class="main-container">
      <Main />
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar";
import Main from "./components/Main";
export default {
  name: "layout",
  components: {
    SideBar,
    Main
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  .main-container {
    flex: 1;
  }
}
</style>
