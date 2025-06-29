const submitBtn = document.getElementById("submitBtn");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passError = document.getElementById("passError");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (vaildateName() && vaildateEmail() && vaildatePassword()) {
    alert("Form is submitted successfully !!");
  }
});

function vaildateName() {
  let name = document.getElementById("name").value;

  if (name.length == 0) {
    nameError.innerHTML = "Name is required";
    nameError.previousElementSibling.classList.add('fa-xmark');
    return false;
  }

  if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/))
  {
    nameError.innerHTML = "Write your full name";
    nameError.previousElementSibling.classList.add('fa-xmark');
    return false;
  }
    nameError.innerHTML = "";
    nameError.previousElementSibling.classList.add('fa-check');
    return true;
};

function vaildateEmail() {
  let email = document.getElementById("email").value;

  if (email.length == 0) {
    emailError.innerHTML = "Email is required";
    emialError.previousElementSibling.classList.add('fa-xmark');
    return false;
  }

  if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
  {
    emialError.innerHTML = "Write email";
    emialError.previousElementSibling.classList.add('fa-xmark');
    return false;
  }
    emailError.innerHTML = "";
    emailError.previousElementSibling.classList.add('fa-check');
    return true;
};

function vaildatePassword() {
  let password = document.getElementById("password").value;

  if (password.length == 0) {
    passError.innerHTML = "Password is required";
    passError.previousElementSibling.classList.add('fa-xmark');
    return false;
  }

  if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/))
  {
    passError.innerHTML = "Password should contain 1 small and large alphabet, 1 number and 1 symbol";
    passError.previousElementSibling.classList.add('fa-xmark');
    return false;
  }
    passError.innerHTML = "";
    passError.previousElementSibling.classList.add('fa-check');
    return true;
};
