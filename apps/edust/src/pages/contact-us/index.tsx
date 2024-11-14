import { Navbar } from "@/components"
import { ContactForm } from "./contact-form"
import { ContactNewsletter } from "./contact-newsletter"
import { ContactText } from "./contact-text"

export const ContactUs = () => {
  return (
    <>
      <Navbar.Guest />
      <div className="flex flex-col justify-center gap-4 pt-16 md:flex-row md:gap-20">
        <ContactForm />
        <ContactText />
      </div>
      <ContactNewsletter />
    </>
  )
}
