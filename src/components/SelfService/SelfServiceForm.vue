<script setup lang="ts">
import Card from '../Card/Card.vue';
import CardBody from '../Card/CardBody.vue';
import CardTitle from '../Card/CardTitle.vue';
import Form from '../Form/Form.vue';
import Input from '../Form/Input.vue';
import Icon from '../Icon.vue';
</script>

<template>
  <Card class="mt-auto">
    <CardTitle>
      <Icon icon="fa-barcode" />
      Leitor
    </CardTitle>
    <CardBody>
      <Form>
        <Input id="barcode" />
      </Form>
    </CardBody>
  </Card>

</template>
