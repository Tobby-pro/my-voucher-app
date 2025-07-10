import CertificationsGrid from "@/components/CertificationsGrid";
import FaqSection from "@/components/FacSection";
import FeaturesSection from "@/components/FeaturesSection";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import VoucherForm from "@/components/VoucherForm";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero />
      <CertificationsGrid /> 
      <FeaturesSection/>

      <section id="voucher-form">
        <VoucherForm />
        <FaqSection />
      </section>
    
    </main>
  );
}