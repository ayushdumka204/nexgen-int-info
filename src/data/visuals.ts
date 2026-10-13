export const insightImages = [
  {
    src: "/assets/consumer-conversation.jpg",
    alt: "Illustrative consumer conversation; not an actual NexGen project",
    width: 900,
    height: 836,
  },
  {
    src: "/assets/professional-interview.jpg",
    alt: "Illustrative professional conversation; not an actual NexGen project",
    width: 1000,
    height: 662,
  },
]

type CapabilityImage = {
  src: string
  alt: string
  width: number
  height: number
}

export const capabilityImages: Record<string, CapabilityImage> = {
  "Consumer Insights": insightImages[0],
  "Brand & Communication Research": insightImages[1],
  "Market Intelligence": {
    src: "/assets/market-intelligence.jpg",
    alt: "Illustrative commercial city skyline; not an actual NexGen project",
    width: 600,
    height: 1000,
  },
  "Customer Experience": {
    src: "/assets/customer-experience.jpg",
    alt: "Illustrative customer interaction at a shop; not an actual NexGen project",
    width: 600,
    height: 1000,
  },
  "B2B Intelligence": {
    src: "/assets/b2b-intelligence.jpg",
    alt: "Illustrative professional business discussion; not an actual NexGen project",
    width: 600,
    height: 1000,
  },
  "Product & Innovation Research": {
    src: "/assets/product-innovation.jpg",
    alt: "Illustrative product concept sketches and hands-on design; not an actual NexGen project",
    width: 600,
    height: 1000,
  },
  "Retail & Shopper Intelligence": {
    src: "/assets/retail-shopper.jpg",
    alt: "Illustrative stocked retail aisle; not an actual NexGen project",
    width: 600,
    height: 1000,
  },
  "Social & Development Research": {
    src: "/assets/social-development.jpg",
    alt: "Illustrative community daily life; not an actual NexGen project",
    width: 600,
    height: 1000,
  },
}
