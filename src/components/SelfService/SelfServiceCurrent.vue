<script setup lang="ts">
import Card from '../Card/Card.vue';
import CardBody from '../Card/CardBody.vue';
</script>

<template>
  <Card>
    <CardBody>
      <div class="flex items-center gap-4 text-2xl" :class="[true ? 'text-teal-500' : 'text-rose-500']">
        <faicon icon="fa-clock" />
        <p>Lanche da tarde</p>
      </div>
    </CardBody>
  </Card>
  <div class="py-24 text-center text-2xl">
    <p>Passe o produto no leitor, <br>ou seu crachá para <span class="text-teal-500">Confirmar</span>.</p>
  </div>
</template>
