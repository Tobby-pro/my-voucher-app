"use client";

// import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 sm:px-12 md:px-24">
      {/* Hero */}
      <section className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className=" pb-2 text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-300 to-white"
        >
          Empowering IT Careers Through Professional Certifications
        </motion.h1>
        <p className="text-white/80 max-w-2xl mx-auto ">
          At Btonenet, we simplify how individuals and organizations access IT vouchers, expert training, and trusted career paths.
        </p>
      </section>

      {/* Our Story */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-white/70 leading-relaxed">
          Btonenet started with a vision: to bridge the gap between ambition and opportunity. 
          In a world flooded with resources, we realized what people really need is clarity, access, and support. 
          Since our founding, we’ve helped aspiring professionals gain the certifications and skills needed to thrive in the tech industry.
          BtoneNet Services is a general merchandise company that expand its service to Information Technology training and a provider of IT 
          exam (E.g., AWS, MICROSOFT, COMPTIA, CISCO etc.) discount voucher to allow corporate and non-corporate individual to register their exam without undergo any stress at the comfort of their home or office. We can also help them to register and book the exam as well at 
          low cost. It is scalable, fast and all our voucher comes with 5% to 10% discount compare to the actual exam price this make it affordable to individual. We accept both Naira and Dollar payment. BtoneNet services is loyal
           and treat every customer with respect and dignity. All our vouchers have 12months validity period and once it is purchased cannot be returned.<br/><br/>
            NOTE: Naira payment depend on current parallel market(aboki express) exchange rate.

        </p>
      </section>

      {/* What We Do */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-6">What We Do</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="bg-white/10 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">Certify with Ease</h3>
            <p className="text-white/70">
              We provide access to top certification vouchers from vendors like AWS, Microsoft, CompTIA, Cisco, and more.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">Instructor-led Training</h3>
            <p className="text-white/70">
              Learn from professionals through flexible, expert-guided sessions tailored for real-world readiness.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">Tech Mentorship</h3>
            <p className="text-white/70">
              We support students beyond the certificate — career advice, interview prep, and project reviews included.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">Bulk Solutions</h3>
            <p className="text-white/70">
              We also work with schools and companies who need training and certification for teams at scale.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
        <ul className="space-y-4 text-white/70">
          <li><strong>Integrity:</strong> We do what we say, and say what we do.</li>
          <li><strong>Access:</strong> We believe certification and opportunity should be within everyone’s reach.</li>
          <li><strong>Growth:</strong> We focus on long-term learning, not quick fixes.</li>
          <li><strong>Support:</strong> Our clients are never alone on the journey.</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-4">Want to Learn More?</h2>
        <p className="text-white/70 mb-6">
          Explore our vouchers, training options, or reach out to talk about how we can help you grow.
        </p>
        <Link
  href="/#contact"
  className="inline-block px-6 py-3 text-black bg-gradient-to-r from-amber-200 to-amber-500 hover:from-amber-400 hover:to-yellow-500 rounded-lg font-semibold transition"
>
  Contact Us
</Link>


      </section>
    </main>
  );
}
