// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all portfolio features
    initFilterSystem();
    initProjectModal();
    initAnimations();
    initCounters();
    initLoadMore();
    initFloatingShapes();
    initScrollEffects();
    initProjectInteractions();
});

// Filter System
function initFilterSystem() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('filter-hide');
                    card.classList.add('filter-show');
                    setTimeout(() => {
                        card.style.display = 'block';
                    }, 50);
                } else {
                    card.classList.add('filter-hide');
                    card.classList.remove('filter-show');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            // Update project count
            updateProjectCount(filterValue);
        });
    });
}

// Update project count based on filter
function updateProjectCount(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    let visibleCount = 0;

    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filter === 'all' || cardCategory === filter) {
            visibleCount++;
        }
    });

    // Animate counter update
    const statNumber = document.querySelector('.stat-number[data-count]');
    if (statNumber) {
        animateNumber(statNumber, visibleCount);
    }
}

// Project Modal System
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const previewButtons = document.querySelectorAll('.preview-btn');

    // Project data for modal content
    const projectData = {
        church: {
            title: 'Dayspring Seraphic Church Website',
            description: 'A comprehensive church management website built with modern web technologies.',
            features: [
                'Responsive design that works on all devices',
                'Event calendar with RSVP functionality',
                'Sermon upload and streaming system',
                'Member registration and management',
                'Online donation integration',
                'Multi-language support'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
            challenges: 'The main challenge was creating an accessible interface for users of all ages while maintaining modern design standards.',
            solution: 'Implemented a clean, intuitive design with large buttons and clear navigation paths.',
            images: ['church.png'],
            liveUrl: 'https://www.dayspringseraphicchurch.org/'
        },
        calculator: {
            title: 'Aggregate Calculator',
            description: 'Educational tool for calculating JAMB and O\'Level aggregate scores for Nigerian students.',
            features: [
                'Multiple grading systems support',
                'Instant score calculations',
                'Result history and saving',
                'Grade point average calculator',
                'University cutoff comparison',
                'Mobile-optimized interface'
            ],
            technologies: ['JavaScript', 'Local Storage', 'CSS Grid', 'Progressive Web App'],
            challenges: 'Ensuring accuracy across different grading systems and making complex calculations user-friendly.',
            solution: 'Created a step-by-step interface with validation and clear result explanations.',
            images: ['agg.png'],
            liveUrl: 'https://aggregatecal.vercel.app/'
        },
        first: {
            title: 'My First Frontend Project',
            description: 'The project that started my web development journey - a learning experience in HTML and CSS.',
            features: [
                'Clean HTML structure',
                'CSS Flexbox and Grid layouts',
                'Responsive design principles',
                'Basic JavaScript interactions',
                'Cross-browser compatibility',
                'Semantic HTML elements'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Flexbox', 'CSS Grid'],
            challenges: 'Understanding the fundamentals of web development and responsive design.',
            solution: 'Focused on mastering the basics before moving to advanced concepts.',
            images: ['taco.png'],
            liveUrl: 'https://phemmyexpert.netlify.app/'
        },
            mascot: {
        title: 'Mascot Consortium - Business Services',
        description: 'A comprehensive business services website offering writing, branding, and administration solutions to elevate businesses.',
        features: [
            'Professional content creation and copywriting services',
            'Complete brand identity development and logo design',
            'Streamlined administrative support and project management',
            'S.P.A. Model integration (Selling, Perception, Administration)',
            'Responsive design for all devices',
            'Client consultation and revision system'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Modern UI/UX'],
        challenges: 'Creating a professional, trustworthy website that effectively communicates multiple service offerings while maintaining clean design.',
        solution: 'Implemented a structured approach with clear service categories, professional styling, and intuitive navigation to showcase business expertise.',
        images: ['mascot.png'],
        liveUrl: 'https://mascot-delta.vercel.app/'
    },
    tolulope: {
    title: 'Tolulope Exclusive - Professional Portfolio',
    description: 'A comprehensive portfolio website for Adejoorin Tolulope Eunice, showcasing her expertise as an entrepreneur, business coach, and content writer.',
    features: [
        'Professional biography and credentials display',
        'Service offerings: content writing, business coaching, mentorship',
        'Portfolio section showcasing working samples',
        'Contact form and direct communication channels',
        'Responsive design optimized for all devices',
        'Clean, professional layout emphasizing credibility'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Modern Typography'],
    challenges: 'Creating a professional presence that effectively communicates multiple expertise areas while maintaining visual hierarchy and user engagement.',
    solution: 'Designed a clean, structured layout with clear service sections, professional styling, and strategic use of white space to enhance readability and credibility.',
    images: ['tolulope.png'],
    liveUrl: 'https://toluexclusive.vercel.app/'
},

kingdom: {
    title: 'Kingdom Life International Academy Nigeria (KLIAN)',
    description: 'Professional educational website for Kingdom Life International Academy, showcasing the institution\'s commitment to academic excellence and character development.',
    features: [
        'Professional academic institution presentation',
        'Key achievements and statistics display (100% graduation rate)',
        'Student-teacher ratio showcase (20:1)',
        'Extracurricular activities information (50+ activities)',
        'Principal\'s welcome message section',
        'Clean, educational-focused design'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Educational Web Standards'],
    challenges: 'Creating a trustworthy, professional educational website that effectively communicates the school\'s values and achievements to parents and prospective students.',
    solution: 'Implemented a clean, academic design with clear statistics, professional imagery, and structured information hierarchy to build trust and showcase educational excellence.',
    images: ['kingdom.png'],
    liveUrl: 'https://kingdom-i3no.vercel.app/index.html'
},
velocity: {
    title: 'Velocity Flex Company - Remote Employment Platform',
    description: 'A comprehensive remote employment website for Velocity Flex Company, connecting remote workers with W-2 job opportunities across the United States and Canada.',
    features: [
        'Remote W-2 job opportunities across US and Canada',
        'Multiple service categories: admin support, customer service, data solutions',
        'Comprehensive benefits showcase (paid training, weekly pay, equipment provided)',
        'Professional company presentation and contact information',
        'Job application and recruitment system',
        'Clean, corporate design emphasizing professionalism and trust'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Corporate Web Standards'],
    challenges: 'Creating a trustworthy, professional recruitment website that effectively communicates job opportunities and company benefits to attract quality remote workers.',
    solution: 'Implemented a clean, corporate design with clear job categories, comprehensive benefits information, and professional presentation to build credibility and attract qualified candidates.',
    images: ['velocity.png'],
    liveUrl: 'https://velocity-tau-nine.vercel.app/'
},
whitemountain: {
    title: 'White Mountain Massage and Spa Services',
    description: 'A professional wellness website for White Mountain Massage and Spa Services, offering therapeutic massage and spa treatments with a focus on client comfort and well-being.',
    features: [
        'Professional massage therapy service presentation',
        'Multiple massage types: Deep Tissue, Hot Stone, Swedish',
        'Clear service descriptions and benefits',
        'Contact information and booking details',
        'Professional therapist introduction',
        'Booking policies and deposit information'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Wellness Web Design'],
    challenges: 'Creating a calming, professional website that builds trust for personal wellness services while clearly communicating service offerings and policies.',
    solution: 'Implemented a clean, soothing design with clear service descriptions, professional presentation, and transparent booking policies to establish credibility and comfort.',
    images: ['whitemountain.png'],
    liveUrl: 'https://whitemountain.vercel.app/'
},

csministers: {
    title: 'C&S Ministers - Biography Project',
    description: 'A dedicated blog platform for the Cherubim & Seraphim Ministers Biography project, preserving and sharing inspiring stories of church ministers and their contributions to faith and service.',
    features: [
        'Minister biography profiles and stories',
        'Pastor Sam Makanju featured profile',
        'Multiple minister categories: Pastor, Prophet, Evangelist',
        'Legacy preservation and faith documentation',
        'Inspiring spiritual content and guidance',
        'Clean, reverent design honoring ministry work'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Blog Platform', 'Content Management'],
    challenges: 'Creating a respectful, professional platform that honors religious figures while making their stories accessible and inspiring to future generations.',
    solution: 'Developed a clean, reverent design with structured biography sections, meaningful imagery, and spiritual quotes to create an atmosphere of respect and inspiration.',
    images: ['csministers.png'],
    liveUrl: 'https://blog-iota-ten-94.vercel.app/'
},

hairssentials: {
    title: 'Toluexclusive Hairssentials - Natural Haircare E-commerce',
    description: 'A comprehensive e-commerce platform for Toluexclusive Hairssentials, a natural haircare brand offering quality, safe, and effective products for diverse hair challenges.',
    features: [
        'Complete e-commerce functionality with product catalog',
        'Natural haircare product showcase for men, women, and kids',
        'Best-selling products: Ayurvedic Hair Growth Butter, Intensive Hair Growth Oil',
        'Product categories and detailed descriptions',
        'Pricing and sales functionality (₦4,500 - ₦6,500 range)',
        'Professional product photography and branding'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'E-commerce Platform', 'Product Management'],
    challenges: 'Creating a trustworthy e-commerce platform that effectively showcases natural haircare products while building customer confidence in product quality and safety.',
    solution: 'Developed a clean, professional design with detailed product information, clear pricing, attractive product imagery, and emphasis on natural ingredients to build brand trust.',
    images: ['hairssentials.png'],
    liveUrl: 'https://tolu-hairsenntials.vercel.app/'
},
younglegend: {
    title: 'Young Legend Hub - Educational Services Platform',
    description: 'A comprehensive educational services website offering online tutoring, graphics design, examination registration, and mobile data services with 5+ years of teaching experience.',
    features: [
        'Multiple service offerings: tutoring, graphics design, exam registration',
        'One-on-one and group tutoring sessions',
        'Student testimonials and reviews section',
        'Experienced tutor profile (5 years, OND Business Administration)',
        'Contact information and location details (Lagos, Nigeria)',
        'Blog section with learning tips and motivation'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Multi-service Platform', 'Educational Web Design'],
    challenges: 'Creating a multi-service platform that effectively communicates diverse offerings while maintaining focus on educational excellence and building trust with students.',
    solution: 'Developed a structured layout with clear service sections, tutor credentials, student testimonials, and practical contact information to establish credibility and accessibility.',
    images: ['younglegend.png'],
    liveUrl: 'https://younglegend.vercel.app/'
},
originalportfolio: {
    title: 'My Original Portfolio Website - Where It All Started',
    description: 'My very first personal portfolio website that showcased my early web development skills and marked the beginning of my professional journey in tech.',
    features: [
        'Personal introduction and professional passion statement',
        'Core skills showcase: Web Development, Problem Solving, Creative Thinking',
        'Early project portfolio including church website and calculator',
        'Simple, clean design focusing on content over complexity',
        'Contact and collaboration invitation section',
        'Foundation work that led to advanced portfolio development'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Basic Web Design', 'Portfolio Fundamentals'],
    challenges: 'Creating my first professional web presence while learning fundamental web development concepts and establishing my personal brand.',
    solution: 'Focused on clean, simple design with clear content presentation, showcasing genuine passion for technology and willingness to learn and grow.',
    images: ['originalportfolio.png'],
    liveUrl: 'https://oluwafemiweb.vercel.app/'
},
usmanbusiness: {
    title: 'U.S. Man Business Ventures - Early Training Project',
    description: 'An early web development training project for U.S. Man Business Ventures, a multi-service business center offering computer training, printing, and administrative services.',
    features: [
        'Multiple business services listing (computer training, printing, lamination)',
        'WAEC and JAMB registration services',
        'Basic registration form with form validation',
        'Contact information and location details (Lagos)',
        'Simple service-oriented business presentation',
        'Fundamental web development practice project'
    ],
    technologies: ['HTML5', 'CSS3', 'Basic JavaScript', 'Form Handling', 'Beginner Web Design'],
    challenges: 'Learning basic web development concepts while creating a functional business website with forms and service listings.',
    solution: 'Focused on practicing HTML structure, basic CSS styling, and simple form creation - essential building blocks for web development skills.',
    images: ['usmanbusiness.png'],
    liveUrl: 'https://usmanbusiness.vercel.app/'
},

velocityassessment: {
    title: 'Velocity Flex Company - Assessment Portal',
    description: 'Official assessment platform designed for Velocity Flex Company to evaluate potential remote workers across various skill categories and job roles.',
    features: [
        'Comprehensive skill assessment system',
        'Multi-role evaluation: Data Entry, Virtual Assistance, Customer Support',
        'Problem-solving ability measurement tools',
        'Remote work preparedness evaluation',
        'Professional assessment interface',
        'Automated response system (24-48 hour turnaround)'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Assessment Platform', 'Form Processing'],
    challenges: 'Creating a professional, reliable assessment system that accurately evaluates candidates for remote work positions while maintaining user-friendly experience.',
    solution: 'Developed a streamlined assessment portal with clear instructions, professional presentation, and efficient evaluation process to support Velocity Flex Company\'s recruitment needs.',
    images: ['velocityassessment.png'],
    liveUrl: 'https://assessment1-hazel1-mu.vercel.app/'
},
        design: {
            title: 'E-Commerce App Design',
            description: 'Complete UI/UX design for a modern mobile e-commerce application.',
            features: [
                'User research and persona development',
                'Wireframes and user flow diagrams',
                'High-fidelity prototypes',
                'Design system and style guide',
                'Accessibility considerations',
                'User testing and iterations'
            ],
            technologies: ['Figma', 'Adobe XD', 'Principle', 'InVision', 'Sketch'],
            challenges: 'Balancing visual appeal with usability while maintaining brand consistency.',
            solution: 'Conducted extensive user research and iterative testing to refine the design.',
            images: [],
            liveUrl: '#'
        }
    };

    // Open modal
    previewButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('disabled')) return;
            
            const projectKey = button.getAttribute('data-project');
            const project = projectData[projectKey];
            
            if (project) {
                displayProjectModal(project);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function displayProjectModal(project) {
        modalBody.innerHTML = `
            <div class="modal-project">
                <h2 class="modal-title">${project.title}</h2>
                <p class="modal-description">${project.description}</p>
                
                <div class="modal-section">
                    <h3 class="modal-section-title">Key Features</h3>
                    <ul class="modal-features">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3 class="modal-section-title">Technologies Used</h3>
                    <div class="modal-technologies">
                        ${project.technologies.map(tech => `<span class="modal-tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3 class="modal-section-title">Challenges & Solutions</h3>
                    <div class="modal-challenge">
                        <h4>Challenge:</h4>
                        <p>${project.challenges}</p>
                    </div>
                    <div class="modal-solution">
                        <h4>Solution:</h4>
                        <p>${project.solution}</p>
                    </div>
                </div>
                
                ${project.liveUrl !== '#' ? `
                <div class="modal-actions">
                    <a href="${project.liveUrl}" target="_blank" class="modal-live-btn">
                        <i class="fas fa-external-link-alt"></i>
                        View Live Project
                    </a>
                </div>
                ` : ''}
            </div>
        `;
    }
}

// Intersection Observer for Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Trigger counter animation if it's a stat card
                if (entry.target.classList.contains('portfolio-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // Observe stats section
    const statsSection = document.querySelector('.portfolio-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Animated Counters
function initCounters() {
    // This will be triggered by intersection observer
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        animateNumber(counter, target);
    });
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 50);
}

// Load More Functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    loadMoreBtn.addEventListener('click', () => {
        // Simulate loading more projects
        showLoadingState(loadMoreBtn);
        
        setTimeout(() => {
            addMoreProjects();
            hideLoadingState(loadMoreBtn);
        }, 2000);
    });
}

function showLoadingState(button) {
    button.innerHTML = `
        <div class="loading-spinner"></div>
        Loading Projects...
    `;
    button.disabled = true;
}

function hideLoadingState(button) {
    button.innerHTML = `
        <i class="fas fa-plus"></i>
        Load More Projects
    `;
    button.disabled = false;
}

function addMoreProjects() {
    const hiddenProjects = document.querySelectorAll('.project-card.hidden-project');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Show 3 projects at a time
    const projectsToShow = Array.from(hiddenProjects).slice(0, 3);
    
    if (projectsToShow.length === 0) {
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    projectsToShow.forEach((project, index) => {
        setTimeout(() => {
            project.classList.remove('hidden-project');
            project.classList.add('show-project');
        }, index * 200);
    });
    
    // Hide load more button if no more hidden projects
    const remainingHidden = document.querySelectorAll('.project-card.hidden-project');
    if (remainingHidden.length === 0) {
        loadMoreBtn.style.display = 'none';
    }
    
    // Update project count
    updateProjectCounters();
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-aos', 'fade-up');
    
    card.innerHTML = `
        <div class="project-image-container">
            <div class="placeholder-image">
                <i class="fas fa-${project.category === 'web' ? 'globe' : 'mobile-alt'}"></i>
                <span>New Project</span>
            </div>
            <div class="project-overlay">
                <div class="overlay-content">
                    <button class="preview-btn disabled">
                        <i class="fas fa-eye"></i>
                        Preview
                    </button>
                    <button class="live-btn disabled">
                        <i class="fas fa-external-link-alt"></i>
                        Coming Soon
                    </button>
                </div>
            </div>
            <div class="project-status">
                <span class="status-badge ${project.status}">${project.status.replace('-', ' ')}</span>
            </div>
        </div>
        <div class="project-content">
            <div class="project-meta">
                <span class="project-category">${project.category}</span>
                <span class="project-date">2025</span>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-technologies">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-stats">
                <div class="stat-item">
                    <i class="fas fa-clock"></i>
                    <span>New Project</span>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Dynamic Floating Shapes
function initFloatingShapes() {
    const shapesContainer = document.querySelector('.floating-shapes');
    
    // Create additional floating elements
    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.style.cssText = `
            position: absolute;
            width: ${Math.random() * 100 + 50}px;
            height: ${Math.random() * 100 + 50}px;
            background: linear-gradient(45deg, rgba(0, 212, 255, 0.1), rgba(153, 102, 255, 0.1));
            border-radius: ${Math.random() > 0.5 ? '50%' : '20%'};
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * -20}s;
        `;
        shapesContainer.appendChild(shape);
    }
}

// Scroll Effects
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollY = window.scrollY;
        const shapes = document.querySelectorAll('.floating-shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = scrollY * speed;
            shape.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);
}

// Project Interactions
function initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Mouse enter effect
        card.addEventListener('mouseenter', () => {
            // Add glow effect to nearby cards
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            projectCards.forEach(otherCard => {
                if (otherCard !== card) {
                    const otherRect = otherCard.getBoundingClientRect();
                    const otherCenterX = otherRect.left + otherRect.width / 2;
                    const otherCenterY = otherRect.top + otherRect.height / 2;
                    
                    const distance = Math.sqrt(
                        Math.pow(centerX - otherCenterX, 2) + 
                        Math.pow(centerY - otherCenterY, 2)
                    );
                    
                    if (distance < 400) {
                        otherCard.style.filter = 'brightness(1.1)';
                    }
                }
            });
        });
        
        // Mouse leave effect
        card.addEventListener('mouseleave', () => {
            projectCards.forEach(otherCard => {
                otherCard.style.filter = 'brightness(1)';
            });
        });
        
        // Click effect
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.preview-btn') && !e.target.closest('.live-btn')) {
                createClickRipple(e, card);
            }
        });
    });
}

// Create ripple effect on click
function createClickRipple(e, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Update project counters
function updateProjectCounters() {
    const visibleProjects = document.querySelectorAll('.project-card:not(.hidden-project)').length;
    const totalProjects = document.querySelectorAll('.project-card').length;
    
    // Update the stat number if it exists
    const statNumber = document.querySelector('.stat-number[data-count]');
    if (statNumber) {
        animateNumber(statNumber, visibleProjects);
    }
}

// Search functionality (bonus feature)
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search projects...';
    searchInput.className = 'project-search';
    searchInput.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 25px;
        padding: 1rem 1.5rem;
        color: #ffffff;
        font-size: 1rem;
        margin-bottom: 2rem;
        width: 300px;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    `;
    
    // Insert search before filter container
    const filterContainer = document.querySelector('.filter-container');
    filterContainer.parentNode.insertBefore(searchInput, filterContainer);
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            const technologies = Array.from(card.querySelectorAll('.tech-tag'))
                .map(tag => tag.textContent.toLowerCase()).join(' ');
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          technologies.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                card.style.display = 'block';
                card.classList.add('search-match');
            } else {
                card.style.display = 'none';
                card.classList.remove('search-match');
            }
        });
    });
}

// Keyboard shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Press 'f' to focus filter buttons
        if (e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            document.querySelector('.filter-btn').focus();
        }
        
        // Press 's' to focus search (if implemented)
        if (e.key === 's' || e.key === 'S') {
            e.preventDefault();
            const searchInput = document.querySelector('.project-search');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Arrow keys to navigate filter buttons
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const focusedButton = document.activeElement;
            if (focusedButton && focusedButton.classList.contains('filter-btn')) {
                e.preventDefault();
                const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
                const currentIndex = filterButtons.indexOf(focusedButton);
                let nextIndex;
                
                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % filterButtons.length;
                } else {
                    nextIndex = currentIndex - 1 < 0 ? filterButtons.length - 1 : currentIndex - 1;
                }
                
                filterButtons[nextIndex].focus();
            }
        }
        
        // Enter to activate focused filter button
        if (e.key === 'Enter') {
            const focusedButton = document.activeElement;
            if (focusedButton && focusedButton.classList.contains('filter-btn')) {
                focusedButton.click();
            }
        }
    });
}

// Performance optimization - Intersection Observer for lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Theme switching (bonus feature)
function initThemeSwitcher() {
    const themeButton = document.createElement('button');
    themeButton.innerHTML = '<i class="fas fa-palette"></i>';
    themeButton.className = 'theme-switcher';
    themeButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(45deg, #00d4ff, #9966ff);
        border: none;
        color: #ffffff;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(themeButton);
    
    const themes = [
        { primary: '#00d4ff', secondary: '#9966ff' },
        { primary: '#ff6b6b', secondary: '#4ecdc4' },
        { primary: '#ffa500', secondary: '#ff1493' },
        { primary: '#32cd32', secondary: '#ff4500' }
    ];
    
    let currentTheme = 0;
    
    themeButton.addEventListener('click', () => {
        currentTheme = (currentTheme + 1) % themes.length;
        const theme = themes[currentTheme];
        
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.secondary);
        
        // Animate button
        themeButton.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            themeButton.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    });
}

// Easter egg - Konami code
function initEasterEgg() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let userInput = [];
    
    document.addEventListener('keydown', (e) => {
        userInput.push(e.code);
        userInput = userInput.slice(-konamiCode.length);
        
        if (userInput.join('') === konamiCode.join('')) {
            activateEasterEgg();
        }
    });
}

function activateEasterEgg() {
    // Create party effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'party 2s ease-in-out';
        }, index * 100);
    });
    
    // Add party animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes party {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-20px) rotate(5deg); }
            50% { transform: translateY(0) rotate(-5deg); }
            75% { transform: translateY(-10px) rotate(3deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Show celebration message
    const message = document.createElement('div');
    message.textContent = '🎉 Party Mode Activated! 🎉';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        color: #ffffff;
        padding: 2rem 3rem;
        border-radius: 20px;
        font-size: 2rem;
        font-weight: bold;
        z-index: 10000;
        animation: fadeInOut 3s ease-in-out;
    `;
    
    const fadeAnimation = document.createElement('style');
    fadeAnimation.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        }
    `;
    document.head.appendChild(fadeAnimation);
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
        projectCards.forEach(card => {
            card.style.animation = '';
        });
    }, 3000);
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    initKeyboardShortcuts();
    initLazyLoading();
    initThemeSwitcher();
    initEasterEgg();
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initFilterSystem,
        initProjectModal,
        initAnimations,
        animateCounters
    };
}