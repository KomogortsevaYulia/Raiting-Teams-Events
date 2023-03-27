
<!-- не использоуется -->

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
    labels: any,
    data:any,
    labelName: string,
    title:string
}>()

const chartData = {
        labels: props.labels,
        datasets: [{
          data: props.data,
          label:props.labelName,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 107, 0, 0.2)',
            'rgba(20, 200, 86, 0.2)',
          ]
        }],
      }

const  chartOptions = {
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
  <Bar class="chartBorder" id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<style>
.chartBorder {
  border: var(--main-border-card);
  border-radius: 5px;
  padding: 20px;
  width: 100%;

}
</style>