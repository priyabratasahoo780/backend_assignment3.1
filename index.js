const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;


let states = [
  { id: 1, name: "Andhra Pradesh", population: 49386799, literacyRate: 67.02, annualBudget: 279279, gdp: 14000000 },
  { id: 2, name: "Arunachal Pradesh", population: 1383727, literacyRate: 65.38, annualBudget: 28000, gdp: 300000 },
  { id: 3, name: "Assam", population: 31205576, literacyRate: 72.19, annualBudget: 122000, gdp: 4500000 },
  { id: 4, name: "Bihar", population: 104099452, literacyRate: 61.80, annualBudget: 261885, gdp: 6500000 },
  { id: 5, name: "Chhattisgarh", population: 25545198, literacyRate: 70.28, annualBudget: 121500, gdp: 4000000 },
  { id: 6, name: "Goa", population: 1458545, literacyRate: 88.70, annualBudget: 25000, gdp: 800000 },
  { id: 7, name: "Gujarat", population: 63872399, literacyRate: 78.03, annualBudget: 243965, gdp: 21000000 },
  { id: 8, name: "Haryana", population: 25351462, literacyRate: 75.55, annualBudget: 180000, gdp: 9000000 }
];


//    GET ROUTES

// 1. GET /states
app.get("/states", (req, res) => {
  res.status(200).json(states);
});


// 3. GET /states/highest-gdp
app.get("/states/highest-gdp", (req, res) => {
  if (states.length === 0) {
    return res.status(404).json({ message: "No states found" });
  }

  const highest = states.reduce((prev, curr) =>
    curr.gdp > prev.gdp ? curr : prev
  );

  res.status(200).json(highest);
});


// 2. GET /states/:id

app.get("/states/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const state = states.find(s => s.id === id);

  if (!state) {
    return res.status(404).json({ message: "State not found" });
  }

  res.status(200).json(state);
});

//    POST ROUTE 

// 4. POST /states

app.post("/states", (req, res) => {
  const newId = states.length > 0
    ? Math.max(...states.map(s => s.id)) + 1
    : 1;

  const newState = { id: newId, ...req.body };

  states.push(newState);

  res.status(201).json(newState);
});

//    PUT ROUTES

// 6. PUT /states/:id/budget
app.put("/states/:id/budget", (req, res) => {
  const id = parseInt(req.params.id);
  const state = states.find(s => s.id === id);

  if (!state) return res.status(404).json({ message: "State not found" });

  state.annualBudget = req.body.annualBudget;
  res.status(200).json(state);
});


// 7. 
// PUT /states/:id/population
app.put("/states/:id/population", (req, res) => {
  const id = parseInt(req.params.id);
  const state = states.find(s => s.id === id);

  if (!state) return res.status(404).json({ message: "State not found" });

  state.population = req.body.population;
  res.status(200).json(state);
});


// 5. PUT /states/:id
app.put("/states/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = states.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "State not found" });
  }

  states[index] = { id, ...req.body };
  res.status(200).json(states[index]);
});

//    PATCH ROUTES

//8. PATCH /states/:id/literacy
app.patch("/states/:id/literacy", (req, res) => {
  const id = parseInt(req.params.id);
  const state = states.find(s => s.id === id);

  if (!state) return res.status(404).json({ message: "State not found" });

  state.literacyRate = req.body.literacyRate;
  res.status(200).json(state);
});


// 9. PATCH /states/:id/gdp
app.patch("/states/:id/gdp", (req, res) => {
  const id = parseInt(req.params.id);
  const state = states.find(s => s.id === id);

  if (!state) return res.status(404).json({ message: "State not found" });

  state.gdp = req.body.gdp;
  res.status(200).json(state);
});


// 10. PATCH /states/:id
app.patch("/states/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const state = states.find(s => s.id === id);

  if (!state) return res.status(404).json({ message: "State not found" });

  Object.assign(state, req.body);
  res.status(200).json(state);
});

//    DELETE ROUTES

//12. DELETE /states/name/:stateName
app.delete("/states/name/:stateName", (req, res) => {
  const name = req.params.stateName.toLowerCase();
  const index = states.findIndex(s => s.name.toLowerCase() === name);

  if (index === -1) return res.status(404).json({ message: "State not found" });

  states.splice(index, 1);
  res.status(204).send();
});


// 13. DELETE /states/low-literacy/:percentage
app.delete("/states/low-literacy/:percentage", (req, res) => {
  const percentage = parseFloat(req.params.percentage);
  const originalLength = states.length;

  states = states.filter(s => s.literacyRate >= percentage);

  const deletedCount = originalLength - states.length;
  res.status(200).json({ deletedCount });
});


// 11. DELETE /states/:id
app.delete("/states/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = states.findIndex(s => s.id === id);

  if (index === -1) return res.status(404).json({ message: "State not found" });

  states.splice(index, 1);
  res.status(204).send();
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});