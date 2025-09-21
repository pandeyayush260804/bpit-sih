import { Mail, Phone, MapPin, Heart } from "lucide-react";
import logo from "../../assets/logo.png"; // <-- put your logo image in assets

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-5 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo + Info */}
        <div>
          <div className="flex items-center space-x-7 mb-4">
            <img src={logo} alt="Campus Connect" className="h-10" />
            <h2 className="text-2xl font-bold text-white">Campus Connect</h2>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Connecting learners and campuses with opportunities, resources, and collaboration.
          </p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center space-x-2">
              <Mail size={16} /> <span>pandeyayush2608@gmail.com</span>
            </p>
            <p className="flex items-center space-x-2">
              <Phone size={16} /> <span>+91 96250*****</span>
            </p>
            <p className="flex items-center space-x-2">
              <MapPin size={16} /> <span>New Delhi, India</span>
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white">Disclaimer</a></li>
            <li><a href="#" className="hover:text-white">Refund Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © 2025 Campus Connect. All rights reserved. <br />
        Made with <Heart size={14} className="inline text-red-500" /> in New Delhi
      </div>
    </footer>
  );
};

export default Footer;
