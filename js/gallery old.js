/*====================================
    EARTHCRAFT GALLERY
====================================*/

console.log("✅ EarthCraft Gallery JS Loaded Successfully");

/*=========================================
    STEP 2 : SELECT HTML ELEMENTS
=========================================*/

// Search Input
const searchInput = document.getElementById("gallerySearch");

// Filter Buttons
const filterButtons = document.querySelectorAll(".filter-btn");

// Gallery Items
const galleryItems = document.querySelectorAll(".gallery-item");

// Lightbox
const lightbox = document.querySelector(".lightbox");

// Lightbox Image
const lightboxImage = document.getElementById("lightbox-img");

// Close Button
const closeLightbox = document.querySelector(".close-lightbox");

// Previous Button
const prevButton = document.querySelector(".prev-btn");

// Next Button
const nextButton = document.querySelector(".next-btn");

console.log("✅ All HTML Elements Selected Successfully");
// Current Active Filter
let currentFilter = "all";

/*=========================================
    STEP 3 : SEARCH FUNCTIONALITY
=========================================*/

/*=========================================
    SEARCH
=========================================*/

searchInput.addEventListener("keyup", function () {

    updateGallery();

});
/*=========================================
    STEP 4 : FILTER FUNCTIONALITY
=========================================*/
/*=========================================
    FILTER
=========================================*/

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });

        this.classList.add("active");

        currentFilter = this.dataset.filter;

        updateGallery();

    });

});
/*=========================================
    UPDATE GALLERY
=========================================*/

function updateGallery() {

    const searchText = searchInput.value.toLowerCase().trim();

    galleryItems.forEach(function (item) {

        const itemName = item.dataset.name.toLowerCase();
        const itemCategory = item.dataset.category;

        const searchMatch = itemName.includes(searchText);

        const filterMatch =
            currentFilter === "all" ||
            itemCategory === currentFilter;

        if (searchMatch && filterMatch) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });

}
/*=========================================
    STEP 6 : LIGHTBOX VARIABLES
=========================================*/

// Sabhi Gallery Images
const galleryCards = document.querySelectorAll(".gallery-item");
// Current Image Index
let currentImageIndex = 0;
/*=========================================
    OPEN LIGHTBOX
=========================================*/

galleryImages.forEach(function(image, index){

      card.addEventListener("click", function(){

        currentImageIndex = index;
    const image = card.querySelector("img");
       lightboxImage.src = image.src;

          lightboxImage.alt = image.alt;
    lightbox.classList.add("show");

    });

});/*=========================================
    STEP 7 : CLOSE LIGHTBOX
=========================================*/

closeLightbox.addEventListener("click", function () {

    lightbox.classList.remove("show");

});
/*=========================================
    CLOSE WHEN CLICKING BACKGROUND
=========================================*/

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        lightbox.classList.remove("show");

    }

});
/*=========================================
    CLOSE USING ESC KEY
=========================================*/

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        lightbox.classList.remove("show");

    }

});
/*=========================================
    STEP 8 : SHOW CURRENT IMAGE
=========================================*/

function showCurrentImage() {

    const image = galleryCards[currentImageIndex].querySelector("img");
lightboxImage.src = image.src;

lightboxImage.alt = image.alt;

}
/*=========================================
    NEXT IMAGE
=========================================*/

nextButton.addEventListener("click", function () {

    currentImageIndex++;

    if (currentImageIndex >= galleryImages.length) {

        currentImageIndex = 0;

    }

    showCurrentImage();

});
/*=========================================
    PREVIOUS IMAGE
=========================================*/

prevButton.addEventListener("click", function () {

    currentImageIndex--;

    if (currentImageIndex < 0) {

        currentImageIndex = galleryImages.length - 1;

    }

    showCurrentImage();

});
/*=========================================
    KEYBOARD NAVIGATION
=========================================*/

document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") {

        currentImageIndex++;

        if (currentImageIndex >= galleryImages.length) {

            currentImageIndex = 0;

        }

        showCurrentImage();

    }

    if (event.key === "ArrowLeft") {

        currentImageIndex--;

        if (currentImageIndex < 0) {

            currentImageIndex = galleryImages.length - 1;

        }

        showCurrentImage();

    }

});
/*=========================================
    STEP 9 : SELECT COUNTERS
=========================================*/

const counters = document.querySelectorAll(".counter");

console.log(counters);
/*=========================================
    STEP 9 : COUNTER ANIMATION
=========================================*/

// Select All Counters


// Counter Function

function startCounter(counter){

    const target = Number(counter.dataset.target);

    let count = 0;

    const speed = target / 100;

    const updateCounter = function(){

        count += speed;

        if(count < target){

            counter.innerText = Math.ceil(count);

            requestAnimationFrame(updateCounter);

        }else{

            counter.innerText = target + "+";

        }

    };

    updateCounter();

}

/*=========================================
    INTERSECTION OBSERVER
=========================================*/

const counterSection = document.querySelector(".gallery-stats");

let counterStarted = false;

const observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting && !counterStarted){

            counters.forEach(function(counter){

                startCounter(counter);

            });

            counterStarted = true;

        }

    });

},{
    threshold:0.4
});

observer.observe(counterSection);
console.log("Counter JS Loaded");