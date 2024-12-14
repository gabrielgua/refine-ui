<script setup lang="ts">
import Card from '../Card/Card.vue';
import CardBody from '../Card/CardBody.vue';
import Divider from '../Divider.vue';
</script>

<template>
  <Card>
    <CardBody class="grid gap-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <faicon icon="fa-circle-user" class="size-4 text-sky-600" />
          <p>Cliente:</p>
        </div>
        <p>Rafael Guaitanele Niszczak</p>
      </div>
      <Divider />
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <faicon icon="fa-id-card" class="size-4 text-sky-600" />
          <p>Crachá:</p>
        </div>
        <p>64444</p>
      </div>
    </CardBody>
  </Card>
  <Card class="mt-4">
    <CardBody class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <faicon icon="wallet" class="size-4 text-sky-600" />
        <p>Saldo:</p>
      </div>
      <p>15,00</p>
    </CardBody>
  </Card>

</template>
