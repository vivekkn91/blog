// function getFileType(mimetype) {
//     if (mimetype === 'application/pdf') {
//       return 'pdf';
//     } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//       return 'docx';
//     } else if (mimetype === 'application/msword') {
//       return 'doc';
//     } else if (mimetype === 'text/plain') {
//       return 'txt';
//     } else if (mimetype === 'application/rtf') {
//       return 'rtf';
//     } else if (mimetype === 'application/zip') {
//       return 'zip';
//     } else if (mimetype === 'text/csv') {
//       return 'csv';
//     }
//      else {
//       return 'invalid';
//     }
//   }





//   function getFileType(mimetype) {
//     if (mimetype === 'application/pdf') {
//       return 'pdf';
//     } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//       return 'docx';
//     } else if (mimetype === 'application/msword') {
//       return 'doc';
//     } else if (mimetype === 'text/plain' || mimetype === 'application/x-zip-compressed') {
//       return 'zip';
//     } else if (mimetype === 'application/rtf') {
//       return 'rtf';
//     } else if (mimetype === 'text/csv') {
//       return 'csv';
//     } else {
//       return 'invalid';
//     }
//   }
  

function getFileType(mimetype) {
  if (mimetype === 'application/pdf') {
    return 'pdf';
  } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return 'docx';
  } else if (mimetype === 'application/msword') {
    return 'doc';
  } else if (mimetype === 'text/plain') {
    return 'txt';
  } else if (mimetype === 'application/rtf') {
    return 'rtf';
  } else if (mimetype === 'application/zip' || mimetype === 'application/x-zip-compressed') {
    return 'zip';
  } else if (mimetype === 'text/csv') {
    return 'csv';
  } else {
    return 'invalid';
  }
}














  function setFileType(mimetype) {
    if (mimetype === "pdf") {
      return "application/pdf";
    } else if (mimetype === "docx") {
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    } else if (mimetype === "doc") {
      return "application/msword";
    } else if (mimetype === "txt") {
      return "text/plain";
    } else if (mimetype === "rtf") {
      return "application/rtf";
    } else if (mimetype === "zip") {
      return "application/zip";
    }else if (mimetype === 'text/csv') {
      return 'csv';
    } else {
      return "invalid";
    }
  }
  
  module.exports = { getFileType, setFileType }