<script setup lang="ts">
import { computed, ref } from 'vue';
import Card from '../Card/Card.vue';
import CardBody from '../Card/CardBody.vue';
import CardTitle from '../Card/CardTitle.vue';
import Form from '../Form/Form.vue';
import Input from '../Form/Input.vue';
import { useScheduleStore } from '@/stores/schedule.store';
import { useUserOrderStore } from '@/stores/user.order.store';

const reader = ref<string>();

const scheduleStore = useScheduleStore();
const { findByCredential } = useUserOrderStore();
const currentAtendimento = computed(() => scheduleStore.schedule?.current);

const handleSubmit = () => {
  if (!reader.value) {
    return;
  }

  if (!currentAtendimento.value) {
    console.log("Sem atendimentos no momento.");
    reader.value = undefined;
    return;
  }

  findByCredential(reader.value);

  if (currentAtendimento.value.type === 'UNIT') {
    console.log("Find user by credential: ", reader.value);
    reader.value = undefined;
    return;
  }

  reader.value = undefined;
}
</script>

<template>
  <Card class="mt-auto">
    <CardTitle icon="fa-barcode">Leitor do código de barras</CardTitle>
    <CardBody>
      <Form :on-submit="handleSubmit">
        <Input id="barcode" autofocus v-model="reader" required />
      </Form>
    </CardBody>
  </Card>

</template>
