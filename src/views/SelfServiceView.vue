<script setup lang="ts">
import Button from '@/components/Button.vue';
import Container from '@/components/Container.vue';
import Divider from '@/components/Divider.vue';
import Form from '@/components/Form/Form.vue';
import FormGroup from '@/components/Form/FormGroup.vue';
import SelfServiceClientInfo from '@/components/SelfService/SelfServiceClientInfo.vue';
import SelfServiceCurrent from '@/components/SelfService/SelfServiceCurrent.vue';
import SelfServiceHeader from '@/components/SelfService/SelfServiceHeader.vue';
import SelfSevriceProducts from '@/components/SelfService/SelfSevriceProducts.vue';
import { useFullscreen } from '@vueuse/core';
import { ref } from 'vue';


const element = ref<HTMLElement>();
const { toggle } = useFullscreen(element);

</script>
<template>

  <section ref="element" class="h-dvh bg-white text-black dark:bg-zinc-800 dark:text-white">
    <SelfServiceHeader @fullscreen="toggle" />
    <Container class="grid grid-cols-2 py-8 gap-8">
      <section>
        <SelfServiceCurrent />
        <Form>
          <FormGroup>
            <label class="text-lg">Código de barras</label>
            <input type="text"
              class="rounded bg-transparent border border-zinc-200 dark:border-zinc-100/10 p-4 outline-none focus:outline-sky-600 focus:outline-2"
              autofocus />
          </FormGroup>
        </Form>
        <Button variant="danger" class="flex-col mt-8 w-full">
          <ArrowPathIcon class="size-6" />
          <p>Reiniciar</p>
        </Button>
      </section>
      <section>
        <SelfServiceClientInfo />
        <Divider class="my-8" />
        <SelfSevriceProducts />
      </section>
    </Container>
  </section>
</template>
