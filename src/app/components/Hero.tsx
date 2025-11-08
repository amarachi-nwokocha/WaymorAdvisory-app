'use client';

import { useState } from "react";
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import {  X } from "lucide-react";
import toast from "react-hot-toast";
const HeroSection = () => {
  // Animation variants with proper typing
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }, // ✅ Correct type
    },
  };


   const [isOpen, setIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      fullName: "",
      organization: "",
      email: "",
      countryCode: "+234",
      phoneNumber: "",
      supportType: "Advisory & Strategy",
      mode: "",
      details: "",
      date: "",
      time: "",
      referral: "LinkedIn / Social Media",
      consent: false,
    });
  
    // ✅ Type-safe handler for all inputs
    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, type, value } = e.target;
      const newValue =
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value;
  
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    };
  
    // ✅ Logs form data on submit
    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  console.log("📝 Submitted Form Data:", formData);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      console.log("✅ Email sent successfully!");
    toast.success("Your message has been sent successfully!");
      setSubmitted(true);
      setTimeout(() => setIsOpen(false), 3000);
    } else {
      console.error("❌ Failed to send email:", result.error);
      toast.error("Something went wrong. Please try again later.");
    }
  } catch (error) {
    console.error("⚠️ Network or server error:", error);
    toast.error("Failed to send request. Please try again later.");
  }
  finally {
    setLoading(false); // stop loader
  }
};

  return (
 <section
  id="hero"
  className="relative w-full min-h-screen flex items-center overflow-hidden"
>
  {/* Background Image (always full screen width) */}
  <div className="absolute inset-0">
    <Image
      src="/bgImg.jpg"
      alt="Waymor Advisory"
      fill
      priority
      className="object-cover"
    />
  </div>

  {/* Inner container (centers the hero text and aligns with navbar) */}
  <div className="relative z-10 w-full">
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full md:w-2/3 lg:w-1/2 text-left"
      >
        <motion.h2
          variants={fadeInLeft}
          className="text-[#189086] font-heading font-semibold text-lg md:text-xl tracking-widest uppercase mb-4"
        >
          Integrity. Insight. Impact.
        </motion.h2>

        <motion.h1
          variants={fadeInLeft}
          className="text-4xl md:text-5xl lg:text-6xl font-[Lato] font-bold leading-tight mb-6 text-[#13304D]"
        >
          At A Glance
        </motion.h1>

        <motion.p
          variants={fadeInLeft}
          className="max-w-xl text-[#13304D] text-base md:text-lg font-[Arimo] mb-10"
        >
          Waymor Advisory is a dynamic consulting firm committed to helping organizations
          navigate complexity, achieve clarity, resilience, and growth. Guided by integrity,
          we work across sectors to strengthen systems, build capacity, and enable smarter
          decisions. We deliver strategic insight that creates sustainable impact.
        </motion.p>

        <motion.div variants={fadeInLeft}>
          <button  onClick={() => setIsOpen(true)}
           
            className="inline-block bg-[var(--color-blue)] hover:bg-[#1a4066]  font-[Arimo] text-lg px-8 py-3 text-white
             rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Schedule A Strategy Call
          </button>
        </motion.div>
      </motion.div>
    </div>
  </div>
 {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
      <motion.div
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full p-8 grid md:grid-cols-2 gap-6 overflow-hidden"
>
  {/* Mobile blurred background */}
  <div
    className="absolute inset-0 md:hidden bg-[#13304D]/60 backdrop-blur-sm"
    style={{
      backgroundImage: "url('/logo02.png')",
      backgroundSize: "160px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      filter: "blur(10px) brightness(0.6)",
      zIndex: 0,
    }}
  ></div>

  {/* Close Button */}
  <button
    onClick={() => setIsOpen(false)}
    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-20"
  >
    <X className="w-6 h-6" />
  </button>

  {/* Left Side (visible only on desktop) */}
  <div className="hidden md:flex bg-[#039F9D] rounded-2xl p-8 
  !text-white flex-col justify-center">
    <Image src="/logo02.png" width={50} height={50} alt="Waymor Advisory" className="w-50 mb-6" />
    <h3 className="text-2xl font-bold mb-4">Schedule A Strategy Call</h3>
    <p className="text-white/80">
    Schedule a consultation to explore tailored solutions that improve efficiency and drive sustainable results.
    </p>
  </div>

  {/* Right Side (Form or Submitted Message) */}
  <div className="relative z-10">
    {!submitted ? (
    <form
  onSubmit={handleSubmit}
  className="space-y-4 max-h-[80vh] overflow-y-auto pr-2"
>
  {/* Full Name */}
  <input
    name="fullName"
    placeholder="Full Name *"
    value={formData.fullName}
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#189086] text-white md:text-gray-700 placeholder-white md:placeholder-gray-700"
  />

  {/* Organization */}
  <input
    name="organization"
    placeholder="Organization / Company Name *"
    value={formData.organization}
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#189086] text-white md:text-gray-700 placeholder-white md:placeholder-gray-700"
  />

  {/* Email */}
  <input
    name="email"
    type="email"
    placeholder="Email Address *"
    value={formData.email}
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#189086] text-white md:text-gray-700 placeholder-white md:placeholder-gray-700"
  />

  {/* Phone */}
  <div className="flex gap-2">
    <select
      name="countryCode"
      value={formData.countryCode}
      onChange={handleChange}
      required
      className="border border-gray-300 rounded-md p-2 w-1/3 text-white md:text-gray-700"
    >
      <option value="+234">+234</option>
      <option value="+1">+1</option>
      <option value="+44">+44</option>
      <option value="+971">+971</option>
    </select>

    <input
      name="phoneNumber"
      placeholder="Contact Number *"
      value={formData.phoneNumber}
      onChange={handleChange}
      required
      className="w-2/3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#189086] text-white md:text-gray-700 placeholder-white md:placeholder-gray-700"
    />
  </div>

  {/* Service Type */}
  <h2 className="font-bold text-lg !text-white md:!text-[#13304D]">Service Type</h2>
  <select
    name="supportType"
    value={formData.supportType}
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded-md p-2 text-white md:text-gray-700"
  >
    <option value="">Select a service</option>
    <option>Advisory & Strategy</option>
    <option>Governance, Risk & Sustainability</option>
    <option>Public Sector Finance & Policy</option>
    <option>Capacity Development & Transformation</option>
    <option>General Inquiry</option>
  </select>

  {/* Mode */}
  <p className="font-bold text-lg !text-white md:!text-[#13304D]">Preferred Mode of Discussion *</p>
  <div className="flex flex-col gap-1" >
    <label className="text-white md:text-gray-700">
      <input
        type="radio"
        name="mode"
        value="Virtual Call"
        checked={formData.mode === "Virtual Call"}
        onChange={handleChange}
  
        className="mr-2"
      />
      Virtual Call (Zoom / Google Meet)
    </label>
    <label className="text-white md:text-gray-700">
      <input
        type="radio"
        name="mode"
        value="Phone Call"
        checked={formData.mode === "Phone Call"}
        onChange={handleChange}
        required
        className="mr-2"
      />
      Phone Call
    </label>
    <label className="text-white md:text-gray-700">
      <input
        type="radio"
        name="mode"
        value="Office Visit"
        checked={formData.mode === "Office Visit"}
        onChange={handleChange}
        required
        className="mr-2"
      />
      Office Visit
    </label>
  </div>

  {/* Details */}
  <textarea
    name="details"
    rows={3}
    placeholder="Brief Details of Inquiry / Description *"
    value={formData.details}
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#189086] text-white md:text-gray-700 placeholder-white md:placeholder-gray-700"
  />

  {/* Date & Time */}
  <p className="font-bold text-lg !text-white md:!text-[#13304D]">Date & Time *</p>
  <div className="flex gap-3">
    <input
      name="date"
      type="date"
      value={formData.date}
      onChange={handleChange}
  
      className="w-1/2 border border-gray-300 rounded-md p-2 text-white md:text-gray-700"
    />
    <input
      name="time"
      type="time"
      value={formData.time}
      onChange={handleChange}
      required
      className="w-1/2 border border-gray-300 rounded-md p-2 text-white md:text-gray-700"
    />
  </div>

  {/* Referral */}
  <p className="font-bold text-lg !text-white md:!text-[#13304D]">How Did You Hear About Us? *</p>
  <select
    name="referral"
    value={formData.referral}
    onChange={handleChange}
   
    className="w-full border border-gray-300 rounded-md p-2 text-white md:text-gray-700"
  >
    <option value="">Select an option</option>
    <option>LinkedIn / Social Media</option>
    <option>Website Search</option>
    <option>Referral</option>
    <option>Other</option>
  </select>

  {/* Consent */}
  <div className="flex items-start gap-2">
    <input
      type="checkbox"
      name="consent"
      checked={formData.consent}
      onChange={handleChange}
      required
      className="mt-1"
    />
    <p className="text-sm text-white md:text-gray-700">
      I agree to be contacted by Waymor Advisory Ltd regarding this inquiry and understand that my information will be handled in accordance with the company’s privacy policy.
    </p>
  </div>

  {/* Submit */}
  <button
  type="submit"
  disabled={loading}
  className={`w-full bg-[#13304D] text-white py-3 rounded-md font-semibold transition ${
    loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#1a4066]"
  }`}
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        ></path>
      </svg>
      <span>Sending...</span>
    </div>
  ) : (
    "Schedule Call"
  )}
</button>

</form>

    ) : (
      <div className="flex flex-col items-center justify-center text-center p-6">
        <h3 className="text-xl font-semibold text-[#189086] mb-2">
          ✅ Thank you for reaching out!
        </h3>
        <p className="text-gray-700">
          A member of our team will review your request and contact you within
          24–48 hours.
        </p>
      </div>
    )}
  </div>
</motion.div>

        </motion.div>
      )}



</section>



  );
};

export default HeroSection;
