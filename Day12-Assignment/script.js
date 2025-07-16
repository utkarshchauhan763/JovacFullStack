class ECommerceApp {
    constructor() {
        this.allProducts = [];
        this.displayedProducts = [];
        this.filteredProducts = [];
        this.currentIndex = 0;
        this.productsPerPage = 5;
        this.isSearchActive = false;
        
        this.init();
    }

    async init() {
        await this.fetchProducts();
        this.setupEventListeners();
        this.displayProducts();
    }

    async fetchProducts() {
        try {
            const loadingSpinner = document.getElementById('loadingSpinner');
            loadingSpinner.style.display = 'block';
            
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.allProducts = await response.json();
            console.log('Products fetched successfully:', this.allProducts);
            
            loadingSpinner.style.display = 'none';
        } catch (error) {
            console.error('Error fetching products:', error);
            document.getElementById('loadingSpinner').innerHTML = 
                '<p class="error">Failed to load products. Please try again later.</p>';
        }
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const loadMoreBtn = document.getElementById('loadMoreBtn');

        // Search functionality
        searchBtn.addEventListener('click', () => this.handleSearch());
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        // Clear search when input is empty
        searchInput.addEventListener('input', (e) => {
            if (e.target.value.trim() === '') {
                this.clearSearch();
            }
        });

        // Load more functionality
        loadMoreBtn.addEventListener('click', () => this.loadMoreProducts());
    }

    handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
        
        if (searchTerm === '') {
            this.clearSearch();
            return;
        }

        this.isSearchActive = true;
        
        // Filter from all loaded products (displayedProducts)
        this.filteredProducts = this.displayedProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );

        this.displayFilteredProducts();
    }

    clearSearch() {
        this.isSearchActive = false;
        this.filteredProducts = [];
        document.getElementById('searchInput').value = '';
        this.displayCurrentProducts();
    }

    displayProducts() {
        const startIndex = this.currentIndex;
        const endIndex = Math.min(startIndex + this.productsPerPage, this.allProducts.length);
        
        const newProducts = this.allProducts.slice(startIndex, endIndex);
        this.displayedProducts.push(...newProducts);
        this.currentIndex = endIndex;

        this.displayCurrentProducts();
        this.updateLoadMoreButton();
    }

    loadMoreProducts() {
        if (this.isSearchActive) return;
        
        this.displayProducts();
    }

    displayCurrentProducts() {
        const productsToShow = this.isSearchActive ? this.filteredProducts : this.displayedProducts;
        this.renderProducts(productsToShow);
    }

    displayFilteredProducts() {
        this.renderProducts(this.filteredProducts);
        
        // Hide load more button during search
        document.getElementById('loadMoreBtn').style.display = 'none';
        
        // Show no products message if needed
        const noProductsMsg = document.getElementById('noProductsMessage');
        noProductsMsg.style.display = this.filteredProducts.length === 0 ? 'block' : 'none';
    }

    renderProducts(products) {
        const container = document.getElementById('productContainer');
        container.innerHTML = '';

        products.forEach(product => {
            const productCard = this.createProductCard(product);
            container.appendChild(productCard);
        });

        // Hide no products message if we have products
        if (products.length > 0) {
            document.getElementById('noProductsMessage').style.display = 'none';
        }
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => this.goToProductPage(product.id);

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image" 
                 onerror="this.src='https://via.placeholder.com/200x200?text=Image+Not+Found'">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            ${product.rating ? `<div class="rating">⭐ ${product.rating.rate} (${product.rating.count} reviews)</div>` : ''}
        `;

        return card;
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        if (this.isSearchActive) {
            loadMoreBtn.style.display = 'none';
            return;
        }

        if (this.currentIndex >= this.allProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.textContent = `Load More Products (${this.allProducts.length - this.currentIndex} remaining)`;
        }
    }

    goToProductPage(productId) {
        window.location.href = `product.html?id=${productId}`;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ECommerceApp();
});