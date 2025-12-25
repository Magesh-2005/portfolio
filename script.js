// Typewriter Effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init TypeWriter
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.typewriter');
    const words = JSON.parse(txtElement.getAttribute('data-text'));
    const wait = 3000;
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

// Vanilla Tilt Init
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });

    // Also add tilt to skills for fun? maybe just stick to hover transform in CSS for skills, 
    // tilt is expensive if too many elements. 
    // Let's add it to the 3D button too if possible, although it has its own CSS perspective.
}

// Particle System using HTML5 Canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('particles-js').appendChild(canvas);

let particlesArray;

// Set Canvas Size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.directionX = (Math.random() * 0.4) - 0.2;
        this.directionY = (Math.random() * 0.4) - 0.2;
        this.size = Math.random() * 3;
        this.color = Math.random() > 0.5 ? '#00f3ff' : '#bc13fe';
        this.opacity = Math.random() * 0.5;
    }
    // Draw particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
    }
    // Update particle position
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Create particle array
function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Animate particles
function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Check if particles are close enough to draw line
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                if (opacityValue < 0) opacityValue = 0;
                ctx.strokeStyle = 'rgba(140, 85, 231,' + opacityValue * 0.2 + ')'; // Mixed purple tint
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Resize event
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Start particles
initParticles();
animateParticles();

// Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    // Toggle Nav
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.right = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(5, 10, 20, 0.95)';
        navLinks.style.padding = '2rem';
        navLinks.style.textAlign = 'center';
    }

    // Animate Links? (Optional)

    // Hamburger Animation
    hamburger.classList.toggle('toggle');
});

// Fix for inline styles on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.background = 'transparent';
        navLinks.style.padding = '0';
        navLinks.style.width = 'auto';
    } else {
        navLinks.style.display = 'none';
    }
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple success message for demonstration
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;

        btn.innerHTML = 'Sending...';

        // Simulate sending
        setTimeout(() => {
            btn.innerHTML = 'Sent Successfully!';
            btn.style.borderColor = '#00f3ff';
            btn.style.boxShadow = '0 0 20px #00f3ff';

            // Reset form
            contactForm.reset();

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.borderColor = '';
                btn.style.boxShadow = '';
            }, 3000);

            // In a real scenario, you'd send this data to a backend or service like EmailJS
            // alert('Thank you for your message! This is a demo form, but I would love to hear from you at hackmagesh1@gmail.com');
        }, 1500);
    });
}
