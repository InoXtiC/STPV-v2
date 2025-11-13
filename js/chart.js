let chart;
export function initChart() {
  const ctx = document.getElementById('freqChart');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Array.from({ length: 49 }, (_, i) => i + 1),
      datasets: [{
        label: 'Number Frequency',
        data: Array(49).fill(0),
        backgroundColor: Array(49).fill('#1a73e8')
      }]
    },
    options: { scales: { y: { beginAtZero: true } }, animation: false }
  });
}

export function updateChart(freqs) {
  if (!chart) return;
  const sorted = [...freqs.slice(1)].map((v, i) => ({ n: i + 1, v }))
    .sort((a, b) => b.v - a.v);

  const top6 = sorted.slice(0, 6).map(o => o.n);
  const low6 = sorted.slice(-6).map(o => o.n);

  chart.data.datasets[0].data = freqs.slice(1);
  chart.data.datasets[0].backgroundColor = freqs.slice(1).map((_, i) =>
    top6.includes(i + 1) ? '#2ecc71' :
    low6.includes(i + 1) ? '#e74c3c' : '#1a73e8'
  );
  chart.update();
}
