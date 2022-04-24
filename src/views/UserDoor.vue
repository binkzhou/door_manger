<template>
  <div>
    <div class="title">门禁</div>
    <el-row :gutter="20" class="list">
      <el-col :span="21">
        <el-row :gutter="21" class="mgb20">
          <el-col
            :key="index"
            v-for="(door, index) in doors"
            :span="7"
            class="mgb10"
          >
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-user-solid grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ door.buildingNumber }}栋</div>
                </div>
                <div class="menu">
                  <div class="call" @click="handleCall(door.id)">
                    <i class="iconfont icon-24gl-phonePause"></i>
                    <span>呼叫门卫</span>
                  </div>
                  <div class="close" @click="handleLock(door.id)">
                    <i class="iconfont icon-men"></i>
                    <span>锁门</span>
                  </div>
                  <div class="camera" @click="handleCamera(door.id)">
                    <i class="iconfont icon-bayonet-camera"></i>
                    <span>开摄像头</span>
                  </div>
                  <div class="open" @click="handleOpenVisible(door.id)">
                    <i class="iconfont icon-jiesuo"></i>
                    <span>解锁门禁</span>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!-- 解锁门禁 -->
    <el-dialog title="解锁门禁" v-model="unlockVisible" width="30%">
      <el-form label-width="90px" :rules="rules" :model="form" ref="formRef">
        <el-form-item label="password" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="unlockVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleOpen">解锁门禁</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 添加门禁 -->
    <el-dialog title="添加门禁" v-model="addDoorVisible" width="30%">
      <el-form
        label-width="90px"
        :rules="doorRules"
        :model="doorControlFrom"
        ref="addDoorRef"
      >
        <el-form-item label="栋" prop="buildingNumber">
          <el-input v-model="doorControlFrom.buildingNumber"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="doorControlFrom.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDoorVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddDor">新建门禁</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import {
  getDoors,
  addDoor,
  delateDoor,
  getActionCall,
  getActionLock,
  getActionStart,
  getActionUnlock,
} from '../api/index';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
const route = useRoute();
const communityId = route.query.communityId;
const doors = ref([]);
// 是否显示弹窗
let unlockVisible = ref(false);
const form = ref({
  doorId: '',
  password: '',
});

// 校验表单是否为空
const formRef = ref(null);
// 校验添加门禁
const addDoorRef = ref(null);
// 表单验证规则
const rules = ref({
  password: [{ required: true, trigger: 'blur' }],
});

onBeforeMount(async () => {
  const data = await getDoors(communityId);
  doors.value = data;
});

// 呼叫门卫
const handleCall = async (doorId) => {
  const res = await getActionCall(doorId);
  if (res === '呼叫成功！') {
    ElMessage.success('呼叫成功');
  } else {
    ElMessage.success('呼叫失败');
  }
};

// 锁门
const handleLock = async (doorId) => {
  const params = new URLSearchParams();
  params.append('doorId', doorId);
  const res = await getActionLock(params);
  if (res === '锁门成功！') {
    ElMessage.success('锁门成功');
  } else {
    ElMessage.error('锁门失败');
  }
};

// 打开摄像头
const handleCamera = async (doorId) => {
  const res = await getActionStart('1');
  if (res === 1) {
    ElMessage.success('摄像头打开成功');
  } else {
    ElMessage.error('摄像头打开失败');
  }
};

// 解锁门禁
const handleOpenVisible = async (doorId) => {
  form.value.doorId = doorId;
  unlockVisible.value = true;
};

// 解锁门禁
const handleOpen = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      const res = await getActionUnlock(form.value);
      if (res === '开门成功') {
        ElMessage.success('开门成功');
      } else {
        ElMessage.error('开门失败');
      }
      form.value = { doorId: '', password: '' };
      unlockVisible.value = false;
    }
  });
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  font-size: 50px;
}
.list {
  display: flex;
  justify-content: center;
}
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

.el-row {
  margin-bottom: 20px;
}

.grid-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 265px;
}

.grid-cont-right {
  display: flex;
  align-items: center;
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  width: 100%;
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}
.menu {
  display: flex;
  width: 100%;
}
.menu > div {
  flex: 1;
  display: flex;
  justify-content: center;
  height: 50px;
  align-items: center;
  flex-direction: column;
  color: white;
}
.menu > div:hover {
  box-shadow: 0 2px 2px 2px #ccc;
  cursor: pointer;
}
.menu > div > span {
  font-size: 14px;
}
.call {
  background: rgb(45, 140, 240);
}
.close {
  background: #ff6666;
}
.camera {
  background: #ffcc99;
}
.open {
  background: #6666cc;
}
.mgb10 {
  padding-bottom: 10px;
}
.add_dor {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 235px;
  font-size: 20px;
  color: rgb(45, 140, 240);
  cursor: pointer;
}
.delete {
  position: absolute;
  top: -10px;
  right: 5px;
}
.delete i {
  font-size: 24px;
}
.delete:hover {
  color: red;
  box-shadow: none !important;
}
</style>
