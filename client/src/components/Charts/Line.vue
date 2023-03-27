<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)


const props = defineProps<{
  labels: any,
  data: any,
  labelName: string,
  title: string
}>()

const chartData = {
  labels: props.labels,
  datasets: [{
    data: props.data,
    label: props.labelName,
    backgroundColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(255, 107, 0, 1)',
      'rgba(20, 200, 86, 1)',
    ]
  }]
}


const chartOptions = {
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
  <Line class="chartBorder" id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<style>
.chartBorder {
  border: var(--main-border-card);
  border-radius: 5px;
  padding: 20px;
  width: 100%;

}
</style>