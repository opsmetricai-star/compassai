import { ContactForm } from "@/components/ContactForm";
export const metadata = { title: "Get a demo | CompassAI" };
export default function Demo() {
  return (
    <section className="py-20">
      <div className="container-x grid lg:grid-cols-2 gap-14">
        <div>
          <p className="eyebrow">Get a demo</p>
          <h1 className="display mt-5 text-[42px] sm:text-[64px]">See CompassAI work on your knowledge.</h1>
          <p className="mt-6 max-w-[520px] text-[19px] text-muted">Tell us what your team needs and we’ll walk through the assistant, search and agents using a use case like yours.</p>
        </div>
        <ContactForm kind="demo" />
      </div>
    </section>
  );
}
