🥋 CodeKombat

CodeKombat is a full-stack coding platform designed for developers who want to practice and sharpen their coding skills. Inspired by coding battle platforms like LeetCode and HackerRank, CodeKombat offers a unique and engaging way to solve coding challenges.

🌟 Features
🥇 Challenges: A variety of coding challenges to solve, ranging from beginner to advanced levels.
🖥️ Live Code Editor: Write and test your code directly in the browser using our integrated editor.
📝 Test Cases: Automatically run your solutions against a set of test cases to validate correctness.
🗄️ Backend with Node.js & Express: Robust backend API that handles challenge submissions, user authentication, and more.
🗂️ Database: Uses MongoDB for storing user data, challenges, and submission history.
🐳 Docker Environment: All code executions run inside Docker containers, ensuring a safe and isolated environment.
🚀 Getting Started
Prerequisites
Node.js
Docker
MongoDB (or a MongoDB Atlas account)
Installation
Clone the repository:

bash
Copier le code
git clone https://github.com/kratos606/codekombat.git
cd codekombat
Install dependencies:

bash
Copier le code
npm install
Set up environment variables: Create a .env file and add the following:

env
Copier le code
MONGO_URI=<your_mongodb_connection_string>
PORT=5000
JWT_SECRET=<your_jwt_secret>
Run the app:

bash
Copier le code
npm run server
The app will be running on http://localhost:5000.

Client-Side Development:

The client is already built. To update the client side during development:
Update the app.config.js file in the client-vite folder with the backend URL.
Run:
bash
Copier le code
npm run dev
Important: In index.js, comment out the part that serves the built version of the frontend to ensure the development version is served.
Docker:

Code execution is managed through Docker containers, ensuring a secure and isolated environment for running code challenges.
🎯 Usage
Sign up or log in to your account.
Choose a coding challenge based on your skill level.
Use the in-browser code editor to solve the challenge.
Submit your solution and see instant feedback.
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the project.
Create a new branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Open a Pull Request.
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

💬 Contact
For any inquiries or feedback, feel free to reach out:

GitHub: kratos606
Email: your.email@example.com
