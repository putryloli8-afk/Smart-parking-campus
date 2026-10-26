const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let parkingData = {
  timestamp: new Date().toISOString(),
  areas: {
    A: { capacity: 50, occupied: 35 },
    B: { capacity: 40, occupied: 38 }
  }
};

app.get("/api/parking", (req, res) => {
  parkingData.timestamp = new Date().toISOString();
  res.json(parkingData);
});

app.post("/api/parking", (req, res) => {
  const body = req.body;
  if (!body || !body.areas || !body.areas.A || !body.areas.B) {
    return res.status(400).json({ error: "Format data harus berisi areas.A dan areas.B." });
  }
  parkingData = { timestamp: body.timestamp || new Date().toISOString(), areas: body.areas };
  res.json({ ok: true, data: parkingData });
});

app.listen(PORT, () => console.log(`Smart Parking API aktif: http://localhost:${PORT}/api/parking`));
