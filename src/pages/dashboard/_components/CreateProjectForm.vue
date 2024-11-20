<template>
    <div v-loading="loading" class="container">
        <h2>Crear Proyecto</h2>
        <form @submit.prevent="submitForm" class="col-12 col-md-6 mb-5">
            <div class="mb-3">
                <label for="name" class="form-label">Nombre del Proyecto</label>
                <input type="text" class="form-control" id="name" v-model="project.name" required>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Descripción</label>
                <textarea class="form-control" id="description" v-model="project.description" required></textarea>
            </div>
            <div class="mb-3">
                <label for="status" class="form-label">Estado</label>
                <select class="form-select" id="status" v-model="project.status" required>
                    <option value="En proceso">En proceso</option>
                    <option value="Completado">Completado</option>
                    <option value="Pendiente">Pendiente</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="user_id" class="form-label">ID del Usuario</label>
                <input type="number" class="form-control" id="user_id" v-model="project.user_id" required>
            </div>
            <button type="submit" class="btn btn-primary">Crear Proyecto</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { createProject } from '@/services/ProjectsServices';

export default {
    setup () {
        const loading = ref(false)
        const authStore = useAuthStore();
        const token = authStore.token;
        const project = ref({
            name: '',
            description: '',
            status: 'En proceso',
            user_id: '',
        });

        const submitForm = async () => {
            try {
                loading.value = true;
                const response = await createProject(token, project.value);
                console.log('Proyecto creado:', response);
                loading.value = false;
            } catch (error) {
                console.error('Error al crear el proyecto:', error);
                loading.value = false;
            }
        };

        return {
            project,
            submitForm,
            loading
        };
    }
};
</script>
