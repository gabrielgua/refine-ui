<script setup lang="ts">
import { ref, type Component } from "vue";
import Section from "@/components/Section.vue";
import ModalAlert from "@/components/modal/ModalAlert.vue";
import ReportResidentsForm from "@/components/Form/ReportResidentsForm.vue";
import ManualServiceForm, { type ManualServiceForm as ManualServiceFormType } from "@/components/Form/ManualServiceForm.vue";

const submitCart = (form: ManualServiceFormType) => {
  console.log(form.date);
  console.log(form.credential);
  console.log(form.store);
  console.log(form.product);
  console.log(form.balance);
  console.log(form.tare);
  console.log(form.weight);

}


</script>

<template>
  <Section>
      <div>
        <component @submit="submitCart" :key="ReportResidentsForm" :is="ManualServiceForm" />
      </div>
  </Section>
  <ModalAlert />
</template>
