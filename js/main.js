import { initUI } from './ui.js';
import { initSystems } from './systems.js';
import { initChart } from './chart.js';
import { loadData } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  initSystems();
  initChart();
  loadData();
});
