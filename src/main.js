import { createApp } from 'vue'
import { createPinia } from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.vue'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import router from './routes/router';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(router).use(ElementPlus).use(createPinia()).mount('#app');
