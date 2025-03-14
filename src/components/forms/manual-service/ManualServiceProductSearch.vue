<script setup lang="ts">
import JumpInTransition from '@/components/transitions/JumpInTransition.vue';
import DebounceSearch from '../fields/DebounceSearch.vue';
import Input from '../fields/Input.vue';
import Button from '@/components/Button.vue';
import { computed, ref } from 'vue';
import { useManualServiceStore } from '@/stores/manual-service.store';
import { toCurrency } from '@/utils/currency';
import { useManualServiceCartStore } from '@/stores/manual-service-cart.store';
import Icon from '@/components/Icon.vue';

const manualServiceStore = useManualServiceStore();
const manualServiceCartStore = useManualServiceCartStore();

const searchProductOptions = computed(() => {
  return manualServiceStore.products.map(product => ({ value: product.code, label: `${product.code} / ${product.name}` }))
})
const product = computed(() => manualServiceStore.product);

const form = ref<{
  quantity: number,
  weight?: number
}>({
  quantity: 1,
});

const isFormValid = computed(() => {
  if (!product.value || !form.value.quantity) return false;
  return product.value.priceType !== 'PRICE_PER_KG' || !!form.value.weight;
});

const searchProduct = (term: string) => {
  manualServiceStore.searchProductsByTerm(term);
}

const setSelectedProduct = (code: string) => {
  manualServiceStore.selectProduct(code);
}

const addProductToCart = () => {
  if (!isFormValid.value) {
    console.log('Product form is not valid');
    return;
  }

  manualServiceCartStore.addItem(
    {
      productCode: product.value!.code,
      quantity: form.value.quantity,
      ...(product.value!.priceType === 'PRICE_PER_KG' && { weight: form.value.weight })
    });

  manualServiceStore.resetProduct();

}


</script>

<template>

  <div class="grid lg:grid-cols-[1fr_2fr] gap-4">
    <DebounceSearch id="product-search" label="Pesquisar produto" placeholder="Buscar por código ou nome..."
      :options="searchProductOptions" @search="searchProduct" @selected="setSelectedProduct" />
    <JumpInTransition>
      <form @submit.prevent="addProductToCart" class="grid grid-cols-2 items-end gap-4"
        :class="[product?.priceType === 'PRICE_PER_KG' ? 'xl:grid-cols-5' : 'xl:grid-cols-4']">
        <Input id="product-name" :modelValue="product?.name" label="Nome" disabled />
        <Input id="product-price" :modelValue="product ? toCurrency(product.price, { suffix: true }) : ''"
          label="Preço Uni/Kg" disabled />
        <Input id="product-quantity" type="number" v-model="form.quantity" label="Quantidade" />
        <Input v-if="product?.priceType === 'PRICE_PER_KG'" id="product-weight" v-model="form.weight"
          label="Peso total" />
        <Button type="submit" :loading="manualServiceCartStore.state.loading" :disabled="!isFormValid">
          Adicionar
          <Icon icon="cart-plus" />
        </Button>
      </form>

    </JumpInTransition>
  </div>
</template>
