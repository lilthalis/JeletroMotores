const header = document.querySelector('#header');
const toggle = document.querySelector('#menu-toggle');
const menu = document.querySelector('#main-menu');
const navLinks = document.querySelectorAll('.nav-link');

function closeMenu() {
  menu.classList.remove('open');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}

toggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

const sections = [...document.querySelectorAll('main section[id]')];
function updateNavigation() {
  header.classList.toggle('scrolled', window.scrollY > 20);
  const current = sections.reduce((active, section) => (
    window.scrollY >= section.offsetTop - 120 ? section : active
  ), null);
  if (!current) return;
  navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`));
}
window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const messages = {
  name: 'Informe seu nome ou empresa.',
  phone: 'Informe um telefone válido.',
  service: 'Selecione o tipo de serviço.',
  details: 'Inclua os dados básicos do motor.'
};

function validateField(field) {
  const value = field.value.trim();
  const valid = field.id === 'phone' ? value.replace(/\D/g, '').length >= 8 : value.length > 0;
  const wrapper = field.closest('.field');
  wrapper.classList.toggle('error', !valid);
  wrapper.querySelector('small').textContent = valid ? '' : messages[field.id];
  return valid;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll('[required]')];
  const isValid = fields.every(validateField);
  if (!isValid) {
    status.classList.remove('show');
    form.querySelector('.error input, .error select, .error textarea').focus();
    return;
  }
  status.textContent = 'Solicitação recebida. Nossa equipe técnica retornará em breve.';
  status.classList.add('show');
  form.reset();
});

form.querySelectorAll('[required]').forEach((field) => {
  field.addEventListener('input', () => validateField(field));
  field.addEventListener('change', () => validateField(field));
});
