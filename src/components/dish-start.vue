<template>
  <div>
    <div class="parent" >
      <div class="dish-image">
        <img :src="imageUrl" alt="dish image">
      </div>
      <div  class="dish-name"  >
        <p class="name">{{dishName}}</p>
        <p>{{price}}</p>
          <el-button class="plus"  v-if="buy" @click="buy=!buy">
            <el-icon ><Plus /></el-icon>
          </el-button>
        <el-input-number class="my-input" v-if="!buy"  v-model="num1" :min="0" :max="20" @change="handleChange" />
    </div>
  </div>
  </div>
</template>
<script>
import {Plus} from "@element-plus/icons-vue";
import axios from "axios";
export default {
  name: 'dish-start',
  components: {Plus},
  data() {
    return {
      num1: 0,
      buy: true,
      dishes: [],
      };
  },
  watch: {
    num(newValue) {
      this.num1 = newValue;
      if (newValue === 0) {
        this.buy = true;
      } else {
        this.buy = false;
      }
    }
  },
  props: {
    num: {
      type: Number,
      default: 0
    },
    dishName: {
      type: String,
      default: "菜名"
    },
    imageUrl: {
      type: String,
      default: "../assets/head.jpg"
    },
    dishID: {
      type: Number,
      default: 1
    },
    price: {
      type: Number,
      default: 0
    }
  },


  methods: {
    async addToCart() {
      try {
        const response = await axios.post(`${this.$apiUrl}/user/cart/add`, {
          dish_id: this.dishID,
          user_id:this.$store.state.accountInfo.data.id,
          number: this.num1
        });//发送用户id、商品id和数量、商店id

        if (response.data.result) {
          console.log('Successfully added to cart');
        } else {
          console.error('Failed to add to cart:');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
      this.$emit('cartchange');
    },//添加到购物车并更新购物车
    handleChange(value) {
       this.num1 = value;
      this.addToCart();
       //如果数量为0，就显示加号
      if (value === 0) {
        this.buy = true;
      }
      this.$emit('cartchange');
    }
  }
}
</script>
<style scoped>
.plus {
  position: absolute;
  right: 0;
  height: 300px;
}
.dish-image {
  height:300px ;
  width: 300px;
  img {
    width: 300px;
    height: 300px;
  }
}
.dish-name {
  height: 300px;
  flex-grow: 1;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightcyan;
}
.parent {
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: row;
  border: #409EFF solid 1px;
}
.my-input {
  right: 0;
  width: 300px;
  height: 300px;
  font-size: 30px;
  display: flex;
  position: absolute;
}
.name {
   transform: translateX(-120px);
}
el-input-number {
  font-size: 30px;
  background-color: bisque;
}
</style>