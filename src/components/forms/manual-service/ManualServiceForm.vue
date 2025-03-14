<script setup lang="ts">
import { useManualServiceCartStore } from '@/stores/manual-service-cart.store';
import type { OrderItemRequest } from '@/types/order.item.request.type';
import { parseLocaleDate } from '@/utils/dates';
import { computed, ref, watch } from 'vue';
import Button from '../../Button.vue';
import Icon from '../../Icon.vue';
import DropdownSelect from '../fields/DropdownSelect.vue';
import Input from '../fields/Input.vue';
import Form, { type FormFieldOption } from '../Form.vue';
import ManualServiceCart from './ManualServiceCart.vue';
import ManualServicePricing from './ManualServicePricing.vue';
import ManualServiceProductSearch from './ManualServiceProductSearch.vue';
import { useManualServiceStore } from '@/stores/manual-service.store';
import { useModalStore } from '@/stores/modal.store';

export type ManualServiceForm = {
  credential: string,
  date: string,
  storeId: number,
  atendimentoId: number,
  tare: number,
  items: OrderItemRequest[],
}

const emit = defineEmits(['submit', 'reset']);

const { error } = useModalStore();
const manualServiceStore = useManualServiceStore();
const manualServiceCartStore = useManualServiceCartStore();

const tare = ref<number>(0.412)
const showProductForm = computed(() => form.value.atendimentoId && form.value.date && form.value.storeId);

const form = ref<ManualServiceForm>({
  credential: '',
  date: '',
  storeId: 0,
  atendimentoId: 0,
  tare: tare.value,
  items: []
});

watch(() => form.value.atendimentoId, () => {
  if (form.value.atendimentoId >= 0) {
    manualServiceCartStore.setAtendimentoId(form.value.atendimentoId);
  }
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

const submit = () => {
  if (!manualServiceStore.client) {
    error('Cliente não selecionado', 'Selecione um cliente antes de enviar o formulário');
  }

  if (!manualServiceCartStore.cart.items.length) {
    error('Carrinho vazio', 'Adicione pelo menos um produto antes de enviar o formulário');
  }

  form.value.credential = manualServiceStore.client!.credential;
  form.value.items = manualServiceCartStore.cart.items.map(item => (
    {
      productCode: item.product.code,
      quantity: item.quantity,
      ...(item.weight && { weight: item.weight })
    }))
  emit('submit', form.value);
};

const setTodayDate = () => {
  form.value.date = parseLocaleDate(new Date());
}

const isValid = computed(() => {
  return form.value.date
    && form.value.atendimentoId !== 0
    && form.value.storeId !== 0
    && form.value.tare
    && manualServiceStore.client
    && manualServiceCartStore.cart.items.length
})

</script>

<template>
  <Form @submit="submit">
    <template #formInputsGridNone>
      <div class="grid divide-y divide-zinc-100/10">
        <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-4 pb-4">
          <div class="flex items-end gap-2 lg:col-span-2">
            <Input id="date" type="datetime-local" v-model="form.date" label="Data e Hora" class="w-full" />
            <Button type="button" :click="() => setTodayDate()">
              Hoje
              <Icon icon="fa-regular fa-clock" />
            </Button>
          </div>

          <DropdownSelect id="store" v-model="form.storeId" label="Loja" placeholder="Selecione a loja"
            :options="storeOptions" />
          <DropdownSelect id="atendimento" v-model="form.atendimentoId" placeholder="Selecione o atendimento"
            label="Atendimento" :options="atendimentoOptions" />
          <Input id="tare" :modelValue="form.tare" label="Tara" disabled />
        </div>

        <div class="py-4" v-if="showProductForm">
          <ManualServiceProductSearch />
        </div>

        <div v-if="showProductForm" class="grid lg:grid-cols-2 items-end gap-4 h-full pt-4">
          <ManualServiceCart />
          <ManualServicePricing />
        </div>
      </div>
    </template>
    <template #formActions>
      <Button type="button" variant="danger" :click="() => $emit('reset')">
        <Icon icon="rotate-left" />
        Reiniciar
      </Button>
      <Button type="submit" variant="success" :disabled="!isValid">
        Salvar
        <Icon icon="check" />
      </Button>
    </template>
  </Form>
</template>
