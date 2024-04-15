# Course Management System

This is a Course Management System built with CodeIgniter for the server and ReactJS for the client-side. The project aims to provide a comprehensive solution for managing courses, enrollments, and related activities.

## Table of Contents

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Process](#process)
5. [Learning](#learning)
6. [Improvement](#improvement)
7. [Running the Project](#running-the-project)
8. [Demo](#demo)

## Introduction

The Course Management System is a web application designed to streamline the management of courses. It provides administrators with tools to add, edit, and delete courses, as well as manage user access. The system aims to simplify course administration tasks, enhance organization, and improve user experience.

## Tech Stack

The project utilizes the following technologies:

**client-side:**

- React.js (JavaScript Library)
- React Router (Client-side Routing)
- CSS (Styling)
- Axios (HTTP Client)
- Webpack (Module Builder)
- Babel (JavaScript Compiler)

**server-side:**

- CodeIgniter (PHP Framework)
- MySQL (Database)

## Features

- **Course Management:** Administrators can create, update, and delete courses, and manage course details.
- **User Authentication:** Users can register and login with different roles into the application.
- **Media Upload:** Administrators can upload media by choosing files or drag and drop.
- **Bulk Course Deletion:** Administrators can delete courses in bulk.
- **Sort and Filter:** Administrators can sort and filter courses.
- **Responsive UI:** Responsive design for optimal viewing on various devices.

## Process

The development process followed an iterative and incremental approach. The project was divided into several milestones, each focusing on specific features or components.

1. **Planning and Requirements Gathering:** The initial phase involved understanding the project requirements, defining user stories, and creating a project roadmap.
2. **Design and Wireframing:** I created wireframes and mockups to visualize the user interface and ensure a seamless user experience.
3. **Development:** I worked in sprints, implementing features, writing tests, and integrating the server-side and client-side components.
4. **Testing and Quality Assurance:** Rigorous testing was conducted throughout the development process, including unit testing, and integration testing.

## Learning

Throughout the development of this project, I gained valuable experience in the following areas:

- **Full-Stack Web Development:** Working with both server-side and client-side technologies, integrating them seamlessly, and ensuring smooth communication between the two components.
- **CodeIgniter and ReactJS:** Deepening my understanding of the CodeIgniter framework and ReactJS library, leveraging their respective strengths and best practices.
- **Database Design and Management:** Designing an efficient and scalable database schema to support the application's requirements.
- **User Experience (UX):** Prioritizing user-centered design principles to create an intuitive and engaging user interface.
- **Module Bundling and Transpiling:** Utilizing Webpack for module bundling and Babel for transpiling modern JavaScript code to ensure cross-browser compatibility.

## Improvement

While the current version of the Course Management System is functional and meets the core requirements, there are several areas for potential improvement:

- **Performance Optimization:** Identify and address performance bottlenecks, especially for resource-intensive operations or high-traffic scenarios.
- **Accessibility:** Implement accessibility best practices to ensure the application is usable by individuals with disabilities or impairments.
- **Integration with Third-Party Services:** Explore integration with popular Learning Management Systems (LMS), video conferencing tools, or other relevant services to enhance the overall functionality.
- **Implement Support using AI Chatbot:** Integrate an AI-powered chatbot to provide automated support and assistance to users, enhancing the overall user experience.
- **Implement Notifications:** Develop a comprehensive notification system to keep users informed about important events, deadlines, and updates related to their courses and activities.
- **Use Redux for State Management:** Leverage Redux for efficient state management in the React application, ensuring better organization and maintainability of application state.
- **Implement Rich Text Editor:** Integrate a rich text editor to allow instructors and students to create and format content, such as course materials or assignments, with ease.
- **Use Load Balancing and Caching Mechanism:** Implement load balancing and caching mechanisms to improve application performance and handle high traffic scenarios more effectively.

## Running the project

To run this project locally, follow these steps:

1. Clone the repository:
   `git clone https://github.com/MercyKorir/course-app-management-system.git`

2. Set up the server-side environment:

- Install PHP, XAMPP and MySQL.
- Configure MySQL database and update the connection details in the configuration.

3. Set up client-side environment:

- Navigate to the root directory:
  `cd <root-folder>`
- Install Node.js and npm (Node Package Manager)
- Run `npm install` to install the required dependencies.

4. Build the client-side:

- In the `root directory`, run `webpack --config webpack.config.js` to build the React app using webpack and Babel.

5. Start the application:

- Begin your Apache Server and MySQL Server.
- In the `root directory`, run `php spark serve` to start the application.

6. Access the application:
   - Open your web browser and navigate to `http://localhost:8080` (Or appropriate URL based on your configuration)

## Demo

<div align="center">
  <a href="https://drive.google.com/file/d/1f_yStd71QNjuuoeFX9HUhCSbBfFJ5glE/view?usp=drive_link">
    <img src="./Screenshot (390)(1).png" alt="Course App Demo Video" style="max-width: 100%; object-fit: contain;" />
  </a>
</div>

Click the image above to watch the demo video.
