import { rollAllSystems, resetSystems, randomUserNumbers, setUserNumbers } from './systems.js';
import { fetchLatestResult } from './utils.js';
import { saveData } from './storage.js';

export function initUI() {
  const rollBtn = document.getElementById('rollBtn');
  const resetBtn = document.getElementById('resetBtn');
  const randomBtn = document.getElementById('randomBtn');
  const fetchLatestBtn = document.getElementById('fetchLatestBtn');
  const submitNumbersBtn = document.getElementById('submitNumbersBtn');
  const themeToggle = document.getElementById('themeToggle');
  const autoPlayBtn = document.getElementById('autoPlayBtn');

  const userInputs = document.getElementById('userInputs');
  for (let i = 0; i < 7; i++) {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = 1;
    input.max = 49;
    userInputs.appendChild(input);
  }

  submitNumbersBtn.addEventListener('click', () => {
    const nums = [...userInputs.querySelectorAll('input')].map(i => +i.value).filter(Boolean);
    if (nums.length === 7) setUserNumbers(nums);
    else alert("Please fill in 6 main + 1 additional number");
  });

  randomBtn.addEventListener('click', () => {
    const nums = randomUserNumbers();
    const inputs = userInputs.querySelectorAll('input');
    nums.forEach((n, i) => inputs[i].value = n);
    setUserNumbers(nums);
  });

  fetchLatestBtn.addEventListener('click', async () => {
    const latest = await fetchLatestResult();
    alert(`Latest Result:\nWinning: ${latest.main.join(', ')}\nAdditional: ${latest.additional}`);
  });

  rollBtn.addEventListener('click', () => { rollAllSystems(); saveData(); });
  resetBtn.addEventListener('click', () => { if (confirm('Reset?')) { resetSystems(); saveData(); } });

  let interval;
  autoPlayBtn.addEventListener('click', () => {
    if (interval) { clearInterval(interval); interval = null; autoPlayBtn.textContent = 'Auto Play'; return; }
    autoPlayBtn.textContent = 'Stop';
    interval = setInterval(() => { rollAllSystems(); saveData(); }, 300);
  });

  themeToggle.addEventListener('click', () => document.body.classList.toggle('dark'));
}
