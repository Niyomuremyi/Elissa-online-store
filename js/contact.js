/* ==========================================================================
   ELISSA ONLINE STORE — contact.js  (Contact page)
   FAQ accordion + contact form validation.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------- FAQ ACCORDION ---------------------------- */
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const alreadyOpen = item.classList.contains('open');

      // close all, then open the clicked one (if it wasn't already open)
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!alreadyOpen) item.classList.add('open');
    });
  });

  /* ---------------------------- CONTACT FORM ---------------------------- */
  const form = document.getElementById('contactForm');
  if (!form) return;

  const msg        = document.getElementById('formMessage');
  const firstName  = document.getElementById('contactFirstName');
  const lastName   = document.getElementById('contactLastName');
  const email      = document.getElementById('contactEmail');
  const subject    = document.getElementById('contactSubject');
  const message    = document.getElementById('contactMessage');
  const agree      = document.getElementById('contactAgree');

  const isValidEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const setInvalid = (el, bad) => el.classList.toggle('invalid', bad);

  form.addEventListener('submit', e => {
    e.preventDefault();
    msg.className = 'form-message';   // reset message style
    let valid = true;

    const checks = [
      [firstName, firstName.value.trim() !== ''],
      [lastName,  lastName.value.trim() !== ''],
      [email,     isValidEmail(email.value.trim())],
      [subject,   subject.value !== ''],
      [message,   message.value.trim() !== '']
    ];
    checks.forEach(([el, ok]) => { setInvalid(el, !ok); if (!ok) valid = false; });

    const fieldsOk = checks.every(([, ok]) => ok);

    if (!valid || !agree.checked) {
      msg.classList.add('error');
      msg.textContent = (fieldsOk && !agree.checked)
        ? 'Please agree to the privacy policy.'
        : 'Please fill in all required fields correctly.';
      return;
    }

    msg.classList.add('success');
    msg.textContent = '✅ Thank you! Your message has been sent.';
    form.reset();
  });

  // clear the red highlight as the user corrects each field
  [firstName, lastName, email, subject, message].forEach(el => {
    el.addEventListener('input', () => el.classList.remove('invalid'));
    el.addEventListener('change', () => el.classList.remove('invalid'));
  });
});