<template>
  <div class="user-box">
    <el-row>
      <el-col :span="24">
        <div class="tool-box">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            size="small"
            @click="handleAdd"
          >新增</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="users.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      @selection-change="selectChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="Uid" label="Uid" width="180"></el-table-column>
      <el-table-column prop="Uname" label="姓名" width="180"></el-table-column>
      <el-table-column prop="permissions" label="许可" width="180"></el-table-column>
      <el-table-column prop="Pid" label="Pid"></el-table-column>

      <el-table-column>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="users.length"
    ></el-pagination>
    <el-dialog
      :title="dialogTitle"
      width="600px"
      :visible.sync="userFormVisible"
      @close="resetForm('userForm')"
    >
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item label="Uid" prop="Uid" label-width="50px">
          <el-input v-model="user.Uid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="name" label-width="50px">
          <el-input v-model="user.Uname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="许可" label-width="50px">
          <el-input v-model="user.permissions" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Pid" label-width="50px">
          <el-input v-model="user.Pid" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUser('userForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      users: [],
      user: {
        Uid: "",
        Uname: "",
        permissions: "",
        Pid: ""
      },
      userBackup: Object.assign({}, this.user),
      multipleSelection: [],
      userFormVisible: false,
      dialogTitle: "",
      rowIndex: 9999,
      rules: {
        // name: [
        //   { required: true, message: '请输入姓名', trigger: 'blur' },
        //   { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        // ]
      }
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    getUsers() {
      this.loading = true;
      this.$http
        .get("http://127.0.0.1:12345/select")
        .then(res => {
          console.log(res.data);
          this.users = res.data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleEdit(index, row) {
      this.dialogTitle = "编辑";
      this.user = Object.assign({}, row);
      this.userFormVisible = true;
      this.rowIndex = index;
    },
    submitUser(formName) {
      if (this.dialogTitle === "新增") {
        this.$http({
          method: "get",
          url:
            "http://127.0.0.1:12345/insert?Uid=" +
            this.user.Uid +
            "&Uname=" +
            this.user.Uname +
            "&permissions=" +
            this.user.permissions +
            "&Pid=" +
            this.user.Pid
        });
      }

      if (this.dialogTitle === "编辑") {
        this.$http({
          method: "get",
          url:
            "http://127.0.0.1:12345/updata?Uid=" +
            this.user.Uid +
            "&Uname=" +
            this.user.Uname +
            "&permissions=" +
            this.user.permissions +
            "&Pid=" +
            this.user.Pid
        });
      }

      // 表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogTitle === "编辑") {
            // id非空-修改
            this.users.splice(this.rowIndex, 1, this.user);
          } else {
            // id为空-新增
            this.user.id = this.users.length + 1;
            this.users.unshift(this.user);
            // this.users.splice(this.rowIndex, 1, this.user);
          }
          this.userFormVisible = false;
          this.$message({
            type: "success",
            message: this.dialogTitle === "编辑" ? "修改成功！" : "新增成功！"
          });
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm(`确定删除用户 【${row.Uid}】 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            method: "get",
            url: "http://127.0.0.1:12345/delete?Uid=" + this.user.Uid
          });
          this.users.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          console.log("取消删除");
        });
    },
    resetForm(formName) {
      this.$refs[formName].clearValidate();
    },
    selectChange(val) {
      this.multipleSelection = val;
    },
    handleAdd() {
      this.dialogTitle = "新增";
      this.user = Object.assign({}, this.userBackup);
      this.userFormVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-box {
  width: 100%;
  .tool-box {
    padding: 10px 10px;
    border-bottom: 1px solid #eee;
  }
  .el-pagination {
    margin-top: 20px;
  }
}
</style>
