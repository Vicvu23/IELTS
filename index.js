// server.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// ✅ Thêm dòng này để phục vụ index.html và các file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// API đọc file JSON đề thi
app.get('/tests/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'data', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Không tìm thấy đề thi' });
  }

  const content = fs.readFileSync(filePath, 'utf8');

  try {
    const json = JSON.parse(content);
    res.json(json);
  } catch (err) {
    res.status(500).json({ error: 'File JSON bị lỗi' });
  }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});
