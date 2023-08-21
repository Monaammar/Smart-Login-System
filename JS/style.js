"use strict";
var signupName = document.querySelector("#signupname");
var signupEmail = document.querySelector("#signupemail");
var signupPassword = document.querySelector("#signuppassword");
// --------------------------------------------------------------//
var signinEmail = document.querySelector("#signinemail");
var signinPassword = document.querySelector("#signinpassword");
//---------------------------------------------------------------//
var usersList = [];
if (localStorage.getItem("usersList")) {
  usersList = JSON.parse(localStorage.getItem("usersList"));
}
//Validation Functions
function isEmpty() {
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}
function isValidEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}
function isEmailExist() {
  for (var i = 0; i < usersList.length; i++) {
    if (usersList[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
      return false;
    }
  }
}
// SIGN UP FUNCTION
function signUp() {
  let signBtnS = document.getElementById("success");
  let signBtnF = document.getElementById("failed");
  let signBtnE = document.getElementById("exist");
  let signBtnR = document.getElementById("regex");
  let info = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  if (isEmpty() == false) {
    signBtnF.classList.replace("d-none", "d-block");
    signBtnE.classList.replace("d-block", "d-none");
    signBtnS.classList.replace("d-block", "d-none");
    signBtnR.classList.replace("d-block", "d-none");
    return false;
  } else if (isEmailExist() == false) {
    signBtnE.classList.replace("d-none", "d-block");
    signBtnS.classList.replace("d-block", "d-none");
    signBtnF.classList.replace("d-block", "d-none");
    signBtnR.classList.replace("d-block", "d-none");
  } else if (!isValidEmail(info.email)) {
    signBtnR.classList.replace("d-none", "d-block");
    signBtnS.classList.replace("d-block", "d-none");
    signBtnF.classList.replace("d-block", "d-none");
    signBtnE.classList.replace("d-block", "d-none");
  } else {
    usersList.push(info);
    signBtnS.classList.replace("d-none", "d-block");
    signBtnE.classList.replace("d-block", "d-none");
    signBtnF.classList.replace("d-block", "d-none");
    signBtnR.classList.replace("d-block", "d-none");
  }
  localStorage.setItem("usersList", JSON.stringify(usersList));
  clearForm();
}
function clearForm() {
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
}
// ------------------------------------------------------//
//Validation Functions
function isEmptyMail() {
  if (signinEmail.value == "" || signinPassword.value == "") {
    return false;
  } else {
    return true;
  }
}
function signIn(accountMail, accountPass) {
  let password = signinPassword.value;
  let email = signinEmail.value;
  let signinE = document.getElementById("signine");
  if (isEmptyMail() == false) {
    signinE.classList.replace("d-none", "d-block");
  } else {
    for (var i = 0; i < usersList.length; i++) {
      if (
        usersList[i].email.toLowerCase().includes(email) &&
        usersList[i].password.toLowerCase().includes(password)
      ) {
        // alert("Exist");
        window.open("home.html");
      } else {
        alert("EMAIL OR PASSWORD IS WRONG");
      }
    }
  }
}
