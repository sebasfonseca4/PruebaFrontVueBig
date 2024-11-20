<template>
    <div v-loading="loading" class="container">
        <h2>
            Tareas
        </h2>
        <el-table :data="tasks" style="width: 100%">
            <el-table-column prop="id" label="Id" width="50"/>
            <el-table-column prop="name" label="Nombre de la tarea" width="180" />
            <el-table-column prop="project_id" label="Id del proyecto" width="100" />
            <el-table-column prop="assigned_to" label="Asignado a" width="100" />
            <el-table-column prop="status" label="Estado" width="100"/>
            <el-table-column prop="due_date" label="Fecha de vencimiento" width="100"/>
            <el-table-column fixed="right" min-width="20">
                <template #default="{ row }">
                    <el-button  v-if="user_role !== 'user'" link type="primary" size="small" @click="deleteTaskById(row.id)">
                        <el-icon color="red"><Delete /></el-icon>
                    </el-button>
                    <el-button link type="danger" size="small" @click="goToEdit(row.id)">
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
import { getTasks, deleteTask } from '@/services/TasksServices';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    props: {
        user_role: {
            type: String,
            required: true
        }
    },
    setup () {        
        const router = useRouter();
        const authStore = useAuthStore();
        const token = authStore.token;
        const loading = ref(false)
        const tasks = ref([]);

        const fetchTasks = async () => {
            try {
                loading.value = true;
                const response = await getTasks(token);
                tasks.value = response;
                loading.value = false;
            } catch (error) {
                loading.value = false;
                console.error('Error al obtener tareas:', error.message);
            }
        };

        const deleteTaskById = async (id) => {
            try {
                loading.value = true;
                await deleteTask(token, id);
                fetchTasks();
                loading.value = false;
            } catch (error) {
                loading.value = false;
                console.error('Error al borrar el proyecto:', error.message);
            }
        }

        const goToEdit = (id) => {
            router.push({ name: 'DetailTask', params: { id } });
        };

        onMounted(() => {
            fetchTasks();
        });

        return { tasks, loading, deleteTaskById, goToEdit }
    }
}
</script>