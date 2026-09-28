/**
 * J ELETRO MOTORES - Single Page Application Script
 * Vanilla JS: Navegação suave, Header dinâmico, Validação de Formulário & Mobile Menu
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initFormValidation();
  initCurrentYear();
  initScrollSpy();
});

/**
 * 1. Altera a transparência do Header ao rolar a página
 */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Execução inicial para carregamentos no meio da página
}

/**
 * 2. Menu Hamburguer e Drawer Mobile
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .btn-mobile-only');

  if (!menuToggle || !navMenu) return;

  const toggleMenu = () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  };

  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  menuToggle.addEventListener('click', toggleMenu);

  // Fecha o menu ao clicar em qualquer item
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * 3. Validação do Formulário de Contato e Disparo Técnico
 */
function initFormValidation() {
  const form = document.getElementById('quote-form');
  const phoneInput = document.getElementById('client-phone');
  const feedbackBox = document.getElementById('form-feedback');

  if (!form) return;

  // Máscara simples para Telefone/WhatsApp Brasileiro
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 6) {
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else if (value.length > 2) {
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
      e.target.value = value;
    }
  });

  // Limpa mensagens de erro durante a digitação
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('input-invalid');
      const errorMsg = document.getElementById(`${field.name}-error`);
      if (errorMsg) errorMsg.textContent = '';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    const name = form['name'];
    const phone = form['phone'];
    const service = form['service'];
    const specs = form['specs'];

    // Validação Nome
    if (!name.value.trim() || name.value.trim().length < 3) {
      setError(name, 'name-error', 'Informe o seu nome ou da sua indústria.');
      isValid = false;
    }

    // Validação Telefone
    const cleanPhone = phone.value.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError(phone, 'phone-error', 'Informe um telefone/WhatsApp corporativo válido.');
      isValid = false;
    }

    // Validação Serviço
    if (!service.value) {
      setError(service, 'service-error', 'Selecione uma categoria de serviço.');
      isValid = false;
    }

    // Validação Especificações do Motor
    if (!specs.value.trim() || specs.value.trim().length < 5) {
      setError(specs, 'specs-error', 'Descreva dados básicos do motor (Ex: 10CV, 1750 RPM).');
      isValid = false;
    }

    if (isValid) {
      const submitBtn = document.getElementById('btn-submit');
      const originalBtnContent = submitBtn.innerHTML;

      // Estado de carregamento / envio
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Processando Parâmetros...</span>`;

      // Simulação de transmissão para engenharia técnica
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;

        feedbackBox.className = 'form-feedback success';
        feedbackBox.textContent = 'Parâmetros recebidos com sucesso! Nossa engenharia de plantão entrará em contato via WhatsApp.';

        // Opcional: Gerar link direto para abrir no WhatsApp com a mensagem formatada
        const whatsappMsg = encodeURIComponent(
          `*SOLICITAÇÃO DE ORÇAMENTO INDUSTRIAL*\n\n` +
          `*Cliente/Empresa:* ${name.value.trim()}\n` +
          `*Telefone:* ${phone.value.trim()}\n` +
          `*Serviço:* ${service.value}\n` +
          `*Especificações do Motor:* ${specs.value.trim()}`
        );

        // Resetar o formulário
        form.reset();

        // Oferece abertura automática do WhatsApp após 1.5s
        setTimeout(() => {
          const directWpp = confirm('Deseja abrir diretamente no WhatsApp para agilizar o atendimento de plantão?');
          if (directWpp) {
            window.open(`https://wa.me/5500999999999?text=${whatsappMsg}`, '_blank');
          }
        }, 800);

      }, 1000);
    }
  });

  function setError(inputElement, errorElementId, message) {
    inputElement.classList.add('input-invalid');
    const errorContainer = document.getElementById(errorElementId);
    if (errorContainer) {
      errorContainer.textContent = message;
    }
  }
}

/**
 * 4. Atualiza o ano no rodapé automaticamente
 */
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * 5. ScrollSpy - Destaca o link ativo no menu ao navegar pelas seções
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

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