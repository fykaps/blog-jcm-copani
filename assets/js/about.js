
class AboutManager {
    constructor() {
        this.aboutData = null;
        this.initialized = false;
        this.modal = null;
    }

    init() {
        if (this.initialized) return;

        this.loadAboutData();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.initModal();

        this.initialized = true;
    }

    initModal() {
        // Crear estructura del modal
        this.modal = document.createElement('div');
        this.modal.className = 'modal';
        this.modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-container">
                <button class="modal-close" aria-label="Cerrar modal">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
                <div class="modal-content" id="modal-content"></div>
            </div>
        `;
        document.body.appendChild(this.modal);

        // Event listeners para el modal
        this.modal.querySelector('.modal-overlay').addEventListener('click', () => this.closeModal());
        this.modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
    }

    openModal(content) {
        document.getElementById('modal-content').innerHTML = content;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    loadAboutData() {
        this.aboutData = window.aboutData || {};
        this.renderAboutContent();
    }

    renderAboutContent() {
        if (!this.aboutData) return;

        // Renderizar información del colegio
        this.renderSchoolInfo();

        // Renderizar sección de la creadora con botón modal
        this.renderCreatorSection();

        // Renderizar sección de colaboradores
        this.renderCollaboratorsSection();

        // Renderizar línea de tiempo responsive
        this.renderTimeline();

        // Resto de secciones
        this.renderTeamSection();
        this.renderValuesSection();
    }

    renderSchoolInfo() {
        const school = this.aboutData.schoolInfo;
        if (!school) return;

        const purposeSection = document.getElementById('purpose-section');
        if (purposeSection) {
            const schoolInfoHTML = `
                <div class="school-info-container">
                    <div class="school-logo-container">
                        <img src="${school.logo}" alt="${school.name}" class="school-logo">
                    </div>
                    <div class="school-details">
                        <h3>${school.name}</h3>
                        <p class="school-motto">"${school.motto}"</p>
                        <p class="school-description">${school.description}</p>
                        <div class="school-meta">
                            <p><strong>Fundado:</strong> ${school.founded}</p>
                            <p><strong>Director:</strong> ${school.director}</p>
                        </div>
                    </div>
                    <div class="school-image-container">
                        <img src="${school.image}" alt="Instalaciones del ${school.name}" class="school-image">
                    </div>
                </div>
            `;
            purposeSection.querySelector('.section-content').insertAdjacentHTML('afterbegin', schoolInfoHTML);
        }
    }

    renderCreatorSection() {
        const creator = this.aboutData.creator;
        if (!creator) return;

        const section = document.createElement('section');
        section.className = 'about-section creator-section animate-fade-in';
        section.id = 'creator-section';

        section.innerHTML = `
            <div class="section-header">
                <h2>La Creadora</h2>
                <div class="section-divider"></div>
            </div>
            <div class="creator-content">
                <button class="creator-button" id="creator-button">
                    <div class="creator-avatar">
                        <img src="${creator.image}" alt="${creator.name}" loading="lazy">
                    </div>
                    <span>Conoce a la creadora</span>
                </button>
                <p class="creator-short-bio">${creator.shortBio}</p>
            </div>
        `;

        const aboutContent = document.querySelector('.about-content');
        if (aboutContent) {
            aboutContent.insertBefore(section, aboutContent.children[3]);
        }

        // Event listener para el botón del modal
        document.getElementById('creator-button')?.addEventListener('click', () => {
            this.openModal(creator.modalContent);
        });
    }

    renderCollaboratorsSection() {
        const collaborators = this.aboutData.collaborators;
        if (!collaborators || !collaborators.length) return;

        const section = document.createElement('section');
        section.className = 'about-section collaborators-section animate-fade-in';
        section.id = 'collaborators-section';

        section.innerHTML = `
            <div class="section-header">
                <h2>Nuestros Colaboradores</h2>
                <div class="section-divider"></div>
            </div>
            <div class="collaborators-grid" id="collaborators-container"></div>
        `;

        const aboutContent = document.querySelector('.about-content');
        if (aboutContent) {
            aboutContent.insertBefore(section, aboutContent.querySelector('#team-section'));
        }

        const container = document.getElementById('collaborators-container');
        if (container) {
            container.innerHTML = collaborators.map(collab => `
                <div class="collaborator-card">
                    <div class="collaborator-avatar">
                        <img src="${collab.avatar}" alt="${collab.name}" loading="lazy">
                    </div>
                    <h3 class="collaborator-name">${collab.name}</h3>
                    <p class="collaborator-grade">${collab.grade}</p>
                </div>
            `).join('');
        }
    }

    renderTimeline() {
        const milestones = this.aboutData.milestones;
        if (!milestones || !milestones.length) return;

        const container = document.getElementById('timeline-container');
        if (!container) return;

        // Versión mobile (sin líneas)
        const mobileTimeline = milestones.map(item => `
            <div class="timeline-mobile-item">
                <div class="timeline-mobile-year">${item.year}</div>
                <div class="timeline-mobile-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');

        // Versión desktop (con líneas)
        const desktopTimeline = milestones.map((item, index) => `
            <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="timeline-desktop">
                ${desktopTimeline}
            </div>
            <div class="timeline-mobile">
                ${mobileTimeline}
            </div>
        `;
    }
}

// Instanciar y exportar el manager
const aboutManager = new AboutManager();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => aboutManager.init());