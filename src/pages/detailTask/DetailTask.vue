<template>
    <div v-loading="loading" class="container vh-100 py-5">
        <h2>Detalle de la tarea</h2>
        <el-form :model="task" label-width="120px">
            <div class="form-group">
                <label for="name">Nombre de la tarea</label>
                <input v-model="task.name" :disabled="user.role === 'user'" id="name" type="text" class="form-control" required />
            </div>
            <div class="form-group">
                <label for="status">Estado</label>
                <select v-model="task.status" id="status" class="form-control" required>
                    <option value="En proceso">En proceso</option>
                    <option value="Completado">Completado</option>
                </select>
            </div>
            <div class="form-group">
                <label for="due_date">Fecha de vencimiento</label>
                <input v-model="task.due_date" :disabled="user.role === 'user'" id="due_date" type="date" class="form-control" required />
            </div>
            <div class="form-group">
                <label for="assigned_to">Asignado a</label>
                <input v-model="task.assigned_to" :disabled="user.role === 'user'" id="assigned_to" type="number" class="form-control" required />
            </div>
            <el-button type="primary" @click="updateTask">Guardar Cambios</el-button>
        </el-form>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTaskById, updateTaskService  } from '@/services/TasksServices';

export default {
    setup() {        
        const authStore = useAuthStore();
        const token = authStore.token;
        const user = authStore.user;
        const route = useRoute();
        const router = useRouter();
        const loading = ref(false);
        const task = ref({});

        const fetchTask = async () => {
            try {
                loading.value = true;
                const response = await getTaskById(token, route.params.id);
                task.value = response;
                loading.value = false;
            } catch (error) {
                loading.value = false;
                console.error('Error al obtener el proyecto:', error.message);
            }
        };

        const updateTask = async () => {
            try {
                loading.value = true;
                const taskDetailEdit = {
                    name: task.value.name,
                    status: task.value.status,
                    due_date: "2024-12-01",
                    assigned_to: 2
                };
                await updateTaskService(token, route.params.id, taskDetailEdit);
                loading.value = false;
                router.push('/dashboard');
            } catch (error) {
                loading.value = false;
                console.error('Error al actualizar el proyecto:', error.message);
            }
        };

        onMounted(() => {
            fetchTask();
        });

        return { task, loading, updateTask, user };
    }
};
</script>
