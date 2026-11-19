import { ContactForm } from "@/components/ContactForm";
export const metadata = { title: "Contact | CompassAI" };
export default function Contact() {
  return (
    <section className="py-20">
      <div className="container-x grid lg:grid-cols-2 gap-14">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="display mt-5 text-[42px] sm:text-[64px]">Talk to our team.</h1>
          <p className="mt-6 max-w-[520px] text-[19px] text-muted">Questions about plans, security, partnerships or press? Send a note and we’ll route it to the right person.</p>
        </div>
        <ContactForm kind="contact" />
      </div>
    </section>
  );
}
