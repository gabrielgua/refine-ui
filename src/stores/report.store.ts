// src/store/reportStore.ts
import { defineStore } from 'pinia';
import axios from 'axios';

export const useReportStore = defineStore('report', {
  state: () => ({
    reportData: null as any,
    loading: false,
    error: null as any,
  }),
  actions: {
    async generateReport(formValues: Record<string, any>) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('/api/report', { params: formValues });
        this.reportData = response.data;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
  },
});
