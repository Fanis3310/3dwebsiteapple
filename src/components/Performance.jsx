import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import {
    performanceImages,
    performanceImgPositions,
} from "../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const sectionRef = useRef(null);

    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) return;

            const ctx = gsap.context(() => {
                // TEXT: fade + stagger + slight upward motion
                gsap.fromTo(
                    ".content p, .content span",
                    { opacity: 0, y: 24 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        stagger: 0.08,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".content",
                            start: "top 80%",
                            end: "top 40%",
                            scrub: 1,
                        },
                    }
                );

                // Heading subtle zoom-in
                gsap.fromTo(
                    "h2",
                    { opacity: 0, y: 20, scale: 0.96 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionEl,
                            start: "top 85%",
                            end: "top 60%",
                            scrub: true,
                        },
                    }
                );

                if (isMobile) return;

                // MAIN SCROLL TIMELINE: parallax + positioning
                const tl = gsap.timeline({
                    defaults: {
                        duration: 2,
                        ease: "power2.inOut",
                        overwrite: "auto",
                    },
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2,
                        invalidateOnRefresh: true,
                    },
                });

                performanceImgPositions.forEach((item) => {
                    if (item.id === "p5") return;

                    const selector = `.${item.id}`;
                    const vars = {}; // <- plain JS object, no type annotation

                    if (typeof item.left === "number") vars.left = `${item.left}%`;
                    if (typeof item.right === "number") vars.right = `${item.right}%`;
                    if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;
                    if (item.transform) vars.transform = item.transform;

                    // Optional depth-based parallax if you add depth in your constants
                    const depth = typeof item.depth === "number" ? item.depth : 1;
                    vars.y = `-${10 * depth}%`;

                    tl.to(selector, vars, 0);
                });

                // FLOATING / IDLE MOTION FOR IMAGES
                gsap.utils.toArray(".perf-img").forEach((img, i) => {
                    gsap.to(img, {
                        y: "+=12",
                        rotation: gsap.utils.random(-2, 2),
                        duration: gsap.utils.random(3, 5),
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: -1,
                        delay: i * 0.2,
                    });
                });

                // HOVER EFFECTS (scale + glow)
                gsap.utils.toArray(".perf-img").forEach((img) => {
                    const hoverTl = gsap.timeline({ paused: true });
                    hoverTl.to(img, {
                        scale: 1.06,
                        filter: "drop-shadow(0 0 16px rgba(0,0,0,0.45))",
                        duration: 0.4,
                        ease: "power2.out",
                    });

                    img.addEventListener("mouseenter", () => hoverTl.play());
                    img.addEventListener("mouseleave", () => hoverTl.reverse());
                });
            }, sectionEl);

            return () => ctx.revert();
        },
        { scope: sectionRef, dependencies: [isMobile] }
    );

    return (
        <section id="performance" ref={sectionRef} className="performance-section">
            <h2>Next-level graphics performance. Game on.</h2>

            <div className="wrapper">
                {performanceImages.map((item, index) => (
                    <img
                        key={index}
                        src={item.src}
                        className={`perf-img ${item.id}`}
                        alt={item.alt || `Performance Image #${index + 1}`}
                    />
                ))}
            </div>

            <div className="content">
                <p>
                    Run graphics-intensive workflows with a responsiveness that keeps up
                    with your imagination.{" "}
                    <span className="text-white">
            Gaming feels more immersive and realistic than ever.
          </span>{" "}
                    And Dynamic Caching optimizes fast on-chip memory to dramatically
                    increase average GPU utilization — driving a huge performance boost
                    for the most demanding pro apps and games.
                </p>
            </div>
        </section>
    );
};

export default Performance;
