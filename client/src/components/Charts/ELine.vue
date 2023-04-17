
<!-- не использоуется -->

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {


  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { computed } from "vue";

use([

  CanvasRenderer,
  LineChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const props = defineProps<{
  labels: string[],
  data: number[],
}>()




const option =  computed( () => {
  return {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.labels
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: props.data,
      type: 'line',
      areaStyle: {}
    }
  ]
};
})


</script>

<template>
  <div class="charts-wrapper">
  <v-chart class="chart " :option="option" />
  </div>
</template>

<style scoped>

.charts-wrapper {
  width: 100%;
  height: 100%;
  min-height: 300px;
}

.chart {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>