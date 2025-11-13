import { numberFrequency } from './systems.js';

let chart;

export function initChart() {
  const ctx = document.getElementById('freqChart');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Array.from({ length: 49 }, (_, i) => i + 1),
      datasets: [{
        label: 'Number Frequency',
        data: numberFrequency.slice(1),
        backgroundColor: '#1a73e8'
      }]
    },
    options: {
      scales: { y: { beginAtZero: true } },
      animation: false
    }
  });
}

export function updateChart(freqs) {
  if (!chart) return;
  chart.data.datasets[0].data = freqs.slice(1);
  chart.update();
}
