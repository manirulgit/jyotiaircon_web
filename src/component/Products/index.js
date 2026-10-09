import React, { useState, useEffect } from 'react';

import './Products.css';
import Header from '../Header';
import Footer from '../Footer';

function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);

    // Demo AC product data
    const demoProducts = [
        {
            id: 1,
            name: "Inverter Split AC 1.5 Ton",
            company: "Samsung",
            model: "AR18AVFSBWK",
            price: 45999,
            originalPrice: 52999,
            image: "https://images.unsplash.com/photo-1541960071727-c531398e7494?w=400&h=300&fit=crop",
            rating: 4.5,
            reviews: 245,
            features: ["5 Star Energy Rating", "Copper Condenser", "Anti-Viral Filter", "Wi-Fi Enabled"],
            tonnage: "1.5 Ton",
            type: "Split AC",
            energyRating: 5,
            warranty: "1 Year Comprehensive + 10 Years on Compressor",
            inStock: true,
            description: "Experience ultimate comfort with Samsung's advanced inverter technology that ensures optimal cooling while saving energy."
        },
        {
            id: 2,
            name: "Dual Inverter Split AC 1 Ton",
            company: "LG",
            model: "MS-Q12YNZA",
            price: 35999,
            originalPrice: 42999,
            image: "https://images.unsplash.com/photo-1555484285-5f0acfd1b515?w=400&h=300&fit=crop",
            rating: 4.3,
            reviews: 189,
            features: ["4 Star Energy Rating", "Dual Inverter Compressor", "4-in-1 Convertible", "Ocean Black Fin"],
            tonnage: "1 Ton",
            type: "Split AC",
            energyRating: 4,
            warranty: "1 Year Comprehensive + 10 Years on Compressor",
            inStock: true,
            description: "LG's Dual Inverter technology provides faster cooling, energy savings and low noise operation for peaceful sleep."
        },
        {
            id: 3,
            name: "Window AC 1.5 Ton",
            company: "Voltas",
            model: "182 DZZ",
            price: 28999,
            originalPrice: 34999,
            image: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=400&h=300&fit=crop",
            rating: 4.1,
            reviews: 156,
            features: ["3 Star Energy Rating", "Copper Condenser", "Anti-Dust Filter", "Turbo Mode"],
            tonnage: "1.5 Ton",
            type: "Window AC",
            energyRating: 3,
            warranty: "1 Year Comprehensive + 5 Years on Compressor",
            inStock: true,
            description: "Voltas Window AC offers reliable cooling performance with advanced features at an affordable price point."
        },
        {
            id: 4,
            name: "Inverter Split AC 2 Ton",
            company: "Daikin",
            model: "FTKP60TV",
            price: 68999,
            originalPrice: 78999,
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
            rating: 4.7,
            reviews: 312,
            features: ["5 Star Energy Rating", "R32 Refrigerant", "PM 2.5 Filter", "Intelligent Eye"],
            tonnage: "2 Ton",
            type: "Split AC",
            energyRating: 5,
            warranty: "1 Year Comprehensive + 12 Years on Compressor",
            inStock: true,
            description: "Daikin's premium AC with advanced air purification and intelligent features for superior comfort and health."
        },
        {
            id: 5,
            name: "Cassette AC 3 Ton",
            company: "Blue Star",
            model: "CCT336NN",
            price: 95999,
            originalPrice: 110999,
            image: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?w=400&h=300&fit=crop",
            rating: 4.4,
            reviews: 98,
            features: ["4 Star Energy Rating", "4-Way Air Distribution", "Built-in Wi-Fi", "Self-Diagnosis"],
            tonnage: "3 Ton",
            type: "Cassette AC",
            energyRating: 4,
            warranty: "1 Year Comprehensive + 7 Years on Compressor",
            inStock: true,
            description: "Blue Star Cassette AC provides uniform cooling across large spaces with 360-degree air distribution."
        },
        {
            id: 6,
            name: "Portable AC 1 Ton",
            company: "Honeywell",
            model: "CO30XE",
            price: 32999,
            originalPrice: 38999,
            image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
            rating: 3.9,
            reviews: 134,
            features: ["3 Star Energy Rating", "Portable Design", "Remote Control", "Auto Restart"],
            tonnage: "1 Ton",
            type: "Portable AC",
            energyRating: 3,
            warranty: "1 Year Comprehensive + 3 Years on Compressor",
            inStock: false,
            description: "Honeywell Portable AC offers cooling flexibility for any room without permanent installation."
        },
        {
            id: 7,
            name: "Smart Inverter AC 1.5 Ton",
            company: "Godrej",
            model: "GSC 18 FTC5-WSA",
            price: 41999,
            originalPrice: 48999,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            rating: 4.2,
            reviews: 201,
            features: ["5 Star Energy Rating", "Smart Connectivity", "Sleep Mode", "Anti-Microbial Filter"],
            tonnage: "1.5 Ton",
            type: "Split AC",
            energyRating: 5,
            warranty: "1 Year Comprehensive + 10 Years on Compressor",
            inStock: true,
            description: "Godrej Smart AC with IoT connectivity allows remote control and monitoring for modern homes."
        },
        {
            id: 8,
            name: "Tower AC 2 Ton",
            company: "Hitachi",
            model: "RAU222KWEA",
            price: 72999,
            originalPrice: 84999,
            image: "https://images.unsplash.com/photo-1586717791821-3de300ebfc5d?w=400&h=300&fit=crop",
            rating: 4.6,
            reviews: 167,
            features: ["5 Star Energy Rating", "Inverter Technology", "Expandable Memory", "Karakaze Technology"],
            tonnage: "2 Ton",
            type: "Tower AC",
            energyRating: 5,
            warranty: "1 Year Comprehensive + 10 Years on Compressor",
            inStock: true,
            description: "Hitachi Tower AC delivers powerful cooling with Japanese technology and energy efficiency."
        }
    ];

    useEffect(() => {
        setProducts(demoProducts);
        setFilteredProducts(demoProducts);
    }, []);

    useEffect(() => {
        let filtered = products;

        // Filter by company
        if (selectedCompany !== 'All') {
            filtered = filtered.filter(product => product.company === selectedCompany);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.model.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        setFilteredProducts(filtered);
    }, [products, selectedCompany, searchTerm, sortBy]);

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity === 0) {
            removeFromCart(productId);
        } else {
            setCart(cart.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            ));
        }
    };

    const getTotalCartValue = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalCartItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const companies = ['All', ...new Set(products.map(product => product.company))];

    const openProductModal = (product) => {
        setSelectedProduct(product);
        setShowProductModal(true);
    };

    return (
        <div className="products-container">
            <Header />
            {/* Page Header */}
            <div className="products-header">
               
                <button 
                    className="cart-toggle-btn"
                    onClick={() => setShowCart(!showCart)}
                >
                    <i className="fas fa-shopping-cart"></i>
                    Cart ({getTotalCartItems()})
                </button>
            </div>

            {/* Filters and Search */}
            <div className="products-filters">
                <div className="filter-group">
                    <label>Search:</label>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                
                <div className="filter-group">
                    <label>Company:</label>
                    <select
                        value={selectedCompany}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                        className="filter-select"
                    >
                        {companies.map(company => (
                            <option key={company} value={company}>{company}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label>Sort By:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="filter-select"
                    >
                        <option value="name">Name A-Z</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
                {filteredProducts.map(product => (
                    <div key={product.id} className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}>
                        <div className="product-image-container">
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="product-image"
                                onClick={() => openProductModal(product)}
                            />
                            {!product.inStock && <div className="out-of-stock-overlay">Out of Stock</div>}
                            <div className="discount-badge">
                                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                            </div>
                        </div>
                        
                        <div className="product-info">
                            <div className="product-company">{product.company}</div>
                            <h3 className="product-name" onClick={() => openProductModal(product)}>
                                {product.name}
                            </h3>
                            <div className="product-model">Model: {product.model}</div>
                            
                            <div className="product-features">
                                {product.features.slice(0, 2).map((feature, index) => (
                                    <span key={index} className="feature-badge">{feature}</span>
                                ))}
                            </div>

                            <div className="product-rating">
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <i 
                                            key={i} 
                                            className={`fas fa-star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                                        ></i>
                                    ))}
                                </div>
                                <span>{product.rating} ({product.reviews} reviews)</span>
                            </div>

                            <div className="product-pricing">
                                <span className="current-price">₹{product.price.toLocaleString()}</span>
                                <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                            </div>

                            <div className="product-specs">
                                <span className="spec">{product.tonnage}</span>
                                <span className="spec">{product.energyRating}⭐</span>
                                <span className="spec">{product.type}</span>
                            </div>

                            <div className="product-actions">
                                <button 
                                    className="btn-primary"
                                    onClick={() => openProductModal(product)}
                                >
                                    <i className="fas fa-eye"></i> View Details
                                </button>
                                <button 
                                    className="btn-cart"
                                    onClick={() => addToCart(product)}
                                    disabled={!product.inStock}
                                >
                                    <i className="fas fa-cart-plus"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="no-products">
                    <i className="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            )}

            {/* Shopping Cart Sidebar */}
            {showCart && (
                <div className="cart-sidebar-overlay" onClick={() => setShowCart(false)}>
                    <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
                        <div className="cart-header">
                            <h3>Shopping Cart</h3>
                            <button onClick={() => setShowCart(false)} className="close-btn">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <div className="cart-items">
                            {cart.length === 0 ? (
                                <div className="empty-cart">
                                    <i className="fas fa-shopping-cart"></i>
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <img src={item.image} alt={item.name} className="cart-item-image" />
                                        <div className="cart-item-info">
                                            <h4>{item.name}</h4>
                                            <p>{item.company}</p>
                                            <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                                        </div>
                                        <div className="cart-item-controls">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="quantity-btn"
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="quantity-btn"
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                            <button 
                                                onClick={() => removeFromCart(item.id)}
                                                className="remove-btn"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        {cart.length > 0 && (
                            <div className="cart-footer">
                                <div className="cart-total">
                                    <strong>Total: ₹{getTotalCartValue().toLocaleString()}</strong>
                                </div>
                                <button className="checkout-btn">
                                    <i className="fas fa-credit-card"></i> Checkout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Product Detail Modal */}
            {showProductModal && selectedProduct && (
                <div className="modal-overlay" onClick={() => setShowProductModal(false)}>
                    <div className="product-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{selectedProduct.name}</h2>
                            <button onClick={() => setShowProductModal(false)} className="close-btn">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <div className="modal-content">
                            <div className="modal-image">
                                <img src={selectedProduct.image} alt={selectedProduct.name} />
                            </div>
                            
                            <div className="modal-details">
                                <div className="product-company-modal">{selectedProduct.company}</div>
                                <div className="product-model-modal">Model: {selectedProduct.model}</div>
                                
                                <div className="product-rating-modal">
                                    <div className="stars">
                                        {[...Array(5)].map((_, i) => (
                                            <i 
                                                key={i} 
                                                className={`fas fa-star ${i < Math.floor(selectedProduct.rating) ? 'filled' : ''}`}
                                            ></i>
                                        ))}
                                    </div>
                                    <span>{selectedProduct.rating} ({selectedProduct.reviews} reviews)</span>
                                </div>

                                <div className="product-pricing-modal">
                                    <span className="current-price">₹{selectedProduct.price.toLocaleString()}</span>
                                    <span className="original-price">₹{selectedProduct.originalPrice.toLocaleString()}</span>
                                    <span className="discount">
                                        {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% OFF
                                    </span>
                                </div>

                                <div className="product-description">
                                    <p>{selectedProduct.description}</p>
                                </div>

                                <div className="product-specifications">
                                    <h4>Specifications</h4>
                                    <div className="specs-grid">
                                        <div className="spec-item">
                                            <span>Capacity:</span>
                                            <span>{selectedProduct.tonnage}</span>
                                        </div>
                                        <div className="spec-item">
                                            <span>Type:</span>
                                            <span>{selectedProduct.type}</span>
                                        </div>
                                        <div className="spec-item">
                                            <span>Energy Rating:</span>
                                            <span>{selectedProduct.energyRating} Star</span>
                                        </div>
                                        <div className="spec-item">
                                            <span>Warranty:</span>
                                            <span>{selectedProduct.warranty}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="product-features-modal">
                                    <h4>Key Features</h4>
                                    <ul>
                                        {selectedProduct.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="modal-actions">
                                    <button 
                                        className="btn-cart-large"
                                        onClick={() => {
                                            addToCart(selectedProduct);
                                            setShowProductModal(false);
                                            setShowCart(true);
                                        }}
                                        disabled={!selectedProduct.inStock}
                                    >
                                        <i className="fas fa-cart-plus"></i> 
                                        {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Products;
