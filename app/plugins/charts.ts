import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
} from "chart.js";

export default defineNuxtPlugin({
  enforce: "pre",
  name: "charts",
  dependsOn: [],
  setup: (_nuxtApp) => {
    // charts setup
    ChartJS.register(
      Title,
      Tooltip,
      Legend,
      CategoryScale,
      LinearScale,
      PointElement,
      BarElement,
    );
  },
});
