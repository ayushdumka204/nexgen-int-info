import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Globe2,
  UsersRound,
  Sparkles,
  ChartNoAxesCombined,
  Heart,
  Network,
  Layers3,
  Check,
  X,
  Menu,
  Lightbulb,
  ShoppingBag,
  Leaf,
  ShieldCheck,
  MessageSquare,
  Combine,
  BookOpen,
} from "lucide-react"

const icons = {
  arrow: ArrowRight,
  northeast: ArrowUpRight,
  chevron: ChevronDown,
  globe: Globe2,
  people: UsersRound,
  spark: Sparkles,
  chart: ChartNoAxesCombined,
  heart: Heart,
  network: Network,
  layers: Layers3,
  check: Check,
  close: X,
  menu: Menu,
  lightbulb: Lightbulb,
  shopper: ShoppingBag,
  social: Leaf,
  shield: ShieldCheck,
  qualitative: MessageSquare,
  hybrid: Combine,
  secondary: BookOpen,
}

export default function Icon({
  name = "arrow",
  className = "",
}: {
  name?: string
  className?: string
}) {
  const Component = icons[(name as keyof typeof icons)] || ArrowRight
  return (
    <Component
      className={className}
      size={22}
      strokeWidth={1.5}
      aria-hidden="true"
    />
  )
}
