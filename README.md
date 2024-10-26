<p align="center">
  <img src="https://github.com/shalithamadhuwantha/SAALMS/blob/main/public/img/logo.png" width="20%" alt="SAALMS logo">
</p>
<p align="center">
    <h1 align="center">SAALMS</h1>
</p>
<p align="center">
    <em><code>❯ SAALMS (Student Attendance and Lecture Management System)</code></em>
</p>
<p align="center">
    <em>SAALMS is a comprehensive web application designed to streamline student attendance tracking and lecture management for educational institutions. It allows lecturers to manage classes efficiently, automate attendance records.</em>
</p>

<p align="center">
	<img src="https://img.shields.io/github/license/shalithamadhuwantha/SAALMS?style=flat&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="License">
	<img src="https://img.shields.io/github/last-commit/shalithamadhuwantha/SAALMS?style=flat&logo=git&logoColor=white&color=0080ff" alt="Last Commit">
	<img src="https://img.shields.io/github/languages/top/shalithamadhuwantha/SAALMS?style=flat&color=0080ff" alt="Top Language">
	<img src="https://img.shields.io/github/languages/count/shalithamadhuwantha/SAALMS?style=flat&color=0080ff" alt="Language Count">
</p>
<p align="center">
	<em>Built with the tools and technologies:</em>
</p>
<p align="center">
    <img src="https://img.shields.io/badge/React.js-61DAFB?style=flat&logo=react&logoColor=white" alt="React.js Badge">
    <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white" alt="Next.js Badge">
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS Badge">
    <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js Badge">
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white" alt="MongoDB Badge">
    <!-- Add more technologies as needed -->
</p>


<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/Webpack-8DD6F9.svg?style=flat&logo=Webpack&logoColor=black" alt="Webpack">
	<br>
	<img src="https://img.shields.io/badge/datefns-770C56.svg?style=flat&logo=date-fns&logoColor=white" alt="datefns">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>


<br>

##### 🔗 Table of Contents

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📂 Repository Structure](#-repository-structure)
- [🧩 Modules](#-modules)
- [🚀 Getting Started](#-getting-started)
    - [🔖 Prerequisites](#-prerequisites)
    - [📦 Installation](#-installation)
    - [🤖 Usage](#-usage)
    - [🧪 Tests](#-tests)
- [📌 Project Roadmap](#-project-roadmap)
- [🤝 Contributing](#-contributing)
- [🎗 License](#-license)
- [🙌 Acknowledgments](#-acknowledgments)

---
---

## 📍 Overview

<p align="center">
<code>❯ SAALMS is a Student Attendance and Lecture Management System designed to streamline attendance tracking and course management for students and lecturers.</code>
</p>
<p align="center">
<code>❯ The system integrates seamlessly with online platforms, ensuring an efficient learning experience.</code>
</p>

---

## 👾 Features

<p align="center">
  <ul>
    <li><code>✅ Real-time attendance tracking</code></li>
    <li><code>✅ User-friendly dashboards for students and lecturers</code></li>
    <li><code>✅ Notifications and reminders for upcoming lectures</code></li>
    <li><code>✅ Comprehensive reporting and analytics tools</code></li>
    <li><code>✅ Secure login and user authentication</code></li>
  </ul>
</p>

---



## 📂 Repository Structure

```sh
└── SAALMS/
    ├── README.md
    ├── app
    │   ├── Dev
    │   ├── Lecturer
    │   ├── Providers.js
    │   ├── Student
    │   ├── api
    │   ├── components
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── login
    │   ├── login.module.css
    │   └── page.tsx
    ├── lib
    │   └── mongodb.js
    ├── models
    │   ├── Attendance.js
    │   ├── class.js
    │   ├── lecturer.js
    │   └── student.js
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── public
    │   ├── dummy.csv
    │   ├── images
    │   ├── img
    │   ├── manifest.json
    │   ├── profileimg
    │   ├── sw.js
    │   ├── sw.js.map
    │   ├── template.html
    │   ├── workbox-631a4576.js
    │   └── workbox-631a4576.js.map
    ├── tailwind.config.ts
    └── tsconfig.json
```

---

## 🧩 Modules

<details closed><summary>Click to expand</summary>

| File | Summary |
| --- | --- |
| [next.config.mjs](https://github.com/shalithamadhuwantha/SAALMS/blob/main/next.config.mjs) | <code>❯ Configuration settings for Next.js application.</code> |
| [package-lock.json](https://github.com/shalithamadhuwantha/SAALMS/blob/main/package-lock.json) | <code>❯ Lockfile for dependencies and package versions.</code> |
| [tsconfig.json](https://github.com/shalithamadhuwantha/SAALMS/blob/main/tsconfig.json) | <code>❯ TypeScript configuration file for type checking.</code> |
| [next-env.d.ts](https://github.com/shalithamadhuwantha/SAALMS/blob/main/next-env.d.ts) | <code>❯ Defines TypeScript types for Next.js environment.</code> |
| [package.json](https://github.com/shalithamadhuwantha/SAALMS/blob/main/package.json) | <code>❯ Metadata for the project and dependencies.</code> |
| [tailwind.config.ts](https://github.com/shalithamadhuwantha/SAALMS/blob/main/tailwind.config.ts) | <code>❯ Configuration settings for Tailwind CSS framework.</code> |

</details>




---

## 🚀 Getting Started

### 🔖 Prerequisites

**TypeScript**: `version x.y.z`

### 📦 Installation

Build the project from source:

1. Clone the SAALMS repository:
```sh
❯ git clone https://github.com/shalithamadhuwantha/SAALMS
```

2. Navigate to the project directory:
```sh
❯ cd SAALMS
```

3. Install the required dependencies:
```sh
❯ npm install
```

### 🤖 Usage

To run the project, execute the following command:

```sh
❯ npm run build && node dist/main.js
```

### 🧪 Tests

Execute the test suite using the following command:

```sh
❯ npm test
```

---

## 📌 Project Roadmap

- [X] **`Task 3`**: Implement feature three.
- [X] **`Task 4`**: Design user interface for attendance tracking.
- [X] **`Task 5`**: Integrate automated certificate issuance feature.
- [X] **`Task 6`**: Set up database for lecture management.
- [X] **`Task 7`**: Implement API for student data retrieval.
- [X] **`Task 8`**: Conduct user testing and feedback sessions.
- [X] **`Task 9`**: Optimize application performance and security.
- [X] **`Task 10`**: Launch final version and gather user feedback.

---



## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/shalithamadhuwantha/SAALMS/issues)**: Submit bugs found or log feature requests for the `SAALMS` project.
- **[Submit Pull Requests](https://github.com/shalithamadhuwantha/SAALMS/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/shalithamadhuwantha/SAALMS/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/shalithamadhuwantha/SAALMS
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/shalithamadhuwantha/SAALMS/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=shalithamadhuwantha/SAALMS">
   </a>
</p>
</details>

---

## 🎗 License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## 🙌 Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
