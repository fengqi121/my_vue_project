<template>
  <h1>历史订单</h1>
<oneorder v-for="order in orderHistory" :key="order.id" :ordernumber="order.id"
:imageUrl="order.image" :shopName="order.business_name" />
  <el-pagination
      class="thenu"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 30, 40]"
      :total="total">
  </el-pagination>
</template>

<script>
import oneorder from "@/components/one-order.vue";
import axios from "axios";
export default {
  name: 'OrderHistoryPage',
  components: {
    oneorder
  },
  data() {
    return {
      total: 0,
      orderHistory: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  created() {
    console.log('Order history page created');
    this.fetchOrderHistory();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchOrderHistory();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchOrderHistory();
    },
//获取历史订单信息
    async fetchOrderHistory() {
      try {
        const response = await axios.get(`${this.$apiUrl}/order/get/user_id/${this.$store.state.accountInfo.data.id}`,

            {
              params: {
                pn: this.currentPage,
                ps: this.pageSize,
              }
            });
        if (response.data.result) {
          this.orderHistory = response.data.data.records;
          this.total = response.data.data.total;
          console.log('Order history:');
        } else {
          console.error('Failed to fetch order history:', response.data.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  }
}
</script>
<style scoped>
.thenu {
  bottom: 0;
  position: fixed;
}
</style>