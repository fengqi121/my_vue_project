<template>
  <el-col>
      <el-button class="my-button" @click="edit">{{buttontext}}</el-button>
    <el-row class="row-one" >
      <p style="font-size: 30px;margin-top: 30px;">头像：</p>
      <img :src="imageUrl" alt="头像" style="width: 100px;height: 100px;margin-left: 20px;">
      <input v-if="!edit_name" class="avatar" type="file" @change="onFileChange" >
    </el-row>
    <el-row class="row-one">
      <p style="font-size: 30px;margin-top: 0;">昵称：</p>
<el-input class="my-input" v-model="name"  placeholder="请输入内容" :disabled="edit_name" clearable></el-input>
    </el-row>
    <el-row class="row-one">
      <p style="font-size: 30px;margin-top: 0;">地址：</p>
      <el-input class="my-input" v-model="address"  placeholder="请输入内容" :disabled="edit_name" clearable></el-input>
    </el-row>
    <el-row class="row-one">
      <p style="font-size: 30px;margin-top: 0;" >性别：</p>
      <el-radio-group v-model="radio1" class="ml-4" :disabled="edit_name">
        <el-radio value="0" class="my-radio" ><div class="ziti">男</div> </el-radio>
        <el-radio value="1" class="my-radio" ><div class="ziti">女</div> </el-radio>
      </el-radio-group>
    </el-row>
    <el-row class="row-one">
      <p style="font-size: 30px;margin-top: 0;">密码:</p>
      <el-input class="mys-input" type="password" v-model="password" placeholder="***********" :disabled="edit_name">
      </el-input>
     </el-row>
    <el-row class="row-one">
      <p style="font-size: 30px;margin-top: 0;">简介：</p>
<el-input class="the-input" type="textarea" rows="10" v-model="introduction"   :disabled="edit_name" clearable></el-input>
    </el-row>
</el-col>
</template>
<script>
import {ref} from "vue";
import axios from "axios";
export default {
  data() {
    return {
      imagename: '',
      selectfile:null,
      address: ref(''),
      password: ref(''),
      name: ref(''),
      edit_name: true,
      buttontext:'编辑',
      introduction: ref(''),
      radio1: ref('0'),
      imageUrl: 'https://img.ixintu.com/download/jpg/20200901/3e9ce3813b7199ea9588eeb920f41208_512_512.jpg!ys'
    }
  },
  created() {
    this.name = this.$store.state.accountInfo.data.name;
    this.address = this.$store.state.accountInfo.data.address;
    this.password = this.$store.state.accountInfo.data.password;
    this.radio1 = this.$store.state.accountInfo.data.sex;
    this.introduction = this.$store.state.accountInfo.data.introduction;
    if(this.$store.state.accountInfo.data.image!=='') this.imageUrl = this.$store.state.accountInfo.data.image;
  },
  methods: {
    edit() {
      this.edit_name = !this.edit_name;
      this.buttontext = this.edit_name ? '编辑' :'保存' ;
      if (this.edit_name) {
        this.$store.state.accountInfo.data.name = this.name;
        this.$store.state.accountInfo.data.address = this.address;
        this.$store.state.accountInfo.data.password = this.password;
        this.$store.state.accountInfo.data.sex= this.radio1;
        this.$store.state.accountInfo.data.introduction = this.introduction;
        this.uploadImage();
        this.$store.state.accountInfo.data.image = this.imageUrl;


      }
    },
    async uploadImage() {
      try {
        let  formData = new FormData();
        formData.append('file', this.selectfile);
        const response = await axios.post(`${this.$apiUrl}/image/upload`,formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.data.result) {
          this.imagename = response.data.data;
          this.imageUrl=`${this.$apiUrl}/temp/${this.imagename}`;
          console.log('Image uploaded:', this.imagename);
          this.$message.success('头像上传成功');
        } else {
          this.$message.error('头像上传失败');
        }
      } catch (error) {
        console.error('上传头像时发生错误:', error);
        this.$message.error('头像上传时发生错误');
      }
      this.uploadInfo();
    },
    async uploadInfo() {
      try {
        const response = await axios.post(`${this.$apiUrl}/user/update`, {
          id: this.$store.state.accountInfo.data.id,
          name: this.name,
          address: this.address,
          password: this.password,
          sex: this.radio1,
          introduction: this.introduction,
          image: this.imageUrl
        });
        if (response.data.result) {
          // 上传成功的处理
          this.$message.success('信息上传成功');
        } else {
          // 上传失败的处理
          this.$message.error('信息上传失败');
        }
      } catch (error) {
        console.error('上传信息时发生错误:', error);
        this.$message.error('信息上传时发生错误');
      }
    },
    onFileChange(e) {
      const file = e.target.files[0]; // 获取用户选择的文件
      if (file) {
        // 创建一个 FileReader 对象用于读取文件
        const reader = new FileReader();

        // 当文件读取完成时，将结果设置为 img 的 src
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
   this.selectfile = file;
         // 读取文件
          reader.readAsDataURL(file);
      }
    }
    },
}
</script>

<style scoped>
.ml-4 {
  margin-left: 20px;

}
.ziti {
  font-size: 30px;
  transform: translateY(-5px);
}
.my-radio {
  transform: translateY(-10px);
}
.my-input {
  height: 40px;
  width: 200px;
  background-color: #409EFF;
  font-size: 20px;
}
.the-input {
  font-size: 20px;
  width: 1000px;
  background-color: #409EFF;
  vertical-align: top;

}
.avatar {
  margin-left: 20px;
  margin-top: 30px;
font-size: 20px;
  width: 100px;
  height: 40px;
}
.my-button {
  margin-top: 20px;
  left:220px;
  width: 50px;
  height: 40px;
  position: absolute;
  top: 20px;
  background-color: bisque;
}
.row-one {
  margin-left: 40px;
  height: 40px;
  margin-top: 100px;
}
.mys-input {
width: 200px;
margin-left: 30px;
  height: 40px;
}
</style>