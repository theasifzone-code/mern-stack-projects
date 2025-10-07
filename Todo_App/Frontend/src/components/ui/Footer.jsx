import React from "react";
import { FaGithub, FaLinkedin, FaGlobe, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-800 text-white relative overflow-hidden mt-16">
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.3),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-indigo-500/40 pb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-center sm:text-left">
            <span className="text-indigo-400">Asif</span> Todo 
          </h2>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-end space-x-6">
            {[
              { icon: <FaGithub />, link: "https://github.com/theasifzone-code" },
              { icon: <FaLinkedin />, link: "https://linkedin.com" },
              { icon: <FaGlobe />, link: "https://my-portfolio-woad-ten-33.vercel.app/" },
              { icon: <FaEnvelope />, link: "mailto:theasifzone@gmail.com" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-indigo-300 transition-all duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Middle Section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 text-indigo-100 text-center sm:text-left">
          {[
            {
              title: "Product",
              links: ["Features", "API Access", "Documentation"],
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Contact"],
            },
            {
              title: "Support",
              links: ["Help Center", "Privacy Policy", "Terms of Service"],
            },
          ].map((section, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold mb-3 text-indigo-300">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="hover:text-indigo-400 transition-colors duration-200 hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-10 text-center text-indigo-300 text-sm border-t border-indigo-500/30 pt-5 leading-relaxed">
          © {new Date().getFullYear()}{" "}
          <span className="text-indigo-400 font-semibold">Asif Todo API</span> 
          {/* <span className="text-white font-bold">Asif</span> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
