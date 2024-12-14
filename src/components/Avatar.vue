<script lang="ts" setup>
import { computed } from 'vue';
import Icon from './Icon.vue';

type AvatarSize = 'small' | 'normal'

const props = withDefaults(defineProps<{
  seed?: string,
  url?: string,
  size?: AvatarSize
}>(), {
  size: 'normal'
})

const treatedSeed = computed(() => {
  if (!props.seed) return;
  return props.seed.replace(/ /g, '_')
})

const sizes = new Map<AvatarSize, string>([
  ['small', 'w-10 h-10 min-w-10 min-h-10'],
  ['normal', 'w-14 h-14']
])

</script>
<template>
  <img v-if="seed"
    :src="`https://api.dicebear.com/9.x/initials/svg?seed=${treatedSeed}&radius=50&backgroundType=gradientLinear&fontWeight=600`"
    alt="avatar" class="shadow-md rounded-full" :class="sizes.get(size)">

  <div v-else class="rounded-full bg-sky-600/10 grid place-items-center" :class="sizes.get(size)">
    <Icon icon="fa-user" color="text-sky-600" />
  </div>

</template>
