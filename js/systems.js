import { updateChart } from './chart.js';

let systems = {
  6: { name: "System 6", size: 6, totalDraws: 0, wins: 0 },
  7: { name: "System 7", size: 7, totalDraws: 0, wins: 0 },
  8: { name: "System 8", size: 8, totalDraws: 0, wins: 0 }
};

let numberFrequency = Array(50).fill(0);

export function initSystems() {
  const list = document.getElementById('systemsList');
  list.innerHTML = '';
  for (let key in systems) {
    const s = systems[key];
    const div = document.createElement('div');
    div.className = 'system-card';
    div.innerHTML = `
      <h3>${s.name}</h3>
      <p>Size: ${s.size}</p>
      <p>Draws: <span>${s.totalDraws}</span></p>
      <p>Wins: <span>${s.wins}</span></p>
    `;
    list.appendChild(div);
  }
}

function generateDraw() {
  const nums = [];
  while (nums.length < 6) {
    const n = Math.floor(Math.random() * 49) + 1;
    if (!nums.includes(n)) nums.push(n);
  }
  nums.forEach(n => numberFrequency[n]++);
  updateChart(numberFrequency);
  return nums;
}

export function rollAllSystems() {
  const winningNums = generateDraw();
  for (let key in systems) {
    const s = systems[key];
    s.totalDraws++;
    const picks = generateDraw();
    const matchCount = picks.filter(n => winningNums.includes(n)).length;
    if (matchCount >= 3) s.wins++;
  }
  initSystems();
}

export function resetSystems() {
  for (let key in systems) {
    systems[key].totalDraws = 0;
    systems[key].wins = 0;
  }
  numberFrequency = Array(50).fill(0);
  updateChart(numberFrequency);
  initSystems();
}

export { systems, numberFrequency };
