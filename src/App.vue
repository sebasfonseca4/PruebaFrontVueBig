<template>
  <div id="app">
    <Header v-if="!isLoginRoute"/>
    <router-view></router-view>
    <Footer v-if="!isLoginRoute"/>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
export default {
  components: {
    Header,
    Footer
  },
  setup() {
    const route = useRoute();
    const isLoginRoute = computed(() => route.path === '/');
    return { isLoginRoute };
  },
};
</script>
