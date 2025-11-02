"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function LeadershipTeam() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const leaders = [
    {
      name: "Divine Anunobi CPMC",
      title: "CEO & Director, Public Sector Finance & Policy",
      image: "/Divine-Anunobi.jpg",
      bio: "Divine is a finance and public policy professional with experience in advisory, development finance, and government reform. His experience includes PwC and CHAI, advising top-tier private-sector clients, supporting national reforms and developing WHO-endorsed financing models.",
    },
      {
      name: "Sima Unogu",
      title: "Executive Director, Advisory & Strategy",
      image: "/Sima.jpg",
      bio: "Sima brings nearly a decade of experience in capital markets, corporate finance, and strategy advisory. With roles at PwC and CHAI, she has advised on vaccine financing and national budget strategy, recognized by the CFA Black Women Scholarship",
    },
    {
      name: "Chidinma Aguomba ACCA, CPA",
      title: "Executive Director, Governance, Risk & Sustainability",
      image: "/Chidinma-Aguomba.jpg",
      bio: "Chidinma is a finance professional with expertise in tax, audit, and governance. Having worked with EY, PwC Nigeria, and PwC Canada, she holds ACCA and CPA qualifications and brings a deep understanding of financial systems and internal controls.",
    },
    {
      name: "Franklyn Ezumah MBA, CPMC",
      title: "Executive Director, Operations & Finance",
      image: "/Franklyn-Ezumah.jpeg",
      bio: "Franklyn combines deep experience in banking and global health consulting. From Access Bank to CHAI, he has led strategic programs and financial portfolios backed by Gavi and the Gates Foundation.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-white py-24 px-6" id="team"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl font-bold text-[#1E293B] mb-4">
            The Minds Behind Waymor
          </h2>
          <p className="text-lg text-[#1E293B] leading-relaxed">
            Meet the visionaries driving Waymor’s mission — combining expertise
            in strategy, finance, and governance to create lasting impact.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden shadow-md border-4 border-[#800020] transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name & Title */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-[#1E293B]">
                  {leader.name}
                </h3>
                <div className="w-12 h-1 bg-[#800020] mx-auto my-2 rounded-full"></div>
                <p className="text-sm text-gray-600 font-medium px-2">
                  {leader.title}
                </p>
              </div>

              {/* Bio (hover or tap reveal) */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity:
                    activeIndex === index || typeof window === "undefined"
                      ? 1
                      : 0,
                  height: activeIndex === index ? "auto" : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden mt-4"
              >
                <p className="text-gray-700 text-sm leading-relaxed px-4">
                  {leader.bio}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
