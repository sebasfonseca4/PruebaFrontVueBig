<template>
  <div>
    <!-- Escucha el evento 'login' del componente hijo -->
    <div class="container-fluid vh-100">
      <div class="row h-100">
        <div class="col-7 horizontal-gradient">
        </div>
        <div class="col-5 d-flex align-items-center justify-content-center">
          <LoginForm @login="loginUser" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/services/AuthService';
import { getUserInfo } from '@/services/GetUserService';
import LoginForm from './_components/LoginForm.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export default {
  components: {
    LoginForm,
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const loginUser = async ({ username, password }) => {
      try {
        const token = await login(username, password);
        authStore.setToken(token);
        if (token) {
          const user = await getUserInfo(token)
          authStore.setUser(user);
          router.push('/dashboard');
        }
      } catch (error) {
        alert('Error al iniciar sesión. Por favor revisa tus credenciales.');
      }
    };

    return {
      loginUser,
    };
  },
};
</script>

<style scoped>

.horizontal-gradient {
  background: linear-gradient(to right, blue, pink);
}

</style>
