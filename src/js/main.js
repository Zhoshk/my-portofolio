// main.js — signed: dhani

document.addEventListener('DOMContentLoaded', () => {

    // ── Boot Screen ──────────────────────────────────────────
    const bootScreen = document.getElementById('bootScreen');
    const skipBoot = () => {
        bootScreen.classList.add('fade-out');
        setTimeout(() => bootScreen.style.display = 'none', 500);
    };
    setTimeout(skipBoot, 6000);
    document.addEventListener('keydown', skipBoot, { once: true });
    bootScreen.addEventListener('click', skipBoot, { once: true });

    // ── Smooth Scroll ────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            }
        });
    });

    // ── Intersection: section reveal ─────────────────────────
    const secObserver = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('section').forEach(s => { s.classList.add('lazy-section'); secObserver.observe(s); });

    // ── Intersection: fade-in cards ──────────────────────────
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateY(0)';
                }, i * 80);
                fadeObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity .6s ease-out, transform .6s ease-out';
        fadeObserver.observe(el);
    });

    // ── Active Nav on scroll ─────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                navLinks.forEach(a => a.classList.remove('active'));
                const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => navObserver.observe(s));

    // ── Mobile menu ──────────────────────────────────────────
    window.toggleMenu = () => document.getElementById('navLinks').classList.toggle('active');
    window.closeMenu  = () => document.getElementById('navLinks').classList.remove('active');

    // ── Terminal typewriter ──────────────────────────────────
    const lines = document.querySelectorAll('.term-line[data-type]');
    lines.forEach((line, i) => {
        const text = line.getAttribute('data-type');
        line.textContent = '';
        setTimeout(() => {
            let idx = 0;
            const type = () => {
                if (idx < text.length) { line.textContent += text[idx++]; setTimeout(type, 28); }
            };
            type();
        }, 6200 + i * 600);
    });

    // ── Contact form ─────────────────────────────────────────
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const msg = document.getElementById('submitMessage');
            const orig = btn.textContent;
            btn.textContent = 'Sending...'; btn.disabled = true;
            try {
                const res = await fetch('https://formspree.io/f/mpqkellr', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name:    document.getElementById('formName').value,
                        email:   document.getElementById('formEmail').value,
                        message: document.getElementById('formMessage').value
                    })
                });
                if (res.ok) {
                    msg.innerHTML = '✓ Message sent!'; msg.style.color = '#00FF8C';
                    form.reset();
                } else {
                    msg.innerHTML = '✗ Send failed, please try email directly.'; msg.style.color = '#FF3366';
                }
            } catch { msg.innerHTML = '✗ Network error.'; msg.style.color = '#FF3366'; }
            msg.style.display = 'block';
            setTimeout(() => msg.style.display = 'none', 3500);
            btn.textContent = orig; btn.disabled = false;
        });
    }
});

// Passive scroll
window.addEventListener('scroll', () => {}, { passive: true });