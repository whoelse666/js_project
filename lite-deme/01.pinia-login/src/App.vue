<script setup>
import { reactive } from 'vue';
import useUserStore from './store/user';
import axios from 'axios';
const userData = reactive({
  username: '',
  password: '',
});

const userStore = useUserStore();

const onLogin = () => {
  // 使用 actions，当作函数一样直接调用
  // login action 定义为了 async 函数，所以它返回一个 Promise
  userStore.login(userData);
  userData.username = '';
  userData.password = '';
};

const onLogout = () => {
  userStore.logout();
};
const gwtUser = async () => {
  // fetch('/api/user')
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
  const result = await axios.get('/api/user');
  const { data, code } = result.data;
  if (code === 0) {
    console.log(data);
  }
};

// const result = await axios.post('/api/user/login', {
//   username: 'Kunwu',
//   password: '123456'
// })

// console.log(result)
</script>

<template>
  <div>
    <button @click="gwtUser">gwtUser</button>

    <!-- state：通过 store 直接访问 -->
    <template v-if="userStore.token">
      <!-- 使用 getters，通过 store 直接访问 -->
      {{ userStore.hello }}
      <br />
      <button @click="onLogout">退 出</button>
    </template>

    <template v-else>
      用户名：<input v-model="userData.username" />
      <br />
      密码：<input v-model="userData.password" type="password" />
      <br />
      <button @click="onLogin">登 录</button>
    </template>
  </div>
</template>

<style scoped></style>
