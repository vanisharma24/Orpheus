import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import DashboardMain from "./pages/dashboardmain";
import ConnectWallet from "./pages/ConnectWallet";
import CommunityPage from "./pages/Community";
import UserProfile from "./pages/UserProfile";
import CreateProjectPage from "./pages/create";
import ProjectOnboarding from "./pages/Project";
import SettingsPage from "./pages/settings";
import MusicWorkspace from "./pages/Workspace";

const AnimatedReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);
  return (
    <div className={`transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>{children}</div>
  );
};
// Wrapper to pass projectTitle from location state
const ProjectOnboardingWrapper: React.FC = () => {
  const location = useLocation();
  const projectTitle = location.state?.projectTitle || "New Project";
  return <ProjectOnboarding projectTitle={projectTitle} onClose={() => {}} onComplete={() => {}} />;
};
import { useNavigate } from "react-router-dom";

const CollabNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear session logic here if needed
    navigate("/");
  };
  return (
    <nav className="top-0 bg-[#730202] text-[#f5f5f5] flex justify-between px-8 py-4 z-50">
      <div className="font-bold text-xl font-forum">ORPHEUS</div>
      <ul className="flex space-x-6 font-poppins">
        <li className="flex items-center space-x-6">
          <Link
            to="/dashboardmain"
            className="px-4 py-2 rounded font-poppins font-semibold text-[#f5f5f5] bg-transparent hover:bg-[#f5f5f5] hover:text-[#730202] transition"
          >
            Dashboard
          </Link>
          <Link
            to="/community"
            className="px-4 py-2 rounded font-poppins font-semibold text-[#f5f5f5] bg-transparent hover:bg-[#f5f5f5] hover:text-[#730202] transition"
          >
            Community
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded font-poppins font-semibold text-[#f5f5f5] bg-transparent hover:bg-[#f5f5f5] hover:text-[#730202] transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};
const Navbar = () => (
  <nav className="top-0 bg-[#730202] text-[#f5f5f5] flex justify-between px-8 py-4 z-50">
    <div className="font-bold text-xl font-forum">ORPHEUS</div>
    <ul className="flex space-x-6 font-poppins">
      <li className="flex items-center space-x-6">
        <Link to="/connectwallet" className="hover:text-[#000] transition">Connect Wallet</Link>
        <Link to="/dashboardmain" className="hover:text-[#000] transition">Open Dashboard</Link>
      </li>
    </ul>
  </nav>
);
const Header = () => (
  <header className="bg-[#730202] min-h-screen flex flex-col justify-center px-8 text-left space-y-4">
    <AnimatedReveal delay={200}>
      <h1 className="text-9xl font-forum tracking-wide text-[#f5f5f5]">ORPHEUS</h1>
    </AnimatedReveal>
    <AnimatedReveal delay={600}>
      <p className="text-xl max-w-3xl text-[#f5f5f5] font-poppins">Create. Collaborate. Own Your Music.</p>
    </AnimatedReveal>
    <AnimatedReveal delay={900}>
      <p className="text-lg max-w-3xl text-[#f5f5f5] italic font-poppins">Dive into Orpheus, the digital stage where musicians connect, create, and inspire. Collaborate effortlessly in real time and turn your musical visions into reality alongside a diverse global community.</p>
    </AnimatedReveal>
  </header>
);
const serviceFeatures = [
  {
    title: "Real-time Collaboration",
    description: "Jam with musicians and producers in sync with ultra-low latency, wherever you are.",
  },
  {
    title: "Multi-Track Editor",
    description: "Record, organize, and layer complex productions together, effortlessly.",
  },
  {
    title: "Global Community",
    description: "Connect with a diverse network of global creators passionate about music.",
  },
  {
    title: "Secure Cloud Storage",
    description: "Your sessions, stems, and projects are always safe, accessible, and backed up.",
  },
  {
    title: "Expansive Sound Library",
    description: "Access sounds, loops, and samples to inspire and enrich your tracks.",
  },
  {
    title: "Built-in Chat and Messaging",
    description: "Collaborate and share feedback in real time, right inside every project.",
  },
];
const Services = () => (
  <section id="services" className="bg-black text-[#f5f5f5] px-8 py-20">
    <h2 className="text-4xl font-poppins mb-12 text-center" style={{ color: "#f5f5f5" }}>
      About
    </h2>
    <p className="mb-12 max-w-4xl mx-auto text-center text-[#f5f5f5]">
      At Orpheus, we bring musicians, producers, and creators together online to make music collaboratively, no matter where they are in the world. Our platform offers intuitive tools for real-time jamming, recording, and editing, enabling seamless teamwork on every track. We empower artists to connect, share ideas, and create original music collectively—breaking down geographic barriers and inspiring innovation through collaboration.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {serviceFeatures.map(({ title, description }) => (
        <div
          key={title}
          className="group bg-[#000000] border-2 border-[#730202] rounded-3xl p-8 flex flex-col items-center shadow-lg transition-all duration-300 ease-out"
        >
          <h3 className="text-xl font-extrabold mb-3 font-poppins text-[#730202] text-center tracking-wide">{title}</h3>
          <p className="text-base text-[#f5f5f5] text-center font-poppins">{description}</p>
        </div>
      ))}
    </div>
  </section>
);
const HowItWorks = () => (
  <section id="how-it-works" className="py-20 px-8 bg-black text-[#f5f5f5]">
    <h2 className="text-4xl font-bold font-poppins mb-8 text-[#f5f5f5]">How It Works</h2>
    <p className="max-w-3xl mb-12 font-poppins text-lg text-[#f5f5f5]">
      Orpheus connects musicians, producers, and creators worldwide, making collaborative music creation intuitive and fun.
      Here's how you can start making music together with Orpheus:
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Tile 1 */}
      <div className="bg-[#000] p-8 rounded-xl border border-black hover:border-[#730202] transition-all duration-300 hover:shadow-lg hover:shadow-[#730202]/20">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-[#730202] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">1</div>
          <h3 className="text-2xl font-semibold font-poppins text-[#f5f5f5]">Create Your Profile</h3>
        </div>
        <p className="text-lg font-poppins text-gray-300 leading-relaxed">Set up your own musician profile to showcase your style, skills, and interests.</p>
      </div>
      {/* Tile 2 */}
      <div className="bg-[#000] p-8 rounded-xl border border-black hover:border-[#730202] transition-all duration-300 hover:shadow-lg hover:shadow-[#730202]/20">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-[#730202] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">2</div>
          <h3 className="text-2xl font-semibold font-poppins text-[#f5f5f5]">Start or Join Projects</h3>
        </div>
        <p className="text-lg font-poppins text-gray-300 leading-relaxed">Create new music projects or find existing ones to collaborate with other creators worldwide.</p>
      </div>
      {/* Tile 3 */}
      <div className="bg-[#000] p-8 rounded-xl border border-black hover:border-[#730202] transition-all duration-300 hover:shadow-lg hover:shadow-[#730202]/20">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-[#730202] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">3</div>
          <h3 className="text-2xl font-poppins font-semibold text-[#f5f5f5]">Collaborate Live or Asynchronously</h3>
        </div>
        <p className="text-lg font-poppins text-gray-300 leading-relaxed">Use real-time jamming or record your parts on your schedule. Communicate easily with built-in chat and feedback tools.</p>
      </div>
      {/* Tile 4 */}
      <div className="bg-[#000] p-8 rounded-xl border border-black hover:border-[#730202] transition-all duration-300 hover:shadow-lg hover:shadow-[#730202]/20">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-[#730202] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">4</div>
          <h3 className="text-2xl font-semibold font-poppins text-[#f5f5f5]">Upload, Edit, and Share</h3>
        </div>
        <p className="text-lg font-poppins text-gray-300 leading-relaxed">Upload tracks, edit ownership roles, and share your finished music with the community or keep it private.</p>
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
          <p className="text-[#f5f5f5] max-w-sm">Orpheus is where musicians from around the world connect and create music collaboratively, breaking down barriers and inspiring creativity.</p>
        </div>
        {/* Quick Links */}
        <div>
          <ul className="space-y-2">
            <li><a href="#terms-of-services" className="text-[#f5f5f5] transition">Terms of Services</a></li>
            <li><a href="#privacy-policy" className="text-[#f5f5f5] transition">Privacy Policy</a></li>
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


import './App.css';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={
        <>
          <Navbar />
          <Header />
          <Services />
          <HowItWorks />
          <Footer />
        </>
      } />
  <Route path="/dashboard" element={<><Navbar /><DashboardMain /></>} />
  <Route path="/dashboardmain" element={<><Navbar /><DashboardMain /></>} />
      <Route path="/connectwallet" element={<><Navbar /><ConnectWallet /></>} />
      <Route path="/community" element={<><CollabNavbar /><CommunityPage /></>} />
      <Route path="/userprofile" element={<><CollabNavbar /><UserProfile /></>} />
      <Route path="/create" element={<><CollabNavbar /><CreateProjectPage /></>} />
      <Route path="/project" element={<><CollabNavbar /><ProjectOnboardingWrapper /></>} />
      <Route path="/settings" element={<><CollabNavbar /><SettingsPage /></>} />
      <Route path="/workspace" element={<><CollabNavbar /><MusicWorkspace /></>} />
    </Routes>
  </Router>
);

export default App;
