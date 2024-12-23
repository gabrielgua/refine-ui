<script setup lang="ts">
import { useCartStore } from '@/stores/cart.store';
import { toCurrency } from '@/utils/currency.';
import Button from '../Button.vue';
import Card from '../Card/Card.vue';
import CardTitle from '../Card/CardTitle.vue';
import Icon from '../Icon.vue';
import Scrollable from '../Scrollable.vue';
import CardBody from '../Card/CardBody.vue';

const cartStore = useCartStore();

</script>

<template>

  <Card class="flex flex-col overflow-y-auto">
    <CardTitle icon="fa-shopping-cart">
      <p>Produtos</p>
    </CardTitle>
    <Scrollable class="px-4" :class="{ 'py-4': !cartStore.cart.items.length }">
      <li v-for="item in cartStore.cart?.items"
        class="flex items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-100/10 py-4 last:border-b-0">
        <div>
          <p>{{ item.product.name }}</p>
          <p class="text-xs">Quantidade: <span class="font-bold">{{ item.quantity }}</span></p>
        </div>
        <p class="ml-auto">
          <span class="text-zinc-400 font-light">R$</span>
          {{ toCurrency(item.totalPrice) }}
        </p>
        <Button variant="danger" :click="() => cartStore.remove(item.product.code)">
          <Icon icon="fa-xmark" color="text-inherit" />
        </Button>
      </li>
    </Scrollable>
  </Card>
</template>
