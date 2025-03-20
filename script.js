
function login() {
    let name = document.getElementById("loginName").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let message = document.getElementById("loginMessage");

    if (name === "" || password === "") {
        message.textContent = "Please fill in all fields!";
    } else {
        localStorage.setItem("loggedInUser", name);
        message.textContent = "Login Successful!";
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    }
}

// Signup Functionality
function signup() {
    let name = document.getElementById("loginName").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let message = document.getElementById("loginMessage");

    if (name === "" || password === "") {
        message.textContent = "Please fill in all fields!";
    } else {
        message.textContent = "Signup Successful!";
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");

    if (window.location.pathname.includes("dashboard.html")) {
        const loggedInUser = localStorage.getItem("loggedInUser");

        if (!loggedInUser) {
            window.location.href = "index.html";
        } else {
            document.getElementById("welcomeUser").innerText = `Hello, ${loggedInUser}!`; // ✅ Corrected line
        }

        // Logout Button Functionality
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
                    window.location.href = "index.html";
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
