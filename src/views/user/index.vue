<template>
  <div>
    <!-- 标头 -->
    <el-row>
        <el-col :span="6">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="$router.push({name: 'addBanner'})">新增用户</el-button>
        </el-col>
        <el-col :span="12"></el-col>
        <el-col :span="6"></el-col>
    </el-row>
    <!-- 用户列表 -->
    <!-- 表格 -->
    <el-table
      :data="users.list"
      style="width: 100%">
      <el-table-column
        prop="user_id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="user_account"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="role"
        label="身份">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index)"
            type="text"
            size="mini">
            移除用户
          </el-button>
            <el-button
            @click.native.prevent="deleteRow(scope.$index)"
            type="text"
            size="mini">
            编辑用户
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="wrap">
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="10"
            :total="users.total">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import Api from "@/api/api"
export default {
    data() {
        return {
            users: {
                list: [],
                total: 0
            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            Api.getUsers().then(res => {
                this.users = res.data;
            })
        },
        deleteRow(i) {
            console.log(i);
        }
    }
}
</script>

<style lang="scss">
  .wrap {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
