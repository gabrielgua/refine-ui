<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import Card from '../card/Card.vue';
import CardTitle from '../card/CardTitle.vue';
import { useScaleStore } from '@/stores/scale.store';
import { formatWeight } from '@/utils/decimal';

onMounted(() => scaleStore.read());

onBeforeUnmount(() => {
  scaleStore.stop();
})

const scaleStore = useScaleStore();
const weight = computed(() => scaleStore.weight);

</script>

<template>
  <Card>
    <CardTitle icon="weight">
      <p>Balança</p>
    </CardTitle>
    <section class="p-4">
      <div v-if="weight" class="flex items-center justify-between">
        <p>Peso:</p>
        <p>
          {{ formatWeight(weight) }}
          <span class="text-xs font-normal text-zinc-400">Kg</span>
        </p>
      </div>
    </section>
  </Card>
</template>
