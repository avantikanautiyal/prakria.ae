"use client";

import { useEffect, useState } from "react";
import ServiceSection from "@/components/home/serviceSection";

const MAX_ITEMS_PER_SECTION = 6;

function getCardClassNameForIndex(index, totalItems) {
  if (totalItems <= 0) return "col-12";
  if (totalItems === 1) return "col-lg-12 col-12";

  if (index === 0) return "col-lg-8 col-12";
  if (index === 1) return "col-lg-4 col-12";
  return "col-lg-4 col-12";
}

export default function HomeServiceSections() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSections = async () => {
      try {
        const res = await fetch("/api/homepage/sections?active=true");
        const data = await res.json();
        if (!data.success) throw new Error("Failed to fetch sections");
        if (!isMounted) return;
        setSections(data.data || []);
      } catch (error) {
        console.error(error);
        if (isMounted) setSections([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadSections();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || sections.length === 0) return null;

  return (
    <>
      {sections.map((section) => {
        const trimmed = (section.items || []).slice(0, MAX_ITEMS_PER_SECTION);
        if (trimmed.length === 0) return null;
        const content = trimmed.map((item, index) => ({
          id: item._id || item.title,
          className: getCardClassNameForIndex(index, trimmed.length),
          title: item.title || "Untitled",
          description: item.description || "",
          link: item.link || null,
          thumbnail: item.src || null,
          alt: item.alt || item.title || "Case study thumbnail",
          mediaType: item.mediaType || "image",
        }));

        return (
          <ServiceSection
            key={section._id}
            title={section.title}
            link={section.ctaLink}
            ctaText={section.ctaText}
            ctaHoverText={section.ctaHoverText}
            content={content}
          />
        );
      })}
    </>
  );
}
