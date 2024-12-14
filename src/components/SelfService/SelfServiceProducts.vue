<script setup lang="ts">
import Card from '../Card/Card.vue';
import CardTitle from '../Card/CardTitle.vue';
import Button from '../Button.vue';
import CardBody from '../Card/CardBody.vue';
import Icon from '../Icon.vue';
import Scrollable from '../Scrollable.vue';

</script>

<template>

  <Card>
    <CardTitle icon="fa-shopping-cart">
      <p>Produtos</p>
    </CardTitle>
    <CardBody class="p-0">


      <Scrollable height="364px" class="grid gap-4 py-4 px-2">
        <li v-for="item in [1, 2]"
          class="flex items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-100/10 pb-4 last:border-b-0 last:pb-0">
          <div>
            <p>Empadinha de frango</p>
            <p class="text-xs">Quantidade: <span class="font-bold">1</span></p>
          </div>
          <p class="ml-auto">
            <span class="text-zinc-400 font-light">R$</span>
            4,50
          </p>
          <Button variant="danger">
            <Icon icon="fa-xmark" color="text-inherit" />
          </Button>
        </li>
      </Scrollable>
    </CardBody>
  </Card>
</template>
