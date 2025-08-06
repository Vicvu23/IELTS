// server.js

// Import thư viện Express để tạo server và route API
const express = require('express');

// Import thư viện fs (file system) để làm việc với file như đọc/ghi file JSON
const fs = require('fs');

// Import thư viện path để xử lý đường dẫn file an toàn trên mọi hệ điều hành
const path = require('path');

// Import thư viện cors để cho phép frontend (client) gọi API từ địa chỉ khác
const cors = require('cors');

// Tạo một instance của ứng dụng Express
const app = express();

// Khai báo cổng mà server sẽ chạy (localhost:3000)
const PORT = process.env.PORT || 3000;

// Cho phép tất cả domain khác (ví dụ như frontend ở localhost:5173) gọi API
app.use(cors());

/**
 * API GET /tests/:filename
 * Trả về nội dung của 1 file đề thi dựa theo tên file (filename)
 * Ví dụ: gọi http://localhost:3000/tests/reading-test-1.json
 */
app.get('/tests/:filename', (req, res) => {
  // Lấy tên file từ URL (req.params)
  const filename = req.params.filename;

  // Tạo đường dẫn tuyệt đối tới file đề trong thư mục 'data'
  const filePath = path.join(__dirname, 'data', filename);

  // Kiểm tra xem file có tồn tại không
  if (!fs.existsSync(filePath)) {
    // Nếu không tồn tại, trả về lỗi 404 kèm message
    return res.status(404).json({ error: 'Không tìm thấy đề thi' });
  }

  // Đọc nội dung file dạng chuỗi (bắt buộc phải có 'utf8')
  const content = fs.readFileSync(filePath, 'utf8');

  try {
    // Chuyển chuỗi JSON thành object JavaScript
    const json = JSON.parse(content);

    // Gửi object JSON về cho frontend
    res.json(json);
  } catch (err) {
    // Nếu parse JSON bị lỗi (ví dụ sai cú pháp), trả về lỗi 500
    res.status(500).json({ error: 'File JSON bị lỗi' });
  }
});

// Khởi động server, lắng nghe ở cổng đã chọn
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});
