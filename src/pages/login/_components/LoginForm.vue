<template>
  <div>
    <h1>Iniciar sesión</h1>
    <div class="d-flex flex-column mt-4">
      <el-input class="mb-2" v-model="username" placeholder="Email"/>
      <el-input class="mb-2" v-model="password" type="password" placeholder="Contraseña" />
      <el-button class="mt-3" type="primary" @click="handleLogin">Iniciar Sesión</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits();

const username = ref('');
const password = ref('');

const handleLogin = () => {
  emit('login', { username: username.value, password: password.value });
};
</script>
