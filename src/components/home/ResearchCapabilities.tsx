import { m as motion } from "framer-motion"
import useMotionPreference from "../shared/useMotionPreference"
import { reveal } from "../shared/animation"
import Icon from "../shared/Icon"
import { capabilities, type Capability } from "../../data/home"
import { capabilityImages } from "../../data/visuals"
export default function ResearchCapabilities({
  onSelect,
}: {
  onSelect: (card: Capability) => void
}) {
  const reduced = useMotionPreference()
  return (
    <motion.section
      {...reveal(reduced)}
      className="capabilities-section section-container"
      id="capabilities"
    >
      <div className="section-heading">
        <div>
          <div className="eyebrow">
            <span className="little-line" />
            OUR CAPABILITIES
          </div>
          <h2>
            Better understanding.
            <br />
            <em>Bigger possibilities.</em>
          </h2>
        </div>
        <div className="heading-aside">
          <p>
            From your first business question to your next big move. Research
            expertise for decisions that matter.
          </p>
          <a className="text-link" href="#approach">
            Discover our approach
            <Icon name="northeast" />
          </a>
        </div>
      </div>
      <div
        className="capability-grid"
        aria-label="Research capabilities. Swipe horizontally on mobile to explore."
      >
        {capabilities.map((card, index) => (
          <motion.button
            {...reveal(reduced, index * 0.04)}
            whileHover={reduced ? undefined : { y: -4 }}
            className={`capability-card ${card.tone} capability-with-photo`}
            onClick={() => onSelect(card)}
            key={card.title}
          >
            <div className="card-top">
              <span className="capability-icon">
                <Icon name={card.icon} />
              </span>
              <span className="card-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="eyebrow">{card.tag}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <div className="capability-photo">
              <img
                src={capabilityImages[card.title].src}
                alt={capabilityImages[card.title].alt}
                width={capabilityImages[card.title].width}
                height={capabilityImages[card.title].height}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="card-bottom">
              <span>Explore capability</span>
              <span className="card-arrow">
                <Icon name="northeast" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>
      <div className="capability-swipe-hint" aria-hidden="true">
        <span>Swipe to explore</span>
        <span className="capability-swipe-line" />
        <span>01 — {String(capabilities.length).padStart(2, "0")}</span>
      </div>
    </motion.section>
  )
}
