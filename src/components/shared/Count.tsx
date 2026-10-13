import { animate, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import useMotionPreference from "./useMotionPreference"

export default function Count() {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true })
  const reduced = useMotionPreference()
  const played = useRef(false)
  const [value, setValue] = useState(20)
  useEffect(() => {
    if (reduced) {
      // Disabling motion mid-count must leave the verified final value visible.
      setValue(20)
      if (visible) played.current = true
      return
    }
    if (!visible || played.current) return
    played.current = true
    const controls = animate(0, 20, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    })
    return () => {
      controls.stop()
      played.current = false
    }
  }, [visible, reduced])
  return (
    <span ref={ref} aria-label="20 plus">
      <span aria-hidden="true">{value}+</span>
    </span>
  )
}
