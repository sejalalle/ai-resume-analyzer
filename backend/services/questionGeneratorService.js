const skillQuestionBank = {
  java: {
    question: "What is Java and why is it widely used?",
    answer: "Java is a high-level, object-oriented programming language known for portability, security, and strong community support. It is widely used for web, desktop, and enterprise applications."
  },
  javascript: {
    question: "What is JavaScript and where is it used?",
    answer: "JavaScript is a programming language mainly used to make web pages interactive. It is used in frontend development and also in backend development with Node.js."
  },
  react: {
    question: "What is React?",
    answer: "React is a JavaScript library used for building user interfaces using reusable components. It is commonly used for creating modern single-page web applications."
  },
  node: {
    question: "What is Node.js?",
    answer: "Node.js is a runtime environment that allows JavaScript to run on the server side. It is mainly used to build fast and scalable backend applications."
  },
  "node.js": {
    question: "What is Node.js?",
    answer: "Node.js is a runtime environment that allows JavaScript to run on the server side. It is mainly used to build fast and scalable backend applications."
  },
  express: {
    question: "What is Express.js?",
    answer: "Express.js is a lightweight web framework for Node.js. It helps in creating APIs, handling routes, and managing server-side logic easily."
  },
  mongodb: {
    question: "What is MongoDB?",
    answer: "MongoDB is a NoSQL database that stores data in JSON-like documents. It is flexible and widely used in MERN stack applications."
  },
  mysql: {
    question: "What is MySQL?",
    answer: "MySQL is a relational database management system that stores data in tables with rows and columns and uses SQL queries."
  },
  sql: {
    question: "What is SQL?",
    answer: "SQL stands for Structured Query Language. It is used to store, retrieve, update, and manage data in relational databases."
  },
  html: {
    question: "What is HTML?",
    answer: "HTML stands for HyperText Markup Language. It is used to structure web pages using elements like headings, paragraphs, forms, and links."
  },
  css: {
    question: "What is CSS?",
    answer: "CSS stands for Cascading Style Sheets. It is used to style and design web pages by controlling layout, colors, spacing, and fonts."
  },
  git: {
    question: "What is Git?",
    answer: "Git is a version control system used to track code changes and support collaboration in software development."
  },
  github: {
    question: "What is GitHub?",
    answer: "GitHub is a cloud platform used to host Git repositories. It helps developers manage code, collaborate, and track project changes."
  },
  api: {
    question: "What is an API?",
    answer: "An API is an Application Programming Interface that allows different software systems to communicate and exchange data."
  },
  "rest api": {
    question: "What is a REST API?",
    answer: "A REST API is a type of API that follows REST principles and uses HTTP methods like GET, POST, PUT, and DELETE to perform operations."
  }
};

const roleQuestionBank = {
  "mern developer": [
    {
      question: "What is the MERN stack?",
      answer: "MERN stands for MongoDB, Express.js, React, and Node.js. It is a full-stack JavaScript technology stack used for building web applications."
    },
    {
      question: "Why is MongoDB used in MERN applications?",
      answer: "MongoDB is used because it stores data in flexible JSON-like documents, which works well with JavaScript-based applications."
    }
  ],
  "frontend developer": [
    {
      question: "What is the role of a frontend developer?",
      answer: "A frontend developer builds the visual part of a website or application that users interact with directly."
    },
    {
      question: "What is the difference between HTML, CSS, and JavaScript?",
      answer: "HTML gives structure, CSS gives style, and JavaScript adds interactivity to a web page."
    }
  ],
  "backend developer": [
    {
      question: "What is the role of a backend developer?",
      answer: "A backend developer works on server logic, APIs, databases, and application functionality behind the scenes."
    },
    {
      question: "Why are APIs important in backend development?",
      answer: "APIs help frontend and backend systems communicate and exchange data properly."
    }
  ],
  "java developer": [
    {
      question: "Why is Java popular for software development?",
      answer: "Java is popular because it is platform independent, secure, object-oriented, and widely used in enterprise applications."
    },
    {
      question: "What are the main features of Java?",
      answer: "Important Java features include object-oriented programming, platform independence, security, robustness, and multithreading."
    }
  ],
  "full stack developer": [
    {
      question: "What is a full stack developer?",
      answer: "A full stack developer works on both frontend and backend parts of an application."
    },
    {
      question: "Why is full stack development useful?",
      answer: "It is useful because one developer can understand and work on the complete application flow from UI to database."
    }
  ]
};

const generateProjectQuestions = (projects = []) => {
  const projectQuestions = [];

  projects.slice(0, 2).forEach((project) => {
    projectQuestions.push({
      question: `Explain your project: ${project}`,
      answer: `This project was built to solve a specific problem. I worked on its main features, implementation, and technologies used, and it helped me improve my practical development skills.`
    });

    projectQuestions.push({
      question: `What challenges did you face while building ${project}?`,
      answer: `The main challenges were understanding requirements, implementing features correctly, debugging issues, and improving the project step by step.`
    });
  });

  return projectQuestions;
};

const generateSkillQuestions = (skills = []) => {
  const skillQuestions = [];

  skills.forEach((skill) => {
    const key = skill.toLowerCase();
    if (skillQuestionBank[key]) {
      skillQuestions.push(skillQuestionBank[key]);
    }
  });

  return skillQuestions.slice(0, 6);
};

const generateHRQuestions = (name = "") => {
  return [
    {
      question: "Tell me about yourself.",
      answer: name
        ? `My name is ${name}. I am a student interested in technology and software development. I have worked on academic and personal projects and I am currently improving my practical skills.`
        : "I am a student interested in technology and software development. I have worked on academic and personal projects and I am currently improving my practical skills."
    },
    {
      question: "What are your strengths?",
      answer: "My strengths include willingness to learn, consistency, problem-solving, and interest in building practical projects."
    },
    {
      question: "Why should we hire you?",
      answer: "You should hire me because I am eager to learn, I have a strong interest in development, and I am ready to improve quickly through practical work."
    }
  ];
};

export const generateInterviewQuestions = ({ parsedData, selectedRole }) => {
  const role = selectedRole?.toLowerCase() || "mern developer";

  const roleQuestions = roleQuestionBank[role] || roleQuestionBank["mern developer"];
  const skillQuestions = generateSkillQuestions(parsedData.skills || []);
  const projectQuestions = generateProjectQuestions(parsedData.projects || []);
  const hrQuestions = generateHRQuestions(parsedData.name || "");

  return {
    roleQuestions,
    skillQuestions,
    projectQuestions,
    hrQuestions
  };
};