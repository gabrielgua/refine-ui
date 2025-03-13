<script setup lang="ts">
import { useCartManualServiceStore } from '@/stores/manual-service-cart.store';
import { useManualServiceStore } from '@/stores/manual-service.store';
import { toCurrency } from '@/utils/currency';
import { computed, ref } from 'vue';
import Button from '../Button.vue';
import Card from '../card/Card.vue';
import Divider from '../Divider.vue';
import Icon from '../Icon.vue';
import Scrollable from '../Scrollable.vue';
import JumpInTransition from '../transitions/JumpInTransition.vue';
import DebounceSearch from './fields/DebounceSearch.vue';
import DropdownSelect from './fields/DropdownSelect.vue';
import Input from './fields/Input.vue';
import Form, { type FormFieldOption } from './Form.vue';
import type { OrderItemRequest } from '@/types/order.item.request.type';

export type ManualServiceForm = {
  credential: string,
  date: string,
  store: number,
  atendimento: number,
  tare: number,
  items: OrderItemRequest[],
}

const emit = defineEmits(['submit']);



const manualServiceStore = useManualServiceStore();


const cartStore = useCartManualServiceStore();
const client = computed(() => manualServiceStore.client);
const searchClientOptions = computed(() => {
  return manualServiceStore.clients.map(client => ({ value: client.credential, label: `${client.credential} / ${client.name}` }));
})

const product = computed(() => manualServiceStore.product);
const searchProductOptions = computed(() => {
  return manualServiceStore.products.map(product => ({ value: product.code, label: `${product.code} / ${product.name}` }))
})

const tare = ref<number>(0.412)

const form = ref<ManualServiceForm>({
  credential: '0',
  date: '',
  store: 0,
  atendimento: 0,
  tare: tare.value,
  items: []
});



const orderItemForm = ref<{
  quantity: number,
  weight?: number
}>({
  quantity: 1,
})

const storeOptions: FormFieldOption[] = [
  { value: 1, label: 'Erasto Gaertner' },
  { value: 2, label: 'Hóspice' },
  { value: 3, label: 'Irati' },
]

const atendimentoOptions: FormFieldOption[] = [
  { value: 1, label: 'Café da Manhã' },
  { value: 2, label: 'Almoço' },
  { value: 3, label: 'Lanche da Tarte' },
  { value: 4, label: 'Jantar' },
]

const searchClient = (term: string) => {
  manualServiceStore.searchClientsByTerm(term);
}

const searchProduct = (term: string) => {
  manualServiceStore.searchProductsByTerm(term);
}

const setSelectedClient = (crendential: string) => {
  manualServiceStore.selectClient(crendential);
}

const setSelectedProduct = (productCode: string) => {
  manualServiceStore.selectProduct(productCode);
}

const addProductToCart = () => {
  if (!form.value.atendimento) {
    console.log('Atendimento not selected');
    return;
  }

  if (!client.value) {
    console.log('Client not selected');
    return;
  }

  cartStore.initialize(form.value.atendimento, client.value.credential)

  if (product.value) {
    const weight = product.value.priceType === 'PRICE_PER_KG' ? orderItemForm.value.weight! - form.value.tare : undefined;
    console.log(weight);
    cartStore.addItem({ productCode: product.value.code, quantity: orderItemForm.value.quantity, weight: orderItemForm.value.weight });
  }
}

const submit = () => {
  if (!client.value) {
    console.log('No client selected');
    return;
  }

  if (!cartStore.valid) {
    console.log('Cart must have at least one item');
    return;
  }

  form.value.credential = client.value?.credential;
  form.value.items = cartStore.cart.items.map(item => ({ productCode: item.product.code, quantity: item.quantity, weight: item.weight }))
  emit('submit', form.value);
};


</script>

<template>
  <section class="flex flex-col gap-4">
    <Card class="transition-all">
      <template #cardBody>
        <div class="grid gap-4" :class="{ 'grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_2fr]': client }">
          <DebounceSearch id="client-debounce" :loading="manualServiceStore.state.clients.loading"
            :options="searchClientOptions" @search="searchClient" @selected="setSelectedClient"
            @reset="manualServiceStore.resetOptions()" placeholder="Buscar por crachá ou nome..."
            label="Pesquisar cliente" />
          <JumpInTransition>
            <div v-if="client">
              <div class="grid lg:grid-cols-4 gap-4">
                <Input id="client-name" class="md:col-span-2" label="Nome" :modelValue="client.name" disabled />
                <Input id="client-credential" label="Crachá" :modelValue="client.credential" disabled />
                <Input id="client-balance" label="Saldo"
                  :modelValue="client.balance ? toCurrency(client?.balance, { suffix: true }) : 'n/a'" disabled />
              </div>
            </div>
          </JumpInTransition>
        </div>
      </template>
    </Card>
    <JumpInTransition>
      <Form v-if="client" @submit="submit">
        <template #formInputsGridNone>
          <div class="grid gap-4 ">
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input id="date" type="datetime-local" v-model="form.date" label="Data e Hora" />
              <DropdownSelect id="store" v-model="form.store" label="Loja" placeholder="Selecione a loja"
                :options="storeOptions" />
              <DropdownSelect id="atendimento" v-model="form.atendimento" placeholder="Selecione o atendimento"
                label="Atendimento" :options="atendimentoOptions" />
              <Input id="tare" :modelValue="form.tare" label="Tara" disabled />
            </div>
            <Divider />
            <div class="grid gap-4">
              <div class="grid lg:grid-cols-[1fr_2fr] gap-4">
                <DebounceSearch id="product-search" label="Pesquisar produto" placeholder="Buscar por código ou nome..."
                  :options="searchProductOptions" @search="searchProduct" @selected="setSelectedProduct"
                  @reset="manualServiceStore.resetOptions()" />

                <JumpInTransition>
                  <form @submit.prevent="addProductToCart" class="grid lg:grid-cols-2 items-end gap-4" v-if="product"
                    :class="[product.priceType === 'PRICE_PER_KG' ? 'xl:grid-cols-5' : 'xl:grid-cols-4']">
                    <Input id="product-name" :modelValue="product.name" label="Nome" disabled />
                    <Input id="product-price" :modelValue="toCurrency(product.price, { suffix: true })"
                      label="Preço Uni/Kg" disabled />
                    <Input id="product-quantity" type="number" v-model="orderItemForm.quantity" label="Quantidade" />
                    <JumpInTransition>
                      <Input v-if="product.priceType === 'PRICE_PER_KG'" id="product-weight"
                        v-model="orderItemForm.weight" label="Peso total" />
                    </JumpInTransition>
                    <Button type="submit" :loading="cartStore.state.loading">
                      Adicionar
                      <Icon icon="cart-plus" />
                    </Button>
                  </form>

                </JumpInTransition>
              </div>
            </div>
            <Divider />
            <div class="grid grid-cols-2 items-end gap-4 h-full">
              <Card size="small">
                <template #cardTitleIcon>
                  <Icon icon="shopping-cart" size="small" class="text-sky-600"></Icon>
                </template>
                <template #cardTitle>Carrinho</template>
                <template #cardBody>
                  <ul>
                    <li v-for="item in cartStore.cart?.items" :key="item.id"
                      class="flex items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-100/10 py-4 first:pt-0 last:pb-0 last:border-b-0">
                      <div>
                        <p>{{ item.product.name }}</p>
                        <p class="text-xs font-light" v-if="item.product.priceType === 'PRICE_PER_UNIT'">
                          Quantidade:
                          <span class="font-bold">{{ item.quantity }}</span>
                        </p>
                        <p class="text-xs font-light italic" v-else>self-service</p>
                      </div>
                      <div
                        class="ml-auto flex items-center divide-x divide-dashed divide-zinc-200 dark:divide-zinc-100/10">
                        <p class="text-xs font-light pe-4">
                          <span>
                            {{ item.product.priceType === 'PRICE_PER_UNIT' ? 'Preço Un.' : 'Preço Kg' }}<br>
                          </span>
                          <span class="text-base font-normal">
                            <span class="text-xs">R$ </span>{{ toCurrency(item.unitPrice) }}
                          </span>
                        </p>
                        <p class="text-xs font-light ps-4">
                          Total<br>
                          <span class="text-base font-normal">
                            <span class="text-xs">R$ </span>{{ toCurrency(item.totalPrice) }}
                          </span>
                        </p>
                      </div>

                      <div class="flex items-center gap-2">
                        <Button :disabled="item.product.priceType === 'PRICE_PER_KG'" variant="danger"
                          :click="() => cartStore.removeItem(item.product.code)">
                          <Icon icon="fa-xmark" color="text-inherit" />
                        </Button>
                      </div>
                    </li>
                  </ul>
                </template>
              </Card>
              <Card size="small">
                <template #cardTitleIcon>
                  <Icon icon="receipt" size="small" class="text-sky-600"></Icon>
                </template>
                <template #cardTitle>Precificação</template>
                <template #cardBody>
                  <section v-if="cartStore.cart.items.length" class="flex items-center justify-between gap-4">
                    <div class="border-r border-dashed border-r-zinc-200 dark:border-r-zinc-100/10 pr-4">
                      <p class="text-sm">Subtotal</p>
                      <p class="text-2xl"><span class="font-light text-base">R$ </span>{{
                        toCurrency(cartStore.cart.originalPrice)
                      }}</p>
                    </div>

                    <div>
                      <p class="text-sm">Desconto</p>
                      <p class="text-2xl text-teal-500">
                        <span class="font-light text-base">-R$ </span>{{ toCurrency(cartStore.cart.discountedPrice) }}
                      </p>
                    </div>
                    <div class="border-l border-dashed border-l-zinc-200 dark:border-l-zinc-100/10 pl-4 ml-auto">
                      <p class="text-sm">Total</p>
                      <p class="text-2xl">
                        <span class="font-light text-base">R$ </span>{{ toCurrency(cartStore.cart.finalPrice) }}
                      </p>
                    </div>
                  </section>
                </template>
              </Card>
            </div>
          </div>
        </template>
        <template #formActions>
          <div class="flex items-center gap-4 w-full">
            <div class="flex gap-2">
              <Button type="reset" variant="danger">
                <Icon icon="rotate-left" />
                Reiniciar
              </Button>
              <Button type="submit" variant="success">
                Salvar
                <Icon icon="check" />
              </Button>
            </div>
          </div>
        </template>
      </Form>
    </JumpInTransition>

  </section>
</template>
