<script setup lang="ts">
import { ref } from 'vue';
import Card from '../Card/Card.vue';
import CardTitle from '../Card/CardTitle.vue';

const weight = ref(); //has to come from scaleStore also use grams as the unit

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
          {{ weight }}
          <span class="text-xs font-normal text-zinc-400">g</span>
        </p>
      </div>
    </section>
  </Card>
</template>
