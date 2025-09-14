var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");

var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

var username = document.getElementById("username");
var logoutBtn = document.querySelector(".nav-link");

var users = JSON.parse(localStorage.getItem("users")) || [];

if (signupName && signupEmail && signupPassword) {
  document.querySelector("button").addEventListener("click", function () {
    if (
      signupName.value.trim() === "" ||
      signupEmail.value.trim() === "" ||
      signupPassword.value.trim() === ""
    ) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    var isExist = users.some(function (u) {
      return u.email === signupEmail.value.trim();
    });
    if (isExist) {
      Swal.fire("Warning", "Email already registered", "warning");
      return;
    }

    var newUser = {
      name: signupName.value.trim(),
      email: signupEmail.value.trim(),
      password: signupPassword.value.trim(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    Swal.fire("Success", "Account created successfully", "success").then(function () {
      window.location.href = "index.html";
    });
  });
}

if (signinEmail && signinPassword) {
  document.querySelector("button").addEventListener("click", function () {
    if (signinEmail.value.trim() === "" || signinPassword.value.trim() === "") {
      Swal.fire("Error", "Please enter email and password", "error");
      return;
    }

    var currentUser = users.find(function (u) {
      return u.email === signinEmail.value.trim() && u.password === signinPassword.value.trim();
    });

    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      window.location.href = "home.html";
    } else {
      Swal.fire("Error", "Invalid email or password", "error");
    }
  });
}

if (username) {
  var currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "index.html";
  } else {
    username.textContent = "Welcome " + currentUser.name;
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();

      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout"
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("currentUser");
          Swal.fire("Logged out", "You have been logged out successfully", "success")
            .then(() => {
              window.location.href = "index.html"; // صفحة تسجيل الدخول
            });
        }
      });
    });
  }
}
