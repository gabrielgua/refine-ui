<script lang="ts" setup>
withDefaults(defineProps<{
  url?: string
}>(), {
  url: 'https://api.dicebear.com/9.x/initials/svg?seed=Gabriel_Guaitanele&radius=50&backgroundType=gradientLinear&fontWeight=600'
});
</script>
<template>
  <img :src="url" alt="avatar" class="w-14 h-14 shadow-md rounded-full ">
</template>
