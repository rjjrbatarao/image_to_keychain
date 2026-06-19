// potrace-server.js
const express = require("express");
const multer = require("multer");
const potrace = require("potrace");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/trace", upload.single("image"), (req, res) => {
  const filePath = req.file.path;

  potrace.trace(filePath, {
    color: "black",
    threshold: 120,
  }, (err, svg) => {
    if (err) return res.status(500).send(err);

    fs.unlinkSync(filePath);
    res.json({ svg });
  });
});

app.listen(3000, () => console.log("Potrace server running"));