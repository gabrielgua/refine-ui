<script lang="ts" setup>
import { computed } from 'vue';
import Icon from './Icon.vue';

const props = defineProps<{
  seed?: string,
}>();

const treatedSeed = computed(() => {
  if (!props.seed) return;
  return props.seed.replace(/ /g, '_')
})

</script>
<template>
  <img
    :src="`https://api.dicebear.com/9.x/initials/svg?seed=${treatedSeed}&radius=50&backgroundType=gradientLinear&fontWeight=600`"
    alt="avatar" class="w-14 h-14 shadow-md rounded-full " v-if="seed">
  <div class="rounded-full bg-sky-600 p-3" v-else>
    <Icon icon="fa-user" size="large" color="text-sky-950/100" />
  </div>

</template>
