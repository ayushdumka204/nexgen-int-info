import Icon from "../shared/Icon"
import { navigation, type Navigate } from "../../data/home"
export default function Footer({ navigate }: { navigate: Navigate }) {
  return (
    <footer className="footer">
      <div className="section-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/assets/nexgen-logo-clean-2.png" alt="NexGen" />
            </div>
            <h3>
              Human understanding.
              <br />
              Reliable data.
              <br />
              <span>Smarter decisions.</span>
            </h3>
            <p>
              NexGen Market Research
              <br />
              Services Pvt. Ltd.
            </p>
            <a className="footer-cta" href="mailto:mail@nexgenint.com">
              Talk to an expert
              <Icon name="northeast" />
            </a>
          </div>
          <div className="footer-columns">
            {[
              "Solutions",
              "Methodologies",
              "Industries",
              "Data & Fieldwork",
              "Academic Research",
              "Resources",
              "Company",
              "Contact",
            ].map((category) => (
              <div className="footer-column" key={category}>
                <h4>{category}</h4>
                {navigation[category].map((link) => (
                  <button onClick={() => navigate(link, category)} key={link}>
                    {link}
                  </button>
                ))}
                {category === "Contact" && (
                  <div className="footer-contact">
                    <a href="mailto:mail@nexgenint.com">mail@nexgenint.com</a>
                    <a href="tel:+919873177449">+91-98731 77449</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="brand-journey">
          {["Research", "Understanding", "Insight", "Decision", "Growth"].map(
            (word, index) => (
              <div key={word}>
                <span>{word}</span>
                {index < 4 && <Icon />}
              </div>
            ),
          )}
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} NEXGEN MARKET RESEARCH SERVICES PVT.
            LTD.
          </span>
          <span>INDIA & INTERNATIONAL</span>
          <button
            aria-label="Back to top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    </footer>
  )
}
