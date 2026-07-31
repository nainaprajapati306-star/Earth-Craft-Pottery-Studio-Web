/*====================================
            PRELOADER
=====================================*/

window.addEventListener("load",()=>{

    const preloader = document.getElementById("preloader");

    setTimeout(()=>{

        preloader.style.opacity="0";
        preloader.style.visibility="hidden";

    },2000);

});
/*====================================
        SCROLL PROGRESS
=====================================*/

const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll",()=>{

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

    const progress =
    (scrollTop/scrollHeight)*100;

    progressBar.style.width =
    progress + "%";

});
/*====================================
        BACK TO TOP
=====================================*/

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 400){

        topBtn.classList.add("show");

    }

    else{

        topBtn.classList.remove("show");

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
/*====================================
        DARK MODE
=====================================*/

const themeBtn = document.querySelector(".theme-toggle");

const themeIcon = document.getElementById("themeIcon");

/* Load Saved Theme */

if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark");

    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");

}

/* Toggle Theme */

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");

        localStorage.setItem("theme","dark");

    }

    else{

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

        localStorage.setItem("theme","light");

    }

});
/*====================================
            FAQ
=====================================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const question = item.querySelector(".faq-question");

    question.addEventListener("click",()=>{

        faqItems.forEach(faq=>{

            if(faq!==item){

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});