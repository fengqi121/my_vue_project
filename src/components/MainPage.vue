<template>
  <el-col>
  <el-menu
    text-color="#fff"
    default-active="1"
    class="menu-container"
    mode="horizontal"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    active-text-color="#ffd04b"
    >
    <el-menu-item index="1" @click="handleClick0">
      <span> 商城</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <img src="../assets/head.jpg" alt="Avatar" class="avatar">
      </template>
    <el-menu-item index="2-1" @click="handleClick1">
      <span>历史订单</span>
    </el-menu-item>
    <el-menu-item index="2-2" @click="handleClick2">
      <span>个人信息</span>
    </el-menu-item>
    <el-menu-item index="2-3" @click="handleClick3">
      <span>设置</span>
    </el-menu-item>
    </el-sub-menu>
  </el-menu>
    <shop_start/>
    <shop_start/>
    <shop_start/>
    <shop_start/>
    <shop_start/>
  </el-col>
</template>

<script>
import router from "@/router";
import shop_start from "@/components/Start-shop.vue";
export default {
  name: 'MainPage',
  components: {
    shop_start
  },
  data() {
    return {
      msg: 'MainPage'
    }
  },
  methods: {
    handleClick1() {
        router.push('/Self/OrderHistory')
    },
    handleClick2() {
        router.push('/Self/Info')
    },
    handleClick3() {
        router.push('/Self/Setting')
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.menu-container
{
  justify-content: right;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
}
.avatar {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
</style>