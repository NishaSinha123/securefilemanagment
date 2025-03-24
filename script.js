// Function for login
async function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const messageElement = document.getElementById("loginMessage");

    // Validate input fields
    if (!email || !password) {
        messageElement.textContent = "Username/Email and password are required!";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),  
        });

        const data = await response.json();

        if (response.ok) {
            messageElement.textContent = "Login Successful! Redirecting...";
            messageElement.classList.remove("text-red-500");
            messageElement.classList.add("text-green-500");
            setTimeout(() => {
                window.location.href = "dashboard.html"; 
            }, 2000);
        }
        
        else {
            messageElement.textContent = data.message || "Invalid email or password!";
        }
    } catch (error) {
        console.error("Login error:", error);
        messageElement.textContent = "An error occurred. Please try again.";
    }
}





// Function for signup
async function signup() {
    const name = document.getElementById("loginName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    if (!name || !email || !password) {
        message.textContent = "All fields are required!";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            message.textContent = "Signup successful! Redirecting...";
            message.classList.remove("text-red-500");
            message.classList.add("text-green-500");

            setTimeout(() => {
                window.location.href = "login.html"; 
            }, 2000);
        } else {
            message.textContent = data.message || "Signup failed!";
        }
    } catch (error) {
        message.textContent = "Error connecting to the server!";
    }
}



document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");


    if (window.location.pathname.includes("dashboard.html")) {
        const loggedInUser = localStorage.getItem("loggedInUser");

        if (!loggedInUser) {
            window.location.href = "login.html"; 
        } else {
            document.getElementById("welcomeUser").innerText = Hello, ${loggedInUser}!;
        }


        // Adding Functionality in the LogOut Button
        const logoutButton = document.getElementById("logoutBtn");

        if (logoutButton) {
            logoutButton.addEventListener("click", () => {
                const message = document.createElement('div');
                message.textContent = "Logout Successful!";
                Object.assign(message.style, {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '5px'
                });
                document.body.appendChild(message);
                setTimeout(() => {
                    localStorage.removeItem("loggedInUser");
                    window.location.href = "login.html";
                }, 1000);
            });
        }
        


        // Load existing files
        loadFiles();

        // File Upload Functionality
        const uploadForm = document.getElementById("uploadForm");
        if (uploadForm) {
            uploadForm.addEventListener("submit", function (event) {
                event.preventDefault();
                const fileInput = document.getElementById("fileUpload");
                const file = fileInput.files[0];

                if (!file) {
                    alert("Please select a file to upload.");
                    return;
                }

                let storedFiles = JSON.parse(localStorage.getItem(loggedInUser + "_files")) || [];

                // Prevent duplicate uploads
                if (storedFiles.includes(file.name)) {
                    alert("This file is already uploaded.");
                    return;
                }

                storedFiles.push(file.name);
                localStorage.setItem(loggedInUser + "_files", JSON.stringify(storedFiles));

                fileInput.value = "";
                loadFiles();
            });
        }
    }

    // Load Files Function
    function loadFiles() {
        const loggedInUser = localStorage.getItem("loggedInUser");
        const fileList = document.getElementById("fileList");

        if (!fileList) return;

        fileList.innerHTML = "";
        let storedFiles = JSON.parse(localStorage.getItem(loggedInUser + "_files")) || [];

        storedFiles.forEach(file => {
            let listItem = document.createElement("li");
            listItem.innerHTML = `
                ${file} 
                <button class="delete-btn text-red-400">Delete</button>
            `;
            fileList.appendChild(listItem);

            listItem.querySelector(".delete-btn").addEventListener("click", function () {
                storedFiles = storedFiles.filter(f => f !== file);
                localStorage.setItem(loggedInUser + "_files", JSON.stringify(storedFiles));
                loadFiles();
            });
        });
    }
});
