import { m as motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { reveal } from "../shared/animation"
import Icon from "../shared/Icon"
import { photo } from "../../data/home"
import { insightImages } from "../../data/visuals"
import useMotionPreference from "../shared/useMotionPreference"
export default function HeroSection({
  openProposal,
}: {
  openProposal: () => void
}) {
  const reduced = useMotionPreference()
  const section = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 40])
  return (
    <motion.section
      ref={section}
      {...reveal(reduced)}
      className="hero section-container"
    >
      <motion.div className="hero-copy" {...reveal(reduced)}>
        <div className="eyebrow hero-eyebrow">
          <span className="little-line" />
          HUMAN UNDERSTANDING. BUSINESS CLARITY.
        </div>
        <h1>
          Research That Turns
          <br />
          <em>Human Understanding</em>
          <br />
          Into Business
          <br className="desktop-break" /> Advantage
        </h1>
        <p>
          NexGen is an integrated market research, consumer insights and data
          intelligence company delivering end-to-end research solutions across
          India and international markets.
        </p>
        <div className="hero-buttons">
          <button className="button" onClick={openProposal}>
            Start a Research Project
            <Icon name="northeast" />
          </button>
          <a className="text-link" href="#capabilities">
            Explore Our Capabilities
            <Icon />
          </a>
        </div>
        <div className="hero-footnote">
          <span className="status-dot" /> INDEPENDENT THINKING. INTEGRATED
          RESEARCH.{" "}
          <span className="hero-footnote-location">INDIA & BEYOND</span>
        </div>
      </motion.div>
      <motion.div className="hero-visual" {...reveal(reduced, 0.1)}>
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="image-frame">
          <motion.img
            style={{ y: reduced ? 0 : imageY }}
            src={photo}
            width="1200"
            height="800"
            fetchPriority="high"
            decoding="async"
            alt="Illustrative research discussion; not an actual NexGen project"
          />
          <div
            className="photo-caption"
            title="Illustrative photograph, not a NexGen project"
          >
            <span className="status-dot" />
            IT STARTS WITH PEOPLE.
          </div>
        </div>
        <motion.div className="hero-inset-photo" {...reveal(reduced, 0.15)}>
          <img
            src={insightImages[0].src}
            alt={insightImages[0].alt}
            width={insightImages[0].width}
            height={insightImages[0].height}
            decoding="async"
          />
        </motion.div>
        <div className="floating-label">
          <span className="icon-circle">
            <Icon name="people" />
          </span>
          <div>
            <span className="eyebrow">BEHIND EVERY DATA POINT</span>
            <strong>A human story.</strong>
          </div>
        </div>
        <div className="insight-card">
          <div className="insight-card-top">
            <span className="eyebrow">THE NEXGEN PERSPECTIVE</span>
            <Icon name="spark" />
          </div>
          <p>
            From better questions.
            <br />
            To <em>clearer possibilities.</em>
          </p>
          <figure className="mini-chart-figure">
            <div className="mini-chart" aria-hidden="true">
              {Array.from({ length: 9 }, (_, index) => (
                <motion.span
                  key={index}
                  initial={reduced ? false : { scaleY: 0.4, opacity: 0.6 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.035 }}
                />
              ))}
            </div>
            <figcaption>Illustrative graphic, not research results.</figcaption>
          </figure>
          <div className="insight-card-bottom">
            <span>Evidence-led. Human-centred.</span>
            <Icon name="northeast" />
          </div>
        </div>
        <span className="visual-note">PERSPECTIVE CHANGES EVERYTHING</span>
      </motion.div>
    </motion.section>
  )
}
