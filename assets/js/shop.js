/**
 * Sistema de Tienda Escolar - Versión Profesional con Paginación Mejorada
 * Con modal de productos, filtros, búsqueda y diseño responsive
 */

class ShopSystem {
    constructor(productsData, options = {}) {
        this.products = productsData;
        this.options = {
            productsPerPage: 8,
            maxPaginationButtons: 5,
            ...options
        };
        this.currentFilter = 'all';
        this.currentSort = 'default';
        this.currentSearch = '';
        this.currentPage = 1;
        this.totalPages = 1;
        this.filteredProducts = [];
        this.modal = null;

        this.init();
    }

    init() {
        this.renderProductsGrid();
        this.setupFilters();
        this.setupSorting();
        this.setupSearch();
        this.setupItemsPerPageSelector();
        this.setupProductModal();
        this.setupPagination();
    }

    // ======================
    //  RENDERIZADO PRINCIPAL
    // ======================

    renderProductsGrid() {
        const productsGrid = document.getElementById('products-grid');
        const resultsInfo = document.getElementById('results-info');
        if (!productsGrid || !resultsInfo) return;

        // Filtrar productos
        let filtered = [...this.products];

        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(product => product.category === this.currentFilter);
        }

        if (this.currentSearch) {
            const searchTerm = this.currentSearch.toLowerCase();
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
            );
        }

        // Ordenar productos
        switch (this.currentSort) {
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                // Orden por defecto: por ID
                filtered.sort((a, b) => b.id - a.id);
        }

        this.filteredProducts = filtered;
        this.totalPages = Math.ceil(filtered.length / this.options.productsPerPage);

        // Asegurar que la página actual sea válida
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
        }

        // Actualizar información de resultados
        this.updateResultsInfo(filtered.length);

        // Mostrar mensaje si no hay productos
        if (filtered.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <svg width="64" height="64" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                    <h3>No se encontraron productos</h3>
                    <p>Intenta con otros filtros o términos de búsqueda.</p>
                    <button class="reset-filters">Mostrar todos los productos</button>
                </div>
            `;

            document.querySelector('.reset-filters')?.addEventListener('click', () => {
                this.resetFilters();
            });

            document.getElementById('products-pagination-wrapper').style.display = 'none';
            return;
        }

        // Mostrar u ocultar paginación según sea necesario
        const paginationWrapper = document.getElementById('products-pagination-wrapper');
        if (this.totalPages > 1) {
            paginationWrapper.style.display = 'flex';
        } else {
            paginationWrapper.style.display = 'none';
        }

        // Obtener productos para la página actual
        const startIndex = (this.currentPage - 1) * this.options.productsPerPage;
        const endIndex = startIndex + this.options.productsPerPage;
        const paginatedProducts = filtered.slice(startIndex, endIndex);

        // Renderizar productos
        productsGrid.innerHTML = paginatedProducts.map(product => {
            return `
                <article class="product-card" data-id="${product.id}" data-category="${product.category}">
                    
                    <div class="product-image">
                        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                        <div class="product-actions">
                            <button class="product-action-btn quick-view-btn" 
                                    data-product-id="${product.id}" 
                                    aria-label="Vista rápida">
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                                </svg>
                            </button>
                        </div>
                        <button class="product-view-details" data-product-id="${product.id}">
                            Ver detalles
                        </button>
                    </div>
                    
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <span class="product-category">${this.getCategoryName(product.category)}</span>
                        
                        ${product.colors && product.colors.length > 0 ? `
                        <div class="product-colors">
                            ${product.colors.map(color => `
                                <div class="color-swatch" data-color="${color}">
                                    <span class="color-tooltip">${color}</span>
                                </div>
                            `).join('')}
                        </div>
                        ` : ''}
                        
                        <p class="product-description">${product.description}</p>
                        
                        <button class="product-contact-btn" data-product-id="${product.id}">
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                            </svg>
                            Contactar para información
                        </button>
                    </div>
                </article>
            `;
        }).join('');

        // Configurar event listeners para los productos
        this.setupProductCardInteractions();

        // Renderizar paginación
        this.renderPagination();
    }

    updateResultsInfo(totalProducts) {
        const resultsInfo = document.getElementById('results-info');
        if (!resultsInfo) return;

        const startIndex = (this.currentPage - 1) * this.options.productsPerPage + 1;
        const endIndex = Math.min(startIndex + this.options.productsPerPage - 1, totalProducts);

        if (totalProducts === 0) {
            resultsInfo.innerHTML = '<p>No se encontraron productos</p>';
        } else if (totalProducts <= this.options.productsPerPage) {
            resultsInfo.innerHTML = `<p>Mostrando ${totalProducts} producto${totalProducts !== 1 ? 's' : ''}</p>`;
        } else {
            resultsInfo.innerHTML = `<p>Mostrando ${startIndex}-${endIndex} de ${totalProducts} producto${totalProducts !== 1 ? 's' : ''}</p>`;
        }
    }

    // ======================
    //  PAGINACIÓN MEJORADA
    // ======================

    setupPagination() {
        this.renderPagination();
    }

    renderPagination() {
        const paginationContainer = document.getElementById('products-pagination');
        if (!paginationContainer || this.totalPages <= 1) {
            if (paginationContainer) paginationContainer.innerHTML = '';
            return;
        }

        let html = '';

        // Botón Anterior
        html += `
            <button class="pagination-button ${this.currentPage === 1 ? 'disabled' : ''}" 
                    onclick="shopSystem.changePage(${this.currentPage - 1})" ${this.currentPage === 1 ? 'disabled' : ''}>
                &lt; Anterior
            </button>
        `;

        // Calcular rango de páginas a mostrar
        let startPage = Math.max(1, this.currentPage - Math.floor(this.options.maxPaginationButtons / 2));
        let endPage = Math.min(this.totalPages, startPage + this.options.maxPaginationButtons - 1);

        // Ajustar si estamos cerca del final
        if (endPage - startPage + 1 < this.options.maxPaginationButtons) {
            startPage = Math.max(1, endPage - this.options.maxPaginationButtons + 1);
        }

        // Primera página y elipsis si es necesario
        if (startPage > 1) {
            html += `
                <button class="pagination-button ${this.currentPage === 1 ? 'active' : ''}" 
                        onclick="shopSystem.changePage(1)">
                    1
                </button>
            `;
            if (startPage > 2) {
                html += `<span class="pagination-ellipsis">...</span>`;
            }
        }

        // Páginas numeradas
        for (let i = startPage; i <= endPage; i++) {
            html += `
                <button class="pagination-button ${this.currentPage === i ? 'active' : ''}" 
                        onclick="shopSystem.changePage(${i})">
                    ${i}
                </button>
            `;
        }

        // Última página y elipsis si es necesario
        if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) {
                html += `<span class="pagination-ellipsis">...</span>`;
            }
            html += `
                <button class="pagination-button ${this.currentPage === this.totalPages ? 'active' : ''}" 
                        onclick="shopSystem.changePage(${this.totalPages})">
                    ${this.totalPages}
                </button>
            `;
        }

        // Botón Siguiente
        html += `
            <button class="pagination-button ${this.currentPage === this.totalPages ? 'disabled' : ''}" 
                    onclick="shopSystem.changePage(${this.currentPage + 1})" ${this.currentPage === this.totalPages ? 'disabled' : ''}>
                Siguiente &gt;
            </button>
        `;

        paginationContainer.innerHTML = html;
    }

    changePage(page) {
        if (page < 1 || page > this.totalPages) return;
        this.currentPage = page;
        this.renderProductsGrid();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ======================
    //  FILTROS Y ORDENAMIENTO
    // ======================

    setupFilters() {
        // Filtros principales
        document.querySelectorAll('.shop-filters .filter-button').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.shop-filters .filter-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');

                this.currentFilter = button.getAttribute('data-filter');
                this.currentPage = 1;
                this.renderProductsGrid();
            });
        });

        // Filtros de categorías en sidebar
        document.querySelectorAll('.category-filter').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const filter = button.getAttribute('data-filter');
                this.currentFilter = filter;
                this.currentPage = 1;

                document.querySelectorAll('.filter-button, .category-filter').forEach(btn => {
                    btn.classList.remove('active');
                });

                document.querySelector(`.filter-button[data-filter="${filter}"]`)?.classList.add('active');
                button.classList.add('active');

                this.renderProductsGrid();
            });
        });
    }

    setupSorting() {
        const sortSelect = document.getElementById('sort-products');
        if (!sortSelect) return;

        sortSelect.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.currentPage = 1;
            this.renderProductsGrid();
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('search-products');
        const searchButton = document.getElementById('search-button');

        if (searchInput && searchButton) {
            const performSearch = () => {
                this.currentSearch = searchInput.value.trim();
                this.currentPage = 1;
                this.renderProductsGrid();
            };

            searchButton.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    }

    setupItemsPerPageSelector() {
        const itemsPerPageSelect = document.getElementById('items-per-page');
        if (!itemsPerPageSelect) return;

        itemsPerPageSelect.value = this.options.productsPerPage;

        itemsPerPageSelect.addEventListener('change', (e) => {
            this.options.productsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderProductsGrid();
        });
    }

    resetFilters() {
        this.currentFilter = 'all';
        this.currentSort = 'default';
        this.currentSearch = '';
        this.currentPage = 1;

        document.querySelectorAll('.filter-button.active, .category-filter.active').forEach(el => {
            el.classList.remove('active');
        });
        document.querySelector('.filter-button[data-filter="all"]').classList.add('active');

        const sortSelect = document.getElementById('sort-products');
        if (sortSelect) sortSelect.value = 'default';

        const searchInput = document.getElementById('search-products');
        if (searchInput) searchInput.value = '';

        this.renderProductsGrid();
    }

    // ======================
    //  MODALES DE PRODUCTOS
    // ======================

    setupProductModal() {
        const modalHTML = `
            <div class="product-modal" id="product-modal">
                <div class="product-modal-content">
                    <button class="modal-close" aria-label="Cerrar modal">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                    <div class="product-modal-body" id="product-modal-body"></div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('product-modal');

        document.querySelector('.product-modal .modal-close').addEventListener('click', () => this.closeProductModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeProductModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeProductModal();
            }
        });
    }

    showProductModal(productId) {
        const product = this.products.find(p => p.id == productId);
        if (!product) return;

        const modalContent = `
            <div class="product-modal-gallery">
                <div class="main-image">
                    <img src="${product.images[0]}" alt="${product.name}" id="modal-main-image">
                </div>
                <div class="thumbnail-images">
                    ${product.images.map((image, index) => `
                        <img src="${image}" alt="Vista ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" 
                             data-image="${image}">
                    `).join('')}
                </div>
            </div>

            <div class="product-modal-details">
                <h1>${product.name}</h1>
                
                <div class="product-meta">
                    <span class="product-category">${this.getCategoryName(product.category)}</span>
                </div>

                <div class="product-description">
                    <h3>Descripción</h3>
                    <p>${product.description}</p>
                </div>

                ${product.features && product.features.length > 0 ? `
                <div class="product-features">
                    <h3>Características</h3>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                ${product.sizes && product.sizes.length > 0 ? `
                <div class="product-options">
                    <div class="option-group">
                        <label>Tallas disponibles:</label>
                        <div class="size-options">
                            ${product.sizes.map(size => `
                                <span class="size-option">${size}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
                ` : ''}

                ${product.colors && product.colors.length > 0 ? `
                <div class="product-options">
                    <div class="option-group">
                        <label>Colores disponibles:</label>
                        <div class="color-options">
                            ${product.colors.map(color => `
                                <span class="color-option" style="background-color: ${this.getColorValue(color)}" title="${color}"></span>
                            `).join('')}
                        </div>
                    </div>
                </div>
                ` : ''}

                <div class="contact-info-modal">
                    <h4>¿Te interesa este producto?</h4>
                    <p>Contacta con la institución para más información sobre disponibilidad y proceso de adquisición.</p>
                    
                    <div class="contact-details">
                        <div class="contact-item">
                            <svg width="16" height="16" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                            </svg>
                            <span>(123) 456-7890</span>
                        </div>
                        <div class="contact-item">
                            <svg width="16" height="16" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                            <span>contacto@colegio.edu</span>
                        </div>
                        <div class="contact-item">
                            <svg width="16" height="16" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            <span>Calle Principal 123, Ciudad</span>
                        </div>
                    </div>

                    <button class="contact-button" onclick="window.location.href='contact.html'">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                        </svg>
                        Contactar ahora
                    </button>
                </div>
            </div>
        `;

        document.getElementById('product-modal-body').innerHTML = modalContent;

        // Configurar interacciones del modal
        this.setupModalInteractions(product);

        // Mostrar el modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeProductModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';

        setTimeout(() => {
            document.getElementById('product-modal-body').innerHTML = '';
        }, 300);
    }

    setupModalInteractions(product) {
        // Cambiar imagen principal al hacer clic en miniaturas
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.addEventListener('click', () => {
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                document.getElementById('modal-main-image').src = thumb.getAttribute('data-image');
            });
        });
    }

    getColorValue(colorName) {
        const colorMap = {
            'Azul marino': '#003366',
            'Azul oscuro': '#000080',
            'Negro': '#000000',
            'Gris': '#808080',
            'Gris oscuro': '#404040',
            'Gris claro': '#D3D3D3',
            'Bordeaux': '#800020',
            'Blanco': '#FFFFFF',
            'Beige': '#F5F5DC'
        };
        return colorMap[colorName] || '#CCCCCC';
    }

    // ======================
    //  INTERACCIONES DE UI
    // ======================

    setupProductCardInteractions() {
        document.addEventListener('click', (e) => {
            const viewDetailsBtn = e.target.closest('.product-view-details');
            const contactBtn = e.target.closest('.product-contact-btn');
            const quickViewBtn = e.target.closest('.quick-view-btn');
            const productCard = e.target.closest('.product-card');

            if (viewDetailsBtn) {
                const productId = viewDetailsBtn.getAttribute('data-product-id');
                this.showProductModal(productId);
            } else if (contactBtn) {
                const productId = contactBtn.getAttribute('data-product-id');
                this.showProductModal(productId);
            } else if (quickViewBtn) {
                const productId = quickViewBtn.getAttribute('data-product-id');
                this.showProductModal(productId);
            } else if (productCard) {
                const productId = productCard.getAttribute('data-id');
                this.showProductModal(productId);
            }
        });
    }

    getCategoryName(category) {
        const categories = {
            'uniforme': 'Uniforme',
            'chompa': 'Chompa',
            'falda': 'Falda',
            'sombrero': 'Sombrero',
            'combo': 'Combo'
        };
        return categories[category] || category;
    }

    destroy() {
        if (this.modal && this.modal.parentNode) {
            this.modal.parentNode.removeChild(this.modal);
        }
    }
}

// Inicialización del sistema de tienda
let shopSystem;

document.addEventListener('DOMContentLoaded', () => {
    try {
        if (typeof productsData !== 'undefined') {
            shopSystem = new ShopSystem(productsData, {
                productsPerPage: 8,
                maxPaginationButtons: 5
            });
            window.shopSystem = shopSystem;
        } else {
            console.error('Error: productsData no está definido');
            showErrorMessage('Error al cargar los productos');
        }
    } catch (error) {
        console.error('Error al inicializar ShopSystem:', error);
        showErrorMessage('Error al cargar la tienda');
    }
});

// Mostrar mensaje de error
function showErrorMessage(message) {
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        productsGrid.innerHTML = `
            <div class="error-message">
                <svg width="48" height="48" viewBox="0 0 24 24">
                    <path fill="#e74c3c" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
    }
}