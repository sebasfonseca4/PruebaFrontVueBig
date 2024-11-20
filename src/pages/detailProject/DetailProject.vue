<template>
    <div v-loading="loading" class="container vh-100 py-5">
        <h2>Detalle del Proyecto</h2>
        <el-form :model="project" label-width="120px">
            <el-form-item label="Nombre">
                <el-input v-model="project.name" readonly/>
            </el-form-item>
            <el-form-item label="Descripción">
                <el-input v-model="project.description" readonly/>
            </el-form-item>
            <el-form-item label="Estado">
                <el-select v-model="project.status" placeholder="Selecciona un estado">
                    <el-option label="En proceso" value="En proceso" />
                    <el-option label="Completado" value="Completado" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateProject">Guardar Cambios</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getProjectById, updateProjectService  } from '@/services/ProjectsServices';

export default {
    setup() {        
        const authStore = useAuthStore();
        const token = authStore.token;
        const route = useRoute();
        const router = useRouter();
        const loading = ref(false);
        const project = ref({});

        const fetchProject = async () => {
            try {
                loading.value = true;
                const response = await getProjectById(token, route.params.id);
                project.value = response;
                loading.value = false;
            } catch (error) {
                loading.value = false;
                console.error('Error al obtener el proyecto:', error.message);
            }
        };

        const updateProject = async () => {
            try {
                loading.value = true;
                const projecDetailEdit = {
                    name: project.value.name,
                    description: project.value.description,
                    status: project.value.status,
                };
                await updateProjectService (token, route.params.id, projecDetailEdit);
                loading.value = false;
                router.push('/dashboard');
            } catch (error) {
                loading.value = false;
                console.error('Error al actualizar el proyecto:', error.message);
            }
        };

        onMounted(() => {
            fetchProject();
        });

        return { project, loading, updateProject };
    }
};
</script>
