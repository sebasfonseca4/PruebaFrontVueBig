// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/login/Login.vue';
import Dashboard from '../pages/dashboard/dashboard.vue';
import DetailProject from '../pages/detailProject/DetailProject.vue';
import DetailTask from '../pages/detailTask/DetailTask.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/projects/:id',
        name: 'DetailProject',
        component: DetailProject
    },
    {
        path: '/tasks/:id',
        name: 'DetailTask',
        component: DetailTask
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

export default router;
