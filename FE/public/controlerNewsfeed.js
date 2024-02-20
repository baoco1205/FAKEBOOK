var socket = io("http://localhost:3000/");
let token = localStorage.getItem("token");
$(document).ready(() => {
  let userID;
  fetch("http://localhost:3000/get_user_id", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
      if (data.status === 401) {
        alert("Login session has expired");
        location.href = "http://127.0.0.1:5500/FE/views/login.html";
      }

      if (!data.ok) {
        throw new Error("Network response was not ok");
      }
      // console.log(data);
      return data.json();
    })
    .then((userID) => {
      localStorage.setItem("userID", userID.data);
    })
    .catch((err) => {});
});
