<template>
  <el-col>
<h1>订单</h1>
    <el-table :data="tableData.orderItems" border style="width: 100%">
      <el-table-column label="菜品图片" width="180">
        <template v-slot="{ row }">
          <img :src="this.$apiUrl+row.dish.image" style="width: 50px; height: 50px;">
        </template>
      </el-table-column>
      <el-table-column prop="dish.name" label="菜品名"  />
      <el-table-column prop="number" label="菜品数量"/>
      <el-table-column prop="dish.price" label="菜品单价" />
    </el-table>
    <div class="info">
    <h1>商家：{{tableData.business_name}}</h1>
    <h1>总计：{{tableData.amount}}</h1>
    <h1>地址：{{tableData.address}}</h1>
    <h1>订单号：{{tableData.number}}</h1>
    <h1>备注：{{tableData.remark}}</h1>
<el-button type="primary" @click="settle" style="transform: translateX(500px);width: 100px;height: 50px;font-size: 30px ">
  {{buttontext}}</el-button></div>
</el-col>
</template>

<script>
import axios from "axios";
import router from "@/router";
export default {
  data() {
    return {
      jiesuan: false,
      buttontext: '结算',
      ordernumber: 0,
      tableData: [
        // 假设的数据
        {  dish:"菜品1", num: 2, imageUrl: "https://tse4-mm.cn.bing.net/th/id/OIP-C.cGjCuP5ghtV5SuGhFWIqUAHaHa?rs=1&pid=ImgDetMain" },
        { dish:"菜品2", num: 1, imageUrl: "https://tse4-mm.cn.bing.net/th/id/OIP-C.cGjCuP5ghtV5SuGhFWIqUAHaHa?rs=1&pid=ImgDetMain" },
      ]
    }
  },
  created() {
    this.jiesuan = this.$route.query.jiesuan;
    this.buttontext = this.jiesuan ? '结算' : '退出';
    this.ordernumber = this.$route.query.ordernumber;
    this.getorder();
  },
  methods: {
    settle() {
   if(this.jiesuan) alert('结算成功')// 结算
      router.push('/Self/OrderHistory');//跳转到订单历史页面
    },
    async getorder() {
      try {
        const response = await axios.get(`${this.$apiUrl}/order/get/id/${this.ordernumber}`, {
          params: {
            user_id: this.$store.state.accountInfo.user_id,
            business_id: this.$route.query.shopID
          }
        });
        if (response.data.result) {
          this.tableData = response.data.data;
        } else {
          console.error('Failed to get order:', response.data.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        console.log('获取订单失败');
        console.log(this.ordernumber);
      }
    }
  }
}
</script>

<style scoped>
.info {
  left: 50px;
  margin-top: 20px;
  position: absolute;
}
</style>