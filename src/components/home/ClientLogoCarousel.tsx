import {
  m as motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
} from "framer-motion"
import { reveal } from "../shared/animation"
import Icon from "../shared/Icon"
import { useEffect, useRef, useState } from "react"
import useMotionPreference from "../shared/useMotionPreference"
export default function ClientLogoCarousel() {
  const reduced = useMotionPreference()
  const [carouselPaused, setCarouselPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const section = useRef<HTMLElement>(null)
  const firstSet = useRef<HTMLDivElement>(null)
  const setWidth = useRef(0)
  const x = useMotionValue(0)
  const inView = useInView(section)

  useEffect(() => {
    const node = firstSet.current
    if (!node) return
    const measure = () => {
      setWidth.current = node.getBoundingClientRect().width
    }
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    measure()
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (reduced) x.set(0)
  }, [reduced, x])
  useAnimationFrame((_, delta) => {
    if (
      reduced ||
      carouselPaused ||
      hovered ||
      !inView ||
      document.hidden ||
      !setWidth.current
    )
      return
    // Equal logo sets loop seamlessly; pause retains the current position.
    x.set(-((-x.get() + Math.min(delta, 64) * 0.022) % setWidth.current))
  })
  return (
    <motion.section
      ref={section}
      {...reveal(reduced)}
      className="clients section-container"
      aria-label="Client logos"
    >
      <div className="clients-heading">
        <span className="eyebrow">PARTNERS IN PROGRESS</span>
        <div className="carousel-heading-actions">
          <p>Partnering with organisations that move the world forward.</p>
          <button
            className="carousel-control"
            aria-pressed={carouselPaused}
            onClick={() => setCarouselPaused(!carouselPaused)}
          >
            {carouselPaused ? "Resume motion" : "Pause motion"}
          </button>
        </div>
      </div>
      <div
        className="logo-window"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          className={carouselPaused ? "logo-track paused" : "logo-track"}
          style={{ x }}
        >
          {[0, 1, 2, 3].map((set) => (
            <div
              className="logo-set"
              ref={set === 0 ? firstSet : undefined}
              key={set}
              aria-hidden={set > 0}
            >
              {[
                ["akshaya-patra", "The Akshaya Patra Foundation"],
                ["baxter", "Baxter"],
                ["coloplast", "Coloplast"],
                ["liqvid", "LIQVID"],
                ["quikr", "Quikr"],
              ].map(([file, alt]) => (
                <div className="client-logo" key={file}>
                  <img
                    src={`/assets/${file}.png`}
                    alt={set === 0 ? alt : ""}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
