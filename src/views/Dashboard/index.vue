<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>作品总数</span>
      </div>
      <h2>{{works.total}}</h2>
    </el-card>
  </div>
</template>

<script>
import Api from "@/api/api";
export default {
  name: "dashboard",
  data() {
    return {
      works: {
        list: [],
        total: 0
      }
    };
  },
  created() {
    this.loadData()
  },
  methods: {
    // 加载数据
    loadData(page=1, size=0) {
      Api.getWorks({
        page: --page, size
      }).then(res => {
        if(res.code ===0) {
          this.works = res.data
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
