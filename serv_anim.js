(function(){
// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const isDesktop = window.matchMedia("(min-width: 1025px)").matches;

if (!isDesktop) {
    const mobileCards = document.querySelectorAll(".msrv_card");

    // Fade + rise reveal on scroll
    gsap.set(mobileCards, { opacity: 0, y: 30 });
    gsap.to(mobileCards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#service_mobile",
            start: "top 80%"
        }
    });

    // Handle single-card animation
    mobileCards.forEach((card) => {
        card.addEventListener("click", () => {
            const isActive = card.classList.contains("dash-active");

            // Remove class from ALL cards
            mobileCards.forEach(c => c.classList.remove("dash-active"));

            // If the clicked card wasn't already active, add the class
            if (!isActive) {
                card.classList.add("dash-active");
            }
        });
    });
}else {

// Initial positions (boxes start away from their final positions)
gsap.set("#serv_box1", {
    x: -20,
    opacity: 0
});

gsap.set("#serv_box2", {
    x: -20,
    y: -20,
    opacity: 0
});

gsap.set("#serv_box3", {
    y: 20,
    opacity: 0
});

gsap.set("#serv_box4", {
    x: 20,
    opacity: 0
});

gsap.set("#serv_box5", {
    x: 20,
    y: 20,
    opacity: 0
});

// Timeline
const serviceTL = gsap.timeline({
    scrollTrigger: {
        trigger: "#service",
        start: "top 75%",
        end: "top 30%",
        scrub: 1.2,
        markers: false // Change to true if you want to debug
    }
});

// All boxes move together
serviceTL
.to("#serv_box1", {
    x: 200,
    opacity: 1,
    ease: "none"
}, 0)

.to("#serv_box2", {
    x: 330,
    y: -80,
    opacity: 1,
    ease: "none"
}, 0)

.to("#serv_box3", {
    y: -10,
    opacity: 1,
    ease: "none"
}, 0)

.to("#serv_box4", {
    x: -200,
    opacity: 1,
    ease: "none"
}, 0)

.to("#serv_box5", {
    x: -330,
    y: -80,
    opacity: 1,
    ease: "none"
}, 0);

}
})();