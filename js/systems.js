import { updateChart } from './chart.js';

let userNumbers = [];
let numberFrequency = Array(50).fill(0);

let systems = {};
for (let i = 6; i <= 12; i++) {
  systems[i] = { size: i, draws: 0, wins: 0 };
}

export function setUserNumbers(nums) { userNumbers = nums; }

export function randomUserNumbers() {
  const arr = [];
  while (arr.length < 7) {
    const n = Math.floor(Math.random() * 49) + 1;
    if (!arr.includes(n)) arr.push(n);
  }
  return arr;
}

function generateWinningDraw() {
  const nums = randomUserNumbers();
  nums.forEach(n => numberFrequency[n]++);
  updateChart(numberFrequency);
  return nums;
}

export function rollAllSystems() {
  const winning = generateWinningDraw();
  const mainWin = winning.slice(0, 6);
  const addNum = winning[6];

  for (let s = 6; s <= 12; s++) {
    const systemNums = randomUserNumbers();
    const mainMatch = systemNums.filter(n => mainWin.includes(n)).length;
    const hasAdd = systemNums.includes(addNum);
    if (mainMatch >= 3 || (mainMatch === 2 && hasAdd)) systems[s].wins++;
    systems[s].draws++;
  }
  renderSystems();
}

export function resetSystems() {
  numberFrequency = Array(50).fill(0);
  for (let i = 6; i <= 12; i++) systems[i] = { size: i, draws: 0, wins: 0 };
  updateChart(numberFrequency);
  renderSystems();
}

export function initSystems() { renderSystems(); }

function renderSystems() {
  const list = document.getElementById('systemsList');
  list.innerHTML = '';
  Object.values(systems).forEach(s => {
    const div = document.createElement('div');
    div.className = 'system-card';
    div.innerHTML = `
      <h3>System ${s.size}</h3>
      <p>Draws: ${s.draws}</p>
      <p>Wins: ${s.wins}</p>
    `;
    list.appendChild(div);
  });
}

export { systems, numberFrequency };
