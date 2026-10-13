import { m as motion } from "framer-motion"
import { useState } from "react"
import useMotionPreference from "../shared/useMotionPreference"
import Icon from "../shared/Icon"
import { reveal } from "../shared/animation"

const methods = [
  {
    title: "Quantitative",
    icon: "chart",
    question: "How many? How much?",
    copy: "Measure patterns, test hypotheses and scale understanding with statistical evidence.",
    tools: ["CAPI / F2F", "CATI", "CAWI", "Tracking studies"],
  },
  {
    title: "Qualitative",
    icon: "qualitative",
    question: "What matters—and why?",
    copy: "Explore motivations, experiences and the human context behind behaviour.",
    tools: [
      "Focus groups",
      "In-depth interviews",
      "Ethnography",
      "Expert interviews",
    ],
  },
  {
    title: "Hybrid Research",
    icon: "hybrid",
    question: "How does the full picture connect?",
    copy: "Bring statistical evidence and deeper human understanding into one research design.",
    tools: ["Integrated qual + quant", "Mixed methods"],
  },
  {
    title: "Secondary Intelligence",
    icon: "secondary",
    question: "What can existing evidence reveal?",
    copy: "Build context with published sources, market intelligence and expert validation.",
    tools: [
      "Published sources",
      "Competitor intelligence",
      "Expert validation",
    ],
  },
]

export default function MethodologiesSection() {
  const reduced = useMotionPreference()
  const [activeMethod, setActiveMethod] = useState(0)
  const active = methods[activeMethod]

  return (
    <section
      className="methodologies-section"
      id="approach"
      aria-labelledby="methodologies-heading"
    >
      <div className="methodologies-shell section-container">
        <motion.header className="boundaries-intro" {...reveal(reduced)}>
          <div className="eyebrow">
            <span className="little-line" />
            RESEARCH WITHOUT BOUNDARIES
          </div>
          <div className="boundaries-heading-row">
            <h2 id="methodologies-heading">
              One business question.
              <br />
              <em>The right combination.</em>
            </h2>
            <p>
              The business question determines the methodology—not the other
              way around.
            </p>
          </div>
        </motion.header>

        <div className="methodologies-directory">
          <motion.div
            className="methodology-orbit"
            {...reveal(reduced, 0.08)}
          >
            <span className="orbit-active-title" aria-live="polite">
              {active.title}
            </span>
            <div className="orbit-system">
              <span className="orbit-ring orbit-ring-outer" />
              <span className="orbit-ring orbit-ring-inner" />
              <span className="orbit-core">
                <Icon name={active.icon} />
              </span>
            </div>
            <span className="orbit-label">
              RESEARCH
              <br />/ CAPABILITY
            </span>
          </motion.div>

          <div className="methodology-list">
            {methods.map((method, index) => (
              <motion.button
                type="button"
                className={`methodology-row${activeMethod === index ? " active" : ""}`}
                key={method.title}
                {...reveal(reduced, 0.1 + index * 0.06)}
                aria-expanded={activeMethod === index}
                onMouseEnter={() => setActiveMethod(index)}
                onFocus={() => setActiveMethod(index)}
                onClick={() => setActiveMethod(index)}
              >
                <div className="methodology-row-title">
                  <h3>{method.title}</h3>
                  <span>{method.question}</span>
                </div>
                {activeMethod === index && (
                  <div className="methodology-row-detail">
                    <p>{method.copy}</p>
                    <div className="method-tags">
                      {method.tools.map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                  </div>
                )}
                <span className="methodology-row-arrow">
                  <Icon name="northeast" />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
