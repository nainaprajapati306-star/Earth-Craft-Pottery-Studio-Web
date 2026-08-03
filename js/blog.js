/*====================================
        HERO PARALLAX
=====================================*/

const hero = document.querySelector(".blog-hero");
const image = document.querySelector(".blog-image");

hero.addEventListener("mousemove", (e) => {

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    image.style.transform = `translate(${x}px, ${y}px)`;

});

hero.addEventListener("mouseleave", () => {

    image.style.transform = "translate(0,0)";

});
/*====================================
        COUNTER
=====================================*/

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const update = () => {

        const target = +counter.dataset.target;

        const current = +counter.innerText;

        const increment = target / 100;

        if(current < target){

            counter.innerText = Math.ceil(current + increment);

            setTimeout(update,20);

        }

        else{

            if(target >= 1000){

                counter.innerText = (target/1000) + "K+";

            }

            else{

                counter.innerText = target + "+";

            }

        }

    }

    update();

});
/*====================================
        REVEAL
=====================================*/

const reveal = document.querySelectorAll(".reveal");

window.addEventListener("scroll",()=>{

    reveal.forEach(item=>{

        const top = item.getBoundingClientRect().top;

        if(top < window.innerHeight-100){

            item.classList.add("active");

        }

    });

});
/*====================================
        COUNTER ANIMATION
=====================================*/

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const counter = entry.target;

            const target = +counter.dataset.target;

            let count = 0;

            const speed = target / 100;

            const update = ()=>{

                count += speed;

                if(count < target){

                    if(target >= 1000){

                        counter.innerHTML =
                        Math.floor(count/1000) + "K+";

                    }else{

                        counter.innerHTML =
                        Math.floor(count) + "+";

                    }

                    requestAnimationFrame(update);

                }else{

                    if(target >=1000){

                        counter.innerHTML =
                        target/1000 + "K+";

                    }else{

                        counter.innerHTML =
                        target + "+";

                    }

                }

            }

            update();

            counterObserver.unobserve(counter);

        }

    });

},{threshold:.5});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});
/*====================================
        HERO IMAGE TILT
=====================================*/
const heroImage = document.querySelector(".image-wrapper");

if(heroImage){

    heroImage.addEventListener("mousemove",(e)=>{

        // Your code

    });


}

heroImage.addEventListener("mouseleave",()=>{

    heroImage.style.transform=
    "perspective(900px) rotateX(0) rotateY(0) scale(1)";

});
/*====================================
        REVEAL
=====================================*/

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll",()=>{

    reveals.forEach(item=>{

        const top = item.getBoundingClientRect().top;

        if(top < window.innerHeight-120){

            item.classList.add("active");

        }

    });

});

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let count = 0;

            const update = () => {

                count += target / 100;

                if(count < target){

                    if(target >= 1000){

                        counter.textContent = Math.floor(count / 1000) + "K+";

                    }else{

                        counter.textContent = Math.floor(count) + "+";

                    }

                    requestAnimationFrame(update);

                }else{

                    if(target >= 1000){

                        counter.textContent = (target / 1000) + "K+";

                    }else{

                        counter.textContent = target + "+";

                    }

                }

            };

            update();

            observer.unobserve(counter);

        }

    });

}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));
document.querySelectorAll(".counter").forEach(counter => {
    counter.textContent = counter.dataset.target + "+";
});
