// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.
const students = require('./data.json');

const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.json());
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;
  const studentsAboveThreshold = students.filter(student => student.total > threshold);
  res.json({
    count: studentsAboveThreshold.length,
    students: studentsAboveThreshold.map(student => ({
      name: `${student.first_name} ${student.last_name}`,
      total: student.total
    }))
  });   
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});