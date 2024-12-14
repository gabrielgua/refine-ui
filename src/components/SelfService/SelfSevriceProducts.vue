<script setup lang="ts">
import Card from '../Card/Card.vue';
import CardTitle from '../Card/CardTitle.vue';
import Button from '../Button.vue';
import CardBody from '../Card/CardBody.vue';
</script>

<template>

  <Card>
    <CardTitle>
      <faicon icon="fa-list" class="size-4 text-sky-600" />
      <p>Produtos</p>
    </CardTitle>
    <CardBody>

      <ul class="grid gap-4">
        <li
          class="flex items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-100/10 pb-4 last:border-b-0 last:pb-0">
          <div>
            <p>Empadinha de frango</p>
            <p class="text-xs">Quantidade: 1</p>
          </div>
          <p class="ml-auto">
            <span class="text-teal-500 font-semibold text-xs">R$</span>
            4,50
          </p>
          <Button variant="danger">
            <faicon icon="fa-xmark" class="size-5" />
          </Button>
        </li>
        <li
          class="flex items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-100/10 pb-4 last:border-b-0 last:pb-0">
          <div>
            <p>Coca cola 250ml</p>
            <p class="text-xs">Quantidade: 1</p>
          </div>
          <p class="ml-auto">
            <span class="text-teal-500 font-semibold text-xs">R$</span>
            2,29
          </p>
          <Button variant="danger">
            <faicon icon="fa-xmark" class="size-5" />
          </Button>
        </li>
      </ul>
    </CardBody>
  </Card>
</template>
