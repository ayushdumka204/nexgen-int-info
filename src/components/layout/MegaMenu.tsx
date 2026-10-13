import { m as motion, useIsPresent } from "framer-motion"
import Icon from "../shared/Icon"
import { navigation, type Navigate } from "../../data/home"
import useMotionPreference from "../shared/useMotionPreference"
export default function MegaMenu({
  menu,
  onNavigate,
  onEscape,
}: {
  menu: string
  onNavigate: Navigate
  onEscape: () => void
}) {
  const reduced = useMotionPreference()
  const present = useIsPresent()
  return (
    <motion.div
      className="mega-menu"
      initial={reduced ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -6 }}
      transition={{ duration: reduced ? 0 : 0.18 }}
      id={present ? "navigation-submenu" : undefined}
      inert={!present}
      aria-hidden={!present}
      aria-label={`${menu} links`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          onEscape()
        }
      }}
    >
      <div className="mega-intro">
        <span className="eyebrow">EXPLORE {menu.toUpperCase()}</span>
        <h3>
          {menu === "Solutions"
            ? "Focused expertise.\nBetter decisions."
            : menu === "Methodologies"
              ? "The right approach.\nMeaningful answers."
              : "A deeper understanding.\nA clearer way forward."}
        </h3>
        <p>
          Research built around your questions, your people and your
          opportunities.
        </p>
      </div>
      <div className="mega-links">
        {navigation[menu].map((link) => (
          <button key={link} onClick={() => onNavigate(link, menu)}>
            {link}
            <Icon name="northeast" />
          </button>
        ))}
      </div>
    </motion.div>
  )
}
