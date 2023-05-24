import { exec } from "child_process";
import fs from "fs";

const compressPDF = async (inputPath, outputPath, quality = 0) => {
  return new Promise((resolve, reject) => {
    const gsCommand = `gswin64.exe -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/${quality} -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputPath} ${inputPath}`;

    exec(gsCommand, (error) => {
      if (error) {
        console.error(`Erro ao executar o Ghostscript: ${error.message}`);
        reject(error);
      } else {
        resolve(outputPath);
      }
    });
  });
};

const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        console.error(`Erro ao excluir o arquivo: ${filePath}`);
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export const compressPdfServices = async ({ file }) => {
  try {
    const inputFile = `./src/public/${file.filename}`;
    const outputFile = `./src/public/${file.filename}-compressed.pdf`;
    const compressionQuality = "screen";

    await compressPDF(inputFile, outputFile, compressionQuality);

    const result = fs.readFileSync(outputFile, "base64").toString("base64");

    await deleteFile(inputFile);
    await deleteFile(outputFile);

    return result;
  } catch (error) {
    console.error("Erro ao reduzir tamanho do PDF:", error);
    return false;
  }
};
