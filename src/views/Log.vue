<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input
          v-model="keyword"
          placeholder="用户名"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
      </div>
      <el-table
        :data="logs"
        border
        class="table"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="id" label="ID" width="300"></el-table-column>
        <el-table-column prop="action" label="动作"></el-table-column>
        <el-table-column prop="targetName" label="targetName"></el-table-column>
        <el-table-column prop="createDate" label="创建日期"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { getLog } from '../api/index';
// 日志列表
const logs = ref([]);
const keyword = ref('');

// 获取日志列表
onBeforeMount(async () => {
  const data = await getLog();
  logs.value = data;
});

const handleSearch = async () => {
  const value = keyword.value ? keyword.value : ' ';
  const data = await getLog(value);
  logs.value = data;
};
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
