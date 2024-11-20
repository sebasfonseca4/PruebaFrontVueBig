<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">{{ user?.name || 'Desconocido' }}</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item align-items-center d-flex">
                            <router-link class="mx-2 text-black text-decoration-none" to="/dashboard">Dashboard</router-link>
                        </li>
                        <li class="nav-item align-items-center d-flex">
                            <span class="mx-2 text-dark">Rol: {{ user?.role || 'Desconocido' }}</span>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-black" @click.prevent="logout" href="#">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'; 
import { useAuthStore } from '@/stores/auth';
export default {
    setup() {
        const router = useRouter();  
        const authStore = useAuthStore();
        const logout = () => {
            authStore.removeToken();
            router.push('/');
        };
        const user = authStore.user;
        return { logout, user}
    }
}
</script>