<template>
  <mainMenu/>
  <singledish v-for="item in computedShopItems" :key="item.id" :dishName="item.name"
              :imageUrl="this.$apiUrl+item.image" :price="item.price" :num="item.num" :dishID="item.id" @cartchange="getCart"/>
  <el-pagination
      class="my-pagination"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :page-sizes="[10, 20, 30, 40]"
    :total="total">
</el-pagination>
  <el-button type="primary" style="margin-left: 16px;margin-top: 300px" @click="handleclick" class="cart-button" >
  </el-button>

  <el-drawer v-model="drawer" title="购物车"  class="cart" >
<dish @cartchange="getCart" v-for="item in cart" :key="item.id" :dishName="item.name"
      :imageUrl="this.$apiUrl+item.image" :shopID="item.shop_id" :dishID="item.dish_id" :num1="item.number" :price="item.amount"/>
    <el-button class="settle" type="primary" @click="settle"> 结算</el-button>
  </el-drawer>
</template>

<script>
import router from "@/router";
import mainMenu from "@/components/MainMenu.vue";
import dish from "@/components/Dish.vue";
import singledish from "@/components/dish-start.vue"
import axios from "axios";
export default {
  components: {
    dish,
    singledish,
    mainMenu,
  },
  computed: {
    computedShopItems() {
      return this.shop_items.map(item => {
        const cartItem = this.cart.find(cartItem => cartItem.dish_id === item.id);
        item.num = cartItem ? cartItem.number : 0;
        return item;
      });
    }
  },
  data() {
    return {
      ordernumber: 0,
      shopID: 2,
      show:true,
      drawer: false,
      shop_items: [],
      cart: [],
      currentPage: 1,
      pageSize: 10,
      total: 10
    };
  },
  created() {
    this.shopID =this.$route.query.shopID;//读取商店id参数
  this.fetchShopItems();
  },
  methods: {
    handleclick() {
      this.drawer = true;
      this.getCart();
    },//点击购物车
    //添加到购物车
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchShopItems()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchShopItems()
    },
    
      async fetchShopItems() {
        try {
          const response = await axios.get(`${this.$apiUrl}/dish/page/${this.shopID}`, {
            params: {
            pn: this.currentPage,
            ps: this.pageSize,
          }
          });
          if (response.data.result) {
            this.total = response.data.data.total;
            this.shop_items = response.data.data.records;
          } else {
            console.error('Failed to fetch shop items:', response.data.message);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      },//分页获取商店菜品
      // ...
    //获取购物车
    async getCart() {
      try {
        const response = await axios.get(`${this.$apiUrl}/user/cart/show/${this.$store.state.accountInfo.data.id}`);
if (response.data.result) {
  console.log('Successfully fetched cart');
          this.cart = response.data.data;
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },
    //结算并获取订单号
      async settle() {
      try {
        const response = await axios.get(`${this.$apiUrl}/order/create`, {
          params: {
            user_id: this.$store.state.accountInfo.data.id,
            business_id: this.shopID
          }
        });
        if (response.data.result) {
          this.ordernumber = response.data.data;
          console.log('结算成功');
          console.log(this.ordernumber);
        } else {
          console.error('Failed to settle:', response.data.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        console.log('结算失败');
      }
        this.drawer = false;
        router.push({path: '/finalorder', query: {ordernumber: this.ordernumber,jiesuan:true}});
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
  z-index: 100;
}
.settle {
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 100px;
}
.cart {
  width: 400px;
  height: 100%;
}
.my-pagination {
  position: fixed;
  left: 20px;
  bottom: 0;
}
</style>