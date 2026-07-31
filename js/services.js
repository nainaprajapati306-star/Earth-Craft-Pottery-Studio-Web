/*====================================
        SELECT ELEMENTS
=====================================*/

const serviceCards = document.querySelectorAll(".service-card");

const whyCards = document.querySelectorAll(".why-card");

const processCards = document.querySelectorAll(".process-card");

const buttons = document.querySelectorAll(".btn");
/*====================================
        SCROLL REVEAL
=====================================*/

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

serviceCards.forEach(card=>observer.observe(card));

whyCards.forEach(card=>observer.observe(card));

processCards.forEach(card=>observer.observe(card));
/*====================================
        STAGGER ANIMATION
=====================================*/

serviceCards.forEach((card,index)=>{

    card.style.transitionDelay=`${index*0.15}s`;

});

whyCards.forEach((card,index)=>{

    card.style.transitionDelay=`${index*0.15}s`;

});

processCards.forEach((card,index)=>{

    card.style.transitionDelay=`${index*0.15}s`;

});
/*====================================
        BUTTON RIPPLE
=====================================*/

buttons.forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.classList.add("ripple");

        const rect=this.getBoundingClientRect();

        ripple.style.left=`${e.clientX-rect.left}px`;

        ripple.style.top=`${e.clientY-rect.top}px`;

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});
/*====================================
        SMOOTH SCROLL
=====================================*/

document.querySelectorAll('a[href^="#"]').forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});