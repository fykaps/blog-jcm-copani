/**
 * Sistema de Carrito de Compras - Página de Carrito
 * Gestión completa del carrito con funcionalidades avanzadas
 */

class CartPage {
    constructor() {
        this.cart = shoppingCart;
        this.appliedCoupon = null;
        this.coupons = {
            'ESCOLAR10': { discount: 10, type: 'percentage' },
            'VERANO25': { discount: 25, type: 'percentage', minAmount: 200 },
            'ENVIOGRATIS': { discount: 0, type: 'free_shipping' },
            'BIENVENIDA15': { discount: 15, type: 'percentage', maxUses: 1 }
        };

        this.init();
    }

    init() {
        this.renderCart();
        this.setupEventListeners();
        this.setupCartUpdates();
        this.loadRecommendedProducts();
    }

    renderCart() {
        const cartItems = this.cart.cart;
        const cartContainer = document.getElementById('cart-items-container');
        const emptyCart = document.getElementById('empty-cart');
        const itemsCount = document.getElementById('cart-items-count');
        const checkoutBtn = document.getElementById('checkout-btn');

        // Actualizar contador
        const totalItems = this.cart.getTotalItems();
        itemsCount.textContent = totalItems;

        // Mostrar/ocultar carrito vacío
        if (cartItems.length === 0) {
            cartContainer.style.display = 'none';
            emptyCart.style.display = 'block';
            checkoutBtn.disabled = true;
            this.updateOrderSummary();
            return;
        }

        cartContainer.style.display = 'flex';
        emptyCart.style.display = 'none';
        checkoutBtn.disabled = false;

        // Renderizar items del carrito
        cartContainer.innerHTML = cartItems.map((item, index) => {
            const product = productsData.find(p => p.id === item.id);
            if (!product) return '';

            return `
                <div class="cart-item" data-item-index="${index}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                    </div>
                    
                    <div class="cart-item-details">
                        <h3 class="cart-item-name">${item.name}</h3>
                        
                        <div class="cart-item-variants">
                            <span class="cart-item-variant">
                                <strong>Talla:</strong> ${item.size}
                            </span>
                            <span class="cart-item-variant">
                                <strong>Color:</strong> ${item.color}
                            </span>
                        </div>
                        
                        <div class="cart-item-price">
                            ${PriceUtils.formatPrice(item.price * item.quantity)}
                            <small>(${PriceUtils.formatPrice(item.price)} c/u)</small>
                        </div>
                    </div>
                    
                    <div class="cart-item-actions">
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" onclick="cartPage.updateQuantity(${index}, ${item.quantity - 1})" 
                                ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                            
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="${product.stock}" 
                                onchange="cartPage.updateQuantityInput(${index}, this.value)" 
                                onkeypress="return cartPage.validateQuantityInput(event)">
                            
                            <button class="quantity-btn plus" onclick="cartPage.updateQuantity(${index}, ${item.quantity + 1})" 
                                ${item.quantity >= product.stock ? 'disabled' : ''}>+</button>
                        </div>
                        
                        <button class="cart-item-remove" onclick="cartPage.removeItem(${index})">
                            <svg width="16" height="16" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                            Eliminar
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        this.updateOrderSummary();
    }

    updateOrderSummary() {
        const subtotal = this.cart.getTotal();
        const shipping = this.calculateShipping(subtotal);
        const discount = this.calculateDiscount(subtotal);
        const total = Math.max(0, subtotal + shipping - discount);

        document.getElementById('subtotal').textContent = PriceUtils.formatPrice(subtotal);
        document.getElementById('shipping').textContent = PriceUtils.formatPrice(shipping);
        document.getElementById('discount').textContent = `-${PriceUtils.formatPrice(discount)}`;
        document.getElementById('total').textContent = PriceUtils.formatPrice(total);

        // Mostrar mensaje de envío gratis
        this.updateFreeShippingNotice(subtotal);
    }

    calculateShipping(subtotal) {
        if (this.appliedCoupon && this.appliedCoupon.type === 'free_shipping') {
            return 0;
        }

        // Envío gratis para compras mayores a 200 soles
        if (subtotal >= 200) {
            return 0;
        }

        // Costo fijo de envío
        return 15;
    }

    calculateDiscount(subtotal) {
        if (!this.appliedCoupon) return 0;

        const coupon = this.appliedCoupon;
        let discount = 0;

        if (coupon.type === 'percentage') {
            discount = (subtotal * coupon.discount) / 100;

            // Aplicar límites si existen
            if (coupon.maxDiscount && discount > coupon.maxDiscount) {
                discount = coupon.maxDiscount;
            }
        } else if (coupon.type === 'fixed') {
            discount = coupon.discount;
        }

        // No permitir descuento mayor al subtotal
        return Math.min(discount, subtotal);
    }

    updateFreeShippingNotice(subtotal) {
        const notice = document.getElementById('free-shipping-notice');
        const remaining = document.getElementById('free-shipping-remaining');

        if (subtotal >= 200 || (this.appliedCoupon && this.appliedCoupon.type === 'free_shipping')) {
            notice.style.display = 'none';
        } else {
            const amountNeeded = 200 - subtotal;
            remaining.textContent = PriceUtils.formatPrice(amountNeeded);
            notice.style.display = 'flex';
        }
    }

    updateQuantity(itemIndex, newQuantity) {
        this.cart.updateQuantity(itemIndex, newQuantity);
        this.renderCart();
    }

    updateQuantityInput(itemIndex, value) {
        const quantity = parseInt(value);
        if (!isNaN(quantity) && quantity > 0) {
            this.updateQuantity(itemIndex, quantity);
        }
    }

    validateQuantityInput(event) {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
            return false;
        }
        return true;
    }

    removeItem(itemIndex) {
        if (confirm('¿Estás seguro de que quieres eliminar este producto del carrito?')) {
            this.cart.removeFromCart(itemIndex);
            this.renderCart();

            // Mostrar notificación
            this.showNotification('Producto eliminado del carrito', 'success');
        }
    }

    clearCart() {
        if (confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
            this.cart.clearCart();
            this.renderCart();
            this.appliedCoupon = null;
            this.updateCouponMessage('');

            // Mostrar notificación
            this.showNotification('Carrito vaciado', 'info');
        }
    }

    applyCoupon() {
        const couponCode = document.getElementById('coupon-code').value.trim().toUpperCase();
        const messageElement = document.getElementById('coupon-message');

        if (!couponCode) {
            this.updateCouponMessage('Por favor ingresa un código de cupón', 'error');
            return;
        }

        const coupon = this.coupons[couponCode];

        if (!coupon) {
            this.updateCouponMessage('Cupón no válido', 'error');
            return;
        }

        // Validar condiciones del cupón
        const subtotal = this.cart.getTotal();

        if (coupon.minAmount && subtotal < coupon.minAmount) {
            this.updateCouponMessage(`Mínimo de compra: ${PriceUtils.formatPrice(coupon.minAmount)}`, 'error');
            return;
        }

        if (coupon.maxUses && coupon.uses >= coupon.maxUses) {
            this.updateCouponMessage('Este cupón ha alcanzado su límite de uso', 'error');
            return;
        }

        // Aplicar cupón
        this.appliedCoupon = coupon;
        this.updateOrderSummary();
        this.updateCouponMessage(`¡Cupón aplicado! ${coupon.discount}% de descuento`, 'success');

        // Limpiar input
        document.getElementById('coupon-code').value = '';
    }

    updateCouponMessage(message, type = '') {
        const messageElement = document.getElementById('coupon-message');
        messageElement.textContent = message;
        messageElement.className = 'coupon-message';

        if (type) {
            messageElement.classList.add(type);
        }
    }

    proceedToCheckout() {
        if (this.cart.getTotalItems() === 0) {
            this.showNotification('Tu carrito está vacío', 'error');
            return;
        }

        // Aquí iría la lógica para redirigir al checkout
        // Por ahora mostramos un mensaje
        this.showNotification('Redirigiendo al proceso de pago...', 'success');

        // Simular redirección (en un caso real sería window.location.href = 'checkout.html')
        setTimeout(() => {
            alert('Proceso de checkout simulado. En una implementación real, esto redirigiría a la página de pago.');
        }, 1000);
    }

    loadRecommendedProducts() {
        const container = document.getElementById('recommended-products');
        if (!container) return;

        // Obtener productos recomendados basados en el carrito actual
        const recommended = this.getRecommendedProducts();

        if (recommended.length === 0) {
            container.innerHTML = '<p class="text-muted">No hay productos recomendados en este momento.</p>';
            return;
        }

        container.innerHTML = recommended.map(product => `
            <div class="recommended-item" onclick="cartPage.addRecommendedProduct(${product.id})">
                <div class="recommended-item-image">
                    <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                </div>
                <div class="recommended-item-info">
                    <h4 class="recommended-item-name">${product.name}</h4>
                    <div class="recommended-item-price">${PriceUtils.formatPrice(product.price)}</div>
                </div>
            </div>
        `).join('');
    }

    getRecommendedProducts() {
        const cartProductIds = this.cart.cart.map(item => item.id);

        // Filtrar productos que no están en el carrito
        return productsData
            .filter(product => !cartProductIds.includes(product.id))
            .sort((a, b) => b.rating - a.rating || b.featured - a.featured)
            .slice(0, 3);
    }

    addRecommendedProduct(productId) {
        const product = productsData.find(p => p.id === productId);
        if (!product) return;

        const defaultSize = product.sizes[0];
        const defaultColor = product.colors[0];

        if (this.cart.addToCart(product, defaultSize, defaultColor, 1)) {
            this.renderCart();
            this.showNotification('Producto agregado al carrito', 'success');
            this.loadRecommendedProducts(); // Recargar recomendaciones
        }
    }

    setupEventListeners() {
        // Vaciar carrito
        document.getElementById('clear-cart')?.addEventListener('click', () => this.clearCart());

        // Aplicar cupón
        document.getElementById('apply-coupon')?.addEventListener('click', () => this.applyCoupon());
        document.getElementById('coupon-code')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.applyCoupon();
        });

        // Proceder al pago
        document.getElementById('checkout-btn')?.addEventListener('click', () => this.proceedToCheckout());
    }

    setupCartUpdates() {
        // Suscribirse a actualizaciones del carrito
        this.cart.onUpdate(() => {
            this.renderCart();
        });
    }

    showNotification(message, type = 'info') {
        // Crear notificación toast
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

// Inicializar la página del carrito
let cartPage;

document.addEventListener('DOMContentLoaded', () => {
    cartPage = new CartPage();
    window.cartPage = cartPage;
});

// Estilos para notificaciones
const notificationStyles = `
    .notification.toast {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 16px;
        z-index: 10000;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 350px;
    }

    .notification.toast.show {
        transform: translateX(0);
        opacity: 1;
    }

    .notification.toast.success {
        border-left: 4px solid var(--color-success);
    }

    .notification.toast.error {
        border-left: 4px solid var(--color-danger);
    }

    .notification.toast.info {
        border-left: 4px solid var(--color-info);
    }

    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    }

    .notification-message {
        flex: 1;
        font-weight: 500;
    }

    .notification-close {
        background: none;
        border: none;
        padding: 4px;
        border-radius: 4px;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    }

    .notification-close:hover {
        opacity: 1;
    }
`;

// Añadir estilos al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);