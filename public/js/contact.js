document.getElementById("contact-form").onsubmit = () => {
  clearErrors();

  let isValid = true;

  let fname = document.getElementById("fname").value.trim();
  let lname = document.getElementById("lname").value.trim();
  let email = document.getElementById("email").value.trim();
  let meet = document.getElementById("meet").value;
  let html = document.getElementById("html");
  let text = document.getElementById("text");
  let mailingList = document.getElementById("mailing-list").checked;
  let linkedIn = document.getElementById("linked").value.trim();
  let formats = document.getElementById("email-format");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  if (mailingList && !emailRegex.test(email)) {
    document.getElementById("err-email").style.display = "block";
    isValid = false;
  } else if (email && !emailRegex.test(email)) {
    document.getElementById("err-email").style.display = "block";
    isValid = false;
  }

  //linkedIn validation
  if (linkedIn && !linkedIn.startsWith("https://www.linkedin.com/in/")) {
    document.getElementById("err-linked").style.display = "block";
    isValid = false;
  }

  //meet validation
  if (!meet) {
    document.getElementById("err-meet").style.display = "block";
    isValid = false;
  }

  //format validation
  //   if (!html.checked && !text.checked) {
  //     document.getElementById("err-format").style.display = "block";
  //     isValid = false;
  //   }

  return isValid;
};

function toggleEmailFormat() {
  let mailingList = document.getElementById("mailing-list").checked;
  let formats = document.getElementById("email-format");

  if (mailingList) {
    formats.style.visibility = "visible";
    formats.style.height = "auto";
  } else {
    formats.style.visibility = "hidden";
    formats.style.height = "0";
  }
}

function toggleOther() {
  let meet = document.getElementById("meet").value;
  let other = document.getElementById("other-field");

  if (meet === "other") {
    other.style.visibility = "visible";
    other.style.height = "auto";
  } else {
    other.style.visibility = "hidden";
    other.style.height = "0";
  }
}

document
  .getElementById("mailing-list")
  .addEventListener("change", toggleEmailFormat);

document.getElementById("meet").addEventListener("change", toggleOther);

toggleEmailFormat();
toggleOther();

function clearErrors() {
  let errors = document.getElementsByClassName("err");
  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
}
