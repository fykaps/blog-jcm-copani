/**
 * Sistema de Tienda Escolar - Versión Ecommerce Premium
 * Con modal de productos, filtros, búsqueda y diseño responsive
 */

class ShopSystem {
    constructor(productsData, options = {}) {
        this.products = productsData;
        this.options = {
            productsPerPage: 8,
            ...options
        };
        this.currentFilter = 'all';
        this.currentSort = 'default';
        this.currentSearch = '';
        this.currentPage = 1;
        this.totalPages = 1;
        this.filteredProducts = [];
        this.modal = null;
        this.quickViewModal = null;

        this.init();
    }

    init() {
        this.renderProductsGrid();
        this.setupFilters();
        this.setupSorting();
        this.setupSearch();
        this.setupProductModal();
        this.setupQuickViewModal();
        this.setupCartUI();
        this.setupPagination();
        this.setupWishlistUI();
    }

    // ======================
    //  RENDERIZADO PRINCIPAL
    // ======================

    renderProductsGrid(filter = 'all', sort = 'default', search = '') {
        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid) return;

        // Filtrar productos
        let filtered = [...this.products];

        if (filter !== 'all') {
            filtered = filtered.filter(product => product.category === filter);
        }

        if (search) {
            const searchTerm = search.toLowerCase();
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        // Ordenar productos
        switch (sort) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Orden por defecto: featured primero, luego por ID
                filtered.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return b.id - a.id;
                });
        }

        this.filteredProducts = filtered;
        this.totalPages = Math.ceil(filtered.length / this.options.productsPerPage);

        // Asegurar que la página actual sea válida
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
        }

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

        // Mostrar paginación
        document.getElementById('products-pagination-wrapper').style.display = 'flex';

        // Obtener productos para la página actual
        const startIndex = (this.currentPage - 1) * this.options.productsPerPage;
        const endIndex = startIndex + this.options.productsPerPage;
        const paginatedProducts = filtered.slice(startIndex, endIndex);

        // Renderizar productos
        productsGrid.innerHTML = paginatedProducts.map(product => {
            const isInWishlist = wishlist.isInWishlist(product.id);
            const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

            return `
                <article class="product-card" data-id="${product.id}" data-category="${product.category}">
                    ${product.discount > 0 ? `
                        <div class="product-badge discount">-${discountPercent}%</div>
                    ` : ''}
                    ${product.featured ? `
                        <div class="product-badge featured">Destacado</div>
                    ` : ''}
                    ${product.stock < 10 ? `
                        <div class="product-badge low-stock">Últimas unidades</div>
                    ` : ''}
                    
                    <div class="product-image">
                        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                        <div class="product-actions">
                            <button class="product-action-btn wishlist-btn ${isInWishlist ? 'active' : ''}" 
                                    data-product-id="${product.id}" 
                                    aria-label="${isInWishlist ? 'Eliminar de favoritos' : 'Agregar a favoritos'}">
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                            </button>
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
                        <div class="product-category">${this.getCategoryName(product.category)}</div>
                        
                        <div class="product-rating">
                            <div class="stars">
                                ${this.renderStars(product.rating)}
                            </div>
                            <span class="rating-count">(${product.reviews})</span>
                        </div>
                        
                        <div class="product-price">
                            ${product.discount > 0 ? `
                                <span class="original-price">${PriceUtils.formatPrice(product.originalPrice)}</span>
                            ` : ''}
                            <span class="current-price">${PriceUtils.formatPrice(product.price)}</span>
                        </div>
                        
                        <div class="product-stock">
                            ${product.stock > 0 ?
                    `<span class="in-stock">${product.stock} en stock</span>` :
                    `<span class="out-of-stock">Agotado</span>`
                }
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        // Configurar event listeners para los productos
        this.setupProductCardInteractions();

        // Renderizar paginación
        this.renderPagination();
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let starsHTML = '';

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                starsHTML += '<span class="star full">★</span>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                starsHTML += '<span class="star half">★</span>';
            } else {
                starsHTML += '<span class="star empty">★</span>';
            }
        }

        return starsHTML;
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

    // ======================
    //  PAGINACIÓN
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

        let html = `
            <button class="pagination-button ${this.currentPage === 1 ? 'disabled' : ''}" 
                    onclick="shopSystem.changePage(${this.currentPage - 1})" ${this.currentPage === 1 ? 'disabled' : ''}>
                &lt;
            </button>
        `;

        // Mostrar siempre la primera página
        html += `
            <button class="pagination-button ${this.currentPage === 1 ? 'active' : ''}" 
                    onclick="shopSystem.changePage(1)">
                1
            </button>
        `;

        // Mostrar puntos suspensivos si hay muchas páginas
        if (this.totalPages > 5 && this.currentPage > 3) {
            html += `<span class="pagination-ellipsis">...</span>`;
        }

        // Mostrar páginas alrededor de la actual
        const startPage = Math.max(2, this.currentPage - 1);
        const endPage = Math.min(this.totalPages - 1, this.currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            if (i > 1 && i < this.totalPages) {
                html += `
                    <button class="pagination-button ${this.currentPage === i ? 'active' : ''}" 
                            onclick="shopSystem.changePage(${i})">
                        ${i}
                    </button>
                `;
            }
        }

        // Mostrar puntos suspensivos si hay muchas páginas
        if (this.totalPages > 5 && this.currentPage < this.totalPages - 2) {
            html += `<span class="pagination-ellipsis">...</span>`;
        }

        // Mostrar siempre la última página
        if (this.totalPages > 1) {
            html += `
                <button class="pagination-button ${this.currentPage === this.totalPages ? 'active' : ''}" 
                        onclick="shopSystem.changePage(${this.totalPages})">
                    ${this.totalPages}
                </button>
            `;
        }

        html += `
            <button class="pagination-button ${this.currentPage === this.totalPages ? 'disabled' : ''}" 
                    onclick="shopSystem.changePage(${this.currentPage + 1})" ${this.currentPage === this.totalPages ? 'disabled' : ''}>
                &gt;
            </button>
        `;

        paginationContainer.innerHTML = html;
    }

    changePage(page) {
        if (page < 1 || page > this.totalPages) return;
        this.currentPage = page;
        this.renderProductsGrid(this.currentFilter, this.currentSort, this.currentSearch);
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
                this.renderProductsGrid(this.currentFilter, this.currentSort, this.currentSearch);
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

                this.renderProductsGrid(this.currentFilter, this.currentSort, this.currentSearch);
            });
        });
    }

    setupSorting() {
        const sortSelect = document.getElementById('sort-products');
        if (!sortSelect) return;

        sortSelect.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.currentPage = 1;
            this.renderProductsGrid(this.currentFilter, this.currentSort, this.currentSearch);
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('search-products');
        const searchButton = document.getElementById('search-button');

        if (searchInput && searchButton) {
            const performSearch = () => {
                this.currentSearch = searchInput.value.trim();
                this.currentPage = 1;
                this.renderProductsGrid(this.currentFilter, this.currentSort, this.currentSearch);
            };

            searchButton.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
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

        this.renderProductsGrid('all', 'default', '');
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

    setupQuickViewModal() {
        const modalHTML = `
            <div class="quick-view-modal" id="quick-view-modal">
                <div class="quick-view-content">
                    <button class="modal-close" aria-label="Cerrar modal">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                    <div class="quick-view-body" id="quick-view-body"></div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.quickViewModal = document.getElementById('quick-view-modal');

        document.querySelector('.quick-view-modal .modal-close').addEventListener('click', () => this.closeQuickViewModal());
        this.quickViewModal.addEventListener('click', (e) => {
            if (e.target === this.quickViewModal) {
                this.closeQuickViewModal();
            }
        });
    }

    showProductModal(productId) {
        const product = this.products.find(p => p.id == productId);
        if (!product) return;

        const isInWishlist = wishlist.isInWishlist(product.id);
        const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

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
                    <span class="product-sku">SKU: ${product.id.toString().padStart(4, '0')}</span>
                </div>

                <div class="product-rating-large">
                    <div class="stars">
                        ${this.renderStars(product.rating)}
                    </div>
                    <span class="rating-value">${product.rating}/5</span>
                    <span class="review-count">(${product.reviews} reseñas)</span>
                </div>

                <div class="product-price-large">
                    ${product.discount > 0 ? `
                        <div class="discount-badge">-${discountPercent}%</div>
                        <span class="original-price">${PriceUtils.formatPrice(product.originalPrice)}</span>
                    ` : ''}
                    <span class="current-price">${PriceUtils.formatPrice(product.price)}</span>
                </div>

                <div class="product-description">
                    <h3>Descripción</h3>
                    <p>${product.description}</p>
                </div>

                <div class="product-features">
                    <h3>Características</h3>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>

                <div class="product-options">
                    <div class="option-group">
                        <label>Talla:</label>
                        <div class="size-options">
                            ${product.sizes.map(size => `
                                <label class="size-option">
                                    <input type="radio" name="product-size" value="${size}" ${size === product.sizes[0] ? 'checked' : ''}>
                                    <span>${size}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="option-group">
                        <label>Color:</label>
                        <div class="color-options">
                            ${product.colors.map(color => `
                                <label class="color-option">
                                    <input type="radio" name="product-color" value="${color}" ${color === product.colors[0] ? 'checked' : ''}>
                                    <span style="background-color: ${this.getColorValue(color)}" title="${color}"></span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="option-group">
                        <label>Cantidad:</label>
                        <div class="quantity-selector">
                            <button class="quantity-btn minus">-</button>
                            <input type="number" name="quantity" value="1" min="1" max="${product.stock}">
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <span class="stock-info">${product.stock} disponibles</span>
                    </div>
                </div>

                <div class="product-actions-modal">
                    <button class="add-to-cart-btn primary" data-product-id="${product.id}">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                        Agregar al carrito
                    </button>
                    
                    <button class="wishlist-btn-modal ${isInWishlist ? 'active' : ''}" data-product-id="${product.id}">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>
                </div>

                <div class="product-guarantee">
                    <div class="guarantee-item">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                        </svg>
                        <span>Garantía de calidad</span>
                    </div>
                    <div class="guarantee-item">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span>Devoluciones en 30 días</span>
                    </div>
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

    showQuickViewModal(productId) {
        const product = this.products.find(p => p.id == productId);
        if (!product) return;

        const isInWishlist = wishlist.isInWishlist(product.id);

        const quickViewContent = `
            <div class="quick-view-image">
                <img src="${product.images[0]}" alt="${product.name}">
            </div>
            <div class="quick-view-info">
                <h3>${product.name}</h3>
                <div class="quick-view-price">
                    ${PriceUtils.formatPrice(product.price)}
                    ${product.originalPrice > product.price ? `
                        <span class="quick-view-original-price">${PriceUtils.formatPrice(product.originalPrice)}</span>
                    ` : ''}
                </div>
                <div class="quick-view-rating">
                    ${this.renderStars(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
                <p class="quick-view-description">${product.description.substring(0, 100)}...</p>
                <div class="quick-view-actions">
                    <button class="btn btn-sm view-details-btn" data-product-id="${product.id}">Ver detalles</button>
                    <button class="btn btn-sm add-to-cart-quick" data-product-id="${product.id}">Agregar al carrito</button>
                </div>
            </div>
        `;

        document.getElementById('quick-view-body').innerHTML = quickViewContent;

        // Configurar event listeners
        document.querySelector('.view-details-btn').addEventListener('click', () => {
            this.closeQuickViewModal();
            this.showProductModal(product.id);
        });

        document.querySelector('.add-to-cart-quick').addEventListener('click', () => {
            const defaultSize = product.sizes[0];
            const defaultColor = product.colors[0];

            if (shoppingCart.addToCart(product, defaultSize, defaultColor, 1)) {
                this.showAddToCartNotification(product);
                this.closeQuickViewModal();
            }
        });

        // Mostrar el modal
        this.quickViewModal.classList.add('active');
    }

    closeProductModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';

        setTimeout(() => {
            document.getElementById('product-modal-body').innerHTML = '';
        }, 300);
    }

    closeQuickViewModal() {
        this.quickViewModal.classList.remove('active');
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

        // Selector de cantidad
        const quantityInput = document.querySelector('input[name="quantity"]');
        document.querySelector('.quantity-btn.minus').addEventListener('click', () => {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });

        document.querySelector('.quantity-btn.plus').addEventListener('click', () => {
            if (quantityInput.value < product.stock) {
                quantityInput.value = parseInt(quantityInput.value) + 1;
            }
        });

        // Botón de agregar al carrito
        document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            const selectedSize = document.querySelector('input[name="product-size"]:checked').value;
            const selectedColor = document.querySelector('input[name="product-color"]:checked').value;
            const quantity = parseInt(quantityInput.value);

            if (shoppingCart.addToCart(product, selectedSize, selectedColor, quantity)) {
                this.showAddToCartNotification(product);
                this.closeProductModal();
            }
        });

        // Botón de wishlist
        const wishlistBtn = document.querySelector('.wishlist-btn-modal');
        wishlistBtn.addEventListener('click', () => {
            if (wishlist.isInWishlist(product.id)) {
                wishlist.removeFromWishlist(product.id);
                wishlistBtn.classList.remove('active');
            } else {
                wishlist.addToWishlist(product.id);
                wishlistBtn.classList.add('active');
            }
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
            const wishlistBtn = e.target.closest('.wishlist-btn');
            const quickViewBtn = e.target.closest('.quick-view-btn');
            const productCard = e.target.closest('.product-card');

            if (viewDetailsBtn) {
                const productId = viewDetailsBtn.getAttribute('data-product-id');
                this.showProductModal(productId);
            } else if (wishlistBtn) {
                const productId = wishlistBtn.getAttribute('data-product-id');
                if (wishlist.isInWishlist(productId)) {
                    wishlist.removeFromWishlist(productId);
                    wishlistBtn.classList.remove('active');
                } else {
                    wishlist.addToWishlist(productId);
                    wishlistBtn.classList.add('active');
                }
            } else if (quickViewBtn) {
                const productId = quickViewBtn.getAttribute('data-product-id');
                this.showQuickViewModal(productId);
            } else if (productCard && !wishlistBtn && !quickViewBtn) {
                const productId = productCard.getAttribute('data-id');
                this.showProductModal(productId);
            }
        });
    }

    setupCartUI() {
        // Actualizar contador del carrito
        shoppingCart.onUpdate((cart, total) => {
            const cartCount = document.getElementById('cart-count');
            if (cartCount) {
                const totalItems = shoppingCart.getTotalItems();
                cartCount.textContent = totalItems;
                cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
            }
        });

        // Inicializar contador
        const initialCount = shoppingCart.getTotalItems();
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = initialCount;
            cartCount.style.display = initialCount > 0 ? 'flex' : 'none';
        }
    }

    setupWishlistUI() {
        // Actualizar contador de wishlist
        const updateWishlistCount = () => {
            const wishlistCount = document.getElementById('wishlist-count');
            if (wishlistCount) {
                const count = wishlist.items.length;
                wishlistCount.textContent = count;
                wishlistCount.style.display = count > 0 ? 'flex' : 'none';
            }
        };

        // Inicializar contador
        updateWishlistCount();
    }

    showAddToCartNotification(product) {
        // Crear notificación toast
        const notification = document.createElement('div');
        notification.className = 'add-to-cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <div class="notification-text">
                    <strong>¡Producto agregado!</strong>
                    <span>${product.name} se añadió al carrito</span>
                </div>
                <button class="notification-close">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Mostrar animación
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);

        // Cerrar manualmente
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }

    destroy() {
        if (this.modal && this.modal.parentNode) {
            this.modal.parentNode.removeChild(this.modal);
        }
        if (this.quickViewModal && this.quickViewModal.parentNode) {
            this.quickViewModal.parentNode.removeChild(this.quickViewModal);
        }
    }
}

// Inicialización del sistema de tienda
let shopSystem;

document.addEventListener('DOMContentLoaded', () => {
    try {
        if (typeof productsData !== 'undefined') {
            shopSystem = new ShopSystem(productsData, {
                productsPerPage: 8
            });
            window.shopSystem = shopSystem;
        } else {
            console.error('Error: productsData no está definido');
            this.showErrorMessage('Error al cargar los productos');
        }
    } catch (error) {
        console.error('Error al inicializar ShopSystem:', error);
        this.showErrorMessage('Error al cargar la tienda');
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