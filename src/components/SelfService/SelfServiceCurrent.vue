<script setup lang="ts">
import Card from '../Card/Card.vue';
import CardBody from '../Card/CardBody.vue';
import CardTitle from '../Card/CardTitle.vue';
import Divider from '../Divider.vue';
import Icon from '../Icon.vue';
</script>

<template>
  <Card>
    <CardTitle>
      <Icon icon="fa-utensils" />
      <p>Atendimento atual</p>
    </CardTitle>
    <CardBody>
      <p class="text-teal-500 text-2xl">Almoço</p>
      <Divider class="my-4" />
      <div class="flex items-center justify-between gap-4 text-sm ">

        <div class="min-w-max">
          <p>Almoço</p>
          <p class="text-xs dark:text-zinc-400">12:00 às 14:00</p>
        </div>
        <div class="flex items-center w-full">
          <Divider class="w-full" />
          <Icon icon="fa-arrow-right" />
        </div>
        <div class="min-w-max">
          <p>Lanche da tarde</p>
          <p class="text-xs dark:text-zinc-400">16:00 às 17:30</p>
        </div>
      </div>
    </CardBody>
  </Card>
  <div class="py-24 text-center text-2xl">
    <p>Passe o produto no leitor, <br>ou seu crachá para <span class="text-teal-500">Confirmar</span>.</p>
  </div>
</template>
