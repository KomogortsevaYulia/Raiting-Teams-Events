<script lang="ts">
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement )

export default {
  name: 'PieChart',
  props: ['labels', 'data', 'title', 'labelName'],
  components: { Pie },
  data() {
    return {
      chartData: {
        labels: this.$props.labels,
        datasets: [{
          data: this.$props.data,
          label:this.$props.labelName,
          backgroundColor: [
            '#FFC3C3',
            '#CBD4FF',
            '#FFF2AF',
            '#DAFFCD',
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