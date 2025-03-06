import { defineStore } from 'pinia';
import { ref } from 'vue';
import { http } from '@/services/http';

export const useReportStore = defineStore('report', () => {
  const reportData = ref<any>(null);
  const loading = ref(false);
  const error = ref<any>(null);

  const generateReport = (formValues: Record<string, any>) => {
    loading.value = true;
    error.value = null;
    http
      .get('/report', { params: formValues })
      .then(response => {
        reportData.value = response.data;
      })
      .catch(err => {
        error.value = err;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return { reportData, loading, error, generateReport };
});
