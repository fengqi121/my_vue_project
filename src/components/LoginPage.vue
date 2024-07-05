<template>
  <div class =page>
    <h1 class="title">FoodFortress</h1>
  <el-form @submit.prevent="submitForm" ref="form" :model="form" label-width="80px" label-position="left">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="form.name" clearable></el-input>
     </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" clearable show-password></el-input>
    </el-form-item>
   </el-form>
    <el-text type="info" class="mx-1">{{statues}}</el-text>
    <div class="button-position">
  <el-button type="primary" @click="submitForm('form')">登录</el-button>
  <el-button type="primary" @click="register">注册</el-button>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import router from "@/router";
export default {
  data() {
    return {
      form: {
        name: '',
        password: ''
      },
      statues: '请输入账号和密码'
    }
  },
  methods: {
    register() {
      router.push('/Register');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post(`${this.$apiUrl}/user/login`, this.form)
              .then(async response => {
                if (response.data.result) {
                  console.log('Login successful!');
                  alert('Login successful!');
                  await this.$store.commit('login', response.data);
                  await router.push('/Main');
                } else {
                  this.statues = '用户名或密码错误';
                  console.log('Login failed!');
                }
              })
              .catch(error => {
                console.log('An error occurred:', error);
              });
        } else {
          console.log('Form validation failed!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
button {
  margin: 10px;
  width: 80px;
  height: 50px;
}
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  flex-direction: column;
  transform: scale(1.5);
}
.button-position {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-left: 80px;
}
.title {
  font-size: 50px;
  color: #409EFF;
  margin-left: 100px;
}
</style>