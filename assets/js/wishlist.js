/**
 * Sistema de Lista de Deseos - Página de Wishlist
 * Gestión completa de la lista de deseos con funcionalidades avanzadas
 */

class WishlistPage {
    constructor() {
        this.wishlist = wishlist;
        this.init();
    }

    init() {
        this.renderWishlist();
        this.setupEventListeners();
        this.loadRecommendedProducts();
    }

    renderWishlist() {
        const wishlistItems = this.wishlist.getWishlistProducts();
        const container = document.getElementById('wishlist-items-container');
        const emptyWishlist = document.getElementById('empty-wishlist');
        const itemsCount = document.getElementById('wishlist-items-count');

        // Actualizar contador
        itemsCount.textContent = wishlistItems.length;

        // Mostrar/ocultar lista vacía
        if (wishlistItems.length === 0) {
            container.style.display = 'none';
            emptyWishlist.style.display = 'block';
            return;
        }

        container.style.display = 'grid';
        emptyWishlist.style.display = 'none';

        // Renderizar items de la lista de deseos
        container.innerHTML = wishlistItems.map(product => {
            const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

            return `
                <div class="wishlist-item" data-product-id="${product.id}">
                    <button class="wishlist-item-remove" onclick="wishlistPage.removeFromWishlist(${product.id})" 
                            aria-label="Eliminar de la lista de deseos">
                        <svg width="16" height="16" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>

                    <div class="wishlist-item-image">
                        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                    </div>

                    <div class="wishlist-item-info">
                        <h3 class="wishlist-item-name">${product.name}</h3>
                        <div class="wishlist-item-category">${this.getCategoryName(product.category)}</div>
                        
                        <div class="wishlist-item-price">
                            <span class="current-price">${PriceUtils.formatPrice(product.price)}</span>
                            ${product.originalPrice > product.price ? `
                                <span class="original-price">${PriceUtils.formatPrice(product.originalPrice)}</span>
                                <span class="discount-badge">-${discountPercent}%</span>
                            ` : ''}
                        </div>

                        <div class="wishlist-item-rating">
                            <div class="stars">
                                ${this.renderStars(product.rating)}
                            </div>
                            <span class="rating-count">(${product.reviews})</span>
                        </div>

                        <div class="wishlist-item-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                            ${product.stock > 0 ?
                    `${product.stock} disponibles en stock` :
                    'Producto agotado'
                }
                        </div>

                        <div class="wishlist-item-actions">
                            <button class="btn-add-to-cart" onclick="wishlistPage.addToCart(${product.id})" 
                                    ${product.stock === 0 ? 'disabled' : ''}>
                                <svg width="16" height="16" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1z"/>
                                </svg>
                                Agregar al carrito
                            </button>
                            <button class="btn-view-details" onclick="wishlistPage.viewDetails(${product.id})">
                                <svg width="16" height="16" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                                </svg>
                                Ver detalles
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
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

    removeFromWishlist(productId) {
        if (this.wishlist.removeFromWishlist(productId)) {
            this.renderWishlist();
            this.showNotification('Producto eliminado de la lista de deseos', 'success');
        }
    }

    clearWishlist() {
        if (this.wishlist.items.length === 0) {
            this.showNotification('La lista de deseos ya está vacía', 'info');
            return;
        }

        if (confirm('¿Estás seguro de que quieres vaciar toda tu lista de deseos?')) {
            this.wishlist.items = [];
            this.wishlist.saveWishlist();
            this.renderWishlist();
            this.showNotification('Lista de deseos vaciada', 'success');
        }
    }

    addToCart(productId) {
        const product = productsData.find(p => p.id === productId);
        if (!product) return;

        const defaultSize = product.sizes[0];
        const defaultColor = product.colors[0];

        if (shoppingCart.addToCart(product, defaultSize, defaultColor, 1)) {
            this.showNotification('Producto agregado al carrito', 'success');

            // Opcional: remover de la lista de deseos después de agregar al carrito
            // this.removeFromWishlist(productId);
        }
    }

    viewDetails(productId) {
        // Redirigir a la página del producto o mostrar modal
        window.location.href = `product.html?id=${productId}`;
        // En una implementación real, esto abriría un modal o redirigiría a la página de detalles
    }

    shareWishlist() {
        if (this.wishlist.items.length === 0) {
            this.showNotification('Tu lista de deseos está vacía', 'warning');
            return;
        }

        if (navigator.share) {
            navigator.share({
                title: 'Mi Lista de Deseos - Tienda Escolar',
                text: 'Mira los productos que me gustan de la tienda escolar',
                url: window.location.href
            }).catch(err => {
                console.error('Error al compartir:', err);
                this.copyWishlistLink();
            });
        } else {
            this.copyWishlistLink();
        }
    }

    copyWishlistLink() {
        navigator.clipboard.writeText(window.location.href).then(() => {
            this.showNotification('Enlace copiado al portapapeles', 'success');
        }).catch(err => {
            console.error('Error al copiar:', err);
            this.showNotification('No se pudo copiar el enlace', 'error');
        });
    }

    loadRecommendedProducts() {
        const container = document.getElementById('recommended-products');
        if (!container) return;

        const wishlistIds = this.wishlist.items;
        const recommended = productsData
            .filter(product => !wishlistIds.includes(product.id))
            .sort((a, b) => b.rating - a.rating || b.featured - a.featured)
            .slice(0, 4);

        if (recommended.length === 0) {
            container.innerHTML = '<p class="text-muted">No hay productos recomendados en este momento.</p>';
            return;
        }

        container.innerHTML = recommended.map(product => {
            const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

            return `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                        ${product.discount > 0 ? `
                            <div class="product-badge discount">-${discountPercent}%</div>
                        ` : ''}
                    </div>
                    
                    <div class="product-info">
                        <h4 class="product-title">${product.name}</h4>
                        
                        <div class="product-price">
                            ${PriceUtils.formatPrice(product.price)}
                            ${product.originalPrice > product.price ? `
                                <span class="original-price">${PriceUtils.formatPrice(product.originalPrice)}</span>
                            ` : ''}
                        </div>
                        
                        <div class="product-actions">
                            <button class="btn-wishlist" onclick="wishlistPage.addToWishlist(${product.id})">
                                <svg width="18" height="18" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"/>
                                </svg>
                            </button>
                            <button class="btn-view" onclick="wishlistPage.viewDetails(${product.id})">
                                Ver detalles
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    addToWishlist(productId) {
        if (this.wishlist.addToWishlist(productId)) {
            this.showNotification('Producto agregado a la lista de deseos', 'success');
            this.loadRecommendedProducts(); // Recargar recomendaciones
        } else {
            this.showNotification('El producto ya está en tu lista de deseos', 'info');
        }
    }

    setupEventListeners() {
        // Vaciar lista de deseos
        document.getElementById('clear-wishlist')?.addEventListener('click', () => this.clearWishlist());

        // Compartir lista de deseos
        document.getElementById('share-wishlist')?.addEventListener('click', () => this.shareWishlist());
    }

    showNotification(message, type = 'info') {
        // Crear notificación toast (usando el mismo sistema que cart.js)
        const notification = document.createElement('div');
        notification.className = `notification toast ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
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
    }
}

// Inicializar la página de lista de deseos
let wishlistPage;

document.addEventListener('DOMContentLoaded', () => {
    wishlistPage = new WishlistPage();
    window.wishlistPage = wishlistPage;
});

// Añadir estilos para los componentes de producto (similares a shop.css)
const productCardStyles = `
    .product-card {
        background: white;
        border-radius: var(--radius-lg);
        padding: var(--space-3);
        box-shadow: var(--shadow-sm);
        transition: all var(--duration-300) var(--ease-in-out);
    }

    .product-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }

    .product-image {
        position: relative;
        aspect-ratio: 4/3;
        border-radius: var(--radius);
        overflow: hidden;
        margin-bottom: var(--space-3);
    }

    .product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--duration-300) var(--ease-in-out);
    }

    .product-card:hover .product-image img {
        transform: scale(1.05);
    }

    .product-badge {
        position: absolute;
        top: var(--space-2);
        left: var(--space-2);
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius);
        font-size: var(--text-xs);
        font-weight: var(--font-bold);
        z-index: 2;
    }

    .product-badge.discount {
        background: var(--color-danger);
        color: white;
    }

    .product-info {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
    }

    .product-title {
        font-size: var(--text-base);
        font-weight: var(--font-semibold);
        color: var(--color-gray-900);
        margin: 0;
        line-height: var(--leading-tight);
    }

    .product-price {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-weight: var(--font-bold);
        color: var(--color-primary);
    }

    .original-price {
        font-size: var(--text-sm);
        color: var(--color-gray-500);
        text-decoration: line-through;
        font-weight: normal;
    }

    .product-actions {
        display: flex;
        gap: var(--space-2);
        margin-top: var(--space-2);
    }

    .btn-wishlist, .btn-view {
        flex: 1;
        padding: var(--space-2);
        border: none;
        border-radius: var(--radius);
        font-size: var(--text-sm);
        cursor: pointer;
        transition: all var(--duration-200) var(--ease-in-out);
    }

    .btn-wishlist {
        background: var(--color-gray-100);
        color: var(--color-gray-700);
    }

    .btn-wishlist:hover {
        background: var(--color-accent);
        color: white;
    }

    .btn-view {
        background: var(--color-primary);
        color: white;
    }

    .btn-view:hover {
        background: var(--color-primary-dark);
    }
`;

// Añadir estilos al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = productCardStyles;
document.head.appendChild(styleSheet);