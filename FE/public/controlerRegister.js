$(document).ready(() => {
  $("#buttonBack").click(() => {
    location.href = "http://127.0.0.1:5500/FE/views/login.html";
  });
  $("#buttonRegister").click(() => {
    let username = $("#username").val();
    let password = $("#password").val();
    let name = $("#name").val();
    let gender = $("#gender").val();
    let address = $("#address").val();
    let confirmPassword = $("#confirmPassword").val();
    let yob = $("#yob").val();
    if (!username || !name || !password) {
      alert("field with (*) must not null");
      location.href = "http://127.0.0.1:5500/FE/views/register.html";
    }
    if (password != confirmPassword) {
      alert("Password and confirm password must be match! ");
      location.href = "http://127.0.0.1:5500/FE/views/register.html";
    }
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: username,
        password: password,
        name: name,
        gender: gender,
        address: address,
        yob: yob,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            alert("Has problem at register, pls try again");
            location.href = "http://127.0.0.1:5500/FE/views/register.html";
          }
          if (response.status === 409) {
            alert("username is already in use");
            location.href = "http://127.0.0.1:5500/FE/views/register.html";
          }
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        alert("Register success. Please login");
        location.href = "http://127.0.0.1:5500/FE/views/login.html";
        // axios.defaults.headers.common["Bearer Token"] = `Bearer ${token}`;
        // authorization: `Bearer ${token}`,
      });
  });
});
