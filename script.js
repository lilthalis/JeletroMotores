// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. MENU MOBILE (TOGGLE)
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Alterna ícone entre menu hamburguer e x
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Fechar menu mobile ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    /* ==========================================================================
       2. SCROLL HEADER & ACTIVE LINK SELECTION
       ========================================================================== */
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');

    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        // Sticky Header estilo Glassmorphism mais denso
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Highlight Link Ativo
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', scrollActive);

    /* ==========================================================================
       3. VALIDAÇÃO SIMPLES DO FORMULÁRIO DE CONTATO
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;

            // Elementos dos campos
            const fields = [
                { id: 'name', errorId: 'name-error', check: val => val.trim() !== '' },
                { id: 'email', errorId: 'email-error', check: val => validateEmail(val) },
                { id: 'phone', errorId: 'phone-error', check: val => val.trim().length >= 8 },
                { id: 'service', errorId: 'service-error', check: val => val !== '' },
                { id: 'message', errorId: 'message-error', check: val => val.trim() !== '' }
            ];

            fields.forEach(field => {
                const input = document.getElementById(field.id);
                const parent = input.parentElement;
                
                if (!field.check(input.value)) {
                    parent.classList.add('error');
                    isValid = false;
                } else {
                    parent.classList.remove('error');
                }
            });

            if (isValid) {
                // Simulação de Envio bem-sucedido
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Solicitação enviada com sucesso! Nossa equipe técnica entrará em contato em breve.';
                contactForm.reset();

                // Limpa mensagem de status após 6 segundos
                setTimeout(() => {
                    formStatus.className = 'form-status';
                    formStatus.textContent = '';
                }, 6000);
            }
        });

        // Auxiliar: Validação Regex de E-mail
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }

        // Limpa estado de erro ao digitar
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.parentElement.classList.contains('error')) {
                    input.parentElement.classList.remove('error');
                }
            });
        });
    }
});