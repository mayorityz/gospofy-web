import { Facebook, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "Twitter",
    icon: <Twitter className="w-5 h-5" />,
    href: "#",
  },
  {
    name: "Instagram",
    icon: <Instagram className="w-5 h-5" />,
    href: "#",
  },
  {
    name: "Facebook",
    icon: <Facebook className="w-5 h-5" />,
    href: "#",
  },
];

const Footer = () => {
  return (
    <footer className="bg-black py-16 border-t border-gold-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and Description */}
        <div className="mb-12 max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gold-900/10 flex items-center justify-center">
              <img src="/images/logo.png" alt="Gospofy" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-bold text-white">Gospofy</h3>
          </div>
          <p className="text-gray-400">
            Empowering gospel artists, pastors, and content creators to share their message with the
            world. Join our growing community of believers and make your voice heard.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="md:col-span-2">
            {/* Social Links */}
            <h4 className="text-gold-900 font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gold-900/10 flex items-center justify-center text-gold-900 hover:bg-gold-900/20 transition-colors">
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-gold-900 font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-900 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-900 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-900 transition-colors">
                  Download
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-gold-900 font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-900 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-900 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-900 transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-gold-900 font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-900 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-900 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-900 transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-gold-900 font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-gold-900 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-gold-900 transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-900 transition-colors">
                  Licenses
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gold-900/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Gospofy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-gold-900 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-900 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-900 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
