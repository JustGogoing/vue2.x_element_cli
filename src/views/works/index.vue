<template>
  <div>
    <!-- 顶部 -->
    <el-row>
      <el-col :span="6">
        <el-button size="medium" type="primary" icon="el-icon-plus" @click="$router.push({name: 'addWorks'})">发布</el-button>
      </el-col>
      <el-col :span="18" />
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="works.list"
      style="width: 100%">
      <el-table-column
        prop="work_id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="work_title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="work_desc"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="work_url"
        label="作品链接">
        <template slot-scope="scope">
          <a :href="`https://720yun.com/${scope.row.work_url}`" target="_blank">{{`https://720yun.com/${scope.row.work_url}`}}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="封面图">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="'http://127.0.0.1:7001'+scope.row.work_src"
            fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="发布人">
         <template slot-scope="scope">
           {{scope.row.user_name}}
         </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{scope.row.create_time | timeAgo}}
        </template>
      </el-table-column>
      <el-table-column label="是否推荐">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            @change="toggleRecommend(scope.row, scope.$index)"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
            <!-- <el-button
            @click.native.prevent="editWork(scope.$index)"
            type="info"
            size="mini">
            编辑作品
          </el-button> -->
           <el-button
            @click.native.prevent="deleteWork(scope.$index)"
            type="danger"
            size="mini">
            删除作品
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="wrap" v-if="works.total">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="works.total"
        @current-change="changePage"  >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Api from "@/api/api";
export default {
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
    // 切换推荐状态
    toggleRecommend(e, i) {
      Api.toggleRecommend({
        id:e.work_id, status: e.status === 1 ? 0 : 1
      }).then(() => {
        this.works.list[i].status = this.works.list[i].status === 1 ? 0 : 1
      })
    },
    // 换页
    changePage(e) {
      this.loadData(e)
    },
    // 加载数据
    loadData(page=1, size=10) {
      Api.getWorks({
        page: --page, size
      }).then(res => {
        if(res.code ===0) {
          this.works = res.data
        }
      })
    },
    deleteWork(i) {
       const { work_id:id, work_title } = this.works.list[i];
          this.$confirm(`确定要删除${work_title}吗?`, '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            Api.removeWork({id}).then(res => {
              if(res.code === 0) {
                this.works.list.splice(i, 1);
                this.works.total -= 1;
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

