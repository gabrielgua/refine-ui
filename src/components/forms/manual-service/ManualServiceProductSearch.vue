<script setup lang="ts">
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';
import JumpInTransition from '@/components/transitions/JumpInTransition.vue';
import { useManualServiceCartStore } from '@/stores/manual-service-cart.store';
import { useManualServiceStore } from '@/stores/manual-service.store';
import { toCurrency } from '@/utils/currency';
import { computed, ref } from 'vue';
import DebounceSearch from '../fields/DebounceSearch.vue';
import Input from '../fields/Input.vue';

const props = defineProps<{ tare: number }>()

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
      ...(product.value!.priceType === 'PRICE_PER_KG' && form.value.weight && { weight: form.value.weight - props.tare })
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
        <Input id="product-price" :modelValue="toCurrency(product ? product.price : 0, { suffix: true })"
          label="Preço Uni/Kg" disabled />
        <Input id="product-quantity" type="number" min="1" max="10" step="1" v-model="form.quantity" label="Quantidade"
          required />
        <Input id="product-weight" v-if="product?.priceType === 'PRICE_PER_KG'" type="number" :min="tare" max="5000"
          step="0.001" v-model="form.weight" label="Peso total (kg)" required />
        <Button type="submit" :loading="manualServiceCartStore.state.loading" :disabled="!isFormValid">
          Adicionar
          <Icon icon="cart-plus" />
        </Button>
      </form>

    </JumpInTransition>
  </div>
</template>
