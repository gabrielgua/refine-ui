<script setup lang="ts">
import { ref, type Component } from "vue";
import Section from "@/components/Section.vue";
import ModalAlert from "@/components/modal/ModalAlert.vue";
import ReportResidentsForm from "@/components/Form/ReportResidentsForm.vue";
import ManualServiceForm from "@/components/Form/ManualServiceForm.vue";
import { useReportStore } from "@/stores/report.store";



// Access the report store
const reportStore = useReportStore();

// Updated report generation function using the store
const generateReport = (form: any) => {
  reportStore.generateReport(form);
};

</script>

<template>
  <Section>
      <div>
        <component @submit="generateReport" :key="ReportResidentsForm" :is="ManualServiceForm" />
      </div>
  </Section>
  <ModalAlert />
</template>
