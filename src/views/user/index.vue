<template>
  <div>
    <!-- 标头 -->
    <el-row>
        <el-col :span="6">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="addUser">新增用户</el-button>
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
      <el-table-column label="身份">
         <template slot-scope="scope">
           {{scope.role | role}}
         </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="create_time"/>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteUser(scope.$index)"
            type="text"
            size="mini">
            移除用户
          </el-button>
            <el-button
            @click.native.prevent="editRow(scope.$index)"
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

    <!-- 编辑/新增用户的弹窗 -->
    <el-dialog
      :title="formTitle===1?'新增用户': '编辑用户信息'"
      :visible.sync="showEdit"
      @closed="clearForm"
      width="30%"
      center>
      <el-form :model="editForm" :rules="editRules" label-width="100px" ref="editForm" >
        <el-form-item label="姓名" prop="user_name">
          <el-input v-model="editForm.user_name"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="user_account">
          <el-input v-model="editForm.user_account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="user_pwd">
          <el-input v-model="editForm.user_pwd"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEdit = false">取 消</el-button>
        <el-button type="primary" @click="submitUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Api from "@/api/api"
import md5 from "md5"
export default {
    data() {
        return {
            users: {
                list: [],
                total: 0
            },
            showEdit: false,
            formTitle: "",
            editForm: {
              user_name: "",
              user_account: "",
              user_pwd: "",
              user_id: ""
            },
            editRules: {
              user_name: [{required: true, message: "请填写姓名!",trigger: "blur"}],
              user_account: [{ required: true, message: "请填写账号!",trigger: "blur"}, 
                 { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }],
              user_pwd: [{required: true, message: "请填写密码!",trigger: "blur"}, 
                  { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }]
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
        // 删除用户
        deleteUser(i) {
          const { user_id:id, user_name } = this.users.list[i];
          this.$confirm(`确定要删除${user_name}吗?`, '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            Api.removeUser({id}).then(res => {
              if(res.code === 0) {
                this.users.list.splice(i, 1);
                this.users.total -= 1;
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
        // 关闭dialog的时候重置列表
        clearForm() {
          this.$refs["editForm"].resetFields();
        },
        // 新增用户
        addUser() {
          this.formTitle = 1
          this.showEdit = !this.showEdit
        },
        // 初始化编辑更新用户
        editRow(i) {
          this.showEdit = !this.showEdit
          this.formTitle = 2
          const { user_name, user_account, user_id } = this.users.list[i];
          this.editForm.user_name = user_name;
          this.editForm.user_account = user_account;
          this.editForm.user_id = user_id
        },
        // 提交
        submitUser() {
          this.$refs.editForm.validate((valid) => {
            if (valid) {
             const params = {
               acc: this.editForm.user_account,
               pwd: md5(this.editForm.user_pwd),
               name: this.editForm.user_name,
               id: this.editForm.user_id
             }
             if(this.formTitle === 1) {
               Api.addUser(params).then(res => {
                this.showEdit = !this.showEdit;
                 this.users.list = this.users.list.concat(res.data)
                 this.users.total += 1;
              })
             } else {
                Api.updateUser(params).then( res => {
                const nList = this.users.list.map(e => {
                   if(e.user_id === res.data[0].user_id) {
                     e.user_name = res.data[0].user_name;
                     e.user_account = res.data[0].user_account;
                   }
                   return e
                 })
                 this.users.list = nList;
               })
               this.showEdit = !this.showEdit;
             }
            } else {
              return false;
            }
          })
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
