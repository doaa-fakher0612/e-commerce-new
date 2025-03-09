
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password');
const messageInput = document.getElementById('message');


nameInput.addEventListener('blur', validateName);
nameInput.addEventListener('input', () => clearError(nameInput, 'name-error'));


emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', () => clearError(emailInput, 'name-error'));

passwordInput.addEventListener('blur', validatePassword);
passwordInput.addEventListener('input', () => clearError(passwordInput, 'password-error'));


messageInput.addEventListener('blur', validateMessage);
messageInput.addEventListener('input', () => clearError(messageInput, 'message-error'));


document.getElementById('myForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const isNameValid = validateName();
   const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isMessageValid = validateMessage();
  
  if (isNameValid && validateEmail && isPasswordValid && isMessageValid) {
    this.submit(); // Submit if all valid
  }
});

// Validation Functions
function validateName() {
  const name = nameInput.value.trim();
  const nameError = document.getElementById('name-error');
  if (!name.match(/^[A-Za-z\s]+$/)) {
    nameError.textContent = 'Name must contain only letters and spaces.';
    nameError.style.color = "red"
    return false;
  }
  nameError.textContent = '';
  return true;
}

function validateEmail(){
    const email = emailInput.value.trim();
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
  if (!emailRegex.test(email)) {
    emailError.textContent = 'Write Valid Email';
    emailError.style.color = "red";
    
      emailError.textContent = '';
      return true;
}
}

function validatePassword() {
  const password = passwordInput.value;
  const passwordError = document.getElementById('password-error');

  const passwordRegex = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).*$/;
  if (!password.match(passwordRegex)) {
    passwordError.textContent = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 special character   and 1 number';
     passwordError.style.color = "red"
    return false;
  }
  passwordError.textContent = '';
  return true;
}

function validateMessage() {
  const message = messageInput.value.trim();
  const messageError = document.getElementById('message-error');
  if (message === '') {
    messageError.textContent = 'Message cannot be empty.';
    return false;
  } else if (message.length > 500) {
    messageError.textContent = 'Message must be less than 500 characters.';
     messageError.style.color = "red"
    return false;
  }
  messageError.textContent = '';
  return true;
}

// Clear error when user starts typing
function clearError(input, errorId) {
  const errorElement = document.getElementById(errorId);
  if (input.value.trim() !== '') {
    errorElement.textContent = '';
  }
}

function handelSubmit(){
    alert("Thank You! \n We Receive Your Message")
}