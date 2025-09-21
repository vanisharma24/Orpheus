import react from "react";
import { Link } from "react-router-dom";

// You can put a hero/blurred image in /assets/images/ and import if desired, or use an online link.
// Example: import bgImage from '../assets/images/your-music-bg.jpg';

import { login } from "../ic/agent";

const handleLogin = async () => {
  await login();
};

const BackgroundVideo = () => (
  <div className="relative w-full h-screen overflow-hidden">
    {/* Video element */}
    <video
      className="absolute top-0 left-0 w-full h-full object-cover"
      src="/video/studio1.mp4"
      autoPlay
      muted
      loop
      playsInline
    />
    {/* Overlay content */}
    <div className="relative z-10 flex items-center justify-center w-full h-full">
      {/* Your content here */}
    </div>
  </div>
);


const Navbar = () => (
  <nav className="top-0 bg-[#730202] text-[#f5f5f5] flex justify-between px-8 py-4 z-50 w-full absolute left-0">
  <Link to="/" className="font-bold text-xl font-forum hover:text-[#f5f5f5]">ORPHEUS</Link>
    <ul className="flex space-x-6 font-poppins">
      <li>
  <Link to="/dashboard" className="hover:text-[#000] transition">Open Dashboard</Link>
      </li>
    </ul>
  </nav>
);

const Dashboard: React.FC = () => (
  <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
    <BackgroundVideo />

  {/* Overlay login card, centered */}
  <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="w-full max-w-md mx-auto rounded-3xl shadow-2xl bg-[#000000cc] backdrop-blur-lg p-10 flex flex-col items-center">
        {/* Logo or App Name */}
        <div className="font-forum text-3xl font-bold mb-5 text-[#f5f5f5] tracking-wide">ORPHEUS</div>
        {/* Subtitle */}
        <div className="mb-6 text-sm text-[#f5f5f5] opacity-90 text-center">Create. Collaborate. Own Your Music.</div>

        {/* Internet Identity Info Section */}
        <div className="w-full mb-6">
          <h2 className="text-2xl font-bold text-[#f5f5f5] text-center mb-2">Internet Identity</h2>
          <ul className="space-y-2 text-[#f5f5f5] text-sm font-mono mb-4">
            <li className="flex items-center justify-center"><span className="mr-2"></span> End-to-end encryption</li>
            <li className="flex items-center justify-center"><span className="mr-2"></span> Lightning fast transactions</li>
            <li className="flex items-center justify-center"><span className="mr-2"></span> No seed phrases needed</li>
          </ul>
          <div className="text-xs text-[#f5f5f5] opacity-80 mb-2 text-center">
            Connect securely using Internet Identity to access your DAO dashboard and participate in governance.
          </div>
        </div>

        {/* Main Action Button */}
        <button
          className="w-full bg-[#730202] text-[#f5f5f5] font-poppins font-bold py-3 rounded-full text-lg mt-2
          shadow-lg shadow-[#73020299]/30 transition duration-300 hover:bg-[#f5f5f5] hover:text-[#730202]"
          onClick={handleLogin}
        >
          Sign in with Internet Identity
        </button>

      </div>
    </div>
  </div>
);

export default Dashboard;
