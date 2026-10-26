/* Shared Smart Parking data connector.
   API format: { timestamp, areas: { A: { capacity, occupied }, B: { capacity, occupied } } }
   The UI can run without the API; this file provides a small connection helper and stores settings.
*/
(() => {
  const DEFAULTS = {
    source: "Dummy",
    apiUrl: "http://localhost:3000/api/parking",
    capA: 50, capB: 40, threshold: 90,
    interval: 10
  };
  const readSettings = () => {
    try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem("smartParkingIoTSettings") || "{}") }; }
    catch { return { ...DEFAULTS }; }
  };
  const saveSettings = value => localStorage.setItem("smartParkingIoTSettings", JSON.stringify(value));
  const demoData = () => ({
    timestamp: new Date().toISOString(),
    areas: {
      A: { capacity: Number(readSettings().capA) || 50, occupied: 35 },
      B: { capacity: Number(readSettings().capB) || 40, occupied: 38 }
    }
  });
  async function getParkingData() {
    const settings = readSettings();
    if (settings.source !== "IoT API") return demoData();
    const response = await fetch(settings.apiUrl || DEFAULTS.apiUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("API mengembalikan status " + response.status);
    return response.json();
  }
  window.SmartParking = { readSettings, saveSettings, getParkingData, demoData };
  document.addEventListener("DOMContentLoaded", async () => {
    const sourceLabel = document.querySelector("[data-sp-source-status]");
    if (!sourceLabel) return;
    try {
      const data = await getParkingData();
      sourceLabel.textContent = readSettings().source === "IoT API" ? "Terhubung ke IoT API" : "Mode Dummy";
      sourceLabel.dataset.connected = "true";
      sourceLabel.title = "Data terakhir: " + (data.timestamp || "tidak tersedia");
    } catch (error) {
      sourceLabel.textContent = "API tidak terhubung";
      sourceLabel.dataset.connected = "false";
      sourceLabel.title = error.message;
    }
  });
})();
