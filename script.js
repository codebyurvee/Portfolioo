// Sticky Navbar
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 50);
    }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Change icon between menu and close
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('bx-menu', 'bx-x');
        } else {
            icon.classList.replace('bx-x', 'bx-menu');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            if (icon) icon.classList.replace('bx-x', 'bx-menu');
        });
    });
}

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    if (document.querySelector('.hero')) {
        gsap.from('.hero-left .one', { duration: 1, x: -100, opacity: 0, ease: 'power4.out' });
        gsap.from('.hero-left .two', { duration: 1, x: -100, opacity: 0, delay: 0.3, ease: 'power4.out' });
        gsap.from('.hero-left .p', { duration: 1, x: -100, opacity: 0, delay: 0.5, ease: 'power4.out' });
        gsap.from('.hero-left .btnc', { duration: 1, y: 50, opacity: 0, delay: 0.8, ease: 'power4.out' });
        // Image animation disabled to prevent disappearing issue
        // gsap.from('.hero-right img', { duration: 1.5, scale: 0.8, opacity: 0, delay: 0.5, ease: 'power2.out' });
    }

    // Generic Section Title Animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    // About Page Animations
    if (document.querySelector('.about')) {
        gsap.fromTo('.about-content p', 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.3 }
        );
        gsap.fromTo('.skill-item', 
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)' }
        );
    }

    // Services Page Animations
    if (document.querySelector('.services-container')) {
        gsap.fromTo('.service-card', 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
        );
    }

    // Projects Page Animations
    if (document.querySelector('.projects-grid')) {
        gsap.from('.project', {
            scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
            duration: 1,
            y: 100,
            opacity: 0,
            stagger: 0.3,
            ease: 'power3.out'
        });
    }
});

// Project Case Study Data
const projectData = {
    ai: {
        title: "AI for Household",
        img: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",
        description: "A state-of-the-art smart automation system that uses deep learning to learn from occupant behavior. It optimizes lighting, temperature, and security based on presence and time of day.",
        features: ["Voice recognition integration", "Real-time energy tracking", "Predictive security alerts"],
        link: "#"
    },
    sales: {
        title: "Sales Analytics Dashboard",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        description: "A comprehensive data visualization suite built for high-volume e-commerce stores. It processes millions of data points to provide actionable insights into customer behavior.",
        features: ["Dynamic filtering system", "Interactive SVG charts", "Exportable PDF reports"],
        link: "#"
    },
    portfolio: {
        title: "Creative Portfolio",
        img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
        description: "A minimalist portfolio designed to put the work first. Using cutting-edge CSS techniques and GSAP for smooth, buttery-soft transitions.",
        features: ["Pixel-perfect responsive design", "Custom cursor interaction", "Dark/Light mode ready"],
        link: "#"
    }
};

// Modal Logic
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

if (modal && modalBody) {
    document.querySelectorAll('.project-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const data = projectData[projectId];
            
            modalBody.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.img}" alt="${data.title}">
                <p>${data.description}</p>
                <h3>Key Features:</h3>
                <ul style="margin-left: 20px; margin-bottom: 20px; color: #ccc;">
                    ${data.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                <a href="${data.link}" class="btn">View Live Demo</a>
            `;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Functional Contact Form (Formspree AJAX)
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(form);
        status.textContent = "Sending...";
        status.className = "";
        status.style.display = "block";

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.textContent = "Thanks! Your message has been sent successfully.";
                status.classList.add('success');
                form.reset();
            } else {
                const result = await response.json();
                status.textContent = result.errors ? result.errors.map(error => error.message).join(", ") : "Oops! There was a problem submitting your form";
                status.classList.add('error');
            }
        } catch (error) {
            status.textContent = "Oops! There was a problem submitting your form";
            status.classList.add('error');
        }
    });
}
