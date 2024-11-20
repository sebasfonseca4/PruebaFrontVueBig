<template>
    <div class="vh-100 container">
        <div class="mt-4">
            <el-button type="primary" @click="setActiveView('ShowProjects')">Ver proyectos</el-button>
            <el-button v-if="user?.role == 'admin'" type="primary" @click="setActiveView('CreateProjectForm')">Crear proyectos</el-button>
            <el-button type="primary" @click="setActiveView('ShowTasks')">Ver tareas</el-button>
            <el-button v-if="user?.role == 'admin'" type="primary" @click="setActiveView('CreateTaskForm')">Crear tarea</el-button>
        </div>
        <div class="mt-5">
            <template v-if="activeView === 'ShowProjects'">
                <ShowProjects :user_role="user?.role"/>
            </template>
            <template v-if="activeView === 'CreateProjectForm'">
                <CreateProjectForm />
            </template>
            <template v-if="activeView === 'ShowTasks'">
                <ShowTasks :user_role="user?.role"/>
            </template>
            <template v-if="activeView === 'CreateTaskForm'">
                <CreateTaskForm />
            </template>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import ShowProjects from './_components/ShowProjects.vue';
import CreateProjectForm from './_components/CreateProjectForm.vue';
import ShowTasks from './_components/ShowTasks.vue';
import CreateTaskForm from './_components/CreateTaskForm.vue';
export default {
    components: {
        ShowProjects,
        CreateProjectForm,
        ShowTasks,
        CreateTaskForm
    },
    setup() {
        const authStore = useAuthStore();
        const user = authStore.user;
        const activeView = ref('ShowProjects');
        const setActiveView = (view) => {
            activeView.value = view;
        };
        return {
            user,
            activeView,
            setActiveView,
        }
    }
}
</script>