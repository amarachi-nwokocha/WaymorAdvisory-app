"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Shield, Landmark, Users, ChevronDown } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Advisory & Strategy",
    icon: <Briefcase className="w-8 h-8 text-[#800020]" />,
    description:
      "Our Advisory & Strategy division supports organizations in navigating complexity and unlocking growth.",
    points: [
      "Strategy Development & Organizational Planning",
      "Capital Markets Advisory",
      "Financial Advisory (Corporate Finance & Transaction Services)",
      "Management Consulting",
    ],
  },
  {
    id: 2,
    title: "Governance, Risk & Sustainability",
    icon: <Shield className="w-8 h-8 text-[#800020]" />,
    description:
      "We help organizations establish sound governance frameworks and embed sustainability principles.",
    points: [
      "Internal Audit Outsourcing",
      "Financial Management",
      "Internal Controls over Financial Reporting (ICFR)",
      "Sustainability & ESG Advisory",
    ],
  },
  {
    id: 3,
    title: "Public Sector Finance & Policy",
    icon: <Landmark className="w-8 h-8 text-[#800020]" />,
    description:
      "We partner with governments and development institutions to design evidence-based policies.",
    points: [
      "Fiscal Studies & Fiscal Space Analysis",
      "Program Design & Evaluation",
      "Policy Advisory for Public & Development Sectors",
      "Stakeholder Engagement & Partnership Management",
    ],
  },
  {
    id: 4,
    title: "Capacity Development & Transformation",
    icon: <Users className="w-8 h-8 text-[#800020]" />,
    description:
      "We help organizations strengthen their people, systems, and culture for lasting impact.",
    points: [
      "Capacity Building & Change Management",
      "Leadership & Talent Development",
      "Organizational Design & Restructuring",
      "Learning & Development Solutions",
      "Monitoring, Evaluation & Learning (MEL) Systems",
    ],
  },
];

export default function ServiceCards() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <motion.section
      id="services"
      className="bg-[#1E293B] py-20 px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Centered Header */}
      <h1 className="text-center font-bold !text-white text-4xl mb-10">
        Our Services
      </h1>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service) => {
          const isExpanded = expandedCard === service.id;

          return (
            <motion.div
              key={service.id}
              layout
              onClick={() =>
                setExpandedCard(isExpanded ? null : service.id)
              }
              className={`relative bg-white border border-[#189086]/20 rounded-2xl p-4 cursor-pointer w-[380px] md:w-[480px] transition-all duration-500 ease-in-out shadow-lg ${
                isExpanded ? "h-auto" : "h-[120px]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {service.icon}
                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-[#800020] w-5 h-5" />
                </motion.div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 text-gray-700 text-md leading-relaxed"
                  >
                    <p>{service.description}</p>
                    <ul className="list-disc pl-5 mt-3 space-y-1">
                      {service.points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
