<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-row :gutter="24" class="mgb20">
          <el-col
            :key="index"
            v-for="(door, index) in doors"
            :span="6"
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
                  <div class="close">
                    <i class="iconfont icon-men"></i>
                    <span>锁门</span>
                  </div>
                  <div class="camera">
                    <i class="iconfont icon-bayonet-camera"></i>
                    <span>开摄像头</span>
                  </div>
                  <div class="open">
                    <i class="iconfont icon-jiesuo"></i>
                    <span>解锁门禁</span>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6" class="mgb10">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="add_dor">
                <div>
                  <i class="el-icon-lx-add" />
                  <span>新建门禁信息</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { getDoors, getActionCall } from '../api/index';
import { useRoute } from 'vue-router';
const route = useRoute();
const communityId = route.query.communityId;
const doors = ref([]);

onBeforeMount(async () => {
  const data = await getDoors(communityId);
  doors.value = data;
});

// 呼叫门卫
const handleCall = async (doorId) => {
  const res = await getActionCall(doorId);
  console.log(res);
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

.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 235px;
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
</style>
