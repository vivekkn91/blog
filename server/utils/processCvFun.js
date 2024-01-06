// // // // const PDFParser = require("pdf-parse");
// // // // const mammoth = require("mammoth");

// // // // async function processCV(fileType, fileBuffer) {
// // // //   let text = "";

// // // //   if (["pdf", "docx", "doc", "txt", "rtf", "zip"].includes(fileType)) {
// // // //     if (fileType === "pdf") {
// // // //       const pdfData = await PDFParser(fileBuffer);

// // // //       text = pdfData.text;
// // // //     } else if (fileType === "docx" || fileType === "doc") {
// // // //       const result = await mammoth.extractRawText({ buffer: fileBuffer });
// // // //       text = result.value;
// // // //     } else if (fileType === "txt" || fileType === "rtf") {
// // // //       text = fileBuffer.toString("utf-8");
// // // //     }
// // // //   }

// // // //   return text;
// // // // }

// // // // // module.exports = { processCV };


const PDFParser = require("pdf-parse");
const mammoth = require("mammoth");

async function processCV(fileType, fileBuffer) {
  let text = "";

  if (["pdf", "docx", "doc", "txt", "rtf", "zip"].includes(fileType)) {
    if (fileType === "pdf") {
      const pdfData = await PDFParser(fileBuffer);
      text = pdfData.text;
    } else if (["docx", "doc"].includes(fileType)) {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      text = result.value;
    } else if (["txt", "rtf"].includes(fileType)) {
      text = fileBuffer.toString("utf-8");
    }
  }

  return text;
}

module.exports = { processCV }; 

// const PDFExtract = require('pdf.js-extract').PDFExtract;
// const pdfExtract = new PDFExtract();
// const fs = require('fs');
// const buffer = fs.readFileSync("Subhashini_Resume.pdf");
// const options = {}; /* see below */
// pdfExtract.extractBuffer(buffer, options, (err, data) => {
//   if (err) return console.log(err);
//   for(i in data.pages){
//     console.log(data.pages[i].content[4].str);
    
//   }
// });
