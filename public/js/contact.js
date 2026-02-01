document.getElementById("contact-form").onsubmit = () => {
  clearErrors();

  let isValid = true;

  let fname = document.getElementById("fname").value.trim();
  let lname = document.getElementById("lname").value.trim();
  let email = document.getElementById("email").value.trim();
  let meet = document.getElementById("meet").value;
  let html = document.getElementById("html");
  let text = document.getElementById("text");

  //first name validation
  if (!fname) {
    document.getElementById("err-fname").style.display = "block";
    isValid = false;
  }

  //last name validation
  if (!lname) {
    document.getElementById("err-lname").style.display = "block";
    isValid = false;
  }

  //email validation
  if (!email) {
    document.getElementById("err-email").style.display = "block";
    isValid = false;
  }

  //meet validation
  if (!meet) {
    document.getElementById("err-meet").style.display = "block";
    isValid = false;
  }

  //format validation
  if (!html.checked && !text.checked) {
    document.getElementById("err-format").style.display = "block";
    isValid = false;
  }

  return isValid;
};

function clearErrors() {
  let errors = document.getElementsByClassName("err");
  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
}
