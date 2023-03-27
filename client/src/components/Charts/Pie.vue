<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement )

const props = defineProps<{
    labels: any,
    data:any,
    labelName: string,
    title:string
}>()

const  chartData= {
        labels: props.labels,
        datasets: [{
          data: props.data,
          label:props.labelName,
          backgroundColor: [
            '#FFC3C3',
            '#CBD4FF',
            '#FFF2AF',
            '#DAFFCD',
          ]
        }],
      }

const chartOptions={
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            text: props.title,
            display: true,
            font: {
              size: 15,

            },
          },

        }
      }
</script>

<template>
  <Pie class="chartBorder" id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<style>
.chartBorder {
  border: var(--main-border-card);
  border-radius: 5px;
  padding: 20px;
  width: 100%;

}
</style>