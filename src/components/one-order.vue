<template>
              <el-row class="one-order">
                <el-col :span="24">
                  <el-row>
                    <div  class="shop-name">
                     <p class="name"> {{shopName}}</p>
                    </div>
                    <el-button type="primary" class="my-button" @click="checkorder" >查看订单</el-button>
                  </el-row>
                </el-col>
              </el-row>
</template>

<script>
export default {
  name: 'one-order',
  props: {
    ordernumber: {
      type: Number,
      default: 0
    },
    shopName: {
      type: String,
      default: "店名"
    },
  },
  methods: {
    checkorder() {
      this.$router.push({ path: '/finalorder', query: { ordernumber:this.ordernumber } });
    }
  }
}
</script>
<style scoped>
.one-order {
  height: 140px;
  border: #409EFF solid 1px;
  background-color: aliceblue;
}
.shop-image {
  height:140px ;
  width: 140px;
  img {
    width: 140px;
    height: 140px;
  }
}
.shop-name {
  height: 140px;
  flex-grow: 1;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightcyan;
}
.name {
   transform: translateX(-100px);
}
.my-button {
  height: 40px;
  width: 100px;
  background-color: deepskyblue;
  margin-top: 50px;
  position: absolute;
  right: 100px
}
</style>
