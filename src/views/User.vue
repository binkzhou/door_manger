<template>
  <div>
    <div class="container">
      <el-table
        :data="users"
        border
        class="table"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="id" label="ID" width="300"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { getUserList } from '../api/index';

// 用户列表
const users = ref([]);

// 获取用户列表
onBeforeMount(async () => {
  const data = await getUserList();
  users.value = data;
});
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 180px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.avatar-uploader-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180px;
}
</style>
