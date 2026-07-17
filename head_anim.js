(function(){
gsap.registerPlugin(ScrollTrigger);

// Custom @font-face fonts (the "Heading" font used across this page) can
// finish loading after ScrollTrigger has already measured pixel-based
// start/end positions off the fallback font's metrics. That shift is enough
// to leave scroll-linked animations (like the icon spread) stuck in their
// pre-scroll state. Recalculating once fonts are actually ready — and once
// more on full window load — keeps every trigger's numbers accurate.
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
}
window.addEventListener("load", () => ScrollTrigger.refresh());

const isDesktop = window.matchMedia("(min-width: 1025px)").matches;

// Initial state — headings start low (as if entering from the bottom of the
// screen) and fade in. Mobile gets a bigger offset since its viewport is
// narrower/taller, so the "slide up" reads clearly.
gsap.set(".icon_heads", {
    y: isDesktop ? 100 : 240,
    opacity: 0
});

const tl = gsap.timeline({
    scrollTrigger:{
        trigger:"#icons",
        start:"top top",
        end: isDesktop ? "+=2500" : "+=2100",
        pin:true,
        scrub:true,
        refreshPriority: 1
    }
});

// Reveal one heading per scroll step
tl.to("#icon_head1",{
    y:0,
    opacity:1,
    ease:"power2.out",
    duration:1
})

.to("#icon_head2",{
    y:0,
    opacity:1,
    ease:"power2.out",
    duration:1
})

.to("#icon_head3",{
    y:0,
    opacity:1,
    ease:"power2.out",
    duration:1
});
})();