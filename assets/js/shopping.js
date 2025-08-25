/**
 * Sistema de Carrito de Compras - Tienda Escolar
 * Gestión profesional del carrito con persistencia local
 */

class ShoppingCart {
    constructor() {
        this.cart = this.loadCart();
        this.updateCallbacks = [];
    }

    // Cargar carrito desde localStorage
    loadCart() {
        try {
            const savedCart = localStorage.getItem('schoolShopCart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    // Guardar carrito en localStorage
    saveCart() {
        try {
            localStorage.setItem('schoolShopCart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    // Agregar producto al carrito
    addToCart(product, size, color, quantity = 1) {
        const existingItem = this.cart.find(item =>
            item.id === product.id &&
            item.size === size &&
            item.color === color
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                size: size,
                color: color,
                quantity: quantity,
                image: product.images[0],
                maxStock: product.stock
            });
        }

        this.saveCart();
        this.notifyUpdate();
        return true;
    }

    // Actualizar cantidad de un item
    updateQuantity(itemIndex, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(itemIndex);
            return;
        }

        if (this.cart[itemIndex]) {
            // Verificar que no exceda el stock disponible
            const maxStock = this.cart[itemIndex].maxStock;
            this.cart[itemIndex].quantity = Math.min(newQuantity, maxStock);
            this.saveCart();
            this.notifyUpdate();
        }
    }

    // Eliminar item del carrito
    removeFromCart(itemIndex) {
        if (this.cart[itemIndex]) {
            this.cart.splice(itemIndex, 1);
            this.saveCart();
            this.notifyUpdate();
        }
    }

    // Vaciar carrito
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.notifyUpdate();
    }

    // Obtener total del carrito
    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Obtener cantidad total de items
    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Suscribirse a actualizaciones del carrito
    onUpdate(callback) {
        this.updateCallbacks.push(callback);
    }

    // Notificar a los suscriptores
    notifyUpdate() {
        this.updateCallbacks.forEach(callback => callback(this.cart, this.getTotal()));
    }

    // Verificar stock disponible
    checkStock(productId, size, color, quantity = 1) {
        const product = productsData.find(p => p.id === productId);
        if (!product) return false;

        const cartItem = this.cart.find(item =>
            item.id === productId &&
            item.size === size &&
            item.color === color
        );

        const currentInCart = cartItem ? cartItem.quantity : 0;
        return (currentInCart + quantity) <= product.stock;
    }
}

// Inicializar carrito global
let shoppingCart = new ShoppingCart();

/**
 * Utilidades para formateo de precios
 */
const PriceUtils = {
    formatPrice: (price) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN'
        }).format(price);
    },

    calculateDiscount: (original, current) => {
        return Math.round(((original - current) / original) * 100);
    }
};

/**
 * Sistema de Wishlist (Lista de deseos)
 */
class Wishlist {
    constructor() {
        this.items = this.loadWishlist();
    }

    loadWishlist() {
        try {
            const saved = localStorage.getItem('schoolShopWishlist');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading wishlist:', error);
            return [];
        }
    }

    saveWishlist() {
        try {
            localStorage.setItem('schoolShopWishlist', JSON.stringify(this.items));
        } catch (error) {
            console.error('Error saving wishlist:', error);
        }
    }

    addToWishlist(productId) {
        if (!this.items.includes(productId)) {
            this.items.push(productId);
            this.saveWishlist();
            return true;
        }
        return false;
    }

    removeFromWishlist(productId) {
        const index = this.items.indexOf(productId);
        if (index > -1) {
            this.items.splice(index, 1);
            this.saveWishlist();
            return true;
        }
        return false;
    }

    isInWishlist(productId) {
        return this.items.includes(productId);
    }

    getWishlistProducts() {
        return productsData.filter(product => this.items.includes(product.id));
    }
}

// Inicializar wishlist global
let wishlist = new Wishlist();