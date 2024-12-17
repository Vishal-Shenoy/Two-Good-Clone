function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform
            ? "transform"
            : "fixed",
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locomotiveAnimation();

gsap.to("#leftPart>#imgContainer>img", {
    scrollTrigger: {
        trigger: "#imgContainer img",
        scroller: "#main",
        start: "top 0%",
        end: "top 5%",
        onEnter: () => gsap.to("#leftPart>#imgContainer>img", { transform: "translateY(-135%)", duration: .1, }),
        onLeaveBack: () => gsap.to("#leftPart>#imgContainer>img", { transform: "translateY(0%)", duration: .1, })
    }
});


gsap.to("#rightPart #rightNav>span", {
    scrollTrigger: {
        trigger: "#rightPart #rightNav>span",
        scroller: "#main",
        start: "top 0%",
        end: "top 5%",
        onEnter: () => gsap.to("#rightPart #rightNav>span", { transform: "translateY(-100%)", opacity: 0, duration: .2, }),
        onLeaveBack: () => gsap.to("#rightPart #rightNav>span", { transform: "translateY(0%)", opacity: 1, duration: .2, })
    }
})

gsap.from("#main #page1 h1 span", {
    transform: "translateY(100%)",
    opacity: 0,
    delay: 1,
    stagger: 0.2
})

gsap.from("#video-container video", {
    scale: 0.9,
    delay: 2,
    opacity: 0
})