import { m as motion } from "framer-motion"
import useMotionPreference from "../shared/useMotionPreference"
import { reveal } from "../shared/animation"
import Icon from "../shared/Icon"
export default function ClosingCTA({
  openProposal,
}: {
  openProposal: () => void
}) {
  const reduced = useMotionPreference()
  return (
    <motion.section
      {...reveal(reduced)}
      className="closing section-container"
      id="contact"
    >
      <div className="closing-lead">
        <div className="eyebrow">
          <span className="little-line" />
          YOUR NEXT CHAPTER STARTS WITH A QUESTION
        </div>
        <h2>
          What would you like
          <br />
          to <em>understand?</em>
        </h2>
      </div>
      <div className="closing-aside">
        <p>
          A detailed brief or an early idea. Let’s find the right way forward.
        </p>
        <button className="button" onClick={openProposal}>
          Let’s Talk Research
          <Icon name="northeast" />
        </button>
      </div>
    </motion.section>
  )
}
