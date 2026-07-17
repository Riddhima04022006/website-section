gsap.registerPlugin(ScrollTrigger);

// #right_hero (dash + phone mockup) is hidden on mobile/tablet, so this
// scroll-linked 3D animation only needs to run on desktop.
if (window.matchMedia("(min-width: 1025px)").matches) {

const wrapper = document.querySelector("#wrapper");
const destination = document.querySelector("#transition_space");

const start = wrapper.getBoundingClientRect();
const end = destination.getBoundingClientRect();

const moveX =
    end.left +
    end.width / 2 -
    (start.left + start.width / 2);

const moveY =
    end.top +
    end.height / 2 -
    (start.top + start.height / 2);

gsap.timeline({
    scrollTrigger:{
        trigger:"#transition_space",
        start:"top 80%",
        end:"top 20%",
        scrub:1.3
    }
})
.to(wrapper,{
    x:moveX-20,
    y:moveY+50,
    rotationY:0,
    rotationZ:0,
    rotationX:0,
    scale:0.68,
    duration:1,
    ease:"none"
})
.to("#dash",{
    boxShadow:"0px 0px 0px rgba(0,0,0,0)"
},0)
.to("#phone",{
    filter:"drop-shadow(0px 0px 0px rgba(0,0,0,0))"
},0);

}