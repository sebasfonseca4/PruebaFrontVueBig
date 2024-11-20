<template>
    <div v-loading="loading" class="container">
        <h2>Crear tarea</h2>
        <form @submit.prevent="submitForm" class="col-12 col-md-6 mb-5">
            <div class="form-group">
                <label for="name">Nombre de la tarea</label>
                <input v-model="task.name" id="name" type="text" class="form-control" required />
            </div>
            <div class="form-group">
                <label for="status">Estado</label>
                <select v-model="task.status" id="status" class="form-control" required>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Completado">Completado</option>
                </select>
            </div>
            <div class="form-group">
                <label for="due_date">Fecha de vencimiento</label>
                <input v-model="task.due_date" id="due_date" type="date" class="form-control" required />
            </div>
            <div class="form-group">
                <label for="project_id">Proyecto</label>
                <select v-model="task.project_id" id="project_id" class="form-control" required>
                    <option v-for="project in projects" :key="project.id" :value="project.id">
                        {{ project.name }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="assigned_to">Asignado a</label>
                <input v-model="task.assigned_to" id="assigned_to" type="number" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">Crear tarea</button>
        </form>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getProjects } from '@/services/ProjectsServices';
import { createTask } from '@/services/TasksServices';

export default {
    setup() {        
        const loading = ref(false)
        const authStore = useAuthStore();
        const token = authStore.token;
        const task = ref({
            name: '',
            status: 'Pendiente',
            due_date: '',
            project_id: '',
            assigned_to: '',
        });

        const projects = ref([]);
        
        const loadProjects = async () => {
            try {
                loading.value = true;
                const response = await getProjects(token);
                projects.value = response;
                loading.value = false;
            } catch (error) {
                loading.value = false;
                console.error('Error al cargar proyectos:', error.message);
            }
        };

        const submitForm = async () => {
            try {
                loading.value = true;
                const response = await createTask(token, task.value);
                console.log('Tarea creada con éxito:', response);
                loading.value = false;
            } catch (error) {
                loading.value = false;
                console.error('Error al crear la tarea:', error.message);
            }
        };

        onMounted(() => {
            loadProjects();
        });

        return {
            task,
            projects,
            submitForm,
            loading
        };
    },
};
</script>
