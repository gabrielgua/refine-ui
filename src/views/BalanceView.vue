<script setup lang="ts">
import BalanceMovementsTable from '@/components/BalanceMovementsTable.vue';
import Button from '@/components/Button.vue';
import Card from '@/components/card/Card.vue';
import Divider from '@/components/Divider.vue';
import DebounceSearch from '@/components/forms/fields/DebounceSearch.vue';
import Input from '@/components/forms/fields/Input.vue';
import ModalAlert from '@/components/modal/ModalAlert.vue';
import Section from '@/components/Section.vue';
import { useBalanceStore } from '@/stores/balance.store';
import { toCurrency } from '@/utils/currency';
import { computed, onBeforeUnmount, ref } from 'vue';

onBeforeUnmount(() => balanceStore.reset());

const balanceStore = useBalanceStore();
const debounceOptions = computed(() => {
  return balanceStore.foundClients
    .map(client => ({ value: client.credential, label: `${client.credential} / ${client.name}` }))
})

const client = computed(() => balanceStore.client)
const balanceToMove = ref<number>(0);

const isFormValid = computed(() => balanceToMove.value !== 0);

const submit = () => {
  if (!isFormValid.value) {
    return;
  }

  balanceStore.adjustClientBalance(balanceToMove.value);
  balanceToMove.value = 0;
}




</script>

<template>
  <Section>

    <Card class="max-w-[400px]">
      <template #cardBody>
        <DebounceSearch id="user-balance-search" label="Pesquisar cliente" placeholder="Buscar por nome ou crachá..."
          :options="debounceOptions" @selected="balanceStore.setSelected" @search="balanceStore.searchClientsByTerm"
          @reset="balanceStore.resetFoundClients" />
      </template>
    </Card>
    <Divider />
    <Card v-if="client">
      <template #cardTitle>Gerenciar saldo</template>
      <template #cardBody>
        <div class="grid grid-cols-[2fr_1fr] divide-x divide-dashed divide-zinc-200 dark:divide-zinc-100/10">
          <div class="flex items-end gap-4 pe-4 *:grow">
            <Input id="client-credential" v-model="client.credential" label="Crachá" disabled />
            <Input id="client-name" v-model="client.name" label="Nome" disabled />
            <Input id="client-balance" :model-value="toCurrency(client.balance ? client.balance : 0, { suffix: true })"
              label="Saldo atual" disabled />
          </div>
          <form @submit.prevent="submit" class="ps-4 flex items-end gap-4 *:grow">
            <Input id="balance" type="number" v-model="balanceToMove" step="0.01" label="Movimentar saldo" required />
            <Button type="submit" :disabled="!isFormValid"
              :loading="balanceStore.state.balance.loading">Adicionar</Button>
          </form>
        </div>
      </template>
    </Card>
    <Divider v-if="client" />
    <BalanceMovementsTable v-if="client" :credential="client.credential" />
    <ModalAlert />
  </Section>
</template>
