import { useEffect, useRef, useState } from "react"
import Icon from "./Icon"
import type { Capability } from "../../data/home"
import ThemeToggle from "../theme/ThemeToggle"
export default function InquiryDialog({
  detail,
  proposal,
  closeDialog,
  openProposal,
}: {
  detail: Capability | null
  proposal: boolean
  closeDialog: () => void
  openProposal: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [prepared, setPrepared] = useState(false)
  const [emailLink, setEmailLink] = useState("")
  useEffect(() => {
    if (proposal || detail) dialog.current?.showModal()
    else dialog.current?.close()
    if (proposal) setPrepared(false)
  }, [proposal, detail])
  return (
    <dialog
      ref={dialog}
      className="research-dialog"
      aria-label={detail?.title || "Request a research proposal"}
      onCancel={closeDialog}
      onClick={(e) => {
        if (e.target === dialog.current) closeDialog()
      }}
    >
      <div className="dialog-controls">
        {(detail || proposal) && <ThemeToggle />}
        <button
          className="dialog-close"
          aria-label="Close dialog"
          autoFocus
          onClick={closeDialog}
        >
          <Icon name="close" />
        </button>
      </div>
      {detail && (
        <div className="detail-content">
          <span className={`capability-icon ${detail.tone}`}>
            <Icon name={detail.icon} />
          </span>
          <p className="eyebrow">{detail.tag}</p>
          <h2>{detail.title}</h2>
          <p>{detail.description}</p>
          <h4>How we can help</h4>
          <ul>
            {detail.details.split(" · ").map((item) => (
              <li key={item}>
                <Icon name="check" />
                {item}
              </li>
            ))}
          </ul>
          <button className="button" onClick={openProposal}>
            Discuss your research
            <Icon name="northeast" />
          </button>
        </div>
      )}
      {proposal && (
        <div className="proposal-content">
          <span className="eyebrow">LET’S TURN QUESTIONS INTO CLARITY</span>
          <h2>
            Your next decision.
            <br />
            <em>Better evidence.</em>
          </h2>
          <p>
            Tell us a little about your project. We’ll help you explore the
            right approach.
          </p>
          {prepared ? (
            <div className="prepared-message">
              <span className="icon-circle">
                <Icon name="check" />
              </span>
              <h3>Your enquiry is ready.</h3>
              <p>
                No enquiry has been sent yet. Open the prepared email to send it
                to our research team.
              </p>
              <a className="button" href={emailLink}>
                Open email draft
                <Icon name="northeast" />
              </a>
              <button className="text-link" onClick={() => setPrepared(false)}>
                Edit enquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)
                const body = `Name: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\n\nResearch requirement:\n${data.get("brief")}`
                setEmailLink(
                  `mailto:mail@nexgenint.com?subject=${encodeURIComponent("Research enquiry — " + data.get("company"))}&body=${encodeURIComponent(body)}`,
                )
                setPrepared(true)
              }}
            >
              <div className="form-row">
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Full name"
                  />
                </label>
                <label>
                  Company
                  <input
                    name="company"
                    autoComplete="organization"
                    required
                    placeholder="Organisation"
                  />
                </label>
              </div>
              <label>
                Business email
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                />
              </label>
              <label>
                What would you like to understand?
                <textarea
                  name="brief"
                  required
                  rows={4}
                  placeholder="Your business question, target audience, geography or timeline…"
                />
              </label>
              <p className="form-note">
                This form prepares an email in your email application; it does
                not submit data to a server.
              </p>
              <button className="button" type="submit">
                Prepare research enquiry
                <Icon name="northeast" />
              </button>
            </form>
          )}
          <div className="dialog-contact">
            <a href="mailto:mail@nexgenint.com">mail@nexgenint.com</a>
            <a href="tel:+919873177449">+91-98731 77449</a>
          </div>
        </div>
      )}
    </dialog>
  )
}
