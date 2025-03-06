<script setup lang="ts">
import { ref, type Component } from "vue";
import DropdownSelect, { type DropdownSelectOption } from "@/components/DropdownSelect.vue";
import ReportClientsForm from "@/components/Form/ReportClientsForm.vue";
import Section from "@/components/Section.vue";
import Card from "@/components/Card/Card.vue";
import CardBody from "@/components/Card/CardBody.vue";
import ModalAlert from "@/components/Modals/ModalAlert.vue";
import ReportProductsForm from "@/components/Form/ReportProductsForm.vue";
import ReportOrdersForm from "@/components/Form/ReportOrdersForm.vue";
import ReportResidentsForm from "@/components/Form/ReportResidentsForm.vue";

type ReportOptions = 'clients' | 'orders' | 'products' | 'residents';

const reportFormComponents = new Map<ReportOptions, Component>([
  ['clients', ReportClientsForm],
  ['orders', ReportOrdersForm],
  ['products', ReportProductsForm],
  ['residents', ReportResidentsForm]
])

const reportOptions: DropdownSelectOption[] = [
  { value: 'clients', label: 'Clientes' },
  { value: 'orders', label: 'Pedidos' },
  { value: 'products', label: 'Produtos Vendidos' },
  { value: 'residents', label: 'Residentes e Acadêmicos' },
]

const selectedReport = ref<ReportOptions>();

</script>

<template>
  <Section title="Relatórios" icon="clipboard">
    <Card class="w-max">
      <CardBody>
        <DropdownSelect id="reportOptions" :options="reportOptions" v-model="selectedReport"
          label="Selecione um Relatório" placeholder="Escolha um relatório..." />
      </CardBody>
    </Card>

    <!-- Detailed form appears after a report is selected -->
    <Transition name="fade" mode="out-in">
      <div v-if="selectedReport">
        <component :key="selectedReport" :is="reportFormComponents.get(selectedReport)" />
      </div>
    </Transition>

    <ModalAlert />
  </Section>
</template>
