const form = document.getElementById('survey-form');
const progressBar = document.getElementById('form-progress');
const formInputs = form.querySelectorAll('input, select, textarea');

function updateProgress() {
  const totalInputs = formInputs.length;
  let filledInputs = 0;

  formInputs.forEach(input => {
    if (input.type === 'radio' || input.type === 'checkbox') {
      if (input.checked) {
        filledInputs++;
      }
    } else if (input.value.trim() !== '') {
      filledInputs++;
    }
  });

  const progress = (filledInputs / totalInputs) * 100;
  progressBar.style.width = `${progress}%`;
}

formInputs.forEach(input => {
  input.addEventListener('input', updateProgress);
  input.addEventListener('change', updateProgress);
});

form.addEventListener('submit', function(event) {
  event.preventDefault();

  if (validateForm()) {
    showModal('Thank you for your feedback! Your responses have been submitted.');
    form.reset();
    updateProgress();
  }
});

function validateForm() {
  let isValid = true;
  const requiredInputs = form.querySelectorAll('[required]');

  requiredInputs.forEach(input => {
    if (input.value.trim() === '') {
      isValid = false;
      showError(input, 'This field is required');
    } else {
      clearError(input);
    }
  });

  const emailInput = document.getElementById('email');
  if (emailInput.value.trim() !== '' && !isValidEmail(emailInput.value)) {
    isValid = false;
    showError(emailInput, 'Please enter a valid email address');
  }

  return isValid;
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showError(input, message) {
  const formGroup = input.closest('.form-group');
  const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  formGroup.appendChild(errorElement);
  input.classList.add('error');
}

function clearError(input) {
  const formGroup = input.closest('.form-group');
  const errorElement = formGroup.querySelector('.error-message');
  if (errorElement) {
    errorElement.remove();
  }
  input.classList.remove('error');
}

function showModal(message) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
  <div class="modal-content">
  <p>${message}</p>
  <button onclick="closeModal()">Close</button>
  </div>
  `;
  document.body.appendChild(modal);
}

function closeModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
  }
}