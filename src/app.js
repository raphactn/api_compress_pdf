const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compressPdfServices = require("./services/compressPdfServices");
const app = express();
const multer = require("multer");
const path = require("path");

app.use(bodyParser.json({ limit: "500000mb" }));
app.use(bodyParser.urlencoded({ limit: "5000000mb", extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

const port = process.env.PORT || 8080;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.post("/compress", upload.single("file"), async (req, res) => {
  const result = await compressPdfServices({ file: req.file });
  if (result) {
    res.status(200).json({ result });
  } else {
    res.status(400).json({ error: "Erro ao comprimir arquivo" });
  }
});

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
