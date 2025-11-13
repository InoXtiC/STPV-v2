import { systems, numberFrequency } from './systems.js';
import { updateChart } from './chart.js';
import { initSystems } from './systems.js';

export function saveData() {
  localStorage.setItem('toto_data', JSON.stringify({ systems, numberFrequency }));
}

export function loadData() {
  const data = JSON.parse(localStorage.getItem('toto_data') || '{}');
  if (data.systems) {
    for (let i = 6; i <= 12; i++) Object.assign(systems[i], data.systems[i]);
  }
  if (data.numberFrequency) numberFrequency.splice(0, 50, ...data.numberFrequency);
  updateChart(numberFrequency);
  initSystems();
}
