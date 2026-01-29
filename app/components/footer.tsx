"use client";
import React from "react";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
 
  // smooth. scroller
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-black text-gray-300">
      {/* divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
        {/* intro */}
        <div>
          <h3 className="text-xl font-semibold text-white">Stephanie Alor</h3>
          <p className="text-sm text-gray-400 mt-3 leading-relaxed max-w-sm">
            Crafting digital experiences with passion and precision. Turning
            ideas into elegant, scalable web solutions.
          </p>

          {/* socials */}
          <div className="flex gap-4 mt-6 relative z-10">
            {[
              { icon: <FaGithub />, link: "https://github.com/stefniey" },
              {
                icon: <FaLinkedinIn />,
                link: "https://www.linkedin.com/in/stephanie-alor-1b913624a/",
              },
              { icon: <FaTwitter />, link: "https://x.com/_stefniey" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full
                border border-white/10 text-gray-400
                hover:border-emerald-400 hover:text-emerald-400
                transition"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* navigation */}
        <div>
          <h4 className="text-white font-medium mb-4">Quick Navigation</h4>
          <ul className="space-y-3 text-sm relative z-10">
            {["home", "about", "services", "project", "contact"].map(
              (item) => (
                <li key={item}>
                  <button
                    onClick={() => handleScroll(item)}
                    className="text-gray-400 hover:text-emerald-400 transition hover:translate-x-1 inline-block"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* contact */}
        <div>
          <h4 className="text-white font-medium mb-4">Let’s Connect</h4>
          <p className="text-sm text-gray-400 mb-4">
            Open to freelance, contract, and full-time opportunities.
          </p>

          <ul className="space-y-3 text-sm">
            <li>📍 Lagos, Nigeria</li>
            <li>✉️ stephaniealor7@gmail.com</li>
            <li>📞 +234 816 519 5889</li>
          </ul>
        </div>
      </div>

      {/* bottom */}
      <div className="border-t border-white/10 py-6">
        <div
          className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row
        items-center justify-between gap-3 text-sm text-gray-500"
        >
          <p>© 2026 Stephanie Alor. All rights reserved.</p>
          <p>© Stefniey.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
