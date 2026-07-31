/*========================================
  COUNTER ANIMATION
========================================*/

const counters = document.querySelectorAll(".count");

if (counters.length > 0) {

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = parseInt(counter.dataset.target);

            let current = 0;
            const increment = Math.max(1, Math.ceil(target / 100));

            function updateCounter() {

                current += increment;

                if (current < target) {

                    counter.textContent = current + "+";
                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target + "+";

                }

            }

            updateCounter();

            counterObserver.unobserve(counter);

        });

    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}

/*========================================
  MOBILE MENU
========================================*/

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {

            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-xmark");

        }

    });

}

/*========================================
  LIVE SEARCH
========================================*/

const searchInput = document.getElementById("search");
const productCards = document.querySelectorAll(".product-card");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const value = searchInput.value.toLowerCase();

        productCards.forEach(card => {

            const title = card.querySelector("h3").textContent.toLowerCase();

            if (title.includes(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

/*========================================
  CATEGORY FILTER
========================================*/

const filterButtons = document.querySelectorAll(".category-filter button");

if (filterButtons.length > 0) {

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const filter = button.dataset.filter;

            productCards.forEach(card => {

                if (filter === "all" || card.dataset.category === filter) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });

}

/*========================================
  CART SIDEBAR
========================================*/

const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");

const cartButtons = document.querySelectorAll(".product-card .cart-btn");
const cartItems = document.querySelector(".cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cartIcon && cartSidebar) {

    cartIcon.addEventListener("click", () => {

        cartSidebar.classList.add("active");

    });

}

if (closeCart) {

    closeCart.addEventListener("click", () => {

        cartSidebar.classList.remove("active");

    });

}

/*========================================
  RENDER CART
========================================*/

function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartCount.textContent = 0;
        cartTotal.textContent = "₹0";

        localStorage.setItem("cart", JSON.stringify(cart));

        return;
    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-details">

                <h4>${item.name}</h4>

                <p>₹${item.price}</p>

                <div class="quantity-box">

                    <button class="decrease"
                        data-name="${item.name}">−</button>

                    <span>${item.quantity}</span>

                    <button class="increase"
                        data-name="${item.name}">+</button>

                </div>

                <button class="remove-item"
                    data-name="${item.name}">
                    Remove
                </button>

            </div>

        </div>

        `;

    });

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartTotal.textContent = "₹" + total;

    localStorage.setItem("cart", JSON.stringify(cart));

}

 function showToast(message){

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}


/*========================================
  ADD PRODUCT TO CART
========================================*/

cartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const product = {

            name: button.dataset.name,
            price: Number(button.dataset.price),
            image: button.dataset.image,
            quantity: 1

        };

        const existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push(product);

        }

        renderCart();
        showToast(product.name + " added to cart!");

    });

});
renderCart();
document.addEventListener("click", (e) => {

    if (e.target.classList.contains("increase")) {

        const item = cart.find(
            p => p.name === e.target.dataset.name
        );

        if (item) {

            item.quantity++;

            renderCart();

        }

    }

    if (e.target.classList.contains("decrease")) {

        const item = cart.find(
            p => p.name === e.target.dataset.name
        );

        if (item) {

            item.quantity--;

            if (item.quantity <= 0) {

                cart = cart.filter(
                    p => p.name !== item.name
                );

            }

            renderCart();

        }

    }

    if (e.target.classList.contains("remove-item")) {

        cart = cart.filter(
            p => p.name !== e.target.dataset.name
        );

        renderCart();
        wishlistSidebar.classList.remove("active");
cartSidebar.classList.add("active");

        showToast("Item Removed");

    }

});

/*========================================
  QUICK VIEW
========================================*/

const quickView = document.getElementById("quickView");
const closeView = document.getElementById("closeView");

const quickImage = document.getElementById("quickImage");
const quickTitle = document.getElementById("quickTitle");
const quickPrice = document.getElementById("quickPrice");

const quickButtons = document.querySelectorAll(".quick-view-btn");
const quickCartBtn = document.getElementById("quickCartBtn");

let selectedProduct = null;

quickButtons.forEach((btn) => {

    btn.addEventListener("click", (e) => {

        e.preventDefault();

        selectedProduct = {

            name: btn.dataset.name,
            price: Number(btn.dataset.price),
            image: btn.dataset.image,
            quantity: 1

        };

        quickImage.src = selectedProduct.image;
        quickImage.alt = selectedProduct.name;

        quickTitle.textContent = selectedProduct.name;
        quickPrice.textContent = "₹" + selectedProduct.price;

        quickView.classList.add("active");

    });

});

closeView.addEventListener("click", () => {

    quickView.classList.remove("active");

});

quickView.addEventListener("click", (e) => {

    if (e.target === quickView) {

        quickView.classList.remove("active");

    }

});

quickCartBtn.addEventListener("click", () => {

    if (!selectedProduct) return;

    const existing = cart.find(item => item.name === selectedProduct.name);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({ ...selectedProduct });

    }

    renderCart();

    showToast(selectedProduct.name + " added to cart!");

    quickView.classList.remove("active");

});

/*========================================
  WISHLIST SIDEBAR
========================================*/

const wishlistIcon = document.querySelector(".wishlist-icon");
const wishlistSidebar = document.getElementById("wishlistSidebar");
const closeWishlist = document.getElementById("closeWishlist");

const wishlistItems = document.querySelector(".wishlist-items");
const wishlistCount = document.getElementById("wishlist-count");

const wishlistButtons = document.querySelectorAll(".wishlist-btn");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/*==============================
OPEN / CLOSE SIDEBAR
==============================*/

if (wishlistIcon) {

    wishlistIcon.addEventListener("click", () => {

        wishlistSidebar.classList.add("active");

    });

}

if (closeWishlist) {

    closeWishlist.addEventListener("click", () => {

        wishlistSidebar.classList.remove("active");

    });

}

/*==============================
RENDER WISHLIST
==============================*/

function renderWishlist() {

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistItems.innerHTML = `
            <p class="empty-wishlist">
                Your wishlist is empty.
            </p>
        `;

        wishlistCount.textContent = "0";

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        return;
    }

    wishlist.forEach(item => {

        wishlistItems.innerHTML += `

        <div class="wishlist-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="wishlist-details">

                <h4>${item.name}</h4>

                <p>₹${item.price}</p>

                <button class="move-cart"
                    data-name="${item.name}">
                    Move to Cart
                </button>

                <button class="remove-wishlist"
                    data-name="${item.name}">
                    Remove
                </button>

            </div>

        </div>

        `;

    });

    wishlistCount.textContent = wishlist.length;

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

}

/*==============================
ADD / REMOVE WISHLIST
==============================*/

wishlistButtons.forEach(btn => {

    const icon = btn.querySelector("i");

   const exists = wishlist.some(item => item.name === btn.dataset.name);

if (exists) {
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
    icon.style.color = "red";
} else {
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
    icon.style.color = "";
}

    btn.addEventListener("click", (e) => {

        e.preventDefault();

        const product = {

            name: btn.dataset.name,
            price: Number(btn.dataset.price),
            image: btn.dataset.image

        };

        const index = wishlist.findIndex(item => item.name === product.name);

        if (index > -1) {

            wishlist.splice(index, 1);

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

            icon.style.color = "";

            showToast("Removed from Wishlist");

        } else {

            wishlist.push(product);

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            icon.style.color = "red";

            showToast("Added to Wishlist");

        }

        renderWishlist();
        wishlistSidebar.classList.add("active");

    });

});

/*==============================
BUTTON EVENTS
==============================*/

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("remove-wishlist")) {

        const name = e.target.dataset.name;

        wishlist = wishlist.filter(item => item.name !== name);

        renderWishlist();

        document.querySelectorAll(".wishlist-btn").forEach(btn => {

            if (btn.dataset.name === name) {

                const icon = btn.querySelector("i");

                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");

                icon.style.color = "";

            }

        });

    }

    if (e.target.classList.contains("move-cart")) {

        const name = e.target.dataset.name;

        const product = wishlist.find(item => item.name === name);

        if (!product) return;

        const exists = cart.find(item => item.name === name);

        if (exists) {

            exists.quantity++;

        } else {

            cart.push({

                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1

            });

        }

        wishlist = wishlist.filter(item => item.name !== name);

        renderWishlist();

        renderCart();

        showToast("Moved to Cart");

    }

});

renderWishlist();