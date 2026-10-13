import { m as motion } from "framer-motion"
import useMotionPreference from "../shared/useMotionPreference"
import { reveal } from "../shared/animation"
import Count from "../shared/Count"

export default function AchievementStats() {
  const reduced = useMotionPreference()

  return (
    <motion.section
      {...reveal(reduced)}
      className="stats section-container"
      id="about"
      aria-label="Our research credentials"
    >
      <div className="stat stat-card">
        <div className="stat-number">
          <Count />
        </div>
        <p>Years of research excellence</p>
      </div>
      <div className="stat stat-card">
        <div className="stat-number">PAN-India</div>
        <p>Reach</p>
      </div>
      <div className="stat stat-card">
        <div className="stat-number">Multi-Industry</div>
        <p>Expertise</p>
      </div>
      <div className="stat stat-card">
        <div className="stat-number">Integrated</div>
        <p>Qual + Quant</p>
      </div>
    </motion.section>
  )
}
