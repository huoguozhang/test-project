<template>
  <div class="student-comp-ct">
    <div class="page-header-title">学生管理</div>
    <div class="header-ct">
      <el-input
        clearable
        @change="getStudentList"
        v-model="studentRequestParams.search"
        placeholder="搜索"
        class="width-200"
        suffix-icon="el-icon-search"></el-input>
      <el-button
        @click="deleteStudent(multipleSelection)"
        class="m-l-16"
        :disabled="!multipleSelection.length"
        type="danger">批量删除</el-button>
      <el-button class="m-l-16" type="primary" @click="beforeAddStudentItem">新增学生</el-button>
    </div>
    <el-table
      :data="studentList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="学号" prop="number"></el-table-column>
      <el-table-column label="性别" :formatter="(row) => sexMap[row.sex]"></el-table-column>
      <el-table-column label="班级" prop="section.name"></el-table-column>
      <el-table-column label="操作">
        <div slot-scope="{row}">
          <el-button @click="beforeEditStudentItem(row)">编辑</el-button>
          <el-button @click="deleteStudent(row)" type="danger">删除</el-button>
        </div>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="showStudentForm"
      :title="`${studentForm.uid ? '修改' : '新增'}学生`"
    >
      <el-form label-width="120px" :model="studentForm" :rules="studentFormRules" ref="studentForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="studentForm.name" class="width-200" show-word-limit maxlength="12"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="number">
          <el-input v-model="studentForm.number" class="width-200" show-word-limit maxlength="12"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="studentForm.sex">
            <el-radio v-for="(val, key) in sexMap" :label="key" :key="key">{{ val }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="班级" prop="section_uid">
          <el-select v-model="studentForm.section_uid" filterable class="width-200">
            <el-option
              v-for="item in sectionList"
              :key="item.uid"
              :value="item.uid"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="form-bottom-ct">
            <el-button @click="showStudentForm=false">取消</el-button>
            <el-button @click="submit" type="primary">确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'student',
  data () {
    return {
      showStudentForm: false,
      studentList: [],
      sectionList: [],
      multipleSelection: [],
      studentRequestParams: {
        search: ''
      },
      studentFormRules: {
        name: [
          { required: true, message: '学生姓名必填', trigger: 'blur' },
          { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '学号必填', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别必填', trigger: ['blur', 'change'] }
        ],
        section_uid: [
          { required: true, message: '性别必填', trigger: ['blur', 'change'] }
        ]
      },
      studentForm: {
        name: '',
        sex: '',
        section_uid: '',
        number: ''
      },
      sexMap: {
        f: '女',
        m: '男'
      }
    }
  },
  methods: {
    getStudentList () {
      this.$request.getStudentList(this.studentRequestParams).then(data => {
        this.studentList = data
      })
    },
    submit () {
      this.$refs.studentForm.validate(async valid => {
        if (!valid) return

        if (this.studentForm.uid) {
          await this.$request.updateStudentItem(this.studentForm.uid, this.studentForm)
        } else {
          await this.$request.createStudentItem(this.studentForm)
        }
        this.resetStudentForm()
        this.showStudentForm = false
      })
    },
    async deleteStudent (rows) {
      if (!Array.isArray(rows)) {
        rows = [rows]
      }
      await this.$request.deleteStudentList({ uids: rows.map(row => row.uid) })
      this.getStudentList()
    },
    resetStudentForm () {
      this.$refs.studentForm.resetFields()
      this.studentForm = {
        name: '',
        sex: '',
        section_uid: '',
        number: ''
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    beforeEditStudentItem (row) {
      Object.keys(this.studentForm).forEach(key => {
        this.studentForm[key] = row[key]
      })
      this.studentForm.uid = row.uid
      this.studentForm.section_uid = row.section.uid
      this.showStudentForm = true
    },
    beforeAddStudentItem () {
      delete this.studentForm.uid
      this.showStudentForm = true
    }
  },
  created () {
    this.$request.getSectionList().then(data => {
      this.sectionList = data
    })
    this.getStudentList()
  },
  watch: {
    showStudentForm (val) {
      if (val === false) {
        this.resetStudentForm()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.student-comp-ct {
  padding: 24px;
  .header-ct{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 24px;
  }
  .form-bottom-ct{
    display: flex;
    justify-content: flex-end;
  }
}
</style>
