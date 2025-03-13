<script lang="ts" setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Icon from './Icon.vue';

const route = useRoute();

const breadcrumbs = computed(() => {
  return route.matched
    .filter(matchedRoute => matchedRoute.path !== '/') // Exclude root route
    .map(matchedRoute => ({
      name: matchedRoute.name,
      path: matchedRoute.path.replace(/\/:.*$/, '') // Remove dynamic params
    }))
})

const current = computed(() => route.name);

</script>
<template>
  <div>
    <nav class="mb-1">
      <ul class="flex items-center flex-wrap sm:flex-nowrap gap-2 text-zinc-500 dark:text-zinc-400 text-xs">
        <RouterLink to="/home" class="hover:text-sky-600">
          Home
        </RouterLink>
        <li v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.path" class="flex items-center gap-2">
          <Icon icon="chevron-right" size="small" class="text-[10px]" />
          <RouterLink v-if="index !== breadcrumbs.length - 1" :to="breadcrumb.path" class="hover:underline">
            {{ breadcrumb.name }}
          </RouterLink>
          <span class="text-sky-600" v-else>{{ breadcrumb.name }}</span>
        </li>
      </ul>
    </nav>
    <p class="text-2xl">{{ current }}</p>
  </div>
</template>
