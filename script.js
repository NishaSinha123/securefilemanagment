document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");

    // SIGNUP FUNCTION
    function signup() {
        let name = document.getElementById("signupName").value.trim();
        let password = document.getElementById("signupPassword").value.trim();
        let message = document.getElementById("signupMessage");

        if (name === "" || password === "") {
            message.innerText = "All fields are required!";
            return;
        }

        if (localStorage.getItem(name)) {
            message.innerText = "User already exists!";
            return;
        }

        localStorage.setItem(name, password);
        message.style.color = "green";
        message.innerText = "Signup successful! Redirecting...";
        setTimeout(() => {
            window.location.href = "index.html"; // ✅ Redirect to login
        }, 2000);
    }

    // LOGIN FUNCTION
    // function login() {
    //     let name = document.getElementById("loginName").value.trim();
    //     let password = document.getElementById("loginPassword").value.trim();
    //     let message = document.getElementById("loginMessage");

    //     if (name === "" || password === "") {
    //         message.innerText = "All fields are required!";
    //         return;
    //     }

    //     let storedPassword = localStorage.getItem(name);
        
    //     if (storedPassword && storedPassword === password) {
    //         localStorage.setItem("loggedInUser", name);
    //         message.style.color = "green";
    //         message.innerText = "Login successful! Redirecting...";
    //         setTimeout(() => {
    //             window.location.href = "dashboard.html"; // ✅ Redirect to dashboard
    //         }, 2000);
    //     } else {
    //         message.innerText = "Invalid username or password!";
    //     }
    // }

    function login() {
        let name = document.getElementById("loginName").value.trim();
        let password = document.getElementById("loginPassword").value.trim();
        let message = document.getElementById("loginMessage");
    
        if (name === "" || password === "") {
            message.textContent = "Please fill in all fields!";
        } else {
            message.textContent = ""; 
            window.location.href = "dashboard.html"; 
        }
    }
 
    

    // DASHBOARD FUNCTIONALITY
    if (window.location.pathname.includes("dashboard.html")) {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            alert("You must be logged in to access the dashboard!");
            window.location.href = "index.html"; // ✅ Redirect if not logged in
        } else {
            document.getElementById("welcomeUser").innerText = `Hello, ${loggedInUser}!`;
        }

        const logoutButton = document.getElementById("logoutBtn");
        if (logoutButton) {
            logoutButton.addEventListener("click", function () {
                localStorage.removeItem("loggedInUser");
                alert("Logged out successfully!");
                window.location.href = "index.html"; // ✅ Redirect to login
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

        fileList.innerHTML = ""; // Clear old list
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

// ✅ Attach functions globally
window.signup = signup;
window.login = login;
