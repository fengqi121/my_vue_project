<template>
  <div class="Register-container">
    <h1 class="title">注册</h1>
    <el-form @submit.prevent="register" class="Register-form" label-width="80px" label-position="left">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" clearable show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="confirmPassword" clearable show-password></el-input>
      </el-form-item>
      <el-text type="info" class="mx-1">{{statues}}</el-text>
      <el-button type="primary" native-type="submit">注册</el-button>
    </el-form>

  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'
export default {
data() {
  return {
    form: {
      name: '',
      password: '',
      sex: 0,
    },
    statues: '请设置你的账号和密码',
    confirmPassword: ''
  }
},
methods: {
  async register() {
    if (this.form.password !== this.confirmPassword) {
      this.statues = '两次输入的密码不一致'
      return
    }
    try {
      const response = await axios.post(`${this.$apiUrl}/user/reg`, this.form)
      if (response.data.result) {
        this.statues = '注册成功'
        alert('注册成功')
        await router.push('/')
      } else {
        this.statues = '注册失败'
      }
    } catch (error) {
      console.log('An error occurred:', error)
    }
  }
}
}
</script>

<style scoped>

.Register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  transform: scale(1.5);
  justify-content: center;
}

.Register-form {
  display: flex;
  flex-direction: column;
}
button {
  margin-left: 140px;
  width: 80px;
  height: 50px;
}
.title {
  margin-left: 70px;
  color: #409EFF;
}
.mx-1 {
  margin-left: 80px;
  margin-bottom: 10px;
}
</style>