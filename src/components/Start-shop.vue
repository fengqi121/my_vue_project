<template>
  <div>
      <div class="parent" >
      <div class="shop-image" >
        <img src="../assets/head.jpg" alt="Shop image">
      </div>
      <div  class="shop-name" @click="handleClick" >
      店铺名
      </div>
      </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  name: 'Start-shop',
  methods: {
    handleClick() {
        router.push('/Shop')
    }
  }
}
</script>
<style scoped>
.shop-image {
  height:300px ;
  width: 300px;
  img {
    width: 300px;
    height: 300px;
  }
}
.shop-name {
  height: 300px;
  flex-grow: 1;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: bisque;
}
.parent {
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: row;
  border: #409EFF solid 1px;
}
</style>