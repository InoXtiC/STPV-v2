export async function fetchLatestResult() {
  try {
    const res = await fetch('https://www.singaporepools.com.sg/en/productdata/TOTOData.json');
    const data = await res.json();
    const latest = data.draws?.[0];
    return {
      main: latest.winningNumbers.slice(0, 6),
      additional: latest.winningNumbers[6]
    };
  } catch {
    return { main: [1, 2, 3, 4, 5, 6], additional: 7 }; // fallback demo
  }
}
