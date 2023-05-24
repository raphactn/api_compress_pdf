import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import { compressPdfServices } from "./services/compressPdfServices.js";
import { getProxyServices } from "./services/getProxyServices.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

const port = process.env.PORT || 8080;

const __dirname = path.dirname(import.meta.url).replace(/^file:\/\/\//, "");

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

app.get("/getProxy", async (req, res) => {
  const proxy = await getProxyServices();
  if (proxy) {
    res.status(200).json({ proxy });
  } else {
    res.status(400).json({ error: "Erro ao capturar proxy" });
  }
});

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
