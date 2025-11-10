"use client";
import { Linkedin, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" text-white py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        {/* About Waymor */}
        <div>
          <h3 className="text-xl font-bold text-[#189086] mb-4">Waymor Advisory Ltd</h3>
          <p className="text-[#1E293B] text-sm leading-relaxed">
            We empower clients through dynamic, insight-driven solutions — solving problems, 
            building capacity, and fostering growth with transparency and integrity.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-[#189086] mb-4">Contact</h4>
          <p className="text-[#1E293B] text-sm mb-2">
            <span className="font-semibold">Address:</span> 2A Abdulkareem Adisa Close, Adamu Aliero Crescent, Guzape, Abuja, Nigeria
          </p>
          <p className="text-[#1E293B] text-sm mb-2">
            <span className="font-semibold">Phone:</span> +234-913-558-6376
          </p>
          <p className="text-[#1E293B] text-sm mb-2">
            <span className="font-semibold">Email:</span> info@waymoradvisory.com
          </p>
          {/* <p className="text-[#1E293B] text-sm">
            <span className="font-semibold">Website:</span>{" "}
            <a href="https://www.waymoradvisory.com" className="text-[#189086] hover:text-[#1E293B]">
              www.waymoradvisory.com
            </a>
          </p> */}
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-[#189086] mb-4">Quick Links</h4>
          <ul className="text-[#1E293B] text-sm space-y-2">
            <li><a href="#mission" className="hover:text-[#189086]">Mission & Vision</a></li>
            <li><a href="#services" className="hover:text-[#189086]">Services</a></li>
            <li><a href="#approach" className="hover:text-[#189086]">Waymor Advantage</a></li>
            <li><a href="#team" className="hover:text-[#189086]">Leadership Team</a></li>
            <li><a href="#contact" className="hover:text-[#189086]">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold text-[#189086] mb-4">Follow Us</h4>
          <div className="flex items-center gap-4">
            <a className="p-2 rounded-full border text-gray-500 border-gray-600 hover:border-[#800020] hover:text-[#800020] transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a className="p-2 rounded-full border text-gray-500 border-gray-600 hover:border-[#800020] hover:text-[#800020] transition-all">
              <Twitter className="w-5 h-5" />
            </a>
            <a className="p-2 rounded-full border text-gray-500 border-gray-600 hover:border-[#800020] hover:text-[#800020] transition-all" href="https://www.instagram.com/waymoradvisoryltd?utm_source=qr&igsh=MW8wMmd5cmF2Y3p0aQ==" target="_blank">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Waymor Advisory Ltd. All rights reserved.
      </div>
    </footer>
  );
}
