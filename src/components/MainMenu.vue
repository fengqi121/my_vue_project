<template>
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
    <el-menu-item index="1"  @click="handleClick0">
      <span> 商城</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <img :src="imageUrl" alt="Avatar" class="avatar">
      </template>
      <el-menu-item index="2-1" @click="handleClick1">
        <span>历史订单</span>
      </el-menu-item>
      <el-menu-item index="2-2" @click="handleClick2">
        <span>个人信息</span>
      </el-menu-item>
      <el-menu-item index="2-4" @click="exit">
        <span>退出登录</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import router from "@/router";
export default {
  data() {
    return {
      imageUrl:'https://img.ixintu.com/download/jpg/20200901/3e9ce3813b7199ea9588eeb920f41208_512_512.jpg!ys',
    }
  },
  created() {
    if (this.$store.state.accountInfo.data.image!=='')
    this.imageUrl = this.$store.state.accountInfo.data.image;
  },
  methods: {
    handleClick0() {
      router.push('/Main')
    },
    handleClick1() {
      router.push('/Self/OrderHistory')
    },
    handleClick2() {
      router.push('/Self/Info')
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    exit(){
      this.$store.commit('logout')
      router.push('/')
    }
  }
}
</script>
<style scoped>
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.menu-container {
  top:0;
  position: fixed;
width: 100%;
  justify-content: flex-end;
  z-index: 100;
}
</style>