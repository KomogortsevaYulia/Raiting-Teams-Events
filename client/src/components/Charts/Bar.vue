
<!-- не использоуется -->

<script lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
  name: 'BarChart',
  props: ['labels', 'data', 'title', 'labelName'],
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: this.$props.labels,
        datasets: [{
          data: this.$props.data,
          label:this.$props.labelName,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 107, 0, 0.2)',
            'rgba(20, 200, 86, 0.2)',
          ]
        }],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            text: this.$props.title,
            display: true,
            font: {
              size: 15,

            },
          },

        }
      }
    }
  },

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