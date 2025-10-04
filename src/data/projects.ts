import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "banking-app",
    title: "Banking Application For Testing",
    description:
      "A sophisticated banking application designed as an educational tool for students to learn real-world testing scenarios. It leverages React, Express, MySQL, AWS services, Node.js, Passport.js, and Material UI to emulate core banking functionalities, integrated with JIRA for project management and Postman for API testing.",
    date: "2023-10-29",
    image: "/images/Banking App Test.png",
    tags: [
      "React",
      "Express",
      "MySQL",
      "AWS",
      "Node.js",
      "Passport.js",
      "Material UI",
    ],
    links: {
      demo: "https://llwassim.github.io/bankingapp-frontend/",
      frontend: "https://github.com/LLwassim/bankingapp-frontend",
      backend: "https://github.com/LLwassim/bankingapp-backend",
    },
    featured: true,
  },
  {
    id: "linkedin-easyapply",
    title: "LinkedIn Easy Apply Bot",
    description:
      "An open-source LinkedIn automation bot that streamlines job applications by automating repetitive tasks like resume uploads and form filling, built with ethics and privacy in mind.",
    date: "2023-09-09",
    image: "/images/Easyapply.png",
    tags: ["Python", "Selenium", "Automation"],
    links: {
      github: "https://github.com/LLwassim/EasyApplyBot",
    },
    featured: false,
  },
  {
    id: "amazon-clone",
    title: "Amazon Clone",
    description:
      "A responsive e-commerce web application emulating Amazon's core features using React and Firebase, with Stripe integration for payments.",
    date: "2022-06-11",
    image: "/images/Amazon-Clone.png",
    tags: ["React", "Firebase", "Stripe", "E-commerce"],
    links: {
      demo: "https://amzn-76971.web.app/",
      github: "https://github.com/LLwassim/Amazon-Clone",
    },
    featured: false,
  },
];
