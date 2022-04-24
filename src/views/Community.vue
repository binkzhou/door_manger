<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-lx-add"
          @click="addVisible = true"
          >创建小区</el-button
        >
      </div>
      <el-table
        :data="community"
        border
        class="table"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="id" label="ID" width="250"></el-table-column>
        <el-table-column prop="name" label="小区名"></el-table-column>
        <el-table-column prop="creatorId" label="创建者ID"></el-table-column>
        <el-table-column prop="province" label="省"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop="street" label="街道"></el-table-column>
        <el-table-column prop="createDate" label="创建日期"></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleOpenDoor(scope.$index, scope.row)"
              >查看门禁
            </el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEditCommunity(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDeleteCommunity(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加社区 -->
    <el-dialog title="添加社区" v-model="addVisible" width="30%">
      <el-form label-width="90px" :rules="rules" :model="form" ref="formRef">
        <el-form-item label="city" prop="city">
          <el-input v-model="form.city"></el-input>
        </el-form-item>
        <el-form-item label="cityProper" prop="cityProper">
          <el-input v-model="form.cityProper"></el-input>
        </el-form-item>
        <el-form-item label="description" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="name" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="province" prop="province">
          <el-input v-model="form.province"></el-input>
        </el-form-item>
        <el-form-item label="street" prop="street">
          <el-input v-model="form.street"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddOrUpdateCommunity">{{
            form.id ? '修 改' : '添 加'
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import {
  getCommunity,
  addCommunity,
  updateCommunity,
  delateCommunity,
} from '../api/index';
import { ElMessage } from 'element-plus';
// 路由
const router = useRouter();
// 小区列表
const community = ref([]);
// 是否显示弹窗
let addVisible = ref(false);
// 校验表单是否为空
const formRef = ref(null);
// 添加社区表单
const form = ref({
  id: '',
  city: '',
  cityProper: '',
  description: '',
  name: '',
  province: '',
  street: '',
});
// 表单验证规则
const rules = ref({
  city: [{ required: true, trigger: 'blur' }],
  cityProper: [{ required: true, trigger: 'blur' }],
  description: [{ required: true, trigger: 'blur' }],
  name: [{ required: true, trigger: 'blur' }],
  province: [{ required: true, trigger: 'blur' }],
  street: [{ required: true, trigger: 'blur' }],
});
// 获取日志列表
onBeforeMount(async () => {
  const data = await getCommunity();
  community.value = data;
});

// 清空表单
const clearForm = () => {
  form.value = {
    id: '',
    city: '',
    cityProper: '',
    description: '',
    name: '',
    province: '',
    street: '',
  };
};

// 添加小区
const handleAddOrUpdateCommunity = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      const { id, ...props } = form.value;

      /**
       * 如果又ID则是修改，否则是添加
       */
      if (id) {
        // 修改小区
        const res = await updateCommunity(form.value);
        if (res === '更新成功') {
          ElMessage.success('更新成功');
          community.value.map((item) => {
            if (item.id === form.value.id) {
              item = form.value;
            }
          });
          // 关闭弹窗
          addVisible.value = false;
          clearForm();
        } else {
          ElMessage.error('更新失败');
        }
      } else {
        // 添加小区
        const communityId = await addCommunity(props);
        if (communityId) {
          community.value.push({ ...form.value, id: communityId });
          // 关闭弹窗
          addVisible.value = false;
          ElMessage.success('添加小区成功');
          clearForm();
        }
      }
    }
  });
};

// 编辑小区
const handleEditCommunity = (index, row) => {
  form.value = row;
  // 打开弹窗
  addVisible.value = true;
};

// 删除小区
const handleDeleteCommunity = async (index, row) => {
  // 小区ID
  const communityId = row.id;
  console.log(index);
  // 根据社区ID删除小区
  const res = await delateCommunity(communityId);
  if (res === '删除成功') {
    ElMessage.success('删除小区成功');
    community.value.splice(index, 1);
  } else {
    ElMessage.error('删除小区失败');
  }
};

// 查看门禁
const handleOpenDoor = (index, row) => {
  router.push({ path: '/admin/door', query: { communityId: row.id } });
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
