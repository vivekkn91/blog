function extractName(text) {
  //   // const nameRegex = /([A-Z][a-z]+)\s+([A-Z][a-z]+)/;
  //   // const nameRegex = /([A-Z][a-z]+)\s+([A-Z][a-z]+)/;
  const nameRegex = /([A-Za-z]+)\s+([A-Za-z]+)/i;

  const nameMatch = text.match(nameRegex);
  if (nameMatch) {
    const fullName = nameMatch[0];
    const cleanFullName = fullName.replace(/\r\n|\n/g, " ").trim(); // Replace newline characters with a space

    return cleanFullName;
  } else {
    return "";
  }
}

function extractEducation(text) {
  // console.log(text)
  const educationStartIndex = text.toLowerCase().indexOf("education");

  if (educationStartIndex !== -1) {
    const educationText = text
      .substring(educationStartIndex + "education".length)
      .trim();
    const educationLines = educationText.split("\n");

    // starting with a capital letter
    const educationInstitutions = educationLines.filter((line) =>
      /^[A-Z]/.test(line)
    );

    return educationInstitutions.slice(0, 7);
  } else {
    return [];
  }
}

function extractDesignation(text) {
  const designationRegex = /(?:Job Title|Designation): (.+?)\n/i;
  const designationMatch = text.match(designationRegex);

  if (designationMatch) {
    return designationMatch[1].trim();
  }
  return "";
}

function extractEmail(text) {
  const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/;
  const emailMatch = text.match(emailRegex);

  if (emailMatch) {
    return emailMatch[0];
  } else {
    return "";
  }
}

// function extractDateBirthday(text) {
//     // const dobRegex = /Date Of Birth\s*\n\s*([\d]{1,2}\s*[A-Za-z]+\s*[\d]{4})/;
//     const dobRegex = /(?:Date Of Birth|DOB)\s+(\d{1,2}\/\d{2}\/\d{4}|(\d{1,2} \w+ \d{4}))/;

//     const dobMatch = text.match(dobRegex);

//     if (dobMatch && dobMatch[1]) {
//         return dobMatch[1].trim();
//     } else {
//         return "";
//     }
// }

function extractDateBirthday(text) {
  // const dobRegex = /(?:Date\s*Of\s*Birth|DOB|Date\s*of\s*Birth|Date\s*of\s*Birth:)\s*(\d{1,2}\/\d{2}\/\d{4}|\d{1,2} [A-Za-z]+ \d{4})/;
  // const dobRegex = /Date\s*of\s*Birth\s*:\s*(\d{1,2}\/\d{2}\/\d{4})/;
  const dobRegex =
    /(?:Date\s*Of\s*Birth|DOB|Date\s*of\s*Birth|Date\s*of\s*Birth:|Date\s*of\s*Birth\s*:)\s*(\d{1,2}\/\d{2}\/\d{4}|\d{1,2} [A-Za-z]+ \d{4})/;

  const dobMatch = text.match(dobRegex);

  if (dobMatch && dobMatch[1]) {
    return dobMatch[1].trim();
  } else {
    return "";
  }
}

// function extractWorkExperience(text) {
//   // Define a regular expression for work experience
//   const experienceRegex =
//     /(?:WORK EXPERIENCE|Experiences|EXPERIENCE|PROFESSIONAL EXPERIENCE|EMPLOYMENT HISTORY|WORK|CAREER HISTORY|JOB HISTORY|ABOUT ME|About me)([\s\S]+?)(?=(CERTIFICATIONS|LANGUAGES|HOBBIES|OBJECTIVE|EDUCATION|SKILLS|PROJECTS|$))/gi;

//   // Find all work experience matches
//   const matches = [...text.matchAll(experienceRegex)];

//   // If no matches are found, return null
//   if (matches.length === 0) {
//     return null;
//   }

//   // Initialize an array to store extracted work experiences
//   const workExperiences = [];

//   // Iterate through each match and extract work experiences
//   for (const match of matches) {
//     const experienceText = match[1].trim();

//     // Initialize an object to store details of the work experience
//     const workExperience = {
//       companyName: "",
//       position: "",
//       dateRange: "", // new field for date range
//       currentWorking: "",
//       workDuration: 0, // new field for work duration in years
//     };

//     // Split the entire experience text into lines
//     const lines = experienceText.split("\n");

//     // Iterate through lines and update workExperience object
//     for (const line of lines) {
//       if (line.toLowerCase().includes("currently working")) {
//         workExperience.currentWorking = "Yes";
//       }

//       if (line.toLowerCase().includes("current company")) {
//         workExperience.companyName = line
//           .replace(/(?:currently working|current company)[:\s]*/i, "")
//           .replace(
//             /(Pvt\. Ltd|Technologies Pvt\. Ltd|Technologies|LLP)\s*/i,
//             ""
//           )
//           .trim();
//       }

//       if (
//         line.toLowerCase().includes("position") ||
//         line.toLowerCase().includes("job title")
//       ) {
//         workExperience.position = line
//           .replace(/(?:position|job title)[:\s]*/i, "")
//           .trim();
//       }

//       if (line.toLowerCase().includes("date range")) {
//         workExperience.dateRange = line
//           .replace(/(?:date range)[:\s]*/i, "")
//           .trim();
//       }
//     }

//     // Calculate work duration in years
//     if (workExperience.dateRange) {
//       const [startMonth, startYear, endMonth, endYear] =
//         workExperience.dateRange
//           .split(" - ")
//           .map((item) => item.trim().split(" "));

//       const startDate = new Date(`${startMonth} ${startYear}`);
//       const endDate =
//         workExperience.currentWorking === "Yes"
//           ? new Date()
//           : new Date(`${endMonth} ${endYear}`);

//       const durationInMilliseconds = endDate - startDate;
//       workExperience.workDuration =
//         durationInMilliseconds / (365.25 * 24 * 60 * 60 * 1000); // Duration in years
//     }

//     // Push the workExperience object to the array
//     workExperiences.push(workExperience);
//   }

//   // Return the array of extracted work experiences
//   return workExperiences;
// }

function parseResume(text) {
  return new Promise((resolve, reject) => {
    resumeParser.parseResume(
      text,
      (data) => {
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
function extractWorkExperience(text) {
  const experienceRegex =
    /([\w\s&]+)\s+(\w{3} \d{4})\s*-\s*(\w{3} \d{4}|Present)\s*([\s\S]+?)(?=(\w+\s\d{4}\s*-\s*\w{3} \d{4}|$))/gi;
  const workExperiences = [];

  const matches = [...text.matchAll(experienceRegex)];
  matches.forEach((match) => {
    const company = match[1].trim();
    const startDate = new Date(match[2]);
    const endDate =
      match[3].toLowerCase() === "present" ? new Date() : new Date(match[3]);
    const jobDescription = match[4].trim();

    const experience = {
      company,
      startDate,
      endDate,
      jobDescription,
    };

    workExperiences.push(experience);
  });

  return workExperiences;
}

// Return the array of extracted work experiences

function extractPhoneNumbers(text) {
  const phoneRegex = /(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;

  const phoneNumber = text.match(phoneRegex);
  return phoneNumber || [];
}
function extractCurrentCompany(text) {
  const workExperienceRegex =
    /(?:WORK EXPERIENCE|Experiences|EXPERIENCE|PROFESSIONAL EXPERIENCE|EMPLOYMENT HISTORY|WORK|CAREER HISTORY|JOB HISTORY|Start-ups)([\s\S]+?)(?=(WORK EXPERIENCE|Experiences|EXPERIENCE|PROFESSIONAL EXPERIENCE|EMPLOYMENT HISTORY|WORK|CAREER HISTORY|JOB HISTORY|Start-ups|$))/gi;

  const matches = [...text.matchAll(workExperienceRegex)];

  for (const match of matches) {
    const experienceText = match[1].trim();
    const lines = experienceText.split("\n");

    for (const line of lines) {
      if (
        line.toLowerCase().includes("currently working") ||
        line.toLowerCase().includes("current company")
      ) {
        return line
          .replace(/(?:currently working|current company)[:\s]*/i, "")
          .trim();
      }
    }
  }

  // If no explicit mention, take the last mentioned company
  let lastCompany = null;
  for (const match of matches) {
    const experienceText = match[1].trim();
    const lines = experienceText.split("\n");
    if (lines.length > 0) {
      lastCompany = lines[lines.length - 1].trim();
    }
  }

  return lastCompany;
}

function extractSkills(text) {
  // console.log(text);
  // Define common programming languages and skills
  const skillsRegex =
    /(\bPython\b|\bJavaScript\b|\bJava\b|\bC\+\+\b|\bC#\b|\bRuby\b|\bPHP\b|\bHTML\b|\bCSS\b|\bSQL\b|\bNode\.js\b|\bReact\b|\bAngular\b|\bVue\.js\b|\bExpress\.js\b|\bExpressjs\b|\bMongoDB\b|\bMySQL\b|\bPhotoshop\b|\bIllustrator\b|\bUI\/UX Design\b|\bData Analysis\b|\bMachine Learning\b|\bProject Management\b)/gi;

  const skills = text.match(skillsRegex);

  // Remove duplicates by converting to a Set
  const uniqueSkills = skills ? Array.from(new Set(skills)) : [];

  return uniqueSkills;
}

// function extractSkills(text) {
//   const keySkillsRegex = /Key Skills: (.*?)\./;
//   const matches = text.match(keySkillsRegex);
//   if (matches && matches[1]) {
//     const skills = matches[1].split(',').map((skill) => skill.trim());
//     return skills;
//   }
//   return [];
// }

function extractMaritalStatusAndGender(text) {
  const maritalStatusRegex =
    /Marital\s*Status\s*:\s*(\w+)|Marital\s*Status\s*(\w+)/i;
  const genderRegex = /Gender\s*:\s*(\w+)|Gender\s*(\w+)/i;

  const maritalStatusMatch = text.match(maritalStatusRegex);
  const genderMatch = text.match(genderRegex);

  const info = {
    maritalStatus: maritalStatusMatch
      ? maritalStatusMatch[1] || maritalStatusMatch[2]
      : "",
    gender: genderMatch ? genderMatch[1] || genderMatch[2] : "",
  };

  return info;
}

// Example usage:
// const info = extractMaritalStatusAndGender(text);

// // Example usage:
// const text = "Marital Status Single\nGender Male\nNationality Indian\nDOB 26";
// const info = extractMaritalStatusAndGender(text);
// console.log(info); // Outputs: { maritalStatus: 'Single', gender: 'Male' }

// function extractProjects(text) {
//   const projects = [];
//   const projectRegex = /([A-Za-z0-9 -]+)\s*(https?:\/\/[^\s]+)/g;

//   let match;
//   while ((match = projectRegex.exec(text)) !== null) {
//     console.log( match)
//     const projectName = match[1].trim();
//     console.log(projectName)
//     const projectURL = match[2].trim();
//     projects.push({ name: projectName, url: projectURL });
//   }

//   return projects;
// }

// function extractProjects(text) {
//   const projects = [];
//   const projectRegex = /([A-Za-z0-9 -]+)\s*(https?:\/\/[^\s]+)/g;

//   let match;
//   while ((match = projectRegex.exec(text)) !== null) {
//     const projectName = match[1].trim();
//     const projectURL = match[2].trim();
//     projects.push({ name: projectName, url: projectURL });
//   }

//   // Now, let's capture descriptions using a different regular expression
//   const descriptionRegex = /(https?:\/\/[^\s]+)\s*([^]+?(?=(https?:\/\/[^\s]+|$)))/g;
//   let descriptionMatch;

//   for (const project of projects) {
//     descriptionRegex.lastIndex = 0; // Reset the regex
//     descriptionMatch = descriptionRegex.exec(text);

//     if (descriptionMatch) {
//       project.description = descriptionMatch[2].trim();
//     }
//   }

//   return projects;
// }

// function extractProjects(text) {
//   const projects = [];
//   const projectRegex = /([A-Za-z0-9 -]+)\s*(https?:\/\/[^\s]+)/g;

//   let match;
//   while ((match = projectRegex.exec(text)) !== null) {
//     const projectName = match[1].trim();
//     const projectURL = match[2].trim();
//     projects.push({ name: projectName, url: projectURL });
//   }

//   return projects;
// }
// // Example usage:
// const text = `

// OBJECTIVE

// Expand my learning, knowledge, and skills. Secure a responsible career opportunity and work towards the growth of the company with my acquired skills.

// WORK EXPERIENCE

// Navgurukul Foundation for Social Welfare

// DISCO Discipline Coordinator / Mentor

// From this post I learned how to work with a group of people and how to manage a community. Navgurukul Pune campus, I did mentorship with 25 to 30 girls and still am doing mentorship.

// Jozbiz Private Limited

// Jozbiz Private Limited's Backend Developer in Node JS with 1 Year of Experience

// I am pleased to introduce myself as a Backend Developer in Node JS with 1 year of experience at Jozbiz Private Limited. In my role, I have worked extensively on developing and maintaining the backend infrastructure of our projects using Node JS.

// EDUCATION

// Navgurukul Foundation for Social Welfare

// Software Engineer Basic Python JavaScript

// Learning Software Engineering with a one-year residential program and also learning new skills along with study.

// Delhi University ( Ramanujan College )

// Bachelor of Art B.A Arts

// Government Girls Senior Secondary School

// Intermediate CBSE Art

// SKILLS

// Python/Django

// JavaScript

//  MYSQL

// NodeJS

// MongoDB

// Turing-ECommerce-API

// https://github.com/Sanngeeta/Turing-ECommerce-API I this project. I have made a back-end of an e-commerce website using the Expres framework. of Node JS. I have also used a JWT authentication token to verify if the customer is valid or not.

// Meraki -API-(JSON)

// https://github.com/Sanngeeta/Merarki-API-JSON-/tree/master In this project we have to store Miraki data inside the json database. We have to implement it.

// Implement- Meraki-API(Express js)

// https://github.com/Sanngeeta/Merarki-API-Mysql

// In this project we have to store Meraki data inside the database.

// Blog-App

// https://github.com/Sanngeeta/Blog-App

// Created a simple blog app APIs. Users can sign up and then post any post and like or dislike the post.

// I have also used a JWT authentication token to verify if the user is valid or not.

// LANGUAGES

// Hindi Fluent

// English Good
// `;
// const extractedProjects = extractProjects(text);
// console.log(extractedProjects);

function extractProjects(text) {
  // console.log(text)
  const projects = [];
  const projectRegex = /([A-Za-z0-9 -]+)\s*(https?:\/\/[^\s]+)/g;
  let match;

  while ((match = projectRegex.exec(text)) !== null) {
    const name = match[1].trim();
    const url = match[2].trim();
    projects.push({ name, url });
    // console.log(projects)
  }

  return projects;
}

// Your PDF text data
const pdfTextData = `

OBJECTIVE

Expand my learning, knowledge, and skills. Secure a responsible career opportunity and work towards the growth of the company with my acquired skills.        

WORK EXPERIENCE

Navgurukul Foundation for Social Welfare

DISCO Discipline Coordinator / Mentor

From this post I learned how to work with a group of people and how to manage a community. Navgurukul Pune campus, I did mentorship with 25 to 30 girls and still am doing mentorship.

Jozbiz Private Limited

Jozbiz Private Limited's Backend Developer in Node JS with 1 Year of Experience

I am pleased to introduce myself as a Backend Developer in Node JS with 1 year of experience at Jozbiz Private Limited. In my role, I have worked extensively on developing and maintaining the backend infrastructure of our projects using Node JS.



EDUCATION

Navgurukul Foundation for Social Welfare

Software Engineer Basic Python JavaScript

Learning Software Engineering with a one-year residential program and also learning new skills along with study.

Delhi University ( Ramanujan College )

Bachelor of Art B.A Arts

Government Girls Senior Secondary School

Intermediate CBSE Art

SKILLS

Python/Django

JavaScript

 MYSQL

NodeJS

MongoDB



Turing-ECommerce-API

https://github.com/Sanngeeta/Turing-ECommerce-API I this project. I have made a back-end of an e-commerce website using the Expres framework. of Node JS. I have also used a JWT authentication token to verify if the customer is valid or not.

Meraki -API-(JSON)

https://github.com/Sanngeeta/Merarki-API-JSON-/tree/master In this project we have to store Miraki data inside the json database. We have to implement it.    

Implement- Meraki-API(Express js)

https://github.com/Sanngeeta/Merarki-API-Mysql

In this project we have to store Meraki data inside the database.

Blog-App

https://github.com/Sanngeeta/Blog-App

Created a simple blog app APIs. Users can sign up and then post any post and like or dislike the post.





I have also used a JWT authentication token to verify if the user is valid or not.



LANGUAGES

Hindi Fluent

English Good
`;

// Extract the projects
const extractedProjects = extractProjects(pdfTextData);

// Output the extracted projects
// console.log(extractedProjects);

module.exports = {
  parseResume,
  extractEducation,
  extractDesignation,
  extractName,
  extractEmail,
  extractDateBirthday,
  extractWorkExperience,
  extractPhoneNumbers,
  extractSkills,
  extractCurrentCompany,
  extractMaritalStatusAndGender,
};
