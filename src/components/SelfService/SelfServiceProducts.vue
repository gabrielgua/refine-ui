<script setup lang="ts">
import { useCartStore } from '@/stores/cart.store';
import { toCurrency } from '@/utils/currency.';
import Button from '../Button.vue';
import Card from '../Card/Card.vue';
import CardTitle from '../Card/CardTitle.vue';
import Icon from '../Icon.vue';
import Scrollable from '../Scrollable.vue';

const cartStore = useCartStore();

</script>

<template>

  <Card>
    <CardTitle icon="fa-shopping-cart">
      <p>Produtos</p>
    </CardTitle>
    <Scrollable height="364px" class="grid gap-4 py-4 px-2">
      <li v-for="item in cartStore.cart?.items"
        class="flex items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-100/10 pb-4 last:border-b-0 last:pb-0">
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
