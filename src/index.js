const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const uploadsDir = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

const meetings = {};

app.post('/meetings', (req, res) => {
  const id = uuidv4();
  meetings[id] = { transcript: 'Processing...', keyframes: [] };
  res.json({ meeting_id: id });
});

app.post('/meetings/:id/upload', upload.single('file'), (req, res) => {
  const { id } = req.params;
  if (!meetings[id]) {
    meetings[id] = { transcript: 'Processing...', keyframes: [] };
  }
  // Placeholder for actual processing logic
  res.json({ message: 'File received', file: req.file ? req.file.filename : null });
});

app.get('/meetings/:id/transcript', (req, res) => {
  const { id } = req.params;
  const data = meetings[id];
  if (!data) {
    return res.status(404).json({ error: 'Meeting not found' });
  }
  res.json({ transcript: data.transcript });
});

app.get('/meetings/:id/keyframes', (req, res) => {
  const { id } = req.params;
  const data = meetings[id];
  if (!data) {
    return res.status(404).json({ error: 'Meeting not found' });
  }
  res.json({ keyframes: data.keyframes });
});

app.use(express.static(path.join(__dirname, '..', 'public')));

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
