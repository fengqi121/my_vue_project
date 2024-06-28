<template>
  <el-button type="primary" style="margin-left: 16px" @click="drawer = true" class="cart-button" >

  </el-button>

  <el-drawer v-model="drawer" title="购物车"  class="cart" @remove="handleremove">
    <dish index="1"/>
    <dish index="2"/>
  </el-drawer>
</template>

<script>
import dish from "@/components/Dish.vue";
export default {
  components: {
    dish
  },
  data() {
    return {
      show:true,
      drawer: false
    };
  },
methods: {
    handleremove(index) {
      console.log(index)
    }
  }
};
</script>
<style scoped>
.cart-button {
  position: fixed;
  right: 16px;
  top: 16px;
  background-image: url("../assets/shop-cart.png");
  background-size: 100% 100%;
}
.cart {
  width: 400px;
  height: 100%;
}
</style>