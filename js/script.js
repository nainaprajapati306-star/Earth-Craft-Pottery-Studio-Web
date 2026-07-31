/*=========================================================
        EARTHCRAFT POTTERY STUDIO V2.0
        Developed By : Naina Prajapati
=========================================================*/

"use strict";

/*=========================================================
                    GLOBAL VARIABLES
=========================================================*/

const body = document.body;

// Navbar
const navbar = document.querySelector(".navbar");
const menuBtn = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

// Counter
const counters = document.querySelectorAll(".count");

// Toast
const toast = document.querySelector(".toast");

// Back To Top
const backTop = document.querySelector(".back-to-top");

// Current Year
const year = document.querySelector("#year");

/*=========================================================
                    HELPER FUNCTIONS
=========================================================*/

// Select Single Element

const $ = (selector) => document.querySelector(selector);

// Select Multiple Elements

const $$ = (selector) => document.querySelectorAll(selector);

// Random Number

function random(min, max){

    return Math.floor(Math.random() * (max-min+1))+min;

}

// Debounce Function

function debounce(callback, delay){

    let timeout;

    return (...args)=>{

        clearTimeout(timeout);

        timeout = setTimeout(()=>{

            callback(...args);

        },delay);

    };

}

// Format Currency

function formatPrice(price){

    return "₹" + Number(price).toLocaleString("en-IN");

}

/*=========================================================
                    MOBILE MENU
=========================================================*/

if(menuBtn && navMenu){

    menuBtn.addEventListener("click",()=>{

        navMenu.classList.toggle("active");

        menuBtn.classList.toggle("active");

        body.classList.toggle("menu-open");

    });

}

/*=========================================================
                CLOSE MENU AFTER CLICK
=========================================================*/

document.querySelectorAll(".nav-menu a").forEach(link => {
    
    link.addEventListener("click",()=>{

        if(navMenu){

            navMenu.classList.remove("active");

        }

        if(menuBtn){

            menuBtn.classList.remove("active");

        }

        body.classList.remove("menu-open");

    });

});

/*=========================================================
                    NAVBAR SCROLL
=========================================================*/

window.addEventListener("scroll",()=>{

    if(!navbar) return;

    if(window.scrollY>50){

        navbar.classList.add("scrolled");

    }

    else{

        navbar.classList.remove("scrolled");

    }

});

/*=========================================================
                    COUNTER
=========================================================*/

function startCounter(){

    counters.forEach(counter=>{

        const target = +counter.dataset.target;

        let count = 0;

        const speed = target/150;

        function update(){

            count += speed;

            if(count < target){

                counter.innerHTML=Math.ceil(count)+"+";

                requestAnimationFrame(update);

            }

            else{

                counter.innerHTML=target+"+";

            }

        }

        update();

    });

}

/*=========================================================
            START COUNTER ON SCROLL
=========================================================*/

const counterSection = document.querySelector(".counter");

if(counterSection){

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

startCounter();

observer.unobserve(counterSection);

}

});

},{threshold:.4});

observer.observe(counterSection);

}

/*=========================================================
                TOAST NOTIFICATION
=========================================================*/

function showToast(message){

    if(!toast) return;

    toast.innerHTML=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}

/*=========================================================
                BACK TO TOP
=========================================================*/

if(backTop){

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

backTop.classList.add("active");

}

else{

backTop.classList.remove("active");

}

});

backTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

/*=========================================================
                CURRENT YEAR
=========================================================*/

if(year){

year.innerHTML=new Date().getFullYear();

}

/*=========================================================
                PAGE LOADER
=========================================================*/

window.addEventListener("load",()=>{

body.classList.add("loaded");

});

/*=========================================================
                END OF PART 1
=========================================================*/

/*=========================================================
                    CART SYSTEM
=========================================================*/

// Cart Array

let cart = JSON.parse(localStorage.getItem("earthcraft-cart")) || [];

// Cart Elements

const cartIcon = $(".cart-icon");
const cartSidebar = $(".cart-sidebar");
const closeCart = $(".close-cart");
const cartItems = $(".cart-items");
const cartCount = $(".cart-count");
const cartTotal = $(".cart-total");
const checkoutBtn = $(".checkout-btn");
renderCart();

if (checkoutBtn) {

   checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {
        showToast("Your cart is empty!");
        return;
    }

    window.location.href = "checkout.html";

});

}
/*=========================================================
                SAVE CART
=========================================================*/

function saveCart(){

    localStorage.setItem("earthcraft-cart",JSON.stringify(cart));

}

/*=========================================================
                UPDATE CART COUNT
=========================================================*/

function updateCartCount(){

    if(!cartCount) return;

    const total = cart.reduce((sum,item)=>sum+item.quantity,0);

    cartCount.innerHTML = total;

}

/*=========================================================
                CALCULATE TOTAL
=========================================================*/

function calculateTotal(){

    return cart.reduce((sum,item)=>{

        return sum + item.price * item.quantity;

    },0);

}

/*=========================================================
                RENDER CART
=========================================================*/

function renderCart(){

    if(!cartItems) return;

    cartItems.innerHTML="";

    if(cart.length===0){

        cartItems.innerHTML=`

        <div class="empty-cart">

            <h3>Your Cart is Empty</h3>

            <p>Add some beautiful pottery.</p>

        </div>

        `;

        if(cartTotal){

            cartTotal.innerHTML=formatPrice(0);

        }

        updateCartCount();

        saveCart();

        return;

    }

    cart.forEach((item,index)=>{

        cartItems.innerHTML+=`

        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p>${formatPrice(item.price)}</p>

                <div class="qty-box">

                    <button class="decrease" data-index="${index}">-</button>

                    <span>${item.quantity}</span>

                    <button class="increase" data-index="${index}">+</button>

                </div>

            </div>

            <button class="remove-item" data-index="${index}">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

    });

    if(cartTotal){

        cartTotal.innerHTML=formatPrice(calculateTotal());

    }

    updateCartCount();

    saveCart();

}

/*=========================================================
                ADD TO CART
=========================================================*/

function addToCart(product){

    const existing = cart.find(item=>item.name===product.name);

    if(existing){

        existing.quantity++;

    }

    else{

        cart.push({

            name:product.name,

            price:Number(product.price),

            image:product.image,

            quantity:1

        });

    }

    renderCart();

    showToast(product.name+" added to cart!");

}

/*=========================================================
                CART EVENTS
=========================================================*/

document.addEventListener("click",(e)=>{

    // Add Cart

    if(e.target.closest(".add-cart")){

        const btn=e.target.closest(".add-cart");

        addToCart({

            name:btn.dataset.name,

            price:btn.dataset.price,

            image:btn.dataset.image

        });

    }

    // Increase

    if(e.target.classList.contains("increase")){

        const index=e.target.dataset.index;

        cart[index].quantity++;

        renderCart();

    }

    // Decrease

    if(e.target.classList.contains("decrease")){

        const index=e.target.dataset.index;

        cart[index].quantity--;

        if(cart[index].quantity<=0){

            cart.splice(index,1);

        }

        renderCart();

    }

    // Remove

    if(e.target.closest(".remove-item")){

        const btn=e.target.closest(".remove-item");

        const index=btn.dataset.index;

        showToast(cart[index].name+" removed");

        cart.splice(index,1);

        renderCart();

    }

});

/*=========================================================
                OPEN CART
=========================================================*/

if(cartIcon){

cartIcon.addEventListener("click",()=>{

cartSidebar.classList.add("active");

});

}

/*=========================================================
                CLOSE CART
=========================================================*/

if(closeCart){

closeCart.addEventListener("click",()=>{

cartSidebar.classList.remove("active");

});

}

/*=========================================================
                INITIALIZE CART
=========================================================*/

renderCart();

/*=========================================================
                    WISHLIST SYSTEM
=========================================================*/

// Wishlist Array

let wishlist = JSON.parse(localStorage.getItem("earthcraft-wishlist")) || [];

// Wishlist Elements

const wishlistIcon = $(".wishlist-icon");
const wishlistSidebar = $(".wishlist-sidebar");
const closeWishlist = $("#closeWishlist");
const wishlistItems = $(".wishlist-items");
const wishlistCount = $(".wishlist-count");

/*=========================================================
                SAVE WISHLIST
=========================================================*/

function saveWishlist() {

    localStorage.setItem(
        "earthcraft-wishlist",
        JSON.stringify(wishlist)
    );

}

/*=========================================================
                UPDATE WISHLIST COUNT
=========================================================*/

function updateWishlistCount() {

    if (!wishlistCount) return;

    wishlistCount.innerHTML = wishlist.length;

}

/*=========================================================
                RENDER WISHLIST
=========================================================*/

function renderWishlist() {

    if (!wishlistItems) return;

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistItems.innerHTML = `
        <div class="empty-wishlist">
            <h3>Your Wishlist is Empty</h3>
            <p>Add your favourite products.</p>
        </div>
        `;

        updateWishlistCount();
        saveWishlist();

        return;

    }

    wishlist.forEach((item, index) => {

        wishlistItems.innerHTML += `

        <div class="wishlist-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="wishlist-info">

                <h4>${item.name}</h4>

                <p>${formatPrice(item.price)}</p>

                <button
                    class="move-cart"
                    data-index="${index}">
                    Move To Cart
                </button>

            </div>

            <button
                class="remove-wishlist"
                data-index="${index}">
                <i class="fa-solid fa-trash"></i>
            </button>

        </div>

        `;

    });

    updateWishlistCount();
    saveWishlist();

}

/*=========================================================
                ADD TO WISHLIST
=========================================================*/

function addToWishlist(product) {

    const exist = wishlist.find(
        item => item.name === product.name
    );

    if (exist) {

        showToast("Already in Wishlist");

        return;

    }

    wishlist.push({

        name: product.name,
        price: Number(product.price),
        image: product.image

    });

    renderWishlist();

    wishlistSidebar.classList.add("active");

    showToast(product.name + " added to Wishlist");

}

/*=========================================================
                WISHLIST EVENTS
=========================================================*/

document.addEventListener("click", (e) => {

    // Add Wishlist

    if (e.target.closest(".wishlist-btn")) {

        e.preventDefault();

        const btn = e.target.closest(".wishlist-btn");

        addToWishlist({

            name: btn.dataset.name,
            price: btn.dataset.price,
            image: btn.dataset.image

        });

    }

    // Remove Wishlist

    if (e.target.closest(".remove-wishlist")) {

        const btn = e.target.closest(".remove-wishlist");

        const index = btn.dataset.index;

        wishlist.splice(index, 1);

        renderWishlist();

        showToast("Removed from Wishlist");

    }

    // Move To Cart

    if (e.target.classList.contains("move-cart")) {

        const index = e.target.dataset.index;

        addToCart(wishlist[index]);

        wishlist.splice(index, 1);

        renderWishlist();

        cartSidebar.classList.add("active");

        wishlistSidebar.classList.remove("active");

    }

});

/*=========================================================
                OPEN WISHLIST
=========================================================*/

if (wishlistIcon) {

    wishlistIcon.addEventListener("click", () => {

        wishlistSidebar.classList.add("active");

    });

}

/*=========================================================
                CLOSE WISHLIST
=========================================================*/

if (closeWishlist) {

    closeWishlist.addEventListener("click", () => {

        wishlistSidebar.classList.remove("active");

    });

}

/*=========================================================
                INITIALIZE
=========================================================*/

renderWishlist();

/*=========================================================
                QUICK VIEW SYSTEM
=========================================================*/

// Quick View Elements

const quickView = $("#quickView");
const quickImage = $("#quickImage");
const quickTitle = $("#quickTitle");
const quickPrice = $("#quickPrice");
const quickDesc = $("#quickDesc");
const quickCartBtn = $("#quickCartBtn");
const closeView = $("#closeView");

let selectedProduct = {};

/*=========================================================
                PRODUCT DESCRIPTION
=========================================================*/

function getDescription(name){

    const descriptions={

        "Handmade Clay Pot":"Premium handmade terracotta pot crafted by skilled artisans.",

        "Kulhad Tea Cup":"Traditional eco-friendly kulhad tea cup set for everyday use.",

        "Terracotta Planter":"Elegant indoor planter perfect for home decoration.",

        "Traditional Kulhad":"Classic kulhad for serving tea in authentic style.",

        "Decorative Clay Pot":"Beautiful handcrafted clay pot for modern interiors.",

        "Garden Terracotta Planter":"Strong planter suitable for indoor and outdoor plants.",

        "Terracotta Vase":"Stylish handmade vase for flowers and decoration.",

        "Decorative Clay Vase":"Premium decorative vase for elegant home decor.",

        "Festival Diya Set":"Pack of handmade clay diyas for festivals and पूजा.",

        "Designer Terracotta Diya":"Designer diya set with premium terracotta finish.",

        "Traditional Clay Handi":"Traditional clay handi for healthy slow cooking.",

        "Premium Earthen Handi":"Premium quality earthen handi with excellent heat retention."

    };

    return descriptions[name] || "Premium handmade terracotta product.";

}

/*=========================================================
                OPEN QUICK VIEW
=========================================================*/

document.addEventListener("click",(e)=>{

    if(e.target.closest(".quick-view-btn")){

        e.preventDefault();

        const btn=e.target.closest(".quick-view-btn");

        selectedProduct={

            name:btn.dataset.name,

            price:Number(btn.dataset.price),

            image:btn.dataset.image

        };

        quickImage.src=selectedProduct.image;

        quickImage.alt=selectedProduct.name;

        quickTitle.innerHTML=selectedProduct.name;

        quickPrice.innerHTML=formatPrice(selectedProduct.price);

        quickDesc.innerHTML=getDescription(selectedProduct.name);

        quickView.classList.add("active");

    }

});

/*=========================================================
            ADD TO CART FROM QUICK VIEW
=========================================================*/

if(quickCartBtn){

quickCartBtn.addEventListener("click",()=>{

if(!selectedProduct.name) return;

addToCart(selectedProduct);

quickView.classList.remove("active");

});

}

/*=========================================================
                CLOSE BUTTON
=========================================================*/

if(closeView){

closeView.addEventListener("click",()=>{

quickView.classList.remove("active");

});

}

/*=========================================================
            CLOSE ON OUTSIDE CLICK
=========================================================*/

window.addEventListener("click",(e)=>{

if(e.target===quickView){

quickView.classList.remove("active");

}

});

/*=========================================================
                ESC KEY CLOSE
=========================================================*/

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

quickView.classList.remove("active");

}

});

/*=========================================================
                SEARCH & CATEGORY FILTER
=========================================================*/

// Elements

const searchInput = $("#search");
const filterButtons = $$(".category-filter button");
const productCards = $$(".product-card");

let currentCategory = "all";

/*=========================================================
                FILTER PRODUCTS
=========================================================*/

function filterProducts() {

    const searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    let visibleProducts = 0;

   productCards.forEach(card => {

    const title = card.querySelector("h3").innerText.toLowerCase();
    const category = card.dataset.category;

    const matchSearch = title.includes(searchText);
    const matchCategory =
        currentCategory === "all" ||
        currentCategory === category;

    if (matchSearch && matchCategory) {
        card.style.display = "";
        visibleProducts++;
    } else {
        card.style.display = "none";
    }

});
    showNoProductsMessage(visibleProducts);
console.log("Filter Function Running");
}

/*=========================================================
                CATEGORY BUTTONS
=========================================================*/

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentCategory = button.dataset.filter;

        filterProducts();

    });

});

/*=========================================================
                SEARCH INPUT
=========================================================*/
if (searchInput) {

    searchInput.addEventListener("keyup", (e) => {

        console.log("Typing:", e.target.value);

        filterProducts();

    });

}

/*=========================================================
                NO PRODUCTS MESSAGE
=========================================================*/

function showNoProductsMessage(totalVisible) {

    const productGrid = document.querySelector(".product-grid");

    if (!productGrid) return;   // Gallery page par function yahin stop ho jayega

    let message = document.querySelector(".no-product");

    if (!message) {

        message = document.createElement("div");
        message.className = "no-product";

        message.innerHTML = `
            <h2>No Products Found</h2>
            <p>Try another keyword.</p>
        `;

        productGrid.appendChild(message);

    }

    message.style.display = totalVisible === 0 ? "block" : "none";
}

/*=========================================================
                RESET SEARCH
=========================================================*/

function resetSearch() {

    if (searchInput) {

        searchInput.value = "";

    }

    currentCategory = "all";

    filterButtons.forEach(btn =>
        btn.classList.remove("active")
    );

    filterButtons[0].classList.add("active");

    filterProducts();

}

/*=========================================================
                INITIALIZE FILTER
=========================================================*/

if (document.querySelector(".product-grid")) {
    filterProducts();
}
/*=========================================================
                GALLERY LIGHTBOX
=========================================================*/

// Gallery Elements

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");

const closeLightbox = document.querySelector(".close-lightbox");

const nextImage = document.querySelector(".next-image");

const prevImage = document.querySelector(".prev-image");

let currentImage = 0;

/*=========================================================
                OPEN LIGHTBOX
=========================================================*/

function openLightbox(index){

    if(!lightbox) return;

    currentImage = index;

    lightboxImage.src = galleryImages[index].src;

    lightbox.classList.add("active");

}

/*=========================================================
                CLOSE LIGHTBOX
=========================================================*/

function closeGallery(){

    lightbox.classList.remove("active");

}

/*=========================================================
                NEXT IMAGE
=========================================================*/

function showNext(){

    currentImage++;

    if(currentImage>=galleryImages.length){

        currentImage=0;

    }

    lightboxImage.src=galleryImages[currentImage].src;

}

/*=========================================================
                PREVIOUS IMAGE
=========================================================*/

function showPrevious(){

    currentImage--;

    if(currentImage<0){

        currentImage=galleryImages.length-1;

    }

    lightboxImage.src=galleryImages[currentImage].src;

}

/*=========================================================
                IMAGE CLICK
=========================================================*/

galleryImages.forEach((image,index)=>{

    image.addEventListener("click",()=>{

        openLightbox(index);

    });

});

/*=========================================================
                CLOSE BUTTON
=========================================================*/

if(closeLightbox){

    closeLightbox.addEventListener("click",closeGallery);

}

/*=========================================================
                NEXT BUTTON
=========================================================*/

if(nextImage){

    nextImage.addEventListener("click",showNext);

}

/*=========================================================
                PREVIOUS BUTTON
=========================================================*/

if(prevImage){

    prevImage.addEventListener("click",showPrevious);

}

/*=========================================================
            CLOSE OUTSIDE IMAGE
=========================================================*/

if(lightbox){

lightbox.addEventListener("click",(e)=>{

if(e.target===lightbox){

closeGallery();

}

});

}

/*=========================================================
                KEYBOARD SUPPORT
=========================================================*/

document.addEventListener("keydown",(e)=>{

if(!lightbox) return;

if(!lightbox.classList.contains("active")) return;

if(e.key==="Escape"){

closeGallery();

}

if(e.key==="ArrowRight"){

showNext();

}

if(e.key==="ArrowLeft"){

showPrevious();

}

});

/*====================================
        TESTIMONIALS
=====================================*/

const testimonials = document.querySelectorAll(".testimonial");

const dots = document.querySelectorAll(".dot");

let currentSlide = 0;

function showSlide(index){

    testimonials.forEach((item)=>{

        item.classList.remove("active");

    });

    dots.forEach((dot)=>{

        dot.classList.remove("active");

    });

    testimonials[index].classList.add("active");

    dots[index].classList.add("active");

}

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentSlide=index;

        showSlide(currentSlide);

    });

});

setInterval(()=>{

    currentSlide++;

    if(currentSlide>=testimonials.length){

        currentSlide=0;

    }

    showSlide(currentSlide);

},4000);