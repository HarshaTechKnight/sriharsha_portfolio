// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu when a link is clicked
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
            
            // Smooth scroll to target
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to current section in navigation
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - headerHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll event listener for header
    window.dispatchEvent(new Event('scroll'));
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href')?.startsWith('#')) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Hero Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe hero elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Add animation class
    const animateIn = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    heroElements.forEach(el => animateIn.observe(el));
});

// Typewriter effect for tagline (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Uncomment below if you want typewriter effect
// document.addEventListener('DOMContentLoaded', function() {
//     const tagline = document.querySelector('.hero-tagline');
//     const originalText = tagline.textContent;
//     typeWriter(tagline, originalText, 30);
// });

// Experience Section Animations
function initExperienceAnimations() {
    const experienceSection = document.querySelector('.experience-section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const experienceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateExperienceElements();
                experienceObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (experienceSection) {
        experienceObserver.observe(experienceSection);
    }
}

function animateExperienceElements() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const highlightCards = document.querySelectorAll('.highlight-card');
    
    // Animate timeline items
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
    
    // Animate highlight cards
    highlightCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, timelineItems.length * 200 + index * 100);
    });
}

// Hover effects for timeline items
function initTimelineHoverEffects() {
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    timelineContents.forEach(content => {
        content.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
        });
        
        content.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(10px) scale(1)';
        });
    });
}

// Initialize experience section
document.addEventListener('DOMContentLoaded', function() {
    initExperienceAnimations();
    initTimelineHoverEffects();
    
    // Add click effect to achievement items
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateX(5px) scale(1)';
            }, 150);
        });
    });
});

// Counter animation for highlights
function animateExperienceCounters() {
    const counters = document.querySelectorAll('.highlight-card h3');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        if (text.includes('+') || text.includes('k')) {
            const target = parseFloat(text);
            const isK = text.includes('k');
            const finalValue = isK ? target * 1000 : target;
            const duration = 2000;
            const step = finalValue / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= finalValue) {
                    counter.textContent = text;
                    clearInterval(timer);
                } else {
                    const displayValue = isK ? (current / 1000).toFixed(1) + 'k' : Math.floor(current);
                    counter.textContent = displayValue;
                }
            }, 16);
        }
    });
}

// Initialize counters when experience section is visible
const experienceCounterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateExperienceCounters();
            experienceCounterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const experienceSection = document.querySelector('.experience-section');
if (experienceSection) {
    experienceCounterObserver.observe(experienceSection);
}

// Skills Section Animations
function initSkillsAnimations() {
    const skillsSection = document.querySelector('.skills-section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillsProgress();
                animateCircularProgress();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

// Animate linear progress bars
function animateSkillsProgress() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = percentage + '%';
        }, 100);
    });
}

// Animate circular progress
function animateCircularProgress() {
    const circularProgresses = document.querySelectorAll('.circular-progress');
    
    circularProgresses.forEach(progress => {
        const percentage = parseInt(progress.getAttribute('data-percentage'));
        const progressValue = progress.querySelector('.progress-value');
        const radius = 50;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;
        
        // Create SVG for circular progress
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "120");
        svg.setAttribute("height", "120");
        svg.setAttribute("viewBox", "0 0 120 120");
        
        // Create gradient
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        gradient.setAttribute("id", "progressGradient");
        gradient.setAttribute("x1", "0%");
        gradient.setAttribute("y1", "0%");
        gradient.setAttribute("x2", "100%");
        gradient.setAttribute("y2", "100%");
        
        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stop-color", "var(--accent1)");
        
        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop2.setAttribute("offset", "100%");
        stop2.setAttribute("stop-color", "var(--accent2)");
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.appendChild(defs);
        
        // Create background circle
        const bgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        bgCircle.setAttribute("cx", "60");
        bgCircle.setAttribute("cy", "60");
        bgCircle.setAttribute("r", "50");
        bgCircle.setAttribute("stroke", "rgba(255, 255, 255, 0.1)");
        bgCircle.setAttribute("stroke-width", "8");
        bgCircle.setAttribute("fill", "none");
        
        // Create progress circle
        const progressCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        progressCircle.setAttribute("cx", "60");
        progressCircle.setAttribute("cy", "60");
        progressCircle.setAttribute("r", "50");
        progressCircle.setAttribute("stroke", "url(#progressGradient)");
        progressCircle.setAttribute("stroke-width", "8");
        progressCircle.setAttribute("fill", "none");
        progressCircle.setAttribute("stroke-dasharray", circumference);
        progressCircle.setAttribute("stroke-dashoffset", circumference);
        progressCircle.setAttribute("stroke-linecap", "round");
        
        svg.appendChild(bgCircle);
        svg.appendChild(progressCircle);
        
        // Clear existing content and add new SVG
        progress.innerHTML = '';
        progress.appendChild(progressValue);
        progress.appendChild(svg);
        
        // Animate the circular progress
        setTimeout(() => {
            progressCircle.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
            progressCircle.setAttribute('stroke-dashoffset', offset);
            
            // Animate percentage counter
            let current = 0;
            const duration = 1500;
            const step = percentage / (duration / 16);
            
            const counter = setInterval(() => {
                current += step;
                if (current >= percentage) {
                    progressValue.textContent = percentage + '%';
                    clearInterval(counter);
                } else {
                    progressValue.textContent = Math.floor(current) + '%';
                }
            }, 16);
        }, 300);
    });
}

// Initialize skills section
document.addEventListener('DOMContentLoaded', function() {
    initSkillsAnimations();
    
    // Add hover effects to certification badges
    const certBadges = document.querySelectorAll('.cert-badge');
    certBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.08)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
    });
    
    // Add click effect to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', function() {
            const progressBar = this.querySelector('.progress-bar');
            progressBar.style.transform = 'scale(1.05)';
            setTimeout(() => {
                progressBar.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Add gradient definitions to SVG
function addSvgGradients() {
    const svgGradients = document.createElement('div');
    svgGradients.className = 'svg-gradients';
    svgGradients.innerHTML = `
        <svg width="0" height="0">
            <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="var(--accent1)" />
                    <stop offset="100%" stop-color="var(--accent2)" />
                </linearGradient>
            </defs>
        </svg>
    `;
    document.body.appendChild(svgGradients);
}

// Initialize SVG gradients
addSvgGradients();

// Projects Section Animations and Filtering
function initProjectsSection() {
    const projectsSection = document.querySelector('.projects-section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const projectsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProjectCards();
                initProjectsFilter();
                projectsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (projectsSection) {
        projectsObserver.observe(projectsSection);
    }
}

// Animate project cards on scroll
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 100);
    });
}

// Projects filtering functionality
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Re-animate visible cards
            setTimeout(() => {
                const visibleCards = document.querySelectorAll('.project-card[style*="display: block"]');
                visibleCards.forEach((card, index) => {
                    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 50);
        });
    });
}

// Project card hover effects
function initProjectCardInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Mouse enter effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        // Mouse leave effect
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
        
        // Click effect for project links
        const projectLinks = this.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // Simulate link opening (replace with actual links)
                console.log('Project link clicked:', this.querySelector('i').className);
            });
        });
    });
}

// Initialize projects section
document.addEventListener('DOMContentLoaded', function() {
    initProjectsSection();
    initProjectCardInteractions();
    
    // Add loading animation to project images
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Set initial state
        img.style.opacity = '0';
        img.style.transform = 'scale(1.1)';
        img.style.transition = 'all 0.6s ease';
    });
});

// Project statistics counter animation
function animateProjectStats() {
    const stats = document.querySelectorAll('.stat span');
    
    stats.forEach(stat => {
        const text = stat.textContent;
        if (text.includes('+') || text.includes('%') || text.includes('k')) {
            const originalText = text;
            stat.textContent = '0' + text.replace(/[0-9]/g, '');
            
            setTimeout(() => {
                let current = 0;
                const target = parseInt(text);
                const duration = 1500;
                const step = target / (duration / 16);
                
                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        stat.textContent = originalText;
                        clearInterval(counter);
                    } else {
                        const displayValue = Math.floor(current) + text.replace(/[0-9]/g, '');
                        stat.textContent = displayValue;
                    }
                }, 16);
            }, 500);
        }
    });
}

// Initialize stats animation when projects section is visible
const projectsStatsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProjectStats();
            projectsStatsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const projectsSection = document.querySelector('.projects-section');
if (projectsSection) {
    projectsStatsObserver.observe(projectsSection);
}

// Contact Section Functionality
function initContactSection() {
    const contactSection = document.querySelector('.contact-section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const contactObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateContactElements();
                initContactForm();
                contactObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (contactSection) {
        contactObserver.observe(contactSection);
    }
}

// Animate contact elements
function animateContactElements() {
    const contactMethods = document.querySelectorAll('.contact-method');
    const formGroups = document.querySelectorAll('.form-group');
    const quickCards = document.querySelectorAll('.quick-card');
    
    // Animate contact methods
    contactMethods.forEach((method, index) => {
        method.style.opacity = '0';
        method.style.transform = 'translateX(-30px)';
        method.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            method.style.opacity = '1';
            method.style.transform = 'translateX(0)';
        }, index * 100);
    });
    
    // Animate form groups
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(30px)';
        group.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, contactMethods.length * 100 + index * 50);
    });
    
    // Animate quick cards
    quickCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const sendAnotherBtn = document.getElementById('sendAnother');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData);
            
            // Simulate form submission (replace with actual API call)
            simulateFormSubmission(formObject);
        });
    }
    
    // Send another message button
    if (sendAnotherBtn) {
        sendAnotherBtn.addEventListener('click', function() {
            successMessage.style.display = 'none';
            contactForm.style.display = 'block';
            contactForm.reset();
        });
    }
    
    // Add input animations
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add character counter for textarea
        if (input.tagName === 'TEXTAREA') {
            const charCount = document.createElement('div');
            charCount.className = 'char-count';
            charCount.style.cssText = `
                position: absolute;
                bottom: 5px;
                right: 10px;
                font-size: 0.8rem;
                color: rgba(255, 255, 255, 0.5);
            `;
            input.parentElement.style.position = 'relative';
            input.parentElement.appendChild(charCount);
            
            input.addEventListener('input', function() {
                const count = this.value.length;
                charCount.textContent = `${count}/500`;
                
                if (count > 450) {
                    charCount.style.color = 'var(--accent2)';
                } else {
                    charCount.style.color = 'rgba(255, 255, 255, 0.5)';
                }
            });
        }
    });
}

// Simulate form submission
function simulateFormSubmission(formData) {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Show success message
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Log form data (replace with actual submission)
        console.log('Form submitted:', formData);
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Animate success message
        animateSuccessMessage();
    }, 2000);
}

// Animate success message
function animateSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    const elements = successMessage.querySelectorAll('*');
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize contact section
document.addEventListener('DOMContentLoaded', function() {
    initContactSection();
    
    // Add click effects to contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('click', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateX(5px) scale(1)';
            }, 150);
        });
    });
    
    // Add hover effects to quick cards
    const quickCards = document.querySelectorAll('.quick-card');
    quickCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });
});

// Smooth scroll for footer links
function initFooterNavigation() {
    const footerLinks = document.querySelectorAll('.footer-nav a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize footer navigation
initFooterNavigation();