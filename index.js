const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 10000;

// Trỏ đến thư mục chứa các file HTML
app.use(express.static(path.join(__dirname, "public")));

// Nếu người dùng truy cập "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});
