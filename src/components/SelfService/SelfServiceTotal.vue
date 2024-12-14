<script setup lang="ts">
import Card from '../Card/Card.vue';
import CardBody from '../Card/CardBody.vue';
import CardTitle from '../Card/CardTitle.vue';
import Icon from '../Icon.vue';
</script>

<template>
  <Card class="mt-auto">
    <CardTitle>
      <Icon icon="fa-receipt" />
      Precificação
    </CardTitle>
    <CardBody class="flex items-center justify-between gap-4">
      <div class="border-r border-r-zinc-100 dark:border-r-zinc-100/10 pr-4">
        <p class="text-sm">Preço original:</p>
        <p class="text-2xl">R$ 18,99</p>
      </div>
      <div class="">
        <p class="text-sm">Desconto:</p>
        <p class="text-2xl">20%</p>
      </div>
      <div class="border-l border-l-zinc-100 dark:border-l-zinc-100/10 pl-4 ml-auto">
        <p class="text-sm">Total:</p>
        <p class="text-2xl">R$ <span class="text-teal-500 font-semibold">15,00</span></p>
      </div>
    </CardBody>
  </Card>

</template>
