import { useState } from "react"
import { LazyMotion, MotionConfig } from "framer-motion"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import HeroSection from "./components/home/HeroSection"
import AchievementStats from "./components/home/AchievementStats"
import ClientLogoCarousel from "./components/home/ClientLogoCarousel"
import ResearchCapabilities from "./components/home/ResearchCapabilities"
import MethodologiesSection from "./components/home/MethodologiesSection"
import QualityProcess from "./components/home/QualityProcess"
import ClosingCTA from "./components/home/ClosingCTA"
import InquiryDialog from "./components/shared/InquiryDialog"
import {
  capabilities,
  serviceAliases,
  type Capability,
  type Navigate,
} from "./data/home"

const loadMotionFeatures = () =>
  import("./components/shared/motionFeatures").then((module) => module.default)

export default function App() {
  const [detail, setDetail] = useState<Capability | null>(null)
  const [proposal, setProposal] = useState(false)
  const openProposal = () => {
    setDetail(null)
    setProposal(true)
  }
  const navigate: Navigate = (label, category) => {
    const capability = capabilities.find(
      (card) => card.title === (serviceAliases[label] || label),
    )
    if (capability) {
      setDetail(capability)
      return
    }
    if (
      [
        "Contact",
        "Industries",
        "Academic Research",
        "Data & Fieldwork",
      ].includes(category)
    ) {
      openProposal()
      return
    }
    const target =
      label === "Quality" || label === "Quality & Process"
        ? "quality"
        : category === "Company"
          ? "about"
          : category === "Methodologies" || category === "Resources"
            ? "approach"
            : "capabilities"
    document.getElementById(target)?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    })
  }
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar openProposal={openProposal} navigate={navigate} />
        <main id="main-content">
          <HeroSection openProposal={openProposal} />
          <AchievementStats />
          <ClientLogoCarousel />
          <ResearchCapabilities onSelect={setDetail} />
          <MethodologiesSection />
          <QualityProcess />
          <ClosingCTA openProposal={openProposal} />
        </main>
        <Footer navigate={navigate} />
        <InquiryDialog
          detail={detail}
          proposal={proposal}
          closeDialog={() => {
            setDetail(null)
            setProposal(false)
          }}
          openProposal={openProposal}
        />
      </LazyMotion>
    </MotionConfig>
  )
}
