/**
 * SISTEMA "ACERCA DE" - REDISEÑO PROFESIONAL
 * Con timeline en pestañas y diseño ecommerce
 */

class AboutSystemPremium {
    constructor(aboutData, options = {}) {
        this.aboutData = aboutData;
        this.options = {
            animationDuration: 300,
            ...options
        };
        this.modal = null;
        this.activeModal = null;
        this.currentTimelineTab = '2020s';

        this.init();
    }

    init() {
        this.renderSchoolInfo();
        this.renderMissionVision();
        this.renderTimelineTabs();
        this.renderTeamMembers();
        this.renderValues();
        this.renderContactInfo();
        this.setupEventListeners();
        this.setupModal();
        this.setupIntersectionObserver();

        // Inicializar la primera pestaña del timeline
        this.showTimelineDecade(this.currentTimelineTab);
    }

    // ======================
    //  RENDERIZADO DE CONTENIDO
    // ======================

    renderSchoolInfo() {
        const school = this.aboutData.schoolInfo;
        if (!school) return;

        const heroSection = document.querySelector('.about-hero');
        if (heroSection) {
            const statsHTML = `
                <div class="school-stats animate-fade-in delay-3">
                    <div class="stat-item">
                        <span class="stat-number" data-count="${school.stats.years}">0</span>
                        <span class="stat-label">Años de Historia</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" data-count="${school.stats.teachers}">0</span>
                        <span class="stat-label">Profesores</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" data-count="${school.stats.students}">0</span>
                        <span class="stat-label">Estudiantes</span>
                    </div>
                </div>
            `;

            const heroContent = heroSection.querySelector('.about-hero-content');
            if (heroContent) {
                heroContent.insertAdjacentHTML('beforeend', statsHTML);
            }
        }

        const purposeSection = document.getElementById('purpose-section');
        if (purposeSection) {
            const schoolInfoHTML = `
                <div class="school-info-container animate-fade-in">
                    <div class="school-logo-container">
                        <img src="${school.logo}" alt="${school.name}" class="school-logo" loading="lazy">
                    </div>
                    <div class="school-details">
                        <h3>${school.name}</h3>
                        <p class="school-motto">${school.motto}</p>
                        <p class="school-description">${school.description}</p>
                        <div class="school-meta">
                            <p><strong>Fundado:</strong> ${school.founded}</p>
                            <p><strong>Director:</strong> ${school.director}</p>
                            <p><strong>Ubicación:</strong> ${school.location}</p>
                        </div>
                    </div>
                    <div class="school-image-container">
                        <img src="${school.image}" alt="Instalaciones del ${school.name}" class="school-image" loading="lazy">
                    </div>
                </div>
            `;
            purposeSection.querySelector('.section-content').innerHTML = schoolInfoHTML;
        }
    }

    renderMissionVision() {
        const missionVision = this.aboutData.missionVision;
        if (!missionVision) return;

        const container = document.querySelector('.mission-vision');
        if (!container) return;

        container.innerHTML = `
            <div class="mission-card hover-scale animate-fade-in delay-1" tabindex="0">
                <div class="card-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="currentColor"
                            d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z" />
                    </svg>
                </div>
                <h3>Misión</h3>
                <p>${missionVision.mission}</p>
            </div>

            <div class="vision-card hover-scale animate-fade-in delay-2" tabindex="0">
                <div class="card-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="currentColor"
                            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                </div>
                <h3>Visión</h3>
                <p>${missionVision.vision}</p>
            </div>
        `;
    }

    renderTimelineTabs() {
        const milestones = this.aboutData.milestones;
        if (!milestones || !milestones.length) return;

        const container = document.getElementById('timeline-container');
        if (!container) return;

        // Agrupar hitos por década
        const decades = this.groupMilestonesByDecade(milestones);

        // Crear pestañas de navegación
        const tabsHTML = Object.keys(decades).map(decade => `
            <button class="timeline-tab ${decade === this.currentTimelineTab ? 'active' : ''}" 
                    data-decade="${decade}">
                ${decade}
            </button>
        `).join('');

        // Crear contenedor de contenido
        const contentHTML = Object.entries(decades).map(([decade, items]) => `
            <div class="timeline-content ${decade === this.currentTimelineTab ? 'active' : ''}" 
                 id="timeline-${decade}">
                <div class="timeline-decade">
                    <h3 class="timeline-decade-title">${decade.replace('s', '')}s</h3>
                    <div class="timeline-items">
                        ${items.map(item => `
                            <div class="timeline-item animate-fade-in">
                                <div class="timeline-year">${item.year}</div>
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="timeline-tabs">
                <nav class="timeline-nav">
                    ${tabsHTML}
                </nav>
                <div class="timeline-content-wrapper">
                    ${contentHTML}
                </div>
            </div>
        `;
    }

    groupMilestonesByDecade(milestones) {
        const decades = {};

        milestones.forEach(milestone => {
            const year = parseInt(milestone.year);
            const decade = `${Math.floor(year / 10) * 10}s`;

            if (!decades[decade]) {
                decades[decade] = [];
            }

            decades[decade].push(milestone);
        });

        // Ordenar cada década por año
        Object.keys(decades).forEach(decade => {
            decades[decade].sort((a, b) => parseInt(b.year) - parseInt(a.year));
        });

        return decades;
    }

    showTimelineDecade(decade) {
        // Actualizar pestañas activas
        document.querySelectorAll('.timeline-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.decade === decade);
        });

        // Actualizar contenido activo
        document.querySelectorAll('.timeline-content').forEach(content => {
            content.classList.toggle('active', content.id === `timeline-${decade}`);
        });

        this.currentTimelineTab = decade;
    }

    renderTeamMembers() {
        const team = this.aboutData.team;
        if (!team || !team.length) return;

        const container = document.querySelector('.team-grid');
        if (!container) return;

        container.innerHTML = team.map((member, index) => `
            <div class="team-member hover-scale animate-fade-in delay-${index % 3}" 
                 tabindex="0" data-member-id="${member.id}">
                <div class="member-image">
                    <img src="${member.image}" alt="${member.name}" loading="lazy">
                    <div class="member-overlay">
                        <span>Ver perfil</span>
                    </div>
                </div>
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p class="member-role">${member.role}</p>
                    <p class="member-bio-short">${member.bioShort}</p>
                </div>
            </div>
        `).join('');
    }

    renderValues() {
        const values = this.aboutData.values;
        if (!values || !values.length) return;

        const container = document.querySelector('.values-grid');
        if (!container) return;

        container.innerHTML = values.map((value, index) => `
            <div class="value-card hover-scale animate-fade-in delay-${index % 3}" tabindex="0">
                <div class="value-icon">
                    ${value.icon}
                </div>
                <div>
                    <h3>${value.name}</h3>
                    <p>${value.description}</p>
                </div>
            </div>
        `).join('');
    }

    renderContactInfo() {
        const contact = this.aboutData.contact;
        if (!contact) return;

        const container = document.querySelector('.about-contact-info');
        if (!container) return;

        container.innerHTML = `
            <div class="about-contact-card hover-scale animate-fade-in delay-1" tabindex="0">
                <div class="about-contact-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="currentColor"
                            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                </div>
                <div>
                    <h3>Dirección</h3>
                    <p>${contact.address}</p>
                </div>
            </div>

            <div class="about-contact-card hover-scale animate-fade-in delay-2" tabindex="0">
                <div class="about-contact-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="currentColor"
                            d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                    </svg>
                </div>
                <div>
                    <h3>Teléfono</h3>
                    <p>${contact.phone}</p>
                </div>
            </div>

            <div class="about-contact-card hover-scale animate-fade-in delay-3" tabindex="0">
                <div class="about-contact-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="currentColor"
                            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                </div>
                <div>
                    <h3>Email</h3>
                    <p>${contact.email}</p>
                </div>
            </div>
        `;
    }

    // ======================
    //  MODALES INTERACTIVOS
    // ======================

    setupModal() {
        const modalHTML = `
            <div class="about-modal" id="about-modal">
                <div class="modal-overlay"></div>
                <div class="modal-container">
                    <button class="modal-close" aria-label="Cerrar modal">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                    <div class="modal-content" id="modal-content"></div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('about-modal');

        // Event listeners para el modal
        this.modal.querySelector('.modal-overlay').addEventListener('click', () => this.closeModal());
        this.modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    showTeamMemberModal(memberId) {
        const member = this.aboutData.team.find(m => m.id === memberId);
        if (!member) return;

        const modalContent = `
            <div class="team-modal-content">
                <div class="team-member-image">
                    <img src="${member.image}" alt="${member.name}" loading="lazy">
                </div>
                <div class="team-member-info">
                    <h2>${member.name}</h2>
                    <p class="team-member-role">${member.role}</p>
                    <div class="team-member-bio">
                        <p>${member.bio}</p>
                    </div>
                    ${member.achievements ? `
                        <div class="team-member-achievements">
                            <h3>Logros y Contribuciones</h3>
                            <ul>
                                ${member.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        this.openModal(modalContent);
    }

    openModal(content) {
        document.getElementById('modal-content').innerHTML = content;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus management para accesibilidad
        const focusableElements = this.modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';

        // Devolver el foco al elemento que abrió el modal
        if (this.activeModal) {
            this.activeModal.focus();
        }
    }

    // ======================
    //  ANIMACIONES Y EFECTOS
    // ======================

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');

                    // Animar estadísticas si es el elemento de estadísticas
                    if (entry.target.classList.contains('school-stats')) {
                        this.animateStats();
                    }
                }
            });
        }, observerOptions);

        // Observar todos los elementos con clase animate-fade-in
        document.querySelectorAll('.animate-fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    animateStats() {
        const statElements = document.querySelectorAll('.stat-number');

        statElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);

            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                element.textContent = Math.floor(current);
            }, 16);
        });
    }

    // ======================
    //  EVENT LISTENERS
    // ======================

    setupEventListeners() {
        // Evento para las pestañas del timeline
        document.addEventListener('click', (e) => {
            const timelineTab = e.target.closest('.timeline-tab');
            const teamMember = e.target.closest('.team-member');

            if (timelineTab) {
                e.preventDefault();
                const decade = timelineTab.dataset.decade;
                this.showTimelineDecade(decade);
            } else if (teamMember) {
                e.preventDefault();
                this.activeModal = teamMember;
                const memberId = teamMember.getAttribute('data-member-id');
                this.showTeamMemberModal(memberId);
            }
        });

        // Smooth scrolling para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    destroy() {
        if (this.modal) {
            document.body.removeChild(this.modal);
        }
    }
}

// Inicialización del sistema "Acerca de"
let aboutSystem;

document.addEventListener('DOMContentLoaded', () => {
    try {
        if (typeof aboutData !== 'undefined') {
            aboutSystem = new AboutSystemPremium(aboutData);
            window.aboutSystem = aboutSystem;
        } else {
            console.error('Error: aboutData no está definido');
            this.showErrorMessage();
        }
    } catch (error) {
        console.error('Error al inicializar AboutSystem:', error);
        this.showErrorMessage();
    }
});

// Función para mostrar mensaje de error
function showErrorMessage() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e74c3c" width="48" height="48">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <h3>Error al cargar la información</h3>
        <p>Los datos no están disponibles en este momento</p>
    `;
    document.querySelector('.about-content')?.appendChild(errorDiv);
}