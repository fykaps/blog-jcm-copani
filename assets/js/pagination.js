/**
 * Sistema de paginación avanzado
 * - Soporte para grandes conjuntos de datos
 * - Navegación accesible
 * - Estilos personalizables
 */

class PaginationSystem {
    constructor(options = {}) {
        this.container = options.container || document.getElementById('pagination');
        this.totalItems = options.totalItems || 0;
        this.itemsPerPage = options.itemsPerPage || 10;
        this.currentPage = options.currentPage || 1;
        this.maxVisibleButtons = options.maxVisibleButtons || 5;
        this.onPageChange = options.onPageChange || (() => { });

        this.init();
    }

    init() {
        if (!this.container) return;
        this.render();
        this.setupEventListeners();
    }

    render() {
        const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

        if (totalPages <= 1) {
            this.container.innerHTML = '';
            return;
        }

        let html = '';

        // Botón Anterior
        html += `
            <button class="pagination-button ${this.currentPage === 1 ? 'disabled' : ''}" 
                    data-page="${this.currentPage - 1}" ${this.currentPage === 1 ? 'disabled' : ''}
                    aria-label="Página anterior">
                &lt;
            </button>
        `;

        // Primera página
        if (totalPages > this.maxVisibleButtons && this.currentPage > Math.floor(this.maxVisibleButtons / 2) + 1) {
            html += `
                <button class="pagination-button ${this.currentPage === 1 ? 'active' : ''}" 
                        data-page="1" aria-label="Ir a página 1">
                    1
                </button>
            `;

            if (this.currentPage > Math.floor(this.maxVisibleButtons / 2) + 2) {
                html += `<span class="pagination-ellipsis">...</span>`;
            }
        }

        // Botones de página
        const startPage = Math.max(
            1,
            Math.min(
                this.currentPage - Math.floor(this.maxVisibleButtons / 2),
                totalPages - this.maxVisibleButtons + 1
            )
        );

        const endPage = Math.min(
            totalPages,
            startPage + this.maxVisibleButtons - 1
        );

        for (let i = startPage; i <= endPage; i++) {
            html += `
                <button class="pagination-button ${this.currentPage === i ? 'active' : ''}" 
                        data-page="${i}" aria-label="Ir a página ${i}">
                    ${i}
                </button>
            `;
        }

        // Última página
        if (totalPages > this.maxVisibleButtons && this.currentPage < totalPages - Math.floor(this.maxVisibleButtons / 2)) {
            if (this.currentPage < totalPages - Math.floor(this.maxVisibleButtons / 2) - 1) {
                html += `<span class="pagination-ellipsis">...</span>`;
            }

            html += `
                <button class="pagination-button ${this.currentPage === totalPages ? 'active' : ''}" 
                        data-page="${totalPages}" aria-label="Ir a página ${totalPages}">
                    ${totalPages}
                </button>
            `;
        }

        // Botón Siguiente
        html += `
            <button class="pagination-button ${this.currentPage === totalPages ? 'disabled' : ''}" 
                    data-page="${this.currentPage + 1}" ${this.currentPage === totalPages ? 'disabled' : ''}
                    aria-label="Página siguiente">
                &gt;
            </button>
        `;

        this.container.innerHTML = html;
    }

    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('pagination-button')) {
                e.preventDefault();
                const page = parseInt(e.target.getAttribute('data-page'));
                if (!isNaN(page) && page !== this.currentPage) {
                    this.changePage(page);
                }
            }
        });
    }

    changePage(page) {
        if (page < 1 || page > Math.ceil(this.totalItems / this.itemsPerPage)) return;

        this.currentPage = page;
        this.render();
        this.onPageChange(page);

        // Scroll suave al inicio de los resultados
        const resultsContainer = document.querySelector('.results-container') || window;
        resultsContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    update(options = {}) {
        if (options.totalItems !== undefined) this.totalItems = options.totalItems;
        if (options.itemsPerPage !== undefined) this.itemsPerPage = options.itemsPerPage;
        if (options.currentPage !== undefined) this.currentPage = options.currentPage;
        if (options.maxVisibleButtons !== undefined) this.maxVisibleButtons = options.maxVisibleButtons;
        if (options.onPageChange !== undefined) this.onPageChange = options.onPageChange;

        this.render();
    }
}

// Exportar para uso global
window.PaginationSystem = PaginationSystem;

// Uso básico:
// const pagination = new PaginationSystem({
//     container: document.getElementById('pagination'),
//     totalItems: 100,
//     itemsPerPage: 10,
//     currentPage: 1,
//     onPageChange: (page) => {
//         console.log('Cambió a página:', page);
//         // Aquí cargarías los datos para la nueva página
//     }
// });