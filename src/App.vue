<template>
  <div v-if="loading">loading...</div>
  <div v-if="!loading && !error" class="h-full">
    <router-view />
  </div>
  <div v-if="!loading && error">Something went terribly wrong</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      loading: true,
      error: false,
    };
  },
  methods: {
    ...mapActions(['initialLoad']),
  },
  async mounted() {
    try {
      await this.initialLoad();
      this.loading = false;
    } catch (error) {
      this.error = true;
      this.loading = false;
    }
  },
};
</script>
