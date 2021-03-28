<template>
  <div>
    <!-- 顶部 -->
    <el-row>
      <el-col :span="6">
        <el-button size="medium" type="primary" icon="el-icon-plus" @click="$router.push({name: 'addBanner'})">发布</el-button>
      </el-col>
      <el-col :span="18" />
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="banners.list"
      style="width: 100%">
      <el-table-column
        label="图片链接"
        width="180">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.banner_src | upLoadSrc"
            fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="banner_title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        label="上传时间">
        <template slot-scope="scope">
          {{scope.row.create_time | timeAgo}}
        </template>
      </el-table-column>
      <el-table-column
        label="作品ID">
        <template slot-scope="scope">
          {{scope.row.work_id}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index)"
            type="text"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="wrap" v-if="banners.total">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="5"
        :total="banners.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Api from "@/api/api"
export default {
  data() {
    return {
      banners: {
        list: [],
        total: 0
      }
    };
  },
  created() {
    this.load()
  },
  methods: {
    deleteRow(i) {
          const { banner_id:id, banner_title } = this.banners.list[i];
          this.$confirm(`确定要删除${banner_title}吗?`, '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            Api.delBanner({id}).then(res => {
              if(res.code === 0) {
                this.banners.list.splice(i, 1);
                this.banners.total -= 1;
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
    },
    load() {
      Api.bannerList().then(res => {
        this.banners = res.data
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  .wrap {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
