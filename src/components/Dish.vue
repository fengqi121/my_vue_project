<template>
  <div class="row-dish">
      <div   class="shop-image" >
        <img :src="imageUrl" alt="dish image">
      </div>
      <div  class="dish-name" >
        <h1 >{{dishName}} {{price}}</h1>
    <el-input-number class="my-input"  v-model="num" :min="0" :max="20" @change="handleChange" />
  </div>
  </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
export default {
  name: 'Dish-name',
  data() {
    return {
      num: ref(1),
    }
  },
  created() {
    this.num = this.num1;
    console.log(this.dishID);
  },
  watch: {
    num1(newValue) {
      this.num = newValue;
    }
  },
  props: {
    dishName: {
      type: String,
      default: "菜名"
    },
    imageUrl: {
      type: String,
      default: "../assets/head.jpg"
    },
    shopID: {
      type: Number,
      default: 1
    },
    dishID: {
      type: Number,
      default: 1
    },
    price: {
      type: Float32Array,
      default: "价格"
    },
    num1: {
      type: Number,
      default: 1
    }
  },
  methods: {
    async add_to_cart() {
      try {
        const response = await axios.post(`${this.$apiUrl}/user/cart/add`, {
          user_id: this.$store.state.accountInfo.data.id,
          dish_id: this.dishID,
          number: this.num
        });//发送用户id、商品id和数量、商店id
       console.log(this.num);
        if (response.data.result) {
          console.log('添加成功');
        } else {
          console.error('Failed to add to cart:');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
      // ChildComponent.vue
      this.$emit('cartchange');
    },
    handleChange(value) {
      this.num = value;
      this.add_to_cart();
      this.$emit('cartchange');
      //如果数量为0，就显示加号
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
  font-size: 10px;
  display: flex;
  background-color: lightcyan;
}
.my-input {
  width: 100px;
  height: 100px;
  right: 0;
  font-size: 20px;
  position: absolute;
}
.row-dish {
  flex-direction: row;
  height: 102px;
  width: 100%;
  display: flex;
}
</style>