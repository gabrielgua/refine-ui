<script setup lang="ts">
import { useScaleStore } from '@/stores/scale.store';
import { formatWeight } from '@/utils/decimal';
import { computed } from 'vue';
import Card from '../card/Card.vue';
import Icon from '../Icon.vue';

const scaleStore = useScaleStore();
const weight = computed(() => scaleStore.weight);

</script>

<template>
  <Card>
    <template #cardTitleIcon>
      <Icon icon="weight" class="text-sky-600" />
    </template>
    <template #cardTitle>
      <p>Balança</p>
    </template>
    <template #cardBody>
      <div v-if="weight" class="flex items-center justify-between">
        <p>Peso:</p>
        <p>
          {{ formatWeight(weight, { suffix: 'kilogram' }) }}
          <!-- <span class="text-xs font-normal text-zinc-400">Kg</span> -->
        </p>
      </div>
    </template>
  </Card>
</template>
