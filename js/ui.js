import { saveData } from './storage.js';
import { rollAllSystems, resetSystems } from './systems.js';

export function initUI() {
  const rollBtn = document.getElementById('rollBtn');
  const resetBtn = document.getElementById('resetBtn');
  const autoPlayBtn = document.getElementById('autoPlayBtn');
  const themeToggle = document.getElementById('themeToggle');

  rollBtn.addEventListener('click', () => {
    rollAllSystems();
    saveData();
  });

  resetBtn.addEventListener('click', () => {
    if (confirm("Reset all systems?")) {
      resetSystems();
      saveData();
    }
  });

  autoPlayBtn.addEventListener('click', () => {
    let playing = true;
    const interval = setInterval(() => {
      rollAllSystems();
      saveData();
    }, 300);

    autoPlayBtn.textContent = "⏹ Stop";
    autoPlayBtn.onclick = () => {
      clearInterval(interval);
      autoPlayBtn.textContent = "▶️ Auto Play";
      initUI();
    };
  });

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
}
