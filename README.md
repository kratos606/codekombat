# CodeKombat 
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white) ![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![Pillow](https://img.shields.io/badge/Pillow-007ACC?style=for-the-badge&logo=pillow&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white) ![Passport](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)

CodeKombat is a full-stack coding platform designed for developers who want to practice and sharpen their coding skills. Inspired by coding battle platforms like LeetCode and HackerRank, CodeKombat offers a unique and engaging way to solve coding challenges.

## 🌟 Features
- 🥇 **Challenges:** A variety of coding challenges to solve, ranging from beginner to advanced levels.
- 🖥️ **Live Code Editor:** Write and test your code directly in the browser using our integrated editor.
- 📝 **Test Cases:** Automatically run your solutions against a set of test cases to validate correctness.
- 🗄️ **Backend with Node.js & Express:** Robust backend API that handles challenge submissions, user authentication, and more.
- 🗂️ **Database:** Uses MongoDB for storing user data, challenges, and submission history.
- 🐳 **Docker Environment:** All code executions run inside Docker containers, ensuring a safe and isolated environment.

## 🚀 Getting Started

### Prerequisites
- Node.js
- Docker
- MongoDB (or a MongoDB Atlas account)
- Python
- Pillow

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/kratos606/codekombat.git
    cd codekombat
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables: Create a `.env` file and add the following:
    ```env
    MONGO_URI=<your_mongodb_connection_string>
    PORT=5000
    JWT_SECRET=<your_jwt_secret>
    ```

4. Run the app:
    ```bash
    npm run server
    ```
    The app will be running on [http://localhost:5000](http://localhost:5000).

### Client-Side Development
The client is already built. To update the client side during development:
1. Update the `app.config.js` file in the `client-vite` folder with the backend URL.
2. Run:
    ```bash
    npm run dev
    ```
    **Important:** In `index.js`, comment out the part that serves the built version of the frontend to ensure the development version is served.

### Docker
Code execution is managed through Docker containers, ensuring a secure and isolated environment for running code challenges.

## 🎯 Usage
1. Sign up or log in to your account.
2. Choose a coding challenge based on your skill level.
3. Use the in-browser code editor to solve the challenge.
4. Submit your solution and see instant feedback.

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the project.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Contact
For any inquiries or feedback, feel free to reach out:
- GitHub: [kratos606](https://github.com/kratos606)
- Email: yassirbenmoussa357@gmail.com

Enjoy coding with CodeKombat! 🎉
