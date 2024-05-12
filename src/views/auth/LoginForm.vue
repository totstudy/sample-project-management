<script setup lang="ts">
  import { ref,onMounted,computed } from 'vue';
  import { RouterLink, useRouter } from 'vue-router';
  
  const loginUsername = ref('');
  const loginPassword = ref('');
  const registerUsername = ref('');
  const registerPassword = ref('');
  const isLoggedIn = ref(false);
  // const isRegisteredIn = ref(false);
  const loggedInUser = ref('');
  const router = useRouter();

  const isRegisteredIn = computed(()=>{
    return localStorage.getItem('users') !== null
  })

  // const isRegisteredIn = ref(false);
  

  onMounted(async ()=>{
    // isRegisteredIn.value = localStorage.getItem('users') !== null;
    console.log("isRegisteredIn:",isRegisteredIn.value)
  })


  function login() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    console.log("users:",users)
    if (users[loginUsername.value] === loginPassword.value) {
      isLoggedIn.value = true;
      loggedInUser.value = loginUsername.value;
      router.push({name: "ProjectList"});
    } else {
      alert('ログイン失敗');
    }
  }
  
  function logout() {
    isLoggedIn.value = false;
    loggedInUser.value = '';
  }
  
  function register() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    users[registerUsername.value] = registerPassword.value;
    localStorage.setItem('users', JSON.stringify(users));
    // ユーザー登録後にページをリロードする
    location.reload();
  }
  </script>

<template>
    <div>
      <form v-if="isRegisteredIn" @submit.prevent="login" class="form-login">
        <input v-model="loginUsername" placeholder="Username" class="login-input" />
        <input v-model="loginPassword" type="password" placeholder="Password" class="login-input" />
        <button type="submit">ログイン</button>
      </form>
      <form v-if="!isRegisteredIn" @submit.prevent="register" class="form-login">
        <input v-model="registerUsername" placeholder="Username" class="login-input" />
        <input v-model="registerPassword" type="password" placeholder="Password" class="login-input" />
        <button class="register-button" type="submit">ユーザー登録</button>
      </form>
    </div>
</template>
  
<style scoped>
.login-input {
  width: 200px;
  height: 30px;
  font-size: 20px;
  margin-bottom: 10px;
}
.form-login {
  display: flex;
  flex-direction: column;
}
</style>
  