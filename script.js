const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open');
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    });
  });
}

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  const fields = [...contactForm.querySelectorAll('input, textarea')];

  const validateField = (field) => {
    const error = field.parentElement.querySelector('.field-error');
    field.classList.toggle('is-invalid', !field.validity.valid);
    if (field.validity.valueMissing) error.textContent = 'This field is required.';
    else if (field.validity.typeMismatch) error.textContent = 'Please enter a valid email address.';
    else if (field.validity.tooShort) error.textContent = `Please use at least ${field.minLength} characters.`;
    else error.textContent = '';
    return field.validity.valid;
  };

  fields.forEach((field) => field.addEventListener('blur', () => validateField(field)));

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const isValid = fields.map(validateField).every(Boolean);
    const status = document.querySelector('#form-status');

    if (!isValid) {
      status.textContent = 'Please check the highlighted fields and try again.';
      contactForm.querySelector(':invalid')?.focus();
      return;
    }

    status.textContent = 'Thank you — your message is ready to send. We’ll be in touch soon.';
    contactForm.reset();
    fields.forEach((field) => field.classList.remove('is-invalid'));
  });
}
