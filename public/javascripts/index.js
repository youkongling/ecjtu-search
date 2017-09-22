// var login_btn = document.querySelector("#login_btn");
// if (login_btn) {
//     login_btn.addEventListener("click", function(e) {
//         e.preventDefault();
//         var info = {
//             number: document.querySelector("#number").value,
//             password: document.querySelector("#password").value
//         }
//         localStorage.setItem("info", JSON.stringify(info));
//     })
//     info = JSON.parse(localStorage.getItem("info"));
//     if (info) {
//         document.querySelector("#number").value = info.number;
//         document.querySelector("#password").value = info.password;
//     }
// }