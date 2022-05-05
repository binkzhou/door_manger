<template>
  <div class="about">
    <v-header />
    <v-sidebar />
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <v-tags></v-tags>
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
        <!-- <el-backtop target=".content"></el-backtop> -->
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import vHeader from '../components/Header.vue';
import vSidebar from '../components/Sidebar.vue';
import vTags from '../components/Tags.vue';
import { ElMessage } from 'element-plus';

export default {
  components: {
    vHeader,
    vSidebar,
    vTags,
  },
  setup() {
    const socketUrl = 'wss://mj.api.keker.icu/notice';
    const socket = new WebSocket(socketUrl);
    socket.onmessage = function (evt) {
      const message = JSON.parse(evt.data).contain;
      console.log(evt);
      if (message) {
        ElMessage({
          showClose: true,
          message: message,
        });
      }
    };
    onBeforeUnmount(() => {
      socket.close();
    });
    const store = useStore();
    const tagsList = computed(() =>
      store.state.tagsList.map((item) => item.name)
    );
    const collapse = computed(() => store.state.collapse);
    return {
      tagsList,
      collapse,
    };
  },
};
</script>
