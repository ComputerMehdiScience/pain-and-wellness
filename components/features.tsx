"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface FeatureItem {
  id: number;
  icon?: React.ElementType;
  title: string;
  description: string;
  image: string;
}

interface FeaturesProps {
  features: FeatureItem[];
  title?: string;
  subtitle?: string;
  primaryColor?: string;
  progressGradientLight?: string;
  progressGradientDark?: string;
}

export function Features({
  features,
  title,
  subtitle,
  primaryColor = "teal-600",
  progressGradientLight = "bg-gradient-to-r from-teal-500 to-teal-600",
  progressGradientDark = "bg-gradient-to-r from-teal-400 to-teal-500",
}: FeaturesProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }, 200);
    }
  }, [progress, features.length]);

  useEffect(() => {
    const activeFeatureElement = featureRefs.current[currentFeature];
    const container = containerRef.current;
    if (activeFeatureElement && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeFeatureElement.getBoundingClientRect();
      container.scrollTo({
        left: activeFeatureElement.offsetLeft - (containerRect.width - elementRect.width) / 2,
        behavior: "smooth",
      });
    }
  }, [currentFeature]);

  const handleFeatureClick = (index: number) => {
    setCurrentFeature(index);
    setProgress(0);
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Optional heading */}
        {(title || subtitle) && (
          <div className="mb-14">
            {title && (
              <h2 style={{ fontFamily: "var(--font-display)" }}
                className="text-4xl md:text-5xl font-normal tracking-tight text-teal-900 mb-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p style={{ fontFamily: "var(--font-body)" }}
                className="text-base text-gray-500 leading-relaxed max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-2 lg:gap-16 gap-8 items-center">

          {/* Left — feature list */}
          <div
            ref={containerRef}
            className="lg:space-y-6 md:space-x-6 lg:space-x-0 overflow-x-auto no-scrollbar lg:overflow-visible flex lg:flex-col flex-row order-2 lg:order-1 pb-4 scroll-smooth"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentFeature === index;

              return (
                <div
                  key={feature.id}
                  ref={(el) => { featureRefs.current[index] = el; }}
                  className="relative cursor-pointer flex-shrink-0"
                  onClick={() => handleFeatureClick(index)}
                >
                  <div className={`
                    flex lg:flex-row flex-col items-start gap-4 p-4 max-w-sm md:max-w-sm lg:max-w-2xl transition-all duration-300
                    ${isActive
                      ? "bg-white shadow-lg rounded-2xl border border-gray-100"
                      : "opacity-60"
                    }
                  `}>
                    {/* Icon — only if provided */}
                    {Icon && (
                      <div className={`
                        p-3 hidden md:flex rounded-full flex-shrink-0 transition-all duration-300
                        ${isActive
                          ? `bg-teal-600 text-white`
                          : `bg-teal-50 text-teal-600`
                        }
                      `}>
                        <Icon size={22} />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 style={{ fontFamily: "var(--font-display)" }}
                        className={`text-lg font-normal mb-1.5 leading-snug transition-colors duration-300
                        ${isActive ? "text-gray-900" : "text-gray-600"}`}>
                        {feature.title}
                      </h3>
                      <p style={{ fontFamily: "var(--font-body)" }}
                        className={`text-sm leading-relaxed transition-colors duration-300
                        ${isActive ? "text-gray-500" : "text-gray-400"}`}>
                        {feature.description}
                      </p>

                      {/* Progress bar */}
                      <div className="mt-3 bg-gray-100 rounded-full h-0.5 overflow-hidden">
                        {isActive && (
                          <motion.div
                            className={`h-full ${progressGradientLight}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right — image */}
          <div className="relative order-1 lg:order-2">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full aspect-[4/3]"
            >
              <Image
                className="rounded-2xl shadow-xl object-cover"
                src={features[currentFeature].image}
                alt={features[currentFeature].title}
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
