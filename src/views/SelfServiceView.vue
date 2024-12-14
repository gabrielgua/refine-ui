<script setup lang="ts">
import Button from '@/components/Button.vue';
import Card from '@/components/Card/Card.vue';
import CardBody from '@/components/Card/CardBody.vue';
import CardTitle from '@/components/Card/CardTitle.vue';
import Container from '@/components/Container.vue';
import Divider from '@/components/Divider.vue';
import Form from '@/components/Form/Form.vue';
import FormGroup from '@/components/Form/FormGroup.vue';
import Input from '@/components/Form/Input.vue';
import Icon from '@/components/Icon.vue';
import SelfServiceClientInfo from '@/components/SelfService/SelfServiceClientInfo.vue';
import SelfServiceCurrent from '@/components/SelfService/SelfServiceCurrent.vue';
import SelfServiceFooter from '@/components/SelfService/SelfServiceFooter.vue';
import SelfServiceForm from '@/components/SelfService/SelfServiceForm.vue';
import SelfServiceHeader from '@/components/SelfService/SelfServiceHeader.vue';
import SelfSevriceProducts from '@/components/SelfService/SelfServiceProducts.vue';
import SelfServiceTotal from '@/components/SelfService/SelfServiceTotal.vue';
import { useFullscreen } from '@vueuse/core';
import { ref } from 'vue';


const element = ref<HTMLElement>();
const { toggle } = useFullscreen(element);

</script>
<template>

  <section ref="element" class="bg-[#f5f5f5] text-black dark:bg-zinc-800 dark:text-white h-full">
    <SelfServiceHeader @fullscreen="toggle" />
    <Container class="grid grid-cols-2 pt-4 gap-4">
      <section class="flex flex-col h-[calc(100dvh-113px)]">
        <SelfServiceCurrent />
        <SelfServiceForm />

        <Button variant="danger" class="flex-col mt-4 w-full">
          <Icon icon="fa-arrow-rotate-left" color="text-inherit" />
          <p>Reiniciar</p>
        </Button>
      </section>
      <section class="flex flex-col gap-4 h-[calc(100dvh-113px)]">
        <SelfServiceClientInfo />
        <SelfSevriceProducts />
        <SelfServiceTotal />
      </section>
      <SelfServiceFooter class="col-span-2" />
    </Container>
  </section>
</template>
