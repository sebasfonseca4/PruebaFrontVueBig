<template>
    <div v-loading="loading" class="container">
        <h2>
            Projectos
        </h2>
        <el-table :data="projects" style="width: 100%">
            <el-table-column prop="id" label="Id" width="50" />
            <el-table-column prop="name" label="Nombre del proyecto" width="180" />
            <el-table-column prop="description" label="Descripción" width="180" />
            <el-table-column prop="status" label="Estado" />
            <el-table-column fixed="right" min-width="120" v-if="user_role !== 'user'">
                <template #default="{ row }">
                    <el-button link type="primary" size="small" @click="deleteProjectById(row.id)">
                        <el-icon color="red">
                            <Delete />
                        </el-icon>
                    </el-button>
                    <el-button v-if="role !== 'user'" link type="danger" size="small" @click="goToEdit(row.id)">
                        <el-icon color="blue">
                            <Edit />
                        </el-icon>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { getProjects, deleteProject } from '@/services/ProjectsServices';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    props: {
        user_role: {
            type: String,
            required: true
        }
    },
    setup() {
        const router = useRouter();
        const authStore = useAuthStore();
        const token = authStore.token;
        const loading = ref(false)
        const projects = ref([]);

        const fetchProjects = async () => {
            try {
                loading.value = true;
                const response = await getProjects(token);
                projects.value = response;
                loading.value = false;
            } catch (error) {
                loading.value = false;
                console.error('Error al obtener proyectos:', error.message);
            }
        };

        const deleteProjectById = async (id) => {
            try {
                loading.value = true;
                await deleteProject(token, id);
                fetchProjects();
                loading.value = false;
            } catch (error) {
                loading.value = false;
                console.error('Error al borrar el proyecto:', error.message);
            }
        }

        const goToEdit = (id) => {
            router.push({ name: 'DetailProject', params: { id } });
        };

        onMounted(() => {
            fetchProjects();
        });

        return { projects, loading, deleteProjectById, goToEdit }
    }
}
</script>