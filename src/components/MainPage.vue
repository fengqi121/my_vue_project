<template>
  <el-col>
    <menu_start/>
    <shop_start v-for="shop in shop_data" :key="shop.id" :shopName="shop.name"
                                   :imageUrl="this.$apiUrl+shop.image" :shopID="shop.id"/>
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
  </el-col>
</template>

<script>
import shop_start from "@/components/Start-shop.vue"
import menu_start from "@/components/MainMenu.vue"
import axios from "axios";
export default {
  components: {
    shop_start,
    menu_start,
  },
  data() {
    return {
      total: 12,
      shop_data: [
      ],
      currentPage: 1,
      pageSize: 4,
    };
  },
  created() {
    this.fetchShopData();
  },
  methods: {
      // ...
     async fetchShopData() {
       try {
         const response = await axios.get(`${this.$apiUrl}/business/page`, {
           // 在这里添加你的请求参数
           params: {
             pn: this.currentPage,
             ps: this.pageSize,
           }
         });
         if (response.data.result) {
           this.shop_data = response.data.data.records;
           this.total = response.data.data.total;
           // 假设服务器返回的数据在data属性中
         } else {
           console.log('An error occurred:', response.data.msg);
         }
       } catch (error) {
         console.error('An error occurred:', error);
       }
     },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchShopData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
       this.fetchShopData();
    }
  }
};
</script>
<style scoped>
.thenu {
bottom: 0;
  position: fixed;
}
</style>