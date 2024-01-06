// const fs = require("fs");
// const AdmZip = require("adm-zip");
// const { setFileType } = require("./CVsTypes");


// const extractZipFiles = async (file, filePath) => {
//  try{
//     // save zip file to read content
//     await new Promise((resolve,reject) => {
//       fs.writeFile(filePath, file.buffer, (err) => {
//         if (err) {
//           reject(err);
//         }else{
//           resolve()
//         }
//       });
//     });

//     //   read zip file
//     const zip = new AdmZip(filePath);

//     const files = [];
//     for (const zipEntry of zip.getEntries()) {
//       // get data into JSON format
//       const data = zipEntry.toJSON(); 

//       files.push({
//         fieldname: "cvs",
//         originalname: data.name,
//         encoding: "7bit",
//         mimetype: setFileType(data.name.split(".").reverse()[0]),
//         buffer: zipEntry.getData(), // get Buffer of file content
//         size: 0,
//       });
//     }
  
//     return files;
    
  
//  }catch(error){
//   console.error("Error extracting ZIP file:", error)

//  }

// };


// module.exports = { extractZipFiles };






















// // const fs = require("fs");
// // const AdmZip = require("adm-zip");
// // const { setFileType } = require("./CVsTypes");

// // const extractZipFiles = async (file, filePath) => {
// //   try {
// //     // Save the uploaded ZIP file to a temporary location
// //     await new Promise((resolve, reject) => {
// //       fs.writeFile(filePath, file.buffer, (err) => {
// //         if (err) {
// //           reject(err);
// //         } else {
// //           resolve();
// //         }
// //       });
// //     });

// //     // Initialize the AdmZip instance to read the ZIP file
// //     const zip = new AdmZip(filePath);

// //     const files = [];
// //     for (const zipEntry of zip.getEntries()) {
// //       const data = zipEntry.getData(); // Get Buffer of file content

// //       files.push({
// //         fieldname: "cvs",
// //         originalname: zipEntry.entryName,
// //         encoding: "7bit",
// //         mimetype: setFileType(zipEntry.name.split(".").reverse()[0]),
// //         buffer: data,
// //         size: data.length, // Calculate the size based on the Buffer length
// //       });
// //     }

// //     return files;

// //   } catch (error) {
// //     console.error("Error extracting ZIP file:", error);
// //     throw error; // Rethrow the error to be caught at a higher level
// //   } finally {
// //     // Clean up: Remove the temporary ZIP file
// //     if (fs.existsSync(filePath)) {
// //       fs.unlinkSync(filePath);
// //     }
// //   }
// // };

// // module.exports = { extractZipFiles };
const AdmZip = require("adm-zip");
const { setFileType } = require("./CVsTypes");
const stream = require('stream');
const util = require('util');
const pipeline = util.promisify(stream.pipeline);

const extractZipFiles = async (file) => {
  try {
    const zip = new AdmZip(file.buffer);
    const files = [];

    // Use async.eachLimit or another concurrent processing method here
    // to extract files concurrently
    await Promise.all(zip.getEntries().map(async (zipEntry) => {
      const data = zipEntry.getData();

      files.push({
        fieldname: "cvs",
        originalname: zipEntry.entryName, 
        encoding: "7bit",
        mimetype: setFileType(zipEntry.name.split(".").reverse()[0]),
        buffer: data,
        size: data.length,
      });
    }));

    return files;
  } catch (error) {
    console.error("Error extracting ZIP file:", error);
    throw error;
  }
};

module.exports = { extractZipFiles };
