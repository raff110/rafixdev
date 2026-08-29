if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, offset: 100 });
}

const typedText = document.getElementById('typed-text');
if (typedText && typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
        strings: [
            'Full-Stack Developer.',
            'Android App Creator.',
            'Cyber Security Enthusiast.',
            'Ethical Hacker.',
            'IoT & Arduino Expert.'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        loop: true
    });
}

if (window.particlesJS) {
    particlesJS('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: '#06b6d4' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#06b6d4', opacity: 0.2, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg', 'border-b', 'border-gray-800');
        } else {
            navbar.classList.remove('shadow-lg', 'border-b', 'border-gray-800');
        }
    });
}

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const formStatus = document.getElementById('formStatus');
        const submitBtn = e.target.querySelector('button[type="submit"]');

        if (!name || !email || !message) {
            formStatus.className = 'mt-6 text-center block text-red-400 font-bold';
            formStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Mohon isi semua form terlebih dahulu.';
            return;
        }

        formStatus.classList.remove('hidden', 'text-green-400', 'text-red-400');
        formStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mentransmisikan pesan ke server...';
        formStatus.classList.add('block', 'text-cyan-400');
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-50', 'cursor-not-allowed');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (response.ok) {
                formStatus.className = 'mt-6 text-center block text-green-400 font-bold';
                formStatus.innerHTML = `<i class="fas fa-check-circle"></i> ${data.message}`;
                contactForm.reset();
            } else {
                throw new Error(data?.error || 'Gagal');
            }
        } catch (error) {
            formStatus.className = 'mt-6 text-center block text-red-400 font-bold';
            formStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Terjadi kesalahan jaringan atau server.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    });
}

const projectTabButtons = document.querySelectorAll('.project-tab-btn');
const projectTabPanels = document.querySelectorAll('.project-tab-panel');

if (projectTabButtons.length && projectTabPanels.length) {
    projectTabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.tabTarget;

            projectTabButtons.forEach((btn) => {
                btn.classList.toggle('active', btn === button);
            });

            projectTabPanels.forEach((panel) => {
                const shouldShow = panel.dataset.tabPanel === target;
                panel.classList.toggle('hidden', !shouldShow);
            });
        });
    });
}

const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length) {
    const animateCounter = (el) => {
        const target = Number(el.dataset.target || 0);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = `${value}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = `${target}${suffix}`;
        };

        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach((el) => observer.observe(el));
}
