<template>
  <el-row >
  <el-col :span="3">
    <!-- 菜单栏设置 -->
    <el-menu
        text-color="#fff"
        default-active="1"
        class="cl-container"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        active-text-color="#ffd04b"
    >
      <!-- 个人信息菜单 -->
    <el-menu-item index="1" @click="goToInfo">
      <span>个人信息</span>
    </el-menu-item>
    <!-- 设置菜单 -->
    <el-menu-item index="2" @click="goToSetting">
      <span>设置</span>
    </el-menu-item>
      <el-menu-item index="3" @click="goToOrderHistory">
        <span>订单</span>
      </el-menu-item>
  </el-menu>
  </el-col>
  <el-col :span="21">
    <router-view></router-view>
  </el-col>
  </el-row>
</template>

<script>
import router from "@/router";
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goToInfo() {
      router.push('/Self/Info');
    },
    goToSetting() {
      router.push('/Self/Setting');
    },
    goToOrderHistory() {
      router.push('/Self/OrderHistory');
    }
  }
};
</script>

<style scoped>
.cl-container
{
  background-color: #545c64;
  height: 100vh;
}
</style>