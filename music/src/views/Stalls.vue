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
          <el-button type="danger" icon="el-icon-delete" size="small" @click="mulDelete">批量删除</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="stalls.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
    @selection-change="selectChange" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="Pid" label="停车场号" width="180"></el-table-column>
      <el-table-column prop="Sid" label="车位号" width="180"></el-table-column>
      <el-table-column prop="ifEmpty" label="是否空位" width="180"></el-table-column>
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
      :total="stalls.length"
    ></el-pagination>
    <el-dialog
      :title="dialogTitle"
      width="600px"
      :visible.sync="userFormVisible"
      @close="resetForm('userForm')"
    >
      <el-form :model="stall" :rules="rules" ref="userForm">
        <el-form-item label="停车场号" prop="Pid" label-width="50px">
          <el-input v-model="stall.Pid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="车位号" label-width="50px">
          <el-input v-model="stall.Sid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否空位" label-width="50px">
          <el-input v-model="stall.ifEmpty" autocomplete="off"></el-input>
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
      currentPage:1, //初始页
                pagesize:10,    //    每页的数据
      stalls: [],
      stall: {
        Pid: "",
        Sid: "",
        ifEmpty:"",
      },
      userBackup: Object.assign({}, this.stall),
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
    this.getStalls();
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },
    getStalls() {
      this.loading = true;
      this.$http
        .get("http://127.0.0.1:12345/Sselect")
        .then(res => {
          console.log(res.data);
          this.stalls = res.data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleEdit(index, row) {
      this.dialogTitle = "编辑";
      this.stall = Object.assign({}, row);
      this.userFormVisible = true;
      this.rowIndex = index;
    },
    submitUser(formName) {
      if (this.dialogTitle === "新增") {
        console.log("add");
        this.$http({
          method: "get",
          url:
            "http://127.0.0.1:12345/Sinsert?Pid=" +
            this.stall.Pid +
            "&Sid=" +
            this.stall.Sid +
            "&ifEmpty=" +
            this.stall.ifEmpty
           
        });
      }

      if (this.dialogTitle === "编辑") {
        console.log("updataa");
        this.$http({
          method: "get",
          url:
            "http://127.0.0.1:12345/Supdate?Pid=" +
            this.stall.Pid +
            "&Sid=" +
            this.stall.Sid +
            "&ifEmpty=" +
            this.stall.ifEmpty
        });
      }

      // 表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogTitle === "编辑") {
            // id非空-修改
            this.stalls.splice(this.rowIndex, 1, this.stall);
          } else {
            // id为空-新增
            this.stall.id = this.stalls.length + 1;
            this.stalls.unshift(this.stall);
            //this.stalls.splice(this.rowIndex, 1, this.user);
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
      this.$confirm(`确定删除用户 【${row.Pid}】 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            method: "get",
            url: "http://127.0.0.1:12345/Sdelete?Pid="+this.stall.Pid
          });
          this.stalls.splice(index, 1);
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
    mulDelete() {
      let len = this.multipleSelection.length;
      if (len === 0) {
        this.$message({
          type: "warning",
          message: "请至少选择一项！"
        });
      } else {
        this.$confirm(`确定删除选中的 ${len} 个用户吗？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$http({
              method: "get",
              url: "http://127.0.0.1:12345/Sdelete?Pid=" + this.stall.Pid
            });

            this.$message({
              type: "success",
              message: `成功删除了${len}条数据！`
            });
          })
          .catch(() => {
            console.log("取消删除");
          });
      }
    },
    selectChange(val) {
      this.multipleSelection = val;
    },
    handleAdd() {
      this.dialogTitle = "新增";
      this.stall = Object.assign({}, this.userBackup);
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
