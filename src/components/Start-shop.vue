<template>
  <div>
      <div class="parent" >
      <div class="shop-image" >
        <img :src="imageUrl" alt="Shop image">
      </div>
      <div  class="shop-name" @click="handleClick" >
      {{shopName}}
      </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Start-shop',
  props: {
    shopID: String,
shopName: {String,
default: "店名"
},
imageUrl: String,
  },
  methods: {
    //跳转到订单页面
    handleClick() {
      this.$router.push({ path: '/Order', query: { shopID: this.shopID } });
    },
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