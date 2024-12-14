<script setup lang="ts">
import Card from '../Card/Card.vue';
import CardBody from '../Card/CardBody.vue';
import CardTitle from '../Card/CardTitle.vue';
import Divider from '../Divider.vue';
import Icon from '../Icon.vue';
</script>

<template>
  <section>
    <Card>
      <CardTitle>
        <Icon icon="fa-info-circle" />
        Informações
      </CardTitle>
      <CardBody>
        <div class="flex items-center gap-4 justify-between">
          <div>
            <p class="text-sm">Cliente:</p>
            <p>Rafael Guaitanele Niszczak</p>
          </div>
          <div>
            <p class="text-sm">Crachá:</p>
            <p>64444</p>
          </div>

        </div>
        <Divider class="my-4" />
        <div class="flex items-center gap-4 justify-between">
          <div class="flex items-center gap-2">
            <Icon icon="wallet" />
            <p>Saldo:</p>
          </div>
          <p><span class="text-sm text-zinc-400">R$</span> 15,00</p>
        </div>
      </CardBody>
    </Card>

  </section>

</template>
