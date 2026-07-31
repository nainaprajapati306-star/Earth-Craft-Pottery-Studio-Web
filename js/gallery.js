/*====================================
    EARTHCRAFT GALLERY
====================================*/

console.log("✅ EarthCraft Gallery JS Loaded");

/*====================================
    STEP 1 : SELECT HTML ELEMENTS
====================================*/

// Search Input

const searchInput = document.getElementById("gallerySearch");

// Filter Buttons

const filterButtons = document.querySelectorAll(".filter-btn");

// Gallery Cards

const galleryItems = document.querySelectorAll(".gallery-item");

// Counter Numbers

const counters = document.querySelectorAll(".counter");

console.log(searchInput);

console.log(filterButtons);

console.log(galleryItems);

console.log(counters);
/*====================================
    CURRENT FILTER
====================================*/

let currentFilter = "all";
/*====================================
    STEP 2 : SEARCH FUNCTIONALITY
====================================*/

searchInput.addEventListener("keyup", function () {

    updateGallery();

});

/*====================================
    STEP 3 : FILTER FUNCTIONALITY
====================================*/

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Remove Active Class

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });

        // Add Active Class

        this.classList.add("active");

        // Save Current Filter

        currentFilter = this.dataset.filter;

        updateGallery();

    });

});
/*====================================
    STEP 4 : UPDATE GALLERY
====================================*/

function updateGallery() {

    const searchValue = searchInput.value.toLowerCase().trim();

    galleryItems.forEach(function (item) {

        const productName = item.dataset.name.toLowerCase();

        const productCategory = item.dataset.category;

        const searchMatch = productName.includes(searchValue);

        const filterMatch =
            currentFilter === "all" ||
            productCategory === currentFilter;

        if (searchMatch && filterMatch) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });

}

/*====================================
    STEP 5 : COUNTER ANIMATION
====================================*/

// Counter Function

function startCounter(counter) {

    const target = Number(counter.dataset.target);

    let count = 0;

    const increment = target / 100;

    function updateCounter() {

        count += increment;

        if (count < target) {

            counter.innerText = Math.ceil(count);

            requestAnimationFrame(updateCounter);

        } else {

            counter.innerText = target + "+";

        }

    }

    updateCounter();

}
/*====================================
    STEP 6 : INTERSECTION OBSERVER
====================================*/

const statsSection = document.querySelector(".gallery-stats");

let counterStarted = false;

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting && !counterStarted) {

            counters.forEach(function (counter) {

                startCounter(counter);

            });

            counterStarted = true;

        }

    });

}, {

    threshold: 0.4

});

observer.observe(statsSection);
/*====================================
    STEP 7 : SCROLL ANIMATION
====================================*/

const animatedItems = document.querySelectorAll(".gallery-item, .stat-card");

const animationObserver = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

animatedItems.forEach(function(item){

    animationObserver.observe(item);

});
/*====================================
        LIGHTBOX
=====================================*/

const images = document.querySelectorAll(".gallery-img");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".close");

const prevBtn = document.querySelector(".prev");

const nextBtn = document.querySelector(".next");

let current = 0;

images.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        current=index;

        showImage();

    });

});

function showImage(){

    lightbox.classList.add("active");

    lightboxImg.src=images[current].src;

}

closeBtn.addEventListener("click",()=>{

    lightbox.classList.remove("active");

});

nextBtn.addEventListener("click",()=>{

    current++;

    if(current>=images.length){

        current=0;

    }

    showImage();

});

prevBtn.addEventListener("click",()=>{

    current--;

    if(current<0){

        current=images.length-1;

    }

    showImage();

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("active");

    }

});

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active")) return;

    if(e.key==="ArrowRight"){

        nextBtn.click();

    }

    if(e.key==="ArrowLeft"){

        prevBtn.click();

    }

    if(e.key==="Escape"){

        closeBtn.click();

    }

});