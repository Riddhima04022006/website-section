(function(){
    gsap.registerPlugin(ScrollTrigger);

    const isDesktop = window.matchMedia("(min-width: 1025px)").matches;

    if (!isDesktop) {
        let st;

        function build(){
            if (st) st.kill(true);

            st = ScrollTrigger.create({
                trigger: "#footer",
                start: "bottom bottom", 
                // end ko "bottom+=1" karo, taaki scroll bar wahi khatam ho jaye
                // aur extra khali jagah (dead space) na bane
                end: "bottom+=1", 
                pin: true,
                pinSpacing: false,
                scrub: false, // Animation nahi hai, toh scrub ki zaroorat nahi
            });
        }
        
        // Load aur resize par trigger re-build karna zaroori hai
        window.addEventListener("load", build);
        window.addEventListener("resize", build); 
    }
})();