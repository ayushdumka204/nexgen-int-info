export const reveal = (reduced: boolean | null, delay = 0) => ({
  initial: reduced ? false as const : { opacity: 0.85, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay },
})
