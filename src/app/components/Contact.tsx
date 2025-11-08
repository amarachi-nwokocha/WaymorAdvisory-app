"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Instagram, Twitter, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
export default function ContactSection() {
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
  }finally {
    setLoading(false); // stop loader
  }
};


  return (
    <>
      {/* Contact Section */}
      <section
        className="bg-[#1E293B] text-white py-20 px-6 md:px-16"
        id="contact"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-start">
          {/* Text & Button */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold !text-white font-heading mb-4">
              Let’s Build Something Exceptional Together
            </h2>
            <p className="text-white mb-8 max-w-2xl font-body">
              Whether you’re a government institution, development partner, or
              private enterprise, we’d love to discuss how Waymor can support
              your goals.
            </p>

            <button
              onClick={() => setIsOpen(true)}
              className="inline-block bg-[#189086] hover:bg-[var(--color-darkgreen)] font-[Arimo] text-lg px-8 py-3 text-white
             rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl md:w-90"
            >
              Schedule A Strategy Call
            </button>
          </div>

          {/* Company Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold !text-white mb-3">
                Waymor Advisory Ltd
              </h3>
              <p className="text-white/70">
                2A Abdulkareem Adisa Close, Adamu Aliero Crescent,
                <br /> Guzape, Abuja, Nigeria.
              </p>
            </div>

            <div className="space-y-3 text-white/70">
              <p>
                <span className="font-semibold text-white/70">Phone:</span>{" "}
                +234-913-558-6376
              </p>
              <p>
                <span className="font-semibold text-white/70">Email:</span>{" "}
                info@waymoradvisory.com
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-semibold !text-white mb-4">
                Follow Us
              </h4>
              <div className="flex items-center gap-5">
                <a className="p-2 rounded-full border border-gray-300 hover:border-[#189086] hover:text-[#189086] transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a className="p-2 rounded-full border border-gray-300 hover:border-[#189086] hover:text-[#189086] transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a className="p-2 rounded-full border border-gray-300 hover:border-[#189086] hover:text-[#189086] transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
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
              className="absolute inset-0 md:hidden bg-[#189086]/60 backdrop-blur-sm"
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
              className="absolute top-4 right-4 text-white md:text-gray-500 hover:text-gray-700 z-20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Side (visible only on desktop) */}
            <div className="hidden md:flex bg-[#039F9D] rounded-2xl p-8 !text-white flex-col justify-center">
              <Image src="/logo02.png" width={50} height={50} alt="Waymor Advisory" className="w-50 mb-6" />
            
              <h3 className="text-2xl !text-white font-bold mb-4">Schedule a Strategy Call</h3>
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
    </>
  );
}
