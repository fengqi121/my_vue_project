<template>
  <div class="row-dish">
      <div   class="shop-image" >
        <img src="../assets/head.jpg" alt="dish image">
      </div>
      <div  class="dish-name" >
        <h1 >菜品名</h1>
        <el-input-number  class="my-input-number" v-model="num" :min="0" :max="20" @change="handleChange"/>
      </div>
  </div>
</template>

<script>
import {ref} from "vue";
export default {
  name: 'Dish-name',
  props:['index'],
  data() {
    return {
      num:ref(1)
    }
  },
  methods: {
    handleChange() {
      console.log(this.num)
      if(this.num===0){
        this.$emit('remove',this.index)
      }
    }
  }
}
</script>

<style scoped>
.shop-image {
  width: 100px;
  height: 100px;
  img {
    width: 100px;
    height: 100px;
  }
}
.dish-name {
  height: 100px;
  width: 300px;
  text-align: left;
  font-size: 20px;
  display: flex;
  background-color: bisque;
}
.row-dish {
  flex-direction: row;
  height: 102px;
  width: 400px;
  display: flex;
  border: red solid 1px;
}
</style>