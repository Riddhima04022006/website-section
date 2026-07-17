(function(){
gsap.registerPlugin(ScrollTrigger);

const isDesktop = window.matchMedia("(min-width: 1025px)").matches;

if (isDesktop) {

// -----------------------------
// Spread Animation (desktop only — relies on large pixel offsets that
// assume the wide #icons_box grid-stack layout used above 1024px)
// -----------------------------

const spread = gsap.timeline({
    scrollTrigger: {
        trigger: "#icons",
        start: "top 70%",
        toggleActions: "play none none none"
    },

    onComplete: startFloating
});

spread
.to("#icon1_box", {
    x: -260-340,
    y: -230,
    duration: 1.2,
    ease: "power3.out"
}, 0)

.to("#icon2_box", {
    x: 260+340,
    y: -230,
    duration: 1.2,
    ease: "power3.out"
}, 0)

.to("#icon3_box", {
    x: -260-340,
    y: 0,
    duration: 1.2,
    ease: "power3.out"
}, 0)

.to("#icon4_box", {
    x: 260+340,
    y: 0,
    duration: 1.2,
    ease: "power3.out"
}, 0)

.to("#icon5_box", {
    x: -260-340,
    y: 230,
    duration: 1.2,
    ease: "power3.out"
}, 0)

.to("#icon6_box", {
    x: 260+340,
    y: 230,
    duration: 1.2,
    ease: "power3.out"
}, 0)

.to("#icon7_box", {
    x: 0,
    y: 230,
    duration: 1.2,
    ease: "power3.out"
}, 0);

// ------------------------------------
// Floating Icons
// ------------------------------------

function floatIcon(selector){

    function animate(){

        gsap.to(selector,{

            x: gsap.utils.random(-75,75),
            y: gsap.utils.random(-75,75),

            duration: gsap.utils.random(1.5,3),

            ease:"sine.inOut",

            onComplete: animate
        });

    }

    animate();

}

function startFloating(){

    floatIcon("#icon1");
    floatIcon("#icon2");
    floatIcon("#icon3");
    floatIcon("#icon4");
    floatIcon("#icon5");
    floatIcon("#icon6");
    floatIcon("#icon7");

}

} else {

// Mobile/tablet: icons are pinned to the four corners + mid-edges around
// the centered heading text (see main.css), so the desktop's big spread
// offsets don't apply. Fade each one in where it already sits, and let them
// float continuously right away — floating is a subtle idle motion, so it
// doesn't need to wait on the (staggered, so unreliable-to-chain-off-of)
// fade-in tween to finish.
gsap.set("#icons_box > *", { opacity: 0, scale: 0.6 });

gsap.to("#icons_box > *", {
    opacity: 1,
    scale: 1,
    duration: 0.7,
    stagger: 0.12,
    ease: "back.out(1.6)",
    scrollTrigger: {
        trigger: "#icons",
        start: "top 85%",
        once: true
    }
});

function floatMobileIcon(selector){
    function animate(){
        gsap.to(selector, {
            x: gsap.utils.random(-10, 10),
            y: gsap.utils.random(-10, 10),
            duration: gsap.utils.random(2, 3.5),
            ease: "sine.inOut",
            onComplete: animate
        });
    }
    animate();
}

floatMobileIcon("#icon1");
floatMobileIcon("#icon2");
floatMobileIcon("#icon3");
floatMobileIcon("#icon4");
floatMobileIcon("#icon5");
floatMobileIcon("#icon6");
floatMobileIcon("#icon7");

}
})();