import { m as motion } from "framer-motion"
import useMotionPreference from "../shared/useMotionPreference"
import { reveal } from "../shared/animation"
import Icon from "../shared/Icon"
import { useState } from "react"
import { steps } from "../../data/home"
export default function QualityProcess() {
  const reduced = useMotionPreference()
  const [step, setStep] = useState(0)
  return (
    <motion.section
      {...reveal(reduced)}
      className="method-section"
      id="quality"
    >
      <div className="section-container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="little-line" />
              QUALITY & RESEARCH PROCESS
            </div>
            <h2>
              Rigour in the process.
              <br />
              <em>Clarity in the outcome.</em>
            </h2>
          </div>
          <div className="heading-aside">
            <p>
              Quality runs through every stage: respondent verification,
              monitoring, validation, data consistency and analysis.
            </p>
            <span className="method-pill">
              <span className="status-dot" /> HUMAN INSIGHT × RELIABLE EVIDENCE
            </span>
          </div>
        </div>
        <div
          className="process-tabs"
          role="tablist"
          aria-label="Our research process"
        >
          {steps.map(([name], index) => (
            <button
              role="tab"
              id={`step-tab-${index}`}
              aria-controls="step-panel"
              aria-selected={step === index}
              tabIndex={step === index ? 0 : -1}
              className={step === index ? "process-tab active" : "process-tab"}
              key={name}
              onClick={() => setStep(index)}
              onKeyDown={(e) => {
                if (e.key === "Home" || e.key === "End") {
                  e.preventDefault()
                  const next = e.key === "Home" ? 0 : steps.length - 1
                  setStep(next)
                  document.getElementById(`step-tab-${next}`)?.focus()
                }
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault()
                  const next = (index + (e.key === "ArrowRight" ? 1 : 5)) % 6
                  setStep(next)
                  document.getElementById(`step-tab-${next}`)?.focus()
                }
              }}
            >
              <strong>{name}</strong>
              <Icon />
            </button>
          ))}
        </div>
        <div
          className="process-detail"
          role="tabpanel"
          id="step-panel"
          aria-labelledby={`step-tab-${step}`}
        >
          <div className="process-art">
            <svg
              className="process-connections"
              viewBox="0 0 310 280"
              aria-hidden="true"
            >
              <motion.path
                d="M48 80 Q105 50 155 140 Q220 165 265 155 M155 140 Q130 205 85 232"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                initial={reduced ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: reduced ? 0 : 1,
                  delay: reduced ? 0 : 0.15,
                }}
              />
            </svg>
            <div className="process-ring ring-outer" />
            <div className="process-ring ring-middle" />
            <div className="process-ring ring-inner" />
            <div className="process-center">
              <motion.span
                className="process-icon"
                key={step}
                initial={
                  reduced ? false : { opacity: 0.5, rotate: -8, scale: 0.9 }
                }
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: reduced ? 0 : 0.25 }}
              >
                <Icon
                  name={
                    [
                      "spark",
                      "layers",
                      "people",
                      "check",
                      "chart",
                      "northeast",
                    ][step]
                  }
                />
              </motion.span>
            </div>
            <span className="diagram-label label-one">YOUR QUESTION</span>
            <span className="diagram-label label-two">OUR EXPERTISE</span>
            <span className="diagram-label label-three">CLEAR DIRECTION</span>
            <span className="diagram-dot dot-one" />
            <span className="diagram-dot dot-two" />
          </div>
          <motion.div
            className="process-copy"
            key={step}
            initial={reduced ? false : { opacity: 0.8, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            <span className="eyebrow">{steps[step][0].toUpperCase()}</span>
            <h3>{steps[step][1]}</h3>
            <p>{steps[step][2]}</p>
            <div className="method-tags">
              <span>Verified respondents</span>
              <span>Field monitoring</span>
              <span>Data consistency</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
