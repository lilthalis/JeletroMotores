/**
 * J ELETRO MOTORES - Script SPA Completo
 * Fundada em 15/05/2012 | Palmas - PR
 * Integração: WhatsApp (46) 9 9115-6068 & Fixo (46) 3262-3964
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initFaqAccordion();
  initFormQuote();
  initYear();
  initScrollSpy();
});

/**
 * 1. Efeito do Header ao Rolar
 */
function initStickyHeader() {
  const header = document.getElementById('main-header');
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/**
 * 2. Menu Mobile Drawer
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-cta a');

  if (!menuToggle || !navMenu) return;

  const toggle = () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  };

  const close = () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  menuToggle.addEventListener('click', toggle);
  navLinks.forEach(link => link.addEventListener('click', close));
}

/**
 * 3. Acordeão Interativo de Dúvidas (FAQ)
 */
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Fecha todos os outros itens para manter o acordeão limpo
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherContent = otherItem.querySelector('.accordion-content');
        if (otherContent) otherContent.style.maxHeight = null;
        const otherHeader = otherItem.querySelector('.accordion-header');
        if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
      });

      // Se não estava aberto, abre o clicado
      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * 4. Validação e Envio do Formulário para o WhatsApp (46) 9 9115-6068
 */
function initFormQuote() {
  const form = document.getElementById('quote-form');
  const phoneInput = document.getElementById('phone');

  if (!form) return;

  // Máscara com DDD
  phoneInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);

    if (val.length > 10) {
      e.target.value = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    } else if (val.length > 6) {
      e.target.value = `(${val.slice(0, 2)}) ${val.slice(2, 6)}-${val.slice(6)}`;
    } else if (val.length > 2) {
      e.target.value = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    } else {
      e.target.value = val;
    }
  });

  // Limpa mensagens de erro ao digitar
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('field-error');
      const err = document.getElementById(`${input.name}-error`);
      if (err) err.textContent = '';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const name = form['name'];
    const phone = form['phone'];
    const service = form['service'];
    const city = form['city'];
    const details = form['details'];

    if (!name.value.trim() || name.value.trim().length < 3) {
      showError(name, 'name-error', 'Informe o seu nome ou da empresa.');
      isValid = false;
    }

    const cleanPhone = phone.value.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      showError(phone, 'phone-error', 'Informe um telefone/WhatsApp com DDD.');
      isValid = false;
    }

    if (!service.value) {
      showError(service, 'service-error', 'Selecione o tipo de serviço.');
      isValid = false;
    }

    if (!city.value.trim()) {
      showError(city, 'city-error', 'Informe sua cidade / localização.');
      isValid = false;
    }

    if (!details.value.trim() || details.value.trim().length < 4) {
      showError(details, 'details-error', 'Informe dados básicos do motor ou sintoma.');
      isValid = false;
    }

    if (isValid) {
      const submitBtn = document.getElementById('btn-submit');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Formatando dados para a Oficina...</span>`;

      // Mensagem organizada para o WhatsApp real da J Eletro
      const message = encodeURIComponent(
        `*SOLICITAÇÃO DE ORÇAMENTO - J ELETRO MOTORES*\n` +
        `_(Empresa fundada em 15/05/2012 - Palmas/PR)_\n\n` +
        `*Cliente/Empresa:* ${name.value.trim()}\n` +
        `*Telefone:* ${phone.value.trim()}\n` +
        `*Cidade:* ${city.value.trim()}\n` +
        `*Serviço:* ${service.value}\n` +
        `*Dados do Motor:* ${details.value.trim()}\n\n` +
        `_Enviado pelo site jeletromotores.com.br_`
      );

      // WhatsApp oficial da fachada: (46) 9 9115-6068
      const wppNumber = '5546991156068';
      const wppUrl = `https://wa.me/${wppNumber}?text=${message}`;

      setTimeout(() => {
        window.open(wppUrl, '_blank');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 600);
    }
  });

  function showError(input, errorId, msg) {
    input.classList.add('field-error');
    const errContainer = document.getElementById(errorId);
    if (errContainer) errContainer.textContent = msg;
  }
}

/**
 * 5. Ano Atual no Rodapé
 */
function initYear() {
  const yearEl = document.getElementById('year-copy');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/**
 * 6. ScrollSpy para Menu Ativo
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}