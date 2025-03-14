<script setup lang="ts">
import Card from '@/components/card/Card.vue';
import { useManualServiceStore } from '@/stores/manual-service.store';
import { toCurrency } from '@/utils/currency';
import { computed } from 'vue';
import DebounceSearch from '../fields/DebounceSearch.vue';
import JumpInTransition from '@/components/transitions/JumpInTransition.vue';
import Input from '../fields/Input.vue';

const manualServiceStore = useManualServiceStore();
const client = computed(() => manualServiceStore.client);

const setSelectedClient = (credential: string) => {
  manualServiceStore.selectClient(credential);
}

const searchClient = (term: string) => {
  manualServiceStore.searchClientsByTerm(term);
}

const searchClientOptions = computed(() => {
  return manualServiceStore.clients.map(client => ({ value: client.credential, label: `${client.credential} / ${client.name}` }));
})

</script>

<template>

  <Card class="transition-all" :class="{ 'max-w-[400px]': !client }">
    <template #cardBody>
      <div class="grid gap-4" :class="{ 'grid-cols-1 lg:grid-cols-[1fr_2fr]': client }">
        <DebounceSearch id="client-debounce" :loading="manualServiceStore.state.clients.loading"
          :options="searchClientOptions" @search="searchClient" @selected="setSelectedClient"
          @reset="manualServiceStore.resetOptions()" placeholder="Buscar por crachá ou nome..."
          label="Pesquisar cliente" />
        <JumpInTransition>
          <div v-if="client">
            <div class="grid grid-cols-5 gap-4">
              <Input id="client-name" class="col-span-3" label="Nome" :modelValue="client.name" disabled />
              <Input id="client-credential" label="Crachá" :modelValue="client.credential" disabled />
              <Input id="client-balance" label="Saldo"
                :modelValue="client.balance ? toCurrency(client?.balance, { suffix: true }) : 'n/a'" disabled />
            </div>
          </div>
        </JumpInTransition>
      </div>
    </template>
  </Card>
</template>
