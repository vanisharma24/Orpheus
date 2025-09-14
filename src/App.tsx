import React, { useEffect, useState } from "react";
import mic from '/src/Adobe Express - file.png';

const AnimatedReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      className={`transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

const Navbar = () => (
  <nav className="top-0 bg-[#730202] text-[#f5f5f5] flex justify-between px-8 py-4 z-50">
    <div className="font-bold text-xl font-forum">ORPHEUS</div>
    <ul className="flex space-x-6">
      {[ "About", "Connect Wallet", "Dashboard", "Contact"].map((item) => (
        <li key={item}>
          <a
            href={`#${item.toLowerCase().replace(/ /g, "")}`}
            className="hover:text-[#000] transition"
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const Header = () => (
  <header className="bg-[#730202] min-h-screen flex flex-col justify-center px-8 text-left space-y-4">
    <AnimatedReveal delay={200}>
      <h1 className="text-9xl font-forum tracking-wide text-[#f5f5f5]">ORPHEUS</h1>
    
    </AnimatedReveal>
    <AnimatedReveal delay={600}>
      <p className="text-xl max-w-3xl text-[#f5f5f5] font-poppins">
        Create. Collaborate. Own Your Music.
      </p>
    </AnimatedReveal>
    <AnimatedReveal delay={900}>
      <p className="text-lg max-w-3xl text-[#f5f5f5] italic font-poppins">
        Dive into Orpheus, the digital stage where musicians connect, create, and inspire. Collaborate effortlessly in real time and turn your musical visions into reality alongside a diverse global community.
      </p>
    </AnimatedReveal>
   
  </header>

);

const Services = () => (
  <section id="services" className="bg-black text-white px-8 py-20">
    <h2 className="text-4xl font-poppins mb-12">What We Do</h2>
    <p className="mb-12 max-w-4xl">
      At Orpheus, we bring musicians, producers, and creators together online to make music collaboratively, no matter where they are in the world. Our platform offers intuitive tools for real-time jamming, recording, and editing, enabling seamless teamwork on every track. We empower artists to connect, share ideas, and create original music collectively—breaking down geographic barriers and inspiring innovation through collaboration.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <h3 className="text-4xl font-poppins mt-8 mb-4">Features</h3>
        <ul className="space-y-2">
          {[
            "Real-time Collaboration",
            "Multi-Track Editor",
            "Global Community",
            "Secure Cloud Storage",
            "Expansive Sound Library",
            "Built-in Chat and Messaging",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      </div>
  </section>
);
// Place this in your component (e.g. App.tsx or its own file)




const GiveBack = () => (
  <section id="giveback" className="py-20 px-8 bg-white">
    <h2 className="text-4xl font-bold font-poppins mb-8">How We Give Back</h2>
    <p className="max-w-3xl font-poppins mb-8">
      We’re launching <strong>SS36</strong>, our social sustainability hub.
      Reinvesting revenue and expertise into communities shaping culture.
      Focused on bridging systemic gaps of race, sexuality, wealth, and gender
      identity.
    </p>
    <ul className="list-disc ml-8 space-y-4 font-poppins text-lg max-w-3xl">
      <li>Community-centric projects for marginalized groups</li>
      <li>Career initiatives for underrepresented talent</li>
      <li>Partner and sponsorship opportunities for like-minded organizations</li>
    </ul>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 px-8 bg-black text-[#f5f5f5]">
    <h2 className="text-4xl font-bold font-poppins mb-8 text-[#f5f5f5]">How It Works</h2>
    <p className="max-w-3xl mb-12 font-poppins text-lg text-[#f5f5f5]">
      Orpheus connects musicians, producers, and creators worldwide, making collaborative music creation intuitive and fun.
      Here’s how you can start making music together with Orpheus:
    </p>

    <div className="max-w-3xl space-y-10">
      <div>
        <h3 className="text-2xl font-semibold font-poppins mb-4 text-[#f5f5f5]">1. Create Your Profile</h3>
        <p className="text-lg font-poppins text-[#f5f5f5]">
          Set up your own musician profile to showcase your style, skills, and interests.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold font-poppins mb-4 text-[#f5f5f5]">2. Start or Join Projects</h3>
        <p className="text-lg">
          Create new music projects or find existing ones to collaborate with other creators worldwide.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-poppins font-semibold text-[#f5f5f5] mb-4">3. Collaborate Live or Asynchronously</h3>
        <p className="text-lg">
          Use real-time jamming or record your parts on your schedule. Communicate easily with built-in chat and feedback tools.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold font-poppins text-[#f5f5f5] mb-4">4. Upload, Edit, and Share</h3>
        <p className="text-lg">
          Upload tracks, edit ownership roles, and share your finished music with the community or keep it private.
        </p>
      </div>
    </div>
  </section>
);


const Footer = () => {
  return (
    <footer className="bg-[#730202] py-12 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Branding & Description */}
        <div>
          <h2 className="text-2xl font-bold font-forum text-[#f5f5f5] mb-4">ORPHEUS</h2>
          <p className="text-[#f5f5f5] max-w-sm">
            Orpheus is where musicians from around the world connect and create music collaboratively, breaking down barriers and inspiring creativity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold font-poppins text-[#f5f5f5] mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#how-it-works" className="text-[#f5f5f5] transition">How It Works</a></li>
            <li><a href="#projects" className="text-[#f5f5f5] transition">Projects</a></li>
            <li><a href="#community" className="text-[#f5f5f5] transition">Community</a></li>
            <li><a href="#contact" className="text-[#f5f5f5] transition">Contact</a></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-xl font-semibold font-poppins text-[#f5f5f5] mb-4">Connect With Us</h3>
          <div className="flex space-x-6 mb-6">
            <a href="https://twitter.com" aria-label="Twitter" className="text-[#f5f5f5] font-poppins">Twitter</a>
            <a href="https://facebook.com" aria-label="Facebook" className="text-[#f5f5f5] font-poppins">LinkedIn</a>
            <a href="https://instagram.com" aria-label="Instagram" className="text-[#f5f5f5] font-poppins">Instagram</a>
          </div>
          <p className="text-[#f5f5f5] font-poppins">
            Email us at{" "}
            <a href="mailto:orpheus.collab@gmail.com" className="text-[#f5f5f5] underline">
              orpheus.collab@gmail.com
            </a>
          </p>
        </div>

      </div>

      <div className="mt-12 border-t border-gray-300 pt-6 text-center text-[#f5f5f5] text-sm">
        &copy; {new Date().getFullYear()} Orpheus. All rights reserved.
      </div>
    </footer>
  );
};




const App = () => {
  return (
    <div className="font-sans scroll-smooth">
      <Navbar />
      <Header />
      <Services />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default App;
