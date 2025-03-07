<script setup lang="ts">
import FadeTransition from './transitions/FadeTransition.vue';

defineProps<{
  showName?: boolean
}>();
</script>

<template>
  <div class="max-w-12 min-w-12 flex gap-3 items-center">
    <img src="../assets/images/logo_erasto_pessoa.png" alt="Logo erasto" class="w-full block" />
    <FadeTransition>
      <p class="text-sky-600 font-semibold leading-4 font-sans" v-if="showName">ERASTO GAERTNER</p>
    </FadeTransition>
  </div>
</template>
