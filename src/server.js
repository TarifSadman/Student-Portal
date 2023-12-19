const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// Endpoint to add or update a course for a student
app.post('/api/students/:studentId/courses', async (req, res) => {
  const studentId = req.params.studentId;
  const courseData = req.body;

  try {
    // Read student data from the JSON file
    const filePath = `./studentData/student${studentId}.json`;
    const studentData = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    // Add or update the course
    studentData.courses = [...studentData.courses, courseData];

    // Write the updated data back to the JSON file
    await fs.writeFile(filePath, JSON.stringify(studentData, null, 2));

    res.status(200).json({ success: true, message: 'Course added or updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
