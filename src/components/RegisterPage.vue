<template>
  <div class="Register-container">
    <h1 class="title">注册</h1>
    <el-form @submit.prevent="register" class="Register-form" label-width="80px" label-position="left">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" clearable show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="confirmPassword" clearable show-password></el-input>
      </el-form-item>
      <el-button type="primary" native-type="submit">注册</el-button>
    </el-form>

  </div>
</template>

<script>
import axios from 'axios'
import store from '@/store'
import router from '@/router'
export default {
data() {
  return {
    form: {
      username: '',
      password: ''
    },
    confirmPassword: ''
  }
},
methods: {
  async register() {
    if (this.form.password !== this.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    try {
      const response = await axios.post('http://your-backend-url/register', this.form)
      if (response.data.success) {
        alert('Registration successful!')
        store.commit('setUser', this.form.username)
        await router.push('/Main')
      } else {
        console.log('Registration failed!')
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
  margin-left: 150px;
  width: 80px;
  height: 50px;
}
.title {
  margin-left: 70px;
  color: #409EFF;
}
</style>