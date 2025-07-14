import CertificationsGrid from "@/components/CertificationsGrid";
import FaqSection from "@/components/FacSection";
import FeaturesSection from "@/components/FeaturesSection";
import Hero from "@/components/Hero";
import VoucherForm from "@/components/VoucherForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturesSection />
      <CertificationsGrid />

      <section id="voucher-form">
        <VoucherForm />
        <FaqSection />
      </section>
    </main>
  );
}
